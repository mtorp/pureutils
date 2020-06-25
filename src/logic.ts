import { Observable, pipe as pipeRx, combineLatest as combineLatestRx, from as fromRx, isObservable as isObservableRx, ReplaySubject, from } from "rxjs";
import { map as mapRx, concatAll as concatAllRx, scan as scanRx, startWith as startWithRx, filter as filterRx, switchAll } from "rxjs/operators";

import { interopRequireDefault } from "./interop";
import { defer } from "rxjs";
import { syncResolve, splitPromise, isPromiseLike } from "./promise";
import { pipe } from "./pipe";

/**Devuelve true si todos los elementos de un arreglo encajan con el predicado
 * @pred Devuelve la condición por cada elemento, si no se usa devuelve el elemento tal cual, es decir que los elementos deben de ser
 * truthy para pasar
*/
export function all<T>(arr: readonly T[], pred?: (x: T) => boolean): boolean {
    pred = pred || (x => !!x);

    for (const x of arr) {
        if (!pred(x))
            return false;
    }
    return true;
}


/**Devuelve true si todos los elementos de un arreglo son iguales. Si el arreglo esta vacío devuelve true
 * @param comparer El comparador de igualdar, por default es @see referenceEquals
 */
export function allEqual<T>(arr: readonly T[], comparer?: (a: T, b: T) => boolean): boolean {
    if (arr.length == 0) return true;
    const effectiveComparer = comparer || referenceEquals;
    const first = arr[0];
    for (let i = 1; i < arr.length; i++) {
        const it = arr[i];
        if (!effectiveComparer(first, it))
            return false;
    }
    return true;
}



/**Devuelve true si por lo menos un elemento del arreglo encaja con el predicado, o si existe por lo menos un elemento en caso
 * de que el predicado este indefinido
 */
