import { pipe } from "./pipe";
import * as rx from "rxjs";
import * as _uuidRandom from "uuid-random";

import { interopRequireDefault } from "./interop";
const uuidRandom = interopRequireDefault(_uuidRandom) as any;
/**Devuelve un nuevo UUID */
export function uuid() : string {
    return uuidRandom();
}

/**Devuelve true si todos los elementos de un arreglo encajan con el predicado */
export function all<T>(arr: T[], pred: (x: T) => boolean): boolean {
    for (const x of arr) {
        if (!pred(x))
            return false;
    }
    return true;
}

/**Devuelve true si todos los elementos de un arreglo son iguales. Si el arreglo esta vacío devuelve true
 * @param comparer El comparador de igualdar, por default es @see referenceEquals
 */
export function allEqual<T>(arr: T[], comparer?: (a:T , b:T) => boolean): boolean {
    if(arr.length == 0) return true;
    const effectiveComparer = comparer || referenceEquals;
    const first = arr[0];
    for(let i = 1; i < arr.length; i++) {
        const it = arr[i];
        if(!effectiveComparer(first, it))
            return false;
    }
    return true;
}

/**Devuelve true si por lo menos un elemento del arreglo encaja con el predicado, o si existe por lo menos un elemento en caso
 * de que el predicado este indefinido
 */
export function any<T>(arr: T[], pred?: (x: T) => boolean): boolean {
    if (pred) {
        for (const x of arr) {
            if (pred(x)) return true;
        }
        return false;
    } else {
        return arr.length > 0;
    }
}

/**Devuelve true si el valor existe en el arreglo */
export function contains<T>(arr: T[], value: T, comparer?: (a: T, b: T) => boolean): boolean {
    const effectiveComparer = comparer || referenceEquals;
    return any(arr, x => effectiveComparer(x, value));
}

/**Devuelve true si todos los valores en @see values existen en el arreglo @see arr . Si @see values esta vacío devuelve true */
export function containsAll<T>(arr: T[], values: T[], comparer?: (a: T, b: T) => boolean) {
    return all(values, x => contains(arr, x, comparer));
}

/**Devuelve true si existe algun valor en @see values que exista en @see arr . Si @see values esta vacío devuelve false */
export function containsAny<T>(arr: T[], values: T[], comparer?: (a: T, b: T) => boolean) {
    return any(values, x => contains(arr, x, comparer));
}

/**
 * Alias para el operador ===
 * @param a 
 * @param b 
 */
export function referenceEquals<T>(a: T, b: T) {
    return a === b;
}

/**Compara dos arreglos valor por valor */
export function sequenceEquals<T>(a: T[], b: T[], comparer?: (a: T, b: T) => boolean) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    comparer = comparer || ((a, b) => a === b);
    for (let i = 0; i < a.length; i++) {
        if (!comparer(a[i], b[i])) return false;
    }
    return true;
}

/**Devuelve true si 2 arreglos contienen los mismos valores, sin considerar el orden o la cantidad de veces que el mismo valor esta repetido en el arreglo
 * @param comparer Función que se usa para comparar los elementos, si no se especifica, se usa el referenceEquals
 */
export function setEquals<T>(a: T[], b: T[], comparer?: (a: T, b: T) => boolean): boolean {
    for (const aItem of a) {
        if (!contains(b, aItem, comparer)) return false;
    }
    for (const bItem of b) {
        if (!contains(a, bItem, comparer)) return false;
    }
    return true;
}

function shallowEqualsCompareByRef(x: any) {
    const type = typeof x;
    const primTypeByRef = type == "string" || type == "boolean" || type == "number" || type == "symbol" || type == "function";
    return primTypeByRef || isPromise(x) || isObservable(x);
}

