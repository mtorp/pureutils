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
        "SelectorRx",
        "SelectorAsync",
        "Selector"
    ][digit];

    const T = [...range(1, selectorSize).map(x => "T" + x), "R" + selectorIndex].join(", ");
    const type = `<${T}>`;

    return `s${selectorIndex}: ${pre}${selectorSize}${type}`;
}

function combiner(digit: number, selectorCount: number) {
    const selectors = range(1, selectorCount).map(i => `s${i}: R${i}`).join(", ");
    const ret = [
        "Observable<O>",
        "Promise<O>",
        "O"
    ][digit];

    return `combiner: (${selectors}) => ${ret}`;
}

function retType(digits: number[], selectorSize: number) {
    const selectorDigits = digits.slice(0, digits.length - 1);
    const combinerDigit = digits[digits.length - 1];

    const resultDigit = all(selectorDigits, x => x == 2) ? combinerDigit : 0;

    const pre = [
        "SelectorRx",
        "SelectorAsync",
        "Selector"
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

function types(selectorSize: number) {
    let ret = "";
    for (let i = 0; i < selectorSize; i++) {
        const T = [...range(1, i + 1).map(x => "T" + x), "R"].join(", ");
        const args = range(1, i + 1).map(x => `a${x}: T${x} `).join(", ");
        ret += `export type Selector${i + 1}<${T}> = (${args}) => R;\r\n`;
        ret += `export type SelectorAsync${i + 1}<${T}> = (${args}) => Promise<R>;\r\n`;
        ret += `export type SelectorRx${i + 1}<${T}> = (${args}) => Observable<R>;\r\n`;
    }

    ret += "\r\n";
    ret += "export type SelectorN<T,R> = (...args: T[]) => R;\r\n";
    ret += "export type SelectorAsyncN<T,R> = (...args: T[]) => Promise<R>;\r\n";
    ret += "export type SelectorRxN<T,R> = (...args: T[]) => Observable<R>;\r\n";
return ret;
}

let ret = title("Codigo autogenerado por genselectors.ts");
const maxSelectorSize = 2;
ret += title("Types: ");
ret += types(maxSelectorSize);
for (let selectorSize = 1; selectorSize <= maxSelectorSize; selectorSize++) {
    ret += title(`SelectorSize: ${selectorSize}`);
    for (let selectorCount = 1; selectorCount <= 3; selectorCount++) {
        ret += title(`SelectorCount: ${selectorCount}`);

        const digitCount = selectorCount + 1;
        const combinations = powerCombine(3, digitCount);

        for (const power of combinations) {
            const argsS = power.slice(0, power.length - 1).map((x, i) => inputSelector(x, selectorSize, i + 1));
            const argsC = combiner(power[power.length - 1], selectorCount);
            const args = [...argsS, argsC].join(", ");

            ret += functionDef(selectorSize, selectorCount);
            ret += args;
            ret += "): " + retType(power, selectorSize) + "\r\n";
        }
    }
}

ret += title("Termina codigo autogenerado por genselectors.ts");
console.log(ret);