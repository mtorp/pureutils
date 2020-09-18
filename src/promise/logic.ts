import { SyncPromise } from "./split";

/**True si la promesa se resuelve síncronamente */
export function isSyncPromise(x: PromiseLike<any>): boolean {
    return syncPromiseValue(x).status != "pending";
}

interface SyncPromiseResult<T> {
    value?: T;
    error?: any;
    status: "resolved" | "error" | "pending"
}

/**Devuelve un objeto con el valor de la promesa si es síncrona, si no, devuelve un objeto indicando que no se pudo obtener su valor*/
export function syncPromiseValue<T>(x: PromiseLike<T>): SyncPromiseResult<T> {
    let sync: SyncPromiseResult<T> = {
        status: "pending"
    };

    x.then((x) => sync = {
        value: x,
        status: "resolved"
    }, err => sync = {
        error: err,
        status: "error"
    });
    return sync;
}



/**Una clase de una promesa */
interface PromiseClass {
    new(executor: (resolve: (value: any) => any) => any) : PromiseLike<any>;
}

/**Devuelve true si una implementación de Promise soporta resolución síncrona */
export function isSyncPromiseType(promiseClass: PromiseClass) {
    return isSyncPromise(new promiseClass((resolve) => resolve(10)));
}

/**
 * Devuelve una promesa que internamente almacena su valor una vez que fue resuelta, de tal manera que al resolverse de nuevo se resuleve de forma síncrona.
 * Esto mejora el rendimiento bastante el rendimiento ya que se puede verificar de forma síncrona si la promesa ya esta resuelta (no se ocupa un estatus intermedio de "cargando")
 * @param x Una promesa
 */
export function toSyncPromise<T>(x: PromiseLike<T>): PromiseLike<T> {
    if (isSyncPromise(x))
        return x;

    return new SyncPromise((resolve, reject) => x.then(resolve, reject));
}

/**Crea una nueva promesa y devuelve por separado la promesa y las funciones que resuelven y rechazan a la promesa */
export function splitPromise<T>(): { promise: PromiseLike<T>, resolve: (value?: T | PromiseLike<T> | undefined) => void, reject: (reason?: any) => void } {
    let resolve = null as any;
    let reject = null as any;

    const promise = new SyncPromise<T>(
        (onfulfilled, onrejected) => {
            resolve = onfulfilled;
            reject = onrejected;
        }
    );

    return { promise, resolve, reject };
}
