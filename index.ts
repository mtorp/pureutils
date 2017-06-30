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