
/**Función que toma el valor anterior y devuelve el siguiente valor */
export interface OnChangeArgumentFunction<T> {
    (prevValue: T): T;
}

/**Firma de la función setState de React */
export interface SetStateFunction<S> {
    (f: (prevState: S) => S, callback?: () => any): void;
}

/**El argumento de una función onChange, este puede ser el valor, en cuyo caso va a sustituir al valor anterior, o una función que toma el valor anterior y devuelve el nuevo valor */
export type OnChangeArgument<T> = T | OnChangeArgumentFunction<T>;

/**Una función onChange la cual toma el siguiente valor o una función para obtener el siguiente valor a partir del valor anterior */
export interface OnChangeFunction<T> {
    (next: OnChangeArgument<T>): Promise<void>;
}


/**Una función onChange la cual toma el siguiente valor tal cual */
export interface OnChangeFunctionStatic<T> {
    (next: T): Promise<void> | void;
}

/**Convierte un argumento de un onChange a una función de onChange */
export function toChangeArgumentFunction<T>(arg: OnChangeArgument<T>): OnChangeArgumentFunction<T> {
    if (typeof (arg) == "function") {
        return arg;
    } else {
        return () => arg;
    }
}

/**Devuelve una función onChange para editar una propiedad de cierto objeto, dada la función onChange para editar todo el objeto
 * @param onChangeThunk Función que devuelve la función onChange del objeto completo
 * @param key Propiedad que se desea editar con el onChange devuelto
 */
export function composeChangeFunction<T extends {}, TKey extends keyof T>(onChangeThunk: () =>( OnChangeFunction<T> | undefined), key: TKey): OnChangeFunction<T[TKey]> {
    type TOut = T[TKey];
    return async (x: OnChangeArgument<TOut>) => {
        const onChange = onChangeThunk();
        if (onChange == null) return;

        const onChangeNext = toChangeArgumentFunction(x);

        //Aplica el cambio sobre el objeto
        await onChange(prev => ({ ... (prev as any), [key]: onChangeNext(prev[key]) }));
    };
}

/**Convierte una función setState a una función onChange, esto nos permite crear componentes no controlados a partir de componentes controlados */
export function onChangeFromSetState<TState, TKey extends keyof TState>(setState: SetStateFunction<TState>, valueKey: TKey): OnChangeFunction<TState[TKey]> {
    type TValue = TState[TKey];
    return async (x: OnChangeArgument<TValue>) => {
        const onChangeNext = toChangeArgumentFunction(x);
        await new Promise(resolve =>
            setState(prev => ({
                ... (prev as any),
                [valueKey]: onChangeNext(prev[valueKey])
            }), resolve));
    }
}

/**Crea una función de onChange que acepta valores y funciones a partir de una que solo acepta el siguiente valor, y del una función para obtener el valor actual
 * @param onChangeThunk Función que obtiene la función de onChange la cual solo acepta el siguiente valor
 * @param valueThunk Obtiene el valor actual
 */
export function onChangeFunctionFromStaticOnChange<T>( onChangeThunk: () =>OnChangeFunction<T>, valueThunk: () => T  ) : OnChangeFunction<T> {
    return async (x: OnChangeArgument<T>) => {
        const onChange = onChangeThunk();
        if (onChange == null) return;
        
        const onChangeNext = toChangeArgumentFunction(x);
        const prevValue = valueThunk();
        const nextValue = onChangeNext(prevValue);

        await onChange(nextValue);
    }
}