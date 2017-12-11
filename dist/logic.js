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
Object.defineProperty(exports, "__esModule", { value: true });
var pipe_1 = require("./pipe");
var rx = require("rxjs");
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
    var effectiveComparer = comparer || referenceEquals;
    return any(arr, function (x) { return effectiveComparer(x, value); });
}
exports.contains = contains;
/**Devuelve true si todos los valores en @see values existen en el arreglo @see arr . Si @see values esta vacío devuelve true */
function containsAll(arr, values, comparer) {
    return all(values, function (x) { return contains(arr, x, comparer); });
}
exports.containsAll = containsAll;
/**Devuelve true si existe algun valor en @see values que exista en @see arr . Si @see values esta vacío devuelve false */
function containsAny(arr, values, comparer) {
    return any(values, function (x) { return contains(arr, x, comparer); });
}
exports.containsAny = containsAny;
/**
 * Alias para el operador ===
 * @param a
 * @param b
 */
function referenceEquals(a, b) {
    return a === b;
}
exports.referenceEquals = referenceEquals;
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
 * @param comparer Función que se usa para comparar los elementos, si no se especifica, se usa el referenceEquals
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
function shallowEqualsCompareByRef(x) {
    var type = typeof x;
    var primTypeByRef = type == "string" || type == "boolean" || type == "number" || type == "symbol" || type == "function";
    return primTypeByRef || isPromise(x) || isObservable(x);
}
/**Compara dos objetos propiedad por propiedad */
function shallowEquals(a, b, comparer) {
    if ((typeof a) != (typeof b))
        return false;
    if (shallowEqualsCompareByRef(a) || shallowEqualsCompareByRef(b)) {
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
/**
 * Compara 2 objetos propiedad por propiedad, devuelve un objeto con las propiedades que son diferentes asignadas a true
 * @param a Objeto a
 * @param b Objecto b
 * @param comparer Comparador de las propiedades. Se usa por default referenceEquals
 */
function shallowDiff(a, b, comparer) {
    var eComp = comparer || referenceEquals;
    var props = pipe_1.pipe(union(Object.keys(a), Object.keys(b)), function (curr) { return curr.map(function (x) { return ({ key: x, value: a[x], otherValue: b[x], refEquals: a[x] === b[x] }); }); }, function (curr) { return curr.filter(function (x) { return !eComp(x.value, x.otherValue); }); }, function (curr) { return curr.map(function (x) { return x.key; }); }, function (curr) { return arrayToMap(curr, function (item) { return item; }, function (item) { return true; }); });
    return props;
}
exports.shallowDiff = shallowDiff;
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
/**Devuelve true si x es un array o un array like */
function isArrayLike(x) {
    return x != null && x.length !== undefined;
}
exports.isArrayLike = isArrayLike;
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
/**
 * Devuelve el unico elemento de un arreglo que cumpla con la condición, si no se encontró ninguo o mas de uno devuelve null
 */
function single(arr, pred) {
    var firstItem = undefined;
    var first = false;
    try {
        for (var arr_7 = __values(arr), arr_7_1 = arr_7.next(); !arr_7_1.done; arr_7_1 = arr_7.next()) {
            var a = arr_7_1.value;
            var pass = !pred || pred(a);
            if (pass) {
                if (first) {
                    //mas de uno
                    return undefined;
                }
                else {
                    firstItem = a;
                    first = true;
                }
            }
        }
    }
    catch (e_9_1) { e_9 = { error: e_9_1 }; }
    finally {
        try {
            if (arr_7_1 && !arr_7_1.done && (_a = arr_7.return)) _a.call(arr_7);
        }
        finally { if (e_9) throw e_9.error; }
    }
    return firstItem;
    var e_9, _a;
}
exports.single = single;
/**Devuelve el ultimo elemento de un arreglo */
function last(arr) {
    return arr[arr.length - 1];
}
exports.last = last;
/**Agrupa un arreglo por una llave. Se preserva el orden original de los elementos del arreglo, segun los elementos agrupadores que aparezcan primero, tambien
 * el orden adentro del grupo es preservado
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
        for (var arr_8 = __values(arr), arr_8_1 = arr_8.next(); !arr_8_1.done; arr_8_1 = arr_8.next()) {
            var x = arr_8_1.value;
            _loop_1(x);
        }
    }
    catch (e_10_1) { e_10 = { error: e_10_1 }; }
    finally {
        try {
            if (arr_8_1 && !arr_8_1.done && (_a = arr_8.return)) _a.call(arr_8);
        }
        finally { if (e_10) throw e_10.error; }
    }
    return ret;
    var e_10, _a;
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
    catch (e_11_1) { e_11 = { error: e_11_1 }; }
    finally {
        try {
            if (array_1_1 && !array_1_1.done && (_a = array_1.return)) _a.call(array_1);
        }
        finally { if (e_11) throw e_11.error; }
    }
    return ret;
    var e_11, _a;
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
/**Quita las propiedades que esten indefinidas en un objeto */
function omitUndefined(obj) {
    return filterObject(obj, function (value) { return value !== undefined; });
}
exports.omitUndefined = omitUndefined;
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
/**Convierte una promesa de un objeto a un objeto de promesas
 * @param include Nombres de las propiedades que se desean incluir en el objeto resultante
 */
function awaitObj(obj, include) {
    var ret = pipe_1.pipe(include, function (inc) { return filterObject(inc, function (x) { return !!x; }); }, function (inc) { return mapObject(inc, function (value, key) { return obj.then(function (x) { return x[key]; }); }); });
    return ret;
}
exports.awaitObj = awaitObj;
/**Devuelve todos los elementos de un arreglo que no estan repetidos, respetando el orden original en el que aparecen primero.
 * @param comparer Comparador que determina si 2 elementos son iguales. Se usa el operador ===
*/
function unique(arr, comparer) {
    return groupBy(arr, function (x) { return x; }, referenceEquals).map(function (x) { return x.key; });
}
exports.unique = unique;
/**Devuelve todos los elementos de todos los arreglos que no esten repetidos */
function union() {
    var arr = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
    }
    return unique(concat.apply(void 0, __spread(arr)));
}
exports.union = union;
/**Pega todos los elementos de los arreglos */
function concat() {
    var arr = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
    }
    return arr.reduce(function (acum, curr) { return __spread(acum, curr); }, []);
}
exports.concat = concat;
/**Filtra el arreglo sólo si condition == true, si es false devuelve el arreglo tal cual */
function filterIf(arr, predicate, condition) {
    return condition ? arr.filter(predicate) : arr;
}
exports.filterIf = filterIf;
/**Dado un arreglo de keys, para cada key mapea a el elemento que le corresponde.
 * Si existen varios elementos con la misma clave, cuando se encuentre esa clave se devolverá el primer elemento en el arreglo values con esa clave
 * @param keys Claves que se van a mapear
 * @param values Valores en los que se va a buscar para cada clave, el valor que tiene esa clave
 * @param keySelector Obtener la clave de un elemento
 * @param keyComparer Comparador que se usará para determinar si dos claves son iguales. Por default se usa el shallowEquals
 */
