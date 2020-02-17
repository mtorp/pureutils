import { Span } from "./types";

/**Devuelve la siguiente aparicion en la cadena dado startIndex */
function indexOf(input: string, pattern: RegExp | string): Span | undefined {
    if (typeof (pattern) == "string") {
        const index = input.indexOf(pattern);
        if (index < 0)
            return undefined;

        return {
            index: index,
            len: pattern.length
        };
    }

    {
        const result = pattern.exec(input);
        if (result == null)
            return undefined;

        const str = result.toString();
        return {
            index: result.index,
            len: str.length
        };
    }
}

/**Devuelve la siguiente aparición en la cadena despues de @param startIndex */
function indexOfAt(input: string, startIndex: number, pattern: RegExp | string): Span | undefined {
    const input2 = input.substr(startIndex);
    const ret2 = indexOf(input2, pattern);

    if (ret2 == null)
        return undefined;

    return {
        ...ret2,
        index: ret2.index + startIndex,
    };
}

/**Encuentra todas las apariciones de cierto patron en una cadena */
export function findAll(input: string, pattern: RegExp | string): Span[] {
    let index = 0;
    let ret: Span[] = [];
    while (index < input.length) {
        const next = indexOfAt(input, index, pattern);
        if (!next) {
            return ret;
        }

        ret.push(next);
        const nextIndex = next.index + next.len;
        if (nextIndex == index) {
            throw new Error(`Se encontraron infintas apariciones del patron '${pattern}' en la cadena '${input}'`);
        }
        index = nextIndex;
    }

    return ret;
}

export interface ReplaceIndex {
    /**Indice de la posición de reemplazo */
    index: number;
    /**Longitud de origen la parte que se va a remplazar */
    inputLength: number;
    /**Longitud de destino de la parte que se va a reemplazar */
    outputLength: number;
}

/**
 * Dados los indices de las instrucciones de reemplazo, devuelve los indices en los que se deben de hacer cada una de ellas para que al hacerlas 
 * en ordencomo si se hubieran hecho todas en paralelo. El arrego devuelto tiene la misma longitud que @param indices
 * 
 * Ej. Al reemplazar la cadena "#bc#b" las el texto "#" por "##" los indices iniciales de reemplazo son [0, 3] y las longitudes finales [2, 2],
 * el primer reemplazo se debe de hacer en el indice 0, pero debido a que el primer reemplazo modificó la longitud de la cadena, el segundo reemplazo se debe de hacer
 * en el índice 4, no en el 3. Así que el retorno de la función en este caso es [0, 4]
 * @param indices 
 */
export function getReplaceAllIndices<TInput, TOutput>(indices: ReplaceIndex[]): number[] {
    //Copiar el arreglo porque se va a estar modificando en linea:
    let ix = indices;

    let ret: number[] = [];
    for (let i = 0; i < ix.length; i++) {
        const curr = ix[i];
        ret.push(curr.index);

        //Cantidad de espacios recorridos despues del reemplazo:
        const lenDif = curr.outputLength - curr.inputLength;

        ix = ix.map<ReplaceIndex>(x => x.index >= curr.index ? {
            ...x,
            index: x.index + lenDif
        } : x);
    }

    return ret;
}