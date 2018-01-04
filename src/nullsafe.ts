import { pipe } from "./pipe";

export type Nullify<T> = T | null | undefined;
type NullifyUnd<T> = T | null | undefined;
export type NullifyOnly<T> = T | null;
export type UndefOnly<T> = T | undefined;

export function nullsafe<T1, T2, T3, T4, T5, T6, T7, T8, T9>(value: Nullify<T1>, m1: (x: T1) => Nullify<T2>, m2: (x: T2) => Nullify<T3>, m3: (x: T3) => Nullify<T4>, m4: (x: T4) => Nullify<T5>, m5: (x: T5) => Nullify<T6>, m6: (x: T6) => Nullify<T7>, m7: (x: T7) => T8, m8: (x: T8) => Nullify<T9>): Nullify<T9>
export function nullsafe<T1, T2, T3, T4, T5, T6, T7, T8>(value: Nullify<T1>, m1: (x: T1) => Nullify<T2>, m2: (x: T2) => Nullify<T3>, m3: (x: T3) => Nullify<T4>, m4: (x: T4) => Nullify<T5>, m5: (x: T5) => Nullify<T6>, m6: (x: T6) => Nullify<T7>, m7: (x: T7) => T8): Nullify<T8>
export function nullsafe<T1, T2, T3, T4, T5, T6, T7>(value: Nullify<T1>, m1: (x: T1) => Nullify<T2>, m2: (x: T2) => Nullify<T3>, m3: (x: T3) => Nullify<T4>, m4: (x: T4) => Nullify<T5>, m5: (x: T5) => Nullify<T6>, m6: (x: T6) => Nullify<T7>): Nullify<T7>
export function nullsafe<T1, T2, T3, T4, T5, T6>(value: Nullify<T1>, m1: (x: T1) => Nullify<T2>, m2: (x: T2) => Nullify<T3>, m3: (x: T3) => Nullify<T4>, m4: (x: T4) => Nullify<T5>, m5: (x: T5) => Nullify<T6>): Nullify<T6>
export function nullsafe<T1, T2, T3, T4, T5>(value: Nullify<T1>, m1: (x: T1) => Nullify<T2>, m2: (x: T2) => Nullify<T3>, m3: (x: T3) => Nullify<T4>, m4: (x: T4) => Nullify<T5>): Nullify<T5>
export function nullsafe<T1, T2, T3, T4>(value: Nullify<T1>, m1: (x: T1) => Nullify<T2>, m2: (x: T2) => Nullify<T3>, m3: (x: T3) => Nullify<T4>): Nullify<T4>
export function nullsafe<T1, T2, T3>(value: Nullify<T1>, m1: (x: T1) => Nullify<T2>, m2: (x: T2) => Nullify<T3>): Nullify<T3>
export function nullsafe<T1, T2>(value: Nullify<T1>, m1: (x: T1) => Nullify<T2>): Nullify<T2>
export function nullsafe<T1>(value: Nullify<T1>): Nullify<T1>
export function nullsafe(value: any, ...maps: ((x: any) => any)[]) {
    const nullMaps = maps.map(func => value => value == null ? value : func(value));
    return pipe(value, ...nullMaps);
}