/**Compara dos objetos propiedad por propiedad */
export function shallowEquals<T>(a: T, b: T, comparer?: (a: T[keyof T], b: T[keyof T]) => boolean) {
    if ((typeof a) != (typeof b))
        return false;

    if (shallowEqualsCompareByRef(a) || shallowEqualsCompareByRef(b)) {
        return a === b;
    }
    if (a instanceof Date || b instanceof Date) {
        if (a instanceof Date && b instanceof Date) {
            return a.valueOf() == b.valueOf();
        } else return false;
    }

    if (a === b) return true;
    if (a == null || b == null) return false;

    if (canBeArray(a) && canBeArray(b)) {
        return sequenceEquals(toArray(a), toArray(b), comparer);
    }

    const aKeys = Object.keys(a).map(x => x as keyof T);
    const bKeys = Object.keys(b).map(x => x as keyof T);

    if (aKeys.length != bKeys.length) return false;
    return sequenceEquals(aKeys.map(x => a[x]), aKeys.map(x => b[x]), comparer);
}

/**Resultado de un shallow diff */
export type ShallowDiffResult<T> = {
    [K in keyof T]?: true
}

export type ObjSet<T> = {
    [K in keyof T]?: true
}

/**
 * Compara 2 objetos propiedad por propiedad, devuelve un objeto con las propiedades que son diferentes asignadas a true
 * @param a Objeto a
 * @param b Objecto b
 * @param comparer Comparador de las propiedades. Se usa por default referenceEquals
 */
export function shallowDiff<T>(a: T, b: T, comparer?: (a: T[keyof T], b: T[keyof T]) => boolean): ObjSet<T> {
    const eComp = comparer || referenceEquals;
    const props =
        pipe(
            union(Object.keys(a), Object.keys(b)),
            curr => curr.map(x => ({ key: x, value: a[x], otherValue: b[x], refEquals: a[x] === b[x] })),
            curr => curr.filter(x => !eComp(x.value, x.otherValue)),

            curr => curr.map(x => x.key),

            curr => arrayToMap(curr, item => item, item => true),
        );


    return props as any;
}

/**Convierte un ArrayLike o Iterable en un arreglo. Si el valor ya es un arreglo devuelve el valor */
export function toArray<T>(arr: ArrayLike<T> | Iterable<T>): T[] {
    if (arr instanceof Array) {
        return arr;
    }

    const isArrayLike = (x: any): x is ArrayLike<any> => x.lenght !== undefined;
    const ret: T[] = [];
    if (isArrayLike(arr)) {
        for (let i = 0; i < arr.length; i++) {
            ret.push(arr[i]);
        }
    } else {
        for (const a of arr) {
            ret.push(a);
        }
    }
    return ret;
}

/**Devuelve true si un objeeto se puede convertir a un arreglo utilizando la función toArray */
export function canBeArray(arr: any): arr is ArrayLike<any> | Iterable<any> {
    return isArrayLike(arr) || hasIterationProtocol(arr);
}

/**Devuelve true si x es un array o un array like */
export function isArrayLike(x: any): x is ArrayLike<any> {
    return x != null && x.length !== undefined;
}

const hasIterationProtocol = (variable: any): variable is Iterable<any> => variable !== null && Symbol.iterator in Object(variable);

export function deepEquals<T>(a: T, b: T): boolean {
    const deep = (a, b) => shallowEquals(a, b, deep);
    return deep(a, b);
}

/**Convierte un arreglo a un objeto */
export function toMap<T, TValue>(arr: T[], key: (value: T) => string, value: (value: T) => TValue) {
    const ret: { [index: string]: TValue } = {}
    for (const x of arr)
        ret[key(x)] = value(x);

    return ret;
}


/**Aplana una colección de colecciones */
export function flatten<T>(arr: T[][]) {
    const ret: T[] = [];
    for (const a of arr)
        ret.push(...a);
    return ret;
}


/**Devuelve el primer elemento de un arreglo o indefinido si no se encontro ninguno, opcionalmente
 * filtrado por un predicado
 */
export function first<T>(arr: T[], pred?: (item: T) => boolean): T | undefined {
    for (const a of arr) {
        if (!pred || pred(a))
            return a;
    }
    return undefined;
}

/**
 * Devuelve el unico elemento de un arreglo que cumpla con la condición, si no se encontró ninguo o mas de uno devuelve undefined
 */
export function single<T>(arr: T[], pred?: (item: T) => boolean): T | undefined {
    let firstItem: T | undefined = undefined;
    let first: boolean = false;
    for (const a of arr) {
        const pass = !pred || pred(a);

        if (pass) {
            if (first) {
                //mas de uno
                return undefined;
            } else {
                firstItem = a;
                first = true;
            }
        }
    }
    return firstItem;
}

