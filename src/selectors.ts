import * as _moize from "moize";
import { interopRequireDefault } from "./interop";
import { shallowEquals, deepEquals, all, isPromise, any, isObservable, toObservable } from "./logic";
import { Observable } from "rxjs";

const moizeDefault = interopRequireDefault(_moize);


export interface createSelectorAsyncCreatorOptions {
    deepEquals: boolean;
}

const defaultCreateSelectorAsync = createSelectorCreator({ deepEquals: false });

export const createDeepSelector = createSelectorCreator({ deepEquals: true });
//**********************************
//Codigo autogenerado por genselectors.ts
//**********************************


//**********************************
//Types:
//**********************************
export type Selector1<T1, R> = (a1: T1) => R;
export type SelectorAsync1<T1, R> = (a1: T1) => Promise<R>;
export type SelectorRx1<T1, R> = (a1: T1) => Observable<R>;
export type Selector2<T1, T2, R> = (a1: T1, a2: T2) => R;
export type SelectorAsync2<T1, T2, R> = (a1: T1, a2: T2) => Promise<R>;
export type SelectorRx2<T1, T2, R> = (a1: T1, a2: T2) => Observable<R>;

export type SelectorN<T, R> = (...args: T[]) => R;
export type SelectorAsyncN<T, R> = (...args: T[]) => Promise<R>;
export type SelectorRxN<T, R> = (...args: T[]) => Observable<R>;


//**********************************
//SelectorSize: 1
//**********************************