function mapKeys(keys, values, keySelector, keyComparer) {
    var effectiveKeyComparer = keyComparer || shallowEquals;
    return keys.map(function (key) { return first(values, function (value) { return shallowEquals(key, keySelector(value)); }); });
}
exports.mapKeys = mapKeys;
/**Devuelve todos los elementos en "a" que se encuentren también en "b". Conserva el orden original de "a"
 * @param comparer Comparedor de igualdad. Por default se usa el referenceEquals
 */
function intersect(a, b, comparer) {
    return intersectKeys(a, b, function (x) { return x; }, comparer || referenceEquals);
}
exports.intersect = intersect;
/**Devuelve todos los elementos en "items" tal que su key se encuentre una o mas veces en "keys". Conserva el orden original de "items".
 * @param keySelector Obtiene la clave de un elemento
 * @param comparer Comparedor de igualdad. Por default se usa el shallowEquals
 */
function intersectKeys(items, keys, keySelector, comparer) {
    return items.filter(function (item) { return contains(keys, keySelector(item), comparer || shallowEquals); });
}
exports.intersectKeys = intersectKeys;
/**Devuelve un rango de numeros */
function range(start, count, step) {
    var ret = [];
    step = step || 1;
    var end = start + count * step;
    for (var i = start; i < end; i += step) {
        ret.push(i);
    }
    return ret;
}
exports.range = range;
/**
 * Devuelve un nuevo arreglo con todo el arreglo original mas el elemento al final
 */