/**Devuelve el ultimo elemento de un arreglo */
export function last<T>(arr: T[]): T | undefined {
    return arr[arr.length - 1];
}

export type Grouping<TKey, TItem> = { key: TKey, items: TItem[] };

/**Agrupa un arreglo por una llave. Se preserva el orden original de los elementos del arreglo, segun los elementos agrupadores que aparezcan primero, tambien
 * el orden adentro del grupo es preservado
 * @param comparer Comparador de la llave por default es un shallowEquals
 */
export function groupBy<T, TKey>(arr: T[], groupBy: (item: T) => TKey, comparer?: (a: TKey, b: TKey) => boolean) {
    const ret: Grouping<TKey, T>[] = [];
    const comparerDefault = comparer || shallowEquals;
    for (const x of arr) {
        const key = groupBy(x);
        const firstItem = first(ret, x => comparerDefault(x.key, key));
        if (firstItem === undefined) {
            ret.push({ key: key, items: [x] });
        } else {
            firstItem.items.push(x);
        }
    }
    return ret;
}

export interface ObjMap<T> {
    [key: string]: T
}

/**Enumera todas las propiedades de un objeto en un arreglo
 * @param obj Objeto que se va a enumerar. Se devulve un arreglo de {value: T, key: string}
 */
export function enumObject<T>(obj: T): ({ key: keyof T, value: T[keyof T] })[]
/**
 * Enumera todas las propiedades de un objeto en un arreglo
 * @param obj Objeto que se va a enumerar
 * @param selector Función que obtiene cada elemento del arreglo
 */
export function enumObject<T, TR>(obj: T, selector: (key: keyof T, value: T[keyof T]) => TR): TR[]
export function enumObject<T, TR>(obj: T, selector?: (key: keyof T, value: T[keyof T]) => TR): TR[] | ({ key: keyof T, value: T[keyof T] })[] {
    const defaultSelector = ((key: keyof T, value: T[keyof T]) => ({ key, value }));
    const effectiveSelector = selector || defaultSelector;
    if (selector) {
        return Object.keys(obj).map(key => selector(key as keyof T, obj[key]));
    } else {
        return Object.keys(obj).map(key => key as keyof T).map(key => defaultSelector(key, obj[key]));
    }
}

/**
 * Convierte un arreglo en un objeto
 * @param array Arreglo donde se toma la propiedad "key" de cada elemento como key del objeto
 */
export function arrayToMap<TKey extends string, TValue>(array: { key: TKey, value: TValue }[]): ObjMap<TValue>
/**
 * Convierte un arreglo a un objeto
 * @param array Arreglo de valores
 * @param keySelector Función que obtiene la cadena que se tomada como el "key" de cada elemento
 */
export function arrayToMap<T, TValue>(array: T[], keySelector: (item: T) => string, valueSelector: (item: T) => TValue): ObjMap<TValue>
export function arrayToMap<T, TValue>(array: T[], keySelector?: (item: T) => string, valueSelector?: (item: T) => TValue): ObjMap<T[keyof T]> {
    const defaultKeySelector = (item: any) => item.key;
    const defaultValueSelector = (item: any) => item.value;

    const effectiveKeySelector = keySelector || defaultKeySelector;
    const effectiveValueSelector = valueSelector || defaultValueSelector;
    const ret = {};
    for (const a of array) {
        const key = effectiveKeySelector(a);
        const value = effectiveValueSelector(a);
        ret[key] = value;
    }
    return ret;
}
/**
 * Aplica una función a cada propiedad de un objeto, conservando los keys
 * @param obj Objeto a mapear
 * @param map Función que toma el valor y el "key" y devuelve el nuevo valor
 */
export function mapObject<T, TOut>(obj: T, map: <K extends keyof T>(value: T[K], key: K) => TOut): {[K in keyof T]: TOut} {
    const ret = {};
    for (const key in obj) {
        const value = obj[key];
        ret[key as string] = map(value, key);
    }
    return ret as {[K in keyof T]: TOut };
}

