import {
    sequenceEquals, shallowEquals, flatten, groupBy, Grouping,
    deepEquals, enumObject, setEquals, all, any, arrayToMap, contains, filterObject, first, mapObject, omit, toMap, moveItem, swapItems, upDownItem, promiseAllObj,
    unique, filterIf, mapKeys, intersect, omitUndefined, single, awaitObj, shallowDiff, range, sort, defaultComparer, orderBy, orderByDesc,
    truncateDate, addDate, rxFlatten, take, firstMap, duplicatesOnEdit, duplicatesOnAdd, toObservable, isArray, isArrayLike, isPromiseLike, isObservable,
    search, removeDiacritics, containsAll, containsAny, mapPreviousRx, mapMany, runningTotal, mapPrevious, formatNumber, formatDate, formatDateExcel,
    delay, allEqual, pick, zip, binarySearch, exclude,
    isSubset, innerJoin, leftJoin, unionKey, combinePath, sum, excludeKeys, nextToPromise, objRxToRxObj, outOfRange, RangeOptional,
    base64ToString, stringToBase64, max, min, enumKeys, toIsoDate, debounceSync, syncResolve, mergeObj, orRx, treeTraversal, isSyncPromise, syncPromiseValue
} from "./index";

import * as rx from "rxjs";
import * as rxOps from "rxjs/operators";
import { pipe } from "./pipe";
import { runningTotalRight } from "./logic";

jest.setTimeout(10000);

test("contains", () => {
    expect(contains([1, 2, 3], 4)).toBe(false);
    expect(contains([1, 2, 3], 3)).toBe(true);


    const arr: readonly number[] = [1, 2, 3];

    //Accepts readonly:
    expect(contains(arr, 4)).toBe(false);

})

test("orRx", async () => {
    const a = 10;
    const b = rx.from(delay(100)).pipe(rxOps.map(x => 20));
    const c = rx.from(delay(100)).pipe(rxOps.map(x => null));
    {
        //Se ejecuta de forma síncrona:
        const ret = orRx(a, b, c);
        expect(ret).toEqual(a);
    }
    {
        const ret = orRx(null as any, b);
        //ret es observable
        expect(isObservable(ret)).toBeTruthy();
        const retRx = ret as rx.Observable<number>;
        expect(await retRx.toPromise()).toEqual(20);
    }

    {
        const ret = orRx(null, c);
        //ret es observable
        expect(isObservable(ret)).toBeTruthy();
        const retRx = ret as rx.Observable<null>;
        expect(await retRx.toPromise()).toEqual(null);
    }

    {
        const ret = orRx(null, c, b);
        //ret es observable
        expect(isObservable(ret)).toBeTruthy();
        const retRx = ret as rx.Observable<null>;
        expect(await retRx.toPromise()).toEqual(20);
    }

    {
        const ret = orRx(null, b, c);
        //ret es observable
        expect(isObservable(ret)).toBeTruthy();
        const retRx = ret as rx.Observable<null>;
        expect(await retRx.toPromise()).toEqual(20);
    }

    {
        const ret = orRx(null as any, b, 30);
        //ret es observable
        expect(isObservable(ret)).toBeTruthy();
        const retRx = ret as any;
        expect(await retRx.toPromise()).toEqual(20);
    }

    {
        const ret = orRx(a, b, c);
        //ret es observable
        expect(isObservable(ret)).toBeFalsy();
        expect(ret).toEqual(10);
    }
});

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

    const obsA = rx.from(promA);
    const obsB = rx.from(promA);
    const obsC = rx.from(promC);

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

    const obsA = rx.from(promA);
    const obsB = rx.from(promA);
    const obsC = rx.from(promC);

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