function push(arr, item) {
    return __spread(arr, [item]);
}
exports.push = push;
/**
 * Remplaza todos los valores del arreglo que cumplan con cierta condicion
 */
function replace(arr, condition, newValue) {
    return arr.map(function (x, i) { return condition(x, i) ? newValue : x; });
}
exports.replace = replace;
/**Elimina un elemento del arreglo */
function remove(arr, item) {
    return arr.filter(function (x) { return x != item; });
}
exports.remove = remove;
/**
 * Combina varias funciones comparadores que pueden ser usadas para alimentar a la función sort. Se le da prioridad a los primeros comparadores,
 * si un comparador devuelve 0, entonces se evalue el segundo
 * @param comparers
 */
function combineComparers() {
    var comparers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        comparers[_i] = arguments[_i];
    }
    return function (a, b) {
        try {
            for (var comparers_1 = __values(comparers), comparers_1_1 = comparers_1.next(); !comparers_1_1.done; comparers_1_1 = comparers_1.next()) {
                var comp = comparers_1_1.value;
                var result = comp(a, b);
                if (result != 0)
                    return result;
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (comparers_1_1 && !comparers_1_1.done && (_a = comparers_1.return)) _a.call(comparers_1);
            }
            finally { if (e_12) throw e_12.error; }
        }
        return 0;
        var e_12, _a;
    };
}
exports.combineComparers = combineComparers;
/**Comparador de ordenamiento por default */
function defaultComparer(a, b) {
    if (a === b) {
        return 0;
    }
    else if (a === null && b === undefined) {
        return 1;
    }
    else if (a === undefined && b === null) {
        return -1;
    }
    else
        return a > b ? 1 : a < b ? -1 : 0;
}
exports.defaultComparer = defaultComparer;
/**Ordena un arreglo de forma estable, a diferencia de con array.sort el arreglo original no es modificado
 * @param comparers Comparadores de ordenamiento, se le da precedencia al primero. Si no se especifica ninguno se usará el comparador por default
 */
function sort(arr) {
    var comparers = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        comparers[_i - 1] = arguments[_i];
    }
    comparers = comparers.length == 0 ? [defaultComparer] : comparers;
    var toEffComparer = function (func) { return function (a, b) { return func(a.value, b.value); }; };
    //Comparamos tambien por indice
    var effComparers = __spread(comparers.map(toEffComparer), [
        function (a, b) { return a.index - b.index; }
    ]);
    var effectiveComparer = combineComparers.apply(void 0, __spread(effComparers));
    var copy = arr.map(function (x, i) { return ({ value: x, index: i }); });
    copy.sort(effectiveComparer);
    var ret = copy.map(function (x) { return x.value; });
    return ret;
}
exports.sort = sort;
/**
 * Ordena un arreglo de forma estable segun ciertas claves seleccionadas usando el comparador por default
 */