/**
 * Filtra las propiedades de un objeto
 * @param obj Objeto que se va a filtrar
 * @param pred Predicado que va a determinar que propiedades si se van a conservar
 */
export function filterObject<T extends { [key: string]: any }>(obj: T, pred: (value: T[keyof T], key: keyof T) => boolean): T {
    const ret = {};
    for (const key in obj) {
        const value = obj[key];
        if (pred(value, key)) {
            ret[key as string] = value;
        }
    }
    return ret as T;
}

/**
 * Quita un conjunto de propiedades de un objeto
 * @param obj El objeto original
 * @param keys Las propiedades que se desean quitar
 */
export function omit<T>(obj: T, keys: (keyof T)[]): T {
    return filterObject(obj, (value, key) => !contains(keys, key));
}


/**Quita las propiedades que esten indefinidas en un objeto */
export function omitUndefined<T>(obj: T): Partial<T> {
    return filterObject(obj, value => value !== undefined);
}


/**Intercambia 2 elementos de un arreglo, si los indices dados estan afuera del arreglo, lanza una excepción */
export function swapItems<T>(array: T[], a: number, b: number) {
    const inside = (x: number) => x >= 0 && x < array.length;
    if (!inside(a) || !inside(b))
        throw new Error("Indice fuera de rango");

    return array.map((x, i, arr) =>
        i == a ? arr[b] :
            i == b ? arr[a] :
                arr[i]);
}

/**Mueve un elemento del arreglo de un indice a otro, note que no es igual a swapItems ya que al mover un elemento se conserva el orden de todos los de más elemento, esto no ocurre con el swap que 
 * simplemente intercambia de posición 2 elementos. Si los indices estan fuera de rango lanza uan excepción
*/
export function moveItem<T>(array: T[], sourceIndex: number, destIndex: number) {
    const inside = (x: number) => x >= 0 && x < array.length;
    if (!inside(sourceIndex) || !inside(destIndex))
        throw new Error("Indice fuera de rango");

    //Si los valroes son iguales devuelve el arreglo tal cual
    if (sourceIndex == destIndex) return array;

    //Dirección del movimiento, puede ser -1 o +1
    const dir = Math.sign(destIndex - sourceIndex) as (-1 | 1);
    const min = Math.min(sourceIndex, destIndex);
    const max = Math.max(sourceIndex, destIndex);
    return array.map((x, i, arr) =>
        (i < min || i > max) ? x :
            (i == destIndex) ? arr[sourceIndex] :
                arr[i + dir]);

}

/**Mueve un elemento hacia array o hacia abajo, si el elemento no se puede mover ya que esta en el borde del arreglo devuelve el arreglo tal cual */
export function upDownItem<T>(array: T[], index: number, direction: "up" | "down") {
    if ((index == 0 && direction == "up") || (index == array.length - 1 && direction == "down")) {
        return array;
    } else {
        return moveItem(array, index, index + (direction == "up" ? -1 : +1));
    }
}

export type Promisify<T> = {[K in keyof T]: PromiseLike<T[K]> };

/**Aplica una función Promise.all a un objeto,  */
export function promiseAllObj<T>(obj: Promisify<T>): Promise<T>
export function promiseAllObj(obj: any) {
    const keys = Object.keys(obj);
    const values = keys.map(key => obj[key]);
    const all = Promise.all(values);
    const ret = all.then(arr => arr.map((value, index) => ({ key: keys[index], value: value }))).then(x => arrayToMap(x));
    return ret;
}

/**Convierte una promesa de un objeto a un objeto de promesas
 * @param include Nombres de las propiedades que se desean incluir en el objeto resultante
 */
export function awaitObj<T, TKeys extends keyof T>(obj: PromiseLike<T>, include: {[K in TKeys]: true }): Promisify<Pick<T, TKeys>> {
    const ret = pipe(
        include,
        inc => filterObject(inc, x => !!x),
        inc => mapObject<true | undefined, Promise<T[keyof T]>>(inc as any, (value, key: keyof T) => obj.then(x => x[key]) as any)
    );

    return ret as any;
}

