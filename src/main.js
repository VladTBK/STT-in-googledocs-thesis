//////////// Usefull Variables ////////////

// Document items
const microphoneButton = document.createElement('div');
const textBox = document.createElement('div');

const tooltip = document.createElement('div');
tooltip.setAttribute('class', 'tooltip');

let rec; //Recorder.js object
let ws_normal; // WebSocket object for normal dictation
let ws_phrases; // WebSocket object for phrases

let documentID = ' ';
let command = '';

let wasClicked = false;
let wsReady = 0;
let partialCounter = 0;
let recReady = false;
let phrasesReady = false;
let logInitialValidation = true;
let currInterval;
let currZevoSpeech = 'Activaţi Zevo STT';
let mousePos = { x: undefined, y: undefined };
let currAnimation;
const sample_rate = 16000;
const APIkey = 'vladpenescu2023#';
const sever_phrasesSTT = 'wss://live-transcriber.zevo-tech.com:2087';
const server_normalSTT = 'wss://live-transcriber.zevo-tech.com:2053';
const INTERVAL = 250;
const mainPort = chrome.runtime.connect({ name: 'main-port' });
const phrases =
	'["paragraf nou","listă nouă","stil text","selectează text","curăţă conţinut","închide înregistrarea"]';
let phrasesArray = [];

const phrasesToArr = () => {
	let tempWord = '';
	let ok = false;
	for (let i = 0; i <= phrases.length; i++) {
		if (phrases[i] === '[' || phrases[i] === ']') {
		} else if (phrases[i] === '"') {
			ok = !ok;
		} else if (ok) {
			tempWord += phrases[i];
		} else {
			phrasesArray.push(tempWord);
			tempWord = '';
		}
	}
};
phrasesToArr();
//////////////////////// Functions ////////////////////////

///// All create functions /////

// Creates microphone object and makes it moveable
const createMicrophone = () => {
	// Set needed atributes for a div in docs sidebar
	microphoneButton.setAttribute(
		'class',
		'outline-refresh docs-material docs-navigation-tab-button goog-inline-block microphone-box'
	);

	// Creates the microphone object

	const outsideButton = document.createElement('div');
	const innerButton = document.createElement('div');
	outsideButton.setAttribute('class', 'button');
	outsideButton.setAttribute('id', 'circlein');
	innerButton.setAttribute('class', 'button');
	innerButton.innerHTML = `<svg id="svg1" class ="mic-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="-25 52 66 66" enable-background="new -25 52 66 66" xml:space="preserve" class="docs-mic-svg-icon"><path class="docs-mic-svg-icon-path" d="m8 92.895c5.224 0 10-4.243 10-9.474v-18.947c0-5.237-4.776-9.474-10-9.474-5.226 0-10 4.237-10 9.474v18.947c0 5.23 4.774 9.474 10 9.474z"></path><path class="docs-mic-svg-icon-path" d="m24.104 83c0 9.474-7.383 16.525-16.104 16.525-8.727 0-16.105-7.052-16.105-16.525h-5.895c0 10.784 8.643 20.103 19 21.635v10.36h6v-10.365c10.355-1.53 19-10.856 19-21.64h-5.896z"></path></svg>`;

	// Append object to sidebar
	microphoneButton.appendChild(outsideButton);
	microphoneButton.appendChild(innerButton);
	document.body.appendChild(microphoneButton);
};
const createTextBox = (myTitle, myList, myStatus) => {
	// Set needed atributes for a div in docs sidebar
	textBox.innerHTML = '';
	textBox.setAttribute(
		'class',
		'outline-refresh docs-material docs-navigation-tab-button goog-inline-block textBox-box'
	);
	const mainBox = document.createElement('div');

	const title = document.createElement('div');
	title.textContent = myTitle;
	title.setAttribute('class', 'title-style');

	// Bullet list
	const bulletList = document.createElement('ul');
	bulletList.setAttribute('class', 'text-style');

	for (let i = 0; i < myList.length; i++) {
		const listItem = document.createElement('li');
		listItem.textContent = myList[i];
		bulletList.appendChild(listItem);
	}

	const statusBox = document.createElement('div');
	statusBox.setAttribute('class', 'status-style');

	const titleStatus = document.createElement('div');
	titleStatus.textContent = 'Status Curent:';
	titleStatus.setAttribute('class', 'title-style');

	const status = document.createElement('div');
	status.textContent = myStatus;
	status.setAttribute('class', 'text-style');

	statusBox.appendChild(titleStatus);
	statusBox.appendChild(status);

	mainBox.setAttribute('class', 'textBox-style');
	mainBox.appendChild(title);
	mainBox.appendChild(bulletList);
	mainBox.appendChild(statusBox);
	textBox.appendChild(mainBox);
	document.body.appendChild(textBox);
};