test("unique 2", () => {
    const input = ["A", "a", "b", "B", "B"]
    const expected = ["A", "b"]

    const result = unique(input, (a, b) => a.toLowerCase() === b.toLowerCase());
    expect(result).toEqual(expected);
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

test("order by number", () => {
    const x = [1, 3, 2, 5, 4];
    const y = orderBy(x);
    expect(y).toEqual([1, 2, 3, 4, 5]);
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
    const arr = rx.from([1, 2,
        Promise.resolve(3),
        Promise.resolve(4),
        rx.from([5, 6, 7]),
        rx.from([8, 9]),
    ]);

    const flat = await rxFlatten(arr).pipe(rxOps.toArray()).toPromise();
    expect(flat).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test("to observable", async () => {
    const value = 10;
    const prom = Promise.resolve(30);
    const obs = rx.from([1, 2, 3]);

    expect(await toObservable(value).pipe(rxOps.toArray()).toPromise()).toEqual([10]);
    expect(await toObservable(prom).pipe(rxOps.toArray()).toPromise()).toEqual([30]);
    expect(await toObservable(obs).pipe(rxOps.toArray()).toPromise()).toEqual([1, 2, 3]);
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

    expect(isPromiseLike(a)).toBe(false);
    expect(isPromiseLike(b)).toBe(true);
    expect(isPromiseLike(c)).toBe(false);
    expect(isPromiseLike(d)).toBe(false);
    expect(isPromiseLike(e)).toBe(false);

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


test("map prev rx", async () => {
    const arr = [1, 4, 7, 10, 20];
    const obs = rx.from(arr);
    const ret = await mapPreviousRx(obs, 0).pipe(rxOps.toArray()).toPromise();

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

test("running total right", () => {
    const arr = [1, 3, 5, 10];

    const expected = [24, 21, 16, 6];
    const expectedRight = [6, 7, 10, 15];

    const actual = runningTotal(arr, 25, (a, b) => a - b, x => x);
    const actualRight = runningTotalRight(arr, 25, (a, b) => a - b, x => x);

    expect(actual).toEqual(expected);
    expect(actualRight).toEqual(expectedRight);
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

    expect(formatNumber(1000.0009, 1, 4, true)).toEqual("1,000.0009");
    expect(formatNumber(-1000.0009, 1, 4, true)).toEqual("-1,000.0009");
    expect(formatNumber(1000.0004, 1, 4, true)).toEqual("1,000.0004");
    expect(formatNumber(1000.0005, 1, 4, true)).toEqual("1,000.0005");
    expect(formatNumber(1000.0006, 1, 4, true)).toEqual("1,000.0006");
    expect(formatNumber(-1000.0006, 1, 4, true)).toEqual("-1,000.0006");
    expect(formatNumber(1000.0001, 1, 4, true)).toEqual("1,000.0001");
    expect(formatNumber(100.001, 1, 3, true)).toEqual("100.001");
    expect(formatNumber(1000.01, 1, 2, true)).toEqual("1,000.01");
    expect(formatNumber(1000.001, 1, 3, true)).toEqual("1,000.001");
    expect(formatNumber(1000.001, 1, 2, true)).toEqual("1,000.00");

    expect(formatNumber(1000.010, 1, 3, true)).toEqual("1,000.010");
    expect(formatNumber(1000.0101, 1, 4, true)).toEqual("1,000.0101");
    expect(formatNumber(1000.0111, 1, 4, true)).toEqual("1,000.0111");
    expect(formatNumber(1000.0111, 1, 2, true)).toEqual("1,000.01");
    expect(formatNumber(1000.010, 1, 2, true)).toEqual("1,000.01");
    expect(formatNumber(1000.0001, 1, 2, true)).toEqual("1,000.00");
    expect(formatNumber(1000.001001, 1, 3, true)).toEqual("1,000.001");
    expect(formatNumber(1000.001001, 1, 5, true)).toEqual("1,000.00100");
    expect(formatNumber(1000.001001, 1, 6, true)).toEqual("1,000.001001");


    expect(formatNumber(107.01, 1, 2, true)).toEqual("107.01");
    expect(formatNumber(187.05, 1, 2, true)).toEqual("187.05");
    expect(formatNumber(1007.01, 1, 2, true)).toEqual("1,007.01");
    expect(formatNumber(2.599, 1, 1)).toEqual("2.5");
    expect(formatNumber(-2.599, 1, 1)).toEqual("-2.5");


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


test("is observable", () => {
    expect(isObservable(rx.from([undefined]))).toBe(true);
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

test("zip min", () => {
    const x = [1, 2, 3, 4];
    const y = ["a", "b", "c"];

    const ret = zip({ x, y }, "min");
    expect(ret).toEqual([
        { x: 1, y: "a" },
        { x: 2, y: "b" },
        { x: 3, y: "c" },
    ])
});

test("zip max", () => {
    const x = [1, 2, 3, 4];
    const y = ["a", "b", "c"];

    const ret = zip({ x, y }, "max");
    expect(ret).toEqual([
        { x: 1, y: "a" },
        { x: 2, y: "b" },
        { x: 3, y: "c" },
        { x: 4 }
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
});

test("exclude 2", () => {
    const items = [
        { id: 10, nombre: "rafa" },
        { id: 15, nombre: "ale" },
        { id: 18, nombre: "juan" },
        { id: 7, nombre: "carlos" },
        { id: 5, nombre: "neto" },
    ];
    const ids = [15, 7];

    const ret = exclude(items, ids, (a, b) => a.id == b);
    const expected = [
        { id: 10, nombre: "rafa" },
        { id: 18, nombre: "juan" },
        { id: 5, nombre: "neto" },
    ];

    expect(ret).toEqual(expected);

    const ret2 = excludeKeys(items, [10, 7], x => x.id);

    const expected2 = [
        { id: 15, nombre: "ale" },
        { id: 18, nombre: "juan" },
        { id: 5, nombre: "neto" },
    ]
    expect(ret2).toEqual(expected2);
});

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
            .map(x => ({ nombre: x.left.nombre, pais: x.right?.nombre }));

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
        { id: 2, nombre: "Ale" },
        { id: 1, nombre: "Rafaelito", x: 1 },
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

test("sum", () => {
    expect(sum([])).toBe(0);
    expect(sum([null, undefined])).toBe(0);
    expect(sum([0, null, undefined])).toBe(0);
    expect(sum([0, null, undefined, 4])).toBe(4);
    expect(sum([0, null, undefined, 4, 3])).toBe(7);
});

test("nextToPromise", async () => {
    const obs = new rx.BehaviorSubject(1);

    const a = await nextToPromise(obs);
    expect(a).toBe(1);

    obs.next(2);

    const b = await nextToPromise(obs);
    expect(b).toBe(2);
});

test("nextToPromise sync", () => {

    let subsCount = 0;
    let unsubsCount = 0;
    const orig = rx.from([2, 3, 4]);

    const obs = new rx.Observable(observer => {
        subsCount++;
        const ss = orig.subscribe(observer);

        return () => {
            ss.unsubscribe();
            unsubsCount++;
        };
    });

    const syncProm = nextToPromise(obs);
    const value = syncPromiseValue(syncProm);

    expect(value).toEqual({
        status: "resolved",
        value: 2
    });

    expect(subsCount).toBe(1);
    expect(unsubsCount).toBe(1);
});

test("nextToPromise async", async () => {

    let subsCount = 0;
    let unsubsCount = 0;
    const orig = rx.from(delay(100).then(x => 2))

    const obs = new rx.Observable(observer => {
        subsCount++;
        const ss = orig.subscribe(observer);

        return () => {
            ss.unsubscribe();
            unsubsCount++;
        };
    });

    const value = await nextToPromise(obs);

    expect(value).toEqual(2);

    expect(subsCount).toBe(1);
    expect(unsubsCount).toBe(1);
});

test("rx Obj", () => {

    const a = new rx.Subject<number>();
    const b = new rx.Subject<number>();
    const c = new rx.BehaviorSubject("hola");

    const obj = { a, b, c };
    const obsObj = objRxToRxObj(obj);

    let ret: {
        count: number,
        obj: (typeof obsObj) extends rx.Observable<infer R> ? R : any
    } = {
        count: 0,
        obj: null as any
    };

    obsObj.subscribe(next => ret = {
        count: ret.count + 1,
        obj: next
    });

    //Aún no hay valores
    expect(ret).toEqual({ count: 0, obj: null });

    //Asignar a = 2
    a.next(2);
    expect(ret).toEqual({ count: 0, obj: null }); //Falta b

    //Asignar b = 3
    b.next(3);
    expect(ret).toEqual({
        count: 1,
        obj: {
            a: 2,
            b: 3,
            c: "hola"
        }
    });

    //Cambiar c a "rafa"
    c.next("rafa");
    expect(ret).toEqual({
        count: 2,
        obj: {
            a: 2,
            b: 3,
            c: "rafa"
        }
    });

    //Cambiar a = 4
    a.next(4);
    expect(ret).toEqual({
        count: 3,
        obj: {
            a: 4,
            b: 3,
            c: "rafa"
        }
    });

    //Cambiar a = 5
    a.next(5);
    expect(ret).toEqual({
        count: 4,
        obj: {
            a: 5,
            b: 3,
            c: "rafa"
        }
    });

    //Cambiar b = 8
    b.next(8);
    expect(ret).toEqual({
        count: 5,
        obj: {
            a: 5,
            b: 8,
            c: "rafa"
        }
    });
});


test("check range", () => {

    expect(outOfRange(10, {})).toBe(null);
    expect(outOfRange(10, {
        min: {
            value: 10,
            type: "in"
        }
    })).toBe(null);

    expect(outOfRange(10, {
        min: {
            value: 10,
            type: "ex"
        }
    })).toBe("min");

    expect(outOfRange(7, {
        min: {
            value: 10,
            type: "in"
        }
    })).toBe("min");

    expect(outOfRange(7, {
        min: {
            value: 10,
            type: "ex"
        }
    })).toBe("min");

    //

    expect(outOfRange(10, {
        max: {
            value: 10,
            type: "in"
        }
    })).toBe(null);

    expect(outOfRange(10, {
        max: {
            value: 10,
            type: "ex"
        }
    })).toBe("max");

    expect(outOfRange(11, {
        max: {
            value: 10,
            type: "in"
        }
    })).toBe("max");

    expect(outOfRange(34, {
        max: {
            value: 10,
            type: "ex"
        }
    })).toBe("max");

    const r: RangeOptional = {
        min: {
            value: 6,
            type: "in"
        },
        max: {
            value: 10,
            type: "ex"
        }
    };
    expect(outOfRange(6, r)).toBe(null);
    expect(outOfRange(5, r)).toBe("min");
    expect(outOfRange(10, r)).toBe("max");
    expect(outOfRange(13, r)).toBe("max");

});

test("check base64", () => {
    const base64 = "aG9sYQ==";
    const text = "hola";

    expect(base64ToString(base64)).toBe(text);
    expect(stringToBase64(text)).toBe(base64);
})

test("max", () => {
    const x = [1, 3, 2, 5, 4];
    const y = max(x);
    expect(max(x)).toEqual(5);
    expect(max(x, x => - x)).toEqual(1);
});

test("max key", () => {
    const x = [
        { a: 1, b: 1 },
        { a: 3, b: 1 },
        { a: 3, b: 2 },
        { a: 3, b: 1 },
        { a: 2, b: 5 },
    ];

    const maxVal = max(x, x => x.a, x => x.b);
    expect(maxVal).toEqual({ a: 3, b: 2 });
});

test("min", () => {
    const x = [1, 3, 2, 5, 4];
    expect(min(x)).toEqual(1);
    expect(min(x, x => - x)).toEqual(5);
});

test("min key", () => {
    const x = [
        { a: 1, b: 1 },
        { a: 3, b: 1 },
        { a: 3, b: 2 },
        { a: 3, b: 1 },
        { a: 2, b: 5 },
        { a: 0, b: 2 },
        { a: 0, b: 5 },
        { a: 2, b: 5 },
    ];

    const minVal = min(x, x => x.a, x => x.b);
    expect(minVal).toEqual({ a: 0, b: 2 });
});

test("enum keys", () => {
    enum MiEnum {
        A = 3,
        B = 4,
        C = 5
    };

    const keys = enumKeys(MiEnum);
    expect(keys).toEqual([
        MiEnum.A,
        MiEnum.B,
        MiEnum.C
    ]);

});


interface LogObservableItem<T> {
    /**Valor del elememto */
    x: T;
    /**Tiempo en las unidades de tiempo */
    time: number;
    /**Si el item fue devuelto inmediatamente en la subscripción del observable */
    imm: boolean;
}
async function logObservable<T>(rx: rx.Observable<T>, unitMs: number): Promise<LogObservableItem<T>[]> {
    let ret: LogObservableItem<T>[] = [];
    const start = new Date();

    let inmediato = true;
    const prom = rx
        .pipe(
            rxOps.tap(x => {
                const now = new Date();
                const time = now.valueOf() - start.valueOf();

                ret.push({
                    x: x,
                    time: Math.round(time / unitMs),
                    imm: inmediato
                });
            })
        )
        .toPromise();

    inmediato = false;
    await prom;

    return ret;
}

test("syncResolve", async () => {
    let inmediato = true;
    let promIm;

    let orden: string[] = [];
    const prom = syncResolve(10).then(x => {
        orden.push("then");
        promIm = inmediato;
        return x + 1;
    });

    orden.push("constructed");

    inmediato = false;

    const ret = await prom;
    orden.push("after await");

    expect(ret).toBe(11);
    expect(promIm).toBe(true);

    expect(orden).toEqual(["then", "constructed", "after await"]);
});

test("syncPromise", () => {
    const notSync = Promise.resolve(3);
    const sync = syncResolve(3);

    expect(isSyncPromise(notSync)).toEqual(false);

    expect(syncPromiseValue(sync)).toEqual({
        value: 3,
        status: "resolved"
    });
});


test("debounce", async () => {
    return;
    type Log = LogObservableItem<number>[];
});

test("mergeObj", () => {
    const a = {
        a: 10,
        b: 4,
        c: 7
    };

    const b = {
        b: 4,
        c: 5,
        d: 3
    };

    type A = keyof ((typeof a) & (typeof b));

    const c = mergeObj(a, b, (x, y) => (x || 0) + (y || 0));
    expect(c).toEqual({
        a: 10,
        b: 8,
        c: 12,
        d: 3
    })
});

test("treeTrav", () => {
    interface Tree {
        val: string,
        child: Tree[]
    }
    const tree: Tree = {
        val: "root",
        child: [
            {
                val: "a",
                child: []
            },
            {
                val: "b",
                child: [
                    {
                        val: "c",
                        child: []
                    }, {
                        val: "d",
                        child: [
                            {
                                val: "e",
                                child: []
                            }, {
                                val: "f",
                                child: []
                            }
                        ]
                    }
                ]
            }
        ]
    };

    const items = treeTraversal([tree], x => x.child).map(x => x.val);

    expect(items).toEqual(["root", "a", "b", "c", "d", "e", "f"]);
});


test("promise to obs", async () => {
    const prom = delay(1).then(x => 10);
    const obs = toObservable(prom);

    let a: number = 0, b: number = 0;

    const c = await prom;
    expect(c).toBe(10);

    //Se asegura que el observable devuelve el valor de la promesa incluso si se subscribe despupes de que termino la promesa
    obs.subscribe(x => a = x);
    await delay(5); //Recordamos que el promise no es sincrono
    debugger;
    expect(a).toBe(10);

    await delay(100);

    //En el segundo intento debe de devolver síncronamente:
    obs.subscribe(x => b = x);
    expect(b).toBe(10);
});


test("promise to obs sync", async () => {
    const prom = syncResolve().then(x => 10);
    const obs = toObservable(prom);

    let a: number = 0, b: number = 0;

    //Sincronamente se asigna el valor:
    obs.subscribe(x => a = x);
    expect(a).toBe(10);

    await delay(10);

    obs.subscribe(x => b = x);
    expect(b).toBe(10);
});


