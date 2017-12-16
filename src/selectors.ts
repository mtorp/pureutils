import * as _moize from "moize";
import { interopRequireDefault } from "./interop";
import { shallowEquals, deepEquals, all, isPromise, any } from "./logic";
const moizeDefault = interopRequireDefault(_moize);

export type Selector1<T1, R> = (a1: T1) => R;
export type Selector2<T1, T2, R> = (a1: T1, a2: T2) => R;

export type SelectorAsync1<T1, R> = (a1: T1) => Promise<R>;
export type SelectorAsync2<T1, T2, R> = (a1: T1, a2: T2) => Promise<R>;

export type SelectorAsyncN<T, R> = (...args: T[]) => Promise<R>;
export type SelectorN<T, R> = (...args: T[]) => R;


export interface createSelectorAsyncCreatorOptions {
    deepEquals: boolean;
}

const defaultCreateSelectorAsync = createSelectorCreator({ deepEquals: false });

export const createDeepSelector = createSelectorCreator({ deepEquals: true });


//*********************************************************************************** */
//SELECTOR 1
//*********************************************************************************** */
//SelectorAsync1 S1
export function createSelector<T1, R1, O>(
    s1: SelectorAsync1<T1, R1>,
    combiner: (s1: R1) => Promise<O>
): SelectorAsync1<T1, O>
export function createSelector<T1, R1, O>(
    s1: SelectorAsync1<T1, R1>,
    combiner: (s1: R1) => O
): SelectorAsync1<T1, O>
export function createSelector<T1, R1, O>(
    s1: Selector1<T1, R1>,
    combiner: (s1: R1) => Promise<O>
): SelectorAsync1<T1, O>
export function createSelector<T1, R1, O>(
    s1: Selector1<T1, R1>,
    combiner: (s1: R1) => O
): Selector1<T1, O>

//SelectorAsync1 S2
export function createSelector<T1, R1, R2, O>(
    s1: SelectorAsync1<T1, R1>,
    s2: SelectorAsync1<T1, R2>,
    combiner: (s1: R1, s2: R2) => Promise<O>
): SelectorAsync1<T1, O>
export function createSelector<T1, R1, R2, O>(
    s1: SelectorAsync1<T1, R1>,
    s2: Selector1<T1, R2>,
    combiner: (s1: R1, s2: R2) => Promise<O>
): SelectorAsync1<T1, O>
export function createSelector<T1, R1, R2, O>(
    s1: Selector1<T1, R1>,
    s2: SelectorAsync1<T1, R2>,
    combiner: (s1: R1, s2: R2) => Promise<O>
): SelectorAsync1<T1, O>
export function createSelector<T1, R1, R2, O>(
    s1: Selector1<T1, R1>,
    s2: Selector1<T1, R2>,
    combiner: (s1: R1, s2: R2) => Promise<O>
): SelectorAsync1<T1, O>

export function createSelector<T1, R1, R2, O>(
    s1: SelectorAsync1<T1, R1>,
    s2: SelectorAsync1<T1, R2>,
    combiner: (s1: R1, s2: R2) => O
): SelectorAsync1<T1, O>
export function createSelector<T1, R1, R2, O>(
    s1: SelectorAsync1<T1, R1>,
    s2: Selector1<T1, R2>,
    combiner: (s1: R1, s2: R2) => O
): SelectorAsync1<T1, O>
export function createSelector<T1, R1, R2, O>(
    s1: Selector1<T1, R1>,
    s2: SelectorAsync1<T1, R2>,
    combiner: (s1: R1, s2: R2) => O
): SelectorAsync1<T1, O>
export function createSelector<T1, R1, R2, O>(
    s1: Selector1<T1, R1>,
    s2: Selector1<T1, R2>,
    combiner: (s1: R1, s2: R2) => O
): Selector1<T1, O>