function orderBy(arr) {
    var keySelectors = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keySelectors[_i - 1] = arguments[_i];
    }
    var comparers = keySelectors.map(function (selector) { return function (a, b) { return +defaultComparer(selector(a), selector(b)); }; });
    return sort.apply(void 0, __spread([arr], comparers));
}
exports.orderBy = orderBy;
/**Ordena un arreglo de forma estable y descendiente segun ciertas claves seleccionadas usando el comparador por default */
function orderByDesc(arr) {
    var keySelectors = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keySelectors[_i - 1] = arguments[_i];
    }
    var comparers = keySelectors.map(function (selector) { return function (a, b) { return -defaultComparer(selector(a), selector(b)); }; });
    return sort.apply(void 0, __spread([arr], comparers));
}
exports.orderByDesc = orderByDesc;
/**Convierte un observable de T, de Promise<T> o de Observable<T> a un observable de <T>, efectivamente aplanando un observable anidado en uno desanidado */
function rxFlatten(observable) {
    var obsOfObs = observable.map(function (x) { return toObservable(x); });
    return obsOfObs.concatAll();
}
exports.rxFlatten = rxFlatten;
/**Convierte un valor o una promesa a un observable, si el valor ya es un observable lo devuelve tal cual */
function toObservable(value) {
    if (value instanceof rx.Observable) {
        return value;
    }
    else {
        return rx.Observable.fromPromise(Promise.resolve(value));
    }
}
exports.toObservable = toObservable;
/**Toma los primeros N elementos del arreglo */
function take(arr, count) {
    var ret = [];
    for (var i = 0; i < Math.min(arr.length, count); i++) {
        ret.push(arr[i]);
    }
    return ret;
}
exports.take = take;
/**Obtiene le primer elemento mapeado de un arreglo o undefined */
function firstMap(arr, predicate, map) {
    var f = first(arr, predicate);
    return f && map(f);
}
exports.firstMap = firstMap;
/**Devuelve true si existiran duplicados en caso de editar un elemento de un arreglo
 * @param arr Arreglo
 * @param oldValueRef Valor anterior del arreglo
 * @param newValue Nuevo valor del arreglo
 */
function duplicatesOnEdit(arr, oldValue, newValue, keySelector) {
    var comparer = function (a, b) { return shallowEquals(keySelector(a), keySelector(b)); };
    var foundOldValue = false;
    try {
        for (var arr_9 = __values(arr), arr_9_1 = arr_9.next(); !arr_9_1.done; arr_9_1 = arr_9.next()) {
            var item = arr_9_1.value;
            if (comparer(item, newValue)) {
                if ((comparer(item, oldValue) && !foundOldValue)) {
                    foundOldValue = true;
                }
                else {
                    return true;
                }
            }
        }
    }
    catch (e_13_1) { e_13 = { error: e_13_1 }; }
    finally {
        try {
            if (arr_9_1 && !arr_9_1.done && (_a = arr_9.return)) _a.call(arr_9);
        }
        finally { if (e_13) throw e_13.error; }
    }
    return false;
    var e_13, _a;
}
exports.duplicatesOnEdit = duplicatesOnEdit;
/**
 * Devuelve true si existirán duplicados en caso de agregar un elemento a un arreglo que es equivalente a saber
 * si ese elemento esta contenido en el arreglo
 * @param arr
 * @param newValue
 * @param comparer  Se usa el shallow equals por default
 */
