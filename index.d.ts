export * from "./pipe";
/**Devuelve true si todos los elementos de un arreglo encajan con el predicado */
export declare function all<T>(arr: T[], pred: (x: T) => boolean): boolean;
/**Devuelve true si por lo menos un elemento del arreglo encaja con el predicado, o si existe por lo menos un elemento en caso
 * de que el predicado este indefinido
 */
export declare function any<T>(arr: T[], pred?: (x: T) => boolean): boolean;
/**Devuelve true si el valor existe en el arreglo */
export declare function contains<T>(arr: T[], value: T): boolean;
/**Compara dos arreglos valor por valor */
export declare function sequenceEquals<T>(a: T[], b: T[], comparer?: (a: T, b: T) => boolean): boolean;
/**Devuelve true si 2 arreglos contienen los mismos valores, sin considerar el orden o la cantidad de veces que el mismo valor esta repetido en el arreglo */
export declare function setEquals<T>(a: T[], b: T[]): boolean;
/**Compara dos objetos propiedad por propiedad */
export declare function shallowEquals<T>(a: T, b: T, comparer?: (a: T[keyof T], b: T[keyof T]) => boolean): boolean;
export declare function deepEquals<T>(a: T, b: T): any;
/**Convierte un arreglo a un objeto */
export declare function toMap<T, TValue>(arr: T[], key: (value: T) => string, value: (value: T) => TValue): {
    [index: string]: TValue;
};
/**Aplana una colección de colecciones */
export declare function flatten<T>(arr: T[][]): T[];
/**Devuelve el primer elemento de un arreglo o indefinido si no se encontro ninguno, opcionalmente
 * filtrado por un predicado
 */
export declare function first<T>(arr: T[], pred?: (item: T) => boolean): T | undefined;
export declare type Grouping<TKey, TItem> = {
    key: TKey;
    items: TItem[];
};
/**Agrupa un arreglo por una llave
 * @param comparer Comparador, por default es un shallowEquals
 */
export declare function groupBy<T, TKey>(arr: T[], groupBy: (item: T) => TKey, comparer?: (a: TKey, b: TKey) => boolean): Grouping<TKey, T>[];
export interface ObjMap<T> {
    [key: string]: T;
}
/**Enumera todas las propiedades de un objeto en un arreglo
 * @param obj Objeto que se va a enumerar. Se devulve un arreglo de {value: T, key: string}
 */
export declare function enumObject<T>(obj: ObjMap<T>): ({
    key: string;
    value: T;
})[];
/**
 * Enumera todas las propiedades de un objeto en un arreglo
 * @param obj Objeto que se va a enumerar
 * @param selector Función que obtiene cada elemento del arreglo
 */
export declare function enumObject<T, TR>(obj: ObjMap<T>, selector: (key: string, value: T) => TR): TR[];
/**
 * Convierte un arreglo en un objeto
 * @param array Arreglo donde se toma la propiedad "key" de cada elemento como key del objeto
 */
export declare function arrayToMap<T extends {
    key: string | number;
}>(array: T[]): ObjMap<T[keyof T]>;
/**
 * Convierte un arreglo a un objeto
 * @param array Arreglo de valores
 * @param keySelector Función que obtiene la cadena que se tomada como el "key" de cada elemento
 */
export declare function arrayToMap<T>(array: T[], keySelector: (item: T) => string): ObjMap<T[keyof T]>;
/**
 * Aplica una función a cada propiedad de un objeto, conservando los keys
 * @param obj Objeto a mapear
 * @param map Función que toma el valor y el "key" y devuelve el nuevo valor
 */
export declare function mapObject<TIn, TOut>(obj: ObjMap<TIn>, map: (value: TIn, key: string) => TOut): ObjMap<TOut>;
/**
 * Filtra las propiedades de un objeto
 * @param obj Objeto que se va a filtrar
 * @param pred Predicado que va a determinar que propiedades si se van a conservar
 */
export declare function filterObject<T extends {
    [key: string]: any;
}>(obj: T, pred: (value: T, key: keyof T) => boolean): T;
/**
 * Quita un conjunto de propiedades de un objeto
 * @param obj El objeto original
 * @param keys Las propiedades que se desean quitar
 */
export declare function omit<T>(obj: T, ...keys: (keyof T)[]): T;