/**Devuelve todos los elementos de un arreglo que no estan repetidos, respetando el orden original en el que aparecen primero.
 * @param comparer Comparador que determina si 2 elementos son iguales. Se usa el operador ===
*/
export function unique<T>(arr: T[], comparer?: (a: T, b: T) => boolean) {
    return groupBy<T, T>(arr, x => x, referenceEquals).map(x => x.key)
}

/**Devuelve todos los elementos de todos los arreglos que no esten repetidos */
export function union<T>(...arr: T[][]) {
    return unique(concat(...arr));
}

/**Pega todos los elementos de los arreglos */
export function concat<T>(...arr: T[][]) {
    return arr.reduce((acum, curr) => [...acum, ...curr], []);
}

/**Filtra el arreglo sólo si condition == true, si es false devuelve el arreglo tal cual */
export function filterIf<T>(arr: T[], predicate: (item: T) => boolean, condition: boolean) {
    return condition ? arr.filter(predicate) : arr;
}

/**Dado un arreglo de keys, para cada key mapea a el elemento que le corresponde.
 * Si existen varios elementos con la misma clave, cuando se encuentre esa clave se devolverá el primer elemento en el arreglo values con esa clave
 * @param keys Claves que se van a mapear
 * @param values Valores en los que se va a buscar para cada clave, el valor que tiene esa clave
 * @param keySelector Obtener la clave de un elemento
 * @param keyComparer Comparador que se usará para determinar si dos claves son iguales. Por default se usa el shallowEquals
 */
export function mapKeys<T, TKey>(keys: TKey[], values: T[], keySelector: (item: T) => TKey, keyComparer?: (a: TKey, b: TKey) => boolean) {
    const effectiveKeyComparer = keyComparer || shallowEquals;
    return keys.map(key => first(values, value => shallowEquals(key, keySelector(value)))!);
}

/**Devuelve todos los elementos en "a" que se encuentren también en "b". Conserva el orden original de "a"
 * @param comparer Comparedor de igualdad. Por default se usa el referenceEquals
 */
export function intersect<T>(a: T[], b: T[], comparer?: (a: T, b: T) => boolean) {
    return intersectKeys(a, b, x => x, comparer || referenceEquals);
}

/**Devuelve todos los elementos en "items" tal que su key se encuentre una o mas veces en "keys". Conserva el orden original de "items".
 * @param keySelector Obtiene la clave de un elemento
 * @param comparer Comparedor de igualdad. Por default se usa el shallowEquals
 */
export function intersectKeys<T, TKey>(items: T[], keys: TKey[], keySelector: (item: T) => TKey, comparer?: (a: TKey, b: TKey) => boolean) {
    return items.filter(item => contains(keys, keySelector(item), comparer || shallowEquals));
}

/**Devuelve un rango de numeros */
export function range(start: number, count: number, step?: number) {
    let ret: number[] = [];
    step = step || 1;
    const end = start + count * step;

    for (let i = start; i < end; i += step) {
        ret.push(i);
    }
    return ret;
}

/**
 * Devuelve un nuevo arreglo con todo el arreglo original mas el elemento al final
 */
export function push<T>(arr: T[], item: T) {
    return [...arr, item];
}

/**
 * Remplaza todos los valores del arreglo que cumplan con cierta condicion
 */
export function replace<T>(arr: T[], condition: (item: T, index: number) => boolean, newValue: T) {
    return arr.map((x, i) => condition(x, i) ? newValue : x);
}

/**Elimina un elemento del arreglo */
export function remove<T>(arr: T[], item: T) {
    return arr.filter(x => x != item);
}

/**
 * Combina varias funciones comparadores que pueden ser usadas para alimentar a la función sort. Se le da prioridad a los primeros comparadores,
 * si un comparador devuelve 0, entonces se evalue el segundo
 * @param comparers 
 */
export function combineComparers<T>(...comparers: ((a: T, b: T) => number)[]): (a: T, b: T) => number {
    return (a: T, b: T) => {
        for (const comp of comparers) {
            const result = comp(a, b);
            if (result != 0) return result;
        }
        return 0;
    };
}

