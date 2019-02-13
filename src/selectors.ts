import * as _moize from "moize";
import { interopRequireDefault } from "./interop";
import { shallowEquals, deepEquals, all, isPromiseLike, any, isObservable, toObservable } from "./logic";
import { Observable } from "rxjs";
import * as reselect from "reselect";

const moizeDefault = interopRequireDefault(_moize);


export interface createSelectorRxAsyncCreatorOptions {
    /**True para usar el deep equals */
    deepEquals: boolean;
    /**True para usar el asíncrono */
    async: boolean;
}

const defaultcreateSelectorRxAsync = createSelectorRxCreator({ deepEquals: false, async: true });

export const createDeepSelectorRx = createSelectorRxCreator({ deepEquals: true, async: false });
export const createSelector = reselect.createSelector;
export const createDeepSelector = reselect.createSelectorCreator(reselect.defaultMemoize, deepEquals);


        
//**********************************
//Codigo autogenerado por genselectors.ts
//**********************************

        
//**********************************
//Types: 
//**********************************
export type Selector1<T1, R> = (a1: T1 ) => R;
export type SelectorAsync1<T1, R> = (a1: T1 ) => Promise<R>;
export type SelectorRx1<T1, R> = (a1: T1 ) => Observable<R>;
export type SelectorRxProm1<T1, R> = (a1: T1 ) => Observable<R> | Promise<R>;
export type Selector2<T1, T2, R> = (a1: T1 , a2: T2 ) => R;
export type SelectorAsync2<T1, T2, R> = (a1: T1 , a2: T2 ) => Promise<R>;
export type SelectorRx2<T1, T2, R> = (a1: T1 , a2: T2 ) => Observable<R>;
export type SelectorRxProm2<T1, T2, R> = (a1: T1 , a2: T2 ) => Observable<R> | Promise<R>;
export type Combiner1<R1, O> = (s1: R1 ) => O;
export type CombinerAsync1<R1, O> = (s1: R1 ) => Promise<O>;
export type CombinerRxProm1<R1, O> = (s1: R1 ) => Observable<O> | Promise<O>;
export type Combiner2<R1, R2, O> = (s1: R1 , s2: R2 ) => O;
export type CombinerAsync2<R1, R2, O> = (s1: R1 , s2: R2 ) => Promise<O>;
export type CombinerRxProm2<R1, R2, O> = (s1: R1 , s2: R2 ) => Observable<O> | Promise<O>;
export type Combiner3<R1, R2, R3, O> = (s1: R1 , s2: R2 , s3: R3 ) => O;
export type CombinerAsync3<R1, R2, R3, O> = (s1: R1 , s2: R2 , s3: R3 ) => Promise<O>;
export type CombinerRxProm3<R1, R2, R3, O> = (s1: R1 , s2: R2 , s3: R3 ) => Observable<O> | Promise<O>;
export type Combiner4<R1, R2, R3, R4, O> = (s1: R1 , s2: R2 , s3: R3 , s4: R4 ) => O;
export type CombinerAsync4<R1, R2, R3, R4, O> = (s1: R1 , s2: R2 , s3: R3 , s4: R4 ) => Promise<O>;
export type CombinerRxProm4<R1, R2, R3, R4, O> = (s1: R1 , s2: R2 , s3: R3 , s4: R4 ) => Observable<O> | Promise<O>;
export type Combiner5<R1, R2, R3, R4, R5, O> = (s1: R1 , s2: R2 , s3: R3 , s4: R4 , s5: R5 ) => O;
export type CombinerAsync5<R1, R2, R3, R4, R5, O> = (s1: R1 , s2: R2 , s3: R3 , s4: R4 , s5: R5 ) => Promise<O>;
export type CombinerRxProm5<R1, R2, R3, R4, R5, O> = (s1: R1 , s2: R2 , s3: R3 , s4: R4 , s5: R5 ) => Observable<O> | Promise<O>;

