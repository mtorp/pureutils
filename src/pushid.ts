import { NumericSystem } from "./bignum";


/**ASCII ordered base64 */
const base: NumericSystem = {
    base: 64,
    first: "-"
};

const pushIdLen = 8 * 3;

/**Convierte una numero a un string codificado ASCII-ordenable */
function numToChars(n: number, size: number = 8) {
    let ret = new Array<string>(size);
    for (let i = (size - 1); i >= 0; i--) {
        ret[i] = pushChars.charAt(n % pushChars.length);
        // NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
        n = Math.floor(n / pushChars.length);
    }
    return ret.join("");
}

function ranChars(size: number) {
    let ret = new Array<string>(size);
    for (let i = 0; i < size; i++) {
        ret[i] = pushChars.charAt(Math.floor(Math.random() * pushChars.length))
    }
    return ret.join("");
}

function timestampToChars() {
    return numToChars(new Date().getTime());
}

let lastTimestamp = timestampToChars();
let lastConsec = 0;

/**Genera un pushId con la siguiente estructura:
 * timestamp(8) - consec(8) - random(8)
 * consec incrementa en 1 si se generan 2 pushId en el mismo timestamp
 * 
 * Son similares a los de firebase, pero en este se separa la parte consecutiva de la parte aleatoria con el propósito de poder hacer
 * reordenamiento en el lado del cliente
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

    return timestamp + numToChars(lastConsec, 8) + ranChars(8);
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
/**Modifica @param value de tal manera que quede ordenado entre @param min y @param max */
export function reoderPushId(value: string, minValue: string | null, maxValue: string | null) {
    minValue = minValue ?? minPushId;
    maxValue = maxValue ?? maxPushId;

    if (value.length != minValue.length || value.length != maxValue.length)
        throw new Error("lens not equal");

    let ret = value.split("");
    for (let i = 0; i < value.length; i++) {
        const minChar = min(minValue[i], maxValue[i]);
        const maxChar = max(minValue[i], maxValue[i]);
        const valChar = ret[i];
        //Distancia entre esta posición min y max
        const maxMinDelta = delta(maxChar, minChar);
        const valMinDelta = delta(valChar, minChar);
        const valMaxDelta = delta(valChar, maxChar);
        const minNear = Math.abs(valMinDelta) < Math.abs(valMaxDelta);
        //Debido a que max > min, nunca puede ser esta condición:
        if (maxMinDelta < 0)
            throw new Error("unreachable");

        if (maxMinDelta == 0) {
            //Esta posición no la podemos sumar o restar ya que es la misma entre los 2
            ret[i] = minChar;
            continue;
        }
        if (maxMinDelta == 1) {
            //Si hay una distancia de 1, no existe ningun valor intermedio entre estas 2 posiciones,
            //asi que escojemos el mas cercano al value:
            ret[i] = minNear ? minChar : maxChar;
            continue;
        }

        //En este punto existe una distancia mayor a 2 entre min y max
        const valBetween = valMinDelta > 0 && valMaxDelta < 0; //Si el valor esta entre el rango exclusivo (min, max)
        if (valBetween) {
            //El valor ya esta en el rango, se devuelve tal cual
            return ret.join("");
        }

        //Note que debido a la distancia >= 2 entre min y max, al sacar el promedio es seguro obtener un valor dentro del rango exclusivo
        ret[i] = avg(minChar, maxChar);
        return ret.join("");
    }

    throw new Error(`No hay espacio para reordenar entre ${minValue} y ${maxValue}`);
}