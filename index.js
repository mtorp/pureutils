"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./pipe"));
/**Devuelve true si todos los elementos de un arreglo encajan con el predicado */
function all(arr, pred) {
    try {
        for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
            var x = arr_1_1.value;
            if (!pred(x))
                return false;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return true;
    var e_1, _a;
}
exports.all = all;
/**Devuelve true si por lo menos un elemento del arreglo encaja con el predicado, o si existe por lo menos un elemento en caso
 * de que el predicado este indefinido
 */
function any(arr, pred) {
    if (pred) {
        try {
            for (var arr_2 = __values(arr), arr_2_1 = arr_2.next(); !arr_2_1.done; arr_2_1 = arr_2.next()) {
                var x = arr_2_1.value;
                if (pred(x))
                    return true;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (arr_2_1 && !arr_2_1.done && (_a = arr_2.return)) _a.call(arr_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return false;
    }
    else {
        return arr.length > 0;
    }
    var e_2, _a;
}
exports.any = any;
/**Devuelve true si el valor existe en el arreglo */
function contains(arr, value, comparer) {
    var effectiveComparer = comparer || (function (a, b) { return a == b; });
    return any(arr, function (x) { return effectiveComparer(x, value); });
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
/**Devuelve true si 2 arreglos contienen los mismos valores, sin considerar el orden o la cantidad de veces que el mismo valor esta repetido en el arreglo
 * @param comparer Función que se usa para comparar los elementos, si no se especifica, se usa el operador ==
 */
function setEquals(a, b, comparer) {
    try {
        for (var a_1 = __values(a), a_1_1 = a_1.next(); !a_1_1.done; a_1_1 = a_1.next()) {
            var aItem = a_1_1.value;
            if (!contains(b, aItem, comparer))
                return false;
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (a_1_1 && !a_1_1.done && (_a = a_1.return)) _a.call(a_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    try {
        for (var b_1 = __values(b), b_1_1 = b_1.next(); !b_1_1.done; b_1_1 = b_1.next()) {
            var bItem = b_1_1.value;
            if (!contains(a, bItem, comparer))
                return false;
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (b_1_1 && !b_1_1.done && (_b = b_1.return)) _b.call(b_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return true;
    var e_3, _a, e_4, _b;
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
    if (canBeArray(a) && canBeArray(b)) {
        return sequenceEquals(toArray(a), toArray(b), comparer);
    }
    var aKeys = Object.keys(a).map(function (x) { return x; });
    var bKeys = Object.keys(b).map(function (x) { return x; });
    if (aKeys.length != bKeys.length)
        return false;
    return sequenceEquals(aKeys.map(function (x) { return a[x]; }), aKeys.map(function (x) { return b[x]; }), comparer);
}
exports.shallowEquals = shallowEquals;
/**Convierte un ArrayLike o Iterable en un arreglo. Si el valor ya es un arreglo devuelve el valor */
function toArray(arr) {
    if (arr instanceof Array) {
        return arr;
    }
    var isArrayLike = function (x) { return x.lenght !== undefined; };
    var ret = [];
    if (isArrayLike(arr)) {
        for (var i = 0; i < arr.length; i++) {
            ret.push(arr[i]);
        }
    }
    else {
        try {
            for (var arr_3 = __values(arr), arr_3_1 = arr_3.next(); !arr_3_1.done; arr_3_1 = arr_3.next()) {
                var a = arr_3_1.value;
                ret.push(a);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (arr_3_1 && !arr_3_1.done && (_a = arr_3.return)) _a.call(arr_3);
            }
            finally { if (e_5) throw e_5.error; }
        }
    }
    return ret;
    var e_5, _a;
}
exports.toArray = toArray;
/**Devuelve true si un objeeto se puede convertir a un arreglo utilizando la función toArray */
function canBeArray(arr) {
    return isArrayLike(arr) || hasIterationProtocol(arr);
}
exports.canBeArray = canBeArray;
var isArrayLike = function (x) { return x.lenght !== undefined; };
var hasIterationProtocol = function (variable) { return variable !== null && Symbol.iterator in Object(variable); };
function deepEquals(a, b) {
    var deep = function (a, b) { return shallowEquals(a, b, deep); };
    return deep(a, b);
}
exports.deepEquals = deepEquals;
/**Convierte un arreglo a un objeto */
function toMap(arr, key, value) {
    var ret = {};
    try {
        for (var arr_4 = __values(arr), arr_4_1 = arr_4.next(); !arr_4_1.done; arr_4_1 = arr_4.next()) {
            var x = arr_4_1.value;
            ret[key(x)] = value(x);
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (arr_4_1 && !arr_4_1.done && (_a = arr_4.return)) _a.call(arr_4);
        }
        finally { if (e_6) throw e_6.error; }
    }
    return ret;
    var e_6, _a;
}
exports.toMap = toMap;
/**Aplana una colección de colecciones */
function flatten(arr) {
    var ret = [];
    try {
        for (var arr_5 = __values(arr), arr_5_1 = arr_5.next(); !arr_5_1.done; arr_5_1 = arr_5.next()) {
            var a = arr_5_1.value;
            ret.push.apply(ret, __spread(a));
        }
    }
    catch (e_7_1) { e_7 = { error: e_7_1 }; }
    finally {
        try {
            if (arr_5_1 && !arr_5_1.done && (_a = arr_5.return)) _a.call(arr_5);
        }
        finally { if (e_7) throw e_7.error; }
    }
    return ret;
    var e_7, _a;
}
exports.flatten = flatten;
/**Devuelve el primer elemento de un arreglo o indefinido si no se encontro ninguno, opcionalmente
 * filtrado por un predicado
 */
function first(arr, pred) {
    try {
        for (var arr_6 = __values(arr), arr_6_1 = arr_6.next(); !arr_6_1.done; arr_6_1 = arr_6.next()) {
            var a = arr_6_1.value;
            if (!pred || pred(a))
                return a;
        }
    }
    catch (e_8_1) { e_8 = { error: e_8_1 }; }
    finally {
        try {
            if (arr_6_1 && !arr_6_1.done && (_a = arr_6.return)) _a.call(arr_6);
        }
        finally { if (e_8) throw e_8.error; }
    }
    return undefined;
    var e_8, _a;
}
exports.first = first;
/**Devuelve el ultimo elemento de un arreglo */
function last(arr) {
    return arr[arr.length - 1];
}
exports.last = last;
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
    try {
        for (var arr_7 = __values(arr), arr_7_1 = arr_7.next(); !arr_7_1.done; arr_7_1 = arr_7.next()) {
            var x = arr_7_1.value;
            _loop_1(x);
        }
    }
    catch (e_9_1) { e_9 = { error: e_9_1 }; }
    finally {
        try {
            if (arr_7_1 && !arr_7_1.done && (_a = arr_7.return)) _a.call(arr_7);
        }
        finally { if (e_9) throw e_9.error; }
    }
    return ret;
    var e_9, _a;
}
exports.groupBy = groupBy;
function enumObject(obj, selector) {
    var defaultSelector = (function (key, value) { return ({ key: key, value: value }); });
    var effectiveSelector = selector || defaultSelector;
    if (selector) {
        return Object.keys(obj).map(function (key) { return selector(key, obj[key]); });
    }
    else {
        return Object.keys(obj).map(function (key) { return key; }).map(function (key) { return defaultSelector(key, obj[key]); });
    }
}
exports.enumObject = enumObject;
function arrayToMap(array, keySelector, valueSelector) {
    var defaultKeySelector = function (item) { return item.key; };
    var defaultValueSelector = function (item) { return item.value; };
    var effectiveKeySelector = keySelector || defaultKeySelector;
    var effectiveValueSelector = valueSelector || defaultValueSelector;
    var ret = {};
    try {
        for (var array_1 = __values(array), array_1_1 = array_1.next(); !array_1_1.done; array_1_1 = array_1.next()) {
            var a = array_1_1.value;
            var key = effectiveKeySelector(a);
            var value = effectiveValueSelector(a);
            ret[key] = value;
        }
    }
    catch (e_10_1) { e_10 = { error: e_10_1 }; }
    finally {
        try {
            if (array_1_1 && !array_1_1.done && (_a = array_1.return)) _a.call(array_1);
        }
        finally { if (e_10) throw e_10.error; }
    }
    return ret;
    var e_10, _a;
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
function omit(obj, keys) {
    return filterObject(obj, function (value, key) { return !contains(keys, key); });
}
exports.omit = omit;
/**Intercambia 2 elementos de un arreglo, si los indices dados estan afuera del arreglo, lanza una excepción */
function swapItems(array, a, b) {
    var inside = function (x) { return x >= 0 && x < array.length; };
    if (!inside(a) || !inside(b))
        throw new Error("Indice fuera de rango");
    return array.map(function (x, i, arr) {
        return i == a ? arr[b] :
            i == b ? arr[a] :
                arr[i];
    });
}
exports.swapItems = swapItems;
/**Mueve un elemento del arreglo de un indice a otro, note que no es igual a swapItems ya que al mover un elemento se conserva el orden de todos los de más elemento, esto no ocurre con el swap que
 * simplemente intercambia de posición 2 elementos. Si los indices estan fuera de rango lanza uan excepción
*/
function moveItem(array, sourceIndex, destIndex) {
    var inside = function (x) { return x >= 0 && x < array.length; };
    if (!inside(sourceIndex) || !inside(destIndex))
        throw new Error("Indice fuera de rango");
    //Si los valroes son iguales devuelve el arreglo tal cual
    if (sourceIndex == destIndex)
        return array;
    //Dirección del movimiento, puede ser -1 o +1
    var dir = Math.sign(destIndex - sourceIndex);
    var min = Math.min(sourceIndex, destIndex);
    var max = Math.max(sourceIndex, destIndex);
    return array.map(function (x, i, arr) {
        return (i < min || i > max) ? x :
            (i == destIndex) ? arr[sourceIndex] :
                arr[i + dir];
    });
}
exports.moveItem = moveItem;
/**Mueve un elemento hacia array o hacia abajo, si el elemento no se puede mover ya que esta en el borde del arreglo devuelve el arreglo tal cual */
function upDownItem(array, index, direction) {
    if ((index == 0 && direction == "up") || (index == array.length - 1 && direction == "down")) {
        return array;
    }
    else {
        return moveItem(array, index, index + (direction == "up" ? -1 : +1));
    }
}
exports.upDownItem = upDownItem;
function promiseAllObj(obj) {
    var keys = Object.keys(obj);
    var values = keys.map(function (key) { return obj[key]; });
    var all = Promise.all(values);
    var ret = all.then(function (arr) { return arr.map(function (value, index) { return ({ key: keys[index], value: value }); }); }).then(function (x) { return arrayToMap(x); });
    return ret;
}
exports.promiseAllObj = promiseAllObj;
