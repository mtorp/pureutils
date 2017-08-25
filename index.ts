export * from "./pipe"

/**Devuelve true si todos los elementos de un arreglo encajan con el predicado */
export function all<T>(arr: T[], pred: (x: T) => boolean): boolean {
    for (const x of arr) {
        if (!pred(x))
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
    const effectiveComparer = comparer || ((a, b) => a == b);

    return any(arr, x => effectiveComparer(x, value));
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
 * @param comparer Función que se usa para comparar los elementos, si no se especifica, se usa el operador == 
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

/**Compara dos objetos propiedad por propiedad */
export function shallowEquals<T>(a: T, b: T, comparer?: (a: T[keyof T], b: T[keyof T]) => boolean) {
    if ((typeof a) != (typeof b))
        return false;

    if ((typeof a) === "string" || (typeof a) === "boolean" || (typeof a) === "number") {
        return a === b;
    }

    if (a === b) return true;
    if (a == null || b == null) return false;
    const aKeys = Object.keys(a).map(x => x as keyof T);
    const bKeys = Object.keys(b).map(x => x as keyof T);

    if (aKeys.length != bKeys.length) return false;
    return sequenceEquals(aKeys.map(x => a[x]), aKeys.map(x => b[x]), comparer);
}

export function deepEquals<T>(a: T, b: T) {
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

export type Grouping<TKey, TItem> = { key: TKey, items: TItem[] };

/**Agrupa un arreglo por una llave
 * @param comparer Comparador, por default es un shallowEquals
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
    const defaultValueSelector = (item: any) => item.value ;

    const effectiveKeySelector = keySelector || defaultKeySelector;
    const effectiveValueSelector = valueSelector|| defaultValueSelector;
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
export function mapObject<TIn, TOut>(obj: ObjMap<TIn>, map: (value: TIn, key: string) => TOut): ObjMap<TOut> {
    const ret = {};
    for (const key in obj) {
        const value = obj[key];
        ret[key as string] = map(value, key);
    }
    return ret as { [key: string]: TOut };
}

/**
 * Filtra las propiedades de un objeto
 * @param obj Objeto que se va a filtrar
 * @param pred Predicado que va a determinar que propiedades si se van a conservar
 */
export function filterObject<T extends { [key: string]: any }>(obj: T, pred: (value: T, key: keyof T) => boolean): T {
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