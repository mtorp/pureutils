"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./pipe"));
/**Compara dos arreglos valor por valor */
function sequenceEquals(a, b, comparer) {
    if (a === b)
        return true;
    if (a == null || b == null)
        return false;
    if (a.length != b.length)
        return false;
    comparer = comparer || (function (a, b) { return a === b; });
    for (var i = 0; i < a.length; i++) {
        if (!comparer(a[i], b[i]))
            return false;
    }
    return true;
}
exports.sequenceEquals = sequenceEquals;
/**Compara dos objetos propiedad por propiedad */
function shallowEquals(a, b, comparer) {
    if ((typeof a) != (typeof b))
        return false;
    if ((typeof a) === "string" || (typeof a) === "boolean" || (typeof a) === "number") {
        return a === b;
    }
    if (a === b)
        return true;
    if (a == null || b == null)
        return false;
    var aKeys = Object.keys(a).map(function (x) { return x; });
    var bKeys = Object.keys(b).map(function (x) { return x; });
    if (aKeys.length != bKeys.length)
        return false;
    return sequenceEquals(aKeys.map(function (x) { return a[x]; }), aKeys.map(function (x) { return b[x]; }), comparer);
}
exports.shallowEquals = shallowEquals;
function deepEquals(a, b) {
    var deep = function (a, b) { return shallowEquals(a, b, deep); };
    return deep(a, b);
}
exports.deepEquals = deepEquals;
/**Convierte un arreglo a un objeto */
function toMap(arr, key, value) {
    var ret = {};
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var x = arr_1[_i];
        ret[key(x)] = value(x);
    }
    return ret;
}
exports.toMap = toMap;
/**Aplana una colección de colecciones */
function flatten(arr) {
    var ret = [];
    for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
        var a = arr_2[_i];
        ret.push.apply(ret, a);
    }
    return ret;
}
exports.flatten = flatten;
/**Devuelve el primer elemento de un arreglo o indefinido si no se encontro ninguno, opcionalmente
 * filtrado por un predicado
 */
function first(arr, pred) {
    for (var _i = 0, arr_3 = arr; _i < arr_3.length; _i++) {
        var a = arr_3[_i];
        if (!pred || pred(a))
            return a;
    }
    return undefined;
}
exports.first = first;
/**Agrupa un arreglo por una llave
 * @param comparer Comparador, por default es un shallowEquals
 */
function groupBy(arr, groupBy, comparer) {
    var ret = [];
    comparer = comparer || shallowEquals;
    var _loop_1 = function () {
        var key = groupBy(x);
        var firstItem = first(ret, function (x) { return comparer(x.key, key); });
        if (firstItem === undefined) {
            ret.push({ key: key, items: [x] });
        }
        else {
            firstItem.items.push(x);
        }
    };
    for (var _i = 0, arr_4 = arr; _i < arr_4.length; _i++) {
        var x = arr_4[_i];
        _loop_1();
    }
    return ret;
}
exports.groupBy = groupBy;
