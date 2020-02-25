import { regexParse, RegexToken } from "./regex";

test("regex parse", () => {
    /**Regex de un parametro de la formula en la forma [ABC.01] o [ABC].[01] donde ABC es el código de estudio y 01 el numero de parametro */
    const paramRegex = /\[([a-z]+)(?:(?:\.)|(?:\]\.\[))([\d]+)\]/i;

    /**Regex de un operador o parentesis */
    const operatorRegex = /\(|\)|\*|\/|\+|\-/;

    /**Regex de una constante numerica */
    const numRegex = /[\d]+(?:\.[\d]+)?/;

    const text = "([EGO].[44]) + [EGO.45]*5";
    debugger;
    const ret = regexParse(text, [paramRegex, numRegex, operatorRegex]);

    const expected: RegexToken[] = [
        {
            value: "(",
            regex: operatorRegex,
            groups: []
        }, {
            value: "[EGO].[44]",
            regex: paramRegex,
            groups: ["EGO", "44"]
        }, {
            value: ")",
            regex: operatorRegex,
            groups: []
        }, {
            value: " "
        }, {
            value: "+",
            regex: operatorRegex,
            groups: []
        }, {
            value: " ",
        }, {
            value: "[EGO.45]",
            regex: paramRegex,
            groups: ["EGO", "45"]
        }, {
            value: "*",
            regex: operatorRegex,
            groups: []
        }, {
            value: "5",
            regex: numRegex,
            groups: []
        }
    ];

    expect(ret).toEqual(expected);
})