//**********************************
//SelectorCount: 1
//**********************************
export function createSelector<T1, R1, O>(s1: SelectorRx1<T1, R1>, combiner: (s1: R1) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, O>(s1: SelectorRx1<T1, R1>, combiner: (s1: R1) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, O>(s1: SelectorRx1<T1, R1>, combiner: (s1: R1) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, O>(s1: SelectorAsync1<T1, R1>, combiner: (s1: R1) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, O>(s1: SelectorAsync1<T1, R1>, combiner: (s1: R1) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, O>(s1: SelectorAsync1<T1, R1>, combiner: (s1: R1) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, O>(s1: Selector1<T1, R1>, combiner: (s1: R1) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, O>(s1: Selector1<T1, R1>, combiner: (s1: R1) => Promise<O>): SelectorAsync1<T1, O>
export function createSelector<T1, R1, O>(s1: Selector1<T1, R1>, combiner: (s1: R1) => O): Selector1<T1, O>


//**********************************
//SelectorCount: 2
//**********************************
export function createSelector<T1, R1, R2, O>(s1: SelectorRx1<T1, R1>, s2: SelectorRx1<T1, R2>, combiner: (s1: R1, s2: R2) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: SelectorRx1<T1, R1>, s2: SelectorRx1<T1, R2>, combiner: (s1: R1, s2: R2) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: SelectorRx1<T1, R1>, s2: SelectorRx1<T1, R2>, combiner: (s1: R1, s2: R2) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: SelectorRx1<T1, R1>, s2: SelectorAsync1<T1, R2>, combiner: (s1: R1, s2: R2) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: SelectorRx1<T1, R1>, s2: SelectorAsync1<T1, R2>, combiner: (s1: R1, s2: R2) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: SelectorRx1<T1, R1>, s2: SelectorAsync1<T1, R2>, combiner: (s1: R1, s2: R2) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: SelectorRx1<T1, R1>, s2: Selector1<T1, R2>, combiner: (s1: R1, s2: R2) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: SelectorRx1<T1, R1>, s2: Selector1<T1, R2>, combiner: (s1: R1, s2: R2) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: SelectorRx1<T1, R1>, s2: Selector1<T1, R2>, combiner: (s1: R1, s2: R2) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorRx1<T1, R2>, combiner: (s1: R1, s2: R2) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorRx1<T1, R2>, combiner: (s1: R1, s2: R2) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorRx1<T1, R2>, combiner: (s1: R1, s2: R2) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorAsync1<T1, R2>, combiner: (s1: R1, s2: R2) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorAsync1<T1, R2>, combiner: (s1: R1, s2: R2) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorAsync1<T1, R2>, combiner: (s1: R1, s2: R2) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: SelectorAsync1<T1, R1>, s2: Selector1<T1, R2>, combiner: (s1: R1, s2: R2) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: SelectorAsync1<T1, R1>, s2: Selector1<T1, R2>, combiner: (s1: R1, s2: R2) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: SelectorAsync1<T1, R1>, s2: Selector1<T1, R2>, combiner: (s1: R1, s2: R2) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: Selector1<T1, R1>, s2: SelectorRx1<T1, R2>, combiner: (s1: R1, s2: R2) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: Selector1<T1, R1>, s2: SelectorRx1<T1, R2>, combiner: (s1: R1, s2: R2) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: Selector1<T1, R1>, s2: SelectorRx1<T1, R2>, combiner: (s1: R1, s2: R2) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: Selector1<T1, R1>, s2: SelectorAsync1<T1, R2>, combiner: (s1: R1, s2: R2) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: Selector1<T1, R1>, s2: SelectorAsync1<T1, R2>, combiner: (s1: R1, s2: R2) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: Selector1<T1, R1>, s2: SelectorAsync1<T1, R2>, combiner: (s1: R1, s2: R2) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, combiner: (s1: R1, s2: R2) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, combiner: (s1: R1, s2: R2) => Promise<O>): SelectorAsync1<T1, O>
export function createSelector<T1, R1, R2, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, combiner: (s1: R1, s2: R2) => O): Selector1<T1, O>


//**********************************
//SelectorCount: 3
//**********************************
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorRx1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: SelectorAsync1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: SelectorRx1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: SelectorAsync1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRx1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorAsync1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorAsync1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): Selector1<T1, O>


//**********************************
//SelectorSize: 2
//**********************************


//**********************************
//SelectorCount: 1
//**********************************
export function createSelector<T1, T2, R1, O>(s1: SelectorRx2<T1, T2, R1>, combiner: (s1: R1) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, O>(s1: SelectorRx2<T1, T2, R1>, combiner: (s1: R1) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, O>(s1: SelectorRx2<T1, T2, R1>, combiner: (s1: R1) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, O>(s1: SelectorAsync2<T1, T2, R1>, combiner: (s1: R1) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, O>(s1: SelectorAsync2<T1, T2, R1>, combiner: (s1: R1) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, O>(s1: SelectorAsync2<T1, T2, R1>, combiner: (s1: R1) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, O>(s1: Selector2<T1, T2, R1>, combiner: (s1: R1) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, O>(s1: Selector2<T1, T2, R1>, combiner: (s1: R1) => Promise<O>): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, O>(s1: Selector2<T1, T2, R1>, combiner: (s1: R1) => O): Selector2<T1, T2, O>


//**********************************
//SelectorCount: 2
//**********************************
export function createSelector<T1, T2, R1, R2, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: SelectorRx2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: SelectorRx2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: SelectorRx2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: SelectorAsync2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: SelectorAsync2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: SelectorAsync2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: Selector2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: Selector2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: Selector2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => Promise<O>): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, combiner: (s1: R1, s2: R2) => O): Selector2<T1, T2, O>


//**********************************
//SelectorCount: 3
//**********************************
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorRx2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: SelectorAsync2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRx2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: SelectorAsync2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRx2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorAsync2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Observable<O>): SelectorRx2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: (s1: R1, s2: R2, s3: R3) => O): Selector2<T1, T2, O>


//**********************************
//Termina codigo autogenerado por genselectors.ts
//**********************************

export function createSelector<T, R, O>(...args: (SelectorRxN<T, R> | ((...s: R[]) => O))[]) {
    const func = defaultCreateSelectorAsync as any;
    return func(...(args as any));
}


export function createSelectorCreator(options: createSelectorAsyncCreatorOptions): typeof createSelector {
    const selectorArr = createSelectorAsyncArrCreator(options);
    return function createSelectorAsync<T, R, O>(...args: any[]) {

        const selectors = args.slice(0, args.length - 1) as SelectorRxN<T, R>[];
        const combiner = args[args.length - 1] as ((...s: R[]) => O);
        return selectorArr(selectors, combiner) as any;
    }
}

function getSelectorValueClearMemoOnError<R>(valueThunk: () => R | Promise<R> | Observable<R>, clearMemo: () => void): R | Promise<R> | Observable<R> {
    let result: R | Promise<R> | Observable<R>;
    try {
        result = valueThunk();
    } catch (error) {
        //Error sincrono;
        clearMemo();
        throw error;
    }
    if (isObservable(result)) {
        //Resultado observable
        return result.do(x => { }, err => {
            clearMemo();
        });
    } else if (isPromise(result)) {
        //Resultado promesa
        return result
            .then(x => x, error => {
                clearMemo();
                return Promise.reject(error);
            });
    } else {
        //Resultado síncrono
        return result;
    }
}

function allSync<T>(x: (T | Promise<T> | Observable<T>)[]) : x is T[] {
    const anyAsync = any(x, x => isObservable(x) || isPromise(x));
    return !anyAsync;
}

function createSelectorAsyncArrCreator(options: createSelectorAsyncCreatorOptions) {
    const moize = moizeDefault({ equals: options.deepEquals ? deepEquals : undefined, maxSize: 1 });

    /**Crea un selector con un funcionamiento similar al de reselect.createSelector, pero con la memoización comparando el resultado resuelto de la promesa en lugar de simplemente la promesa*/
    return function createSelectorAsyncArr<T, R, O>(
        selectors: (SelectorRxN<T, R> | SelectorN<T, R>)[],
        combiner: (...s: R[]) => O | Promise<O> | Observable<O>
    ): any {
        const memoCombiner:  (typeof combiner) & { clear: () => void} = moize(combiner) as any;

        const asyncCombiner = (...asyncS: (Observable<R> | Promise<R> | R)[]): Observable<O> | Promise<O> | O => {
            const anyObservableInArgs = any(asyncS, x => isObservable(x));
            const anyPromiseInArgs = any(asyncS, x => isPromise(x));

            const resultThunk: () => O | Observable<O> | Promise<O> = (() => {
                if (allSync(asyncS)) {
                    //Todos los argumentos son SINCRONOS
                    return memoCombiner(...asyncS);
                } else {
                    //Algunos argumentos son OBSERVABLE o PROMISE
                    const argsRx = asyncS.map(x => toObservable(x));
                    //Observable de los argumentos
                    const argRxLatest = Observable.combineLatest(...argsRx);

                    //Por cada cambio de argumento observamos el resultado del memoCombiner
                    const ret = argRxLatest.map(x => {
                        return toObservable(memoCombiner(...x));
                    }).switch(); //Si llega un nuevo argumento ignoramos los resultados de los observables anteriores con el switch

                    return ret;
                }
            });

            return getSelectorValueClearMemoOnError(resultThunk, () => memoCombiner.clear());
        }

        const memoAsyncCombiner: (typeof asyncCombiner) & { clear: () => void } = moize(asyncCombiner) as any;

        const ret = (...args: T[]): Observable<O> | Promise<O> | O => {
            const myArgs = selectors.map(x => x(...args));
            const resultThunk = () => memoAsyncCombiner(...myArgs);
            return getSelectorValueClearMemoOnError(resultThunk, () => memoAsyncCombiner.clear());
        }

        return ret;
    }
}