function duplicatesOnAdd(arr, newValue, keySelector) {
    var comparer = function (a, b) { return shallowEquals(keySelector(a), keySelector(b)); };
    return contains(arr, newValue, comparer);
}
exports.duplicatesOnAdd = duplicatesOnAdd;
/**Devuelve true si x tiene el metodo then, lo que indica que es una promesa */
function isPromise(x) {
    return x != null && (typeof x.then) == "function";
}
exports.isPromise = isPromise;
/**Devuelve true si x es un observable */
function isObservable(x) {
    return x instanceof rx.Observable;
}
exports.isObservable = isObservable;
/**Devuelve true si x es un array */
function isArray(x) {
    return x instanceof Array;
}
exports.isArray = isArray;
/**Mapea el valor actual y el anterior de un observable */
function mapPreviousRx(obs, startWith) {
    var ret = obs
        .map(function (x) { return ({ prev: startWith, curr: x }); })
        .scan(function (acc, val) { return ({ prev: acc.curr, curr: val.curr }); });
    return ret;
}
exports.mapPreviousRx = mapPreviousRx;
/**Mapea cada elemento de un arreglo tomando en cuenta el elemento anterior */
function mapPrevious(items, map, initial) {
    var prev = initial;
    var ret = [];
    try {
        for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
            var it_1 = items_1_1.value;
            ret.push(map(prev, it_1));
            prev = it_1;
        }
    }
    catch (e_14_1) { e_14 = { error: e_14_1 }; }
    finally {
        try {
            if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
        }
        finally { if (e_14) throw e_14.error; }
    }
    return ret;
    var e_14, _a;
}
exports.mapPrevious = mapPrevious;
/**Calcula un agregado corrido para cada elemento de un arreglo */
function runningTotal(items, seed, reduceState, map) {
    var ret = [];
    var state = seed;
    try {
        for (var items_2 = __values(items), items_2_1 = items_2.next(); !items_2_1.done; items_2_1 = items_2.next()) {
            var it_2 = items_2_1.value;
            var proj = reduceState(state, it_2);
            state = proj;
            var output = map(state, it_2);
            ret.push(output);
        }
    }
    catch (e_15_1) { e_15 = { error: e_15_1 }; }
    finally {
        try {
            if (items_2_1 && !items_2_1.done && (_a = items_2.return)) _a.call(items_2);
        }
        finally { if (e_15) throw e_15.error; }
    }
    return ret;
    var e_15, _a;
}
exports.runningTotal = runningTotal;
/**Mapea y aplana una colección. Es equivalente a  flatten(items.map(map)) */
function mapMany(items, map) {
    var result = [];
    try {
        for (var items_3 = __values(items), items_3_1 = items_3.next(); !items_3_1.done; items_3_1 = items_3.next()) {
            var x = items_3_1.value;
            var mapResult = map(x);
            result.push.apply(result, __spread(mapResult));
        }
    }
    catch (e_16_1) { e_16 = { error: e_16_1 }; }
    finally {
        try {
            if (items_3_1 && !items_3_1.done && (_a = items_3.return)) _a.call(items_3);
        }
        finally { if (e_16) throw e_16.error; }
    }
    return result;
    var e_16, _a;
}
exports.mapMany = mapMany;
/**A una cadena que representa un numero entero, aplica el separador de miles */
function aplicarSepMiles(intpart, sep) {
    if (sep === void 0) { sep = ","; }
    if (intpart.length < 4)
        return intpart;
    var start = intpart.length % 3;
    var ret = intpart.substr(0, start);
    for (var i = start; i < intpart.length; i += 3) {
        var subpart = intpart.substr(i, 3);
        ret += i == 0 ? subpart : (sep + subpart);
    }
    return ret;
}
/**
 * Formatea un número
 * @param number El numero
 * @param integer Cantidad de zeros a la izquierda en la parte entera
 * @param decimals Cantidad de zeros a la derecha en la parte desimal
 * @param thousep Usar separador de miles. Por default es false
 * @param prefix Prefijo del numero, ejemplo $ o %. Por default es ""
 */
function formatNumber(number, integer, decimals, thousep, prefix) {
    if (integer === void 0) { integer = 0; }
    if (decimals === void 0) { decimals = 0; }
    if (thousep === void 0) { thousep = false; }
    if (prefix === void 0) { prefix = ""; }
    if (number == null)
        return "";
    number = Number(number);
    var zeroes = "00000000000000000000";
    var sign = number < 0 ? "-" : "";
    var x = Math.abs(number);
    var int = Math.trunc(x);
    var frac = x - int;
    var intText = "" + int;
    var intZeroStr = zeroes + intText;
    var intPartSinSep = intZeroStr.substr(intZeroStr.length - Math.max(integer, intText.length));
    var intPart = thousep ? aplicarSepMiles(intPartSinSep) : intPartSinSep;
    if (decimals == 0)
        return sign + prefix + intPart;
    var fracText = "" + Math.trunc(Math.round(frac * 1000 * Math.pow(10, decimals)) / 1000);
    var fracZeroStr = fracText + zeroes;
    var fracPart = fracZeroStr.substring(0, decimals);
    return sign + prefix + intPart + "." + fracPart;
}
exports.formatNumber = formatNumber;
var monthNames = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
/**Formatea una fecha
 * @param fullDateTime true o false para indicar si mostrar las horas o no. Por default es undefined e implicar que se mostraran las horas si el valor tiene componente de horas, si no, se mostrará sólo la fecha
 */
