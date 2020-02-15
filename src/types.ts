/**Un rango de 2 valores */
export interface Range<T>{
    /**Minimo */
    min: T;
    /**Máximo */
    max: T;
}

/**Una sección ya sea de un arreglo o string*/
export interface Span {
    /**Indice de donde se encontró */
    index: number;
    /**Longitud de lo encontrado */
    len: number;
}