export type SelectorN<T,R> = (...args: T[]) => R;
export type SelectorAsyncN<T,R> = (...args: T[]) => Promise<R>;
export type SelectorRxN<T,R> = (...args: T[]) => Observable<R> | Promise<R>;

        
//**********************************
//SelectorSize: 1
//**********************************

        
//**********************************
//SelectorCount: 1
//**********************************
export function createSelectorRx<T1, R1, O>(s1: SelectorRxProm1<T1, R1>, combiner: CombinerRxProm1<R1, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, O>(s1: SelectorRxProm1<T1, R1>, combiner: Combiner1<R1, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, O>(s1: Selector1<T1, R1>, combiner: CombinerRxProm1<R1, O>): SelectorRx1<T1, O>
//prom
export function createSelectorRx<T1, R1, O>(s1: Selector1<T1, R1>, combiner: CombinerAsync1<R1, O>): SelectorAsync1<T1, O>
//
export function createSelectorRx<T1, R1, O>(s1: Selector1<T1, R1>, combiner: Combiner1<R1, O>): Selector1<T1, O>

        
//**********************************
//SelectorCount: 2
//**********************************
export function createSelectorRx<T1, R1, R2, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, combiner: CombinerRxProm2<R1, R2, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, combiner: Combiner2<R1, R2, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, combiner: CombinerRxProm2<R1, R2, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, combiner: Combiner2<R1, R2, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, combiner: CombinerRxProm2<R1, R2, O>): SelectorRx1<T1, O>
//prom
export function createSelectorRx<T1, R1, R2, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, combiner: CombinerAsync2<R1, R2, O>): SelectorAsync1<T1, O>
//
export function createSelectorRx<T1, R1, R2, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, combiner: Combiner2<R1, R2, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, combiner: CombinerRxProm2<R1, R2, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, combiner: Combiner2<R1, R2, O>): Selector1<T1, O>

        
//**********************************
//SelectorCount: 3
//**********************************
export function createSelectorRx<T1, R1, R2, R3, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, combiner: CombinerRxProm3<R1, R2, R3, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, combiner: Combiner3<R1, R2, R3, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, combiner: CombinerRxProm3<R1, R2, R3, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, combiner: Combiner3<R1, R2, R3, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, combiner: CombinerRxProm3<R1, R2, R3, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, combiner: Combiner3<R1, R2, R3, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, combiner: CombinerRxProm3<R1, R2, R3, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, combiner: Combiner3<R1, R2, R3, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, combiner: CombinerRxProm3<R1, R2, R3, O>): SelectorRx1<T1, O>
//prom
export function createSelectorRx<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, combiner: CombinerAsync3<R1, R2, R3, O>): SelectorAsync1<T1, O>
//
export function createSelectorRx<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, combiner: Combiner3<R1, R2, R3, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, combiner: CombinerRxProm3<R1, R2, R3, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, combiner: Combiner3<R1, R2, R3, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, combiner: CombinerRxProm3<R1, R2, R3, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, combiner: Combiner3<R1, R2, R3, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, combiner: CombinerRxProm3<R1, R2, R3, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, combiner: Combiner3<R1, R2, R3, O>): Selector1<T1, O>

        
//**********************************
//SelectorCount: 4
//**********************************
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
//prom
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, combiner: CombinerAsync4<R1, R2, R3, R4, O>): SelectorAsync1<T1, O>
//
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): Selector1<T1, O>

        
//**********************************
//SelectorCount: 5
//**********************************
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: Selector1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: Selector1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, s5: Selector1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, s5: Selector1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: Selector1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: Selector1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, s5: Selector1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, s5: Selector1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: Selector1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: Selector1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, s5: Selector1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, s5: Selector1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: Selector1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: Selector1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, s5: Selector1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, s5: Selector1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
//prom
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, s5: Selector1<T1, R5>, combiner: CombinerAsync5<R1, R2, R3, R4, R5, O>): SelectorAsync1<T1, O>
//
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: Selector1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: Selector1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, s5: Selector1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, s5: Selector1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: Selector1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: Selector1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, s5: Selector1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: SelectorRxProm1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, s5: Selector1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: Selector1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: Selector1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, s5: Selector1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: SelectorRxProm1<T1, R3>, s4: Selector1<T1, R4>, s5: Selector1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: Selector1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: SelectorRxProm1<T1, R4>, s5: Selector1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, s5: SelectorRxProm1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, s5: Selector1<T1, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx1<T1, O>
export function createSelectorRx<T1, R1, R2, R3, R4, R5, O>(s1: Selector1<T1, R1>, s2: Selector1<T1, R2>, s3: Selector1<T1, R3>, s4: Selector1<T1, R4>, s5: Selector1<T1, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): Selector1<T1, O>

        
//**********************************
//SelectorSize: 2
//**********************************

        
//**********************************
//SelectorCount: 1
//**********************************
export function createSelectorRx<T1, T2, R1, O>(s1: SelectorRxProm2<T1, T2, R1>, combiner: CombinerRxProm1<R1, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, O>(s1: SelectorRxProm2<T1, T2, R1>, combiner: Combiner1<R1, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, O>(s1: Selector2<T1, T2, R1>, combiner: CombinerRxProm1<R1, O>): SelectorRx2<T1, T2, O>
//prom
export function createSelectorRx<T1, T2, R1, O>(s1: Selector2<T1, T2, R1>, combiner: CombinerAsync1<R1, O>): SelectorAsync2<T1, T2, O>
//
export function createSelectorRx<T1, T2, R1, O>(s1: Selector2<T1, T2, R1>, combiner: Combiner1<R1, O>): Selector2<T1, T2, O>

        
//**********************************
//SelectorCount: 2
//**********************************
export function createSelectorRx<T1, T2, R1, R2, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, combiner: CombinerRxProm2<R1, R2, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, combiner: Combiner2<R1, R2, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, combiner: CombinerRxProm2<R1, R2, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, combiner: Combiner2<R1, R2, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, combiner: CombinerRxProm2<R1, R2, O>): SelectorRx2<T1, T2, O>
//prom
export function createSelectorRx<T1, T2, R1, R2, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, combiner: CombinerAsync2<R1, R2, O>): SelectorAsync2<T1, T2, O>
//
export function createSelectorRx<T1, T2, R1, R2, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, combiner: Combiner2<R1, R2, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, combiner: CombinerRxProm2<R1, R2, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, combiner: Combiner2<R1, R2, O>): Selector2<T1, T2, O>

        
//**********************************
//SelectorCount: 3
//**********************************
export function createSelectorRx<T1, T2, R1, R2, R3, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, combiner: CombinerRxProm3<R1, R2, R3, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, combiner: Combiner3<R1, R2, R3, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: CombinerRxProm3<R1, R2, R3, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: Combiner3<R1, R2, R3, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, combiner: CombinerRxProm3<R1, R2, R3, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, combiner: Combiner3<R1, R2, R3, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: CombinerRxProm3<R1, R2, R3, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: Combiner3<R1, R2, R3, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, combiner: CombinerRxProm3<R1, R2, R3, O>): SelectorRx2<T1, T2, O>
//prom
export function createSelectorRx<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: CombinerAsync3<R1, R2, R3, O>): SelectorAsync2<T1, T2, O>
//
export function createSelectorRx<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, combiner: Combiner3<R1, R2, R3, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: CombinerRxProm3<R1, R2, R3, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: Combiner3<R1, R2, R3, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, combiner: CombinerRxProm3<R1, R2, R3, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, combiner: Combiner3<R1, R2, R3, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: CombinerRxProm3<R1, R2, R3, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, combiner: Combiner3<R1, R2, R3, O>): Selector2<T1, T2, O>

        
//**********************************
//SelectorCount: 4
//**********************************
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
//prom
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, combiner: CombinerAsync4<R1, R2, R3, R4, O>): SelectorAsync2<T1, T2, O>
//
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, combiner: CombinerRxProm4<R1, R2, R3, R4, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, combiner: Combiner4<R1, R2, R3, R4, O>): Selector2<T1, T2, O>

        
//**********************************
//SelectorCount: 5
//**********************************
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: SelectorRxProm2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
//prom
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: CombinerAsync5<R1, R2, R3, R4, R5, O>): SelectorAsync2<T1, T2, O>
//
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: SelectorRxProm2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: SelectorRxProm2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: SelectorRxProm2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: SelectorRxProm2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: CombinerRxProm5<R1, R2, R3, R4, R5, O>): SelectorRx2<T1, T2, O>
export function createSelectorRx<T1, T2, R1, R2, R3, R4, R5, O>(s1: Selector2<T1, T2, R1>, s2: Selector2<T1, T2, R2>, s3: Selector2<T1, T2, R3>, s4: Selector2<T1, T2, R4>, s5: Selector2<T1, T2, R5>, combiner: Combiner5<R1, R2, R3, R4, R5, O>): Selector2<T1, T2, O>

        
//**********************************
//Termina codigo autogenerado por genselectors.ts
//**********************************



