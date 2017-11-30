"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var diacritics_1 = require("./diacritics");
/**Realiza una busqueda de texto y devuelve true si la busqueda encaja */
function search(pattern, text) {
    if (!pattern)
        return true;
    if (!text)
        return false;
    pattern = diacritics_1.removeDiacritics(pattern.toLowerCase());
    text = diacritics_1.removeDiacritics(text.toLowerCase());
    var splitter = /(?:\s|\n|\r)+/g;
    var tw = text.split(splitter).filter(function (x) { return x != ""; });
    var pw = pattern.split(splitter).filter(function (x) { return x != ""; });
    if (pw.length == 0)
        return true;
    if (pw.length == 1)
        return text.indexOf(pattern) != -1;
    var cadaPalabra = pw.map(function (x) { return text.indexOf(x) != -1; }).reduce(function (a, b) { return a && b; }, true);
    return cadaPalabra;
}
exports.search = search;
