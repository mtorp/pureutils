/**Ejecuta un conjunto de funciones pasando la salida de cada función a la entrada de la siguiente */
export function pipe<T1>
    (x: T1): T1
export function pipe<T1, T2>
    (x: T1, f1: (x: T1) => T2): T2
export function pipe<T1, T2, T3>
    (x: T1, f1: (x: T1) => T2, f2: (x: T2) => T3): T3
export function pipe<T1, T2, T3, T4>
    (x: T1, f1: (x: T1) => T2, f2: (x: T2) => T3, f3: (x: T3) => T4): T4
export function pipe<T1, T2, T3, T4, T5>
    (x: T1, f1: (x: T1) => T2, f2: (x: T2) => T3, f3: (x: T3) => T4, f4: (x: T4) => T5): T5
export function pipe<T1, T2, T3, T4, T5, T6>
    (x: T1, f1: (x: T1) => T2, f2: (x: T2) => T3, f3: (x: T3) => T4, f4: (x: T4) => T5, f5: (x: T5) => T6): T6
export function pipe<T1, T2, T3, T4, T5, T6, T7>
    (x: T1, f1: (x: T1) => T2, f2: (x: T2) => T3, f3: (x: T3) => T4, f4: (x: T4) => T5, f5: (x: T5) => T6, f6: (x: T6) => T7): T7
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8>
    (x: T1, f1: (x: T1) => T2, f2: (x: T2) => T3, f3: (x: T3) => T4, f4: (x: T4) => T5, f5: (x: T5) => T6, f6: (x: T6) => T7, f7: (x: T7) => T8): T8
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9>
    (x: T1, f1: (x: T1) => T2, f2: (x: T2) => T3, f3: (x: T3) => T4, f4: (x: T4) => T5, f5: (x: T5) => T6, f6: (x: T6) => T7, f7: (x: T7) => T8, f8: (x: T8) => T9): T9
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
    (x: T1, f1: (x: T1) => T2, f2: (x: T2) => T3, f3: (x: T3) => T4, f4: (x: T4) => T5, f5: (x: T5) => T6, f6: (x: T6) => T7, f7: (x: T7) => T8, f8: (x: T8) => T9, f9: (x: T9) => T10): T10
export function pipe(value, ...fs: ((x) => any)[]) {
    return fs.reduce((a, b) => b(a), value);
}
