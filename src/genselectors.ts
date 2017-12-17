import { range } from "./logic";

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

function combiner(digit: number, selectorCount : number) {
    const selectors =  range(1, selectorCount).map(i => `s${i}: R${i}` ).join(", ");
    const ret = [
        "Observable<O>",
        "Promise<O>",
        "O"
    ][digit];

    return `combiner: (${selectors}) => ${ret}`;
}

function retType (digits: number[], selectorSize: number) {
    const max = digits.reduce((a,b) => Math.min(a,b));
    const pre = [
        "SelectorRx",
        "SelectorAsync",
        "Selector"
    ][max];
    const T = [...range(1, selectorSize).map(x => "T" + x), "O"].join(", ");
    
    return `${pre}${selectorSize}<${T}>`;
}

function functionDef( selectorSize: number, selectorCount: number) {
    const T = [
        ...range(1, selectorSize).map(x => "T" + x),
        ...range(1, selectorCount).map(x => "R" + x),
        "O"].join(", ");
    
    return `export function createSelector<${T}>(`
}

let ret = title("Codigo autogenerado por genselectors.ts");
for (let selectorSize = 1; selectorSize <= 2; selectorSize++) {
    ret += title(`SelectorSize: ${selectorSize}`);
    for (let selectorCount = 1; selectorCount <= 3; selectorCount++) {
        ret += title(`SelectorCount: ${selectorCount}`);

        const digitCount = selectorCount + 1;
        const combinations = powerCombine(3, digitCount);

        for (const power of combinations) {
            const argsS = power.slice(0, power.length - 1).map((x, i) => inputSelector(x, selectorSize, i + 1));
            const argsC = combiner(power[power.length - 1], selectorCount);
            const args =  [... argsS, argsC].join(", ");

            ret += functionDef(selectorSize, selectorCount);
            ret += args;
            ret += "): " + retType(power, selectorSize) + "\r\n";
        }
    }
}

ret += title("Termina codigo autogenerado por genselectors.ts");
console.log(ret);