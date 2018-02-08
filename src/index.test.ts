import {
    sequenceEquals, shallowEquals, flatten, groupBy, Grouping,
    deepEquals, pipe, enumObject, setEquals, all, any, arrayToMap, contains, filterObject, first, mapObject, omit, ObjMap, toMap, moveItem, swapItems, upDownItem, promiseAllObj,
    unique, filterIf, mapKeys, intersect, omitUndefined, single, awaitObj, shallowDiff, range, sort, defaultComparer, orderBy, orderByDesc,
    truncateDate, addDate, rxFlatten, take, firstMap, duplicatesOnEdit, duplicatesOnAdd, toObservable, isArray, isArrayLike, isPromise, isObservable,
    search, removeDiacritics, containsAll, containsAny, nullsafe, mapPreviousRx, mapMany, runningTotal, mapPrevious, formatNumber, formatDate, formatDateExcel,
    cloneFunction, bindFunction, unbindFunction, createSelector, delay, createDeepSelector, uuid, allEqual, pick, zip, binarySearch, exclude,
    isSubset, innerJoin, leftJoin, unionKey, combinePath
} from "./index";

import * as rx from "rxjs";

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

    expect(eq(new Date(2016, 13, 11), new Date(2016, 13, 11))).toBe(true);
    expect(eq(new Date(2016, 13, 11), new Date(2016, 13, 20))).toBe(false);

    const promA = Promise.resolve(1);
    const promB = Promise.resolve(1);
    const promC = Promise.resolve(2);

    //Shallow equals compara por referencia en caso de que sean promesas u observables:
    expect(eq(promA, promA)).toBe(true);
    expect(eq(promA, promB)).toBe(false);
    expect(eq(promA, promC)).toBe(false);

    const obsA = rx.Observable.fromPromise(promA);
    const obsB = rx.Observable.fromPromise(promA);
    const obsC = rx.Observable.fromPromise(promC);

    expect(eq(obsA, obsA)).toBe(true);
    expect(eq(obsA, obsB)).toBe(false);
    expect(eq(obsA, obsC)).toBe(false);

    //Tambien comapra por referencia a las funciones
    const funcA = (x: number) => 10;
    const funcB = (x: number) => 10;
    const funcC = (x: number) => 20;

    expect(eq(funcA, funcA)).toBe(true);
    expect(eq(funcA, funcB)).toBe(false);
    expect(eq(funcA, funcC)).toBe(false);


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

    expect(eq(new Date(2016, 13, 11), new Date(2016, 13, 11))).toBe(true);
    expect(eq(new Date(2016, 13, 11), new Date(2016, 13, 20))).toBe(false);

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

    const promA = Promise.resolve(1);
    const promB = Promise.resolve(1);
    const promC = Promise.resolve(2);

    //Shallow equals compara por referencia en caso de que sean promesas u observables:
    expect(eq(promA, promA)).toBe(true);
    expect(eq(promA, promB)).toBe(false);
    expect(eq(promA, promC)).toBe(false);

    const obsA = rx.Observable.fromPromise(promA);
    const obsB = rx.Observable.fromPromise(promA);
    const obsC = rx.Observable.fromPromise(promC);

    expect(eq(obsA, obsA)).toBe(true);
    expect(eq(obsA, obsB)).toBe(false);
    expect(eq(obsA, obsC)).toBe(false);

    //Tambien comapra por referencia a las funciones
    const funcA = (x: number) => 10;
    const funcB = (x: number) => 10;
    const funcC = (x: number) => 20;

    expect(eq(funcA, funcA)).toBe(true);
    expect(eq(funcA, funcB)).toBe(false);
    expect(eq(funcA, funcC)).toBe(false);
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
    const result = mapObject(input, x => (x as number) * 10);
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

test("shallowDiff 1", () => {
    const hello = { x: 10, y: 20 };
    const a = {
        name: "rafa",
        age: 23,
        hello2: hello,
        other: { x: 10, y: 30 },
    };

    const b = {
        name: "rafa",
        age: 22,
        hello2: hello,
        other: { x: 10, y: 40 }
    };
    expect(a.hello2).toBe(b.hello2);

    const props = shallowDiff(a, b);
    expect(props).toEqual({ age: true, other: true });
});

test("shallowDiff 2", () => {
    const a = {
        name: "rafa",
    };

    const b = {
        name: "rafa",
        age: 22,
    };

    const props = shallowDiff(a, b);
    expect(props).toEqual({ age: true });
});

test("shallowDiff 3", () => {
    const obj = {};
    const a = {
        x: {},
        y: obj
    };

    const b = {
        x: {},
        y: obj
    };

    const props = shallowDiff(a, b);
    expect(props).toEqual({ x: true });
});


test("range", () => {

    expect(range(4, 3, 2)).toEqual([4, 6, 8]);
});

test("awaitObj subtype", async () => {

    function prom<T>(value: T) {
        return new Promise<T>(resolve => resolve(value));
    }

    const objProm = prom({
        a: 10,
        b: 20,
        c: "que rollo"
    });

    const result = awaitObj(objProm, { a: true, c: true });

    expect(await result.a).toBe(10);
    expect(await result.c).toBe("que rollo");
});

test("sort", () => {
    const a = [3, 4, 2, 1, 5];
    const result = sort(a);
    expect(result).toEqual([1, 2, 3, 4, 5]);
    //Verificamos que no se modifico el arreglo original:
    expect(a).toEqual([3, 4, 2, 1, 5]);

    const resultStable = sort(a, (a, b) => 0);
    expect(resultStable).toEqual([3, 4, 2, 1, 5]);

    const resultInverse = sort(a, (a, b) => b - a);
    expect(resultInverse).toEqual([5, 4, 3, 2, 1]);

    const obj = a.map(x => ({ value: x }));
    const objStable = sort(obj);
    expect(objStable).toEqual([{ value: 3 }, { value: 4 }, { value: 2 }, { value: 1 }, { value: 5 }]);

    const objSort = sort(obj, (a, b) => defaultComparer(a.value, b.value));
    expect(objSort).toEqual([{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }]);
});

