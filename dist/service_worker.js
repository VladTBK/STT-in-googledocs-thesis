/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************************!*\
  !*** ./src/background/service_worker.js ***!
  \******************************************/
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//////////// Usefull Variables ////////////

var myPort;
var myDocumentID;
var myToken;
var sendEmpty = true;
var buffMyText = 'random junk';
var recivedMyText;
var messageType;
var currCommand;
var formatingMode = false;
var lastFormat = true;
var currParagraphValue = null;
var currSelectedText = [];
var currListType = null;
var buffListType;
var currTextStyle = null;
var currTextInDocsStyle = null;
var textHighlighted = false;
var checkLastFinal = false;
var levenshtein = function () {
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
            b = b < a ? b < c ? b + 1 : c : a < c ? a + 1 : c;
            row[i1] = b;
          }
        }
        return b;
      } else {
        return s1_len + s2_len;
      }
    }
  };
}();
var constWaitFinal = function constWaitFinal(myText) {
  callGoogleAppsScript(myToken, 'replaceWithFinal', myText);
  checkLastFinal = false;
};
var updateDoc = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(token, ID, requests) {
    var postLinkDocs;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          postLinkDocs = "https://docs.googleapis.com/v1/documents/".concat(ID, ":batchUpdate");
          _context.prev = 1;
          _context.next = 4;
          return fetch(postLinkDocs, {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              requests: requests
            })
          });
        case 4:
          _context.next = 10;
          break;
        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](1);
          console.log('Batch update error:', _context.t0);
          return _context.abrupt("return", false);
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 6]]);
  }));
  return function updateDoc(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var getCurrentParagraph = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(token, ID) {
    var postLinkDocs;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          postLinkDocs = "https://docs.googleapis.com/v1/documents/".concat(ID);
          _context2.prev = 1;
          _context2.next = 4;
          return fetch(postLinkDocs, {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json'
            }
          }).then(function (response) {
            return response.json();
          }).then(function (data) {
            currParagraphValue = data.body.content;
            var lastParagraph = currParagraphValue.length - 1;
            var elemntsLenght = currParagraphValue[lastParagraph].paragraph.elements.length - 1;
            var temp = '';
            if (elemntsLenght === 0) {
              temp = currParagraphValue[lastParagraph].paragraph.elements[0].textRun.content;
            } else {
              for (var i = 0; i < elemntsLenght; i++) {
                temp += currParagraphValue[lastParagraph].paragraph.elements[i].textRun.content;
              }
            }
            currParagraphValue = temp;
          });
        case 4:
          _context2.next = 11;
          break;
        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](1);
          console.log('Batch update error:', _context2.t0);
          formatingMode = false;
          return _context2.abrupt("return", false);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 6]]);
  }));
  return function getCurrentParagraph(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
var callGoogleAppsScript = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(token, functionName, paramToSend) {
    var scriptId, postLinkGoogleScript, payload;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          scriptId = '1ogfQ5LMHtJUw85P22ne7lhTRbU4R24nO8zoCCoV4NnzpqKkLZkhQjkjZ';
          postLinkGoogleScript = "https://script.googleapis.com/v1/scripts/".concat(scriptId, ":run");
          payload = {
            "function": functionName,
            parameters: [paramToSend],
            devMode: true // Set this to true for testing purposes.
          }; // Make the API request using fetch().
          _context3.prev = 3;
          _context3.next = 6;
          return fetch(postLinkGoogleScript, {
            method: 'POST',
            headers: {
              Authorization: "Bearer ".concat(token),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
        case 6:
          _context3.next = 12;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](3);
          console.log('Something wrong with script:', _context3.t0);
          return _context3.abrupt("return", false);
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 8]]);
  }));
  return function callGoogleAppsScript(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();
var checkBulletList = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(bulletListText) {
    var listType, smallestDist, buffStyle, i, temp;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!(currListType === null)) {
            _context4.next = 19;
            break;
          }
          listType = ['cerc', 'pătrat', 'litere', 'majuscule', 'numere', 'cifre romane', 'cifre romane mici', 'oval', 'continuă', 'anulare'];
          portSendeer('bullet list', 'Alegeţi Tipul Listei', listType);
          smallestDist = 99;
          for (i = 0; i < listType.length; i++) {
            temp = levenshtein(bulletListText, listType[i]);
            if (temp < smallestDist) {
              smallestDist = temp;
              buffStyle = listType[i];
            }
          }
          if (!(smallestDist <= 2 && smallestDist !== null)) {
            _context4.next = 19;
            break;
          }
          currListType = buffStyle;
          portSendeer('bullet list', "S-a recep\u0163ionat: '".concat(currListType, "', se creeaz\u0103..."), []);
          if (!(currListType === 'continuă')) {
            _context4.next = 13;
            break;
          }
          _context4.next = 11;
          return callGoogleAppsScript(myToken, 'newBulletList', buffListType);
        case 11:
          _context4.next = 16;
          break;
        case 13:
          _context4.next = 15;
          return callGoogleAppsScript(myToken, 'newBulletList', currListType);
        case 15:
          buffListType = currListType;
        case 16:
          if (buffListType === 'anulare') {
            portSendeer('finshed', 'S-a anulat creerea de listă nouă');
          } else {
            portSendeer('finshed', "List\u0103 Nou\u0103 creat\u0103: '".concat(buffListType, "'"));
          }
          currListType = null;
          formatingMode = false;
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function checkBulletList(_x9) {
    return _ref4.apply(this, arguments);
  };
}();
var checkTextStyle = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(textStyle) {
    var listType, elementTypes, smallestDist, buffStyle, i, temp;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (!(currTextStyle === null)) {
            _context5.next = 19;
            break;
          }
          listType = ['bold', 'italic', 'tăiat', 'subliniat', 'albastru', 'negru', 'roșu', 'normal', 'centru', 'dreapta', 'titlu', 'subtitlu', 'rubrică mare', 'rubrică medie', 'rubrică mică', 'anulare'];
          portSendeer('stil text', 'Alegeţi stilul textului', listType);
          elementTypes = ['titlu', 'subtitlu', 'rubrică mare', 'rubrică medie', 'rubrică mică'];
          smallestDist = 99;
          for (i = 0; i < listType.length; i++) {
            temp = levenshtein(textStyle, listType[i]);
            if (temp < smallestDist) {
              smallestDist = temp;
              buffStyle = listType[i];
            }
          }
          if (!(smallestDist <= 2 && smallestDist !== null)) {
            _context5.next = 19;
            break;
          }
          currTextStyle = buffStyle;
          // console.log('Found current Text Style', currTextStyle);
          portSendeer('stil text', "S-a recep\u0163ionat: '".concat(currTextStyle, "', se creeaz\u0103..."), []);
          if (!elementTypes.includes(currTextStyle)) {
            _context5.next = 14;
            break;
          }
          _context5.next = 12;
          return callGoogleAppsScript(myToken, 'newElement', currTextStyle);
        case 12:
          _context5.next = 16;
          break;
        case 14:
          _context5.next = 16;
          return callGoogleAppsScript(myToken, 'newTextStyle', currTextStyle);
        case 16:
          if (currTextStyle === 'anulare') {
            portSendeer('finshed', 'S-a anulat stilul de text');
          } else {
            portSendeer('finshed', "Stil Text ales: '".concat(currTextStyle, "'"));
          }
          currTextStyle = null;
          formatingMode = false;
        case 19:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function checkTextStyle(_x10) {
    return _ref5.apply(this, arguments);
  };
}();
var selectTextInDocs = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(textInDocs) {
    var buffCurr, buffMy, threshold, finalDist, idx, i, foo, dist, closestBest, _i;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          if (!(textInDocs === 'anulare')) {
            _context6.next = 8;
            break;
          }
          currParagraphValue = null;
          currTextInDocsStyle = null;
          currSelectedText = [];
          textHighlighted = false;
          formatingMode = false;
          portSendeer('finshed', 'S-a anulat slectarea textului');
          return _context6.abrupt("return");
        case 8:
          buffCurr = currParagraphValue.split(' ').filter(function (e) {
            return e.trim().length > 0;
          });
          buffMy = textInDocs.split(' ').filter(function (e) {
            return e.trim().length > 0;
          });
          threshold = 5;
          if (textInDocs.length < threshold) {
            threshold = textInDocs.length - 1;
          }
          finalDist = 99;
          idx = null;
          i = 0;
        case 15:
          if (!(i < buffCurr.length - buffMy.length + 1)) {
            _context6.next = 35;
            break;
          }
          foo = void 0;
          _context6.t0 = buffMy.length;
          _context6.next = _context6.t0 === 1 ? 20 : _context6.t0 === 2 ? 22 : _context6.t0 === 3 ? 24 : _context6.t0 === 4 ? 26 : _context6.t0 === 5 ? 28 : 30;
          break;
        case 20:
          foo = buffCurr[i];
          return _context6.abrupt("break", 30);
        case 22:
          foo = buffCurr[i] + ' ' + buffCurr[i + 1];
          return _context6.abrupt("break", 30);
        case 24:
          foo = buffCurr[i] + ' ' + buffCurr[i + 1] + ' ' + buffCurr[i + 2];
          return _context6.abrupt("break", 30);
        case 26:
          foo = buffCurr[i] + ' ' + buffCurr[i + 1] + ' ' + buffCurr[i + 2] + ' ' + buffCurr[i + 3];
          return _context6.abrupt("break", 30);
        case 28:
          foo = buffCurr[i] + ' ' + buffCurr[i + 1] + ' ' + buffCurr[i + 2] + ' ' + buffCurr[i + 3] + ' ' + buffCurr[i + 4];
          return _context6.abrupt("break", 30);
        case 30:
          dist = levenshtein(textInDocs, foo);
          if (dist < finalDist) {
            finalDist = dist;
            if (finalDist <= threshold) {
              idx = i;
            }
          }
        case 32:
          i++;
          _context6.next = 15;
          break;
        case 35:
          closestBest = [];
          if (!(idx === null)) {
            _context6.next = 39;
            break;
          }
          portSendeer('selectează text', 'Textul nu s-a gasit, reîncercaţi');
          return _context6.abrupt("return");
        case 39:
          for (_i = 0; _i < buffMy.length; _i++) {
            closestBest.push(buffCurr[idx + _i] + ' ');
          }
          closestBest = closestBest.join('');
          currSelectedText = closestBest;
          // console.log('Textul gasit', currSelectedText);
          _context6.next = 44;
          return callGoogleAppsScript(myToken, 'highlightText', currSelectedText);
        case 44:
          textHighlighted = true;
        case 45:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function selectTextInDocs(_x11) {
    return _ref6.apply(this, arguments);
  };
}();
var selectTextInDocsStyle = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(textInDocsStyle) {
    var listType, smallestDist, buffStyle, i, temp;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          if (!(currTextInDocsStyle === null)) {
            _context7.next = 15;
            break;
          }
          listType = ['anulare', 'bold', 'italic', 'tăiat', 'subliniat', 'albastru', 'negru', 'roșu', 'normal'];
          smallestDist = 99;
          for (i = 0; i < listType.length; i++) {
            temp = levenshtein(textInDocsStyle, listType[i]);
            if (temp < smallestDist) {
              smallestDist = temp;
              buffStyle = listType[i];
            }
          }
          if (!(smallestDist <= 2 && smallestDist !== null)) {
            _context7.next = 15;
            break;
          }
          currTextInDocsStyle = buffStyle;
          portSendeer('stil text', "S-a recep\u0163ionat: '".concat(currTextInDocsStyle, "', se aplic\u0103..."), []);
          _context7.next = 9;
          return callGoogleAppsScript(myToken, 'newTextInDocsStyle', [currTextInDocsStyle, currSelectedText]);
        case 9:
          if (currTextInDocsStyle === 'anulare') {
            portSendeer('finshed', "S-a anulat slectarea stilului pentru: '".concat(currSelectedText, "'"));
          } else {
            portSendeer('finshed', "Fraza: '".concat(currSelectedText, "' are stilul: '").concat(currTextInDocsStyle, "'"));
          }
          currParagraphValue = null;
          currTextInDocsStyle = null;
          currSelectedText = [];
          textHighlighted = false;
          formatingMode = false;
        case 15:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function selectTextInDocsStyle(_x12) {
    return _ref7.apply(this, arguments);
  };
}();
var checkCommand = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(myCmd, myText) {
    var commands;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          commands = {
            'paragraf nou': function () {
              var _paragrafNou = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
                return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                  while (1) switch (_context8.prev = _context8.next) {
                    case 0:
                      portSendeer('paragraf nou', 'Creere Paragraf Nou');
                      _context8.next = 3;
                      return callGoogleAppsScript(myToken, 'newParagraph');
                    case 3:
                      portSendeer('finshed', 'Paragraf Nou creat');
                      lastFormat = true;
                      formatingMode = false;
                    case 6:
                    case "end":
                      return _context8.stop();
                  }
                }, _callee8);
              }));
              function paragrafNou() {
                return _paragrafNou.apply(this, arguments);
              }
              return paragrafNou;
            }(),
            'paragraf 9': function () {
              var _paragraf = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
                return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                  while (1) switch (_context9.prev = _context9.next) {
                    case 0:
                      portSendeer('paragraf nou', 'Creere Paragraf Nou');
                      _context9.next = 3;
                      return callGoogleAppsScript(myToken, 'newParagraph');
                    case 3:
                      portSendeer('finshed', 'Paragraf Nou creat');
                      lastFormat = true;
                      formatingMode = false;
                    case 6:
                    case "end":
                      return _context9.stop();
                  }
                }, _callee9);
              }));
              function paragraf9() {
                return _paragraf.apply(this, arguments);
              }
              return paragraf9;
            }(),
            'listă nouă': function () {
              var _listăNouă = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
                return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                  while (1) switch (_context10.prev = _context10.next) {
                    case 0:
                      _context10.next = 2;
                      return checkBulletList(myText);
                    case 2:
                      lastFormat = true;
                    case 3:
                    case "end":
                      return _context10.stop();
                  }
                }, _callee10);
              }));
              function listăNouă() {
                return _listăNouă.apply(this, arguments);
              }
              return listăNouă;
            }(),
            'listă 9': function () {
              var _listă = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
                return _regeneratorRuntime().wrap(function _callee11$(_context11) {
                  while (1) switch (_context11.prev = _context11.next) {
                    case 0:
                      _context11.next = 2;
                      return checkBulletList(myText);
                    case 2:
                      lastFormat = true;
                    case 3:
                    case "end":
                      return _context11.stop();
                  }
                }, _callee11);
              }));
              function listă9() {
                return _listă.apply(this, arguments);
              }
              return listă9;
            }(),
            'clear document context': function () {
              var _clearDocumentContext = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
                return _regeneratorRuntime().wrap(function _callee12$(_context12) {
                  while (1) switch (_context12.prev = _context12.next) {
                    case 0:
                      _context12.next = 2;
                      return callGoogleAppsScript(myToken, 'deleteContext');
                    case 2:
                      lastFormat = true;
                      formatingMode = false;
                    case 4:
                    case "end":
                      return _context12.stop();
                  }
                }, _callee12);
              }));
              function clearDocumentContext() {
                return _clearDocumentContext.apply(this, arguments);
              }
              return clearDocumentContext;
            }(),
            'delete document context': function () {
              var _deleteDocumentContext = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
                return _regeneratorRuntime().wrap(function _callee13$(_context13) {
                  while (1) switch (_context13.prev = _context13.next) {
                    case 0:
                      portSendeer('curata continut', 'Se curăţă conţinutul...');
                      _context13.next = 3;
                      return callGoogleAppsScript(myToken, 'deleteContext', 'delete');
                    case 3:
                      portSendeer('finshed', 'Document curăţat');
                      lastFormat = true;
                      formatingMode = false;
                    case 6:
                    case "end":
                      return _context13.stop();
                  }
                }, _callee13);
              }));
              function deleteDocumentContext() {
                return _deleteDocumentContext.apply(this, arguments);
              }
              return deleteDocumentContext;
            }(),
            'stil text': function () {
              var _stilText = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
                return _regeneratorRuntime().wrap(function _callee14$(_context14) {
                  while (1) switch (_context14.prev = _context14.next) {
                    case 0:
                      _context14.next = 2;
                      return checkTextStyle(myText);
                    case 2:
                      lastFormat = true;
                    case 3:
                    case "end":
                      return _context14.stop();
                  }
                }, _callee14);
              }));
              function stilText() {
                return _stilText.apply(this, arguments);
              }
              return stilText;
            }(),
            'selectează text': function () {
              var _selecteazăText = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
                var listType;
                return _regeneratorRuntime().wrap(function _callee15$(_context15) {
                  while (1) switch (_context15.prev = _context15.next) {
                    case 0:
                      _context15.t0 = true;
                      _context15.next = _context15.t0 === (currParagraphValue === null) ? 3 : _context15.t0 === (currSelectedText.length === 0) ? 8 : _context15.t0 === textHighlighted ? 15 : 19;
                      break;
                    case 3:
                      _context15.next = 5;
                      return getCurrentParagraph(myToken, myDocumentID);
                    case 5:
                      // console.log('Textul din Docs:', currParagraphValue);
                      portSendeer('selectează text', 'Selectați ce frază trebuie modificată');
                      lastFormat = true;
                      return _context15.abrupt("break", 20);
                    case 8:
                      listType = ['anulare', 'bold', 'italic', 'tăiat', 'subliniat', 'albastru', 'negru', 'roșu', 'normal'];
                      portSendeer('selectează text', "Se caut\u0103 textul: ".concat(myText));
                      _context15.next = 12;
                      return selectTextInDocs(myText);
                    case 12:
                      portSendeer('stil text', "Alege\u0163i stilul pentru ".concat(currSelectedText), listType);
                      lastFormat = true;
                      return _context15.abrupt("break", 20);
                    case 15:
                      _context15.next = 17;
                      return selectTextInDocsStyle(myText);
                    case 17:
                      lastFormat = true;
                      return _context15.abrupt("break", 20);
                    case 19:
                      return _context15.abrupt("break", 20);
                    case 20:
                    case "end":
                      return _context15.stop();
                  }
                }, _callee15);
              }));
              function selecteazăText() {
                return _selecteazăText.apply(this, arguments);
              }
              return selecteazăText;
            }()
          };
          if (!(myCmd && commands.hasOwnProperty(myCmd))) {
            _context16.next = 6;
            break;
          }
          _context16.next = 4;
          return commands[myCmd]();
        case 4:
          _context16.next = 8;
          break;
        case 6:
          console.log('Comanda nu este recunoscuta!');
          formatingMode = false;
        case 8:
        case "end":
          return _context16.stop();
      }
    }, _callee16);
  }));
  return function checkCommand(_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();
var portSendeer = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(whereFrom, text, list) {
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          myPort.postMessage({
            whereFrom: whereFrom,
            text: text,
            list: list
          });
        case 1:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
  }));
  return function portSendeer(_x15, _x16, _x17) {
    return _ref9.apply(this, arguments);
  };
}();
//////////// Update Document ////////////
chrome.tabs.onUpdated.addListener( /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(tabId, currState, tab) {
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          if (currState.status == 'complete' && tab.status == 'complete' && tab.url != undefined) {
            if (tab.url.includes('https://docs.google.com/document')) {
              myDocumentID = tab.url.substr(35, 44); // gets current docs
              chrome.identity.getAuthToken({
                interactive: true
              }, function (token) {
                if (chrome.runtime.lastError || !token) {
                  console.log("".concat(JSON.stringify(chrome.runtime.lastError)));
                  return;
                }
                myToken = token;
                console.log(myDocumentID);
                if (sendEmpty) {
                  var empty_requests = {
                    insertText: {
                      text: '',
                      endOfSegmentLocation: {}
                    }
                  };
                  updateDoc(myToken, myDocumentID, empty_requests); // needs empty request sa se incalzeasca
                  sendEmpty = false;
                }
                myPort ? portSendeer('document', myDocumentID) : null; // needs double verificaiton because matter who connects first
              });
            }
          }
        case 1:
        case "end":
          return _context18.stop();
      }
    }, _callee18);
  }));
  return function (_x18, _x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());

