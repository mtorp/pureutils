import { enumObject, any, isObservable, isPromiseLike, mapObject, objRxToRxObj, ObservableMap, ObservableMapToSyncMap, toObservable } from "../logic";
import { Observable, combineLatest as combineLatestRx } from "rxjs";
import { SelectorMap, SelectorOutType, SelectorMapOuts, SelectorMapIn, Selector, SelectorMapFunc, runSelectorDeps, createSelector } from "./selector";
import { SelectorCache, selectorCacheRequest } from "./cache";
import { map as mapRx, map, switchAll as switchAllRx } from "rxjs/operators";



/**Utilizado como elemento de un Observable, indica que el siguiente valor esta cargando */
export const LoadingSym = Symbol("LoadingSym");

/**Extrae el tipo de un Promise/Observable */
type RemoveAsync<T> =
    T extends PromiseLike<infer R> ? R :
    T extends Observable<(infer R) | (typeof LoadingSym)> ? R :
    T;

type SelectorRxMapOuts<T extends SelectorMap> = {
    [K in keyof T]: RemoveAsync<SelectorOutType<T[K]>>
};



/**Una función que mapea un objeto resultante de multiples selectores a una salida */
export interface SelectorRxMapFunc<TDeps extends SelectorMap, TOut> {
    (curr: SelectorRxMapOuts<TDeps>, prev: SelectorRxMapOuts<TDeps> | undefined): TOut;
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

interface ObsSelectorResult<TOut> {
    obs: Observable<TOut | typeof LoadingSym>,
    clear: () => void
}

/**
 * Dado un objeto de observables con los resultados de los selectores dependientes, devuelve un observable
 * con la respuesta del selector representado por la función @param map
 * @param results Resultados de los que este selector depende
 * @param map La función del selector
 */
function observableMapSelector<TResult extends ObservableMap, TOut>(
    results: TResult,
    map: SelectorMapFunc<ObservableMapToSyncMap<TResult>, Rxfy<TOut>>
): ObsSelectorResult<TOut> {
    type SelOuts = ObservableMapToSyncMap<TResult>;
    //El cache de las respuestas sincronas
    let cache: SelectorCache<SelOuts, Rxfy<TOut>> | undefined = undefined;

    //Este es un observable de los valores: 
    const obs = objRxToRxObj(results);

    const outObs =
        obs.pipe(
            mapRx(args => {
                if (anyLoading(args)) {
                    return toObservable(LoadingSym) as Observable<typeof LoadingSym | TOut>;
                }

                const resp = selectorCacheRequest(cache, {
                    args: args,
                    func: map
                });

                //Actualizar el cache:
                cache = resp.cache;
                return toObservable(resp.result) as Observable<typeof LoadingSym | TOut>;
            }),
            switchAllRx()
        );

    return {
        obs: outObs,
        clear: () => cache = undefined
    }
}

function mapToRx<T extends {}>(map: T): {
    [K in keyof T]: Observable<RemoveAsync<T[K]>>
} {
    const r = mapObject(map, x => toObservable(x as any));
    return r;
}

export type Rxfy<T> = T | PromiseLike<T> | Observable<T | typeof LoadingSym>;

export function createSelectorRx<TOut, TDeps extends SelectorMap>(dependsOn: TDeps, map: SelectorRxMapFunc<TDeps, Rxfy< TOut>>): Selector<SelectorMapIn<TDeps>, Observable<TOut | typeof LoadingSym>> {
    type SelOuts = SelectorMapOuts<TDeps>;
    let cacheRx: SelectorCache<SelOuts, ObsSelectorResult<TOut>> | undefined = undefined;

    const mapRx = (curr: SelOuts) => {
        //Convierte cada uno de los elementos a observable, note que este elemento puede ser 
        //Promise, Observable o cualquier otro
        const selRx = mapToRx(curr);
        return observableMapSelector(selRx, map);
    }

    const ret = (input: SelectorMapIn<TDeps>) => {
        const response = runSelectorDeps(cacheRx, dependsOn, input, mapRx);
        cacheRx = response.cache;
        return response.result;
    };

    //Limpia el cache sync y el cacheRx
    const clear = () => {
        if(cacheRx) {
            cacheRx.result.clear();
        }
        cacheRx = undefined;
    };

    const  func = (input: SelectorMapIn<TDeps>) => {
        const result = ret(input);
        return result.obs;
    }

    return {
        func: func,
        clear: clear
    }
}