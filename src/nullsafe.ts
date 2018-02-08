import { pipe } from "./pipe";
export type NonNull =
    {} | string | number | boolean | any[] | ((...args: any[]) => any) | Symbol;

export type Nullify<T> = T | null | undefined;
type NullifyUnd<T> = T | null | undefined;
export type NullifyOnly<T> = T | null;
export type UndefOnly<T> = T | undefined;

export function nullsafe<T1>(value: T1): T1
//null only
export function nullsafe<T1 extends NonNull, T2 extends NonNull, T3 extends NonNull, T4 extends NonNull, T5 extends NonNull, T6 extends NonNull, T7 extends NonNull, T8 extends NonNull, T9 extends NonNull>(value: NullifyOnly<T1>, m1: (x: T1) => NullifyOnly<T2>, m2: (x: T2) => NullifyOnly<T3>, m3: (x: T3) => NullifyOnly<T4>, m4: (x: T4) => NullifyOnly<T5>, m5: (x: T5) => NullifyOnly<T6>, m6: (x: T6) => NullifyOnly<T7>, m7: (x: T7) => T8, m8: (x: T8) => NullifyOnly<T9>): NullifyOnly<T9>
export function nullsafe<T1 extends NonNull, T2 extends NonNull, T3 extends NonNull, T4 extends NonNull, T5 extends NonNull, T6 extends NonNull, T7 extends NonNull, T8 extends NonNull>(value: NullifyOnly<T1>, m1: (x: T1) => NullifyOnly<T2>, m2: (x: T2) => NullifyOnly<T3>, m3: (x: T3) => NullifyOnly<T4>, m4: (x: T4) => NullifyOnly<T5>, m5: (x: T5) => NullifyOnly<T6>, m6: (x: T6) => NullifyOnly<T7>, m7: (x: T7) => T8): NullifyOnly<T8>
export function nullsafe<T1 extends NonNull, T2 extends NonNull, T3 extends NonNull, T4 extends NonNull, T5 extends NonNull, T6 extends NonNull, T7 extends NonNull>(value: NullifyOnly<T1>, m1: (x: T1) => NullifyOnly<T2>, m2: (x: T2) => NullifyOnly<T3>, m3: (x: T3) => NullifyOnly<T4>, m4: (x: T4) => NullifyOnly<T5>, m5: (x: T5) => NullifyOnly<T6>, m6: (x: T6) => NullifyOnly<T7>): NullifyOnly<T7>
export function nullsafe<T1 extends NonNull, T2 extends NonNull, T3 extends NonNull, T4 extends NonNull, T5 extends NonNull, T6 extends NonNull>(value: NullifyOnly<T1>, m1: (x: T1) => NullifyOnly<T2>, m2: (x: T2) => NullifyOnly<T3>, m3: (x: T3) => NullifyOnly<T4>, m4: (x: T4) => NullifyOnly<T5>, m5: (x: T5) => NullifyOnly<T6>): NullifyOnly<T6>
export function nullsafe<T1 extends NonNull, T2 extends NonNull, T3 extends NonNull, T4 extends NonNull, T5 extends NonNull>(value: NullifyOnly<T1>, m1: (x: T1) => NullifyOnly<T2>, m2: (x: T2) => NullifyOnly<T3>, m3: (x: T3) => NullifyOnly<T4>, m4: (x: T4) => NullifyOnly<T5>): NullifyOnly<T5>
export function nullsafe<T1 extends NonNull, T2 extends NonNull, T3 extends NonNull, T4 extends NonNull>(value: NullifyOnly<T1>, m1: (x: T1) => NullifyOnly<T2>, m2: (x: T2) => NullifyOnly<T3>, m3: (x: T3) => NullifyOnly<T4>): NullifyOnly<T4>
export function nullsafe<T1 extends NonNull, T2 extends NonNull, T3 extends NonNull>(value: NullifyOnly<T1>, m1: (x: T1) => NullifyOnly<T2>, m2: (x: T2) => NullifyOnly<T3>): NullifyOnly<T3>
export function nullsafe<T1 extends NonNull, T2 extends NonNull>(value: NullifyOnly<T1>, m1: (x: T1) => NullifyOnly<T2>): NullifyOnly<T2>
export function nullsafe<T1 extends NonNull>(value: NullifyOnly<T1>): NullifyOnly<T1>

