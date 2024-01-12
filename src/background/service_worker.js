//////////// Usefull Variables ////////////

let myPort;
let myDocumentID;
let myToken;
let sendEmpty = true;

let buffMyText = 'random junk';
let recivedMyText;
let messageType;
let currCommand;
let formatingMode = false;
let lastFormat = true;

let currParagraphValue = null;
let currSelectedText = [];
let currListType = null;
let buffListType;
let currTextStyle = null;
let currTextInDocsStyle = null;
let textHighlighted = false;
let checkLastFinal = false;

var levenshtein = (function () {
	var row2 = [];
	return function (s1, s2) {
		if (s1 === s2) {
			return 0;
		} else {
			var s1_len = s1.length,
				s2_len = s2.length;
			if (s1_len && s2_len) {
				var i1 = 0,
					i2 = 0,
					a,
					b,
					c,
					c2,
					row = row2;
				while (i1 < s1_len) row[i1] = ++i1;
				while (i2 < s2_len) {
					c2 = s2.charCodeAt(i2);
					a = i2;
					++i2;
					b = i2;
					for (i1 = 0; i1 < s1_len; ++i1) {
						c = a + (s1.charCodeAt(i1) === c2 ? 0 : 1);
						a = row[i1];
						b = b < a ? (b < c ? b + 1 : c) : a < c ? a + 1 : c;
						row[i1] = b;
					}
				}
				return b;
			} else {
				return s1_len + s2_len;
			}
		}
	};
})();
let constWaitFinal = (myText) => {
	callGoogleAppsScript(myToken, 'replaceWithFinal', myText);
	checkLastFinal = false;
};
const updateDocs = async (token, ID, requests) => {
	const postLinkDocs = `https://docs.googleapis.com/v1/documents/${ID}:batchUpdate`;
	try {
		await fetch(postLinkDocs, {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				requests: requests,
			}),
		});
	} catch (error) {
		console.log('Batch update error:', error);
		return false;
	}
};
const getCurrentParagraph = async (token, ID) => {
	const postLinkDocs = `https://docs.googleapis.com/v1/documents/${ID}`;
	try {
		await fetch(postLinkDocs, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				currParagraphValue = data.body.content;
				const lastParagraph = currParagraphValue.length - 1;
				const elemntsLenght =
					currParagraphValue[lastParagraph].paragraph.elements
						.length - 1;
				let temp = '';
				if (elemntsLenght === 0) {
					temp =
						currParagraphValue[lastParagraph].paragraph.elements[0]
							.textRun.content;
				} else {
					for (let i = 0; i < elemntsLenght; i++) {
						temp +=
							currParagraphValue[lastParagraph].paragraph
								.elements[i].textRun.content;
					}
				}
				currParagraphValue = temp;
			});
	} catch (error) {
		console.log('Batch update error:', error);
		formatingMode = false;
		return false;
	}
};
const callGoogleAppsScript = async (token, functionName, paramToSend) => {
	const scriptId =
		'1ogfQ5LMHtJUw85P22ne7lhTRbU4R24nO8zoCCoV4NnzpqKkLZkhQjkjZ';
	const postLinkGoogleScript = `https://script.googleapis.com/v1/scripts/${scriptId}:run`;
	const payload = {
		function: functionName,
		parameters: [paramToSend],
		devMode: true, // Set this to true for testing purposes.
	};
	// Make the API request using fetch().
	try {
		await fetch(postLinkGoogleScript, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});
	} catch (error) {
		console.log('Something wrong with script:', error);
		return false;
	}
};

