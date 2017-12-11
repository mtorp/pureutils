"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**Arregla el problema con las librearias que han sido exportadas con babel 5 o con el plugin babel-plugin-add-module-exports, obteniendo el default del modulo.
 *
 * Para utilizar la función en lugar de escribir;
 * import moize from "moize";
 *
 * Escriba;
 * import * as _moize from "moize";
 * const moize = interopRequireDefault(_moize);
 */
function interopRequireDefault(module) {
    var obj = module;
    return obj.default ? obj.default : obj;
}
exports.interopRequireDefault = interopRequireDefault;