//////////// Comuncation with Client API ////////////
chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === 'main-port') {
    console.log('Connection established from content script:', port.sender.tab.id);
    myPort = port;
    myDocumentID ? myPort.postMessage({
      myDocumentID: myDocumentID
    }) : null; // needs double verificaiton because matter who connects first
    myPort.onMessage.addListener( /*#__PURE__*/function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(msg) {
        var newWords, _iterator, _step, word, requests, _requests, myText;
        return _regeneratorRuntime().wrap(function _callee19$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              if (formatingMode) {
                _context19.next = 18;
                break;
              }
              messageType = msg.whereFrom;
              recivedMyText = msg.text;
              _context19.t0 = messageType;
              _context19.next = _context19.t0 === 'partial' ? 6 : _context19.t0 === 'final' ? 9 : _context19.t0 === 'format' ? 11 : 16;
              break;
            case 6:
              recivedMyText = recivedMyText.split(' ');
              if (buffMyText[0] === recivedMyText[0]) {
                // console.log(recivedMyText, 'my recived');
                newWords = []; // sometimes more than 1 word is registerd at once, so is better to send a chunk than one by one
                _iterator = _createForOfIteratorHelper(recivedMyText);
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    word = _step.value;
                    if (!buffMyText.includes(word)) {
                      buffMyText.push(word);
                      newWords.push(word);
                    }
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
                if (newWords.length > 0) {
                  requests = newWords.map(function (word) {
                    return [{
                      insertText: {
                        text: word + ' ',
                        endOfSegmentLocation: {}
                      }
                    }];
                  });
                  updateDoc(myToken, myDocumentID, requests); // asures in order post to Google Document
                }
              } else {
                buffMyText = recivedMyText; // this is where a new phrase is registerd
                _requests = [{
                  insertText: {
                    text: '` ' + buffMyText,
                    endOfSegmentLocation: {}
                  }
                }];
                updateDoc(myToken, myDocumentID, _requests); // buffMyText always has the first chunk
              }
              return _context19.abrupt("break", 16);
            case 9:
              callGoogleAppsScript(myToken, 'replaceWithFinal', recivedMyText);
              return _context19.abrupt("break", 16);
            case 11:
              currCommand = recivedMyText;
              console.log(recivedMyText, 'Hi from format');
              formatingMode = true;
              checkLastFinal = true;
              return _context19.abrupt("break", 16);
            case 16:
              _context19.next = 24;
              break;
            case 18:
              if (!(msg.whereFrom === 'final')) {
                _context19.next = 24;
                break;
              }
              myText = msg.text;
              if (!checkLastFinal) {
                _context19.next = 23;
                break;
              }
              _context19.next = 23;
              return callGoogleAppsScript(myToken, 'replaceWithFinal', myText).then(function () {
                checkLastFinal = false;
              });
            case 23:
              checkCommand(currCommand, myText);
            case 24:
            case "end":
              return _context19.stop();
          }
        }, _callee19);
      }));
      return function (_x21) {
        return _ref11.apply(this, arguments);
      };
    }());
    myPort.onDisconnect.addListener(function () {
      console.log('Current port is disconected');
    });
  }
});
/******/ })()
;