//SelectorAsync1 S3
export function createSelector<T1, R1, R2, R3, O>(
    s1: SelectorAsync1<T1, R1>,
    s2: SelectorAsync1<T1, R2>,
    s3: SelectorAsync1<T1, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>
): SelectorAsync1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(
    s1: SelectorAsync1<T1, R1>,
    s2: SelectorAsync1<T1, R2>,
    s3: Selector1<T1, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>
): SelectorAsync1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(
    s1: SelectorAsync1<T1, R1>,
    s2: Selector1<T1, R2>,
    s3: SelectorAsync1<T1, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>
): SelectorAsync1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(
    s1: SelectorAsync1<T1, R1>,
    s2: Selector1<T1, R2>,
    s3: Selector1<T1, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>
): SelectorAsync1<T1, O>

export function createSelector<T1, R1, R2, R3, O>(
    s1: Selector1<T1, R1>,
    s2: SelectorAsync1<T1, R2>,
    s3: SelectorAsync1<T1, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>
): SelectorAsync1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(
    s1: Selector1<T1, R1>,
    s2: SelectorAsync1<T1, R2>,
    s3: Selector1<T1, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>
): SelectorAsync1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(
    s1: Selector1<T1, R1>,
    s2: Selector1<T1, R2>,
    s3: SelectorAsync1<T1, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>
): SelectorAsync1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(
    s1: Selector1<T1, R1>,
    s2: Selector1<T1, R2>,
    s3: Selector1<T1, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>
): SelectorAsync1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(
    s1: SelectorAsync1<T1, R1>,
    s2: SelectorAsync1<T1, R2>,
    s3: SelectorAsync1<T1, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => O
): SelectorAsync1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(
    s1: SelectorAsync1<T1, R1>,
    s2: SelectorAsync1<T1, R2>,
    s3: Selector1<T1, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => O
): SelectorAsync1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(
    s1: SelectorAsync1<T1, R1>,
    s2: Selector1<T1, R2>,
    s3: SelectorAsync1<T1, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => O
): SelectorAsync1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(
    s1: SelectorAsync1<T1, R1>,
    s2: Selector1<T1, R2>,
    s3: Selector1<T1, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => O
): SelectorAsync1<T1, O>

export function createSelector<T1, R1, R2, R3, O>(
    s1: Selector1<T1, R1>,
    s2: SelectorAsync1<T1, R2>,
    s3: SelectorAsync1<T1, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => O
): SelectorAsync1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(
    s1: Selector1<T1, R1>,
    s2: SelectorAsync1<T1, R2>,
    s3: Selector1<T1, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => O
): SelectorAsync1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(
    s1: Selector1<T1, R1>,
    s2: Selector1<T1, R2>,
    s3: SelectorAsync1<T1, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => O
): SelectorAsync1<T1, O>
export function createSelector<T1, R1, R2, R3, O>(
    s1: Selector1<T1, R1>,
    s2: Selector1<T1, R2>,
    s3: Selector1<T1, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => O
): Selector1<T1, O>

//*********************************************************************************** */
//SELECTOR 2
//*********************************************************************************** */
//SelectorAsync1 S1
export function createSelector<T1, T2, R1, O>(
    s1: SelectorAsync2<T1, T2, R1>,
    combiner: (s1: R1) => Promise<O>
): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, O>(
    s1: SelectorAsync2<T1, T2, R1>,
    combiner: (s1: R1) => O
): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, O>(
    s1: Selector2<T1, T2, R1>,
    combiner: (s1: R1) => Promise<O>
): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, O>(
    s1: Selector2<T1, T2, R1>,
    combiner: (s1: R1) => O
): Selector2<T1, T2, O>

//SelectorAsync1 S2
export function createSelector<T1, T2, R1, R2, O>(
    s1: SelectorAsync2<T1, T2, R1>,
    s2: SelectorAsync2<T1, T2, R2>,
    combiner: (s1: R1, s2: R2) => Promise<O>
): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(
    s1: SelectorAsync2<T1, T2, R1>,
    s2: Selector2<T1, T2, R2>,
    combiner: (s1: R1, s2: R2) => Promise<O>
): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(
    s1: Selector2<T1, T2, R1>,
    s2: SelectorAsync2<T1, T2, R2>,
    combiner: (s1: R1, s2: R2) => Promise<O>
): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(
    s1: Selector2<T1, T2, R1>,
    s2: Selector2<T1, T2, R2>,
    combiner: (s1: R1, s2: R2) => Promise<O>
): SelectorAsync2<T1, T2, O>

