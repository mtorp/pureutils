export type NonNull =
    {} | string | number | boolean | any[] | ((...args: any[]) => any) | Symbol;

export type Nullify<T> = T | null | undefined;
type NullifyUnd<T> = T | null | undefined;
export type NullifyOnly<T> = T | null;
export type UndefOnly<T> = T | undefined;

export function coalesce<T1 extends NonNull, T2 extends NonNull, T3>(a: T1 | null | undefined, b: T2 | null | undefined, c: T3): T1 | T2 | T3
export function coalesce<T1 extends NonNull, T2>(a: T1 | null | undefined, b: T2): T1 | T2
export function coalesce<T1>(a: T1): T1 
export function coalesce(...values: any[]): any {
    if (values.length == 0) return undefined;
    for (const v of values) {
        if (v != null) return v;
    }
    return values[values.length - 1];
}