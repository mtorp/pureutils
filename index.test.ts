import { sequenceEquals, shallowEquals, flatten, groupBy, Grouping, deepEquals, pipe, enumObject, setEquals, all, any, arrayToMap, contains, filterObject, first, mapObject, omit, ObjMap, toMap, moveItem, swapItems, upDownItem, promiseAllObj, unique, filterIf, mapKeys, intersect, omitUndefined, single, awaitObj, shallowDiff } from "./index";
test("sequence equals", () => {
    expect(sequenceEquals<any>(null as any, [])).toBe(false);
    expect(sequenceEquals<any>(null as any, null as any)).toBe(true);
    expect(sequenceEquals([], [])).toBe(true);
    expect(sequenceEquals([1, 2], [1, 2])).toBe(true);
    expect(sequenceEquals([1, 2], [1, 2, 3])).toBe(false);
});

test("shallow equals", () => {
    const eq = shallowEquals;
    expect(eq({}, {})).toBe(true);
    expect(eq({ a: 1 }, { a: 1 })).toBe(true);
    expect(eq({ a: 1 }, { a: 2 })).toBe(false);
    expect(eq<any>({ a: 1 }, { a: 1, b: 1 })).toBe(false);
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

test("deep equals", () => {
    const eq = deepEquals;

    expect(eq({}, {})).toBe(true);
    expect(eq({ a: 1 }, { a: 1 })).toBe(true);
    expect(eq({ a: 1 }, { a: 2 })).toBe(false);
    expect(eq<any>({ a: 1 }, { a: 1, b: 1 })).toBe(false);
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

    const a1 = [
        { key: [1, 1], items: ["A", "E"] },
        { key: [1, { x: 10, b: "hello" }], items: ["B", "C", "F"] },
        { key: [2, 1], items: ["D"] },
    ];

    const a2 = [
        { key: [1, 1], items: ["A", "E"] },
        { key: [1, { x: 10, b: "hello" }], items: ["B", "C", "F"] },
        { key: [2, 1], items: ["D"] },
    ];

    const b = [
        { key: [1, 1], items: ["A", "E"] },
        { key: [1, { x: 10, b: "hello" }], items: ["B", "C", "F"] },
        { key: [2, 1], items: ["D", "C"] },
    ];

    const c = [
        { key: [1, 1], items: ["A", "E"] },
        { key: [1, { x: 9, b: "hello" }], items: ["B", "C", "F"] },
        { key: [2, 1], items: ["D"] },
    ];

    expect(eq(a1, a1)).toBe(true);
    expect(eq(a1, a2)).toBe(true);
    expect(eq(a1, b)).toBe(false);
    expect(eq(a1, c)).toBe(false);
});

test("flatten", () => {
    const param = [[1, 2], [3, 4, 5, 6], [], [], [7]];
    const ret = flatten(param);
    const expected = [1, 2, 3, 4, 5, 6, 7];
    expect(sequenceEquals(ret, expected)).toBe(true);
});

test("group by", () => {
    const data = [
        { id: 1, name: "A" },
        { id: 2, name: "B" },
        { id: 2, name: "C" },
        { id: 1, name: "D" },
        { id: 1, name: "E" },
        { id: 2, name: "F" },
    ];

    const expected = [
        { key: 1, items: ["A", "D", "E"] },
        { key: 2, items: ["B", "C", "F"] }
    ];

    const ret = groupBy(data, x => x.id).map(x => ({ ...x, items: x.items.map(y => y.name) }));
    expect(deepEquals(ret, expected)).toBe(true);
});

test("group by composed key", () => {
    const data = [
        { id: [1, 1], name: "A" },
        { id: [1, 2], name: "B" },
        { id: [1, 2], name: "C" },
        { id: [2, 1], name: "D" },
        { id: [1, 1], name: "E" },
        { id: [1, 2], name: "F" },
    ];

    const expected = [
        { key: [1, 1], items: ["A", "E"] },
        { key: [1, 2], items: ["B", "C", "F"] },
        { key: [2, 1], items: ["D"] },
    ];

    const ret = groupBy(data, x => x.id).map(x => ({ ...x, items: x.items.map(y => y.name) }));
    expect(deepEquals(ret, expected)).toBe(true);
});

test("pipe", () => {
    const input = [1, 2, 3, 4];

    const r: string = pipe(
        input,
        (x: number[]) => x.map(y => y * 2),
        (x: number[]) => x.reduce((a, b) => a + b, 0),
        (x: number) => "El numero es " + (x / 2)
    );

    expect(r).toBe("El numero es 10");
});

test("setEquals", () => {
    const a = [1, 2, 3];
    const b = [2, 3, 4];
    const c = [1, 2];
    const d = [3, 3, 2];

    const a2 = [2, 3, 1];
    const a3 = [2, 2, 3, 1];
    const a4 = [3, 2, 1, 1, 2, 3, 1];

    expect(setEquals(a, a2)).toBe(true);
    expect(setEquals(a, a3)).toBe(true);

    expect(setEquals(a, a3)).toBe(true);
    expect(setEquals(a2, a3)).toBe(true);
    expect(setEquals(a2, a4)).toBe(true);
    expect(setEquals(a3, a4)).toBe(true);
    expect(setEquals(a4, a3)).toBe(true);

    expect(setEquals(a, b)).toBe(false);
    expect(setEquals(b, c)).toBe(false);
    expect(setEquals(a, c)).toBe(false);
    expect(setEquals(a, d)).toBe(false);
    expect(setEquals(c, d)).toBe(false);
});

test("setEquals shallowEquals", () => {
    const a1 = [{ x: 1, b: 2 }, { y: 3, z: 2 }];
    const a2 = [{ y: 3, z: 2 }, { b: 2, x: 1 }];

    expect(sequenceEquals(a1, a2)).toBe(false);
    expect(setEquals(a1, a2)).toBe(false);
    expect(setEquals(a1, a2, shallowEquals)).toBe(true);
});

test("enumObject", () => {
    const object = {
        a: 10,
        b: 20,
        c: "rafa"
    };

    const result = enumObject(object);
    const expected: typeof result = [
        { key: "a", value: 10 },
        { key: "b", value: 20 },
        { key: "c", value: "rafa" }
    ];

    expect(sequenceEquals(expected, result, shallowEquals)).toBe(true);
});

test("arrayToObject", () => {
    const array: { key: string, value: string | number }[] = [
        { key: "a", value: 10 },
        { key: "b", value: 20 },
        { key: "c", value: "rafa" }
    ];

    const result = arrayToMap(array);
    const expected = { a: 10, b: 20, c: "rafa" };
    expect(shallowEquals(result, expected)).toBe(true);
});

test("mapObject", () => {
    const input = { a: 1, b: 2, c: 3 };
    const expected = { a: 10, b: 20, c: 30 };
    const result = mapObject(input, x => x * 10);
    expect(shallowEquals(expected, result)).toBe(true);
});

test("filterObject", () => {
    const input = { a: 1, b: 2, c: 3, d: 4 };
    const expected = { c: 3, d: 4 };

    const result = filterObject(input, (value, key) => key == "c" || key == "d");
    expect(shallowEquals(expected, result)).toBe(true);
});

test("omit", () => {
    const input = { a: 1, b: 2, c: 3, d: 4 };
    const expected = { c: 3, d: 4 };
    const result = omit(input, ["a", "b"]);

    expect(shallowEquals(expected, result)).toBe(true);
});

test("swapItems", () => {
    const input = [1, 2, 3, 4, 5];
    const expected = [3, 2, 1, 4, 5];

    const result = swapItems(input, 0, 2);
    expect(sequenceEquals(result, expected)).toBe(true);
});

test("upDownItem", () => {
    const input = [1, 2, 3];
    const a1 = [2, 1, 3];
    const a2 = [1, 3, 2];

    expect(sequenceEquals(a1, upDownItem(input, 1, "up"))).toBe(true);
    expect(sequenceEquals(a1, upDownItem(input, 0, "down"))).toBe(true);

    expect(sequenceEquals(a2, upDownItem(input, 2, "up"))).toBe(true);
    expect(sequenceEquals(a2, upDownItem(input, 1, "down"))).toBe(true);

    expect(sequenceEquals(input, upDownItem(input, 0, "up"))).toBe(true);
    expect(sequenceEquals(input, upDownItem(input, 2, "down"))).toBe(true);
});

test("moveItem", () => {
    const input = [1, 2, 3, 4, 5, 6];
    //mover: 1 al 3
    const a1_3 = [1, 3, 4, 2, 5, 6];

    //mover: 3 al 2
    const a3_1 = [1, 4, 2, 3, 5, 6];

    //mover: 0 al 5
    const a0_5 = [2, 3, 4, 5, 6, 1];
    //mover: 5 al 0
    const a5_0 = [6, 1, 2, 3, 4, 5];

    //mover: 3 al 3
    const a3_3 = input;

    expect(sequenceEquals(a1_3, moveItem(input, 1, 3))).toBe(true);
    expect(sequenceEquals(a3_1, moveItem(input, 3, 1))).toBe(true);
    expect(sequenceEquals(a0_5, moveItem(input, 0, 5))).toBe(true);
    expect(sequenceEquals(a5_0, moveItem(input, 5, 0))).toBe(true);
    expect(sequenceEquals(a3_3, moveItem(input, 3, 3))).toBe(true);
});


test("promise all obj", async () => {

    function prom<T>(value: T) {
        return new Promise<T>(resolve => resolve(value));
    }

    const objProm = {
        a: prom("valor a"),
        b: prom("valor b"),
    };

    const allProm = promiseAllObj(objProm);
    expect(allProm instanceof Promise).toBe(true);

    const all = await allProm;
    expect(shallowEquals(all, { a: "valor a", b: "valor b" })).toBe(true);
});

test("unique", () => {
    const input = [1, 1, 2, 4, 2, 1, 2, 3, 3, 2, 6, 2, 1, 3];
    const expected = [1, 2, 4, 3, 6];

    const result = unique(input);
    expect(shallowEquals(expected, result)).toBe(true);
});

test("filterIf", () => {
    const input = [1, 2, 3, 4, 5];
    const expected = [3, 4, 5];

    const resultA = filterIf(input, x => x > 2, true);
    expect(shallowEquals(expected, resultA)).toBe(true);

    const resultB = filterIf(input, x => x > 2, false);
    expect(shallowEquals(input, resultB)).toBe(true);

});

test("mapKeys", () => {
    const { a, b, c } = {
        a: { key: "A", value: 20 },
        b: { key: "B", value: 10 },
        c: { key: "C", value: 15 }
    };
    const values = [a, b, c];

    const keys = ["B", "C", "C", "A", "B"];
    const expected = [b, c, c, a, b];

    const result = mapKeys(keys, values, x => x.key);
    expect(shallowEquals(expected, result)).toBe(true);
});

test("insersect", () => {
    const a = [1, 2, 3, 4, 5, 6, 7];
    const b = [3, 2, 1, 7, 7, 3];

    const expected = [1, 2, 3, 7];
    const result = intersect(a, b);
    expect(shallowEquals(expected, result)).toBe(true);
});

test("omitUndefined", () => {
    const a = { x: 1, y: undefined };
    const expected = { x: 1 };
    const actual = omitUndefined(a);

    expect(actual).toEqual(expected);
});

test("single", () => {
    expect(single([])).toEqual(undefined);
    expect(single([1, 2])).toEqual(undefined);
    expect(single([1])).toEqual(1);
    expect(single([1, 2], x => x == 2)).toEqual(2);
    expect(single([1, 2, 3], x => x == 2)).toEqual(2);
    expect(single([1, 2, 2], x => x == 2)).toEqual(undefined);
    expect(single([1, 2, 2], x => x == 2)).toEqual(undefined);
});

test("awaitObj", async () => {

    function prom<T>(value: T) {
        return new Promise<T>(resolve => resolve(value));
    }

    const objProm = prom({
        a: 10,
        b: 20,
        c: "que rollo"
    });

    const result = awaitObj(objProm, { a: true, b: true, c: true });

    expect(await result.a).toBe(10);
    expect(await result.b).toBe(20);
    expect(await result.c).toBe("que rollo");
});

test("shallowDiff", () => {
    const a = {
        name: "rafa",
        age: 23,
        hello: { x: 10, y: 20 },
        other: { x: 10, y: 30 },
    };

    const b = {
        name: "rafa",
        age: 22,
        hello: { x: 10, y: 20 },
        other: { x: 10, y: 40 }
    };

    const props = shallowDiff(a, b);
    expect(props).toEqual(["age", "other"]);
});