export function createSelector<T1, T2, R1, R2, O>(
    s1: SelectorAsync2<T1, T2, R1>,
    s2: SelectorAsync2<T1, T2, R2>,
    combiner: (s1: R1, s2: R2) => O
): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(
    s1: SelectorAsync2<T1, T2, R1>,
    s2: Selector2<T1, T2, R2>,
    combiner: (s1: R1, s2: R2) => O
): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(
    s1: Selector2<T1, T2, R1>,
    s2: SelectorAsync2<T1, T2, R2>,
    combiner: (s1: R1, s2: R2) => O
): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, O>(
    s1: Selector2<T1, T2, R1>,
    s2: Selector2<T1, T2, R2>,
    combiner: (s1: R1, s2: R2) => O
): Selector2<T1, T2, O>

//SelectorAsync1 S3
export function createSelector<T1, T2, R1, R2, R3, O>(
    s1: SelectorAsync2<T1, T2, R1>,
    s2: SelectorAsync2<T1, T2, R2>,
    s3: SelectorAsync2<T1, T2, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>
): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(
    s1: SelectorAsync2<T1, T2, R1>,
    s2: SelectorAsync2<T1, T2, R2>,
    s3: Selector2<T1, T2, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>
): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(
    s1: SelectorAsync2<T1, T2, R1>,
    s2: Selector2<T1, T2, R2>,
    s3: SelectorAsync2<T1, T2, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>
): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(
    s1: SelectorAsync2<T1, T2, R1>,
    s2: Selector2<T1, T2, R2>,
    s3: Selector2<T1, T2, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>
): SelectorAsync2<T1, T2, O>

export function createSelector<T1, T2, R1, R2, R3, O>(
    s1: Selector2<T1, T2, R1>,
    s2: SelectorAsync2<T1, T2, R2>,
    s3: SelectorAsync2<T1, T2, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>
): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(
    s1: Selector2<T1, T2, R1>,
    s2: SelectorAsync2<T1, T2, R2>,
    s3: Selector2<T1, T2, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>
): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(
    s1: Selector2<T1, T2, R1>,
    s2: Selector2<T1, T2, R2>,
    s3: SelectorAsync2<T1, T2, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>
): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(
    s1: Selector2<T1, T2, R1>,
    s2: Selector2<T1, T2, R2>,
    s3: Selector2<T1, T2, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => Promise<O>
): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(
    s1: SelectorAsync2<T1, T2, R1>,
    s2: SelectorAsync2<T1, T2, R2>,
    s3: SelectorAsync2<T1, T2, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => O
): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(
    s1: SelectorAsync2<T1, T2, R1>,
    s2: SelectorAsync2<T1, T2, R2>,
    s3: Selector2<T1, T2, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => O
): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(
    s1: SelectorAsync2<T1, T2, R1>,
    s2: Selector2<T1, T2, R2>,
    s3: SelectorAsync2<T1, T2, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => O
): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(
    s1: SelectorAsync2<T1, T2, R1>,
    s2: Selector2<T1, T2, R2>,
    s3: Selector2<T1, T2, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => O
): SelectorAsync2<T1, T2, O>