const checkBulletList = async (bulletListText) => {
	if (currListType === null) {
		const listType = [
			'cerc',
			'pătrat',
			'litere',
			'majuscule',
			'numere',
			'cifre romane',
			'cifre romane mici',
			'oval',
			'continuă',
			'anulare',
		];
		portSendeer('bullet list', 'Alegeţi Tipul Listei', listType);

		let smallestDist = 99;
		let buffStyle;
		for (let i = 0; i < listType.length; i++) {
			let temp = levenshtein(bulletListText, listType[i]);
			if (temp < smallestDist) {
				smallestDist = temp;
				buffStyle = listType[i];
			}
		}
		if (smallestDist <= 2 && smallestDist !== null) {
			currListType = buffStyle;
			portSendeer(
				'bullet list',
				`S-a recepţionat: '${currListType}', se creează...`,
				[]
			);

			if (currListType === 'continuă') {
				await callGoogleAppsScript(
					myToken,
					'newBulletList',
					buffListType
				);
			} else {
				await callGoogleAppsScript(
					myToken,
					'newBulletList',
					currListType
				);
				buffListType = currListType;
			}
			if (buffListType === 'anulare') {
				portSendeer('finshed', 'S-a anulat creerea de listă nouă');
			} else {
				portSendeer('finshed', `Listă Nouă creată: '${buffListType}'`);
			}
			currListType = null;
			formatingMode = false;
		}
	}
};
const checkTextStyle = async (textStyle) => {
	if (currTextStyle === null) {
		const listType = [
			'bold',
			'italic',
			'tăiat',
			'subliniat',
			'albastru',
			'negru',
			'roșu',
			'normal',
			'centru',
			'dreapta',
			'titlu',
			'subtitlu',
			'rubrică mare',
			'rubrică medie',
			'rubrică mică',
			'anulare',
		];
		portSendeer('stil text', 'Alegeţi stilul textului', listType);

		const elementTypes = [
			'titlu',
			'subtitlu',
			'rubrică mare',
			'rubrică medie',
			'rubrică mică',
		];
		let smallestDist = 99;
		let buffStyle;
		for (let i = 0; i < listType.length; i++) {
			let temp = levenshtein(textStyle, listType[i]);
			if (temp < smallestDist) {
				smallestDist = temp;
				buffStyle = listType[i];
			}
		}

		if (smallestDist <= 2 && smallestDist !== null) {
			currTextStyle = buffStyle;
			// console.log('Found current Text Style', currTextStyle);
			portSendeer(
				'stil text',
				`S-a recepţionat: '${currTextStyle}', se creează...`,
				[]
			);
			if (elementTypes.includes(currTextStyle)) {
				await callGoogleAppsScript(
					myToken,
					'newElement',
					currTextStyle
				);
			} else {
				await callGoogleAppsScript(
					myToken,
					'newTextStyle',
					currTextStyle
				);
			}
			if (currTextStyle === 'anulare') {
				portSendeer('finshed', 'S-a anulat stilul de text');
			} else {
				portSendeer('finshed', `Stil Text ales: '${currTextStyle}'`);
			}
			currTextStyle = null;
			formatingMode = false;
		}
	}
};
const selectTextInDocs = async (textInDocs) => {
	// console.log('Textul ce trebuie modificat', textInDocs);
	if (textInDocs === 'anulare') {
		currParagraphValue = null;
		currTextInDocsStyle = null;
		currSelectedText = [];
		textHighlighted = false;
		formatingMode = false;
		portSendeer('finshed', 'S-a anulat slectarea textului');
		return;
	}
	let buffCurr = currParagraphValue.split(' ').filter((e) => {
		return e.trim().length > 0;
	});
	let buffMy = textInDocs.split(' ').filter((e) => {
		return e.trim().length > 0;
	});
	let threshold = 5;
	if (textInDocs.length < threshold) {
		threshold = textInDocs.length - 1;
	}

	let finalDist = 99;
	let idx = null;
	for (let i = 0; i < buffCurr.length - buffMy.length + 1; i++) {
		let foo;
		switch (buffMy.length) {
			case 1:
				foo = buffCurr[i];
				break;
			case 2:
				foo = buffCurr[i] + ' ' + buffCurr[i + 1];
				break;
			case 3:
				foo =
					buffCurr[i] + ' ' + buffCurr[i + 1] + ' ' + buffCurr[i + 2];
				break;
			case 4:
				foo =
					buffCurr[i] +
					' ' +
					buffCurr[i + 1] +
					' ' +
					buffCurr[i + 2] +
					' ' +
					buffCurr[i + 3];
				break;
			case 5:
				foo =
					buffCurr[i] +
					' ' +
					buffCurr[i + 1] +
					' ' +
					buffCurr[i + 2] +
					' ' +
					buffCurr[i + 3] +
					' ' +
					buffCurr[i + 4];
				break;
		}
		const dist = levenshtein(textInDocs, foo);
		if (dist < finalDist) {
			finalDist = dist;
			if (finalDist <= threshold) {
				idx = i;
			}
		}
	}
	let closestBest = [];
	if (idx === null) {
		portSendeer('selectează text', 'Textul nu s-a gasit, reîncercaţi');
		return;
	}
	for (let i = 0; i < buffMy.length; i++) {
		closestBest.push(buffCurr[idx + i] + ' ');
	}
	closestBest = closestBest.join('');
	currSelectedText = closestBest;
	// console.log('Textul gasit', currSelectedText);
	await callGoogleAppsScript(myToken, 'highlightText', currSelectedText);

	textHighlighted = true;
};
const selectTextInDocsStyle = async (textInDocsStyle) => {
	if (currTextInDocsStyle === null) {
		const listType = [
			'anulare',
			'bold',
			'italic',
			'tăiat',
			'subliniat',
			'albastru',
			'negru',
			'roșu',
			'normal',
		];
		let smallestDist = 99;
		let buffStyle;
		for (let i = 0; i < listType.length; i++) {
			let temp = levenshtein(textInDocsStyle, listType[i]);
			if (temp < smallestDist) {
				smallestDist = temp;
				buffStyle = listType[i];
			}
		}
		if (smallestDist <= 2 && smallestDist !== null) {
			currTextInDocsStyle = buffStyle;
			portSendeer(
				'stil text',
				`S-a recepţionat: '${currTextInDocsStyle}', se aplică...`,
				[]
			);
			await callGoogleAppsScript(myToken, 'newTextInDocsStyle', [
				currTextInDocsStyle,
				currSelectedText,
			]);
			if (currTextInDocsStyle === 'anulare') {
				portSendeer(
					'finshed',
					`S-a anulat slectarea stilului pentru: '${currSelectedText}'`
				);
			} else {
				portSendeer(
					'finshed',
					`Fraza: '${currSelectedText}' are stilul: '${currTextInDocsStyle}'`
				);
			}
			currParagraphValue = null;
			currTextInDocsStyle = null;
			currSelectedText = [];
			textHighlighted = false;
			formatingMode = false;
		}
	}
};
const checkCommand = async (myCmd, myText) => {
	const commands = {
		'paragraf nou': async () => {
			portSendeer('paragraf nou', 'Creere Paragraf Nou');
			await callGoogleAppsScript(myToken, 'newParagraph');
			portSendeer('finshed', 'Paragraf Nou creat');
			lastFormat = true;
			formatingMode = false;
		},
		'paragraf 9': async () => {
			portSendeer('paragraf nou', 'Creere Paragraf Nou');
			await callGoogleAppsScript(myToken, 'newParagraph');
			portSendeer('finshed', 'Paragraf Nou creat');

			lastFormat = true;
			formatingMode = false;
		},
		'listă nouă': async () => {
			await checkBulletList(myText);
			lastFormat = true;
		},
		'listă 9': async () => {
			await checkBulletList(myText);
			lastFormat = true;
		},
		'clear document context': async () => {
			await callGoogleAppsScript(myToken, 'deleteContext');
			lastFormat = true;
			formatingMode = false;
		},
		'delete document context': async () => {
			portSendeer('curata continut', 'Se curăţă conţinutul...');
			await callGoogleAppsScript(myToken, 'deleteContext', 'delete');
			portSendeer('finshed', 'Document curăţat');
			lastFormat = true;
			formatingMode = false;
		},
		'stil text': async () => {
			await checkTextStyle(myText);
			lastFormat = true;
		},
		'selectează text': async () => {
			switch (true) {
				case currParagraphValue === null:
					await getCurrentParagraph(myToken, myDocumentID);
					// console.log('Textul din Docs:', currParagraphValue);
					portSendeer(
						'selectează text',
						'Selectați ce frază trebuie modificată'
					);
					lastFormat = true;
					break;

				case currSelectedText.length === 0:
					const listType = [
						'anulare',
						'bold',
						'italic',
						'tăiat',
						'subliniat',
						'albastru',
						'negru',
						'roșu',
						'normal',
					];
					portSendeer(
						'selectează text',
						`Se caută textul: ${myText}`
					);
					await selectTextInDocs(myText);
					portSendeer(
						'stil text',
						`Alegeţi stilul pentru ${currSelectedText}`,
						listType
					);
					lastFormat = true;
					break;
				case textHighlighted:
					await selectTextInDocsStyle(myText);
					lastFormat = true;

					break;
				default:
					break;
			}
		},
	};
	if (myCmd && commands.hasOwnProperty(myCmd)) {
		await commands[myCmd](); // needed [myCmd] because split words
	} else {
		console.log('Comanda nu este recunoscuta!');
		formatingMode = false;
	}
};
const portSendeer = async (whereFrom, text, list) => {
	myPort.postMessage({
		whereFrom,
		text,
		list,
	});
};
//////////// Update Document ////////////
chrome.tabs.onUpdated.addListener(async (tabId, currState, tab) => {
	if (
		currState.status == 'complete' &&
		tab.status == 'complete' &&
		tab.url != undefined
	) {
		if (tab.url.includes('https://docs.google.com/document')) {
			myDocumentID = tab.url.substr(35, 44); // gets current docs
			chrome.identity.getAuthToken({ interactive: true }, (token) => {
				if (chrome.runtime.lastError || !token) {
					console.log(`${JSON.stringify(chrome.runtime.lastError)}`);
					return;
				}
				myToken = token;
				console.log(myDocumentID);
				if (sendEmpty) {
					const empty_requests = {
						insertText: {
							text: '',
							endOfSegmentLocation: {},
						},
					};
					updateDocs(myToken, myDocumentID, empty_requests); // needs empty request sa se incalzeasca
					sendEmpty = false;
				}

				myPort ? portSendeer('document', myDocumentID) : null; // needs double verificaiton because matter who connects first
			});
		}
	}
});

