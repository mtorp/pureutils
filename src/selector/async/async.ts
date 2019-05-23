import { enumObject, any, isObservable, isPromiseLike, mapObject, objRxToRxObj, ObservableMap, ObservableMapToSyncMap, toObservable, syncResolve, PromiseMapToSyncMap, promiseAllObj, valToPromise, obsToPromise } from "../../logic";
import { Observable, combineLatest as combineLatestRx } from "rxjs";
import { SelectorMap, SelectorOutType, SelectorMapOuts, SelectorMapIn, Selector, SelectorMapFunc, runSelectorDeps, createSelector, SelectorOptions } from "../selector";
import { SelectorCache, selectorCacheRequest } from "../cache";
import { map as mapRx, map, switchAll as switchAllRx, catchError } from "rxjs/operators";



/**Utilizado como elemento de un Observable, indica que el siguiente valor esta cargando */
export const LoadingSym = Symbol("LoadingSym");

/**Extrae el tipo de un Promise/Observable */
type RemoveAsync<T> =
    T extends PromiseLike<infer R> ? R :
    T extends Observable<(infer R) | (typeof LoadingSym)> ? R :
    T;

type SelectorRxMapOuts<T extends SelectorMap<any>> = {
    [K in keyof T]: RemoveAsync<SelectorOutType<T[K]>>
};

type SelectorAsyncMapOuts<T extends SelectorMap<any>> = {
    [K in keyof T]: RemovePromise<SelectorOutType<T[K]>>
};


/**Una función que mapea un objeto resultante de multiples selectores a una salida */
export interface SelectorRxMapFunc<TDeps extends SelectorMap<any>, TOut> {
    (curr: SelectorRxMapOuts<TDeps>, prev: SelectorRxMapOuts<TDeps> | undefined): TOut;
}

/**Una función que mapea un objeto resultante de multiples selectores a una salida */
export interface SelectorAsyncMapFunc<TDeps extends SelectorMap<any>, TOut> {
    (curr: SelectorAsyncMapOuts<TDeps>, prev: SelectorAsyncMapOuts<TDeps> | undefined): TOut;
}

/**Devuelve true si de un mapa de valores todos estos son síncronos (no son Observable o PromiseLike)  */
function areAllSync<TMap extends {}>(x: TMap): boolean {
    const values = enumObject(x).map(x => x.value);
    const anyAsync = any(values, x => isObservable(x) || isPromiseLike(x));
    return !anyAsync;
}

function anyLoading<TMap extends {}>(x: TMap): boolean {
    const values = enumObject(x).map(x => x.value);
    return any(values, x => (x as any) === LoadingSym);
}

interface AsyncCacheSelectorResult<T> {
    clear: () => void;
    result: T;
}

interface ObsSelectorResult<TOut> extends AsyncCacheSelectorResult<Observable<TOut | typeof LoadingSym>> { }
interface PromSelectorResult<TOut> extends AsyncCacheSelectorResult<Promise<TOut>> { }

export type ObservablePromiseMap = {
    [K in string]: Observable<any> | PromiseLike<any>
};


export type PromiseMap = {
    [K in string]: PromiseLike<any>
};

export type Prfy<T> = T | PromiseLike<T>;

interface CacheClearable{
    clear: () => void;
}
interface CacheState<TArgs, TResult> extends CacheClearable {
    get: () => SelectorCache<TArgs, TResult> | undefined;
    set: (x: SelectorCache<TArgs, TResult>) => void;
}

function createCacheState<TArgs, TResult>(alsoClear: CacheClearable[] ): CacheState<TArgs, TResult> {
    let instance: SelectorCache<TArgs, TResult> | undefined = undefined;

    return {
        get: () => instance,
        set: x => instance = x,
        clear: () => {
            instance = undefined;
            for(const a of alsoClear) {
                a.clear();
            }
        }
    };
}

function promiseMapSelector<TResult extends PromiseMap, TOut>(
    cacheState: CacheState<PromiseMapToSyncMap<TResult>, Rxfy<TOut>>,
    results: TResult,
    map: SelectorMapFunc<PromiseMapToSyncMap<TResult>, TOut | PromiseLike<TOut>>,
    options: SelectorOptions
): PromSelectorResult<TOut> {
    const obs = observableMapSelector(cacheState, mapToRx(results), map, options);
    //TODO: Verificar que las promesas que devuelven de forma sincrona generan selectores que devuelven de forma sincrona:
    const outProm = obsToPromise(obs.result) as Promise<TOut>;

    return {
        result: outProm,
        clear: obs.clear
    };
}

/**
 * Dado un objeto de observables con los resultados de los selectores dependientes, devuelve un observable
 * con la respuesta del selector representado por la función @param map
 * @param results Resultados de los que este selector depende
 * @param map La función del selector
 */
