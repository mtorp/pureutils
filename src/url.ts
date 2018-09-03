export type UrlParameterScalar = string | number | Date | boolean;
export type UrlParameterScalarNull = UrlParameterScalar | null | undefined;
export type UrlParamValue = UrlParameterScalarNull | UrlParameterScalarNull[];

export type UrlParameters = {
    [key: string]: UrlParamValue;
}

/**Codifica el valor de un query parameter*/
export function encodeUrlParameterValue(parameter: UrlParameterScalar) {
    const str =
        (typeof (parameter) == "number") ? "" + parameter :
            (typeof (parameter) == "boolean") ? "" + parameter :
                (typeof (parameter) == "string") ? parameter :
                    (parameter.toISOString());

    return encodeURIComponent(str);
}

/**Convierte un UrlParameters a un arreglo de key-values  */
function urlParamsToKeyValuePair<TParams extends UrlParameters>(urlParameters: TParams) {
    //Aplanamos los key values que sean arreglos:
    const keyValues = Object
        .keys(urlParameters)
        //Extraemos las claves y los valores
        .map(x => ({ key: x, value: urlParameters[x] }))
        //Todos los dejamos como arreglo o si no, en un arreglo de un elemento
        .map(x => ({ key: x.key, array: Array.isArray(x.value) ? x.value : [x.value] }))
        //Creamos key values repetidos por cada value en el arreglo
        .map(x => x.array.map(y => ({ key: x.key, value: y })))
        .reduce((a, b) => a.concat(b), [])
        .filter(x => x.value != null)
        .map(x => ({ key: x.key, value: x.value as UrlParameterScalar }))
        ;
    return keyValues;
}

/**Devuelve una cadena con todos los parametros url, separador por &. El caracter ? inicial no se devuelve por esta función. Si no hay ningun
 * parámetro que devolver se devuelve una cadena vacia
 */
export function encodeUrlParameters<TParams extends UrlParameters>(urlParameters: TParams) {
    const keyValues = urlParamsToKeyValuePair(urlParameters);
    const paramsStr = keyValues.filter(x => x.value != null).map(x => x.key + "=" + encodeUrlParameterValue(x.value)).join("&");
    return paramsStr;
}


/**
 * Pega los parametros ya codificados a una URL con el separador ?. Si parameters esta vacio devuelve la URL original tal cual
 */
export function appendEncodedUrlParameters(url: string, paramStr: string) {

    return paramStr ? (url + "?" + paramStr) : url;
}

/**Determina si una URL es absoluta */
export function isUrlAbsolute(url) {
    //Origen: https://stackoverflow.com/questions/10687099/how-to-test-if-a-url-string-is-absolute-or-relative
    
    if (url.indexOf('//') === 0) {return true;} // URL is protocol-relative (= absolute)
    if (url.indexOf('://') === -1) {return false;} // URL has no protocol (= relative)
    if (url.indexOf('.') === -1) {return false;} // URL does not contain a dot, i.e. no TLD (= relative, possibly REST)
    if (url.indexOf('/') === -1) {return false;} // URL does not contain a single slash (= relative)
    if (url.indexOf(':') > url.indexOf('/')) {return false;} // The first colon comes after the first slash (= relative)
    if (url.indexOf('://') < url.indexOf('.')) {return true;} // Protocol is defined before first dot (= absolute)
    return false; // Anything else must be relative
}