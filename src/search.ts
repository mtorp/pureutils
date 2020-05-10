import { removeDiacritics } from "./diacritics";
/**Devuelve el indice y longitud de uno de los pedazos que encajaron en la búsqueda */
interface TextSearchMatch {
    index: number;
    count: number;
} 

/**Realiza una busqueda de texto y devuelve true si text encaja con pattern */
export function search(pattern: string | null | undefined, text: string | null | undefined) : boolean {
    if (!pattern) return true;
    if (!text) return false;

    pattern = removeDiacritics(pattern.toLowerCase());
    text = removeDiacritics(text.toLowerCase());

    const splitter = /(?:\s|\n|\r)/g
    const tw = text.split(splitter);
    const pw = pattern.split(splitter);

    if (pw.length == 0) return true;
    if (pw.length == 1) return text.indexOf(pattern) != -1;

    const cadaPalabra = pw.map(x => text!.indexOf(x) != -1).reduce((a, b) => a && b, true);

    return cadaPalabra;
}