/**Comparador de ordenamiento por default */
export function defaultComparer<T>(a: T, b: T): number {
    if (a === b) {
        return 0;
    } else if (a === null && b === undefined) {
        return 1;
    } else if (a === undefined && b === null) {
        return -1;
    } else
        return a > b ? 1 : a < b ? -1 : 0;
}

export type ComparerFunction<T> = (a: T, b: T) => number;

/**Ordena un arreglo de forma estable, a diferencia de con array.sort el arreglo original no es modificado
 * @param comparers Comparadores de ordenamiento, se le da precedencia al primero. Si no se especifica ninguno se usará el comparador por default
 */
export function sort<T>(arr: T[], ...comparers: (ComparerFunction<T>)[]) {
    comparers = comparers.length == 0 ? [defaultComparer] : comparers;
    type T2 = { value: T, index: number };
    const toEffComparer = (func: ComparerFunction<T>) => (a: T2, b: T2) => func(a.value, b.value);
    //Comparamos tambien por indice
    const effComparers: ComparerFunction<T2>[] = [
        ...comparers.map(toEffComparer),
        (a, b) => a.index - b.index
    ];
    const effectiveComparer = combineComparers(...effComparers);

    const copy = arr.map((x, i) => ({ value: x, index: i }));
    copy.sort(effectiveComparer);

    const ret = copy.map(x => x.value);
    return ret;
}

/**
 * Ordena un arreglo de forma estable segun ciertas claves seleccionadas usando el comparador por default
 */
export function orderBy<T>(arr: T[], ...keySelectors: ((x: T) => any)[]) {
    const comparers = keySelectors.map(selector => (a: T, b: T) => +defaultComparer(selector(a), selector(b)));
    return sort(arr, ...comparers);
}

/**Ordena un arreglo de forma estable y descendiente segun ciertas claves seleccionadas usando el comparador por default */
export function orderByDesc<T>(arr: T[], ...keySelectors: ((x: T) => any)[]) {
    const comparers = keySelectors.map(selector => (a: T, b: T) => -defaultComparer(selector(a), selector(b)));
    return sort(arr, ...comparers);
}

/**Convierte un observable de T, de Promise<T> o de Observable<T> a un observable de <T>, efectivamente aplanando un observable anidado en uno desanidado */
export function rxFlatten<T>(observable: rx.Observable<T | PromiseLike<T> | rx.Observable<T>>): rx.Observable<T> {
    const obsOfObs = observable.map(x => toObservable(x));
    return obsOfObs.concatAll();
}

/**Convierte un valor o una promesa a un observable, si el valor ya es un observable lo devuelve tal cual */
export function toObservable<T1>(value: rx.Observable<T1> | null): rx.Observable<T1 | null>
export function toObservable<T1>(value: rx.Observable<T1> | undefined): rx.Observable<T1 | undefined>
export function toObservable<T1, T2 extends null | undefined>(value: rx.Observable<T1> | T2): rx.Observable<T1 | T2>
export function toObservable<T>(value: T | PromiseLike<T> | rx.Observable<T>): rx.Observable<T>
export function toObservable<T>(value: T | PromiseLike<T> | rx.Observable<T>): rx.Observable<T> {
    if (value instanceof rx.Observable) {
        return value;
    } else {
        return rx.Observable.fromPromise(Promise.resolve(value));
    }
}

/**Toma los primeros N elementos del arreglo */
export function take<T>(arr: T[], count: number): T[] {
    let ret: T[] = [];
    for (var i = 0; i < Math.min(arr.length, count); i++) {
        ret.push(arr[i]);
    }
    return ret;
}

/**Obtiene le primer elemento mapeado de un arreglo o undefined */
export function firstMap<T, R>(arr: T[], predicate: (x: T) => boolean, map: (x: T) => R): R | undefined {
    const f = first(arr, predicate);
    return f && map(f);
}

/**Devuelve true si existiran duplicados en caso de editar un elemento de un arreglo
 * @param arr Arreglo
 * @param oldValueRef Valor anterior del arreglo
 * @param newValue Nuevo valor del arreglo
 */
