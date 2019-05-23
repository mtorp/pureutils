import { pipe } from "./pipe";

export type NonNullable<T> = T extends null | undefined ? never : T;
export type ExtractNullType<T> =
    T extends null | undefined ? T : never;

type NSF<I, O> = (x: NonNullable<I>) => O;

export function nullsafe<T1, T2, T3, T4, T5, T6>(value: T1, m1: NSF<T1, T2>, m2: NSF<T2, T3>, m3: NSF<T3, T4>, m4: NSF<T4, T5>, m5: NSF<T5, T6>): T6 | ExtractNullType<T1 | T2 | T3 | T4 | T5>
export function nullsafe<T1, T2, T3, T4, T5>(value: T1, m1: NSF<T1, T2>, m2: NSF<T2, T3>, m3: NSF<T3, T4>, m4: NSF<T4, T5>): T5 | ExtractNullType<T1 | T2 | T3 | T4>
export function nullsafe<T1, T2, T3, T4>(value: T1, m1: NSF<T1, T2>, m2: NSF<T2, T3>, m3: NSF<T3, T4>): T4 | ExtractNullType<T1 | T2 | T3>
export function nullsafe<T1, T2, T3>(value: T1, m1: NSF<T1, T2>, m2: NSF<T2, T3>): T3 | ExtractNullType<T1 | T2>
export function nullsafe<T1, T2>(value: T1, m1: NSF<T1, T2>): T2 | ExtractNullType<T1>
//export function nullsafe<N extends null | undefined | never, T1, T2>(value: T1 | N, m1: (x: NonNullable<T1>) => T2 | N): T2 | N
export function nullsafe<T>(value: T): T

export function nullsafe(value: any, ...maps: ((x: any) => any)[]) {
    const nullMaps = maps.map(func => value => value == null ? value : func(value));
    return (pipe as any)(value, ...nullMaps);
}
