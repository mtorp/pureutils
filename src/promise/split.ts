import { isPromiseLike } from "./logic";

interface ThenArg<T> {
    onfulfilled: ((value: T) => any | PromiseLike<any>) | undefined | null,
    onrejected: ((reason: any) => any | PromiseLike<any>) | undefined | null
}

/**Muy similar al @see Promise pero si el resolve se ejecuta inmediatamente la promesa se resuelve síncronamente
 * Esto permite obtener el valor de una promesa resuelta sincronamente con el @see syncPromiseValue
 * Puede convertir una promesa de javascript a un SyncPromise con el @see toSyncPromise, aunque no tendrá el comportamiento síncrono
 * 
 * Para que una promesa sea sincrona desde su origen debe de ser creada de forma síncrona, ya sea construyendo esta clase o con los metodos para crear promesas como
 * @see synResolve @see syncFail @see splitPromise
 * 
 * Note que @see delay(0) no devuelve una promesa síncrona
 */
export class SyncPromise<T> implements PromiseLike<T>  {
    constructor(executor: (
        resolve: (value?: T | PromiseLike<T>) => void,
        reject: (reason?: any) => void
    ) => void) {
        executor(this.resolve, this.reject);
    }

    resolve: (value?: T | PromiseLike<T>) => void = value => {
        if(isPromiseLike(value)){
            value.then(this.resolve, this.reject);
            return;
        }

        this.syncResolve(value);
    };

    private syncResolve: (value?: T) => void = (value) => {
        this.value = value;
        this.status = "resolved";
        this.callListeners();
    }

    reject: (reason?: any) => void = reason => {
        this.error = reason;
        this.status = "error";
        this.callListeners();
    }

    listeners: (() => void)[] = [];
    callListeners = () => {
        for (const l of this.listeners)
            l();
    }

    value?: T;
    error?: any;
    status: "pending" | "resolved" | "error" = "pending";

    callThenArg = <TResult1 = T, TResult2 = never>(arg: ThenArg<T>): TResult1 | PromiseLike<TResult1 | TResult2> => {
        if (this.status == "pending")
            throw new Error("Aun no se puede llamar a los thenArgs");

        switch (this.status) {
            case "resolved":
                if (arg.onfulfilled) {
                    return arg.onfulfilled(this.value as T);
                }

                return this.value! as any;
            case "error":
                if (arg.onrejected) {
                    return arg.onrejected(this.error);
                }

                return this.error;
        }
    }

    then<TResult1 = T, TResult2 = never>(
        onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
        onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null):
        PromiseLike<any> {

        switch (this.status) {
            case "pending":
                {
                    const onF = onfulfilled;
                    return new SyncPromise<T>((resolve, reject) => {
                        return this.listeners.push(() => {
                            const value = this.callThenArg({ onfulfilled, onrejected });
                            if (this.status == "resolved" || onrejected)
                                resolve(value);
                            else {
                                reject(value);
                            }
                        });
                    })
                }
            case "resolved":
                {
                    if (onfulfilled) {
                        const ret = onfulfilled(this.value!);
                        if (isPromiseLike(ret)) {
                            return ret;
                        } else {
                            return syncResolve(ret!);
                        }

                    }
                    return syncResolve(this.value!);
                }
            case "error":
                {
                    if (onrejected) {
                        const ret = onrejected(this.error);
                        if (isPromiseLike(ret))
                            return ret;
                        else
                            return syncResolve(ret);
                    }
                    debugger;
                    return syncFail(this.error);
                }
        }
    }

}


/**Devuelve una promesa que se resuelve síncronamente con el valor especificado, esto es diferente a Promise.resolve(x) ya que el metodo then del Promise.resolve() no se resuleve inmediatamente después de construir la promesa */
export function syncResolve<T>(x: T | PromiseLike<T>): PromiseLike<T>
export function syncResolve(): PromiseLike<void>
export function syncResolve<T = void>(x?: T): PromiseLike<T> {
    return new SyncPromise<T>((resolve) => resolve(x));
}


/**Devuelve una promesa que se resuelve síncronamente con el valor especificado, esto es diferente a Promise.resolve(x) ya que el metodo then del Promise.resolve() no se resuleve inmediatamente después de construir la promesa */
export function syncFail(reason: any): PromiseLike<any>
export function syncFail(reason: any): PromiseLike<any> {
    return new SyncPromise<any>((resolve, reject) => reject(reason));
}
