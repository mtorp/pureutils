import { arrayToMap } from "../logic";


export interface NumericSystem {
    digitMap: {
        [K: string]: number
    },
    charMap: string[]
}

export function createBase(digits: string): NumericSystem {
    const arr = digits.split("");
    return {
        charMap: arr,
        digitMap: arrayToMap(arr, x => x, (x, i) => i)
    };
}

function digitAt(a: string, index: number, system: NumericSystem) {
    if (index < 0)
        return 0;
    return system.digitMap[a.substr(index, 1)];
}

function toChar(digit: number, system: NumericSystem) {
    return system.charMap[digit];
}

function base(system: NumericSystem) {
    return system.charMap.length;
}

function zero(system: NumericSystem) {
    return system.charMap[0];
}

function one(system: NumericSystem) {
    return system.charMap[1];
}

export function halfAdder(a: string, b: string, carry: boolean, system: NumericSystem): { ret: string, carry: boolean } {
    if (a.length != 1 || b.length != 1)
        throw new Error();

    const ret = digitAt(a, 0, system) + digitAt(b, 0, system) + (carry ? 1 : 0);
    if (ret >= base(system)) {
        return {
            carry: true,
            ret: toChar(ret - base(system), system),
        };
    } else {
        return {
            carry: false,
            ret: toChar(ret, system),
        };
    }
}

/**Agrega dos numeros baseN, note que devuelve un numero con un digito de mas para que quepa toda la suma
 * @param small No agregar un digito extra al resultado, puede ser que el resultado no quepa
 */
export function add(a: string, b: string, system: NumericSystem, small: boolean = false) {
    var ret = new Array<string>((a.length > b.length ? a.length : b.length) + (small ? 0 : 1));

    let carry = false;
    for (let i = ret.length - 1; i >= 0; i--) {

        const aIndex = i - ret.length + a.length;
        const bIndex = i - ret.length + b.length;
        const aDigit = aIndex < 0 ? zero(system) : a.substr(aIndex, 1);
        const bDigit = bIndex < 0 ? zero(system) : b.substr(bIndex, 1);

        const half = halfAdder(aDigit, bDigit, carry, system);
        ret[i] = half.ret;
        carry = half.carry;
    }
    return ret.join("");
}

/**Incrementa en 1, note que no cambia el tamaño del numero */
export function increment(a: string, system: NumericSystem) {
    return add(a, one(system), system, true);
}



function isEven(a: string, system: NumericSystem) {
    return digitAt(a, a.length - 1, system) % 2 == 0;
}

export function half(a: string, system: NumericSystem) {
    if (base(system) % 2 != 0)
        throw new Error("Only even base supported");
    let ret = new Array<string>(a.length);

    for (let i = -1; i < a.length - 1; i++) {
        const first = digitAt(a, i, system);
        const second = digitAt(a, i + 1, system);

        const fEven = first % 2 == 0;
        const num = Math.floor(second / 2) + (fEven ? 0 : base(system) / 2);

        ret[i + 1] = toChar(num, system);
    }
    return ret.join("");
}

export function midpoint(a: string, b: string, system: NumericSystem) {
    return half(add(a, b, system), system).substr(1); //Le quita el digito extra que agrego el add
}

export function toBaseN(n: number, size: number, system: NumericSystem) {
    let ret = new Array<string>(size);
    for (let i = (size - 1); i >= 0; i--) {
        ret[i] = toChar(n % base(system), system);
        // NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
        n = Math.floor(n / base(system));
    }
    return ret.join("");
}

export function random(size: number, system: NumericSystem) {
    let ret = new Array<string>(size);
    for (let i = 0; i < size; i++) {
        ret[i] = toChar(Math.floor(Math.random() * base(system)), system);
    }
    return ret.join("");
}

export function minValue(size: number, system: NumericSystem) {
    return system.charMap[0].repeat(size);
}

export function maxValue(size: number, system: NumericSystem) {
    return system.charMap[system.charMap.length - 1].repeat(size);
}

export function zeroPad(num: string, size: number, system: NumericSystem) {
    return zero(system).repeat(size - num.length) + num;
}

export function maxDigit(system: NumericSystem) {
    return system.charMap[system.charMap.length - 1];
}