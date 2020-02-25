import { orderBy, skip, formatCurrency } from "../logic";

/**Un token parseado con un regex */
export interface RegexToken {
    /**Valor de la cadena parseada */
    value: string;
    /**Regex que se uso para parsear la cadena */
    regex?: RegExp | undefined;
    /**Grupos del regex, el primer grupo es el indice 0 */
    groups?: string[];
}

/**Divide la cadena en tokens donde cada token corresponde a un match de una parte de la cadena con cierto regex
 * Las partes de la cadena que no encajen se devuelven con un regexp indefinido
 */
export function regexParse(text: string, patterns: RegExp[]): RegexToken[] {
    let index = 0;
    let ret: RegexToken[] = [];
    while (index < text.length) {
        type Match = { exec: RegExpExecArray, regex: RegExp };
        const curr = text.substr(index);
        const matches: Match[] =
            patterns
                .map(regex => ({
                    exec: regex.exec(curr)!,
                    regex
                }))
                .filter(x => x.exec != null)
            ;
        ;
        const firstMatch: Match | undefined = orderBy(matches, x => x.exec.index)[0];

        if (firstMatch === undefined) {
            //Ya no hay mas ocurrencias del regex:
            break;
        }

        const result = firstMatch.exec;
        const value = result[0];
        const groups = skip(result, 1);

        if (result.index > 0) {
            //Un pedazo de la cadena que no encajó con ninguno:
            ret.push({
                value: curr.substr(0, result.index)
            });
        }

        ret.push({
            value: curr.substr(result.index, value.length),
            regex: firstMatch.regex,
            groups: groups
        });
        index += result.index + value.length;
    }

    if(index < text.length) {
        const val =text.substr(index);
        ret.push({
            value: val,
        });
    }

    return ret;
}