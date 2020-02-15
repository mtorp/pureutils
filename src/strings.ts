/**Resultado de haber encontrado cierto regex o cadena en otra cadena */
interface FindResult {
    /**Indice de donde se encontró */
    index: number;
    /**Longitud de lo encontrado */
    len: number;
}

/**Devuelve la siguiente aparicion en la cadena dado startIndex */
function indexOf(input: string, pattern: RegExp | string): FindResult | undefined {
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
    
    const str =result.toString();
    return {
        index: result.index,
        len: str.length
    };
}
}

/**Devuelve la siguiente aparición en la cadena despues de @param startIndex */
function indexOfAt(input: string, startIndex: number, pattern: RegExp | string): FindResult | undefined {
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
export function findAll(input: string, pattern: RegExp | string): FindResult[] {
    let index = 0;
    let ret: FindResult[] = [];
    while(index < input.length) {
        const next = indexOfAt(input, index, pattern);
        if(!next) {
            return ret;
        }

        ret.push(next);
        const nextIndex = next.index + next.len;
        if(nextIndex == index) {
            throw new Error(`Se encontraron infintas apariciones del patron '${pattern}' en la cadena '${input}'`);
        }
        index = nextIndex;
    }

    return ret;
}
