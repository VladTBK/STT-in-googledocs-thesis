/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//////////// Usefull Variables ////////////

// Document items
var microphoneButton = document.createElement('div');
var textBox = document.createElement('div');
var tooltip = document.createElement('div');
tooltip.setAttribute('class', 'tooltip');
var rec; //Recorder.js object
var ws_normal; // WebSocket object for normal dictation
var ws_phrases; // WebSocket object for phrases

var documentID = ' ';
var command = '';
var wasClicked = false;
var wsReady = 0;
var partialCounter = 0;
var recReady = false;
var phrasesReady = false;
var logInitialValidation = true;
var currInterval;
var currZevoSpeech = 'Activaţi Zevo STT';
var mousePos = {
  x: undefined,
  y: undefined
};
var currAnimation;
var sample_rate = 16000;
var APIkey = 'vladpenescu2023#';
var sever_phrasesSTT = 'wss://live-transcriber.zevo-tech.com:2087';
var server_normalSTT = 'wss://live-transcriber.zevo-tech.com:2053';
var INTERVAL = 250;
var mainPort = chrome.runtime.connect({
  name: 'main-port'
});
var phrases = '["paragraf nou","listă nouă","stil text","selectează text","curăţă conţinut","închide înregistrarea"]';
var phrasesArray = [];
var phrasesToArr = function phrasesToArr() {
  var tempWord = '';
  var ok = false;
  for (var i = 0; i <= phrases.length; i++) {
    if (phrases[i] === '[' || phrases[i] === ']') {} else if (phrases[i] === '"') {
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
var createMicrophone = function createMicrophone() {
  // Set needed atributes for a div in docs sidebar
  microphoneButton.setAttribute('class', 'outline-refresh docs-material docs-navigation-tab-button goog-inline-block microphone-box');

  // Creates the microphone object

  var outsideButton = document.createElement('div');
  var innerButton = document.createElement('div');
  outsideButton.setAttribute('class', 'button');
  outsideButton.setAttribute('id', 'circlein');
  innerButton.setAttribute('class', 'button');
  innerButton.innerHTML = "<svg id=\"svg1\" class =\"mic-icon\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"-25 52 66 66\" enable-background=\"new -25 52 66 66\" xml:space=\"preserve\" class=\"docs-mic-svg-icon\"><path class=\"docs-mic-svg-icon-path\" d=\"m8 92.895c5.224 0 10-4.243 10-9.474v-18.947c0-5.237-4.776-9.474-10-9.474-5.226 0-10 4.237-10 9.474v18.947c0 5.23 4.774 9.474 10 9.474z\"></path><path class=\"docs-mic-svg-icon-path\" d=\"m24.104 83c0 9.474-7.383 16.525-16.104 16.525-8.727 0-16.105-7.052-16.105-16.525h-5.895c0 10.784 8.643 20.103 19 21.635v10.36h6v-10.365c10.355-1.53 19-10.856 19-21.64h-5.896z\"></path></svg>";

  // Append object to sidebar
  microphoneButton.appendChild(outsideButton);
  microphoneButton.appendChild(innerButton);
  document.body.appendChild(microphoneButton);
};
var createTextBox = function createTextBox(myTitle, myList, myStatus) {
  // Set needed atributes for a div in docs sidebar
  textBox.innerHTML = '';
  textBox.setAttribute('class', 'outline-refresh docs-material docs-navigation-tab-button goog-inline-block textBox-box');
  var mainBox = document.createElement('div');
  var title = document.createElement('div');
  title.textContent = myTitle;
  title.setAttribute('class', 'title-style');

  // Bullet list
  var bulletList = document.createElement('ul');
  bulletList.setAttribute('class', 'text-style');
  for (var i = 0; i < myList.length; i++) {
    var listItem = document.createElement('li');
    listItem.textContent = myList[i];
    bulletList.appendChild(listItem);
  }
  var statusBox = document.createElement('div');
  statusBox.setAttribute('class', 'status-style');
  var titleStatus = document.createElement('div');
  titleStatus.textContent = 'Status Curent:';
  titleStatus.setAttribute('class', 'title-style');
  var status = document.createElement('div');
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
var handleMouseMove = function handleMouseMove(e) {
  mousePos = {
    x: e.clientX,
    y: e.clientY
  };
  // console.log(mousePos);
};

var updateMicPosition = function updateMicPosition() {
  // microphoneButton.style.transform = `translate(${mousePos.x - 45}px, ${
  // 	mousePos.y - 230
  // }px)`; // this is smoothly only for a specific resolution
  microphoneButton.style.left = "".concat(mousePos.x - 25, "px");
  microphoneButton.style.top = "".concat(mousePos.y - 25, "px");
  currAnimation = requestAnimationFrame(updateMicPosition);
};
function showTooltip() {
  var micPos = microphoneButton.getBoundingClientRect();
  tooltip.style.left = "".concat(micPos.left - 15, "px");
  tooltip.style.top = "".concat(micPos.bottom - 5, "px");
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
var createRecorder = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var audioSetter, stream, input;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          audioSetter = new AudioContext({
            latencyHint: 'interactive',
            sampleRate: 16000
          });
          _context.next = 3;
          return navigator.mediaDevices.getUserMedia({
            audio: true
          });
        case 3:
          stream = _context.sent;
          input = audioSetter.createMediaStreamSource(stream);
          rec = new Recorder(input, {
            numChannels: 1
          });
          recReady = true;
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function createRecorder() {
    return _ref.apply(this, arguments);
  };
}();

// Create WebSocket object and methods
var createWebSocket = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(phrases) {
    var mySocket;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (phrases === null) {
            mySocket = new WebSocket(server_normalSTT);
            mySocket.onclose = function (err) {
              // console.log(err);
              // console.log(' Current WebSocket Closed');
              clearInterval(currInterval);
            };
            mySocket.onmessage = function (validation) {
              var e = validation.data;
              if (logInitialValidation) {
                wsReady++;
                return false;
              }
              e = JSON.parse(e);
              // console.log(e); // to see both partial and full
              switch (true) {
                case e.partial !== null && e.partial !== '' && e.partial !== undefined:
                  // in case of partial text
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
                    text: e.partial
                  });
                  break;
                case e.text_pp !== null && e.text_pp !== '' && e.text_pp !== undefined:
                  // in case of full text
                  // console.log(e.text_pp, 'Hello from full');
                  // partialCounter = 0;
                  mainPort.postMessage({
                    whereFrom: 'final',
                    text: e.text_pp
                  });
                  break;
                default:
                  break;
              }
              return false;
            };
            mySocket.onopen = function () {
              mySocket.send("{\"config\": {\"key\": \"".concat(APIkey, "\"}}"));
              mySocket.send("{\"config\": {\"sample_rate\": \"".concat(sample_rate, "\"}}"));
              var checkReadyState = function checkReadyState() {
                if (wsReady >= 2 && recReady) {
                  logInitialValidation = false;
                  createTextBox('Comenzi Vocale', phrasesArray, 'Începeţi Dictarea!');
                  startRec();
                } else {
                  setTimeout(checkReadyState, 100);
                }
              };
              checkReadyState();
            };
          } else {
            mySocket = new WebSocket(sever_phrasesSTT);
            mySocket.onclose = function (err) {
              // console.log(err);
              // console.log(' Current Phrases Closed');
            };
            mySocket.onmessage = function (validation) {
              var e = validation.data;
              e = JSON.parse(e);
              e.message === 'You have successfully set a limited vocabulary!' ? phrasesReady = true : null;
              if (e.text_pp !== null && e.text_pp !== '' && e.text_pp !== undefined && e.text_pp !== '<UNK>') {
                if (e.text_pp === 'curăţă conţinut') {
                  if (window.confirm('Confirm clear document context?')) {
                    mainPort.postMessage({
                      whereFrom: 'format',
                      text: 'delete document context'
                    });
                  } else {
                    mainPort.postMessage({
                      whereFrom: 'format',
                      text: 'clear document context'
                    });
                  }
                }
                if (e.text_pp === 'închide înregistrarea') {
                  stopRec();
                }
                mainPort.postMessage({
                  whereFrom: 'format',
                  text: e.text_pp
                });
              }
              return false;
            };
            mySocket.onopen = function () {
              mySocket.send("{\"config\": {\"key\": \"".concat(APIkey, "\"}}"));
              mySocket.send("{\"config\": {\"sample_rate\": \"".concat(sample_rate, "\"}}"));
              mySocket.send('{"config": {"phrases" : ' + phrases + '}}');
            };
          }
          mySocket.binaryType = 'arraybuffer';
          mySocket.onerror = function (err) {
            return createTextBox('Comenzi Vocale', phrasesArray, 'A APARUT O EROARE, REFRESH SAU REINSTALL!');
          };
          return _context2.abrupt("return", mySocket);
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function createWebSocket(_x) {
    return _ref2.apply(this, arguments);
  };
}();

///// API functions /////

////////// Utils functions //////////
var changeBoxShadow = function changeBoxShadow(colorInner, colorOuter) {
  var changeColor = document.querySelectorAll('.button');
  changeColor.forEach(function (elem) {
    elem.style.backgroundColor = colorInner;
    elem.style.boxShadow = '0px 0px 30px' + colorOuter;
  });
};

///// Recording functions /////

// Starts on mic press
var prepareRec = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          changeBoxShadow('#EE4B2B', '#880808'); // inner then outer color
          currZevoSpeech = 'Dezactivati Zevo STT';
          createTextBox('Comenzi Vocale', phrasesArray, 'Se iniţializează Zevo...');
          wasClicked = true;
          // console.log(`Preparing recording setup for ID: ${documentID}`);
          _context3.next = 6;
          return createRecorder();
        case 6:
          _context3.next = 8;
          return createWebSocket(phrases);
        case 8:
          ws_phrases = _context3.sent;
          _context3.next = 11;
          return createWebSocket(null);
        case 11:
          ws_normal = _context3.sent;
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function prepareRec() {
    return _ref3.apply(this, arguments);
  };
}();

// Set recording enviroment //
var startRec = function startRec() {
  rec.record();
  // console.log(ws_normal);
  // console.log(ws_phrases);
  currInterval = setInterval(function () {
    rec.exportWAV(function (blob) {
      ws_phrases.send(blob);
      ws_normal.send(blob);
      rec.clear();
    }, 'audio/x-wav');
  }, INTERVAL);
};

//  Reinit variables after closing mic //
var stopRec = function stopRec() {
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
var checkMsg = function checkMsg(msg) {
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
var mainEvents = function mainEvents() {
  window.addEventListener('load', function () {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    if (!navigator.getUserMedia) createTextBox('Comenzi Vocale', phrasesArray, 'User media not avaliable on this browser');
    createMicrophone();
    createTextBox('Comenzi Vocale', phrasesArray, currZevoSpeech);
  });
  mainPort.onMessage.addListener(checkMsg);
  microphoneButton.addEventListener('mouseover', showTooltip);
  microphoneButton.addEventListener('mouseout', hideTooltip);
  microphoneButton.addEventListener('click', function () {
    wasClicked ? stopRec() : prepareRec();
  });

  // Listening for the mouse moveing events
  microphoneButton.addEventListener('mousedown', function () {
    window.addEventListener('mousemove', handleMouseMove);
    updateMicPosition();
  });
  microphoneButton.addEventListener('mouseup', function () {
    window.removeEventListener('mousemove', handleMouseMove);
    cancelAnimationFrame(currAnimation);
  });
};
mainEvents();
/******/ })()
;