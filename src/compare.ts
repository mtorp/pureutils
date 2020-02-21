import { referenceEquals, shallowEquals, union, all } from "./logic";

/**Una función de igualdad */
interface EqualsFunction {
    (a: any, b: any): boolean;
}


export type ShallowEqualsConfig<T> = {
    [K in keyof T]?: EqualsFunction
}

/**
 * Si a y b son funciones, devuelve true.
 * Si no, devuelve a === b.
 * 
 * Útil para comparar props de componentes de react, donde no importa si cambian las funciones pero si importa si cambian todos los demás props
 * @param a 
 * @param b 
 */
export function referenceFuncIgnoreEquals(a: any, b: any): boolean {
    if (typeof (a) == "function" && typeof (b) == "function") {
        return true;
    }

    return a === b;
}

/**Compara cada uno de los props del objeto con un comparador custom por cada key,
 * útil para comparar props en el shouldComponentUpdate de react.
 * 
 * Si una propiedad existe en un valor no pero en el otro no si se compara ese par de propiedades, con undefined para la parte que no tiene la propiedad
 * @param config Indica por cada propiedad que comparador usar
 * Si se especifica null ese prop no se va a comparar
 * @param defaultComparer Comparador que se usa para las propiedades que no se especifiquen en el config. Si no se especifica se usa el operador
 * === para comparar
 * 
*/
export function shallowEqualsCustom<T extends {}>(
    a: T,
    b: T,
    config: ShallowEqualsConfig<T>,
    defaultComparer?: EqualsFunction
) {
    const props = union(Object.keys(a), Object.keys(b)) as (keyof T)[];
    const valueProps = props.map(x => ({
        comparer: (config[x] as EqualsFunction) || defaultComparer || referenceEquals,
        a: a[x],
        b: b[x]
    }));

    const compares = valueProps.map(x => x.comparer(x.a, x.b));
    const ret = all(compares);
    return ret;
}