export function createSelectorRx<T, R, O>(...args: (SelectorRxN<T, R> | ((...s: R[]) => O))[]) {
    const func = defaultcreateSelectorRxAsync as any;
    return func(...(args as any));
}


export function createSelectorRxCreator(options: createSelectorRxAsyncCreatorOptions): typeof createSelectorRx {
    const selectorArr = createSelectorRxAsyncArrCreator(options);
    return function createSelectorRxAsync<T, R, O>(...args: any[]) {

        const selectors = args.slice(0, args.length - 1) as SelectorRxN<T, R>[];
        const combiner = args[args.length - 1] as ((...s: R[]) => O);
        return selectorArr(selectors, combiner) as any;
    }
}

function getSelectorValueClearMemoOnError<R>(valueThunk: (...args: any[]) => R | Promise<R> | Observable<R>, clearMemo: () => void, ...args: any[]): R | Promise<R> | Observable<R> {
    let result: R | Promise<R> | Observable<R>;
    try {
        result = valueThunk(...args);
    } catch (error) {
        //Error sincrono;
        clearMemo();
        throw error;
    }
    if (isObservable(result)) {
        const r = result;
        //Resultado observable
        return new Observable<R>(subs => {
            const obs = r.catch<R, R>(err => {
                clearMemo();
                throw err;
            });

            obs.subscribe(subs);
        });

    } else if (isPromiseLike(result)) {
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

function allSync<T>(x: (T | Promise<T> | Observable<T>)[]): x is T[] {
    const anyAsync = any(x, x => isObservable(x) || isPromiseLike(x));
    return !anyAsync;
}

function createSelectorRxAsyncArrCreator(options: createSelectorRxAsyncCreatorOptions) {
    const moize = moizeDefault({ equals: options.deepEquals ? deepEquals : undefined, maxSize: 1 });

    /**Crea un selector con un funcionamiento similar al de reselect.createSelectorRx, pero con la memoización comparando el resultado resuelto de la promesa en lugar de simplemente la promesa*/
    return function createSelectorRxAsyncArr<T, R, O>(
        selectors: (SelectorRxN<T, R> | SelectorN<T, R>)[],
        combiner: (...s: R[]) => O | Promise<O> | Observable<O>
    ): any {
        type AsyncSArgs = (Observable<R> | Promise<R> | R)[];

        const clearMemos = () => {
            memoCombiner.clear();
            memoAsyncCombiner.clear();
        }

        const memoCombiner: (typeof combiner) & { clear: () => void } = moize(combiner) as any;

        const asyncCombiner = (() => {
            const resultThunk: (...asyncS: AsyncSArgs) => O | Observable<O> | Promise<O> = ((...asyncS: AsyncSArgs) => {
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

            return (...asyncS: AsyncSArgs) => getSelectorValueClearMemoOnError(resultThunk, clearMemos, ...asyncS);
        })();

        const memoAsyncCombiner: (typeof asyncCombiner) & { clear: () => void } = moize(asyncCombiner) as any;

        const ret = (...args: T[]): Observable<O> | Promise<O> | O => {
            const myArgs = selectors.map(x => x(...args));
            return memoAsyncCombiner(...myArgs);
        }

        return ret;
    }
}