function observableMapSelector<TResult extends ObservableMap, TOut>(
    cacheState: CacheState<ObservableMapToSyncMap<TResult>, Rxfy<TOut>>,
    results: TResult,
    map: SelectorMapFunc<ObservableMapToSyncMap<TResult>, Rxfy<TOut>>,
    options: SelectorOptions
): ObsSelectorResult<TOut> {
    type SelOuts = ObservableMapToSyncMap<TResult>;

    //Este es un observable de los valores: 
    const obs = objRxToRxObj(results);

    const outObs =
        obs.pipe(
            mapRx(args => {
                if (anyLoading(args)) {
                    return toObservable(LoadingSym) as Observable<typeof LoadingSym | TOut>;
                }

                const resp = selectorCacheRequest(cacheState.get(), {
                    args: args,
                    func: map
                }, options);

                //Actualizar el cache:
                cacheState.set(resp.cache);
                return toObservable(resp.result) as Observable<typeof LoadingSym | TOut>;
            }),
            switchAllRx()
        );

    const clearOnCatch =  outObs.pipe(
        catchError(err => {
            cacheState.clear();
            throw err
        })
    );

    return {
        result: clearOnCatch,
        clear: () => cacheState.clear()
    }
}

function mapToRx<T extends {}>(map: T): {
    [K in keyof T]: Observable<RemoveAsync<T[K]>>
} {
    const r = mapObject(map, x => toObservable(x as any));
    return r;
}
/**Extrae el tipo de un Promise/Observable */
type RemovePromise<T> =
    T extends PromiseLike<infer R> ? R :
    T extends Observable<(infer R) | (typeof LoadingSym)> ? R :
    T;

function mapToPromise<T extends {}>(map: T): {
    [K in keyof T]: PromiseLike<RemovePromise<T[K]>>
} {
    const r = mapObject(map, x => valToPromise(x as any));
    return r;
}

export type Rxfy<T> = T | PromiseLike<T> | Observable<T | typeof LoadingSym>;


function createSelectorRxAsync<TDeps extends SelectorMap<any>, TCache extends AsyncCacheSelectorResult<any>>(
    cacheRx: CacheState<SelectorMapOuts<TDeps>, TCache>,
    dependsOn: TDeps,
    mapRx: (curr: SelectorMapOuts<TDeps>) => TCache,
    options: SelectorOptions
) {
    const ret = (input: SelectorMapIn<TDeps>) => {
        const response = runSelectorDeps(cacheRx.get(), dependsOn, input, mapRx, options );
        cacheRx.set(response.cache);
        return response.result;
    };

    //Limpia el cache sync y el cacheRx
    const clear = () => {
        const cache = cacheRx.get();
        if (cache) {
            cache.result.clear();
        }
        cacheRx.clear();
    };

    const func = (input: SelectorMapIn<TDeps>) => {
        const result = ret(input);
        return result.result;
    }

    return {
        call: func,
        clear: clear
    };
}

/**
 * Crea un selector observable, el cual tiene una función que depende de otros selectores que también pueden devolver observables
 */
export function createSelectorRx<TOut, TDeps extends SelectorMap<any>>(
    dependsOn: TDeps, 
    map: SelectorRxMapFunc<TDeps, Rxfy<TOut>>,
    options?: SelectorOptions
    ): Selector<SelectorMapIn<TDeps>, Observable<TOut | typeof LoadingSym>> {

    type SelOuts = SelectorMapOuts<TDeps>;
    let cacheRx = createCacheState<SelOuts, ObsSelectorResult<TOut>>([]);
    let cacheSync = createCacheState<SelOuts, Rxfy<TOut>>([cacheRx]);

    const mapRx = (curr: SelOuts) => {
        //Convierte cada uno de los elementos a observable, note que este elemento puede ser 
        //Promise, Observable o cualquier otro
        const selRx = mapToRx(curr);
        return observableMapSelector(cacheSync, selRx, map, options || {});
    }

    return createSelectorRxAsync(
        cacheRx,
        dependsOn,
        mapRx,
        options || {}
    );
}

export function createSelectorAsync<TOut, TDeps extends SelectorMap<any>>(
    dependsOn: TDeps,
    map: SelectorAsyncMapFunc<TDeps, Prfy<TOut>>,
    options?: SelectorOptions
    )
    : Selector<SelectorMapIn<TDeps>, PromiseLike<TOut>> {
    type SelOuts = SelectorMapOuts<TDeps>;
    let cacheRx = createCacheState<SelOuts, PromSelectorResult<TOut>>([]);
    let cacheSync = createCacheState<SelOuts, Rxfy<TOut>>([cacheRx]);

    const mapRx = (curr: SelOuts) => {
        //Convierte cada uno de los elementos a observable, note que este elemento puede ser 
        //Promise, Observable o cualquier otro
        const selRx = mapToPromise(curr);
        return promiseMapSelector(cacheSync, selRx, map, options || {});
    }

    return createSelectorRxAsync(
        cacheRx,
        dependsOn,
        mapRx,
        options || {}
    );
}