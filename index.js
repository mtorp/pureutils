"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./pipe"));
/**Devuelve true si todos los elementos de un arreglo encajan con el predicado */
function all(arr, pred) {
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var x = arr_1[_i];
        if (!pred(x))
            return false;
    }
    return true;
}
exports.all = all;
/**Devuelve true si por lo menos un elemento del arreglo encaja con el predicado, o si existe por lo menos un elemento en caso
 * de que el predicado este indefinido
 */
function any(arr, pred) {
    if (pred) {
        for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
            var x = arr_2[_i];
            if (pred(x))
                return true;
        }
        return false;
    }
    else {
        return arr.length > 0;
    }
}
exports.any = any;
/**Devuelve true si el valor existe en el arreglo */
function contains(arr, value) {
    return any(arr, function (x) { return x == value; });
}
exports.contains = contains;
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
/**Devuelve true si 2 arreglos contienen los mismos valores, sin considerar el orden o la cantidad de veces que el mismo valor esta repetido en el arreglo */
function setEquals(a, b) {
    var aSet = new Set(a);
}
exports.setEquals = setEquals;
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
    for (var _i = 0, arr_3 = arr; _i < arr_3.length; _i++) {
        var x = arr_3[_i];
        ret[key(x)] = value(x);
    }
    return ret;
}
exports.toMap = toMap;
/**Aplana una colección de colecciones */
function flatten(arr) {
    var ret = [];
    for (var _i = 0, arr_4 = arr; _i < arr_4.length; _i++) {
        var a = arr_4[_i];
        ret.push.apply(ret, a);
    }
    return ret;
}
exports.flatten = flatten;
/**Devuelve el primer elemento de un arreglo o indefinido si no se encontro ninguno, opcionalmente
 * filtrado por un predicado
 */
function first(arr, pred) {
    for (var _i = 0, arr_5 = arr; _i < arr_5.length; _i++) {
        var a = arr_5[_i];
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
    var comparerDefault = comparer || shallowEquals;
    var _loop_1 = function (x) {
        var key = groupBy(x);
        var firstItem = first(ret, function (x) { return comparerDefault(x.key, key); });
        if (firstItem === undefined) {
            ret.push({ key: key, items: [x] });
        }
        else {
            firstItem.items.push(x);
        }
    };
    for (var _i = 0, arr_6 = arr; _i < arr_6.length; _i++) {
        var x = arr_6[_i];
        _loop_1(x);
    }
    return ret;
}
exports.groupBy = groupBy;
function enumObject(obj, selector) {
    var defaultSelector = (function (key, value) { return ({ key: key, value: value }); });
    var effectiveSelector = selector || defaultSelector;
    if (selector) {
        return Object.keys(obj).map(function (key) { return selector(key, obj[key]); });
    }
    else {
        return Object.keys(obj).map(function (key) { return defaultSelector(key, obj[key]); });
    }
}
exports.enumObject = enumObject;
function arrayToMap(array, keySelector) {
    var defaultSelector = function (item) { return item.key; };
    var effectiveSelector = keySelector || defaultSelector;
    var ret = {};
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var a = array_1[_i];
        var key = effectiveSelector(a);
        ret[key] = a;
    }
    return ret;
}
exports.arrayToMap = arrayToMap;
/**
 * Aplica una función a cada propiedad de un objeto, conservando los keys
 * @param obj Objeto a mapear
 * @param map Función que toma el valor y el "key" y devuelve el nuevo valor
 */
function mapObject(obj, map) {
    var ret = {};
    for (var key in obj) {
        var value = obj[key];
        ret[key] = map(value, key);
    }
    return ret;
}
exports.mapObject = mapObject;
/**
 * Filtra las propiedades de un objeto
 * @param obj Objeto que se va a filtrar
 * @param pred Predicado que va a determinar que propiedades si se van a conservar
 */
function filterObject(obj, pred) {
    var ret = {};
    for (var key in obj) {
        var value = obj[key];
        if (pred(value, key)) {
            ret[key] = value;
        }
    }
    return ret;
}
exports.filterObject = filterObject;
/**
 * Quita un conjunto de propiedades de un objeto
 * @param obj El objeto original
 * @param keys Las propiedades que se desean quitar
 */
function omit(obj) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    return filterObject(obj, function (value, key) { return !contains(keys, key); });
}
exports.omit = omit;
