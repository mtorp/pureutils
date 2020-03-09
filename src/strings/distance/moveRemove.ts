import { assertUnreachable } from "../../logic";

/**Indica un movimiento de un elemento de la cadena de un indice a otro */
interface StringMove {
    type: "move";
    oldIndex: number;
    newIndex: number;
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

type StringOp<T> = StringMove | StringRemove | StringInsert<T>;

/**Interfaz que funciona tanto para string como para arreglos */
interface IString<TSelf, TItem = any> {
    slice: (startIndex: number, endIndex: number) => TSelf;
    concat: (other: TSelf | TItem) => TSelf;
    readonly length: number;
    readonly [n: number]: TItem;
}

/**Aplica un movimiento de cadena a una cadena */
export function applyStringMove(source: string, move: StringOp<string>): string
export function applyStringMove<T>(source: T[], move: StringOp<T>): T[]
export function applyStringMove<T extends IString<T>>(source: T, move: StringOp<T>): T {
    switch (move.type) {
        case "insert":
            return source.slice(0, move.index).concat(move.values).concat(source.slice(move.index, source.length + 1));
        case "remove":
            return source.slice(0, move.index).concat(source.slice(move.index + 1, source.length +1));
        case "move": {
            if (move.oldIndex == move.newIndex)
                return source;

            if (move.newIndex > move.oldIndex) {
                return source.slice(0, move.oldIndex)
                    .concat(source.slice(move.oldIndex + 1, move.newIndex + 1))
                    .concat(source[move.oldIndex])
                    .concat(source.slice(move.newIndex + 1, source.length + 1))
            };

            return source.slice(0, move.newIndex)
                .concat(source[move.oldIndex])
                .concat(source.slice(move.newIndex, move.oldIndex))
                .concat(source.slice(move.oldIndex + 1, source.length + 1))
                ;
        }
        default:
            return assertUnreachable(move);
    }
}

/**Obtiene la cantidad mínima de movimientos para llegar de source a dest, considerando los movimientos de "move", "remove" y "insert" */
export function getStringMoves<T>(source: T[], dest: T[]): StringOp<T>[] {
    return null as any;
}