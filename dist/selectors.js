"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _moize = require("moize");
var interop_1 = require("./interop");
var logic_1 = require("./logic");
var moizeDefault = interop_1.interopRequireDefault(_moize);
var defaultCreateSelectorAsync = createSelectorCreator({ deepEquals: false });
exports.createDeepSelector = createSelectorCreator({ deepEquals: true });
function createSelector() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var func = defaultCreateSelectorAsync;
    return func.apply(void 0, __spread(args));
}
exports.createSelector = createSelector;
function createSelectorCreator(options) {
    var selectorArr = createSelectorAsyncArrCreator(options);
    return function createSelectorAsync() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var selectors = args.slice(0, args.length - 1);
        var combiner = args[args.length - 1];
        return selectorArr(selectors, combiner);
    };
}
exports.createSelectorCreator = createSelectorCreator;
function createSelectorAsyncArrCreator(options) {
    var moize = moizeDefault({ equals: options.deepEquals ? logic_1.deepEquals : undefined, maxSize: 1 });
    /**Crea un selector con un funcionamiento similar al de reselect.createSelector, pero con la memoización comparando el resultado resuelto de la promesa en lugar de simplemente la promesa*/
    return function createSelectorAsyncArr(selectors, combiner) {
        var memoCombiner = moize(combiner);
        var asyncCombiner = function () {
            var asyncS = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                asyncS[_i] = arguments[_i];
            }
            var anyPromise = logic_1.any(asyncS, function (x) { return logic_1.isPromise(x); });
            if (!anyPromise) {
                //Ruta sincrona:
                return memoCombiner.apply(void 0, __spread(asyncS));
            }
            else {
                //Ruta asincrona
                return Promise.all(asyncS).then(function (s) { return memoCombiner.apply(void 0, __spread(s)); });
            }
        };
        var memoAsyncCombiner = moize(asyncCombiner);
        var ret = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var myArgs = selectors.map(function (x) { return x.apply(void 0, __spread(args)); });
            return memoAsyncCombiner.apply(void 0, __spread(myArgs));
        };
        return ret;
    };
}
