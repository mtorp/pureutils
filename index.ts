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
    const effectiveComparer = comparer || referenceEquals;

    return any(arr, x => effectiveComparer(x, value));
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

/**Compara dos objetos propiedad por propiedad */
export function shallowEquals<T>(a: T, b: T, comparer?: (a: T[keyof T], b: T[keyof T]) => boolean) {
    if ((typeof a) != (typeof b))
        return false;

    if ((typeof a) === "string" || (typeof a) === "boolean" || (typeof a) === "number") {
        return a === b;
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

const isArrayLike = (x: any): x is ArrayLike<any> => x.lenght !== undefined;
const hasIterationProtocol = (variable: any): variable is Iterable<any> => variable !== null && Symbol.iterator in Object(variable);

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

/**Devuelve el ultimo elemento de un arreglo */
export function last<T>(arr: T[]): T | undefined {
    return arr[arr.length - 1];
}

export type Grouping<TKey, TItem> = { key: TKey, items: TItem[] };

/**Agrupa un arreglo por una llave. Se preserva el orden original de los elementos del arreglo, segun los elementos agrupadores que aparezcan primero, tambien
 * el orden adentro del grupo es preservado
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

/**Aplica una función Promise.all a un objeto,  */
export function promiseAllObj<T>(obj: ObjMap<PromiseLike<T>>): Promise<ObjMap<T>>
export function promiseAllObj(obj: any): Promise<ObjMap<any>>
export function promiseAllObj(obj: any) {
    const keys = Object.keys(obj);
    const values = keys.map(key => obj[key]);
    const all = Promise.all(values);
    const ret = all.then(arr => arr.map((value, index) => ({ key: keys[index], value: value }))).then(x => arrayToMap(x));
    return ret;
}

/**Devuelve todos los elementos de un arreglo que no estan repetidos, respetando el orden original en el que aparecen primero.
 * @param comparer Comparador que determina si 2 elementos son iguales. Se usa el operador ===
*/
export function unique<T>(arr: T[], comparer?: (a: T, b: T) => boolean) {
    return groupBy<T, T>(arr, x => x, referenceEquals).map(x => x.key)
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

/**Devuelve todos los elementos en "items" tal que su key se encuentre tambien en "keys". Conserva el orden original de "items"
 * @param keySelector Obtiene la clave de un elemento
 * @param comparer Comparedor de igualdad. Por default se usa el shallowEquals
 */
export function intersectKeys<T, TKey>(items: T[], keys: TKey[], keySelector: (item: T) => TKey, comparer?: (a: TKey, b: TKey) => boolean) {
    return items.filter(item => contains(keys, keySelector(item), comparer || shallowEquals));
}