//undefined only
export function nullsafe<T1 extends NonNull, T2 extends NonNull, T3 extends NonNull, T4 extends NonNull, T5 extends NonNull, T6 extends NonNull, T7 extends NonNull, T8 extends NonNull, T9 extends NonNull>(value: UndefOnly<T1>, m1: (x: T1) => UndefOnly<T2>, m2: (x: T2) => UndefOnly<T3>, m3: (x: T3) => UndefOnly<T4>, m4: (x: T4) => UndefOnly<T5>, m5: (x: T5) => UndefOnly<T6>, m6: (x: T6) => UndefOnly<T7>, m7: (x: T7) => T8, m8: (x: T8) => UndefOnly<T9>): UndefOnly<T9>
export function nullsafe<T1 extends NonNull, T2 extends NonNull, T3 extends NonNull, T4 extends NonNull, T5 extends NonNull, T6 extends NonNull, T7 extends NonNull, T8 extends NonNull>(value: UndefOnly<T1>, m1: (x: T1) => UndefOnly<T2>, m2: (x: T2) => UndefOnly<T3>, m3: (x: T3) => UndefOnly<T4>, m4: (x: T4) => UndefOnly<T5>, m5: (x: T5) => UndefOnly<T6>, m6: (x: T6) => UndefOnly<T7>, m7: (x: T7) => T8): UndefOnly<T8>
export function nullsafe<T1 extends NonNull, T2 extends NonNull, T3 extends NonNull, T4 extends NonNull, T5 extends NonNull, T6 extends NonNull, T7 extends NonNull>(value: UndefOnly<T1>, m1: (x: T1) => UndefOnly<T2>, m2: (x: T2) => UndefOnly<T3>, m3: (x: T3) => UndefOnly<T4>, m4: (x: T4) => UndefOnly<T5>, m5: (x: T5) => UndefOnly<T6>, m6: (x: T6) => UndefOnly<T7>): UndefOnly<T7>
export function nullsafe<T1 extends NonNull, T2 extends NonNull, T3 extends NonNull, T4 extends NonNull, T5 extends NonNull, T6 extends NonNull>(value: UndefOnly<T1>, m1: (x: T1) => UndefOnly<T2>, m2: (x: T2) => UndefOnly<T3>, m3: (x: T3) => UndefOnly<T4>, m4: (x: T4) => UndefOnly<T5>, m5: (x: T5) => UndefOnly<T6>): UndefOnly<T6>
export function nullsafe<T1 extends NonNull, T2 extends NonNull, T3 extends NonNull, T4 extends NonNull, T5 extends NonNull>(value: UndefOnly<T1>, m1: (x: T1) => UndefOnly<T2>, m2: (x: T2) => UndefOnly<T3>, m3: (x: T3) => UndefOnly<T4>, m4: (x: T4) => UndefOnly<T5>): UndefOnly<T5>
export function nullsafe<T1 extends NonNull, T2 extends NonNull, T3 extends NonNull, T4 extends NonNull>(value: UndefOnly<T1>, m1: (x: T1) => UndefOnly<T2>, m2: (x: T2) => UndefOnly<T3>, m3: (x: T3) => UndefOnly<T4>): UndefOnly<T4>
export function nullsafe<T1 extends NonNull, T2 extends NonNull, T3 extends NonNull>(value: UndefOnly<T1>, m1: (x: T1) => UndefOnly<T2>, m2: (x: T2) => UndefOnly<T3>): UndefOnly<T3>
export function nullsafe<T1 extends NonNull, T2 extends NonNull>(value: UndefOnly<T1>, m1: (x: T1) => UndefOnly<T2>): UndefOnly<T2>
export function nullsafe<T1 extends NonNull>(value: UndefOnly<T1>): UndefOnly<T1>

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
