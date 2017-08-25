import { sequenceEquals, shallowEquals, flatten, groupBy, Grouping, deepEquals, pipe, enumObject, setEquals, all, any, arrayToMap, contains, filterObject, first, mapObject, omit, ObjMap, toMap } from "./index";
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
    console.log(result);
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
    const expeceted = { c: 3, d: 4 };
    const result = omit(input, ["a", "b"]);

    expect(shallowEquals(expected, result)).toBe(true);
});