export function duplicatesOnEdit<T, TKey>(arr: T[], oldValue: T, newValue: T, keySelector: (x: T) => TKey) {
    const comparer = (a: T, b: T) => shallowEquals(keySelector(a), keySelector(b));
    let foundOldValue = false;
    for (const item of arr) {
        if (comparer(item, newValue)) {
            if ((comparer(item, oldValue) && !foundOldValue)) {
                foundOldValue = true;
            } else {
                return true;
            }
        }
    }
    return false;
}

/**
 * Devuelve true si existirán duplicados en caso de agregar un elemento a un arreglo que es equivalente a saber
 * si ese elemento esta contenido en el arreglo
 * @param arr 
 * @param newValue 
 * @param comparer  Se usa el shallow equals por default
 */
export function duplicatesOnAdd<T, TKey>(arr: T[], newValue: T, keySelector: (x: T) => TKey) {
    const comparer = (a: T, b: T) => shallowEquals(keySelector(a), keySelector(b));
    return contains(arr, newValue, comparer);
}

/**Devuelve true si x tiene el metodo then, lo que indica que es una promesa */
export function isPromise(x: any): x is PromiseLike<any> {
    return x != null && (typeof (x as PromiseLike<any>).then) == "function";
}

/**Devuelve true si x es un observable */
export function isObservable(x: any): x is rx.Observable<any> {
    return x instanceof rx.Observable;
}

/**Devuelve true si x es un array */
export function isArray(x: any): x is any[] {
    return x instanceof Array;
}

/**Mapea el valor actual y el anterior de un observable */
export function mapPreviousRx<T>(obs: rx.Observable<T>, startWith: T): rx.Observable<{ prev: T, curr: T }> {
    const ret =
        obs
            .map(x => ({ prev: startWith, curr: x }))
            .scan((acc, val) => ({ prev: acc.curr, curr: val.curr }));
    return ret;
}

/**Mapea cada elemento de un arreglo tomando en cuenta el elemento anterior */
export function mapPrevious<T, TR>(items: T[], map: (prev: T, curr: T) => TR, initial: T) {
    let prev = initial;
    let ret: TR[] = [];
    for (const it of items) {
        ret.push(map(prev, it));
        prev = it;
    }
    return ret;
}

/**Calcula un agregado corrido para cada elemento de un arreglo */
export function runningTotal<TIn, TState, TOut>(items: TIn[], seed: TState, reduceState: (state: TState, item: TIn) => TState, map: (state: TState, item: TIn) => TOut) {
    let ret: TOut[] = [];

    let state = seed;
    for (const it of items) {
        const proj = reduceState(state, it);
        state = proj;
        const output = map(state, it);

        ret.push(output);
    }
    return ret;
}

/**Mapea y aplana una colección. Es equivalente a  flatten(items.map(map)) */
export function mapMany<T, TR>(items: T[], map: (x: T) => TR[]): TR[] {
    let result: TR[] = [];
    for (const x of items) {
        const mapResult = map(x);
        result.push(...mapResult);
    }
    return result;
}