test("order by", () => {
    const {
        x, y, z, w, a, b
    } = {
            x: { value: 4, name: "a" },
            y: { value: 3, name: "b" },
            z: { value: 1, name: "d" },
            w: { value: 5, name: "c" },
            a: { value: 6, name: "f" },
            b: { value: 2, name: "f" },
        };

    const data = [x, y, z, w, a, b];

    const nameThenValueResult = orderBy(data, x => x.name, x => x.value);
    const nameThenValueExpected = [x, y, w, z, b, a];
    expect(nameThenValueResult).toEqual(nameThenValueExpected);

    const valueResult = orderBy(data, x => x.value);
    const valueExpected = [z, b, y, x, w, a];
    expect(valueResult).toEqual(valueExpected);


    const nameResult = orderBy(data, x => x.name);
    const nameExpected = [x, y, w, z, a, b];
    expect(nameResult).toEqual(nameExpected);
});

test("truncate date", () => {
    const test = new Date(2017, 9, 10, 8, 52, 32, 542);
    const seconds = new Date(2017, 9, 10, 8, 52, 32);
    const minutes = new Date(2017, 9, 10, 8, 52);
    const hours = new Date(2017, 9, 10, 8);
    const days = new Date(2017, 9, 10);
    const months = new Date(2017, 9);
    const years = new Date(2017, 0);

    expect(truncateDate(test, "milliseconds")).toEqual(test);
    expect(truncateDate(test, "seconds")).toEqual(seconds);
    expect(truncateDate(test, "minutes")).toEqual(minutes);
    expect(truncateDate(test, "hours")).toEqual(hours);
    expect(truncateDate(test, "days")).toEqual(days);
    expect(truncateDate(test, "months")).toEqual(months);
    expect(truncateDate(test, "years")).toEqual(years);

});

test("add to date", () => {
    const test = new Date(2017, 9, 10, 8, 52, 32, 542);
    //A todos se le suman 100 unidades
    const plusMilliseconds = new Date(2017, 9, 10, 8, 52, 32, 642);
    const plusSeconds = new Date(2017, 9, 10, 8, 54, 12, 542);
    const plusMinutes = new Date(2017, 9, 10, 10, 32, 32, 542);
    const plusDays = new Date(2018, 0, 18, 8, 52, 32, 542);
    const plusMonths = new Date(2026, 1, 10, 8, 52, 32, 542);
    const plusYear = new Date(2117, 9, 10, 8, 52, 32, 542);

    expect(addDate(test, "milliseconds", 100)).toEqual(plusMilliseconds);
    expect(addDate(test, "seconds", 100)).toEqual(plusSeconds);
    expect(addDate(test, "minutes", 100)).toEqual(plusMinutes);
    expect(addDate(test, "days", 100)).toEqual(plusDays);
    expect(addDate(test, "months", 100)).toEqual(plusMonths);
    expect(addDate(test, "years", 100)).toEqual(plusYear);
});

