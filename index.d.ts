export * from "./pipe";
/**Compara dos arreglos valor por valor */
export declare function sequenceEquals<T>(a: T[], b: T[], comparer?: (a: T, b: T) => boolean): boolean;
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