//////////// Comuncation with Client API ////////////
chrome.runtime.onConnect.addListener((port) => {
	if (port.name === 'main-port') {
		console.log(
			'Connection established from content script:',
			port.sender.tab.id
		);
		myPort = port;
		myDocumentID ? myPort.postMessage({ myDocumentID }) : null; // needs double verificaiton because matter who connects first
		myPort.onMessage.addListener(async (msg) => {
			if (!formatingMode) {
				messageType = msg.whereFrom;
				recivedMyText = msg.text;
				switch (messageType) {
					case 'partial':
						recivedMyText = recivedMyText.split(' ');
						if (buffMyText[0] === recivedMyText[0]) {
							// console.log(recivedMyText, 'my recived');
							const newWords = []; // sometimes more than 1 word is registerd at once, so is better to send a chunk than one by one
							for (let word of recivedMyText) {
								if (!buffMyText.includes(word)) {
									buffMyText.push(word);
									newWords.push(word);
								}
							}
							if (newWords.length > 0) {
								const requests = newWords.map((word) => [
									{
										insertText: {
											text: word + ' ',
											endOfSegmentLocation: {},
										},
									},
								]);
								updateDocs(myToken, myDocumentID, requests); // asures in order post to Google Document
							}
						} else {
							buffMyText = recivedMyText; // this is where a new phrase is registerd
							const requests = [
								{
									insertText: {
										text: '` ' + buffMyText,
										endOfSegmentLocation: {},
									},
								},
							];
							updateDocs(myToken, myDocumentID, requests); // buffMyText always has the first chunk
						}
						break;
					case 'final':
						callGoogleAppsScript(
							myToken,
							'replaceWithFinal',
							recivedMyText
						);
						break;
					case 'format':
						currCommand = recivedMyText;
						console.log(recivedMyText, 'Hi from format');
						formatingMode = true;
						checkLastFinal = true;
						break;
				}
			} else {
				if (msg.whereFrom === 'final') {
					let myText = msg.text;
					if (checkLastFinal) {
						await callGoogleAppsScript(
							myToken,
							'replaceWithFinal',
							myText
						).then(() => {
							checkLastFinal = false;
						});
					}
					checkCommand(currCommand, myText);
				}
				// if (
				// 	msg.whereFrom === 'partial' &&
				// 	msg.forFormat === 'OK' &&
				// 	checkLastFinal === false
				// ) {
				// 	let myText = msg.text;
				// 	checkCommand(currCommand, myText);
				// }
			}
		});
		myPort.onDisconnect.addListener(() => {
			console.log('Current port is disconected');
		});
	}
});
