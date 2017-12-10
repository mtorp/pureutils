import { removeDiacritics } from "./diacritics";
/**Realiza una busqueda de texto y devuelve true si la busqueda encaja */
export function search(pattern: string | null | undefined, text: string | null | undefined) : boolean {
    if (!pattern) return true;
    if (!text) return false;

    pattern = removeDiacritics(pattern.toLowerCase());
    text = removeDiacritics(text.toLowerCase());

    const splitter = /(?:\s|\n|\r)+/g
    const tw = text.split(splitter).filter(x => x != "");
    const pw = pattern.split(splitter).filter(x => x != "");

    if (pw.length == 0) return true;
    if (pw.length == 1) return text.indexOf(pattern) != -1;

    const cadaPalabra = pw.map(x => text!.indexOf(x) != -1).reduce((a, b) => a && b, true);

    return cadaPalabra;
}