const handleMouseMove = (e) => {
	mousePos = { x: e.clientX, y: e.clientY };
	// console.log(mousePos);
};
const updateMicPosition = () => {
	// microphoneButton.style.transform = `translate(${mousePos.x - 45}px, ${
	// 	mousePos.y - 230
	// }px)`; // this is smoothly only for a specific resolution
	microphoneButton.style.left = `${mousePos.x - 25}px`;
	microphoneButton.style.top = `${mousePos.y - 25}px`;
	currAnimation = requestAnimationFrame(updateMicPosition);
};
function showTooltip() {
	const micPos = microphoneButton.getBoundingClientRect();

	tooltip.style.left = `${micPos.left - 15}px`;
	tooltip.style.top = `${micPos.bottom - 5}px`;
	tooltip.style.display = 'block';
	tooltip.textContent = currZevoSpeech;

	microphoneButton.parentNode.appendChild(tooltip);
	microphoneButton.style.opacity = 1;
}
function hideTooltip() {
	microphoneButton.style.opacity = 0.7;
	tooltip.style.display = 'none';
}

// Create Recorder object
const createRecorder = async () => {
	const audioSetter = new AudioContext({
		latencyHint: 'interactive',
		sampleRate: 16000,
	});
	const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
	const input = audioSetter.createMediaStreamSource(stream);
	rec = new Recorder(input, { numChannels: 1 });
	recReady = true;
};

// Create WebSocket object and methods
const createWebSocket = async (phrases) => {
	let mySocket;
	if (phrases === null) {
		mySocket = new WebSocket(server_normalSTT);
		mySocket.onclose = (err) => {
			// console.log(err);
			// console.log(' Current WebSocket Closed');
			clearInterval(currInterval);
		};
		mySocket.onmessage = (validation) => {
			let e = validation.data;
			if (logInitialValidation) {
				wsReady++;
				return false;
			}
			e = JSON.parse(e);
			// console.log(e); // to see both partial and full
			switch (true) {
				case e.partial !== null &&
					e.partial !== '' &&
					e.partial !== undefined: // in case of partial text
					// console.log(e.partial, 'Hello from partial');
					// partialCounter++;
					// if (partialCounter >= 2) {
					// 	mainPort.postMessage({
					// 		whereFrom: 'partial',
					// 		text: e.partial,
					// 		forFormat: 'OK',
					// 	});
					// } else {
					// 	mainPort.postMessage({
					// 		whereFrom: 'partial',
					// 		text: e.partial,
					// 	});
					// }
					mainPort.postMessage({
						whereFrom: 'partial',
						text: e.partial,
					});

					break;
				case e.text_pp !== null &&
					e.text_pp !== '' &&
					e.text_pp !== undefined: // in case of full text
					// console.log(e.text_pp, 'Hello from full');
					// partialCounter = 0;
					mainPort.postMessage({
						whereFrom: 'final',
						text: e.text_pp,
					});
					break;
				default:
					break;
			}
			return false;
		};
		mySocket.onopen = () => {
			mySocket.send(`{"config": {"key": "${APIkey}"}}`);
			mySocket.send(`{"config": {"sample_rate": "${sample_rate}"}}`);
			const checkReadyState = () => {
				if (wsReady >= 2 && recReady) {
					logInitialValidation = false;
					createTextBox(
						'Comenzi Vocale',
						phrasesArray,
						'Începeţi Dictarea!'
					);
					startRec();
				} else {
					setTimeout(checkReadyState, 100);
				}
			};
			checkReadyState();
		};
	} else {
		mySocket = new WebSocket(sever_phrasesSTT);
		mySocket.onclose = (err) => {
			// console.log(err);
			// console.log(' Current Phrases Closed');
		};
		mySocket.onmessage = (validation) => {
			let e = validation.data;

			e = JSON.parse(e);

			e.message === 'You have successfully set a limited vocabulary!'
				? (phrasesReady = true)
				: null;

			if (
				e.text_pp !== null &&
				e.text_pp !== '' &&
				e.text_pp !== undefined &&
				e.text_pp !== '<UNK>'
			) {
				if (e.text_pp === 'curăţă conţinut') {
					if (window.confirm('Confirm clear document context?')) {
						mainPort.postMessage({
							whereFrom: 'format',
							text: 'delete document context',
						});
					} else {
						mainPort.postMessage({
							whereFrom: 'format',
							text: 'clear document context',
						});
					}
				}
				if (e.text_pp === 'închide înregistrarea') {
					stopRec();
				}
				mainPort.postMessage({
					whereFrom: 'format',
					text: e.text_pp,
				});
			}
			return false;
		};
		mySocket.onopen = () => {
			mySocket.send(`{"config": {"key": "${APIkey}"}}`);
			mySocket.send(`{"config": {"sample_rate": "${sample_rate}"}}`);
			mySocket.send('{"config": {"phrases" : ' + phrases + '}}');
		};
	}
	mySocket.binaryType = 'arraybuffer';
	mySocket.onerror = (err) =>
		createTextBox(
			'Comenzi Vocale',
			phrasesArray,
			'A APARUT O EROARE, REFRESH SAU REINSTALL!'
		);

	return mySocket;
};