/**A una cadena que representa un numero entero, aplica el separador de miles */
function aplicarSepMiles(intpart: string, sep: string = ","): string {
    if (intpart.length < 4)
        return intpart;

    const start = intpart.length % 3;
    let ret = intpart.substr(0, start);
    for (var i = start; i < intpart.length; i += 3) {
        const subpart = intpart.substr(i, 3);
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
export function formatNumber(number: number | null | undefined | string, integer: number = 0, decimals: number = 0, thousep: boolean = false, prefix: string = "") {
    if (number == null) return "";
    number = Number(number);

    const zeroes = "00000000000000000000";
    const sign = number < 0 ? "-" : "";
    const x = Math.abs(number);
    const int = Math.trunc(x);
    const frac = x - int;

    const intText = "" + int;
    const intZeroStr = zeroes + intText;

    const intPartSinSep = intZeroStr.substr(intZeroStr.length - Math.max(integer, intText.length));
    const intPart = thousep ? aplicarSepMiles(intPartSinSep) : intPartSinSep;

    if (decimals == 0)
        return sign + prefix + intPart;

    const fracText = "" + Math.trunc(Math.round(frac * 1000 * Math.pow(10, decimals)) / 1000);
    const fracZeroStr = fracText + zeroes;
    const fracPart = fracZeroStr.substring(0, decimals);

    return sign + prefix + intPart + "." + fracPart;
}

/**Devuelve true si la cadena es null, undefined o string */
export function nullOrEmpty(x: string): x is ("")
/**Devuelve true si la cadena es null, undefined o string */
export function nullOrEmpty(x: null | string): x is (null | "")
/**Devuelve true si la cadena es null, undefined o string */
export function nullOrEmpty(x: undefined | string): x is (undefined | "")
/**Devuelve true si la cadena es null, undefined o string */
export function nullOrEmpty(x: null | undefined | string): x is (null | undefined | "")
export function nullOrEmpty(x: null | undefined | string): x is (null | undefined | "") {
    return x == null || x == "";
}

const monthNames = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
/**Formatea una fecha
 * @param fullDateTime true o false para indicar si mostrar las horas o no. Por default es undefined e implicar que se mostraran las horas si el valor tiene componente de horas, si no, se mostrará sólo la fecha
 */
export function formatDate(x: Date | null | undefined | string, fullDateTime?: boolean) {
    if (x == null) return "";
    x = new Date(x as any);

    const year = formatNumber(x.getFullYear(), 4);
    const month = monthNames[x.getMonth()];
    const day = formatNumber(x.getDate(), 2);

    const hours = formatNumber(x.getHours(), 2);
    const minutes = formatNumber(x.getMinutes(), 2);

    //True si se debe de mostrar hora y fecha, si no, solo la fecha
    const effFull = fullDateTime == null ? (hours != "00" || minutes != "00") : fullDateTime;

    const dateStr = day + "/" + month + "/" + year;
    if (effFull) {
        const hourStr = hours + ":" + minutes;
        return dateStr + " " + hourStr;
    } else {
        return dateStr;
    }
}

/**Formatea una fecha de tal manera que sea compatible con el excel */
export function formatDateExcel(x: Date): string {
    const f = x => formatNumber(x, 2);
    const f4 = x => formatNumber(x, 4);

    return `${f4(x.getFullYear())}-${f(x.getMonth() + 1)}-${f(x.getDate())} ${f(x.getHours())}:${f(x.getMinutes())}:${f(x.getSeconds())}`;
}

/**Devuelve una copia de una función. Respeta las propiedades agregadas a la función */
export function cloneFunction<T extends (...args: any[]) => any>(func: T): T {
    const ret = (...args: any[]): any => func(...args);
    const keys = Object.keys(func);
    for (const key of keys) {
        ret[key] = func[key];
    }

    return ret as T;
}

const bindOrigFuncKey = "_keautils_bindFunction_origFunctions";

/**Aplica un Function.bind respetando las propiedades agregadas a la función. Tambien se almacena la funcion original de tal manera que se puede devolver al estado original */
export function bindFunction<T extends (...args: any[]) => any>(func: T, thisArg?: any, ...argArray: any[]): T {
    const keys = Object.keys(func);
    const ret = func.bind(thisArg, ...argArray);
    for (const key of keys) {
        ret[key] = func[key];
    };

    ret[bindOrigFuncKey] = ret[bindOrigFuncKey] || [];
    ret[bindOrigFuncKey] = [...ret[bindOrigFuncKey], func];

    return ret;
}

/**Deshace un bind aplicado con bindFunction. Un bind aplicado con Function.bind directamente no se puede deshacer. Si al argumento no se le fue aplicado un bind devuelve undefined */
export function unbindFunction<T extends (...args: any[]) => any>(func: T): T | undefined {
    if (!func[bindOrigFuncKey]) {
        return undefined;
    }
    const arr: any[] = func[bindOrigFuncKey];
    return arr[arr.length - 1];
}

/**Devuelve una promesa que se resuelve en cierto tiempo*/
export function delay(ms: number) {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
}

/**Una funcion que siempre lanza una excepción al ser llamada. Sirve para implementar cases exhaustivos, tal como esta descrito en https://stackoverflow.com/questions/39419170/how-do-i-check-that-a-switch-block-is-exhaustive-in-typescript*/
export function assertUnreachable(x: never): never {
    throw new Error("Se llamó a la función assertUnreachable, esto puede indicar un tipo inesperado en una discriminación de tips");
}