/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = 10000;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}

/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "a67c59248b5f4039f10f"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotMainModule = true; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			hotMainModule = false;
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		Object.defineProperty(fn, "e", {
/******/ 			enumerable: true,
/******/ 			value: function(chunkId) {
/******/ 				if(hotStatus === "ready")
/******/ 					hotSetStatus("prepare");
/******/ 				hotChunksLoading++;
/******/ 				return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 					finishChunkLoading();
/******/ 					throw err;
/******/ 				});
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		});
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotMainModule,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotMainModule = true;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest().then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate).then(function(result) {
/******/ 				deferred.resolve(result);
/******/ 			}, function(err) {
/******/ 				deferred.reject(err);
/******/ 			});
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					dependency = moduleOutdatedDependencies[i];
/******/ 					cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(i = 0; i < callbacks.length; i++) {
/******/ 					cb = callbacks[i];
/******/ 					try {
/******/ 						cb(moduleOutdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "accept-errored",
/******/ 								moduleId: moduleId,
/******/ 								dependencyId: moduleOutdatedDependencies[i],
/******/ 								error: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err;
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return Promise.resolve(outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(1)(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

eval("/******/ (function(modules) { // webpackBootstrap\n/******/ \tfunction hotDisposeChunk(chunkId) {\n/******/ \t\tdelete installedChunks[chunkId];\n/******/ \t}\n/******/ \tvar parentHotUpdateCallback = this[\"webpackHotUpdate\"];\n/******/ \tthis[\"webpackHotUpdate\"] = \r\n/******/ \tfunction webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars\r\n/******/ \t\thotAddUpdateChunk(chunkId, moreModules);\r\n/******/ \t\tif(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);\r\n/******/ \t} ;\r\n/******/ \t\r\n/******/ \tfunction hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars\r\n/******/ \t\tvar head = document.getElementsByTagName(\"head\")[0];\r\n/******/ \t\tvar script = document.createElement(\"script\");\r\n/******/ \t\tscript.type = \"text/javascript\";\r\n/******/ \t\tscript.charset = \"utf-8\";\r\n/******/ \t\tscript.src = __webpack_require__.p + \"\" + chunkId + \".\" + hotCurrentHash + \".hot-update.js\";\r\n/******/ \t\thead.appendChild(script);\r\n/******/ \t}\r\n/******/ \t\r\n/******/ \tfunction hotDownloadManifest() { // eslint-disable-line no-unused-vars\r\n/******/ \t\treturn new Promise(function(resolve, reject) {\r\n/******/ \t\t\tif(typeof XMLHttpRequest === \"undefined\")\r\n/******/ \t\t\t\treturn reject(new Error(\"No browser support\"));\r\n/******/ \t\t\ttry {\r\n/******/ \t\t\t\tvar request = new XMLHttpRequest();\r\n/******/ \t\t\t\tvar requestPath = __webpack_require__.p + \"\" + hotCurrentHash + \".hot-update.json\";\r\n/******/ \t\t\t\trequest.open(\"GET\", requestPath, true);\r\n/******/ \t\t\t\trequest.timeout = 10000;\r\n/******/ \t\t\t\trequest.send(null);\r\n/******/ \t\t\t} catch(err) {\r\n/******/ \t\t\t\treturn reject(err);\r\n/******/ \t\t\t}\r\n/******/ \t\t\trequest.onreadystatechange = function() {\r\n/******/ \t\t\t\tif(request.readyState !== 4) return;\r\n/******/ \t\t\t\tif(request.status === 0) {\r\n/******/ \t\t\t\t\t// timeout\r\n/******/ \t\t\t\t\treject(new Error(\"Manifest request to \" + requestPath + \" timed out.\"));\r\n/******/ \t\t\t\t} else if(request.status === 404) {\r\n/******/ \t\t\t\t\t// no update available\r\n/******/ \t\t\t\t\tresolve();\r\n/******/ \t\t\t\t} else if(request.status !== 200 && request.status !== 304) {\r\n/******/ \t\t\t\t\t// other failure\r\n/******/ \t\t\t\t\treject(new Error(\"Manifest request to \" + requestPath + \" failed.\"));\r\n/******/ \t\t\t\t} else {\r\n/******/ \t\t\t\t\t// success\r\n/******/ \t\t\t\t\ttry {\r\n/******/ \t\t\t\t\t\tvar update = JSON.parse(request.responseText);\r\n/******/ \t\t\t\t\t} catch(e) {\r\n/******/ \t\t\t\t\t\treject(e);\r\n/******/ \t\t\t\t\t\treturn;\r\n/******/ \t\t\t\t\t}\r\n/******/ \t\t\t\t\tresolve(update);\r\n/******/ \t\t\t\t}\r\n/******/ \t\t\t};\r\n/******/ \t\t});\r\n/******/ \t}\r\n\n/******/ \t\r\n/******/ \t\r\n/******/ \tvar hotApplyOnUpdate = true;\r\n/******/ \tvar hotCurrentHash = \"6c4f22d584090de86ee5\"; // eslint-disable-line no-unused-vars\r\n/******/ \tvar hotCurrentModuleData = {};\r\n/******/ \tvar hotMainModule = true; // eslint-disable-line no-unused-vars\r\n/******/ \tvar hotCurrentParents = []; // eslint-disable-line no-unused-vars\r\n/******/ \tvar hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars\r\n/******/ \t\r\n/******/ \tfunction hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars\r\n/******/ \t\tvar me = installedModules[moduleId];\r\n/******/ \t\tif(!me) return __webpack_require__;\r\n/******/ \t\tvar fn = function(request) {\r\n/******/ \t\t\tif(me.hot.active) {\r\n/******/ \t\t\t\tif(installedModules[request]) {\r\n/******/ \t\t\t\t\tif(installedModules[request].parents.indexOf(moduleId) < 0)\r\n/******/ \t\t\t\t\t\tinstalledModules[request].parents.push(moduleId);\r\n/******/ \t\t\t\t} else hotCurrentParents = [moduleId];\r\n/******/ \t\t\t\tif(me.children.indexOf(request) < 0)\r\n/******/ \t\t\t\t\tme.children.push(request);\r\n/******/ \t\t\t} else {\r\n/******/ \t\t\t\tconsole.warn(\"[HMR] unexpected require(\" + request + \") from disposed module \" + moduleId);\r\n/******/ \t\t\t\thotCurrentParents = [];\r\n/******/ \t\t\t}\r\n/******/ \t\t\thotMainModule = false;\r\n/******/ \t\t\treturn __webpack_require__(request);\r\n/******/ \t\t};\r\n/******/ \t\tvar ObjectFactory = function ObjectFactory(name) {\r\n/******/ \t\t\treturn {\r\n/******/ \t\t\t\tconfigurable: true,\r\n/******/ \t\t\t\tenumerable: true,\r\n/******/ \t\t\t\tget: function() {\r\n/******/ \t\t\t\t\treturn __webpack_require__[name];\r\n/******/ \t\t\t\t},\r\n/******/ \t\t\t\tset: function(value) {\r\n/******/ \t\t\t\t\t__webpack_require__[name] = value;\r\n/******/ \t\t\t\t}\r\n/******/ \t\t\t};\r\n/******/ \t\t};\r\n/******/ \t\tfor(var name in __webpack_require__) {\r\n/******/ \t\t\tif(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {\r\n/******/ \t\t\t\tObject.defineProperty(fn, name, ObjectFactory(name));\r\n/******/ \t\t\t}\r\n/******/ \t\t}\r\n/******/ \t\tObject.defineProperty(fn, \"e\", {\r\n/******/ \t\t\tenumerable: true,\r\n/******/ \t\t\tvalue: function(chunkId) {\r\n/******/ \t\t\t\tif(hotStatus === \"ready\")\r\n/******/ \t\t\t\t\thotSetStatus(\"prepare\");\r\n/******/ \t\t\t\thotChunksLoading++;\r\n/******/ \t\t\t\treturn __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {\r\n/******/ \t\t\t\t\tfinishChunkLoading();\r\n/******/ \t\t\t\t\tthrow err;\r\n/******/ \t\t\t\t});\r\n/******/ \t\r\n/******/ \t\t\t\tfunction finishChunkLoading() {\r\n/******/ \t\t\t\t\thotChunksLoading--;\r\n/******/ \t\t\t\t\tif(hotStatus === \"prepare\") {\r\n/******/ \t\t\t\t\t\tif(!hotWaitingFilesMap[chunkId]) {\r\n/******/ \t\t\t\t\t\t\thotEnsureUpdateChunk(chunkId);\r\n/******/ \t\t\t\t\t\t}\r\n/******/ \t\t\t\t\t\tif(hotChunksLoading === 0 && hotWaitingFiles === 0) {\r\n/******/ \t\t\t\t\t\t\thotUpdateDownloaded();\r\n/******/ \t\t\t\t\t\t}\r\n/******/ \t\t\t\t\t}\r\n/******/ \t\t\t\t}\r\n/******/ \t\t\t}\r\n/******/ \t\t});\r\n/******/ \t\treturn fn;\r\n/******/ \t}\r\n/******/ \t\r\n/******/ \tfunction hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars\r\n/******/ \t\tvar hot = {\r\n/******/ \t\t\t// private stuff\r\n/******/ \t\t\t_acceptedDependencies: {},\r\n/******/ \t\t\t_declinedDependencies: {},\r\n/******/ \t\t\t_selfAccepted: false,\r\n/******/ \t\t\t_selfDeclined: false,\r\n/******/ \t\t\t_disposeHandlers: [],\r\n/******/ \t\t\t_main: hotMainModule,\r\n/******/ \t\r\n/******/ \t\t\t// Module API\r\n/******/ \t\t\tactive: true,\r\n/******/ \t\t\taccept: function(dep, callback) {\r\n/******/ \t\t\t\tif(typeof dep === \"undefined\")\r\n/******/ \t\t\t\t\thot._selfAccepted = true;\r\n/******/ \t\t\t\telse if(typeof dep === \"function\")\r\n/******/ \t\t\t\t\thot._selfAccepted = dep;\r\n/******/ \t\t\t\telse if(typeof dep === \"object\")\r\n/******/ \t\t\t\t\tfor(var i = 0; i < dep.length; i++)\r\n/******/ \t\t\t\t\t\thot._acceptedDependencies[dep[i]] = callback || function() {};\r\n/******/ \t\t\t\telse\r\n/******/ \t\t\t\t\thot._acceptedDependencies[dep] = callback || function() {};\r\n/******/ \t\t\t},\r\n/******/ \t\t\tdecline: function(dep) {\r\n/******/ \t\t\t\tif(typeof dep === \"undefined\")\r\n/******/ \t\t\t\t\thot._selfDeclined = true;\r\n/******/ \t\t\t\telse if(typeof dep === \"object\")\r\n/******/ \t\t\t\t\tfor(var i = 0; i < dep.length; i++)\r\n/******/ \t\t\t\t\t\thot._declinedDependencies[dep[i]] = true;\r\n/******/ \t\t\t\telse\r\n/******/ \t\t\t\t\thot._declinedDependencies[dep] = true;\r\n/******/ \t\t\t},\r\n/******/ \t\t\tdispose: function(callback) {\r\n/******/ \t\t\t\thot._disposeHandlers.push(callback);\r\n/******/ \t\t\t},\r\n/******/ \t\t\taddDisposeHandler: function(callback) {\r\n/******/ \t\t\t\thot._disposeHandlers.push(callback);\r\n/******/ \t\t\t},\r\n/******/ \t\t\tremoveDisposeHandler: function(callback) {\r\n/******/ \t\t\t\tvar idx = hot._disposeHandlers.indexOf(callback);\r\n/******/ \t\t\t\tif(idx >= 0) hot._disposeHandlers.splice(idx, 1);\r\n/******/ \t\t\t},\r\n/******/ \t\r\n/******/ \t\t\t// Management API\r\n/******/ \t\t\tcheck: hotCheck,\r\n/******/ \t\t\tapply: hotApply,\r\n/******/ \t\t\tstatus: function(l) {\r\n/******/ \t\t\t\tif(!l) return hotStatus;\r\n/******/ \t\t\t\thotStatusHandlers.push(l);\r\n/******/ \t\t\t},\r\n/******/ \t\t\taddStatusHandler: function(l) {\r\n/******/ \t\t\t\thotStatusHandlers.push(l);\r\n/******/ \t\t\t},\r\n/******/ \t\t\tremoveStatusHandler: function(l) {\r\n/******/ \t\t\t\tvar idx = hotStatusHandlers.indexOf(l);\r\n/******/ \t\t\t\tif(idx >= 0) hotStatusHandlers.splice(idx, 1);\r\n/******/ \t\t\t},\r\n/******/ \t\r\n/******/ \t\t\t//inherit from previous dispose call\r\n/******/ \t\t\tdata: hotCurrentModuleData[moduleId]\r\n/******/ \t\t};\r\n/******/ \t\thotMainModule = true;\r\n/******/ \t\treturn hot;\r\n/******/ \t}\r\n/******/ \t\r\n/******/ \tvar hotStatusHandlers = [];\r\n/******/ \tvar hotStatus = \"idle\";\r\n/******/ \t\r\n/******/ \tfunction hotSetStatus(newStatus) {\r\n/******/ \t\thotStatus = newStatus;\r\n/******/ \t\tfor(var i = 0; i < hotStatusHandlers.length; i++)\r\n/******/ \t\t\thotStatusHandlers[i].call(null, newStatus);\r\n/******/ \t}\r\n/******/ \t\r\n/******/ \t// while downloading\r\n/******/ \tvar hotWaitingFiles = 0;\r\n/******/ \tvar hotChunksLoading = 0;\r\n/******/ \tvar hotWaitingFilesMap = {};\r\n/******/ \tvar hotRequestedFilesMap = {};\r\n/******/ \tvar hotAvailableFilesMap = {};\r\n/******/ \tvar hotDeferred;\r\n/******/ \t\r\n/******/ \t// The update info\r\n/******/ \tvar hotUpdate, hotUpdateNewHash;\r\n/******/ \t\r\n/******/ \tfunction toModuleId(id) {\r\n/******/ \t\tvar isNumber = (+id) + \"\" === id;\r\n/******/ \t\treturn isNumber ? +id : id;\r\n/******/ \t}\r\n/******/ \t\r\n/******/ \tfunction hotCheck(apply) {\r\n/******/ \t\tif(hotStatus !== \"idle\") throw new Error(\"check() is only allowed in idle status\");\r\n/******/ \t\thotApplyOnUpdate = apply;\r\n/******/ \t\thotSetStatus(\"check\");\r\n/******/ \t\treturn hotDownloadManifest().then(function(update) {\r\n/******/ \t\t\tif(!update) {\r\n/******/ \t\t\t\thotSetStatus(\"idle\");\r\n/******/ \t\t\t\treturn null;\r\n/******/ \t\t\t}\r\n/******/ \t\r\n/******/ \t\t\thotRequestedFilesMap = {};\r\n/******/ \t\t\thotWaitingFilesMap = {};\r\n/******/ \t\t\thotAvailableFilesMap = update.c;\r\n/******/ \t\t\thotUpdateNewHash = update.h;\r\n/******/ \t\r\n/******/ \t\t\thotSetStatus(\"prepare\");\r\n/******/ \t\t\tvar promise = new Promise(function(resolve, reject) {\r\n/******/ \t\t\t\thotDeferred = {\r\n/******/ \t\t\t\t\tresolve: resolve,\r\n/******/ \t\t\t\t\treject: reject\r\n/******/ \t\t\t\t};\r\n/******/ \t\t\t});\r\n/******/ \t\t\thotUpdate = {};\r\n/******/ \t\t\tvar chunkId = 0;\r\n/******/ \t\t\t{ // eslint-disable-line no-lone-blocks\r\n/******/ \t\t\t\t/*globals chunkId */\r\n/******/ \t\t\t\thotEnsureUpdateChunk(chunkId);\r\n/******/ \t\t\t}\r\n/******/ \t\t\tif(hotStatus === \"prepare\" && hotChunksLoading === 0 && hotWaitingFiles === 0) {\r\n/******/ \t\t\t\thotUpdateDownloaded();\r\n/******/ \t\t\t}\r\n/******/ \t\t\treturn promise;\r\n/******/ \t\t});\r\n/******/ \t}\r\n/******/ \t\r\n/******/ \tfunction hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars\r\n/******/ \t\tif(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])\r\n/******/ \t\t\treturn;\r\n/******/ \t\thotRequestedFilesMap[chunkId] = false;\r\n/******/ \t\tfor(var moduleId in moreModules) {\r\n/******/ \t\t\tif(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {\r\n/******/ \t\t\t\thotUpdate[moduleId] = moreModules[moduleId];\r\n/******/ \t\t\t}\r\n/******/ \t\t}\r\n/******/ \t\tif(--hotWaitingFiles === 0 && hotChunksLoading === 0) {\r\n/******/ \t\t\thotUpdateDownloaded();\r\n/******/ \t\t}\r\n/******/ \t}\r\n/******/ \t\r\n/******/ \tfunction hotEnsureUpdateChunk(chunkId) {\r\n/******/ \t\tif(!hotAvailableFilesMap[chunkId]) {\r\n/******/ \t\t\thotWaitingFilesMap[chunkId] = true;\r\n/******/ \t\t} else {\r\n/******/ \t\t\thotRequestedFilesMap[chunkId] = true;\r\n/******/ \t\t\thotWaitingFiles++;\r\n/******/ \t\t\thotDownloadUpdateChunk(chunkId);\r\n/******/ \t\t}\r\n/******/ \t}\r\n/******/ \t\r\n/******/ \tfunction hotUpdateDownloaded() {\r\n/******/ \t\thotSetStatus(\"ready\");\r\n/******/ \t\tvar deferred = hotDeferred;\r\n/******/ \t\thotDeferred = null;\r\n/******/ \t\tif(!deferred) return;\r\n/******/ \t\tif(hotApplyOnUpdate) {\r\n/******/ \t\t\thotApply(hotApplyOnUpdate).then(function(result) {\r\n/******/ \t\t\t\tdeferred.resolve(result);\r\n/******/ \t\t\t}, function(err) {\r\n/******/ \t\t\t\tdeferred.reject(err);\r\n/******/ \t\t\t});\r\n/******/ \t\t} else {\r\n/******/ \t\t\tvar outdatedModules = [];\r\n/******/ \t\t\tfor(var id in hotUpdate) {\r\n/******/ \t\t\t\tif(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {\r\n/******/ \t\t\t\t\toutdatedModules.push(toModuleId(id));\r\n/******/ \t\t\t\t}\r\n/******/ \t\t\t}\r\n/******/ \t\t\tdeferred.resolve(outdatedModules);\r\n/******/ \t\t}\r\n/******/ \t}\r\n/******/ \t\r\n/******/ \tfunction hotApply(options) {\r\n/******/ \t\tif(hotStatus !== \"ready\") throw new Error(\"apply() is only allowed in ready status\");\r\n/******/ \t\toptions = options || {};\r\n/******/ \t\r\n/******/ \t\tvar cb;\r\n/******/ \t\tvar i;\r\n/******/ \t\tvar j;\r\n/******/ \t\tvar module;\r\n/******/ \t\tvar moduleId;\r\n/******/ \t\r\n/******/ \t\tfunction getAffectedStuff(updateModuleId) {\r\n/******/ \t\t\tvar outdatedModules = [updateModuleId];\r\n/******/ \t\t\tvar outdatedDependencies = {};\r\n/******/ \t\r\n/******/ \t\t\tvar queue = outdatedModules.slice().map(function(id) {\r\n/******/ \t\t\t\treturn {\r\n/******/ \t\t\t\t\tchain: [id],\r\n/******/ \t\t\t\t\tid: id\r\n/******/ \t\t\t\t};\r\n/******/ \t\t\t});\r\n/******/ \t\t\twhile(queue.length > 0) {\r\n/******/ \t\t\t\tvar queueItem = queue.pop();\r\n/******/ \t\t\t\tvar moduleId = queueItem.id;\r\n/******/ \t\t\t\tvar chain = queueItem.chain;\r\n/******/ \t\t\t\tmodule = installedModules[moduleId];\r\n/******/ \t\t\t\tif(!module || module.hot._selfAccepted)\r\n/******/ \t\t\t\t\tcontinue;\r\n/******/ \t\t\t\tif(module.hot._selfDeclined) {\r\n/******/ \t\t\t\t\treturn {\r\n/******/ \t\t\t\t\t\ttype: \"self-declined\",\r\n/******/ \t\t\t\t\t\tchain: chain,\r\n/******/ \t\t\t\t\t\tmoduleId: moduleId\r\n/******/ \t\t\t\t\t};\r\n/******/ \t\t\t\t}\r\n/******/ \t\t\t\tif(module.hot._main) {\r\n/******/ \t\t\t\t\treturn {\r\n/******/ \t\t\t\t\t\ttype: \"unaccepted\",\r\n/******/ \t\t\t\t\t\tchain: chain,\r\n/******/ \t\t\t\t\t\tmoduleId: moduleId\r\n/******/ \t\t\t\t\t};\r\n/******/ \t\t\t\t}\r\n/******/ \t\t\t\tfor(var i = 0; i < module.parents.length; i++) {\r\n/******/ \t\t\t\t\tvar parentId = module.parents[i];\r\n/******/ \t\t\t\t\tvar parent = installedModules[parentId];\r\n/******/ \t\t\t\t\tif(!parent) continue;\r\n/******/ \t\t\t\t\tif(parent.hot._declinedDependencies[moduleId]) {\r\n/******/ \t\t\t\t\t\treturn {\r\n/******/ \t\t\t\t\t\t\ttype: \"declined\",\r\n/******/ \t\t\t\t\t\t\tchain: chain.concat([parentId]),\r\n/******/ \t\t\t\t\t\t\tmoduleId: moduleId,\r\n/******/ \t\t\t\t\t\t\tparentId: parentId\r\n/******/ \t\t\t\t\t\t};\r\n/******/ \t\t\t\t\t}\r\n/******/ \t\t\t\t\tif(outdatedModules.indexOf(parentId) >= 0) continue;\r\n/******/ \t\t\t\t\tif(parent.hot._acceptedDependencies[moduleId]) {\r\n/******/ \t\t\t\t\t\tif(!outdatedDependencies[parentId])\r\n/******/ \t\t\t\t\t\t\toutdatedDependencies[parentId] = [];\r\n/******/ \t\t\t\t\t\taddAllToSet(outdatedDependencies[parentId], [moduleId]);\r\n/******/ \t\t\t\t\t\tcontinue;\r\n/******/ \t\t\t\t\t}\r\n/******/ \t\t\t\t\tdelete outdatedDependencies[parentId];\r\n/******/ \t\t\t\t\toutdatedModules.push(parentId);\r\n/******/ \t\t\t\t\tqueue.push({\r\n/******/ \t\t\t\t\t\tchain: chain.concat([parentId]),\r\n/******/ \t\t\t\t\t\tid: parentId\r\n/******/ \t\t\t\t\t});\r\n/******/ \t\t\t\t}\r\n/******/ \t\t\t}\r\n/******/ \t\r\n/******/ \t\t\treturn {\r\n/******/ \t\t\t\ttype: \"accepted\",\r\n/******/ \t\t\t\tmoduleId: updateModuleId,\r\n/******/ \t\t\t\toutdatedModules: outdatedModules,\r\n/******/ \t\t\t\toutdatedDependencies: outdatedDependencies\r\n/******/ \t\t\t};\r\n/******/ \t\t}\r\n/******/ \t\r\n/******/ \t\tfunction addAllToSet(a, b) {\r\n/******/ \t\t\tfor(var i = 0; i < b.length; i++) {\r\n/******/ \t\t\t\tvar item = b[i];\r\n/******/ \t\t\t\tif(a.indexOf(item) < 0)\r\n/******/ \t\t\t\t\ta.push(item);\r\n/******/ \t\t\t}\r\n/******/ \t\t}\r\n/******/ \t\r\n/******/ \t\t// at begin all updates modules are outdated\r\n/******/ \t\t// the \"outdated\" status can propagate to parents if they don't accept the children\r\n/******/ \t\tvar outdatedDependencies = {};\r\n/******/ \t\tvar outdatedModules = [];\r\n/******/ \t\tvar appliedUpdate = {};\r\n/******/ \t\r\n/******/ \t\tvar warnUnexpectedRequire = function warnUnexpectedRequire() {\r\n/******/ \t\t\tconsole.warn(\"[HMR] unexpected require(\" + result.moduleId + \") to disposed module\");\r\n/******/ \t\t};\r\n/******/ \t\r\n/******/ \t\tfor(var id in hotUpdate) {\r\n/******/ \t\t\tif(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {\r\n/******/ \t\t\t\tmoduleId = toModuleId(id);\r\n/******/ \t\t\t\tvar result;\r\n/******/ \t\t\t\tif(hotUpdate[id]) {\r\n/******/ \t\t\t\t\tresult = getAffectedStuff(moduleId);\r\n/******/ \t\t\t\t} else {\r\n/******/ \t\t\t\t\tresult = {\r\n/******/ \t\t\t\t\t\ttype: \"disposed\",\r\n/******/ \t\t\t\t\t\tmoduleId: id\r\n/******/ \t\t\t\t\t};\r\n/******/ \t\t\t\t}\r\n/******/ \t\t\t\tvar abortError = false;\r\n/******/ \t\t\t\tvar doApply = false;\r\n/******/ \t\t\t\tvar doDispose = false;\r\n/******/ \t\t\t\tvar chainInfo = \"\";\r\n/******/ \t\t\t\tif(result.chain) {\r\n/******/ \t\t\t\t\tchainInfo = \"\\nUpdate propagation: \" + result.chain.join(\" -> \");\r\n/******/ \t\t\t\t}\r\n/******/ \t\t\t\tswitch(result.type) {\r\n/******/ \t\t\t\t\tcase \"self-declined\":\r\n/******/ \t\t\t\t\t\tif(options.onDeclined)\r\n/******/ \t\t\t\t\t\t\toptions.onDeclined(result);\r\n/******/ \t\t\t\t\t\tif(!options.ignoreDeclined)\r\n/******/ \t\t\t\t\t\t\tabortError = new Error(\"Aborted because of self decline: \" + result.moduleId + chainInfo);\r\n/******/ \t\t\t\t\t\tbreak;\r\n/******/ \t\t\t\t\tcase \"declined\":\r\n/******/ \t\t\t\t\t\tif(options.onDeclined)\r\n/******/ \t\t\t\t\t\t\toptions.onDeclined(result);\r\n/******/ \t\t\t\t\t\tif(!options.ignoreDeclined)\r\n/******/ \t\t\t\t\t\t\tabortError = new Error(\"Aborted because of declined dependency: \" + result.moduleId + \" in \" + result.parentId + chainInfo);\r\n/******/ \t\t\t\t\t\tbreak;\r\n/******/ \t\t\t\t\tcase \"unaccepted\":\r\n/******/ \t\t\t\t\t\tif(options.onUnaccepted)\r\n/******/ \t\t\t\t\t\t\toptions.onUnaccepted(result);\r\n/******/ \t\t\t\t\t\tif(!options.ignoreUnaccepted)\r\n/******/ \t\t\t\t\t\t\tabortError = new Error(\"Aborted because \" + moduleId + \" is not accepted\" + chainInfo);\r\n/******/ \t\t\t\t\t\tbreak;\r\n/******/ \t\t\t\t\tcase \"accepted\":\r\n/******/ \t\t\t\t\t\tif(options.onAccepted)\r\n/******/ \t\t\t\t\t\t\toptions.onAccepted(result);\r\n/******/ \t\t\t\t\t\tdoApply = true;\r\n/******/ \t\t\t\t\t\tbreak;\r\n/******/ \t\t\t\t\tcase \"disposed\":\r\n/******/ \t\t\t\t\t\tif(options.onDisposed)\r\n/******/ \t\t\t\t\t\t\toptions.onDisposed(result);\r\n/******/ \t\t\t\t\t\tdoDispose = true;\r\n/******/ \t\t\t\t\t\tbreak;\r\n/******/ \t\t\t\t\tdefault:\r\n/******/ \t\t\t\t\t\tthrow new Error(\"Unexception type \" + result.type);\r\n/******/ \t\t\t\t}\r\n/******/ \t\t\t\tif(abortError) {\r\n/******/ \t\t\t\t\thotSetStatus(\"abort\");\r\n/******/ \t\t\t\t\treturn Promise.reject(abortError);\r\n/******/ \t\t\t\t}\r\n/******/ \t\t\t\tif(doApply) {\r\n/******/ \t\t\t\t\tappliedUpdate[moduleId] = hotUpdate[moduleId];\r\n/******/ \t\t\t\t\taddAllToSet(outdatedModules, result.outdatedModules);\r\n/******/ \t\t\t\t\tfor(moduleId in result.outdatedDependencies) {\r\n/******/ \t\t\t\t\t\tif(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {\r\n/******/ \t\t\t\t\t\t\tif(!outdatedDependencies[moduleId])\r\n/******/ \t\t\t\t\t\t\t\toutdatedDependencies[moduleId] = [];\r\n/******/ \t\t\t\t\t\t\taddAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);\r\n/******/ \t\t\t\t\t\t}\r\n/******/ \t\t\t\t\t}\r\n/******/ \t\t\t\t}\r\n/******/ \t\t\t\tif(doDispose) {\r\n/******/ \t\t\t\t\taddAllToSet(outdatedModules, [result.moduleId]);\r\n/******/ \t\t\t\t\tappliedUpdate[moduleId] = warnUnexpectedRequire;\r\n/******/ \t\t\t\t}\r\n/******/ \t\t\t}\r\n/******/ \t\t}\r\n/******/ \t\r\n/******/ \t\t// Store self accepted outdated modules to require them later by the module system\r\n/******/ \t\tvar outdatedSelfAcceptedModules = [];\r\n/******/ \t\tfor(i = 0; i < outdatedModules.length; i++) {\r\n/******/ \t\t\tmoduleId = outdatedModules[i];\r\n/******/ \t\t\tif(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)\r\n/******/ \t\t\t\toutdatedSelfAcceptedModules.push({\r\n/******/ \t\t\t\t\tmodule: moduleId,\r\n/******/ \t\t\t\t\terrorHandler: installedModules[moduleId].hot._selfAccepted\r\n/******/ \t\t\t\t});\r\n/******/ \t\t}\r\n/******/ \t\r\n/******/ \t\t// Now in \"dispose\" phase\r\n/******/ \t\thotSetStatus(\"dispose\");\r\n/******/ \t\tObject.keys(hotAvailableFilesMap).forEach(function(chunkId) {\r\n/******/ \t\t\tif(hotAvailableFilesMap[chunkId] === false) {\r\n/******/ \t\t\t\thotDisposeChunk(chunkId);\r\n/******/ \t\t\t}\r\n/******/ \t\t});\r\n/******/ \t\r\n/******/ \t\tvar idx;\r\n/******/ \t\tvar queue = outdatedModules.slice();\r\n/******/ \t\twhile(queue.length > 0) {\r\n/******/ \t\t\tmoduleId = queue.pop();\r\n/******/ \t\t\tmodule = installedModules[moduleId];\r\n/******/ \t\t\tif(!module) continue;\r\n/******/ \t\r\n/******/ \t\t\tvar data = {};\r\n/******/ \t\r\n/******/ \t\t\t// Call dispose handlers\r\n/******/ \t\t\tvar disposeHandlers = module.hot._disposeHandlers;\r\n/******/ \t\t\tfor(j = 0; j < disposeHandlers.length; j++) {\r\n/******/ \t\t\t\tcb = disposeHandlers[j];\r\n/******/ \t\t\t\tcb(data);\r\n/******/ \t\t\t}\r\n/******/ \t\t\thotCurrentModuleData[moduleId] = data;\r\n/******/ \t\r\n/******/ \t\t\t// disable module (this disables requires from this module)\r\n/******/ \t\t\tmodule.hot.active = false;\r\n/******/ \t\r\n/******/ \t\t\t// remove module from cache\r\n/******/ \t\t\tdelete installedModules[moduleId];\r\n/******/ \t\r\n/******/ \t\t\t// remove \"parents\" references from all children\r\n/******/ \t\t\tfor(j = 0; j < module.children.length; j++) {\r\n/******/ \t\t\t\tvar child = installedModules[module.children[j]];\r\n/******/ \t\t\t\tif(!child) continue;\r\n/******/ \t\t\t\tidx = child.parents.indexOf(moduleId);\r\n/******/ \t\t\t\tif(idx >= 0) {\r\n/******/ \t\t\t\t\tchild.parents.splice(idx, 1);\r\n/******/ \t\t\t\t}\r\n/******/ \t\t\t}\r\n/******/ \t\t}\r\n/******/ \t\r\n/******/ \t\t// remove outdated dependency from module children\r\n/******/ \t\tvar dependency;\r\n/******/ \t\tvar moduleOutdatedDependencies;\r\n/******/ \t\tfor(moduleId in outdatedDependencies) {\r\n/******/ \t\t\tif(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {\r\n/******/ \t\t\t\tmodule = installedModules[moduleId];\r\n/******/ \t\t\t\tif(module) {\r\n/******/ \t\t\t\t\tmoduleOutdatedDependencies = outdatedDependencies[moduleId];\r\n/******/ \t\t\t\t\tfor(j = 0; j < moduleOutdatedDependencies.length; j++) {\r\n/******/ \t\t\t\t\t\tdependency = moduleOutdatedDependencies[j];\r\n/******/ \t\t\t\t\t\tidx = module.children.indexOf(dependency);\r\n/******/ \t\t\t\t\t\tif(idx >= 0) module.children.splice(idx, 1);\r\n/******/ \t\t\t\t\t}\r\n/******/ \t\t\t\t}\r\n/******/ \t\t\t}\r\n/******/ \t\t}\r\n/******/ \t\r\n/******/ \t\t// Not in \"apply\" phase\r\n/******/ \t\thotSetStatus(\"apply\");\r\n/******/ \t\r\n/******/ \t\thotCurrentHash = hotUpdateNewHash;\r\n/******/ \t\r\n/******/ \t\t// insert new code\r\n/******/ \t\tfor(moduleId in appliedUpdate) {\r\n/******/ \t\t\tif(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {\r\n/******/ \t\t\t\tmodules[moduleId] = appliedUpdate[moduleId];\r\n/******/ \t\t\t}\r\n/******/ \t\t}\r\n/******/ \t\r\n/******/ \t\t// call accept handlers\r\n/******/ \t\tvar error = null;\r\n/******/ \t\tfor(moduleId in outdatedDependencies) {\r\n/******/ \t\t\tif(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {\r\n/******/ \t\t\t\tmodule = installedModules[moduleId];\r\n/******/ \t\t\t\tmoduleOutdatedDependencies = outdatedDependencies[moduleId];\r\n/******/ \t\t\t\tvar callbacks = [];\r\n/******/ \t\t\t\tfor(i = 0; i < moduleOutdatedDependencies.length; i++) {\r\n/******/ \t\t\t\t\tdependency = moduleOutdatedDependencies[i];\r\n/******/ \t\t\t\t\tcb = module.hot._acceptedDependencies[dependency];\r\n/******/ \t\t\t\t\tif(callbacks.indexOf(cb) >= 0) continue;\r\n/******/ \t\t\t\t\tcallbacks.push(cb);\r\n/******/ \t\t\t\t}\r\n/******/ \t\t\t\tfor(i = 0; i < callbacks.length; i++) {\r\n/******/ \t\t\t\t\tcb = callbacks[i];\r\n/******/ \t\t\t\t\ttry {\r\n/******/ \t\t\t\t\t\tcb(moduleOutdatedDependencies);\r\n/******/ \t\t\t\t\t} catch(err) {\r\n/******/ \t\t\t\t\t\tif(options.onErrored) {\r\n/******/ \t\t\t\t\t\t\toptions.onErrored({\r\n/******/ \t\t\t\t\t\t\t\ttype: \"accept-errored\",\r\n/******/ \t\t\t\t\t\t\t\tmoduleId: moduleId,\r\n/******/ \t\t\t\t\t\t\t\tdependencyId: moduleOutdatedDependencies[i],\r\n/******/ \t\t\t\t\t\t\t\terror: err\r\n/******/ \t\t\t\t\t\t\t});\r\n/******/ \t\t\t\t\t\t}\r\n/******/ \t\t\t\t\t\tif(!options.ignoreErrored) {\r\n/******/ \t\t\t\t\t\t\tif(!error)\r\n/******/ \t\t\t\t\t\t\t\terror = err;\r\n/******/ \t\t\t\t\t\t}\r\n/******/ \t\t\t\t\t}\r\n/******/ \t\t\t\t}\r\n/******/ \t\t\t}\r\n/******/ \t\t}\r\n/******/ \t\r\n/******/ \t\t// Load self accepted modules\r\n/******/ \t\tfor(i = 0; i < outdatedSelfAcceptedModules.length; i++) {\r\n/******/ \t\t\tvar item = outdatedSelfAcceptedModules[i];\r\n/******/ \t\t\tmoduleId = item.module;\r\n/******/ \t\t\thotCurrentParents = [moduleId];\r\n/******/ \t\t\ttry {\r\n/******/ \t\t\t\t__webpack_require__(moduleId);\r\n/******/ \t\t\t} catch(err) {\r\n/******/ \t\t\t\tif(typeof item.errorHandler === \"function\") {\r\n/******/ \t\t\t\t\ttry {\r\n/******/ \t\t\t\t\t\titem.errorHandler(err);\r\n/******/ \t\t\t\t\t} catch(err2) {\r\n/******/ \t\t\t\t\t\tif(options.onErrored) {\r\n/******/ \t\t\t\t\t\t\toptions.onErrored({\r\n/******/ \t\t\t\t\t\t\t\ttype: \"self-accept-error-handler-errored\",\r\n/******/ \t\t\t\t\t\t\t\tmoduleId: moduleId,\r\n/******/ \t\t\t\t\t\t\t\terror: err2,\r\n/******/ \t\t\t\t\t\t\t\torginalError: err\r\n/******/ \t\t\t\t\t\t\t});\r\n/******/ \t\t\t\t\t\t}\r\n/******/ \t\t\t\t\t\tif(!options.ignoreErrored) {\r\n/******/ \t\t\t\t\t\t\tif(!error)\r\n/******/ \t\t\t\t\t\t\t\terror = err2;\r\n/******/ \t\t\t\t\t\t}\r\n/******/ \t\t\t\t\t\tif(!error)\r\n/******/ \t\t\t\t\t\t\terror = err;\r\n/******/ \t\t\t\t\t}\r\n/******/ \t\t\t\t} else {\r\n/******/ \t\t\t\t\tif(options.onErrored) {\r\n/******/ \t\t\t\t\t\toptions.onErrored({\r\n/******/ \t\t\t\t\t\t\ttype: \"self-accept-errored\",\r\n/******/ \t\t\t\t\t\t\tmoduleId: moduleId,\r\n/******/ \t\t\t\t\t\t\terror: err\r\n/******/ \t\t\t\t\t\t});\r\n/******/ \t\t\t\t\t}\r\n/******/ \t\t\t\t\tif(!options.ignoreErrored) {\r\n/******/ \t\t\t\t\t\tif(!error)\r\n/******/ \t\t\t\t\t\t\terror = err;\r\n/******/ \t\t\t\t\t}\r\n/******/ \t\t\t\t}\r\n/******/ \t\t\t}\r\n/******/ \t\t}\r\n/******/ \t\r\n/******/ \t\t// handle errors in accept handlers and self accepted module load\r\n/******/ \t\tif(error) {\r\n/******/ \t\t\thotSetStatus(\"fail\");\r\n/******/ \t\t\treturn Promise.reject(error);\r\n/******/ \t\t}\r\n/******/ \t\r\n/******/ \t\thotSetStatus(\"idle\");\r\n/******/ \t\treturn Promise.resolve(outdatedModules);\r\n/******/ \t}\r\n\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId])\n/******/ \t\t\treturn installedModules[moduleId].exports;\n\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {},\n/******/ \t\t\thot: hotCreateModule(moduleId),\n/******/ \t\t\tparents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),\n/******/ \t\t\tchildren: []\n/******/ \t\t};\n\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));\n\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n\n\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n\n/******/ \t// identity function for calling harmony imports with the correct context\n/******/ \t__webpack_require__.i = function(value) { return value; };\n\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, {\n/******/ \t\t\t\tconfigurable: false,\n/******/ \t\t\t\tenumerable: true,\n/******/ \t\t\t\tget: getter\n/******/ \t\t\t});\n/******/ \t\t}\n/******/ \t};\n\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n\n/******/ \t// __webpack_hash__\n/******/ \t__webpack_require__.h = function() { return hotCurrentHash; };\n\n/******/ \t// Load entry module and return exports\n/******/ \treturn hotCreateRequire(1)(__webpack_require__.s = 1);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\neval(\"\\n\\nObject.defineProperty(exports, \\\"__esModule\\\", {\\n  value: true\\n});\\n// add a function dashedLineTo to CanvasRenderingContext2D.prototype\\n(function () {\\n  /* global CanvasRenderingContext2D */\\n  var moveToFunction = CanvasRenderingContext2D.prototype.moveTo;\\n\\n  // obj to record the last point location\\n  CanvasRenderingContext2D.prototype.lastMoveToLocation = {};\\n  // rewrite moveTo to record the last point location\\n  CanvasRenderingContext2D.prototype.moveTo = function (x, y) {\\n    // this point to current context obj\\n    moveToFunction.apply(this, [x, y]);\\n    this.lastMoveToLocation.x = x;\\n    this.lastMoveToLocation.y = y;\\n  };\\n  CanvasRenderingContext2D.prototype.dashedLineTo = function (x, y, dashLength) {\\n    dashLength = dashLength || 5;\\n    dashLength = dashLength < 0 || 5;\\n    var startX, startY, deltaX, deltaY, numDeshes;\\n    startX = this.lastMoveToLocation.x;\\n    startY = this.lastMoveToLocation.y;\\n    deltaX = x - startX;\\n    deltaY = y - startY;\\n    numDeshes = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength);\\n    for (var i = 0; i < numDeshes; i++) {\\n      this[i % 2 === 0 ? 'moveTo' : 'lineTo'](startX + deltaX / numDeshes * i, startY + deltaY / numDeshes * i);\\n    }\\n    // case of odd num\\n    this.moveTo(x, y);\\n  };\\n})();\\n\\n// module.exports=CanvasRenderingContext2D\\nexports.CanvasRenderingContext2D = CanvasRenderingContext2D;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZGFzaGVkTGluZVRvLmpzPzQ1M2MiXSwibmFtZXMiOlsibW92ZVRvRnVuY3Rpb24iLCJDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQiLCJwcm90b3R5cGUiLCJtb3ZlVG8iLCJsYXN0TW92ZVRvTG9jYXRpb24iLCJ4IiwieSIsImFwcGx5IiwiZGFzaGVkTGluZVRvIiwiZGFzaExlbmd0aCIsInN0YXJ0WCIsInN0YXJ0WSIsImRlbHRhWCIsImRlbHRhWSIsIm51bURlc2hlcyIsIk1hdGgiLCJmbG9vciIsInNxcnQiLCJpIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0EsQ0FBQyxZQUFZO0FBQ1g7QUFDQSxNQUFJQSxpQkFBaUJDLHlCQUF5QkMsU0FBekIsQ0FBbUNDLE1BQXhEOztBQUVBO0FBQ0FGLDJCQUF5QkMsU0FBekIsQ0FBbUNFLGtCQUFuQyxHQUF3RCxFQUF4RDtBQUNBO0FBQ0FILDJCQUF5QkMsU0FBekIsQ0FBbUNDLE1BQW5DLEdBQTRDLFVBQVVFLENBQVYsRUFBYUMsQ0FBYixFQUFnQjtBQUMxRDtBQUNBTixtQkFBZU8sS0FBZixDQUFxQixJQUFyQixFQUEyQixDQUFDRixDQUFELEVBQUlDLENBQUosQ0FBM0I7QUFDQSxTQUFLRixrQkFBTCxDQUF3QkMsQ0FBeEIsR0FBNEJBLENBQTVCO0FBQ0EsU0FBS0Qsa0JBQUwsQ0FBd0JFLENBQXhCLEdBQTRCQSxDQUE1QjtBQUNELEdBTEQ7QUFNQUwsMkJBQXlCQyxTQUF6QixDQUFtQ00sWUFBbkMsR0FBa0QsVUFBVUgsQ0FBVixFQUFhQyxDQUFiLEVBQWdCRyxVQUFoQixFQUE0QjtBQUM1RUEsaUJBQWFBLGNBQWMsQ0FBM0I7QUFDQUEsaUJBQWFBLGFBQWEsQ0FBYixJQUFrQixDQUEvQjtBQUNBLFFBQUlDLE1BQUosRUFBWUMsTUFBWixFQUFvQkMsTUFBcEIsRUFBNEJDLE1BQTVCLEVBQW9DQyxTQUFwQztBQUNBSixhQUFTLEtBQUtOLGtCQUFMLENBQXdCQyxDQUFqQztBQUNBTSxhQUFTLEtBQUtQLGtCQUFMLENBQXdCRSxDQUFqQztBQUNBTSxhQUFTUCxJQUFJSyxNQUFiO0FBQ0FHLGFBQVNQLElBQUlLLE1BQWI7QUFDQUcsZ0JBQVlDLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsSUFBTCxDQUFVTCxTQUFTQSxNQUFULEdBQWtCQyxTQUFTQSxNQUFyQyxJQUErQ0osVUFBMUQsQ0FBWjtBQUNBLFNBQUssSUFBSVMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSixTQUFwQixFQUErQkksR0FBL0IsRUFBb0M7QUFDbEMsV0FBS0EsSUFBSSxDQUFKLEtBQVUsQ0FBVixHQUFjLFFBQWQsR0FBeUIsUUFBOUIsRUFBd0NSLFNBQVVFLFNBQVNFLFNBQVYsR0FBdUJJLENBQXhFLEVBQTJFUCxTQUFVRSxTQUFTQyxTQUFWLEdBQXVCSSxDQUEzRztBQUNEO0FBQ0Q7QUFDQSxTQUFLZixNQUFMLENBQVlFLENBQVosRUFBZUMsQ0FBZjtBQUNELEdBZEQ7QUFlRCxDQTVCRDs7QUE4QkE7UUFDUUwsd0IsR0FBQUEsd0IiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGFkZCBhIGZ1bmN0aW9uIGRhc2hlZExpbmVUbyB0byBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQucHJvdG90eXBlXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgLyogZ2xvYmFsIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCAqL1xyXG4gIHZhciBtb3ZlVG9GdW5jdGlvbiA9IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRC5wcm90b3R5cGUubW92ZVRvXHJcblxyXG4gIC8vIG9iaiB0byByZWNvcmQgdGhlIGxhc3QgcG9pbnQgbG9jYXRpb25cclxuICBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQucHJvdG90eXBlLmxhc3RNb3ZlVG9Mb2NhdGlvbiA9IHt9XHJcbiAgLy8gcmV3cml0ZSBtb3ZlVG8gdG8gcmVjb3JkIHRoZSBsYXN0IHBvaW50IGxvY2F0aW9uXHJcbiAgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELnByb3RvdHlwZS5tb3ZlVG8gPSBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgLy8gdGhpcyBwb2ludCB0byBjdXJyZW50IGNvbnRleHQgb2JqXHJcbiAgICBtb3ZlVG9GdW5jdGlvbi5hcHBseSh0aGlzLCBbeCwgeV0pXHJcbiAgICB0aGlzLmxhc3RNb3ZlVG9Mb2NhdGlvbi54ID0geFxyXG4gICAgdGhpcy5sYXN0TW92ZVRvTG9jYXRpb24ueSA9IHlcclxuICB9XHJcbiAgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELnByb3RvdHlwZS5kYXNoZWRMaW5lVG8gPSBmdW5jdGlvbiAoeCwgeSwgZGFzaExlbmd0aCkge1xyXG4gICAgZGFzaExlbmd0aCA9IGRhc2hMZW5ndGggfHwgNVxyXG4gICAgZGFzaExlbmd0aCA9IGRhc2hMZW5ndGggPCAwIHx8IDVcclxuICAgIHZhciBzdGFydFgsIHN0YXJ0WSwgZGVsdGFYLCBkZWx0YVksIG51bURlc2hlc1xyXG4gICAgc3RhcnRYID0gdGhpcy5sYXN0TW92ZVRvTG9jYXRpb24ueFxyXG4gICAgc3RhcnRZID0gdGhpcy5sYXN0TW92ZVRvTG9jYXRpb24ueVxyXG4gICAgZGVsdGFYID0geCAtIHN0YXJ0WFxyXG4gICAgZGVsdGFZID0geSAtIHN0YXJ0WVxyXG4gICAgbnVtRGVzaGVzID0gTWF0aC5mbG9vcihNYXRoLnNxcnQoZGVsdGFYICogZGVsdGFYICsgZGVsdGFZICogZGVsdGFZKSAvIGRhc2hMZW5ndGgpXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bURlc2hlczsgaSsrKSB7XHJcbiAgICAgIHRoaXNbaSAlIDIgPT09IDAgPyAnbW92ZVRvJyA6ICdsaW5lVG8nXShzdGFydFggKyAoZGVsdGFYIC8gbnVtRGVzaGVzKSAqIGksIHN0YXJ0WSArIChkZWx0YVkgLyBudW1EZXNoZXMpICogaSlcclxuICAgIH1cclxuICAgIC8vIGNhc2Ugb2Ygb2RkIG51bVxyXG4gICAgdGhpcy5tb3ZlVG8oeCwgeSlcclxuICB9XHJcbn0pKClcclxuXHJcbi8vIG1vZHVsZS5leHBvcnRzPUNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxyXG5leHBvcnQge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Rhc2hlZExpbmVUby5qcyJdLCJzb3VyY2VSb290IjoiIn0=\");\n\n/***/ }),\n/* 1 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\neval(\"\\n\\nObject.defineProperty(exports, \\\"__esModule\\\", {\\n  value: true\\n});\\nexports.can = undefined;\\n\\nvar _dashedLineTo = __webpack_require__(0);\\n\\nvar _dashedLineTo2 = _interopRequireDefault(_dashedLineTo);\\n\\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\\n\\n// module.exports=can\\nvar can = exports.can = {\\n  CanvasRenderingContext2D: _dashedLineTo2.default\\n}; // require('./deshedLineTo.js')//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/OTU1MiJdLCJuYW1lcyI6WyJjYW4iLCJDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDTyxJQUFNQSxvQkFBTTtBQUNqQkM7QUFEaUIsQ0FBWixDLENBSlAiLCJmaWxlIjoiMS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHJlcXVpcmUoJy4vZGVzaGVkTGluZVRvLmpzJylcclxuaW1wb3J0IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCBmcm9tICcuL2Rhc2hlZExpbmVUby5qcydcclxuXHJcbi8vIG1vZHVsZS5leHBvcnRzPWNhblxyXG5leHBvcnQgY29uc3QgY2FuID0ge1xyXG4gIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=\");\n\n/***/ })\n/******/ ]);//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9+L2NhbnZhc191dGlscy9kaXN0L2pzL2luZGV4LmpzPzI2NTkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBbUU7QUFDbkU7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0Q7QUFDdEQ7QUFDQSxtQ0FBbUM7QUFDbkMscUNBQXFDO0FBQ3JDLHlDQUF5QztBQUN6QztBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBLHFDQUFxQztBQUNyQyxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsZ0JBQWdCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixnQkFBZ0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsOEJBQThCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLDREQUE0RDtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiwyQkFBMkI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsY0FBYztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDRCQUE0QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDRCQUE0QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsNEJBQTRCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsdUNBQXVDO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix1Q0FBdUM7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHdDQUF3QztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUFtRCxjQUFjOztBQUVqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQywwQkFBMEIsRUFBRTtBQUMvRCx5Q0FBeUMsZUFBZTtBQUN4RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBOEQsK0RBQStEOztBQUU3SDtBQUNBOztBQUVBO0FBQ0EsOENBQThDLHVCQUF1Qjs7QUFFckU7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBEQUEwRCxrQkFBa0IsRUFBRSxzRkFBc0YsNEdBQTRHLDZHQUE2Ryx3SEFBd0gsbUZBQW1GLG9DQUFvQyxvQ0FBb0MsTUFBTSxtRkFBbUYsbUNBQW1DLHVDQUF1QyxvREFBb0QseUNBQXlDLHlDQUF5QywwQkFBMEIsMEJBQTBCLHdGQUF3RixxQkFBcUIsZUFBZSxPQUFPLGtIQUFrSCxPQUFPLGdEQUFnRCxNQUFNLEdBQUcsSUFBSSw0R0FBNEcsMkNBQTJDLGNBQWM7O0FBRTM4QyxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLDBEQUEwRCxrQkFBa0IsRUFBRSwwQkFBMEIsK0NBQStDLCtEQUErRCwwQ0FBMEMsdUNBQXVDLGdCQUFnQixFQUFFLG9EQUFvRCx3REFBd0QsMkVBQTJFLGNBQWM7O0FBRTlmLE9BQU87QUFDUCIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuLyoqKioqKi8gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4vKioqKioqLyBcdH1cbi8qKioqKiovIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gdGhpc1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4vKioqKioqLyBcdHRoaXNbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gXHJcbi8qKioqKiovIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuLyoqKioqKi8gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcclxuLyoqKioqKi8gXHRcdGlmKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XHJcbi8qKioqKiovIFx0fSA7XHJcbi8qKioqKiovIFx0XHJcbi8qKioqKiovIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuLyoqKioqKi8gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG4vKioqKioqLyBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XHJcbi8qKioqKiovIFx0XHRzY3JpcHQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XHJcbi8qKioqKiovIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcclxuLyoqKioqKi8gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XHJcbi8qKioqKiovIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbi8qKioqKiovIFx0fVxyXG4vKioqKioqLyBcdFxyXG4vKioqKioqLyBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuLyoqKioqKi8gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuLyoqKioqKi8gXHRcdFx0aWYodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKVxyXG4vKioqKioqLyBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcclxuLyoqKioqKi8gXHRcdFx0dHJ5IHtcclxuLyoqKioqKi8gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4vKioqKioqLyBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xyXG4vKioqKioqLyBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XHJcbi8qKioqKiovIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gMTAwMDA7XHJcbi8qKioqKiovIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xyXG4vKioqKioqLyBcdFx0XHR9IGNhdGNoKGVycikge1xyXG4vKioqKioqLyBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcclxuLyoqKioqKi8gXHRcdFx0fVxyXG4vKioqKioqLyBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4vKioqKioqLyBcdFx0XHRcdGlmKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xyXG4vKioqKioqLyBcdFx0XHRcdGlmKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XHJcbi8qKioqKiovIFx0XHRcdFx0XHQvLyB0aW1lb3V0XHJcbi8qKioqKiovIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKSk7XHJcbi8qKioqKiovIFx0XHRcdFx0fSBlbHNlIGlmKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcclxuLyoqKioqKi8gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcclxuLyoqKioqKi8gXHRcdFx0XHRcdHJlc29sdmUoKTtcclxuLyoqKioqKi8gXHRcdFx0XHR9IGVsc2UgaWYocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XHJcbi8qKioqKiovIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXHJcbi8qKioqKiovIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XHJcbi8qKioqKiovIFx0XHRcdFx0fSBlbHNlIHtcclxuLyoqKioqKi8gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcclxuLyoqKioqKi8gXHRcdFx0XHRcdHRyeSB7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcclxuLyoqKioqKi8gXHRcdFx0XHRcdH0gY2F0Y2goZSkge1xyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdHJldHVybjtcclxuLyoqKioqKi8gXHRcdFx0XHRcdH1cclxuLyoqKioqKi8gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcclxuLyoqKioqKi8gXHRcdFx0XHR9XHJcbi8qKioqKiovIFx0XHRcdH07XHJcbi8qKioqKiovIFx0XHR9KTtcclxuLyoqKioqKi8gXHR9XHJcblxuLyoqKioqKi8gXHRcclxuLyoqKioqKi8gXHRcclxuLyoqKioqKi8gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XHJcbi8qKioqKiovIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCI2YzRmMjJkNTg0MDkwZGU4NmVlNVwiOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbi8qKioqKiovIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XHJcbi8qKioqKiovIFx0dmFyIGhvdE1haW5Nb2R1bGUgPSB0cnVlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbi8qKioqKiovIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuLyoqKioqKi8gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuLyoqKioqKi8gXHRcclxuLyoqKioqKi8gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuLyoqKioqKi8gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4vKioqKioqLyBcdFx0aWYoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcclxuLyoqKioqKi8gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcclxuLyoqKioqKi8gXHRcdFx0aWYobWUuaG90LmFjdGl2ZSkge1xyXG4vKioqKioqLyBcdFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcclxuLyoqKioqKi8gXHRcdFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA8IDApXHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcclxuLyoqKioqKi8gXHRcdFx0XHR9IGVsc2UgaG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xyXG4vKioqKioqLyBcdFx0XHRcdGlmKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPCAwKVxyXG4vKioqKioqLyBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcclxuLyoqKioqKi8gXHRcdFx0fSBlbHNlIHtcclxuLyoqKioqKi8gXHRcdFx0XHRjb25zb2xlLndhcm4oXCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXF1ZXN0ICsgXCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICsgbW9kdWxlSWQpO1xyXG4vKioqKioqLyBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XHJcbi8qKioqKiovIFx0XHRcdH1cclxuLyoqKioqKi8gXHRcdFx0aG90TWFpbk1vZHVsZSA9IGZhbHNlO1xyXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcclxuLyoqKioqKi8gXHRcdH07XHJcbi8qKioqKiovIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xyXG4vKioqKioqLyBcdFx0XHRyZXR1cm4ge1xyXG4vKioqKioqLyBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuLyoqKioqKi8gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG4vKioqKioqLyBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcclxuLyoqKioqKi8gXHRcdFx0XHR9LFxyXG4vKioqKioqLyBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuLyoqKioqKi8gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcclxuLyoqKioqKi8gXHRcdFx0XHR9XHJcbi8qKioqKiovIFx0XHRcdH07XHJcbi8qKioqKiovIFx0XHR9O1xyXG4vKioqKioqLyBcdFx0Zm9yKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuLyoqKioqKi8gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpKSB7XHJcbi8qKioqKiovIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcclxuLyoqKioqKi8gXHRcdFx0fVxyXG4vKioqKioqLyBcdFx0fVxyXG4vKioqKioqLyBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBcImVcIiwge1xyXG4vKioqKioqLyBcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG4vKioqKioqLyBcdFx0XHR2YWx1ZTogZnVuY3Rpb24oY2h1bmtJZCkge1xyXG4vKioqKioqLyBcdFx0XHRcdGlmKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKVxyXG4vKioqKioqLyBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcclxuLyoqKioqKi8gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XHJcbi8qKioqKiovIFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcclxuLyoqKioqKi8gXHRcdFx0XHRcdHRocm93IGVycjtcclxuLyoqKioqKi8gXHRcdFx0XHR9KTtcclxuLyoqKioqKi8gXHRcclxuLyoqKioqKi8gXHRcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XHJcbi8qKioqKiovIFx0XHRcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdGlmKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0fVxyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRpZihob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0fVxyXG4vKioqKioqLyBcdFx0XHRcdFx0fVxyXG4vKioqKioqLyBcdFx0XHRcdH1cclxuLyoqKioqKi8gXHRcdFx0fVxyXG4vKioqKioqLyBcdFx0fSk7XHJcbi8qKioqKiovIFx0XHRyZXR1cm4gZm47XHJcbi8qKioqKiovIFx0fVxyXG4vKioqKioqLyBcdFxyXG4vKioqKioqLyBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbi8qKioqKiovIFx0XHR2YXIgaG90ID0ge1xyXG4vKioqKioqLyBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXHJcbi8qKioqKiovIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXHJcbi8qKioqKiovIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXHJcbi8qKioqKiovIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxyXG4vKioqKioqLyBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcclxuLyoqKioqKi8gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXHJcbi8qKioqKiovIFx0XHRcdF9tYWluOiBob3RNYWluTW9kdWxlLFxyXG4vKioqKioqLyBcdFxyXG4vKioqKioqLyBcdFx0XHQvLyBNb2R1bGUgQVBJXHJcbi8qKioqKiovIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcclxuLyoqKioqKi8gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XHJcbi8qKioqKiovIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcclxuLyoqKioqKi8gXHRcdFx0XHRcdGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcclxuLyoqKioqKi8gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIilcclxuLyoqKioqKi8gXHRcdFx0XHRcdGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xyXG4vKioqKioqLyBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcclxuLyoqKioqKi8gXHRcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XHJcbi8qKioqKiovIFx0XHRcdFx0ZWxzZVxyXG4vKioqKioqLyBcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcclxuLyoqKioqKi8gXHRcdFx0fSxcclxuLyoqKioqKi8gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XHJcbi8qKioqKiovIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcclxuLyoqKioqKi8gXHRcdFx0XHRcdGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcclxuLyoqKioqKi8gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXHJcbi8qKioqKiovIFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xyXG4vKioqKioqLyBcdFx0XHRcdGVsc2VcclxuLyoqKioqKi8gXHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XHJcbi8qKioqKiovIFx0XHRcdH0sXHJcbi8qKioqKiovIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbi8qKioqKiovIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XHJcbi8qKioqKiovIFx0XHRcdH0sXHJcbi8qKioqKiovIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4vKioqKioqLyBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xyXG4vKioqKioqLyBcdFx0XHR9LFxyXG4vKioqKioqLyBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuLyoqKioqKi8gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XHJcbi8qKioqKiovIFx0XHRcdFx0aWYoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xyXG4vKioqKioqLyBcdFx0XHR9LFxyXG4vKioqKioqLyBcdFxyXG4vKioqKioqLyBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxyXG4vKioqKioqLyBcdFx0XHRjaGVjazogaG90Q2hlY2ssXHJcbi8qKioqKiovIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcclxuLyoqKioqKi8gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XHJcbi8qKioqKiovIFx0XHRcdFx0aWYoIWwpIHJldHVybiBob3RTdGF0dXM7XHJcbi8qKioqKiovIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcclxuLyoqKioqKi8gXHRcdFx0fSxcclxuLyoqKioqKi8gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xyXG4vKioqKioqLyBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XHJcbi8qKioqKiovIFx0XHRcdH0sXHJcbi8qKioqKiovIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcclxuLyoqKioqKi8gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcclxuLyoqKioqKi8gXHRcdFx0XHRpZihpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XHJcbi8qKioqKiovIFx0XHRcdH0sXHJcbi8qKioqKiovIFx0XHJcbi8qKioqKiovIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxyXG4vKioqKioqLyBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cclxuLyoqKioqKi8gXHRcdH07XHJcbi8qKioqKiovIFx0XHRob3RNYWluTW9kdWxlID0gdHJ1ZTtcclxuLyoqKioqKi8gXHRcdHJldHVybiBob3Q7XHJcbi8qKioqKiovIFx0fVxyXG4vKioqKioqLyBcdFxyXG4vKioqKioqLyBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xyXG4vKioqKioqLyBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcclxuLyoqKioqKi8gXHRcclxuLyoqKioqKi8gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XHJcbi8qKioqKiovIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XHJcbi8qKioqKiovIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXHJcbi8qKioqKiovIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcclxuLyoqKioqKi8gXHR9XHJcbi8qKioqKiovIFx0XHJcbi8qKioqKiovIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcclxuLyoqKioqKi8gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcclxuLyoqKioqKi8gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XHJcbi8qKioqKiovIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xyXG4vKioqKioqLyBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xyXG4vKioqKioqLyBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xyXG4vKioqKioqLyBcdHZhciBob3REZWZlcnJlZDtcclxuLyoqKioqKi8gXHRcclxuLyoqKioqKi8gXHQvLyBUaGUgdXBkYXRlIGluZm9cclxuLyoqKioqKi8gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xyXG4vKioqKioqLyBcdFxyXG4vKioqKioqLyBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcclxuLyoqKioqKi8gXHRcdHZhciBpc051bWJlciA9ICgraWQpICsgXCJcIiA9PT0gaWQ7XHJcbi8qKioqKiovIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcclxuLyoqKioqKi8gXHR9XHJcbi8qKioqKiovIFx0XHJcbi8qKioqKiovIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcclxuLyoqKioqKi8gXHRcdGlmKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xyXG4vKioqKioqLyBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xyXG4vKioqKioqLyBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XHJcbi8qKioqKiovIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdCgpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XHJcbi8qKioqKiovIFx0XHRcdGlmKCF1cGRhdGUpIHtcclxuLyoqKioqKi8gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xyXG4vKioqKioqLyBcdFx0XHRcdHJldHVybiBudWxsO1xyXG4vKioqKioqLyBcdFx0XHR9XHJcbi8qKioqKiovIFx0XHJcbi8qKioqKiovIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XHJcbi8qKioqKiovIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xyXG4vKioqKioqLyBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xyXG4vKioqKioqLyBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XHJcbi8qKioqKiovIFx0XHJcbi8qKioqKiovIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XHJcbi8qKioqKiovIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbi8qKioqKiovIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxyXG4vKioqKioqLyBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcclxuLyoqKioqKi8gXHRcdFx0XHR9O1xyXG4vKioqKioqLyBcdFx0XHR9KTtcclxuLyoqKioqKi8gXHRcdFx0aG90VXBkYXRlID0ge307XHJcbi8qKioqKiovIFx0XHRcdHZhciBjaHVua0lkID0gMDtcclxuLyoqKioqKi8gXHRcdFx0eyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxvbmUtYmxvY2tzXHJcbi8qKioqKiovIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cclxuLyoqKioqKi8gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcclxuLyoqKioqKi8gXHRcdFx0fVxyXG4vKioqKioqLyBcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XHJcbi8qKioqKiovIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xyXG4vKioqKioqLyBcdFx0XHR9XHJcbi8qKioqKiovIFx0XHRcdHJldHVybiBwcm9taXNlO1xyXG4vKioqKioqLyBcdFx0fSk7XHJcbi8qKioqKiovIFx0fVxyXG4vKioqKioqLyBcdFxyXG4vKioqKioqLyBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuLyoqKioqKi8gXHRcdGlmKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXHJcbi8qKioqKiovIFx0XHRcdHJldHVybjtcclxuLyoqKioqKi8gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XHJcbi8qKioqKiovIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XHJcbi8qKioqKiovIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XHJcbi8qKioqKiovIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcclxuLyoqKioqKi8gXHRcdFx0fVxyXG4vKioqKioqLyBcdFx0fVxyXG4vKioqKioqLyBcdFx0aWYoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xyXG4vKioqKioqLyBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XHJcbi8qKioqKiovIFx0XHR9XHJcbi8qKioqKiovIFx0fVxyXG4vKioqKioqLyBcdFxyXG4vKioqKioqLyBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcclxuLyoqKioqKi8gXHRcdGlmKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xyXG4vKioqKioqLyBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xyXG4vKioqKioqLyBcdFx0fSBlbHNlIHtcclxuLyoqKioqKi8gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xyXG4vKioqKioqLyBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcclxuLyoqKioqKi8gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcclxuLyoqKioqKi8gXHRcdH1cclxuLyoqKioqKi8gXHR9XHJcbi8qKioqKiovIFx0XHJcbi8qKioqKiovIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcclxuLyoqKioqKi8gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xyXG4vKioqKioqLyBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XHJcbi8qKioqKiovIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XHJcbi8qKioqKiovIFx0XHRpZighZGVmZXJyZWQpIHJldHVybjtcclxuLyoqKioqKi8gXHRcdGlmKGhvdEFwcGx5T25VcGRhdGUpIHtcclxuLyoqKioqKi8gXHRcdFx0aG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuLyoqKioqKi8gXHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XHJcbi8qKioqKiovIFx0XHRcdH0sIGZ1bmN0aW9uKGVycikge1xyXG4vKioqKioqLyBcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xyXG4vKioqKioqLyBcdFx0XHR9KTtcclxuLyoqKioqKi8gXHRcdH0gZWxzZSB7XHJcbi8qKioqKiovIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcclxuLyoqKioqKi8gXHRcdFx0Zm9yKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcclxuLyoqKioqKi8gXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcclxuLyoqKioqKi8gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcclxuLyoqKioqKi8gXHRcdFx0XHR9XHJcbi8qKioqKiovIFx0XHRcdH1cclxuLyoqKioqKi8gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xyXG4vKioqKioqLyBcdFx0fVxyXG4vKioqKioqLyBcdH1cclxuLyoqKioqKi8gXHRcclxuLyoqKioqKi8gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XHJcbi8qKioqKiovIFx0XHRpZihob3RTdGF0dXMgIT09IFwicmVhZHlcIikgdGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xyXG4vKioqKioqLyBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbi8qKioqKiovIFx0XHJcbi8qKioqKiovIFx0XHR2YXIgY2I7XHJcbi8qKioqKiovIFx0XHR2YXIgaTtcclxuLyoqKioqKi8gXHRcdHZhciBqO1xyXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZTtcclxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGVJZDtcclxuLyoqKioqKi8gXHRcclxuLyoqKioqKi8gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcclxuLyoqKioqKi8gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XHJcbi8qKioqKiovIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xyXG4vKioqKioqLyBcdFxyXG4vKioqKioqLyBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcclxuLyoqKioqKi8gXHRcdFx0XHRyZXR1cm4ge1xyXG4vKioqKioqLyBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXHJcbi8qKioqKiovIFx0XHRcdFx0XHRpZDogaWRcclxuLyoqKioqKi8gXHRcdFx0XHR9O1xyXG4vKioqKioqLyBcdFx0XHR9KTtcclxuLyoqKioqKi8gXHRcdFx0d2hpbGUocXVldWUubGVuZ3RoID4gMCkge1xyXG4vKioqKioqLyBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcclxuLyoqKioqKi8gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XHJcbi8qKioqKiovIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xyXG4vKioqKioqLyBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4vKioqKioqLyBcdFx0XHRcdGlmKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKVxyXG4vKioqKioqLyBcdFx0XHRcdFx0Y29udGludWU7XHJcbi8qKioqKiovIFx0XHRcdFx0aWYobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRyZXR1cm4ge1xyXG4vKioqKioqLyBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcclxuLyoqKioqKi8gXHRcdFx0XHRcdH07XHJcbi8qKioqKiovIFx0XHRcdFx0fVxyXG4vKioqKioqLyBcdFx0XHRcdGlmKG1vZHVsZS5ob3QuX21haW4pIHtcclxuLyoqKioqKi8gXHRcdFx0XHRcdHJldHVybiB7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxyXG4vKioqKioqLyBcdFx0XHRcdFx0fTtcclxuLyoqKioqKi8gXHRcdFx0XHR9XHJcbi8qKioqKiovIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XHJcbi8qKioqKiovIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcclxuLyoqKioqKi8gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcclxuLyoqKioqKi8gXHRcdFx0XHRcdGlmKCFwYXJlbnQpIGNvbnRpbnVlO1xyXG4vKioqKioqLyBcdFx0XHRcdFx0aWYocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdHJldHVybiB7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxyXG4vKioqKioqLyBcdFx0XHRcdFx0XHR9O1xyXG4vKioqKioqLyBcdFx0XHRcdFx0fVxyXG4vKioqKioqLyBcdFx0XHRcdFx0aWYob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpID49IDApIGNvbnRpbnVlO1xyXG4vKioqKioqLyBcdFx0XHRcdFx0aWYocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdGlmKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG4vKioqKioqLyBcdFx0XHRcdFx0fVxyXG4vKioqKioqLyBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcclxuLyoqKioqKi8gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcclxuLyoqKioqKi8gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcclxuLyoqKioqKi8gXHRcdFx0XHRcdH0pO1xyXG4vKioqKioqLyBcdFx0XHRcdH1cclxuLyoqKioqKi8gXHRcdFx0fVxyXG4vKioqKioqLyBcdFxyXG4vKioqKioqLyBcdFx0XHRyZXR1cm4ge1xyXG4vKioqKioqLyBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcclxuLyoqKioqKi8gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXHJcbi8qKioqKiovIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXHJcbi8qKioqKiovIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXHJcbi8qKioqKiovIFx0XHRcdH07XHJcbi8qKioqKiovIFx0XHR9XHJcbi8qKioqKiovIFx0XHJcbi8qKioqKiovIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XHJcbi8qKioqKiovIFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XHJcbi8qKioqKiovIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xyXG4vKioqKioqLyBcdFx0XHRcdGlmKGEuaW5kZXhPZihpdGVtKSA8IDApXHJcbi8qKioqKiovIFx0XHRcdFx0XHRhLnB1c2goaXRlbSk7XHJcbi8qKioqKiovIFx0XHRcdH1cclxuLyoqKioqKi8gXHRcdH1cclxuLyoqKioqKi8gXHRcclxuLyoqKioqKi8gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXHJcbi8qKioqKiovIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXHJcbi8qKioqKiovIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcclxuLyoqKioqKi8gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcclxuLyoqKioqKi8gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XHJcbi8qKioqKiovIFx0XHJcbi8qKioqKiovIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xyXG4vKioqKioqLyBcdFx0XHRjb25zb2xlLndhcm4oXCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCIpO1xyXG4vKioqKioqLyBcdFx0fTtcclxuLyoqKioqKi8gXHRcclxuLyoqKioqKi8gXHRcdGZvcih2YXIgaWQgaW4gaG90VXBkYXRlKSB7XHJcbi8qKioqKiovIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xyXG4vKioqKioqLyBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XHJcbi8qKioqKiovIFx0XHRcdFx0dmFyIHJlc3VsdDtcclxuLyoqKioqKi8gXHRcdFx0XHRpZihob3RVcGRhdGVbaWRdKSB7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcclxuLyoqKioqKi8gXHRcdFx0XHR9IGVsc2Uge1xyXG4vKioqKioqLyBcdFx0XHRcdFx0cmVzdWx0ID0ge1xyXG4vKioqKioqLyBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxyXG4vKioqKioqLyBcdFx0XHRcdFx0fTtcclxuLyoqKioqKi8gXHRcdFx0XHR9XHJcbi8qKioqKiovIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcclxuLyoqKioqKi8gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xyXG4vKioqKioqLyBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcclxuLyoqKioqKi8gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcclxuLyoqKioqKi8gXHRcdFx0XHRpZihyZXN1bHQuY2hhaW4pIHtcclxuLyoqKioqKi8gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcclxuLyoqKioqKi8gXHRcdFx0XHR9XHJcbi8qKioqKiovIFx0XHRcdFx0c3dpdGNoKHJlc3VsdC50eXBlKSB7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRGVjbGluZWQpXHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArIHJlc3VsdC5tb2R1bGVJZCArIGNoYWluSW5mbyk7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4vKioqKioqLyBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25EZWNsaW5lZClcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiIGluIFwiICsgcmVzdWx0LnBhcmVudElkICsgY2hhaW5JbmZvKTtcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0YnJlYWs7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uVW5hY2NlcHRlZClcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvKTtcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0YnJlYWs7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkFjY2VwdGVkKVxyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0YnJlYWs7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkRpc3Bvc2VkKVxyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRicmVhaztcclxuLyoqKioqKi8gXHRcdFx0XHRcdGRlZmF1bHQ6XHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XHJcbi8qKioqKiovIFx0XHRcdFx0fVxyXG4vKioqKioqLyBcdFx0XHRcdGlmKGFib3J0RXJyb3IpIHtcclxuLyoqKioqKi8gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xyXG4vKioqKioqLyBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xyXG4vKioqKioqLyBcdFx0XHRcdH1cclxuLyoqKioqKi8gXHRcdFx0XHRpZihkb0FwcGx5KSB7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XHJcbi8qKioqKiovIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xyXG4vKioqKioqLyBcdFx0XHRcdFx0Zm9yKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0XHRpZighb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLCByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKTtcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0fVxyXG4vKioqKioqLyBcdFx0XHRcdFx0fVxyXG4vKioqKioqLyBcdFx0XHRcdH1cclxuLyoqKioqKi8gXHRcdFx0XHRpZihkb0Rpc3Bvc2UpIHtcclxuLyoqKioqKi8gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xyXG4vKioqKioqLyBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XHJcbi8qKioqKiovIFx0XHRcdFx0fVxyXG4vKioqKioqLyBcdFx0XHR9XHJcbi8qKioqKiovIFx0XHR9XHJcbi8qKioqKiovIFx0XHJcbi8qKioqKiovIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXHJcbi8qKioqKiovIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XHJcbi8qKioqKiovIFx0XHRmb3IoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuLyoqKioqKi8gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XHJcbi8qKioqKiovIFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkKVxyXG4vKioqKioqLyBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcclxuLyoqKioqKi8gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXHJcbi8qKioqKiovIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXHJcbi8qKioqKiovIFx0XHRcdFx0fSk7XHJcbi8qKioqKiovIFx0XHR9XHJcbi8qKioqKiovIFx0XHJcbi8qKioqKiovIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcclxuLyoqKioqKi8gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XHJcbi8qKioqKiovIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XHJcbi8qKioqKiovIFx0XHRcdGlmKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xyXG4vKioqKioqLyBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcclxuLyoqKioqKi8gXHRcdFx0fVxyXG4vKioqKioqLyBcdFx0fSk7XHJcbi8qKioqKiovIFx0XHJcbi8qKioqKiovIFx0XHR2YXIgaWR4O1xyXG4vKioqKioqLyBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XHJcbi8qKioqKiovIFx0XHR3aGlsZShxdWV1ZS5sZW5ndGggPiAwKSB7XHJcbi8qKioqKiovIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XHJcbi8qKioqKiovIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4vKioqKioqLyBcdFx0XHRpZighbW9kdWxlKSBjb250aW51ZTtcclxuLyoqKioqKi8gXHRcclxuLyoqKioqKi8gXHRcdFx0dmFyIGRhdGEgPSB7fTtcclxuLyoqKioqKi8gXHRcclxuLyoqKioqKi8gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXHJcbi8qKioqKiovIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XHJcbi8qKioqKiovIFx0XHRcdGZvcihqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xyXG4vKioqKioqLyBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xyXG4vKioqKioqLyBcdFx0XHRcdGNiKGRhdGEpO1xyXG4vKioqKioqLyBcdFx0XHR9XHJcbi8qKioqKiovIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XHJcbi8qKioqKiovIFx0XHJcbi8qKioqKiovIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXHJcbi8qKioqKiovIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XHJcbi8qKioqKiovIFx0XHJcbi8qKioqKiovIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxyXG4vKioqKioqLyBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbi8qKioqKiovIFx0XHJcbi8qKioqKiovIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXHJcbi8qKioqKiovIFx0XHRcdGZvcihqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xyXG4vKioqKioqLyBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcclxuLyoqKioqKi8gXHRcdFx0XHRpZighY2hpbGQpIGNvbnRpbnVlO1xyXG4vKioqKioqLyBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XHJcbi8qKioqKiovIFx0XHRcdFx0aWYoaWR4ID49IDApIHtcclxuLyoqKioqKi8gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XHJcbi8qKioqKiovIFx0XHRcdFx0fVxyXG4vKioqKioqLyBcdFx0XHR9XHJcbi8qKioqKiovIFx0XHR9XHJcbi8qKioqKiovIFx0XHJcbi8qKioqKiovIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxyXG4vKioqKioqLyBcdFx0dmFyIGRlcGVuZGVuY3k7XHJcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XHJcbi8qKioqKiovIFx0XHRmb3IobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcclxuLyoqKioqKi8gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcclxuLyoqKioqKi8gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuLyoqKioqKi8gXHRcdFx0XHRpZihtb2R1bGUpIHtcclxuLyoqKioqKi8gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xyXG4vKioqKioqLyBcdFx0XHRcdFx0Zm9yKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0aWYoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcclxuLyoqKioqKi8gXHRcdFx0XHRcdH1cclxuLyoqKioqKi8gXHRcdFx0XHR9XHJcbi8qKioqKiovIFx0XHRcdH1cclxuLyoqKioqKi8gXHRcdH1cclxuLyoqKioqKi8gXHRcclxuLyoqKioqKi8gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcclxuLyoqKioqKi8gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xyXG4vKioqKioqLyBcdFxyXG4vKioqKioqLyBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xyXG4vKioqKioqLyBcdFxyXG4vKioqKioqLyBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXHJcbi8qKioqKiovIFx0XHRmb3IobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xyXG4vKioqKioqLyBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XHJcbi8qKioqKiovIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcclxuLyoqKioqKi8gXHRcdFx0fVxyXG4vKioqKioqLyBcdFx0fVxyXG4vKioqKioqLyBcdFxyXG4vKioqKioqLyBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcclxuLyoqKioqKi8gXHRcdHZhciBlcnJvciA9IG51bGw7XHJcbi8qKioqKiovIFx0XHRmb3IobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcclxuLyoqKioqKi8gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcclxuLyoqKioqKi8gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuLyoqKioqKi8gXHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcclxuLyoqKioqKi8gXHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XHJcbi8qKioqKiovIFx0XHRcdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcclxuLyoqKioqKi8gXHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcclxuLyoqKioqKi8gXHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XHJcbi8qKioqKiovIFx0XHRcdFx0XHRpZihjYWxsYmFja3MuaW5kZXhPZihjYikgPj0gMCkgY29udGludWU7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XHJcbi8qKioqKiovIFx0XHRcdFx0fVxyXG4vKioqKioqLyBcdFx0XHRcdGZvcihpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xyXG4vKioqKioqLyBcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XHJcbi8qKioqKiovIFx0XHRcdFx0XHR0cnkge1xyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XHJcbi8qKioqKiovIFx0XHRcdFx0XHR9IGNhdGNoKGVycikge1xyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRXJyb3JlZCkge1xyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdFx0fSk7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdH1cclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4vKioqKioqLyBcdFx0XHRcdFx0XHR9XHJcbi8qKioqKiovIFx0XHRcdFx0XHR9XHJcbi8qKioqKiovIFx0XHRcdFx0fVxyXG4vKioqKioqLyBcdFx0XHR9XHJcbi8qKioqKiovIFx0XHR9XHJcbi8qKioqKiovIFx0XHJcbi8qKioqKiovIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xyXG4vKioqKioqLyBcdFx0Zm9yKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcbi8qKioqKiovIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xyXG4vKioqKioqLyBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xyXG4vKioqKioqLyBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XHJcbi8qKioqKiovIFx0XHRcdHRyeSB7XHJcbi8qKioqKiovIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XHJcbi8qKioqKiovIFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbi8qKioqKiovIFx0XHRcdFx0aWYodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuLyoqKioqKi8gXHRcdFx0XHRcdHRyeSB7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XHJcbi8qKioqKiovIFx0XHRcdFx0XHR9IGNhdGNoKGVycjIpIHtcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkVycm9yZWQpIHtcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdFx0XHRvcmdpbmFsRXJyb3I6IGVyclxyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRcdH0pO1xyXG4vKioqKioqLyBcdFx0XHRcdFx0XHR9XHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0XHRpZighZXJyb3IpXHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdFx0XHRlcnJvciA9IGVycjI7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdH1cclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0aWYoIWVycm9yKVxyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4vKioqKioqLyBcdFx0XHRcdFx0fVxyXG4vKioqKioqLyBcdFx0XHRcdH0gZWxzZSB7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRXJyb3JlZCkge1xyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxyXG4vKioqKioqLyBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0fSk7XHJcbi8qKioqKiovIFx0XHRcdFx0XHR9XHJcbi8qKioqKiovIFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XHJcbi8qKioqKiovIFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuLyoqKioqKi8gXHRcdFx0XHRcdFx0XHRlcnJvciA9IGVycjtcclxuLyoqKioqKi8gXHRcdFx0XHRcdH1cclxuLyoqKioqKi8gXHRcdFx0XHR9XHJcbi8qKioqKiovIFx0XHRcdH1cclxuLyoqKioqKi8gXHRcdH1cclxuLyoqKioqKi8gXHRcclxuLyoqKioqKi8gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXHJcbi8qKioqKiovIFx0XHRpZihlcnJvcikge1xyXG4vKioqKioqLyBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xyXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xyXG4vKioqKioqLyBcdFx0fVxyXG4vKioqKioqLyBcdFxyXG4vKioqKioqLyBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcclxuLyoqKioqKi8gXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcclxuLyoqKioqKi8gXHR9XHJcblxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0aTogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9LFxuLyoqKioqKi8gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuLyoqKioqKi8gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuLyoqKioqKi8gXHRcdFx0Y2hpbGRyZW46IFtdXG4vKioqKioqLyBcdFx0fTtcblxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuXG5cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4vKioqKioqLyBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4vKioqKioqLyBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbi8qKioqKiovIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuLyoqKioqKi8gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuLyoqKioqKi8gXHRcdFx0XHRnZXQ6IGdldHRlclxuLyoqKioqKi8gXHRcdFx0fSk7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHR9O1xuXG4vKioqKioqLyBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuLyoqKioqKi8gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuLyoqKioqKi8gXHRcdHJldHVybiBnZXR0ZXI7XG4vKioqKioqLyBcdH07XG5cbi8qKioqKiovIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19oYXNoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoMSkoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuZXZhbChcIlxcblxcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcXFwiX19lc01vZHVsZVxcXCIsIHtcXG4gIHZhbHVlOiB0cnVlXFxufSk7XFxuLy8gYWRkIGEgZnVuY3Rpb24gZGFzaGVkTGluZVRvIHRvIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRC5wcm90b3R5cGVcXG4oZnVuY3Rpb24gKCkge1xcbiAgLyogZ2xvYmFsIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCAqL1xcbiAgdmFyIG1vdmVUb0Z1bmN0aW9uID0gQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELnByb3RvdHlwZS5tb3ZlVG87XFxuXFxuICAvLyBvYmogdG8gcmVjb3JkIHRoZSBsYXN0IHBvaW50IGxvY2F0aW9uXFxuICBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQucHJvdG90eXBlLmxhc3RNb3ZlVG9Mb2NhdGlvbiA9IHt9O1xcbiAgLy8gcmV3cml0ZSBtb3ZlVG8gdG8gcmVjb3JkIHRoZSBsYXN0IHBvaW50IGxvY2F0aW9uXFxuICBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQucHJvdG90eXBlLm1vdmVUbyA9IGZ1bmN0aW9uICh4LCB5KSB7XFxuICAgIC8vIHRoaXMgcG9pbnQgdG8gY3VycmVudCBjb250ZXh0IG9ialxcbiAgICBtb3ZlVG9GdW5jdGlvbi5hcHBseSh0aGlzLCBbeCwgeV0pO1xcbiAgICB0aGlzLmxhc3RNb3ZlVG9Mb2NhdGlvbi54ID0geDtcXG4gICAgdGhpcy5sYXN0TW92ZVRvTG9jYXRpb24ueSA9IHk7XFxuICB9O1xcbiAgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELnByb3RvdHlwZS5kYXNoZWRMaW5lVG8gPSBmdW5jdGlvbiAoeCwgeSwgZGFzaExlbmd0aCkge1xcbiAgICBkYXNoTGVuZ3RoID0gZGFzaExlbmd0aCB8fCA1O1xcbiAgICBkYXNoTGVuZ3RoID0gZGFzaExlbmd0aCA8IDAgfHwgNTtcXG4gICAgdmFyIHN0YXJ0WCwgc3RhcnRZLCBkZWx0YVgsIGRlbHRhWSwgbnVtRGVzaGVzO1xcbiAgICBzdGFydFggPSB0aGlzLmxhc3RNb3ZlVG9Mb2NhdGlvbi54O1xcbiAgICBzdGFydFkgPSB0aGlzLmxhc3RNb3ZlVG9Mb2NhdGlvbi55O1xcbiAgICBkZWx0YVggPSB4IC0gc3RhcnRYO1xcbiAgICBkZWx0YVkgPSB5IC0gc3RhcnRZO1xcbiAgICBudW1EZXNoZXMgPSBNYXRoLmZsb29yKE1hdGguc3FydChkZWx0YVggKiBkZWx0YVggKyBkZWx0YVkgKiBkZWx0YVkpIC8gZGFzaExlbmd0aCk7XFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtRGVzaGVzOyBpKyspIHtcXG4gICAgICB0aGlzW2kgJSAyID09PSAwID8gJ21vdmVUbycgOiAnbGluZVRvJ10oc3RhcnRYICsgZGVsdGFYIC8gbnVtRGVzaGVzICogaSwgc3RhcnRZICsgZGVsdGFZIC8gbnVtRGVzaGVzICogaSk7XFxuICAgIH1cXG4gICAgLy8gY2FzZSBvZiBvZGQgbnVtXFxuICAgIHRoaXMubW92ZVRvKHgsIHkpO1xcbiAgfTtcXG59KSgpO1xcblxcbi8vIG1vZHVsZS5leHBvcnRzPUNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxcbmV4cG9ydHMuQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEOy8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluZGxZbkJoWTJzNkx5OHZMaTl6Y21NdlpHRnphR1ZrVEdsdVpWUnZMbXB6UHpRMU0yTWlYU3dpYm1GdFpYTWlPbHNpYlc5MlpWUnZSblZ1WTNScGIyNGlMQ0pEWVc1MllYTlNaVzVrWlhKcGJtZERiMjUwWlhoME1rUWlMQ0p3Y205MGIzUjVjR1VpTENKdGIzWmxWRzhpTENKc1lYTjBUVzkyWlZSdlRHOWpZWFJwYjI0aUxDSjRJaXdpZVNJc0ltRndjR3g1SWl3aVpHRnphR1ZrVEdsdVpWUnZJaXdpWkdGemFFeGxibWQwYUNJc0luTjBZWEowV0NJc0luTjBZWEowV1NJc0ltUmxiSFJoV0NJc0ltUmxiSFJoV1NJc0ltNTFiVVJsYzJobGN5SXNJazFoZEdnaUxDSm1iRzl2Y2lJc0luTnhjblFpTENKcElsMHNJbTFoY0hCcGJtZHpJam9pT3pzN096dEJRVUZCTzBGQlEwRXNRMEZCUXl4WlFVRlpPMEZCUTFnN1FVRkRRU3hOUVVGSlFTeHBRa0ZCYVVKRExIbENRVUY1UWtNc1UwRkJla0lzUTBGQmJVTkRMRTFCUVhoRU96dEJRVVZCTzBGQlEwRkdMREpDUVVGNVFrTXNVMEZCZWtJc1EwRkJiVU5GTEd0Q1FVRnVReXhIUVVGM1JDeEZRVUY0UkR0QlFVTkJPMEZCUTBGSUxESkNRVUY1UWtNc1UwRkJla0lzUTBGQmJVTkRMRTFCUVc1RExFZEJRVFJETEZWQlFWVkZMRU5CUVZZc1JVRkJZVU1zUTBGQllpeEZRVUZuUWp0QlFVTXhSRHRCUVVOQlRpeHRRa0ZCWlU4c1MwRkJaaXhEUVVGeFFpeEpRVUZ5UWl4RlFVRXlRaXhEUVVGRFJpeERRVUZFTEVWQlFVbERMRU5CUVVvc1EwRkJNMEk3UVVGRFFTeFRRVUZMUml4clFrRkJUQ3hEUVVGM1FrTXNRMEZCZUVJc1IwRkJORUpCTEVOQlFUVkNPMEZCUTBFc1UwRkJTMFFzYTBKQlFVd3NRMEZCZDBKRkxFTkJRWGhDTEVkQlFUUkNRU3hEUVVFMVFqdEJRVU5FTEVkQlRFUTdRVUZOUVV3c01rSkJRWGxDUXl4VFFVRjZRaXhEUVVGdFEwMHNXVUZCYmtNc1IwRkJhMFFzVlVGQlZVZ3NRMEZCVml4RlFVRmhReXhEUVVGaUxFVkJRV2RDUnl4VlFVRm9RaXhGUVVFMFFqdEJRVU0xUlVFc2FVSkJRV0ZCTEdOQlFXTXNRMEZCTTBJN1FVRkRRVUVzYVVKQlFXRkJMR0ZCUVdFc1EwRkJZaXhKUVVGclFpeERRVUV2UWp0QlFVTkJMRkZCUVVsRExFMUJRVW9zUlVGQldVTXNUVUZCV2l4RlFVRnZRa01zVFVGQmNFSXNSVUZCTkVKRExFMUJRVFZDTEVWQlFXOURReXhUUVVGd1F6dEJRVU5CU2l4aFFVRlRMRXRCUVV0T0xHdENRVUZNTEVOQlFYZENReXhEUVVGcVF6dEJRVU5CVFN4aFFVRlRMRXRCUVV0UUxHdENRVUZNTEVOQlFYZENSU3hEUVVGcVF6dEJRVU5CVFN4aFFVRlRVQ3hKUVVGSlN5eE5RVUZpTzBGQlEwRkhMR0ZCUVZOUUxFbEJRVWxMTEUxQlFXSTdRVUZEUVVjc1owSkJRVmxETEV0QlFVdERMRXRCUVV3c1EwRkJWMFFzUzBGQlMwVXNTVUZCVEN4RFFVRlZUQ3hUUVVGVFFTeE5RVUZVTEVkQlFXdENReXhUUVVGVFFTeE5RVUZ5UXl4SlFVRXJRMG9zVlVGQk1VUXNRMEZCV2p0QlFVTkJMRk5CUVVzc1NVRkJTVk1zU1VGQlNTeERRVUZpTEVWQlFXZENRU3hKUVVGSlNpeFRRVUZ3UWl4RlFVRXJRa2tzUjBGQkwwSXNSVUZCYjBNN1FVRkRiRU1zVjBGQlMwRXNTVUZCU1N4RFFVRktMRXRCUVZVc1EwRkJWaXhIUVVGakxGRkJRV1FzUjBGQmVVSXNVVUZCT1VJc1JVRkJkME5TTEZOQlFWVkZMRk5CUVZORkxGTkJRVllzUjBGQmRVSkpMRU5CUVhoRkxFVkJRVEpGVUN4VFFVRlZSU3hUUVVGVFF5eFRRVUZXTEVkQlFYVkNTU3hEUVVFelJ6dEJRVU5FTzBGQlEwUTdRVUZEUVN4VFFVRkxaaXhOUVVGTUxFTkJRVmxGTEVOQlFWb3NSVUZCWlVNc1EwRkJaanRCUVVORUxFZEJaRVE3UVVGbFJDeERRVFZDUkRzN1FVRTRRa0U3VVVGRFVVd3NkMElzUjBGQlFVRXNkMElpTENKbWFXeGxJam9pTUM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaTh2SUdGa1pDQmhJR1oxYm1OMGFXOXVJR1JoYzJobFpFeHBibVZVYnlCMGJ5QkRZVzUyWVhOU1pXNWtaWEpwYm1kRGIyNTBaWGgwTWtRdWNISnZkRzkwZVhCbFhISmNiaWhtZFc1amRHbHZiaUFvS1NCN1hISmNiaUFnTHlvZ1oyeHZZbUZzSUVOaGJuWmhjMUpsYm1SbGNtbHVaME52Ym5SbGVIUXlSQ0FxTDF4eVhHNGdJSFpoY2lCdGIzWmxWRzlHZFc1amRHbHZiaUE5SUVOaGJuWmhjMUpsYm1SbGNtbHVaME52Ym5SbGVIUXlSQzV3Y205MGIzUjVjR1V1Ylc5MlpWUnZYSEpjYmx4eVhHNGdJQzh2SUc5aWFpQjBieUJ5WldOdmNtUWdkR2hsSUd4aGMzUWdjRzlwYm5RZ2JHOWpZWFJwYjI1Y2NseHVJQ0JEWVc1MllYTlNaVzVrWlhKcGJtZERiMjUwWlhoME1rUXVjSEp2ZEc5MGVYQmxMbXhoYzNSTmIzWmxWRzlNYjJOaGRHbHZiaUE5SUh0OVhISmNiaUFnTHk4Z2NtVjNjbWwwWlNCdGIzWmxWRzhnZEc4Z2NtVmpiM0prSUhSb1pTQnNZWE4wSUhCdmFXNTBJR3h2WTJGMGFXOXVYSEpjYmlBZ1EyRnVkbUZ6VW1WdVpHVnlhVzVuUTI5dWRHVjRkREpFTG5CeWIzUnZkSGx3WlM1dGIzWmxWRzhnUFNCbWRXNWpkR2x2YmlBb2VDd2dlU2tnZTF4eVhHNGdJQ0FnTHk4Z2RHaHBjeUJ3YjJsdWRDQjBieUJqZFhKeVpXNTBJR052Ym5SbGVIUWdiMkpxWEhKY2JpQWdJQ0J0YjNabFZHOUdkVzVqZEdsdmJpNWhjSEJzZVNoMGFHbHpMQ0JiZUN3Z2VWMHBYSEpjYmlBZ0lDQjBhR2x6TG14aGMzUk5iM1psVkc5TWIyTmhkR2x2Ymk1NElEMGdlRnh5WEc0Z0lDQWdkR2hwY3k1c1lYTjBUVzkyWlZSdlRHOWpZWFJwYjI0dWVTQTlJSGxjY2x4dUlDQjlYSEpjYmlBZ1EyRnVkbUZ6VW1WdVpHVnlhVzVuUTI5dWRHVjRkREpFTG5CeWIzUnZkSGx3WlM1a1lYTm9aV1JNYVc1bFZHOGdQU0JtZFc1amRHbHZiaUFvZUN3Z2VTd2daR0Z6YUV4bGJtZDBhQ2tnZTF4eVhHNGdJQ0FnWkdGemFFeGxibWQwYUNBOUlHUmhjMmhNWlc1bmRHZ2dmSHdnTlZ4eVhHNGdJQ0FnWkdGemFFeGxibWQwYUNBOUlHUmhjMmhNWlc1bmRHZ2dQQ0F3SUh4OElEVmNjbHh1SUNBZ0lIWmhjaUJ6ZEdGeWRGZ3NJSE4wWVhKMFdTd2daR1ZzZEdGWUxDQmtaV3gwWVZrc0lHNTFiVVJsYzJobGMxeHlYRzRnSUNBZ2MzUmhjblJZSUQwZ2RHaHBjeTVzWVhOMFRXOTJaVlJ2VEc5allYUnBiMjR1ZUZ4eVhHNGdJQ0FnYzNSaGNuUlpJRDBnZEdocGN5NXNZWE4wVFc5MlpWUnZURzlqWVhScGIyNHVlVnh5WEc0Z0lDQWdaR1ZzZEdGWUlEMGdlQ0F0SUhOMFlYSjBXRnh5WEc0Z0lDQWdaR1ZzZEdGWklEMGdlU0F0SUhOMFlYSjBXVnh5WEc0Z0lDQWdiblZ0UkdWemFHVnpJRDBnVFdGMGFDNW1iRzl2Y2loTllYUm9Mbk54Y25Rb1pHVnNkR0ZZSUNvZ1pHVnNkR0ZZSUNzZ1pHVnNkR0ZaSUNvZ1pHVnNkR0ZaS1NBdklHUmhjMmhNWlc1bmRHZ3BYSEpjYmlBZ0lDQm1iM0lnS0haaGNpQnBJRDBnTURzZ2FTQThJRzUxYlVSbGMyaGxjenNnYVNzcktTQjdYSEpjYmlBZ0lDQWdJSFJvYVhOYmFTQWxJRElnUFQwOUlEQWdQeUFuYlc5MlpWUnZKeUE2SUNkc2FXNWxWRzhuWFNoemRHRnlkRmdnS3lBb1pHVnNkR0ZZSUM4Z2JuVnRSR1Z6YUdWektTQXFJR2tzSUhOMFlYSjBXU0FySUNoa1pXeDBZVmtnTHlCdWRXMUVaWE5vWlhNcElDb2dhU2xjY2x4dUlDQWdJSDFjY2x4dUlDQWdJQzh2SUdOaGMyVWdiMllnYjJSa0lHNTFiVnh5WEc0Z0lDQWdkR2hwY3k1dGIzWmxWRzhvZUN3Z2VTbGNjbHh1SUNCOVhISmNibjBwS0NsY2NseHVYSEpjYmk4dklHMXZaSFZzWlM1bGVIQnZjblJ6UFVOaGJuWmhjMUpsYm1SbGNtbHVaME52Ym5SbGVIUXlSRnh5WEc1bGVIQnZjblFnZTBOaGJuWmhjMUpsYm1SbGNtbHVaME52Ym5SbGVIUXlSSDFjY2x4dVhHNWNibHh1THk4Z1YwVkNVRUZEU3lCR1QwOVVSVklnTHk5Y2JpOHZJQzR2YzNKakwyUmhjMmhsWkV4cGJtVlVieTVxY3lKZExDSnpiM1Z5WTJWU2IyOTBJam9pSW4wPVwiKTtcblxuLyoqKi8gfSksXG4vKiAxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuZXZhbChcIlxcblxcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcXFwiX19lc01vZHVsZVxcXCIsIHtcXG4gIHZhbHVlOiB0cnVlXFxufSk7XFxuZXhwb3J0cy5jYW4gPSB1bmRlZmluZWQ7XFxuXFxudmFyIF9kYXNoZWRMaW5lVG8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xcblxcbnZhciBfZGFzaGVkTGluZVRvMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Rhc2hlZExpbmVUbyk7XFxuXFxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cXG5cXG4vLyBtb2R1bGUuZXhwb3J0cz1jYW5cXG52YXIgY2FuID0gZXhwb3J0cy5jYW4gPSB7XFxuICBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ6IF9kYXNoZWRMaW5lVG8yLmRlZmF1bHRcXG59OyAvLyByZXF1aXJlKCcuL2Rlc2hlZExpbmVUby5qcycpLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5kbFluQmhZMnM2THk4dkxpOXpjbU12YVc1a1pYZ3Vhbk0vT1RVMU1pSmRMQ0p1WVcxbGN5STZXeUpqWVc0aUxDSkRZVzUyWVhOU1pXNWtaWEpwYm1kRGIyNTBaWGgwTWtRaVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096czdRVUZEUVRzN096czdPMEZCUlVFN1FVRkRUeXhKUVVGTlFTeHZRa0ZCVFR0QlFVTnFRa003UVVGRWFVSXNRMEZCV2l4RExFTkJTbEFpTENKbWFXeGxJam9pTVM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaTh2SUhKbGNYVnBjbVVvSnk0dlpHVnphR1ZrVEdsdVpWUnZMbXB6SnlsY2NseHVhVzF3YjNKMElFTmhiblpoYzFKbGJtUmxjbWx1WjBOdmJuUmxlSFF5UkNCbWNtOXRJQ2N1TDJSaGMyaGxaRXhwYm1WVWJ5NXFjeWRjY2x4dVhISmNiaTh2SUcxdlpIVnNaUzVsZUhCdmNuUnpQV05oYmx4eVhHNWxlSEJ2Y25RZ1kyOXVjM1FnWTJGdUlEMGdlMXh5WEc0Z0lFTmhiblpoYzFKbGJtUmxjbWx1WjBOdmJuUmxlSFF5UkZ4eVhHNTlYSEpjYmx4dVhHNWNiaTh2SUZkRlFsQkJRMHNnUms5UFZFVlNJQzh2WEc0dkx5QXVMM055WXk5cGJtUmxlQzVxY3lKZExDSnpiM1Z5WTJWU2IyOTBJam9pSW4wPVwiKTtcblxuLyoqKi8gfSlcbi8qKioqKiovIF0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jYW52YXNfdXRpbHMvZGlzdC9qcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _canvas_utils = __webpack_require__(0);\n\nvar _canvas_utils2 = _interopRequireDefault(_canvas_utils);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar context = document.getElementById('canvas').getContext('2d');\ncontext.moveTo(1, 1);\ncontext.dashedLineTo(100, 100);\ncontext.dashedLineTo(1, 100);\ncontext.stroke();\n\nalert(2);\n\nconsole.log(_canvas_utils2.default);//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvaW5kZXguanM/YmM2NiJdLCJuYW1lcyI6WyJjb250ZXh0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImdldENvbnRleHQiLCJtb3ZlVG8iLCJkYXNoZWRMaW5lVG8iLCJzdHJva2UiLCJhbGVydCIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztBQUNBLElBQUlBLFVBQVFDLFNBQVNDLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0NDLFVBQWxDLENBQTZDLElBQTdDLENBQVo7QUFDQ0gsUUFBUUksTUFBUixDQUFlLENBQWYsRUFBaUIsQ0FBakI7QUFDQUosUUFBUUssWUFBUixDQUFxQixHQUFyQixFQUF5QixHQUF6QjtBQUNBTCxRQUFRSyxZQUFSLENBQXFCLENBQXJCLEVBQXVCLEdBQXZCO0FBQ0FMLFFBQVFNLE1BQVI7O0FBRUFDLE1BQU0sQ0FBTjs7QUFFQUMsUUFBUUMsR0FBUiIsImZpbGUiOiIxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNhbiBmcm9tICdjYW52YXNfdXRpbHMnXHJcbmxldCBjb250ZXh0PWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKS5nZXRDb250ZXh0KCcyZCcpXHJcblx0Y29udGV4dC5tb3ZlVG8oMSwxKVxyXG5cdGNvbnRleHQuZGFzaGVkTGluZVRvKDEwMCwxMDApXHJcblx0Y29udGV4dC5kYXNoZWRMaW5lVG8oMSwxMDApXHJcblx0Y29udGV4dC5zdHJva2UoKVxyXG5cclxuXHRhbGVydCgyKVxyXG5cclxuXHRjb25zb2xlLmxvZyhjYW4pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ })
/******/ ]);