export function any<T>(arr: readonly T[], pred?: (x: T) => boolean): boolean {
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
export function contains<TA, TB>(arr: readonly TA[], value: TB, comparer?: (a: TA, b: TB) => boolean): boolean {
    const effectiveComparer = comparer || referenceEquals;
    return any(arr, x => effectiveComparer(x, value as any));
}

/**Devuelve true si todos los valores en @see values existen en el arreglo @see arr . Si @see values esta vacío devuelve true */
export function containsAll<T>(arr: readonly T[], values: readonly T[], comparer?: (a: T, b: T) => boolean) {
    return all(values, x => contains(arr, x, comparer));
}

/**Devuelve true si existe algun valor en @see values que exista en @see arr . Si @see values esta vacío devuelve false */
export function containsAny<T>(arr: readonly T[], values: readonly T[], comparer?: (a: T, b: T) => boolean) {
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
export function sequenceEquals<T>(a: readonly T[], b: readonly T[], comparer?: (a: T, b: T) => boolean) {
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
export function setEquals<T>(a: readonly T[], b: readonly T[], comparer?: (a: T, b: T) => boolean): boolean {
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
    return primTypeByRef || isPromiseLike(x) || isObservable(x);
}

/**Compara dos objetos propiedad por propiedad */
export function shallowEquals<T>(a: T, b: T, comparer?: (a: T[keyof T], b: T[keyof T]) => boolean): boolean {
    if (typeof (a) == "function" || typeof (b) == "function") {
        //Las funciones se comparan por igualdad estricta:
        return a === b;
    }

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

/**Devuelve true si x es un array o un array like. Note que devuelve true para string. Normalmente es mejor usar la función @see isArray ya que esa si devuelve false para @see string*/
export function isArrayLike(x: any): x is ArrayLike<any> {
    return x != null && x.length !== undefined;
}

const hasIterationProtocol = (variable: any): variable is Iterable<any> => variable !== null && Symbol.iterator in Object(variable);

export function deepEquals<T>(a: T, b: T): boolean {
    const deep = (a, b) => shallowEquals(a, b, deep);
    return deep(a, b);
}

/**Convierte un arreglo a un objeto */
export function toMap<T, TValue>(arr: readonly T[], key: (value: T) => string, value: (value: T) => TValue) {
    const ret: { [index: string]: TValue } = {}
    for (const x of arr)
        ret[key(x)] = value(x);

    return ret;
}


/**Aplana una colección de colecciones */
export function flatten<T>(arr: readonly T[][]) {
    const ret: T[] = [];
    for (const a of arr)
        ret.push(...a);
    return ret;
}


/**Devuelve el primer elemento de un arreglo o indefinido si no se encontro ninguno, opcionalmente
 * filtrado por un predicado
 */
export function first<T>(arr: readonly T[], pred?: (item: T) => boolean): T | undefined {
    for (const a of arr) {
        if (!pred || pred(a))
            return a;
    }
    return undefined;
}

/**
 * Devuelve el unico elemento de un arreglo que cumpla con la condición, si no se encontró ninguo o mas de uno devuelve undefined
 */
export function single<T>(arr: readonly T[], pred?: (item: T) => boolean): T | undefined {
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
export function last<T>(arr: readonly T[]): T | undefined {
    return arr[arr.length - 1];
}

export type Grouping<TKey, TItem> = { key: TKey, items: TItem[] };

/**Agrupa un arreglo por una llave. Se preserva el orden original de los elementos del arreglo, segun los elementos agrupadores que aparezcan primero, tambien
 * el orden adentro del grupo es preservado
 * @param comparer Comparador de la llave por default es un shallowEquals
 */
export function groupBy<T, TKey>(arr: readonly T[], groupBy: (item: T) => TKey, comparer?: (a: TKey, b: TKey) => boolean) {
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
export function arrayToMap<TKey, TValue>(array: { key: TKey, value: TValue }[]): ObjMap<TValue>
/**
 * Convierte un arreglo a un objeto
 * @param array Arreglo de valores
 * @param keySelector Función que obtiene la cadena que se tomada como el "key" de cada elemento
 */
export function arrayToMap<T, TValue>(array: readonly T[], keySelector: (item: T, index: number) => string, valueSelector: (item: T, index: number) => TValue): ObjMap<TValue>
export function arrayToMap<T, TValue>(array: readonly T[], keySelector?: (item: T, index: number) => string, valueSelector?: (item: T, index: number) => TValue): ObjMap<T[keyof T]> {
    const defaultKeySelector = (item: any) => item.key;
    const defaultValueSelector = (item: any) => item.value;

    const effectiveKeySelector = keySelector || defaultKeySelector;
    const effectiveValueSelector = valueSelector || defaultValueSelector;
    const ret = {};
    for (let i = 0; i < array.length; i++) {
        const a = array[i];
        const key = effectiveKeySelector(a, i);
        const value = effectiveValueSelector(a, i);
        ret[key] = value;
    }
    return ret;
}


/**Obtiene los valores numericos de un enum */
export function enumKeys<T>(e: T): T[keyof T][] {
    return Object.keys(e).map(x => e[x]).filter(x => typeof (x) == "number") as any;
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

/**Devuelve un objeto son solo ciertas propiedades del objeto incluidas. Si se escoge una propiedad que no existe en el objeto esta no estará incluida en el objeto devuelto */
export function pick<T extends {}, Keys extends keyof T>(obj: T, ...props: Keys[]): { [K in Keys]: T[K] } {
    let ret: Partial<T> = {};
    for (const key of props) {
        if (key in obj) {
            ret[key] = obj[key];
        }
    }
    return ret as any;
}

/**Intercambia 2 elementos de un arreglo, si los indices dados estan afuera del arreglo, lanza una excepción */
export function swapItems<T>(array: readonly T[], a: number, b: number) {
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
export function moveItem<T>(array: readonly T[], sourceIndex: number, destIndex: number) {
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
export function upDownItem<T>(array: readonly T[], index: number, direction: "up" | "down") {
    if ((index == 0 && direction == "up") || (index == array.length - 1 && direction == "down")) {
        return array;
    } else {
        return moveItem(array, index, index + (direction == "up" ? -1 : +1));
    }
}

export type Promisify<T> = { [K in keyof T]: PromiseLike<T[K]> };

/**Aplica una función Promise.all a un objeto,  */
export function promiseAllObj<T>(obj: Promisify<T>): Promise<T>
export function promiseAllObj(obj: any) {
    const keys = Object.keys(obj);
    const values = keys.map(key => obj[key]);
    const all = Promise.all(values);
    const ret = all.then(arr => arr.map((value, index) => ({ key: keys[index], value: value }))).then(x => arrayToMap(x));
    return ret;
}

export type ObservableMap = {
    [K in string]: Observable<any>
};

export type ObservableMapToSyncMap<T> = {
    [K in keyof T]: T[K] extends Observable<infer R> ? R : never;
}

export type PromiseMapToSyncMap<T> = {
    [K in keyof T]: T[K] extends PromiseLike<infer R> ? R : never;
}

/**Convierte un objeto de observables a un observable de objetos, el primer elemento del observable resultante se da cuando todos los observables del objeto lanzan el primer valor.
 * Es muy similar al @see combineLatest pero en lugar de funcionar con un arreglo funciona con un objeto
 */
export function objRxToRxObj<T extends ObservableMap>(obj: T): Observable<ObservableMapToSyncMap<T>> {
    const keys = Object.keys(obj) as (keyof T)[];

    interface KeyValue {
        value: any;
        key: keyof T
    };

    const values = keys.map(key =>
        obj[key].pipe(
            mapRx(x => ({
                value: x,
                key: key
            }))
        )
    );



    const combine = combineLatestRx(values).pipe(mapRx(x => arrayToMap(x)));
    return combine as Observable<any>;
}


/**Convierte una promesa de un objeto a un objeto de promesas
 * @param include Nombres de las propiedades que se desean incluir en el objeto resultante
 */
export function awaitObj<T, TKeys extends keyof T>(obj: PromiseLike<T>, include: { [K in TKeys]: true }): Promisify<Pick<T, TKeys>> {
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
export function unique<T>(arr: readonly T[], comparer?: (a: T, b: T) => boolean) {
    return groupBy<T, T>(arr, x => x, comparer ?? referenceEquals).map(x => x.key)
}

/**Devuelve todos los elementos de todos los arreglos que no esten repetidos.
 * Conserva el orden pero no los elementos repetidos
 */
export function union<T>(...arr: readonly T[][]) {
    return unique(concat(...arr));
}

/**
 * Devuelve todos los elementos en @param a que no estén en @param b, y 
 * todos los elementos en @param b que no estén en @param a. 
 * Es equivalente a la operación XOR / diferencia simétrica de conjuntos
 */
export function xor<T>(a: T[], b: T[]) {
    return union(exclude(a, b), exclude(b, a));
}

/**
 * Devuelve todos los elementos en A que su llave no se encuentre en B las llaves de B y todos los elementos en B, en ese orden
 * esto equivale a unir los conjuntos A+B, pero dandole prioridad a los elementos en B si es que esa llave se encuentra en los dos conjuntos.
 * Esto se puede ver como una operacion de INSERT OR UPDATE en A
 * @param comparer Comparador de la llave. Es @see deepEquals por default
 */
export function unionKey<TA, TB, K>(a: readonly TA[], b: readonly TB[], getKey: (item: TA | TB) => K, comparer?: (a: K, b: K) => boolean): (TA | TB)[] {
    const effComparer = comparer || deepEquals;
    let result: (TA | TB)[] = [];

    //Obtiene todas las claves en B
    const bKeys = b.map(getKey);

    //Todos los elementos en A que no esten en B
    for (const aItem of a) {
        const aKey = getKey(aItem);
        if (!contains(bKeys, aKey, effComparer)) {
            result.push(aItem);
        }
    }

    //Todos los elementos en B
    result.push(...b);
    return result;
}

/**Devuelve todos los elementos en A que no esten en B. Es la operacion A-B de conjuntos. Conserva el orden y los elementos repetidos de A */
export function exclude<TA, TB>(a: readonly TA[], b: readonly TB[], comparer?: (a: TA, b: TB) => boolean) {
    const comparerEff = comparer && ((b: TB, a: TA) => comparer(a, b));
    return a.filter(aItem => !contains(b, aItem, comparerEff));
}

/**Devuelve todos los elementos en "items" tal que su key no se encuentre una o mas veces en "keys". Conserva el orden original de "items".
 * @param keySelector Obtiene la clave de un elemento
 * @param comparer Comparedor de igualdad. Por default se usa el shallowEquals
 */
export function excludeKeys<T, TKey>(items: readonly T[], keys: readonly TKey[], keySelector: (item: T) => TKey, comparer?: (a: TKey, b: TKey) => boolean) {
    const comparerEff = comparer || shallowEquals;
    return exclude(items, keys, (a, b) => comparerEff(keySelector(a), b));
}

/**Pega todos los elementos de los arreglos */
export function concat<T>(...arr: readonly T[][]) {
    return arr.reduce((acum, curr) => [...acum, ...curr], []);
}

/**Filtra el arreglo sólo si condition == true, si es false devuelve el arreglo tal cual */
export function filterIf<T>(arr: readonly T[], predicate: (item: T) => boolean, condition: boolean) {
    return condition ? arr.filter(predicate) : arr;
}

/**Dado un arreglo de keys, para cada key mapea a el elemento que le corresponde.
 * Si existen varios elementos con la misma clave, cuando se encuentre esa clave se devolverá el primer elemento en el arreglo values con esa clave
 * @param keys Claves que se van a mapear
 * @param values Valores en los que se va a buscar para cada clave, el valor que tiene esa clave
 * @param keySelector Obtener la clave de un elemento
 * @param keyComparer Comparador que se usará para determinar si dos claves son iguales. Por default se usa el shallowEquals
 */
export function mapKeys<T, TKey>(keys: readonly TKey[], values: readonly T[], keySelector: (item: T) => TKey, keyComparer?: (a: TKey, b: TKey) => boolean) {
    const effectiveKeyComparer = keyComparer || shallowEquals;
    return keys.map(key => first(values, value => shallowEquals(key, keySelector(value)))!);
}

/**Devuelve todos los elementos en "a" que se encuentren también en "b". Conserva el orden original de "a"
 * @param comparer Comparedor de igualdad. Por default se usa el referenceEquals
 */
export function intersect<T>(a: readonly T[], b: readonly T[], comparer?: (a: T, b: T) => boolean) {
    return intersectKeys(a, b, x => x, comparer || referenceEquals);
}

/**Mapea cada una de las propiedades en A que encajen en B y viceversa */
export function mergeObj<TA, TB, TR>(
    a: TA,
    b: TB,
    merge: <TKey extends keyof (TA & TB) >(a: (TA[keyof TA] | undefined), b: (TB[keyof TB] | undefined), key: TKey) => TR):
    { [K in keyof (TA & TB)]: TR } {
    const keys = union(Object.keys(a), Object.keys(b));
    const values = keys.map(key => ({
        key: key,
        value: merge(a[key], b[key], key as any)
    }));

    return arrayToMap(values) as any;
}

/**Devuelve true si SET contiene todos los elementos en SUBSET. Si los conjuntos son iguales devuelve true.
 * Si los dos arreglos estan vacios devuelve true
 */
export function isSubset<T>(set: readonly T[], subset: readonly T[], comparer?: (a: T, b: T) => boolean): boolean {
    //Si por lo menos un elemento en subset no existe en set, ya no es un subset
    return !any(subset, x => !contains(set, x));
}

/**Devuelve todos los elementos en "items" tal que su key se encuentre una o mas veces en "keys". Conserva el orden original de "items".
 * @param keySelector Obtiene la clave de un elemento
 * @param comparer Comparedor de igualdad. Por default se usa el shallowEquals
 */
export function intersectKeys<T, TKey>(items: readonly T[], keys: readonly TKey[], keySelector: (item: T) => TKey, comparer?: (a: TKey, b: TKey) => boolean) {
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
export function push<T>(arr: readonly T[], item: T) {
    return [...arr, item];
}

/**
 * Remplaza todos los valores del arreglo que cumplan con cierta condicion
 */
export function replace<T>(arr: readonly T[], condition: (item: T, index: number) => boolean, newValue: T) {
    return arr.map((x, i) => condition(x, i) ? newValue : x);
}

/**Elimina un elemento del arreglo */
export function remove<T>(arr: readonly T[], item: T) {
    return arr.filter(x => x != item);
}

/**Elimina un elemento del arreglo dado su indice */
export function removeAt<T>(arr: readonly T[], index: number) {
    return arr.filter((x, i) => i != index);
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

/**Comparador de ordenamiento por default. Si a es mayor que b devuelve 1, si es menor -1  */
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
export function sort<T>(arr: readonly T[], ...comparers: (ComparerFunction<T>)[]) {
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
export function orderBy<T>(arr: readonly T[], ...keySelectors: ((x: T) => any)[]) {
    const comparers = keySelectors.map(selector => (a: T, b: T) => +defaultComparer(selector(a), selector(b)));
    return sort(arr, ...comparers);
}

/**Ordena un arreglo de forma estable y descendiente segun ciertas claves seleccionadas usando el comparador por default */
export function orderByDesc<T>(arr: readonly T[], ...keySelectors: ((x: T) => any)[]) {
    const comparers = keySelectors.map(selector => (a: T, b: T) => -defaultComparer(selector(a), selector(b)));
    return sort(arr, ...comparers);
}

function keysToComparer<T>(keySelectors: ((x: T) => any)[]): ComparerFunction<T> {
    const comparers =
        (keySelectors.length == 0) ? [defaultComparer] :
            (keySelectors.map(selector => (a: T, b: T) => +defaultComparer(selector(a), selector(b))));
    return combineComparers(...comparers);
}

/**Obtiene el máximo de un arreglo dado un selector de llave */
export function max<T>(arr: readonly T[], ...keySelectors: ((x: T) => any)[]) {
    const comp = keysToComparer(keySelectors);
    return maxComparer(arr, comp);
}

/**Obtiene el mínimo de un arreglo dado un selector de llave */
export function min<T>(arr: readonly T[], ...keySelectors: ((x: T) => any)[]) {
    const comp = keysToComparer(keySelectors);
    const inv = (a: T, b: T) => -comp(a, b);
    return maxComparer(arr, inv);
}

/**Devuelve el valor máximo de un arreglo dado un comparador o undefined si el arreglo está vacío */
function maxComparer<T>(arr: readonly T[], comparer: ComparerFunction<T>): T | undefined {
    let first = true;
    let max: T | undefined = undefined;

    for (const x of arr) {
        if (first || (comparer(x, max!) > 0)) {
            max = x;
            first = false;
        }
    }
    return max;
}

/**Convierte un observable de T, de Promise<T> o de Observable<T> a un observable de <T>, efectivamente aplanando un observable anidado en uno desanidado */
export function rxFlatten<T>(observable: Observable<T | PromiseLike<T> | Observable<T>>): Observable<T> {
    const obsOfObs = observable.pipe(mapRx(x => toObservable(x)));
    return obsOfObs.pipe(concatAllRx());
}

/**Convierte un valor o una promesa a una promesa. No devuelve Promise ya que si el valor es síncrono devuelve un PromiseLike que se resuelve inmediatamente
 * (el tipo Promise no se resuelve de inmediato)
 */
export function valToPromise<T>(value: T | PromiseLike<T>): PromiseLike<T> {
    if (isPromiseLike(value))
        return value;

    return syncResolve(value);
}

/**Convierte una promesa a observable, si la promesa se resuelve las siguientes subscripciones obtienen el valor de la promesa de forma síncorna */
export function promiseToObservable<T>(prom: PromiseLike<T>): Observable<T> {
    const sub = new ReplaySubject<T>(1);
    prom.then(x => {
        sub.next(x);
        sub.complete();
    }, err => sub.error(err));

    return sub;
}


/**Convierte una función que devuelve una promesa a un observable,
 * la función es llamada sólamente una vez en la primera subscripción del observable, subsecuentes subscripciones al observable no resultan en nuevas
 * llamadas al thunk.
 * 
 * Una vez que el thunk se reseulve su valor se almacena y subscripciones posteriores devuelven inmedatamente el valor y se completan.
 * 
 * @param thunk Función que se va a llamar sólo una vez, en la primera subscripción.
 */
export function asyncThunkToObservable<T>(thunk: () => PromiseLike<T>): Observable<T> {
    const sub = new ReplaySubject<T>(1);

    /**Si es la primera subscripción */
    let first = true;

    return new Observable(observer => {
        if (first) {
            //Llama al thunk sólo en la primera subscripción
            thunk().then(x => {
                sub.next(x);
                sub.complete();
            }, err => sub.error(err));

            first = false;
        }

        return sub.subscribe(observer);
    });
}

/**Convierte un valor o una promesa a un observable, si el valor ya es un observable lo devuelve tal cual */
export function toObservable<T>(value: T | PromiseLike<T> | Observable<T>): Observable<T> {
    if (value instanceof Observable) {
        return value;
    } else if (isPromiseLike(value)) {
        return promiseToObservable(value);
    }

    return from([value]);
}

/**Toma los primeros N elementos del arreglo */
export function take<T>(arr: readonly T[], count: number): T[] {
    let ret: T[] = [];
    for (var i = 0; i < Math.min(arr.length, count); i++) {
        ret.push(arr[i]);
    }
    return ret;
}

/**Se salta los primeros N elementos del arreglo */
export function skip<T>(arr: readonly T[], count: number): T[] {
    let ret: T[] = [];
    for (var i = count; i < arr.length; i++) {
        ret.push(arr[i]);
    }
    return ret;
}

/**Obtiene le primer elemento mapeado de un arreglo o undefined */
export function firstMap<T, R>(arr: readonly T[], predicate: (x: T, index: number) => boolean, map: (x: T, i: number) => R): R | undefined {
    for (let i = 0; i < arr.length; i++) {
        const x = arr[i];
        if (predicate(x, i)) {
            return map(x, i);
        }
    }
    return undefined;
}

/**Devuelve true si existiran duplicados en caso de editar un elemento de un arreglo
 * @param arr Arreglo
 * @param oldValueRef Valor anterior del arreglo
 * @param newValue Nuevo valor del arreglo
 */
export function duplicatesOnEdit<T, TKey>(arr: readonly T[], oldValue: T, newValue: T, keySelector: (x: T) => TKey) {
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
export function duplicatesOnAdd<T, TKey>(arr: readonly T[], newValue: T, keySelector: (x: T) => TKey) {
    const comparer = (a: T, b: T) => shallowEquals(keySelector(a), keySelector(b));
    return contains(arr, newValue, comparer);
}


/**Devuelve true si x es un observable */
export function isObservable(x: any): x is Observable<any> {
    return isObservableRx(x);
}

/**Devuelve true si x es un array */
export function isArray(x: any): x is any[] {
    return x instanceof Array;
}

/**Mapea el valor actual y el anterior de un observable */
export function mapPreviousRx<T>(obs: Observable<T>, startWith: T): Observable<{ prev: T, curr: T }> {
    const ret =
        obs.pipe(
            mapRx(x => ({ prev: startWith, curr: x })),
            scanRx((acc, val) => ({ prev: acc.curr, curr: val.curr }))
        );
    return ret;
}

/**Mapea cada elemento de un arreglo tomando en cuenta el elemento anterior */
export function mapPrevious<T, TR>(items: readonly T[], map: (prev: T, curr: T) => TR, initial: T) {
    let prev = initial;
    let ret: TR[] = [];
    for (const it of items) {
        ret.push(map(prev, it));
        prev = it;
    }
    return ret;
}

/**Calcula un agregado corrido para cada elemento de un arreglo */
export function runningTotal<TIn, TState, TOut>(items: readonly TIn[], seed: TState, reduceState: (state: TState, item: TIn) => TState, map: (state: TState, item: TIn) => TOut) {
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
export function mapMany<T, TR>(items: readonly T[], map: (x: T) => TR[]): TR[] {
    let result: TR[] = [];
    for (const x of items) {
        const mapResult = map(x);
        result.push(...mapResult);
    }
    return result;
}


/**Convierte un objeto de arreglos a un arreglo de objetos, si el objeto de arreglos esta vacio, devuelve un arreglo vacio
 * @param length 
 *  undefined = Todos los arreglos deben de tener la misma longitud
 *  min = La longitud de retorno será la minima
 *  max = La longitud de retorno será la máxima, pueden haber elementos indefinidos
*/
export function zip<TData>(data: { [K in keyof TData]: TData[K][] }, length?: "min"  ): TData[]
export function zip<TData>(data: { [K in keyof TData]: TData[K][] }, length: "max" ): Partial<TData>[]
export function zip<TData>(data: { [K in keyof TData]: TData[K][] }, length?: "min" | "max"): Partial<TData>[] {
    //Checa que todo los arreglos tengan la misma longitud
    const lengths = enumObject(data).map(x => x.value.length);

    if (length == null && !allEqual(lengths)) {
        throw new Error("Todos los arreglos deben de tener la misma longitud");
    }

    if (lengths.length == 0) return [];

    const count =
        length == null ? lengths[0] :
            length == "min" ? Math.min(...lengths) :
                Math.max(...lengths);

    const ret: TData[] = [];
    for (let i = 0; i < count; i++) {
        const fila = mapObject(data, (value, key) => (value as any[])[i]);
        ret.push(fila);
    }
    return ret;
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

/**Formatea una moneda con 2 decimales y separador de miles
 */
export function formatCurrency(number: number | null | undefined | string) {
    return formatNumber(number, 0, 2, true, "$");
}

/**
 * Formatea un número
 * @param number El numero
 * @param integer Cantidad de zeros a la izquierda en la parte entera
 * @param decimals Cantidad de zeros a la derecha en la parte desimal
 * @param thousep Usar separador de miles. Por default es false
 * @param prefix Prefijo del numero, ejemplo $ o %. Por default es ""
 * @param sign True para mostrar signo + si el valor > 0, si no, sólo se muestra si valor < 0
 */
export function formatNumber(
    number: number | null | undefined | string,
    integer: number = 0,
    decimals: number = 0,
    thousep: boolean = false,
    prefix: string = "",
    sign: boolean = false,
) {
    if (number == null) return "";
    number = Number(number);

    const zeroes = "00000000000000000000";
    const numSign =
        number < 0 ? "-" :
            (number > 0 && sign) ? "+" : "";
    const x = Math.abs(number);
    const int = Math.trunc(x);
    const frac = x - int;

    const intText = "" + int;
    const intZeroStr = zeroes + intText;

    const intPartSinSep = intZeroStr.substr(intZeroStr.length - Math.max(integer, intText.length));
    const intPart = thousep ? aplicarSepMiles(intPartSinSep) : intPartSinSep;

    if (decimals == 0)
        return numSign + prefix + intPart;

    const fracText = "" + Math.trunc(Math.round(frac * 1000 * Math.pow(10, decimals)) / 1000);
    const leftFracZeroes = zeroes.substr(0, decimals - fracText.length);
    const fracZeroStr = leftFracZeroes + fracText + zeroes;
    const fracPart = fracZeroStr.substring(0, decimals);

    return numSign + prefix + intPart + "." + fracPart;
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

/**Convierte una representación de una fecha a una fecha */
export function toDate(value: Date | string | number): Date
/**Convierte una representación de una fecha a una fecha */
export function toDate<TNull extends null | undefined>(value: Date | string | TNull | number): Date | TNull
export function toDate<TNull extends null | undefined>(value: Date | string | TNull | number): Date | TNull {
    if (value == null) {
        return value as TNull;
    }
    if (typeof value == "string" || typeof (value) == "number") return new Date(value);
    return value;
}

/**Convierte una fecha al formato ISO 8601 respetando la zona horaria */
export function toIsoDate(x: Date): string {
    const year = formatNumber(x.getFullYear(), 4);
    const month = formatNumber(x.getMonth() + 1, 2);
    const day = formatNumber(x.getDate(), 2);

    const hours = formatNumber(x.getHours(), 2);
    const minutes = formatNumber(x.getMinutes(), 2);
    const seconds = formatNumber(x.getSeconds(), 2);

    const offsetMinVal = -x.getTimezoneOffset();
    const offsetHours = formatNumber(Math.abs(offsetMinVal / 60), 2);
    const offsetMin = formatNumber(Math.abs(offsetMinVal) % 60, 2);
    const offsetSign = offsetMinVal < 0 ? "-" : "+";
    const offset = offsetSign + offsetHours + ":" + offsetMin;
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offset}`;
}

/**Formatea una fecha de tal manera que sea compatible con el excel */
export function formatDateExcel(x: Date): string {
    const f = x => formatNumber(x, 2);
    const f4 = x => formatNumber(x, 4);

    return `${f4(x.getFullYear())}-${f(x.getMonth() + 1)}-${f(x.getDate())} ${f(x.getHours())}:${f(x.getMinutes())}:${f(x.getSeconds())}`;
}

/**Devuelve una promesa que se resuelve en cierto tiempo. Note que si ms == 0 la promesa devuelta no se resuelve síncronamente, ya que un setTimeout(..., 0) no es síncrono*/
export function delay(ms: number): PromiseLike<void> {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
}

/**Una funcion que siempre lanza una excepción al ser llamada. Sirve para implementar cases exhaustivos, tal como esta descrito en https://stackoverflow.com/questions/39419170/how-do-i-check-that-a-switch-block-is-exhaustive-in-typescript*/
export function assertUnreachable(x: never): never {
    throw new Error("Se llamó a la función assertUnreachable, esto puede indicar un tipo inesperado en una discriminación de tips");
}

/**Devuelve el indice de la primera aparición de un elemento que cumpla con @see pred */
export function indexOf<T>(arr: ArrayLike<T>, pred: (x: T) => boolean, startIndex: number = 0): number | null {
    for (let i = startIndex; i < arr.length; i++) {
        if (pred(arr[i])) {
            return i;
        }
    }
    return null;
}

/**Devuelve los indices de todas las apariciones de los items que cumplan con @see pred */
export function indicesOf<T>(arr: ArrayLike<T>, pred: (x: T) => boolean, startIndex: number = 0): number[] {
    let ret: number[] = [];
    for (let i = startIndex; i < arr.length; i++) {
        if (pred(arr[i])) {
            ret.push(i);
        }
    }
    return ret;
}

/**Realiza una busqueda binaria en un arreglo, devuelve el indice del elemento mas cercano y si fue encontrado o no el elemento.
 * En caso de que no encaje devuelve el indice del ultimo elemento que es menor que el valor de busqueda. Si ningun elemento del arreglo es menor al valor de busqueda devuelve -1.
 */
export function binarySearch<T, TKey>(arr: readonly T[], keySelector: (x: T) => TKey, value: TKey, comparer?: (a: TKey, b: TKey) => number): { index: number, match: boolean } {
    const effComparer = comparer || defaultComparer;
    let minIndex = 0;
    let maxIndex = arr.length - 1;
    let currentIndex: number = 0;
    let currentElement;

    while (minIndex <= maxIndex) {
        currentIndex = (minIndex + maxIndex) / 2 | 0;
        currentElement = keySelector(arr[currentIndex]);

        const comp = effComparer(currentElement, value);
        if (comp < 0) {
            minIndex = currentIndex + 1;
        }
        else if (comp > 0) {
            maxIndex = currentIndex - 1;
        }
        else {
            return { index: currentIndex, match: true };
        }
    }

    return { index: minIndex - 1, match: false };
}

/**
 * Para todos los pares de elemento en left y right que cumplen con el where, devuelve ese par de elementos
 * Se respeta el orden del arreglo @see left
 * Este algoritmo corre con complejidad O^2 o NM donde N es la cantidad de elementos en left y M la cantidad de elementos en right
 * @param left Arreglo izquierdo
 * @param right Arreglo derecho
 * @param where Condicion para filtrar el producto cartesiano
 */
export function innerJoin<TA, TB>(left: readonly TA[], right: readonly TB[], where: (left: TA, right: TB) => boolean): { left: TA, right: TB }[] {
    let ret: { left: TA, right: TB }[] = [];
    for (const l of left) {
        for (const r of right) {
            if (where(l, r)) {
                ret.push({ left: l, right: r });
            }
        }
    }
    return ret;
}

/**
 * Para todos los elementos en left y right que cumplen con el where, devuelve ese par de elementos. Si para
 * cierto elemento en left ningun par de elementos (left, right) cumple con la condicion, devuelve un par solo con el valor (left) asignado y el
 * (right) en undefined. Esto hace que todos los elementos en left sean incluidos en el resultado final incondicionalmente por lo menos una vez * Este algoritmo corre con complejidad O^2 o NM donde N es la cantidad de elementos en left y M la cantidad de elementos en right
 * @param left Arreglo izquierdo
 * @param right Arreglo derecho
 * @param where Condicion para filtrar el producto cartesiano
 */
export function leftJoin<TA, TB>(left: readonly TA[], right: readonly TB[], where: (left: TA, right: TB) => boolean): { left: TA, right?: TB }[] {
    let ret: { left: TA, right?: TB }[] = [];
    for (const l of left) {
        let anyRight: boolean = false;
        for (const r of right) {
            if (where(l, r)) {
                anyRight = true;
                ret.push({ left: l, right: r });
            }
        }
        if (!anyRight) {
            ret.push({ left: l });
        }
    }
    return ret;
}

/**Combina dos rutas. Combina correctamente las rutas con ./ y ../
 * @param ruta base
 * @param path Ruta actual
 * @param pathChar Caracter que divide a la ruta
 * @param prefix True para iniciar la ruta con el caracter de ruta, false para no iniciar, indefinido para dejarlo tal cual. Por default is true
 * @param postfix True para terminar la ruta con el caracter de ruta, false para quitarlo, indefinido para dejarlo tal cual
 */
export function combinePath(basePath: string, path: string, pathChar: string = "/", prefix: boolean | undefined = true, postfix: boolean | undefined = false) {
    function trim(s: string) {
        const start = s.startsWith(pathChar) ? 1 : 0;
        const end = s.endsWith(pathChar) ? (s.length - 1) : s.length;
        return s.substr(start, end - start);
    }

    const basePathTrim = trim(basePath);
    const pathTrim = trim(path);

    const basePathParts = basePathTrim.split(pathChar);
    const pathParts = pathTrim.split(pathChar);

    const relative = pathParts.length > 0 && pathParts[0].startsWith(".");

    let current = relative ? basePathTrim : pathTrim;
    let firstTextPart = false;
    if (relative) {
        for (const part of pathParts) {
            if (part == "." || part == "..") {
                if (firstTextPart) throw new Error("La ruta no puede contener partes con . o .. despues de una parte de texto");
            }
            if (part == ".") {
                //No hay que hacer nada
            } else if (part == "..") {
                const currentParts = current.split("/");
                current = currentParts.slice(0, currentParts.length - 1).join(pathChar)
            } else {
                firstTextPart = true;
                current += current == "" ? part : (pathChar + part);
            }
        }
    }

    const originalStartPathChar = (relative ? basePath : path).startsWith(pathChar);
    const originalEndsWithPathChar = path.endsWith(pathChar);

    //Asignar el prefijo y postfijo
    if (prefix == true || (prefix === undefined && originalStartPathChar)) {
        current = pathChar + current;
    }
    if (postfix == true || (postfix === undefined && originalEndsWithPathChar)) {
        current = current + pathChar;
    }
    return current;
}

/**Suma un arreglo de numeros. Si el arreglo esta vacío devuelve 0.
 * Los valores nulos o indefinidos son ignorados en la suma
 */
export function sum(arr: (number | null | undefined)[]): number {
    return arr.filter(x => x != null).map(x => x!).reduce((a, b) => a + b, 0);
}

/**Convierte un observable a una promesa que se resuelve en el siguiente onNext del observable, esto es diferente a la función
 * @see Observable.toPromise() que se resueve hasta que el observable es completado
*/
export function nextToPromise<T>(obs: Observable<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => obs.subscribe(resolve, reject));
}



/**Tipo de un extremo del rango */
export type RangeEndType = "in" | "ex";
/**Un extremo de un rango de numeros */
export interface RangeType {
    value: number | string | Date;
    type: RangeEndType;
}
/**Un rango de numeros */
export interface RangeOptional {
    /**Minimo del rango */
    min?: RangeType,
    /**Máximo del rango */
    max?: RangeType
}

export type RangeCheckResult = "min" | "max";
/**Determina si un numero esta afuera del rango, y devuelve de que parte del rango esta afuera */
export function outOfRange(value: number, range: RangeOptional): RangeCheckResult | null {
    if (range.min && ((range.min.type == "in" && value < range.min.value) || (range.min.type == "ex" && value <= range.min.value)))
        return "min";
    else if (range.max && ((range.max.type == "in" && value > range.max.value) || (range.max.type == "ex" && value >= range.max.value)))
        return "max";
    return null;
}

/**Barajea un arreglo */
export function shuffle<T>(arr: readonly T[]): T[] {
    function shuffleInPlace(a) {
        let j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
    }
    const ret = [...arr];
    shuffleInPlace(ret);

    return ret;
}

/**
 * Aplica una función a cada propiedad de un objeto, conservando los keys
 * @param obj Objeto a mapear
 * @param map Función que toma el valor y el "key" y devuelve el nuevo valor
 */
export function mapObject<T, TOut>(obj: T, map: <K extends keyof T>(value: T[K], key: K) => TOut): ({ [K in keyof T]: TOut }) {
    const ret = {};
    for (const key in obj) {
        const value = obj[key];
        ret[key as string] = map(value, key);
    }
    return ret as { [K in keyof T]: TOut };
}

/**Ejecuta un OR sobre un conjunto de valores ya sea síncronos o asíncronos, si los primeros valores son síncronos devuelve inmediatamente ese resultado sin esperar a los otros observables */
export function orRx<T>(...arg: (T | Observable<T>)[]): T | Observable<T> {
    //Busca los valores síncronos:
    for (const x of arg) {
        if (isPromiseLike(x) || isObservable(x))
            break;
        else if (x)
            return x;
    }

    const unknown = {};
    type Unknown = typeof unknown;
    const or = (a: T | Unknown, b: T | Unknown) => {
        if (a && a != unknown) return a;
        return b;
    };

    const orArr = (arr: (T | Unknown)[]) => arr.reduce((prev, curr) => or(prev, curr));

    const allObs = arg.map(x => isObservable(x) ? x : fromRx([x]));
    const obsUnk = allObs.map(x => x.pipe(
        startWithRx(unknown),
        mapRx(x => x as (T | Unknown))
    ));

    const combine = combineLatestRx(...obsUnk).pipe(mapRx(orArr));
    return combine.pipe(
        filterRx(x => x != unknown),
        mapRx(x => x as T)
    );
}

/**Recorre una estructura de arbol y la devuelve en forma de arreglo */
export function treeTraversal<T>(tree: readonly T[], getNodes: (x: T) => T[]): T[] {
    if (tree.length == 0) return [];

    const nodes = mapMany(tree, getNodes);
    const child = treeTraversal(nodes, getNodes);

    return [...tree, ...child];
}


/**Convierte una función para obtener un valor y otra que notifica el cambio del valor en un observable
 * @param getValue Función que obtiene el valor actual
 * @param listen Una función que se suscribe a los cambios del valor, toma como parámetro una función que se va a llamar cada vez que el valor que cambie y devuelve
 * una función que al ser llamada se desuscribe de la escucha de los cambios del valor
 */
export function getListenToRx<T>(getValue: () => T, listen: (onChange: () => void) => (() => void)): Observable<T> {
    return new Observable(subscriber => {
        const dispose = listen(() => subscriber.next(getValue()));
        subscriber.next(getValue());
        return dispose;
    })
}

/**Un store de redux */
export interface ReduxStore<TState> {
    subscribe: (onChange: () => void) => (() => void);
    getState: () => TState;
}

/**Convierte un store de redux en un observable, el observable emite el valor actual en la subscripción y los siguientes valores son emitidos
 * cuando el store indica que ha cambiado su valor
 */
export function reduxStoreToRx<TState>(store: ReduxStore<TState>): Observable<TState> {
    return getListenToRx(() => store.getState(), x => store.subscribe(x));
}

/** Example
import {from} from 'rxjs/observable/from';
from([1, 2, 3])
    .pipe(doOnSubscribe(() => console.log('subscribed to stream')))
    .subscribe(x => console.log(x), null, () => console.log('completed'));
*/
export function doOnSubscribe<T>(onSubscribe: () => void): (source: Observable<T>) => Observable<T> {
    return function inner(source: Observable<T>): Observable<T> {
        return defer(() => {
            onSubscribe();

            return source;
        });
    };
}

/**Convierte una observable a una promesa, donde la promesa tiene el ultimo valor devuelto por el observable y se resuelve una vez que el observable es completado.
 * La diferencia entre este y el rxjs.toPromise es que si el observable se resuelve de manera sincrona la promesa devuelta también se resuelve de forma síncrona,
 * ya que el resultado de rxjs.toPromise es siempre una promesa asíncrona
 */
export function obsToPromise<T>(obs: Observable<T>): PromiseLike<T> {

    type Result = {
        value?: T,
        err?: any,
    };
    let curr: Result | undefined = undefined;
    let complete: boolean = false;

    const ret = splitPromise<T>();

    obs.subscribe(x => {
        curr = { value: x };
    }, err => {
        curr = { err: err };
        ret.reject(err);
    }, () => {
        complete = true
        ret.resolve(curr!.value!);
    });

    if (complete) {
        //Se completó síncronamente
        return syncResolve(curr!.value!);
    } else {
        return ret.promise;
    }
}
/**Determina si un numero es equivalente a cierta cadena formateada de otro numer0o */
function numberEqStr(num: number, str: string) {



    //Checa cuantos decimales tiene:
    const split = str.split(",");
    if (split.length < 1 || split.length > 2)
        return false; //no es un numero

    const intPartStr = split[0];
    const fracPartStr = split[1] ?? "";

    formatNumber(num, 0)
}

/**Quita todas las apariciones de @param patt a la izquierda de string */
export function trimLeft(str: string, patt: string) {
    while (str.startsWith(patt)) {
        str = str.substr(patt.length);
    }
    return str;
}

function floatEqFloat(a: number, b: number, epsilon: number) {
    return Math.abs(a - b) < epsilon;
}

/**Remplaza todas las apariciones de @see searchValue */
export function replaceAll(str: string, searchValue: string | RegExp, replaceValue: string) {
    while (true) {
        const next = str.replace(searchValue, replaceValue);
        if (next == str) {
            return next;
        }
        str = next;
    }
}

/**Convierte a numero una cadena que puede tener prefijos (ej. $) y separador de miles */
export function parseFormattedNumber(val: string): number {
    //Quita los simbolos:
    val = val.replace(/[^\d|\+|\-|\.](.*)/, "$1");
    //las comas:
    val = replaceAll(val, ",", "");
    return Number.parseFloat(val);
}

/**True si un numero es igual a su representación de cadena formateada */
export function numEqStr(num: number, str: string) {
    str = replaceAll(str, ",", "");
    const match = /^(\+|-)?(\d*)(?:\.(\d*))?$/.exec(str);
    if (match == null) return false;

    const minus = match[1] == "-";
    const int = Number.parseInt(match[2]);
    const fracStr = match[3] ?? "0";
    const frac = Number.parseFloat(fracStr);

    if (minus && num > 0)
        return false;
    if (!minus && num < 0)
        return false;

    num = Math.abs(num);

    const nInt = Math.floor(num);
    const nFrac = num - nInt;
    if (int != nInt)
        return false;

    const nFracI = nFrac * Math.pow(10, fracStr.length);
    if (!floatEqFloat(frac, nFracI, 0.0001))
        return false;

    return true;
}

/**Interpolación lineal entre 2 numeros */
export function lerp(a: number, b: number, x: number): number {
    return a + (b - a) * x;
}

/**Pega todos los classNames, separandolos con espacios, ignorando los null / undefined */
export function mixClasses(...classNames: (string | null | undefined)[]): string {
    return classNames.filter(x => x != null).join(" ");
}