function formatDate(x, fullDateTime) {
    if (x == null)
        return "";
    x = new Date(x);
    var year = formatNumber(x.getFullYear(), 4);
    var month = monthNames[x.getMonth()];
    var day = formatNumber(x.getDate(), 2);
    var hours = formatNumber(x.getHours(), 2);
    var minutes = formatNumber(x.getMinutes(), 2);
    //True si se debe de mostrar hora y fecha, si no, solo la fecha
    var effFull = fullDateTime == null ? (hours != "00" || minutes != "00") : fullDateTime;
    var dateStr = day + "/" + month + "/" + year;
    if (effFull) {
        var hourStr = hours + ":" + minutes;
        return dateStr + " " + hourStr;
    }
    else {
        return dateStr;
    }
}
exports.formatDate = formatDate;
/**Formatea una fecha de tal manera que sea compatible con el excel */
function formatDateExcel(x) {
    var f = function (x) { return formatNumber(x, 2); };
    var f4 = function (x) { return formatNumber(x, 4); };
    return f4(x.getFullYear()) + "-" + f(x.getMonth() + 1) + "-" + f(x.getDate()) + " " + f(x.getHours()) + ":" + f(x.getMinutes()) + ":" + f(x.getSeconds());
}
exports.formatDateExcel = formatDateExcel;
/**Devuelve una copia de una función. Respeta las propiedades agregadas a la función */
function cloneFunction(func) {
    var ret = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return func.apply(void 0, __spread(args));
    };
    var keys = Object.keys(func);
    try {
        for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
            var key = keys_1_1.value;
            ret[key] = func[key];
        }
    }
    catch (e_17_1) { e_17 = { error: e_17_1 }; }
    finally {
        try {
            if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
        }
        finally { if (e_17) throw e_17.error; }
    }
    return ret;
    var e_17, _a;
}
exports.cloneFunction = cloneFunction;
var bindOrigFuncKey = "_keautils_bindFunction_origFunctions";
/**Aplica un Function.bind respetando las propiedades agregadas a la función. Tambien se almacena la funcion original de tal manera que se puede devolver al estado original */
function bindFunction(func, thisArg) {
    var argArray = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        argArray[_i - 2] = arguments[_i];
    }
    var keys = Object.keys(func);
    var ret = func.bind.apply(func, __spread([thisArg], argArray));
    try {
        for (var keys_2 = __values(keys), keys_2_1 = keys_2.next(); !keys_2_1.done; keys_2_1 = keys_2.next()) {
            var key = keys_2_1.value;
            ret[key] = func[key];
        }
    }
    catch (e_18_1) { e_18 = { error: e_18_1 }; }
    finally {
        try {
            if (keys_2_1 && !keys_2_1.done && (_a = keys_2.return)) _a.call(keys_2);
        }
        finally { if (e_18) throw e_18.error; }
    }
    ;
    ret[bindOrigFuncKey] = ret[bindOrigFuncKey] || [];
    ret[bindOrigFuncKey] = __spread(ret[bindOrigFuncKey], [func]);
    return ret;
    var e_18, _a;
}
exports.bindFunction = bindFunction;
/**Deshace un bind aplicado con bindFunction. Un bind aplicado con Function.bind directamente no se puede deshacer. Si al argumento no se le fue aplicado un bind devuelve undefined */
function unbindFunction(func) {
    if (!func[bindOrigFuncKey]) {
        return undefined;
    }
    var arr = func[bindOrigFuncKey];
    return arr[arr.length - 1];
}
exports.unbindFunction = unbindFunction;
/**Devuelve una promesa que se resuelve en cierto tiempo*/
function delay(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.delay = delay;
