
/**Devuelve true si x tiene el metodo then, lo que indica que es una promesa */
export function isPromiseLike(x: any): x is PromiseLike<any> {
    return x != null && (typeof (x as PromiseLike<any>).then) == "function";
}
