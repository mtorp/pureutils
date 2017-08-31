"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
test("sequence equals", function () {
    expect(index_1.sequenceEquals(null, [])).toBe(false);
    expect(index_1.sequenceEquals(null, null)).toBe(true);
    expect(index_1.sequenceEquals([], [])).toBe(true);
    expect(index_1.sequenceEquals([1, 2], [1, 2])).toBe(true);
    expect(index_1.sequenceEquals([1, 2], [1, 2, 3])).toBe(false);
});
test("shallow equals", function () {
    var eq = index_1.shallowEquals;
    expect(eq({}, {})).toBe(true);
    expect(eq({ a: 1 }, { a: 1 })).toBe(true);
    expect(eq({ a: 1 }, { a: 2 })).toBe(false);
    expect(eq({ a: 1 }, { a: 1, b: 1 })).toBe(false);
    expect(eq({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(eq(2, 1)).toBe(false);
    expect(eq(2, 2)).toBe(true);
    expect(eq("rafa", "rafa")).toBe(true);
    expect(eq("ee", "aa")).toBe(false);
    expect(eq(true, true)).toBe(true);
    expect(eq(true, false)).toBe(false);
    expect(eq(false, false)).toBe(true);
    expect(eq([], [])).toBe(true);
    expect(eq([1, 2], [1, 2])).toBe(true);
    expect(eq([1, 2], [2, 1])).toBe(false);
    expect(eq([1, 2], [2])).toBe(false);
    expect(eq([1, 2], [3, 4])).toBe(false);
});
test("deep equals", function () {
    var eq = index_1.deepEquals;
    expect(eq({}, {})).toBe(true);
    expect(eq({ a: 1 }, { a: 1 })).toBe(true);
    expect(eq({ a: 1 }, { a: 2 })).toBe(false);
    expect(eq({ a: 1 }, { a: 1, b: 1 })).toBe(false);
    expect(eq({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(eq(2, 1)).toBe(false);
    expect(eq(2, 2)).toBe(true);
    expect(eq("rafa", "rafa")).toBe(true);
    expect(eq("ee", "aa")).toBe(false);
    expect(eq(true, true)).toBe(true);
    expect(eq(true, false)).toBe(false);
    expect(eq(false, false)).toBe(true);
    expect(eq([], [])).toBe(true);
    expect(eq([1, 2], [1, 2])).toBe(true);
    expect(eq([1, 2], [2, 1])).toBe(false);
    expect(eq([1, 2], [2])).toBe(false);
    expect(eq([1, 2], [3, 4])).toBe(false);
    var a1 = [
        { key: [1, 1], items: ["A", "E"] },
        { key: [1, { x: 10, b: "hello" }], items: ["B", "C", "F"] },
        { key: [2, 1], items: ["D"] },
    ];
    var a2 = [
        { key: [1, 1], items: ["A", "E"] },
        { key: [1, { x: 10, b: "hello" }], items: ["B", "C", "F"] },
        { key: [2, 1], items: ["D"] },
    ];
    var b = [
        { key: [1, 1], items: ["A", "E"] },
        { key: [1, { x: 10, b: "hello" }], items: ["B", "C", "F"] },
        { key: [2, 1], items: ["D", "C"] },
    ];
    var c = [
        { key: [1, 1], items: ["A", "E"] },
        { key: [1, { x: 9, b: "hello" }], items: ["B", "C", "F"] },
        { key: [2, 1], items: ["D"] },
    ];
    expect(eq(a1, a1)).toBe(true);
    expect(eq(a1, a2)).toBe(true);
    expect(eq(a1, b)).toBe(false);
    expect(eq(a1, c)).toBe(false);
});
test("flatten", function () {
    var param = [[1, 2], [3, 4, 5, 6], [], [], [7]];
    var ret = index_1.flatten(param);
    var expected = [1, 2, 3, 4, 5, 6, 7];
    expect(index_1.sequenceEquals(ret, expected)).toBe(true);
});
test("group by", function () {
    var data = [
        { id: 1, name: "A" },
        { id: 2, name: "B" },
        { id: 2, name: "C" },
        { id: 1, name: "D" },
        { id: 1, name: "E" },
        { id: 2, name: "F" },
    ];
    var expected = [
        { key: 1, items: ["A", "D", "E"] },
        { key: 2, items: ["B", "C", "F"] }
    ];
    var ret = index_1.groupBy(data, function (x) { return x.id; }).map(function (x) { return (__assign({}, x, { items: x.items.map(function (y) { return y.name; }) })); });
    expect(index_1.deepEquals(ret, expected)).toBe(true);
});
test("group by composed key", function () {
    var data = [
        { id: [1, 1], name: "A" },
        { id: [1, 2], name: "B" },
        { id: [1, 2], name: "C" },
        { id: [2, 1], name: "D" },
        { id: [1, 1], name: "E" },
        { id: [1, 2], name: "F" },
    ];
    var expected = [
        { key: [1, 1], items: ["A", "E"] },
        { key: [1, 2], items: ["B", "C", "F"] },
        { key: [2, 1], items: ["D"] },
    ];
    var ret = index_1.groupBy(data, function (x) { return x.id; }).map(function (x) { return (__assign({}, x, { items: x.items.map(function (y) { return y.name; }) })); });
    expect(index_1.deepEquals(ret, expected)).toBe(true);
});
test("pipe", function () {
    var input = [1, 2, 3, 4];
    var r = index_1.pipe(input, function (x) { return x.map(function (y) { return y * 2; }); }, function (x) { return x.reduce(function (a, b) { return a + b; }, 0); }, function (x) { return "El numero es " + (x / 2); });
    expect(r).toBe("El numero es 10");
});
test("setEquals", function () {
    var a = [1, 2, 3];
    var b = [2, 3, 4];
    var c = [1, 2];
    var d = [3, 3, 2];
    var a2 = [2, 3, 1];
    var a3 = [2, 2, 3, 1];
    var a4 = [3, 2, 1, 1, 2, 3, 1];
    expect(index_1.setEquals(a, a2)).toBe(true);
    expect(index_1.setEquals(a, a3)).toBe(true);
    expect(index_1.setEquals(a, a3)).toBe(true);
    expect(index_1.setEquals(a2, a3)).toBe(true);
    expect(index_1.setEquals(a2, a4)).toBe(true);
    expect(index_1.setEquals(a3, a4)).toBe(true);
    expect(index_1.setEquals(a4, a3)).toBe(true);
    expect(index_1.setEquals(a, b)).toBe(false);
    expect(index_1.setEquals(b, c)).toBe(false);
    expect(index_1.setEquals(a, c)).toBe(false);
    expect(index_1.setEquals(a, d)).toBe(false);
    expect(index_1.setEquals(c, d)).toBe(false);
});
test("setEquals shallowEquals", function () {
    var a1 = [{ x: 1, b: 2 }, { y: 3, z: 2 }];
    var a2 = [{ y: 3, z: 2 }, { b: 2, x: 1 }];
    expect(index_1.sequenceEquals(a1, a2)).toBe(false);
    expect(index_1.setEquals(a1, a2)).toBe(false);
    expect(index_1.setEquals(a1, a2, index_1.shallowEquals)).toBe(true);
});
test("enumObject", function () {
    var object = {
        a: 10,
        b: 20,
        c: "rafa"
    };
    var result = index_1.enumObject(object);
    var expected = [
        { key: "a", value: 10 },
        { key: "b", value: 20 },
        { key: "c", value: "rafa" }
    ];
    expect(index_1.sequenceEquals(expected, result, index_1.shallowEquals)).toBe(true);
});
test("arrayToObject", function () {
    var array = [
        { key: "a", value: 10 },
        { key: "b", value: 20 },
        { key: "c", value: "rafa" }
    ];
    var result = index_1.arrayToMap(array);
    var expected = { a: 10, b: 20, c: "rafa" };
    expect(index_1.shallowEquals(result, expected)).toBe(true);
});
test("mapObject", function () {
    var input = { a: 1, b: 2, c: 3 };
    var expected = { a: 10, b: 20, c: 30 };
    var result = index_1.mapObject(input, function (x) { return x * 10; });
    expect(index_1.shallowEquals(expected, result)).toBe(true);
});
test("filterObject", function () {
    var input = { a: 1, b: 2, c: 3, d: 4 };
    var expected = { c: 3, d: 4 };
    var result = index_1.filterObject(input, function (value, key) { return key == "c" || key == "d"; });
    expect(index_1.shallowEquals(expected, result)).toBe(true);
});
test("omit", function () {
    var input = { a: 1, b: 2, c: 3, d: 4 };
    var expected = { c: 3, d: 4 };
    var result = index_1.omit(input, ["a", "b"]);
    expect(index_1.shallowEquals(expected, result)).toBe(true);
});
test("swapItems", function () {
    var input = [1, 2, 3, 4, 5];
    var expected = [3, 2, 1, 4, 5];
    var result = index_1.swapItems(input, 0, 2);
    expect(index_1.sequenceEquals(result, expected)).toBe(true);
});
test("upDownItem", function () {
    var input = [1, 2, 3];
    var a1 = [2, 1, 3];
    var a2 = [1, 3, 2];
    expect(index_1.sequenceEquals(a1, index_1.upDownItem(input, 1, "up"))).toBe(true);
    expect(index_1.sequenceEquals(a1, index_1.upDownItem(input, 0, "down"))).toBe(true);
    expect(index_1.sequenceEquals(a2, index_1.upDownItem(input, 2, "up"))).toBe(true);
    expect(index_1.sequenceEquals(a2, index_1.upDownItem(input, 1, "down"))).toBe(true);
    expect(index_1.sequenceEquals(input, index_1.upDownItem(input, 0, "up"))).toBe(true);
    expect(index_1.sequenceEquals(input, index_1.upDownItem(input, 2, "down"))).toBe(true);
});
test("moveItem", function () {
    var input = [1, 2, 3, 4, 5, 6];
    //mover: 1 al 3
    var a1_3 = [1, 3, 4, 2, 5, 6];
    //mover: 3 al 2
    var a3_1 = [1, 4, 2, 3, 5, 6];
    //mover: 0 al 5
    var a0_5 = [2, 3, 4, 5, 6, 1];
    //mover: 5 al 0
    var a5_0 = [6, 1, 2, 3, 4, 5];
    //mover: 3 al 3
    var a3_3 = input;
    expect(index_1.sequenceEquals(a1_3, index_1.moveItem(input, 1, 3))).toBe(true);
    expect(index_1.sequenceEquals(a3_1, index_1.moveItem(input, 3, 1))).toBe(true);
    expect(index_1.sequenceEquals(a0_5, index_1.moveItem(input, 0, 5))).toBe(true);
    expect(index_1.sequenceEquals(a5_0, index_1.moveItem(input, 5, 0))).toBe(true);
    expect(index_1.sequenceEquals(a3_3, index_1.moveItem(input, 3, 3))).toBe(true);
});
test("promise all obj", function () { return __awaiter(_this, void 0, void 0, function () {
    function prom(value) {
        return new Promise(function (resolve) { return resolve(value); });
    }
    var objProm, allProm, all;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                objProm = {
                    a: prom("valor a"),
                    b: prom("valor b"),
                };
                allProm = index_1.promiseAllObj(objProm);
                expect(allProm instanceof Promise).toBe(true);
                return [4 /*yield*/, allProm];
            case 1:
                all = _a.sent();
                expect(index_1.shallowEquals(all, { a: "valor a", b: "valor b" })).toBe(true);
                return [2 /*return*/];
        }
    });
}); });
test("unique", function () {
    var input = [1, 1, 2, 4, 2, 1, 2, 3, 3, 2, 6, 2, 1, 3];
    var expected = [1, 2, 4, 3, 6];
    var result = index_1.unique(input);
    expect(index_1.shallowEquals(expected, result)).toBe(true);
});
test("filterIf", function () {
    var input = [1, 2, 3, 4, 5];
    var expected = [3, 4, 5];
    var resultA = index_1.filterIf(input, function (x) { return x > 2; }, true);
    expect(index_1.shallowEquals(expected, resultA)).toBe(true);
    var resultB = index_1.filterIf(input, function (x) { return x > 2; }, false);
    expect(index_1.shallowEquals(input, resultB)).toBe(true);
});
test("mapKeys", function () {
    var _a = {
        a: { key: "A", value: 20 },
        b: { key: "B", value: 10 },
        c: { key: "C", value: 15 }
    }, a = _a.a, b = _a.b, c = _a.c;
    var values = [a, b, c];
    var keys = ["B", "C", "C", "A", "B"];
    var expected = [b, c, c, a, b];
    var result = index_1.mapKeys(keys, values, function (x) { return x.key; });
    expect(index_1.shallowEquals(expected, result)).toBe(true);
});
test("insersect", function () {
    var a = [1, 2, 3, 4, 5, 6, 7];
    var b = [3, 2, 1, 7, 7, 3];
    var expected = [1, 2, 3, 7];
    var result = index_1.intersect(a, b);
    expect(index_1.shallowEquals(expected, result)).toBe(true);
});
