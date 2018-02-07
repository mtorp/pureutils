import { range, all } from "./logic";

/**Codigo para generar la definición de los tipos de createSelector */
function powerCombine(digitSize: number, digitCount: number): number[][] {
    let count = Math.pow(digitSize, digitCount);
    let ret: number[][] = [];
    let curr: number[] = [];
    for (let i = 0; i < digitCount; i++) {
        curr.push(0);
    }
    for (let c = 0; c < count; c++) {

        ret.push([...curr]);

        //Sumar uno:
        curr[curr.length - 1]++;
        //Carry:
        for (let i = curr.length - 1; i >= 0; i--) {
            if (curr[i] >= digitSize) {
                curr[i] = 0;
                if (i > 0)
                    curr[i - 1]++;
            }
        }
    }

    return ret;
}

function title(message: string) {
    return (
        `
        
//**********************************
//${message}
//**********************************
`);
}


function inputSelector(digit: number, selectorSize: number, selectorIndex: number) {
    const pre = [
        "SelectorRxProm",
        "SelectorAsync",
        "Selector"
    ][digit];

    const T = [...range(1, selectorSize).map(x => "T" + x), "R" + selectorIndex].join(", ");
    const type = `<${T}>`;

    return `s${selectorIndex}: ${pre}${selectorSize}${type}`;
}

function combiner(digit: number, selectorCount: number) {
    const name = [
        "CombinerRxProm",
        "CombinerAsync",
        "Combiner"
    ][digit];
    const args = [...range(1, selectorCount).map(x => "R" + x), "O"].join(", ");
    return `combiner: ${name}${selectorCount}<${args}>`;
}

function retType(digits: number[], selectorSize: number) {
    const selectorDigits = digits.slice(0, digits.length - 1);
    const combinerDigit = digits[digits.length - 1];

    const resultDigit = all(selectorDigits, x => x == 2) ? combinerDigit : 0;

    const pre = [
        "SelectorRx",
        "SelectorAsync",
        "Selector",
    ][resultDigit];
    const T = [...range(1, selectorSize).map(x => "T" + x), "O"].join(", ");

    return `${pre}${selectorSize}<${T}>`;
}

function functionDef(selectorSize: number, selectorCount: number) {
    const T = [
        ...range(1, selectorSize).map(x => "T" + x),
        ...range(1, selectorCount).map(x => "R" + x),
        "O"].join(", ");

    return `export function createSelector<${T}>(`
}

function completeFuncDef(selectorSize: number, selectorCount: number, power: number[]) {
    const argsS = power.slice(0, power.length - 1).map((x, i) => inputSelector(x, selectorSize, i + 1));
    const argsC = combiner(power[power.length - 1], selectorCount);
    const args = [...argsS, argsC].join(", ");

    let ret: string = "";
    ret += functionDef(selectorSize, selectorCount);
    ret += args;
    ret += "): " + retType(power, selectorSize) + "\r\n";
    return ret;
}

function types(selectorSize: number, selectorCount: number) {
    let ret = "";
    for (let i = 0; i < selectorSize; i++) {
        const TSelector = [...range(1, i + 1).map(x => "T" + x), "R"].join(", ");
        const args = range(1, i + 1).map(x => `a${x}: T${x} `).join(", ");
        ret += `export type Selector${i + 1}<${TSelector}> = (${args}) => R;\r\n`;
        ret += `export type SelectorAsync${i + 1}<${TSelector}> = (${args}) => Promise<R>;\r\n`;
        ret += `export type SelectorRx${i + 1}<${TSelector}> = (${args}) => Observable<R>;\r\n`;
        ret += `export type SelectorRxProm${i + 1}<${TSelector}> = (${args}) => Observable<R> | Promise<R>;\r\n`;
    }
    for (let i = 0; i < selectorCount; i++) {
        const TCombiner = [...range(1, i + 1).map(x => "R" + x), "O"].join(", ");
        const args = range(1, i + 1).map(x => `s${x}: R${x} `).join(", ");
        ret += `export type Combiner${i + 1}<${TCombiner}> = (${args}) => O;\r\n`;
        ret += `export type CombinerAsync${i + 1}<${TCombiner}> = (${args}) => Promise<O>;\r\n`;
        ret += `export type CombinerRxProm${i + 1}<${TCombiner}> = (${args}) => Observable<O> | Promise<O>;\r\n`;
    }

    ret += "\r\n";
    ret += "export type SelectorN<T,R> = (...args: T[]) => R;\r\n";
    ret += "export type SelectorAsyncN<T,R> = (...args: T[]) => Promise<R>;\r\n";
    ret += "export type SelectorRxN<T,R> = (...args: T[]) => Observable<R> | Promise<R>;\r\n";
    return ret;
}

let ret = title("Codigo autogenerado por genselectors.ts");
const maxSelectorSize = 2;
ret += title("Types: ");
const maxSelectorCount = 5;
ret += types(maxSelectorSize, maxSelectorCount);
for (let selectorSize = 1; selectorSize <= maxSelectorSize; selectorSize++) {
    ret += title(`SelectorSize: ${selectorSize}`);
    for (let selectorCount = 1; selectorCount <= maxSelectorCount; selectorCount++) {
        ret += title(`SelectorCount: ${selectorCount}`);

        const digitCount = selectorCount + 1;
        const combinations = powerCombine(2, digitCount);

        let promAdded = false;
        for (const power of combinations) {
            const powerMap = power.map(x => x == 0 ? x : 2);
            
            //Agregamos el selector de la promesa nates que todos los selectores que inician con argumento sincrono
            if (power[0] == 1 && !promAdded) {
                ret += "//prom\r\n";
                ret += completeFuncDef(selectorSize, selectorCount, [...range(0, selectorCount).map(x => 2), 1]);
                ret += "//\r\n";
                promAdded = true;
            }
            
            ret += completeFuncDef(selectorSize, selectorCount, powerMap);
        }

    }
}

ret += title("Termina codigo autogenerado por genselectors.ts");
console.log(ret);