///// API functions /////

////////// Utils functions //////////
const changeBoxShadow = (colorInner, colorOuter) => {
	const changeColor = document.querySelectorAll('.button');
	changeColor.forEach((elem) => {
		elem.style.backgroundColor = colorInner;
		elem.style.boxShadow = '0px 0px 30px' + colorOuter;
	});
};

///// Recording functions /////

// Starts on mic press
const prepareRec = async () => {
	changeBoxShadow('#EE4B2B', '#880808'); // inner then outer color
	currZevoSpeech = 'Dezactivati Zevo STT';
	createTextBox('Comenzi Vocale', phrasesArray, 'Se iniţializează Zevo...');
	wasClicked = true;
	// console.log(`Preparing recording setup for ID: ${documentID}`);

	await createRecorder(); // recorder needs user input before creating
	ws_phrases = await createWebSocket(phrases);
	ws_normal = await createWebSocket(null);
};

// Set recording enviroment //
const startRec = () => {
	rec.record();
	// console.log(ws_normal);
	// console.log(ws_phrases);
	currInterval = setInterval(() => {
		rec.exportWAV((blob) => {
			ws_phrases.send(blob);
			ws_normal.send(blob);
			rec.clear();
		}, 'audio/x-wav');
	}, INTERVAL);
};

//  Reinit variables after closing mic //
const stopRec = () => {
	rec.stop();
	ws_normal.close();
	ws_phrases.close();
	rec.clear();

	changeBoxShadow('#6495ed', '#1434a4');
	createTextBox('Comenzi Vocale', phrasesArray, 'Dictare oprită, reporniţi!');
	wasClicked = false;
	wsReady = 0;
	partialCounter = 0;
	recReady = false;
	logInitialValidation = true;
	currZevoSpeech = 'Activati Zevo STT';
	// console.log(`Recording stoped for ID ${documentID}`);
};

// Comunication with SW //
const checkMsg = (msg) => {
	switch (msg.whereFrom) {
		case 'document':
			documentID = msg.text;
			// console.log(`Current User ID: ${documentID}`);
			break;
		case 'paragraf nou':
			createTextBox('Paragraf Nou', [], msg.text);
			break;
		case 'bullet list':
			createTextBox('Listă Nouă', msg.list, msg.text);
			break;
		case 'stil text':
			createTextBox('Stil Text', msg.list, msg.text);
			break;
		case 'curata continut':
			createTextBox('Curățarea conținutului', [], msg.text);
			break;
		case 'selectează text':
			createTextBox('Selectează Text', [], msg.text);
			break;
		case 'selectează stil':
			createTextBox('Selectează Stil', [], msg.text);
			break;
		case 'finshed':
			createTextBox('Comenzi Vocale', phrasesArray, msg.text);
			break;
	}
};

//////////////////////// Event Listiners ////////////////////////
const mainEvents = () => {
	window.addEventListener('load', () => {
		navigator.getUserMedia =
			navigator.getUserMedia || navigator.webkitGetUserMedia;

		if (!navigator.getUserMedia)
			createTextBox(
				'Comenzi Vocale',
				phrasesArray,
				'User media not avaliable on this browser'
			);

		createMicrophone();
		createTextBox('Comenzi Vocale', phrasesArray, currZevoSpeech);
	});
	mainPort.onMessage.addListener(checkMsg);

	microphoneButton.addEventListener('mouseover', showTooltip);
	microphoneButton.addEventListener('mouseout', hideTooltip);
	microphoneButton.addEventListener('click', () => {
		wasClicked ? stopRec() : prepareRec();
	});

	// Listening for the mouse moveing events
	microphoneButton.addEventListener('mousedown', () => {
		window.addEventListener('mousemove', handleMouseMove);
		updateMicPosition();
	});

	microphoneButton.addEventListener('mouseup', () => {
		window.removeEventListener('mousemove', handleMouseMove);
		cancelAnimationFrame(currAnimation);
	});
};
mainEvents();
