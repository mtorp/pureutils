import { assertUnreachable, referenceEquals, indexOf, indicesOf } from "../../logic";

/**Indica un movimiento de un elemento de la cadena de un indice a otro */
interface StringMove {
    type: "move";
    sourceIndex: number;
    destIndex: number;
}

/**Indice borrar un elemento de la cadena */
interface StringRemove {
    type: "remove";
    index: number;
}

/**Indica insertar un caracter nuevo en el string */
interface StringInsert<T> {
    type: "insert";
    /**Indice en donde insertar */
    index: number;
    /**Valores a insertar */
    values: T;
}

/**Duplica un elemento */
interface StringDup<T> {
    type: "dup",
    /**Indice fuente */
    sourceIndex: number;
    /**Indice donde se va a insertar */
    destIndex: number;
}

/**Una operación de movimiento en una cadena */
export type StringMoveOp<T> = StringMove | StringRemove | StringInsert<T> | StringDup<T>;

/**Interfaz que funciona tanto para string como para arreglos */
interface IString<TSelf, TItem = any> extends ArrayLike<TItem> {
    slice: (startIndex: number, endIndex: number) => TSelf;
    concat: (other: TSelf | TItem) => TSelf;
}

/**Aplica un movimiento de cadena a una cadena */
export function applyStringMove(source: string, move: StringMoveOp<string>): string
export function applyStringMove<T>(source: T[], move: StringMoveOp<T>): T[]
export function applyStringMove<T extends IString<T>>(source: T, move: StringMoveOp<T>): T
export function applyStringMove<T extends IString<T>>(source: T, move: StringMoveOp<T>): T {
    switch (move.type) {
        case "insert":
            return source.slice(0, move.index).concat(move.values).concat(source.slice(move.index, source.length + 1));
        case "remove":
            return source.slice(0, move.index).concat(source.slice(move.index + 1, source.length + 1));
        case "move": {
            if (move.sourceIndex == move.destIndex)
                return source;

            if (move.destIndex > move.sourceIndex) {
                return source.slice(0, move.sourceIndex)
                    .concat(source.slice(move.sourceIndex + 1, move.destIndex + 1))
                    .concat(source.slice(move.sourceIndex, move.sourceIndex + 1))
                    .concat(source.slice(move.destIndex + 1, source.length + 1))
            };

            return source.slice(0, move.destIndex)
                .concat(source.slice(move.sourceIndex, move.sourceIndex + 1))
                .concat(source.slice(move.destIndex, move.sourceIndex))
                .concat(source.slice(move.sourceIndex + 1, source.length + 1))
                ;
        }
        case "dup": {
            return source.slice(0, move.destIndex)
                .concat(source.slice(move.sourceIndex, move.sourceIndex + 1))
                .concat(source.slice(move.destIndex, source.length + 1));
        }
        default:
            return assertUnreachable(move);
    }
}



/**Obtiene la cantidad mínima de movimientos para llegar de source a dest, considerando los movimientos de "move", "remove", "insert" y "dup" */
export function getStringMoves<T extends IString<T>>(source: T, dest: T, equals?: (a: any, b: any) => boolean): StringMoveOp<T>[] {
    const eq = equals || referenceEquals;

    let i = 0;

    let ret: StringMoveOp<T>[] = [];
    while (i < dest.length) {
        if (eq(source[i], dest[i])) {
            //Los 2 items encajan, no hay movimientos:
            i++;
            continue;
        }

        const destItem = dest[i];
        const itemSourceIndex = indexOf(source, x => eq(x, destItem));
        if (itemSourceIndex == null) {
            //El elemento es nuevo:
            const mov: StringMoveOp<T> = {
                type: "insert",
                index: i,
                values: dest.slice(i, i + 1)
            };
            ret.push(mov);

            source = applyStringMove<T>(source, mov);
            i++;
            continue;
        }

        //El elemento ya existe en source:
        //Todos los indices donde aparece el elemento, para ver si está repetido
        const itemDestIndices = indicesOf(dest, x => eq(x, destItem));
        const repetido = itemDestIndices.length >= 2;
        if (repetido) {
            const mov: StringMoveOp<T> = {
                type: "dup",
                sourceIndex: itemSourceIndex,
                destIndex: i
            };
            ret.push(mov);

            source = applyStringMove<T>(source, mov);
            i++;
            continue;
        }

        //El elemento no está repetido, es un mov:
        {
            const mov: StringMoveOp<T> = {
                type: "move",
                sourceIndex: itemSourceIndex,
                destIndex: itemDestIndices[0],
            }
            ret.push(mov);

            source = applyStringMove<T>(source, mov);
            i++;
            continue;
        }
    }

    const lastDestIndex = i;
    while(i < source.length){
        //Quitar el resto:
        ret.push({
            type: "remove",
            index: lastDestIndex
        });
        i++;
    }

    return ret;
}