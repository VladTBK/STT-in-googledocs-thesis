(function (f) {
	window.Recorder = f();
})(function () {
	return (function e(t, n, r) {
		function s(o, u) {
			if (!n[o]) {
				var l = (n[o] = { exports: {} });
				t[o][0].call(
					l.exports,
					function (e) {
						var n = t[o][1][e];
						return s(n ? n : e);
					},
					l,
					l.exports,
					e,
					t,
					n,
					r
				);
			}
			return n[o].exports;
		}
		for (var o = 0; o < r.length; o++) s(r[o]);
		return s;
	})(
		{
			1: [
				function (require, module, exports) {
					'use strict';

					module.exports = require('./recorder').Recorder;
				},
				{ './recorder': 2 },
			],
			2: [
				function (require, module, exports) {
					'use strict';

					var _createClass = (function () {
						function defineProperties(target, props) {
							for (var i = 0; i < props.length; i++) {
								var descriptor = props[i];
								descriptor.enumerable =
									descriptor.enumerable || false;
								descriptor.configurable = true;
								if ('value' in descriptor)
									descriptor.writable = true;
								Object.defineProperty(
									target,
									descriptor.key,
									descriptor
								);
							}
						}
						return function (Constructor, protoProps, staticProps) {
							if (protoProps)
								defineProperties(
									Constructor.prototype,
									protoProps
								);
							if (staticProps)
								defineProperties(Constructor, staticProps);
							return Constructor;
						};
					})();

					Object.defineProperty(exports, '__esModule', {
						value: true,
					});
					exports.Recorder = undefined;

					var _inlineWorker = require('inline-worker');

					var _inlineWorker2 = _interopRequireDefault(_inlineWorker);

					function _interopRequireDefault(obj) {
						return obj && obj.__esModule ? obj : { default: obj };
					}

					var Recorder = (exports.Recorder = (function () {
						function Recorder(source, cfg) {
							var _this = this;

							this.config = {
								bufferLen: 4096,
								mimeType: 'audio/wav',
							};
							this.recording = false;
							this.callbacks = {
								exportWAV: [],
							};

							Object.assign(this.config, cfg);

							this.context = source.context;
							this.node = (
								this.context.createScriptProcessor ||
								this.context.createJavaScriptNode
							).call(this.context, this.config.bufferLen);

							this.node.onaudioprocess = function (e) {
								if (!_this.recording) return;

								var buffer = [];
								for (var channel = 0; channel < 1; channel++) {
									buffer.push(
										e.inputBuffer.getChannelData(channel)
									);
								}
								_this.worker.postMessage({
									command: 'record',
									buffer: buffer,
								});
							};

							source.connect(this.node);
							this.node.connect(this.context.destination); //this should not be necessary

							var self = {};
							this.worker = new _inlineWorker2.default(
								function () {
									var recLength = 0,
										recBuffers = [],
										sampleRate = undefined;

									self.onmessage = function (e) {
										switch (e.data.command) {
											case 'initRecorder':
												initRecorder(e.data.config);
												break;
											case 'record':
												record(e.data.buffer);
												break;
											case 'exportWAV':
												exportWAV(e.data.type);
												break;
											case 'clear':
												clear();
												break;
										}
									};

									function initRecorder(config) {
										sampleRate = config.sampleRate;
										recBuffers[0] = [];
									}

									function record(inputBuffer) {
										for (
											var channel = 0;
											channel < 1;
											channel++
										) {
											recBuffers[channel].push(
												inputBuffer[channel]
											);
										}
										recLength += inputBuffer[0].length;
									}

									function exportWAV(type) {
										var buffers = [];
										function mergeBuffers(
											recBuffers,
											recLength
										) {
											var result = new Float32Array(
												recLength
											);
											var offset = 0;
											for (
												var i = 0;
												i < recBuffers.length;
												i++
											) {
												result.set(
													recBuffers[i],
													offset
												);
												offset += recBuffers[i].length;
											}
											return result;
										}
										for (
											var channel = 0;
											channel < 1;
											channel++
										) {
											buffers.push(
												mergeBuffers(
													recBuffers[channel],
													recLength
												)
											);
										}
										var interleaved = buffers[0];

										var dataview = encodeWAV(interleaved);
										var audioBlob = new Blob([dataview], {
											type: type,
										});
										console.log(audioBlob);

										self.postMessage({
											command: 'exportWAV',
											data: audioBlob,
										});
									}

									function clear() {
										recLength = 0;
										recBuffers = [];
										recBuffers[0] = [];
									}

									function writeString(view, offset, string) {
										for (
											var i = 0;
											i < string.length;
											i++
										) {
											view.setUint8(
												offset + i,
												string.charCodeAt(i)
											);
										}
									}

									function encodeWAV(samples) {
										// Needed for encodeWAV math
										function floatTo16BitPCM(
											output,
											offset,
											input
										) {
											for (
												var i = 0;
												i < input.length;
												i++, offset += 2
											) {
												var s = Math.max(
													-1,
													Math.min(1, input[i])
												);
												output.setInt16(
													offset,
													s < 0
														? s * 0x8000
														: s * 0x7fff,
													true
												);
											}
										}
										var buffer = new ArrayBuffer(
											44 + samples.length * 2
										);
										var view = new DataView(buffer);

										/* RIFF identifier */
										writeString(view, 0, 'RIFF');
										/* RIFF chunk length */
										view.setUint32(
											4,
											36 + samples.length * 2,
											true
										);
										/* RIFF type */
										writeString(view, 8, 'WAVE');
										/* format chunk identifier */
										writeString(view, 12, 'fmt ');
										/* format chunk length */
										view.setUint32(16, 16, true);
										/* sample format (raw) */
										view.setUint16(20, 1, true);
										/* channel count */
										view.setUint16(22, 1, true);
										/* sample rate */
										view.setUint32(24, sampleRate, true);
										/* byte rate (sample rate * block align) */
										view.setUint32(
											28,
											sampleRate * 4,
											true
										);
										/* block align (channel count * bytes per sample) */
										view.setUint16(32, 1 * 2, true);
										/* bits per sample */
										view.setUint16(34, 16, true);
										/* data chunk identifier */
										writeString(view, 36, 'data');
										/* data chunk length */
										view.setUint32(
											40,
											samples.length * 2,
											true
										);

										floatTo16BitPCM(view, 44, samples);

										return view;
									}
								},
								self
							);

							this.worker.postMessage({
								command: 'initRecorder',
								config: {
									sampleRate: this.context.sampleRate,
								},
							});

							this.worker.onmessage = function (e) {
								var cb = _this.callbacks[e.data.command].pop();
								if (typeof cb == 'function') {
									cb(e.data.data);
								}
							};
						}

						_createClass(Recorder, [
							{
								key: 'record',
								value: function record() {
									this.recording = true;
								},
							},
							{
								key: 'stop',
								value: function stop() {
									this.recording = false;
								},
							},
							{
								key: 'clear',
								value: function clear() {
									this.worker.postMessage({
										command: 'clear',
									});
								},
							},
							{
								key: 'exportWAV',
								value: function exportWAV(cb, mimeType) {
									mimeType = mimeType || this.config.mimeType;
									cb = cb || this.config.callback;
									if (!cb)
										throw new Error('Callback not set');

									this.callbacks.exportWAV.push(cb);

									this.worker.postMessage({
										command: 'exportWAV',
										type: mimeType,
									});
								},
							},
						]);
						return Recorder;
					})());

					exports.default = Recorder;
				},
				{ 'inline-worker': 3 },
			],
			3: [
				function (require, module, exports) {
					'use strict';

					module.exports = require('./inline-worker');
				},
				{ './inline-worker': 4 },
			],
			4: [
				function (require, module, exports) {
					(function (global) {
						'use strict';

						var InlineWorker = (function () {
							function InlineWorker(func, self) {
								var functionBody = func
									.toString()
									.trim()
									.match(
										/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/
									)[1];
								var url = global.URL.createObjectURL(
									new global.Blob([functionBody], {
										type: 'text/javascript',
									})
								);

								return new global.Worker(url);
							}
							return InlineWorker;
						})();

						module.exports = InlineWorker;
					}).call(this, window);
				},
				{},
			],
		},
		{},
		[1]
	)(1);
});