export function createSelector<T1, T2, R1, R2, R3, O>(
    s1: Selector2<T1, T2, R1>,
    s2: SelectorAsync2<T1, T2, R2>,
    s3: SelectorAsync2<T1, T2, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => O
): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(
    s1: Selector2<T1, T2, R1>,
    s2: SelectorAsync2<T1, T2, R2>,
    s3: Selector2<T1, T2, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => O
): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(
    s1: Selector2<T1, T2, R1>,
    s2: Selector2<T1, T2, R2>,
    s3: SelectorAsync2<T1, T2, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => O
): SelectorAsync2<T1, T2, O>
export function createSelector<T1, T2, R1, R2, R3, O>(
    s1: Selector2<T1, T2, R1>,
    s2: Selector2<T1, T2, R2>,
    s3: Selector2<T1, T2, R3>,
    combiner: (s1: R1, s2: R2, s3: R3) => O
): Selector2<T1, T2, O>

export function createSelector<T, R, O>(...args: (SelectorAsyncN<T, R> | ((...s: R[]) => O))[]) {
    const func = defaultCreateSelectorAsync as any;
    return func(...(args as any));
}


export function createSelectorCreator(options: createSelectorAsyncCreatorOptions): typeof createSelector {
    const selectorArr = createSelectorAsyncArrCreator(options);
    return function createSelectorAsync<T, R, O>(...args: (SelectorAsyncN<T, R> | ((...s: R[]) => O))[]) {
        const selectors = args.slice(0, args.length - 1) as SelectorAsyncN<T, R>[];
        const combiner = args[args.length - 1] as ((...s: R[]) => O);
        return selectorArr(selectors, combiner);
    }
}
function createSelectorAsyncArrCreator(options: createSelectorAsyncCreatorOptions) {
    const moize = moizeDefault({ equals: options.deepEquals ? deepEquals : undefined, maxSize: 1 });

    /**Crea un selector con un funcionamiento similar al de reselect.createSelector, pero con la memoización comparando el resultado resuelto de la promesa en lugar de simplemente la promesa*/
    return function createSelectorAsyncArr<T, R, O>(
        selectors: (SelectorAsyncN<T, R> | SelectorN<T, R>)[],
        combiner: (...s: R[]) => O
    ): SelectorAsyncN<T, Promise<O>> {
        const memoCombiner: Function & { clear: () => void } = moize(combiner) as any;

        const asyncCombiner = (...asyncS: (Promise<R> | R)[]): Promise<O> | O => {
            const anyPromiseInArgs = any(asyncS, x => isPromise(x));

            if (!anyPromiseInArgs) {
                //Ruta sincrona, el resultado puede ser asíncrono
                try {
                    const promOrSync = memoCombiner(...asyncS);
                    if (isPromise(promOrSync)) {
                        //El resultado fue promesa, tomamos la ruta asíncrona
                        return (async () => {
                            try {
                                return await promOrSync;
                            } catch (error) {
                                //La promesa lanzó error, limpiamos el cache
                                memoCombiner.clear();
                                throw error;
                            }
                        })();
                    } else {
                        //Resuktado sincrono y argumentos sincronos, tomamos la ruta sincrona
                        return promOrSync;
                    }
                } catch (error) {
                    //Error síncrono
                    memoCombiner.clear();
                    throw error;
                }
            } else {
                //Ruta asincrona para los arguments y para la función
                return (async () => {
                    const args = await Promise.all(asyncS);
                    try {
                        return await memoCombiner(...args);
                    } catch (error) {
                        //Si la promesa lanzó error, limpiamos el cache del memo
                        memoCombiner.clear();
                        throw error;
                    }

                })();
            }
        }

        const memoAsyncCombiner: Function & { clear: () => void } = moize(asyncCombiner) as any;

        const ret = (...args: T[]): Promise<O> | O => {
            const myArgs = selectors.map(x => x(...args));
            try {
                const ret = memoAsyncCombiner(...myArgs);
                if (isPromise(ret)) {
                    //Ruta asíncrona
                    return (async () => {
                        try {
                            return await ret;
                        } catch (error) {
                            //Si hubo error hay que limpiar el cache
                            memoAsyncCombiner.clear();
                            throw error;
                        }
                    })();
                } else {
                    return ret;
                }
            } catch (error) {
                //Error sincrono
                memoAsyncCombiner.clear();
                throw error;
            }
        }

        return ret as any;
    }
}
