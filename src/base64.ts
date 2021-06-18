/**Convierte un Blob a una cadena base64 */
export function blobToBase64(archivo: Blob): Promise<string> {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = function () {
            const dataUrl = reader.result;
            if (typeof dataUrl != "string") {
                throw new Error("No se pudo convertir a base64 ya que el FileReader devolvio un dataUrl que no es string");
            }

            //Caso especial, si el blob viene vacio esto devuelve "data:"
            if (dataUrl == "data:")
                resolve("");

            const base64Prefix = "base64,"
            const base64 = dataUrl.substring(dataUrl.indexOf(base64Prefix) + base64Prefix.length)
            resolve(base64);
        };
        reader.readAsDataURL(archivo);
    });
}

/**Decodifica una cadena a base64 */
export function base64ToString(base64: string): string {
    if(typeof(atob) != "undefined") {
        return atob(base64);
    } else {
        return Buffer.from(base64, 'base64').toString()
    }
 }

/**Codifica una cadena a base64 */
export function stringToBase64(str: string): string {
    if(typeof(btoa) != "undefined") {
        return btoa(str);
    } else {
        return  Buffer.from(str).toString('base64');
    }
 }

/**Convierte una cadena base64 a un blob */
export function base64ToBlob(base64: string, contentType?: string): Blob {
    //Este codigo fue tomado de
    //http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript#16245768

    contentType = contentType || '';
    var byteCharacters = base64ToString(base64);
    return stringToBlob(byteCharacters, contentType);
}

/**Convierte una cadena binaria en un blob */
export function stringToBlob(value: string, contentType?: string): Blob {
    const sliceSize = 512;
    const byteArrays: Uint8Array[] = [];

    for (let offset = 0; offset < value.length; offset += sliceSize) {
        const slice = value.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

/**Convierte un blob a una cadena */
export function blobToString(value: Blob): Promise<string> {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onload = function () {
            if (typeof reader.result == "string") {
                resolve(reader.result);
            }
            else {
                reject(new Error("No se pudo convertir a base64 ya que el FileReader devolvio un dataUrl que no es string"));
            }
        }
        reader.readAsText(value);
    })

}