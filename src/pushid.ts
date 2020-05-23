import { NumericSystem, createBase, random, toBaseN, minValue, maxValue, midpoint, zeroPad } from "./bignum";


/**ASCII ordered base64 */
const system = createBase('-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz');

const ranLen = 8;
const pushIdLen = 8  + 8 + ranLen;
const minPushId = minValue(pushIdLen, system);
const maxPushId = maxValue(pushIdLen, system);

function timestampToChars() {
    return toBaseN(new Date().getTime(), 8, system);
}

let lastTimestamp = timestampToChars();
let lastConsec = 0;

/**Genera un id único y ordenado cronológicamente en el lado del cliente de tal manera que sea posible
 * reordenarlos en el lado del cliente, note que debido al reordenamiento los ids son de longitud variable
 */
export function generatePushId() {
    const timestamp = timestampToChars();
    if (timestamp != lastTimestamp) {
        lastTimestamp = timestamp;
        lastConsec = 0;
    }
    else {
        lastConsec += 1;
    }

    return timestamp + toBaseN(lastConsec, 8, system) + random(ranLen, system);
}

const max = (a: string, b: string) => a > b ? a : b;
const min = (a: string, b: string) => a < b ? a : b;
function delta(a: string, b: string) {
    if (a.length != 1 || b.length != 1)
        throw new Error();
    return a.charCodeAt(0) - b.charCodeAt(0);
}

function avg(a: string, b: string) {
    if (a.length != 1 || b.length != 1)
        throw new Error();

    return String.fromCharCode((a.charCodeAt(0) + b.charCodeAt(0)) / 2);
}
/**Obtiene un pushId entre @param minValue y @param maxValue con la mayor cantidad de digitos aleatorios posible, esto permite
 * reordenar ids en el lado del cliente
*/
export function reoderPushId(minValue: string | null, maxValue: string | null) {
    minValue = minValue ?? minPushId;
    maxValue = maxValue ?? maxPushId;
    
    minValue = zeroPad(minValue, Math.max(minValue.length, maxValue.length), system);
    maxValue = zeroPad(maxValue, Math.max(minValue.length, maxValue.length), system);
    
    const mid = midpoint(minValue, maxValue, system);

    //La parte que no sea necesaria para el orden la volvemos a poner aleatoria, para que no haya colisiones si 
    //2 clientes reordenan a la misma posición:
    let i = 0;
    let gtMin = false;
    let ltMax = false;
    for (; i < mid.length; i++) {
        const curr = mid[i];
        const min = minValue[i];
        const max = maxValue[i];

        if (curr > min) {
            gtMin = true;
        }

        if (curr < max) {
            ltMax = true;
        }

        if (gtMin && ltMax) {
            break;
        }
    }

    if (!gtMin || !ltMax) {
        //No hay espacio para reordenar, se tiene que aumentar la longitud:
        return minValue + random(ranLen, system);
    }

    const orderCount = i + 1;
     //Mantiene un minimo de caracteres aleatorios para evitar colisiones entre clientes reordenando a la misma posición
    const randCount = Math.max(mid.length - orderCount, ranLen);

    const ret = mid.substr(0, orderCount) + random(randCount, system);
    return ret;
}