test("rx flatten", async () => {
    const arr = rx.Observable.from([1, 2,
        Promise.resolve(3),
        Promise.resolve(4),
        rx.Observable.from([5, 6, 7]),
        rx.Observable.from([8, 9]),
    ]);

    const flat = await rxFlatten(arr).toArray().toPromise();
    expect(flat).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test("to observable", async () => {
    const value = 10;
    const prom = Promise.resolve(30);
    const obs = rx.Observable.from([1, 2, 3]);

    expect(await toObservable(value).toArray().toPromise()).toEqual([10]);
    expect(await toObservable(prom).toArray().toPromise()).toEqual([30]);
    expect(await toObservable(obs).toArray().toPromise()).toEqual([1, 2, 3]);
});

test("take firstMap", async () => {
    const arr = [1, 2, 3, 4];
    expect(take(arr, 2)).toEqual([1, 2]);
    expect(firstMap(arr, x => x == 3, x => "R" + x)).toBe("R3");
    expect(firstMap(arr, x => x == 5, x => "R" + x)).toBe(undefined);
});

test("duplicates on edit", async () => {
    const arr = [
        { a: 10, b: 20 },
        { a: 20, b: 30 },
        { a: 30, b: 40 },
        { a: 40, b: 50 },
    ];

    expect(duplicatesOnEdit(arr, { a: 20, b: 30 }, { a: 20, b: 30 }, x => x)).toBe(false);
    expect(duplicatesOnEdit(arr, { a: 20, b: 30 }, { a: 10, b: 20 }, x => x)).toBe(true);
    expect(duplicatesOnEdit(arr, { a: 20, b: 30 }, { a: 40, b: 50 }, x => x)).toBe(true);
    expect(duplicatesOnEdit(arr, { a: 20, b: 30 }, { a: 40, b: 20 }, x => x)).toBe(false);
});

test("duplicates on add", async () => {
    const arr = [
        { a: 10, b: 20 },
        { a: 20, b: 30 },
        { a: 30, b: 40 },
        { a: 40, b: 50 },
    ];

    expect(duplicatesOnAdd(arr, { a: 20, b: 30 }, x => x)).toBe(true);
    expect(duplicatesOnAdd(arr, { a: 50, b: 50 }, x => x)).toBe(false);
});

test("is x type", () => {
    const a = 10;
    const b = new Promise(resolve => { });
    const c = toObservable(b);
    const d = [1, 2, 3];
    const e = null;

    expect(isArray(a)).toBe(false);
    expect(isArray(b)).toBe(false);
    expect(isArray(c)).toBe(false);
    expect(isArray(d)).toBe(true);
    expect(isArray(e)).toBe(false);

    expect(isArrayLike(a)).toBe(false);
    expect(isArrayLike(b)).toBe(false);
    expect(isArrayLike(c)).toBe(false);
    expect(isArrayLike(d)).toBe(true);
    expect(isArrayLike(e)).toBe(false);

    expect(isPromise(a)).toBe(false);
    expect(isPromise(b)).toBe(true);
    expect(isPromise(c)).toBe(false);
    expect(isPromise(d)).toBe(false);
    expect(isPromise(e)).toBe(false);

    expect(isObservable(a)).toBe(false);
    expect(isObservable(b)).toBe(false);
    expect(isObservable(c)).toBe(true);
    expect(isObservable(d)).toBe(false);
    expect(isObservable(e)).toBe(false);
});

test("search", () => {
    expect(search("jardi espanol", "Jardín Español")).toBe(true);
    expect(search("jarbi espanol", "Jardín Español")).toBe(false);
    expect(search("ho ra sal", "Hola Rafa Salguero")).toBe(true);
    expect(search("ho ra zal", "Hola Rafa Salguero")).toBe(false);

});

test("contains all", () => {
    expect(containsAll([], [])).toBe(true);
    expect(containsAll([], [1])).toBe(false);
    expect(containsAll([1, 2, 3, 4], [])).toBe(true);

    expect(containsAll([1, 2, 3, 4], [1])).toBe(true);
    expect(containsAll([1, 2, 3, 4], [1, 2, 3, 4])).toBe(true);
    expect(containsAll([1, 2, 3, 4], [3, 4])).toBe(true);
    expect(containsAll([1, 2, 3, 4], [4, 3, 2, 1])).toBe(true);
    expect(containsAll([1, 2, 3, 4], [4, 1])).toBe(true);
    expect(containsAll([1, 2, 3, 4], [3, 4, 5])).toBe(false);
    expect(containsAll([1, 2, 3, 4], [1, 4, 5])).toBe(false);
    expect(containsAll([1, 2, 3, 4], [1, 1, 1, 1, 1, 4, 4, 2, 3, 2, 1])).toBe(true);

    expect(containsAll([1, 2, 3, 4], [1, 1, 1, 1, 1, 4, 4, 2, 3, 2, 1, 0])).toBe(false);
});

test("contains any", () => {
    expect(containsAny([], [])).toBe(false);
    expect(containsAny([1, 2, 3], [])).toBe(false);
    expect(containsAny([1, 2, 3], [4, 5, 6])).toBe(false);

    expect(containsAny([1, 2, 3], [4, 5, 6, 1])).toBe(true);
    expect(containsAny([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(containsAny([1, 2, 3], [3])).toBe(true);
    expect(containsAny([1, 2, 3], [3, 1])).toBe(true);
});

test("null safe", () => {
    type RecPartial<T> = {[K in keyof T]?: RecPartial<T[K]>};

    interface TestType {
        A: {
            B: {
                C: {
                    D: {
                        E: number
                    }
                }
            }
        }
    };
    type TestType2 = RecPartial<TestType>;
    const a: TestType2 | null = {};
    const b: TestType2 | null = null as any;
    const c: TestType2 | null = { A: { B: { C: {} } } };
    const d: TestType2 | null = { A: { B: { C: { D: { E: 10 } } } } };


    nullsafe(b);

    expect(nullsafe(a, x => x.A, x => x.B)).toBe(undefined);
    expect(nullsafe(b, x => x.A, x => x.B)).toBe(null);
    expect(nullsafe(c, x => x.A)).not.toBe(undefined);
    expect(nullsafe(c, x => x.A, x => x.B)).not.toBe(undefined);
    expect(nullsafe(c, x => x.A, x => x.B, x => x.C)).not.toBe(undefined);
    expect(nullsafe(c, x => x.A, x => x.B, x => x.C, x => x.D)).toBe(undefined);

    expect(nullsafe(d, x => x.A, x => x.B, x => x.C, x => x.D, x => x.E)).toBe(10);

    //Probamos que el nullsafe no se confunda con el 0
    expect(nullsafe(-1, x => x + 1, x => x + 1)).toBe(1);
    expect(nullsafe(0, x => x + 1, x => x + 1)).toBe(2);

});

test("nullsafe types", () => {
    interface TestType {
        a: {
            b: number,
            c: string | null | undefined,
            d: string | undefined,
            e: string | null,
        } | null,
        b?: string,
        c: {
            b: number,
            c: string | null | undefined,
            d: string | undefined
        } | undefined,
        d: {
            b: number,
            c: string | null | undefined,
            d: string | undefined
        },
    };

    const test = null as any as TestType;
    //Simplemente comprobamos al compilar que los tipos que devuelve el nullsafe en cajan con los tipos del
    const a: {} | null = nullsafe(test, x => x.a);
    const b: number | null = nullsafe(test, x => x.a, x => x.b);
    const c: string | null | undefined = nullsafe(test, x => x.a, x => x.c);
    const d: string | null | undefined = nullsafe(test, x => x.a, x => x.d);
    const e: string | null = nullsafe(test, x => x.a, x => x.e);
    const b2: string | undefined = nullsafe(test, x => x.b);

    const d2: string | undefined = nullsafe(test, x => x.c, x => x.d);
    const d3: string | undefined = nullsafe(test, x => x.d, x => x.d);
})

test("map prev rx", async () => {
    const arr = [1, 4, 7, 10, 20];
    const obs = rx.Observable.from(arr);
    const ret = await mapPreviousRx(obs, 0).toArray().toPromise();

    expect(ret).toEqual([
        { prev: 0, curr: 1 },
        { prev: 1, curr: 4 },
        { prev: 4, curr: 7 },
        { prev: 7, curr: 10 },
        { prev: 10, curr: 20 },
    ])
});

test("map many", () => {
    const arr = [1, 2, 3];
    const map = (x: number) => range(x, x + 3).map(y => x * 10 + y);

    const expected =
        [
            11, 12, 13, 14,
            22, 23, 24, 25, 26,
            33, 34, 35, 36, 37, 38
        ];

    const actual = mapMany(arr, map);
    expect(actual).toEqual(expected);

    const actual2 = flatten(arr.map(map));
    expect(actual2).toEqual(expected);
});

test("running total", () => {
    const arr = [1, 2, 3, 4, 5, 6].map(x => ({ value: x, other: "hello" }));
    const expected = [1, 3, 6, 10, 15, 21].map(x => ({ value: x, other: "hello" }));

    const actual = runningTotal(arr, 0, (state, it) => state + it.value, (state, item) => ({ ...item, value: state }));
    expect(actual).toEqual(expected);
});

test("running total s", () => {
    const arr = [1, 2, 3, 4, 5, 6];
    const expected = [1, 3, 6, 10, 15, 21];

    const actual = runningTotal(arr, 0, (state, it) => state + it, x => x);
    expect(actual).toEqual(expected);
});

test("map previous", () => {
    const arr = [1, 2, 3, 5, 8, 13];
    const expected = [0 / 1, 1 / 2, 2 / 3, 3 / 5, 5 / 8, 8 / 13];
    const actual = mapPrevious(arr, (prev, curr) => prev / curr, 0);
    expect(actual).toEqual(expected);
})

test("format number", () => {
    expect(formatNumber(0, 1, 2)).toEqual("0.00");
    expect(formatNumber(1, 1, 2)).toEqual("1.00");
    expect(formatNumber(1.2, 1, 2)).toEqual("1.20");
    expect(formatNumber(123.254, 1, 2)).toEqual("123.25");
    expect(formatNumber(123.254, 1, 5)).toEqual("123.25400");


    expect(formatNumber(10, 0, 0)).toEqual("10");

    //Negativos:
    expect(formatNumber(-10, 0, 0)).toEqual("-10");

    expect(formatNumber(-10, 2, 0)).toEqual("-10");
    expect(formatNumber(-10, 3, 0)).toEqual("-010");
    expect(formatNumber(-10, 5, 0)).toEqual("-00010");

    expect(formatNumber(-10.5, 5, 0)).toEqual("-00010");
    expect(formatNumber(-10.5, 5, 1)).toEqual("-00010.5");

    expect(formatNumber(-0.5, 5, 1)).toEqual("-00000.5");
    expect(formatNumber(-0.58745164, 5, 1)).toEqual("-00000.5");

    expect(formatNumber(-0.5999, 5, 1)).toEqual("-00000.5");

    expect(formatNumber(-1.2, 0, 1)).toEqual("-1.2");
    expect(formatNumber(-1.2, 1, 1)).toEqual("-1.2");

    expect(formatNumber(-0.2, 0, 1)).toEqual("-0.2");
    expect(formatNumber(-0.2, 1, 1)).toEqual("-0.2");
    expect(formatNumber(-0.2, 2, 1)).toEqual("-00.2");

    expect(formatNumber(-0.5999, 5, 4)).toEqual("-00000.5999");
    expect(formatNumber(-0.5999, 5, 8)).toEqual("-00000.59990000");

    //Positivos:
    expect(formatNumber(10, 2, 0)).toEqual("10");
    expect(formatNumber(10, 3, 0)).toEqual("010");
    expect(formatNumber(10, 5, 0)).toEqual("00010");
    expect(formatNumber(10.5, 5, 0)).toEqual("00010");
    expect(formatNumber(10.5, 5, 1)).toEqual("00010.5");
    expect(formatNumber(0.5, 5, 1)).toEqual("00000.5");
    expect(formatNumber(0.58745164, 5, 1)).toEqual("00000.5");
    expect(formatNumber(0.5999, 5, 1)).toEqual("00000.5");
    expect(formatNumber(1.2, 0, 1)).toEqual("1.2");
    expect(formatNumber(1.2, 1, 1)).toEqual("1.2");
    expect(formatNumber(0.2, 0, 1)).toEqual("0.2");
    expect(formatNumber(0.2, 1, 1)).toEqual("0.2");
    expect(formatNumber(0.2, 2, 1)).toEqual("00.2");
    expect(formatNumber(0.5999, 5, 4)).toEqual("00000.5999");
    expect(formatNumber(0.5999, 5, 8)).toEqual("00000.59990000");

    expect(formatNumber(1, 0, 0, true)).toEqual("1");
    expect(formatNumber(10, 0, 0, true)).toEqual("10");
    expect(formatNumber(100, 0, 0, true)).toEqual("100");
    expect(formatNumber(1000, 0, 0, true)).toEqual("1,000");
    expect(formatNumber(10000, 0, 0, true)).toEqual("10,000");
    expect(formatNumber(12345, 0, 0, true)).toEqual("12,345");
    expect(formatNumber(123450000, 0, 0, true)).toEqual("123,450,000");
    expect(formatNumber(123450000.546, 0, 0, true)).toEqual("123,450,000");
    expect(formatNumber(123450000.546, 0, 2, true)).toEqual("123,450,000.54");
    expect(formatNumber(-123450000.546, 0, 2, true)).toEqual("-123,450,000.54");
    expect(formatNumber(-123450000.546, 4, 2, true)).toEqual("-123,450,000.54");
    expect(formatNumber(-123450000.546, 9, 2, true)).toEqual("-123,450,000.54");
    expect(formatNumber(-123450000.546, 12, 2, true)).toEqual("-000,123,450,000.54");
    expect(formatNumber(-123450.546, 12, 2, true)).toEqual("-000,000,123,450.54");
    expect(formatNumber(-123450.546, 12, 2, true, "$")).toEqual("-$000,000,123,450.54");
    expect(formatNumber(-123450.546, 12, 3, true, "$")).toEqual("-$000,000,123,450.546");
    expect(formatNumber(-123450.546, 12, 5, true, "$")).toEqual("-$000,000,123,450.54600");
    expect(formatNumber(-123450.546, 12, 5, true, "$")).toEqual("-$000,000,123,450.54600");
});

test("format datetime", () => {
    expect(formatDate(new Date(2017, 11, 7))).toBe("07/dic/2017");
    expect(formatDate(new Date(2017, 0, 7))).toBe("07/ene/2017");
    expect(formatDate(new Date(2017, 0, 7, 16, 54, 23))).toBe("07/ene/2017 16:54");
    expect(formatDate(new Date(2017, 0, 7), true)).toBe("07/ene/2017 00:00");

    expect(formatDate(new Date(2017, 0, 7, 16, 54, 23), false)).toBe("07/ene/2017");
    expect(formatDate(new Date(2017, 5, 7, 16, 54, 23), false)).toBe("07/jun/2017");

})


test("format datetime excel", () => {
    expect(formatDateExcel(new Date(2017, 11, 7))).toBe("2017-12-07 00:00:00");
    expect(formatDateExcel(new Date(2017, 0, 7))).toBe("2017-01-07 00:00:00");
    expect(formatDateExcel(new Date(2017, 0, 7, 16, 54, 23))).toBe("2017-01-07 16:54:23");
    expect(formatDateExcel(new Date(2017, 5, 7, 16, 54, 23))).toBe("2017-06-07 16:54:23");

})

test("clone function", () => {

    const funcA = () => 10;
    const funcB = (a: number, b: number) => a + b;
    const funcC = (a: number, ...b: number[]) => a * b.reduce((a, b) => a + b, 0);
    const funcD = (a: string, b: number, c: number) => a + b + c;
    const funcE: any = () => 20;
    funcE.hello = "rafa";

    const cloneA = cloneFunction(funcA);
    const cloneB = cloneFunction(funcB);
    const cloneC = cloneFunction(funcC);
    const cloneD = cloneFunction(funcD);
    const cloneE = cloneFunction(funcE);

    expect(funcA).not.toBe(cloneA);
    expect(funcB).not.toBe(cloneB);
    expect(funcC).not.toBe(cloneC);
    expect(funcD).not.toBe(cloneD);

    (cloneA as any).myProp = "hello";

    expect((cloneA as any).myProp).toBe("hello");
    expect((funcA as any).myProp).toBeUndefined();

    expect(cloneA()).toBe(10);
    expect(cloneB(1, 4)).toBe(5);
    expect(cloneC(2, ...[1, 2, 3])).toBe(12);
    expect(cloneC(2, 3, 4, 5, 6)).toBe(36);
    expect(cloneD("hola", 3, 4)).toBe("hola34");

    expect(cloneE()).toBe(20);
    expect(cloneE.hello).toBe("rafa");
});

test("bind function", () => {
    const func = function (this: number | void, a) {
        return this + a;
    };

    (func as any).hello = "rafa";

    const func2 = bindFunction(func, 10);

    expect(func(1)).toBeNaN();
    expect(func2(1)).toBe(11);
    expect(func2(2)).toBe(12);

    expect((func2 as any).hello).toBe("rafa");
    expect(func2).not.toBe(func);
});

test("unbind function", () => {
    const func = function (this: number | void, a) { return this + a };
    const bind10 = bindFunction(func, 10);
    const bind10_10 = bindFunction(bind10, 10);


    const bind20Over10 = bindFunction(bind10, 20);
    const bind20Over10unbind = bindFunction(unbindFunction(bind10)!, 20);
    const bind20Over10_10unbind = bindFunction(unbindFunction(bind10_10)!, 20);
    const bind20Over10_10unbind_unbind = bindFunction(unbindFunction(unbindFunction(bind10_10)!)!, 20);

    const unbindFunc = unbindFunction(func);

    expect(func(1)).toBeNaN();
    expect(bind10(1)).toBe(11);
    expect(bind10_10(1)).toBe(11);

    expect(bind20Over10(1)).toBe(11);
    expect(bind20Over10unbind(1)).toBe(21);
    expect(bind20Over10_10unbind(1)).toBe(11);
    expect(bind20Over10_10unbind_unbind(1)).toBe(21);
    expect(unbindFunc).toBeUndefined();
});

test("async create selector simple test", async () => {
    interface Props {
        value: number;
    }
    const value = (x: Props) => x.value;

    const incrementAsync = createSelector(value, x => delay(100).then(() => x + 1));

    const dup = createSelector(value, x => x * 2);
    const sum = createSelector(incrementAsync, dup, (a, b) => a + b);

    const func = (x: number) => (x + 1) + (x * 2);
    //(value + 1) + (value * 2)
    expect(await sum({ value: 2 }).toPromise()).toBe(func(2));
    expect(await sum({ value: 5 }).toPromise()).toBe(func(5));
});

test("async create selector sync test", () => {
    interface Props {
        value: number;
    }
    const value = (x: Props) => x.value;

    const increment = createSelector(value, x => x + 1);

    const dup = createSelector(value, x => x * 2);
    const sum = createSelector(increment, dup, (a, b) => a + b);

    const func = (x: number) => (x + 1) + (x * 2);
    //(value + 1) + (value * 2)
    expect(sum({ value: 2 })).toBe(func(2));
    expect(sum({ value: 5 })).toBe(func(5));
});

test("async create selector async memoize", async () => {
    interface Props {
        a: number;
        b: number;
    }
    const a = (x: Props) => x.a;
    const increment = createSelector(a, x => delay(100).then(() => x + 1));
    let samePromiseCalls = 0;
    const samePromise = createSelector(increment, x => {
        samePromiseCalls++;
        return Promise.resolve(10);
    }); //Este selector cada vez devuelve una promesa diferente, pero con el mismo valor

    let sumCalls = 0;
    const sumObs = createSelector<Props, number, number>(samePromise, x => {
        sumCalls++;
        return x + 1;
    });

    const sum = (x: Props) => sumObs(x).toPromise();

    expect(samePromiseCalls).toBe(0);
    expect(await sum({ a: 10, b: 20 })).toBe(11);

    expect(samePromiseCalls).toBe(1);
    expect(sumCalls).toBe(1);

    expect(await sum({ a: 10, b: 25 })).toBe(11);

    //El cambio de B no ocasionó llamadas
    expect(samePromiseCalls).toBe(1);
    expect(sumCalls).toBe(1);

    expect(await sum({ a: 15, b: 25 })).toBe(11);

    //El cambio de A ocasiono una llamada a samePromise ya que depende de increment, el cual depende de A
    expect(samePromiseCalls).toBe(2);
    //sumCalls no se llamo ya que la promesa aunque diferente, devolvió lo mismo que es 10
    expect(sumCalls).toBe(1);

    expect(await sum({ a: 15, b: 25 })).toBe(11);

    //No cambiaron los valores, no hay ninguna llamada:
    expect(samePromiseCalls).toBe(2);
    expect(sumCalls).toBe(1);

    expect(await sum({ a: 10, b: 25 })).toBe(11);

    expect(samePromiseCalls).toBe(3);
    expect(sumCalls).toBe(1);

});

test("async same promise ", async () => {
    interface Props {
        a: number;
        b: number;
    }
    const props = (x: Props) => x;
    let samePromiseCalls = 0;
    const samePromise = createSelector(props, x => {
        samePromiseCalls++;
        return Promise.resolve({ a: 10, b: 30 });
    }); //Este selector cada vez devuelve una promesa diferente, pero con el mismo valor

    let sumCalls = 0;
    const sum = createDeepSelector(samePromise, x => {
        sumCalls++;
        return x.a + 1;
    });

    expect(samePromiseCalls).toBe(0);
    expect(sumCalls).toBe(0);

    await sum({ a: 10, b: 20 }).toPromise();

    expect(samePromiseCalls).toBe(1);
    expect(sumCalls).toBe(1);

    await sum({ a: 10, b: 20 }).toPromise();

    expect(samePromiseCalls).toBe(2);
    expect(sumCalls).toBe(1);
});

test("selector multiple", async () => {
    interface Props {
        a: number;
        b: number;
    }
    const a = (x: Props, state: number) => x.a;
    const b = (x: Props, state: number) => x.b;
    const c = (x: Props, state: number) => x.b + state;

    const sum = createSelector(a, b, c, (a, b, c) => a + b + c);

    expect(sum({ a: 1, b: 2 }, 5)).toBe(10);
});

test("selector al tener error no debe de memoizar SYNC", async () => {
    const a = () => 10;
    let count = 0;
    const sum = createSelector(a, x => {
        count++;
        if (count >= 3) return x;
        else
            throw new Error("Error de prueba");
    });

    let errCount = 0;
    try { sum({}); } catch (error) { errCount++; }
    try { sum({}); } catch (error) { errCount++; }
    expect(sum({})).toBe(10);

    expect(errCount).toBe(2);
    expect(count).toBe(3);

    sum({});
    sum({});

    expect(errCount).toBe(2);
    expect(count).toBe(3);
});

test("selector al tener error no debe de memoizar ASYNC", async () => {
    const a = () => 10;
    let count = 0;
    const sum = createSelector(a, async x => {
        count++;
        await delay(100);
        if (count >= 3) return x;
        else
            throw new Error("Error de prueba");
    });

    let errCount = 0;
    try { await sum({}); } catch (error) { errCount++; }
    try { await sum({}); } catch (error) { errCount++; }
    expect(await sum({})).toBe(10);

    expect(errCount).toBe(2);
    expect(count).toBe(3);

    await sum({});
    await sum({});

    expect(errCount).toBe(2);
    expect(count).toBe(3);
});

test("selector con observable", async () => {
    interface Props {
        a: number;
    };
    const a = (x: Props) => x.a;
    let count = 0;
    const contarA = createSelector(a, a => {
        count++;
        return rx.Observable.timer(0, 100).takeWhile(x => x < a);
    });
    const conteoPor2 = createSelector(contarA, a => a * 2);

    let obs2 = await conteoPor2({ a: 2 }).toArray().toPromise();
    expect(obs2).toEqual([0, 2]);

    obs2 = await conteoPor2({ a: 2 }).toArray().toPromise();
    expect(obs2).toEqual([0, 2]);
    expect(count).toBe(1);

    let obs4 = await conteoPor2({ a: 4 }).toArray().toPromise();
    expect(obs4).toEqual([0, 2, 4, 6]);

    obs4 = await conteoPor2({ a: 4 }).toArray().toPromise();
    expect(obs4).toEqual([0, 2, 4, 6]);

    expect(count).toBe(2);

});

test("selector con observable que lanza error", async () => {
    interface Props {
        a: number;
    };
    const a = (x: Props) => x.a;
    let count = 0;
    const contarA = createSelector(a, a => {
        count++;
        if (count == 2) {
            return rx.Observable.throw("Error de prueba");
        }
        return rx.Observable.timer(0, 100).takeWhile(x => x < a);
    });
    const conteoPor2 = createSelector(contarA, a => a * 2);

    const conteoPor2Obs = conteoPor2({ a: 2 });
    let obs2 = await conteoPor2Obs.toArray().toPromise();
    expect(obs2).toEqual([0, 2]);

    obs2 = await conteoPor2({ a: 2 }).toArray().toPromise();
    expect(obs2).toEqual([0, 2]);
    expect(count).toBe(1);

    let errCount = 0;
    try {
        const obs = conteoPor2({ a: 3 });
        let obs3 = await obs.toArray().toPromise();
    } catch (error) {
        errCount++;
    }

    expect(errCount).toBe(1);
    expect(count).toBe(2);

    //Una segunda llamada con los mismos argumentos SI ocasiona llamada, ya que la llamada anterior lanzó una excepción
    const obs = conteoPor2({ a: 3 });
    let obs3 = await obs.toArray().toPromise();
    expect(obs3).toEqual([0, 2, 4]);
    expect(errCount).toBe(1);
    expect(count).toBe(3);
});

test("is observable", () => {
    expect(isObservable(rx.Observable.from([undefined]))).toBe(true);
});

test("selecotr con observable problema TEST", async () => {
    console.log("hello");
    interface State {
    }

    const idCliente = (state: State) => new rx.BehaviorSubject<number>(10);

    const idClienteObs = idCliente({});
    const idClienteValue = await idClienteObs.first().toArray().toPromise();
    expect(isObservable(idClienteObs)).toBe(true);
    expect(idClienteValue).toEqual([10]);

    const cliente = createSelector(idCliente, id => {
        expect(id).toBe(10);
        var b = new rx.BehaviorSubject<{ Direcciones: any[] }>({ Direcciones: [1, 2, 3] } as any);
        const isObs = isObservable(b);
        return b;
    });


    const clienteObs = cliente({});
    const clienteResult = await clienteObs.first().toArray().toPromise();

    expect(clienteResult).toEqual([{ Direcciones: [1, 2, 3] }]);

}, 10000);

test("selector debe de devolver la misma instancia de observable argumento sincrono", async () => {
    interface State {
    }

    const idCliente = (state: State) => 10;
    let calls = 0;
    const cliente = createSelector(idCliente, id => {
        calls++;
        const instance = { id: id };
        return rx.Observable.from([instance]);
    });

    const state: State = {};
    const miCliente1 = cliente(state);
    const miCliente2 = cliente(state);

    expect(calls).toBe(1);
    expect(miCliente1).toBe(miCliente2);

    const miClienteResult1 = await miCliente1.first().toArray().toPromise();
    const miClienteResult2 = await miCliente2.first().toArray().toPromise();
    expect(miClienteResult1[0]).toBe(miClienteResult2[0]);
});

test("selector debe de devolver la misma instancia de observable con argumento observable", async () => {
    interface State {
    }

    const idCliente = (state: State) => 10;
    const idClienteObs = createSelector(idCliente, id => new rx.BehaviorSubject<number>(id));

    let calls = 0;
    const cliente = createSelector(idClienteObs, id => {
        calls++;
        const instance = { id: id };
        return rx.Observable.from([instance]);
    });


    const state: State = {};
    const miCliente1 = cliente(state);
    const miCliente2 = cliente(state);

    const miClienteResult1 = await miCliente1.first().toArray().toPromise();
    const miClienteResult2 = await miCliente2.first().toArray().toPromise();

    expect(calls).toBe(1);
    expect(miClienteResult1[0]).toBe(miClienteResult2[0]);
    expect(miCliente1).toBe(miCliente2);
});

test("selector debe de devolver la misma instancia de promesa argumento sincrono", async () => {
    interface State {
    }

    const idCliente = (state: State) => 10;
    let calls = 0;
    const cliente = createSelector(idCliente, id => {
        calls++;
        const instance = { id: id };
        return Promise.resolve(instance);
    });

    const state: State = {};
    const miCliente1 = cliente(state);
    const miCliente2 = cliente(state);

    expect(calls).toBe(1);
    expect(miCliente1).toBe(miCliente2);

    const miClienteResult1 = await miCliente1;
    const miClienteResult2 = await miCliente2;
    expect(miClienteResult1).toBe(miClienteResult2);
});

test("selecotr con observable problema COMPLETA", async () => {

    interface State {
        idCliente?: number;
    }
    interface Props {
        value?: number | null;
        loading?: boolean;
    }
    const idClienteDireccion = (state: State, props: Props) => props.value;
    const clienteDireccion = createSelector(idClienteDireccion, id => {
        //Hello
        console.log("id: " + id);
        var b = new rx.BehaviorSubject<{ Cliente: number, IdCliente: number }>({ Cliente: 10, IdCliente: 1 } as any);
        const ret = id != null ? b : rx.Observable.from([id]);
        return ret as rx.Observable<{ Cliente: number, IdCliente: number } | null | undefined>;
    });
    const clienteFromValue = createSelector(clienteDireccion, x => x && x.Cliente);
    const idClienteFromValue = createSelector(clienteDireccion, x => x && x.IdCliente);
    const idClienteFromState = (state: State, props: Props) => state.idCliente;
    //NOTA: Le damos prioridad al NULL sobre el UNDEFINED, esto por que un NULL indica una limpieza por parte del usuario, en cambio un undefined indica que el valor no se conoce
    const idCliente = createSelector(idClienteFromValue, idClienteFromState, (val, state) => val === null ? null : (state || val));;
    const cliente = createSelector(idCliente, id => {
        var b = new rx.BehaviorSubject<{ Direcciones: any[] }>({ Direcciones: [1, 2, 3] } as any);
        const isObs = isObservable(b);
        return b;
    });


    const clienteResult = await cliente({}, {}).first().toArray().toPromise();

    expect(clienteResult).toEqual([{ Direcciones: [1, 2, 3] }]);

    const direcciones = createSelector(cliente, cli => {
        console.log("Llamando a direcciones");
        if (isObservable(cli)) {
            console.log("cli en direcciones es observable");
        }

        return (cli && cli.Direcciones) || []
    });

    const direccionesSelect = createSelector(direcciones, direcciones => {
        return direcciones.map<{}>(x => ({ id: x, view: x }));
    });

    const obs = direcciones({}, { value: null, loading: false, });
    const ret = await obs.first().toArray().toPromise();

    expect(ret).toEqual([[1, 2, 3]]);
});


test("selector con observable de observables", async () => {
    interface Props {
        a: number;
    };
    const a = (x: Props) => x.a;
    let count = 0;
    const contarA = createSelector(a, a => {
        count++;
        return rx.Observable.timer(0, 50).takeWhile(x => x < a);
    });
    const conteoPor2 = createSelector(contarA, a => rx.Observable.timer(0, 10).takeWhile(x => x < 20).map(x => x + a * 100));

    const conteoPor2Obs = conteoPor2({ a: 3 });
    const result = await conteoPor2Obs.toArray().toPromise();
    expect(result).toEqual([0, 1, 2, 3, 4, 100, 101, 102, 103, 104, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219]);
});


test("selecotr con observable y nulo", async () => {
    interface Props {
        value?: number | null;
        loading?: boolean;
    }
    const idClienteDireccion = (props: Props) => props.value;
    const clienteDireccion = createSelector(idClienteDireccion, id => {
        var b = new rx.BehaviorSubject<{ Cliente: number, IdCliente: number }>({ Cliente: 10, IdCliente: 1 } as any);
        const ret = id != null ? b : null;
        const ret2 = toObservable(ret);
        return ret2;
    });

    createSelector(idClienteDireccion, clienteDireccion, (a, b) => b)

    const clienteFromValue = createSelector(clienteDireccion, x => x && x.Cliente);
});

test("uuid random", () => {
    const arr = range(0, 100).map(x => uuid());
    const uni = unique(arr);

    expect(uni.length).toBe(arr.length);
});

test("all equal", () => {
    const arr = [1, 1, 1];
    expect(allEqual(arr)).toBe(true);

    expect(allEqual([])).toBe(true);
    expect(allEqual([1])).toBe(true);
    expect(allEqual([1, 1, 1, 2])).toBe(false);
    expect(allEqual([2, 1, 1, 1])).toBe(false);
});

test("pick", () => {
    const test = { a: 1, b: 2, c: 3, d: 4 };
    const ret = pick(test, "a", "b");

    expect(pick(test, "a")).toEqual({ a: 1 });
    expect(pick(test, "b")).toEqual({ b: 2 });
    expect(pick(test, "a", "b")).toEqual({ a: 1, b: 2 });

    expect(pick(test as any, "a", "b", "x")).toEqual({ a: 1, b: 2 });

});

test("zip", () => {
    const edad = [10, 20, 30, 40, 50];
    const nombre = ["rafa", "ale", "jose", "juan", "carlos"];
    const otro = [1, 2, 3, 4, 5];

    const ret = zip({ edad, nombre, otro })

    expect(ret).toEqual([
        { edad: 10, nombre: "rafa", otro: 1 },
        { edad: 20, nombre: "ale", otro: 2 },
        { edad: 30, nombre: "jose", otro: 3 },
        { edad: 40, nombre: "juan", otro: 4 },
        { edad: 50, nombre: "carlos", otro: 5 },
    ])
});

test("binary search", () => {
    const arr = [10, 20, 30, 40, 50];
    expect(binarySearch(arr, x => x, 10)).toEqual({ index: 0, match: true });

    expect(binarySearch(arr, x => x, 40)).toEqual({ index: 3, match: true });
    expect(binarySearch(arr, x => x, 50)).toEqual({ index: 4, match: true });
    expect(binarySearch(arr, x => x, 51)).toEqual({ index: 4, match: false });
    expect(binarySearch(arr, x => x, 500)).toEqual({ index: 4, match: false });

    expect(binarySearch(arr, x => x, -10)).toEqual({ index: -1, match: false });
    expect(binarySearch(arr, x => x, 0)).toEqual({ index: -1, match: false });
    expect(binarySearch(arr, x => x, 9)).toEqual({ index: -1, match: false });
    expect(binarySearch(arr, x => x, 11)).toEqual({ index: 0, match: false });
    expect(binarySearch(arr, x => x, 19)).toEqual({ index: 0, match: false });

    expect(binarySearch(arr, x => x, 41)).toEqual({ index: 3, match: false });
    expect(binarySearch(arr, x => x, 59)).toEqual({ index: 4, match: false });
});

test("exclude", () => {
    const a = [1, 2, 3, 4, 5, 6, 6, 7, 7];
    expect(exclude(a, [3, 4])).toEqual([1, 2, 5, 6, 6, 7, 7]);
    expect(exclude(a, [1, 6, 7])).toEqual([2, 3, 4, 5]);
    expect(exclude(a, [7, 6, 1])).toEqual([2, 3, 4, 5]);
    expect(exclude(a, [1, 6, 7, 8, 9, 10])).toEqual([2, 3, 4, 5]);
})

test("isSubset", () => {
    const a = [1, 2, 3, 4];
    expect(isSubset(a, [])).toBe(true);
    expect(isSubset(a, [1, 2, 3, 4])).toBe(true);
    expect(isSubset(a, [4, 3, 2, 1])).toBe(true);
    expect(isSubset(a, [4, 1])).toBe(true);

    expect(isSubset(a, [4, 1, 5])).toBe(false);
    expect(isSubset([], [])).toBe(true);

    expect(isSubset([], [1])).toBe(false);

})

test("join", () => {
    interface Cliente {
        nombre: string;
        idPais?: number;
    }
    interface Pais {
        nombre: string;
        id: number;
    }
    const paises: Pais[] = [
        { id: 1, nombre: "Mexico" },
        { id: 2, nombre: "Moroco" }
    ];
    const clientes: Cliente[] = [
        { nombre: "James Bond" },
        { nombre: "Rafael", idPais: 1 },
        { nombre: "Juan Perez", idPais: 1 },
        { nombre: "Ali Al Hazam", idPais: 2 },
        { nombre: "Hazim Ul Husein", idPais: 2 },
        { nombre: "Usain Bolt", idPais: 2 },
    ];

    const left =
        leftJoin(clientes, paises, (a, b) => a.idPais == b.id)
            .map(x => ({ nombre: x.left.nombre, pais: nullsafe(x.right, x => x.nombre) }));

    const inner =
        innerJoin(clientes, paises, (a, b) => a.idPais == b.id)
            .map(x => ({ nombre: x.left.nombre, pais: x.right.nombre }));

    expect(left).toEqual([
        { nombre: "James Bond", pais: undefined },
        { nombre: "Rafael", pais: "Mexico" },
        { nombre: "Juan Perez", pais: "Mexico" },
        { nombre: "Ali Al Hazam", pais: "Moroco" },
        { nombre: "Hazim Ul Husein", pais: "Moroco" },
        { nombre: "Usain Bolt", pais: "Moroco" },
    ]);

    expect(inner).toEqual([
        { nombre: "Rafael", pais: "Mexico" },
        { nombre: "Juan Perez", pais: "Mexico" },
        { nombre: "Ali Al Hazam", pais: "Moroco" },
        { nombre: "Hazim Ul Husein", pais: "Moroco" },
        { nombre: "Usain Bolt", pais: "Moroco" },
    ]);
})

test("union key", () => {
    const a = [
        { id: 1, nombre: "Rafa" },
        { id: 2, nombre: "Ale" }
    ];

    const b = [
        { id: 1, nombre: "Rafaelito", x: 1 },
        { id: 3, nombre: "Juanito", x: 2 }
    ];

    const ret = unionKey(a, b, x => x.id);
    expect(ret).toEqual([
        { id: 2, nombre: "Ale"},
        { id: 1, nombre: "Rafaelito", x: 1},
        { id: 3, nombre: "Juanito", x: 2 }
    ]);
});

test("combinePath", () => {
    expect(combinePath("/", "hola")).toBe("/hola");
    expect(combinePath("/", "hola/")).toBe("/hola");
    expect(combinePath("", "hola")).toBe("/hola");
    expect(combinePath("", "./hola")).toBe("/hola");
    expect(combinePath("", "./hola/")).toBe("/hola");

    expect(combinePath("mi/ruta/base", "./hola")).toBe("/mi/ruta/base/hola");
    expect(combinePath("mi/ruta/base", "./hola/")).toBe("/mi/ruta/base/hola");
    expect(combinePath("/mi/ruta/base", "./hola/")).toBe("/mi/ruta/base/hola");
    expect(combinePath("/mi/ruta/base/", "./hola/")).toBe("/mi/ruta/base/hola");
    expect(combinePath("mi/ruta/base/", "./hola/")).toBe("/mi/ruta/base/hola");

    expect(combinePath("mi/ruta/base/", "../")).toBe("/mi/ruta");
    expect(combinePath("/mi/ruta/base/", "../")).toBe("/mi/ruta");
    expect(combinePath("/mi/ruta/base", "../")).toBe("/mi/ruta");
    expect(combinePath("mi/ruta/base", "../")).toBe("/mi/ruta");
    
    expect(combinePath("mi/ruta/base/hey/", "../../")).toBe("/mi/ruta");
    expect(combinePath("mi/ruta/base/hey/", "../../../")).toBe("/mi");
    expect(combinePath("mi/ruta/base/hey/", "../../../hola")).toBe("/mi/hola");
    expect(combinePath("mi/ruta/base/hey/", "../../../hola/")).toBe("/mi/hola");
    expect(combinePath("mi/ruta/base/hey", "../../../hola/")).toBe("/mi/hola");
    
    expect(combinePath("mi/ruta/base/hey", "../../../../")).toBe("/");
    expect(combinePath("/mi/ruta/base/hey", "../../../../")).toBe("/");
    expect(combinePath("/mi/ruta/base/hey/", "../../../../")).toBe("/");
    expect(combinePath("mi/ruta/base/hey/", "../../../../")).toBe("/");
    
    expect(combinePath("mi/ruta/base/hey/", "../../../../rollo")).toBe("/rollo");
    expect(combinePath("mi/ruta/base/hey/", "../../../../rollo/hola")).toBe("/rollo/hola");
    expect(combinePath("mi/ruta/base/hey/", "rollo/hola")).toBe("/rollo/hola");
    expect(combinePath("mi/ruta/base/hey/", "/rollo/hola")).toBe("/rollo/hola");
    
    //TODO: Hacer pruebas con los parametros prefix y postfix
});