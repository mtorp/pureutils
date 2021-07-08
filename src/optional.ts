import { any } from "./logic"

type OptionalizeArgs<T> ={ [K in keyof T]: T[K] | undefined}

/**
 * Toma una función que posiblemente no acepte undefined en sus argumentos y devuelve otra que acepta undefined
 * en todos sus argumentos. Al llamar la función resultante, si algun argumento es undefined, 
 * devuelve undefined, si no, llama a la función original. Los nulos no son considerados como undefined.
 */
export function optionalize<TArgs extends any[], TResult>(func: (... x: TArgs) => TResult): (... x: OptionalizeArgs<TArgs>) => TResult | undefined {
    return (... args) => {
        if(any(args, x => x === undefined)) {
            return undefined;
        }

        return func(... args as TArgs);
    }
}