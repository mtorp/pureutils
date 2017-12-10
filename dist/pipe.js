"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pipe(value) {
    var fs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        fs[_i - 1] = arguments[_i];
    }
    return fs.reduce(function (a, b) { return b(a); }, value);
}
exports.pipe = pipe;
