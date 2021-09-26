import { syncResolve } from "./promise";
import { asyncThunkToObservable, numEqStr, parseFormattedNumber, xor, groupByCount, leftJoin, formatNumber, groupByAdjacent, Grouping, getDecimalCount, reorder } from "./logic";
import { delay } from "rxjs/operators";
import { dateDiff, getTimeIntervalScale } from "./dates";
import { asciiToHex, hexToAscii, padLeft, padRight } from ".";



test("asyncThunkToObs sync", async () => {

    //sync resolve:
    let count = 0;
    const thunk = () => {
        count++;
        return syncResolve(10);
    };

    const obs = asyncThunkToObservable(thunk);

    //Aún no se llama:
    expect(count).toBe(0);

    let result: number = 0;
    //Se resuelve síncronamente:
    obs.subscribe(x => result = x);
    expect(result).toBe(10);
    expect(count).toBe(1);

    result = 0;
    await delay(10);

    //Subsecuentes subscripciones no llaman al thunk
    obs.subscribe(x => result = x);
    expect(result).toBe(10);
    expect(count).toBe(1);

});

test("getDecimalCount", () => {

    expect(getDecimalCount("1.1234e3")).toEqual(1);
    expect(getDecimalCount("1.123e3")).toEqual(0);
    expect(getDecimalCount("100")).toEqual(0);
    expect(getDecimalCount("0")).toEqual(0);
    expect(getDecimalCount("0.00")).toEqual(2);
    expect(getDecimalCount("0.01")).toEqual(2);
    expect(getDecimalCount("0.000001")).toEqual(6);
    expect(getDecimalCount("0.99")).toEqual(2);
    expect(getDecimalCount("1e-7")).toEqual(7);
    expect(getDecimalCount("1.99e-7")).toEqual(9);
    expect(getDecimalCount("99.999e-7")).toEqual(10);


});

test("formatNum", () => {
    expect(formatNumber(Number.NaN, undefined, 2, true, "$", true)).toBe("NaN");
    expect(formatNumber(Number.POSITIVE_INFINITY, undefined, 2, true, "$", true)).toBe("Infinity");
    expect(formatNumber(Number.NEGATIVE_INFINITY, undefined, 2, true, "$", true)).toBe("-Infinity");

    expect(formatNumber(10.1234, undefined, 2)).toBe("10.12");
    expect(formatNumber(10.1299, undefined, 2)).toBe("10.12");
    expect(formatNumber(10.12999, undefined, 2)).toBe("10.12");
    expect(formatNumber(10.129999, undefined, 2)).toBe("10.13");

    expect(formatNumber(10.4, undefined)).toBe("10");
    expect(formatNumber(10.5, undefined)).toBe("10");

    expect(formatNumber(10.99, undefined, 2)).toBe("10.99");
    expect(formatNumber(10.999999, undefined, 2)).toBe("11.00");


})

test("asyncThunkToObs async", async () => {
    let count = 0;
    const thunk = async () => {
        count++;
        await delay(100);
        return 10;
    };

    const obs = asyncThunkToObservable(thunk);

    //Aún no se llama:
    expect(count).toBe(0);

    let a = 0, b = 0;
    obs.subscribe(x => a = x);

    //La primera llamada:
    expect(count).toBe(1);
    expect(a).toBe(0);

    await delay(10);

    //Otra subscripción antes de que termine la primera:
    obs.subscribe(x => b = x);

    //Ya no hay más llamadas:
    expect(count).toBe(1);
    expect(a).toBe(0);
    expect(b).toBe(0);

    const c = await obs.toPromise();

    //Ya se resolvieron todos los valores:

    expect(a).toBe(10);
    expect(b).toBe(10);
    expect(c).toBe(10);
})

test("numEqStr", () => {
    expect(numEqStr(Number.NaN, "NaN")).toBe(true);
    expect(numEqStr(Number.NEGATIVE_INFINITY, "-Infinity")).toBe(true);
    expect(numEqStr(Number.POSITIVE_INFINITY, "Infinity")).toBe(true);

    expect(numEqStr(0.005044383, "0.005044383000000001")).toBe(true);

    expect(numEqStr(1.458, "1.4")).toBe(true);

    expect(numEqStr(1, "")).toBe(false);
    expect(numEqStr(1, "")).toBe(false);
    expect(numEqStr(1, ".")).toBe(false);
    expect(numEqStr(1, ".1")).toBe(false);
    expect(numEqStr(1, "2")).toBe(false);
    expect(numEqStr(1, "1.1")).toBe(false);

    expect(numEqStr(0, "0")).toBe(true);
    expect(numEqStr(0, "00000")).toBe(true);
    expect(numEqStr(+0, "0")).toBe(true);
    expect(numEqStr(-0, "0")).toBe(true);

    expect(numEqStr(0, "+0")).toBe(true);
    expect(numEqStr(0, "-0")).toBe(true);
    expect(numEqStr(0, "-000")).toBe(true);
    expect(numEqStr(0, "+000.000")).toBe(true);
    expect(numEqStr(0, "-0.00")).toBe(true);
    expect(numEqStr(0, "0.00")).toBe(true);
    expect(numEqStr(0, "0.00000000")).toBe(true);

    expect(numEqStr(0, "+000.0001")).toBe(false);
    expect(numEqStr(0, "-0.0001")).toBe(false);

    expect(numEqStr(0.0001, "0.0001")).toBe(true);
    expect(numEqStr(0.0001, "+0.0001")).toBe(true);
    expect(numEqStr(0.0001, "-0.0001")).toBe(false);

    expect(numEqStr(1, "1")).toBe(true);
    expect(numEqStr(1, "+1")).toBe(true);
    expect(numEqStr(1, "-1")).toBe(false);

    expect(numEqStr(120, "120")).toBe(true);
    expect(numEqStr(120, "+120")).toBe(true);
    expect(numEqStr(-120, "-120")).toBe(true);
    expect(numEqStr(-120, "120")).toBe(false);

    expect(numEqStr(120, "120.1")).toBe(false);
    expect(numEqStr(120.1, "120.1")).toBe(true);
    expect(numEqStr(120.1, "120.2")).toBe(false);
    expect(numEqStr(120.1, "+120.2")).toBe(false);
    expect(numEqStr(120.1, "120.12")).toBe(false);
    expect(numEqStr(-120.1, "-120.1")).toBe(true);

    expect(numEqStr(120.1201, "120.12")).toBe(true);
    expect(numEqStr(120.1200001, "120.12")).toBe(true); //debido al epsilon se consideran iguales
    expect(numEqStr(120.1200001, "+120.12")).toBe(true); //debido al epsilon se consideran iguales
    expect(numEqStr(120.1200001, "120.1200000")).toBe(false); //como la cadena es mas larga la comparación es de mas precisión
    expect(numEqStr(120.1200001, "120.1200001")).toBe(true);
    expect(numEqStr(-120.1200001, "120.1200001")).toBe(false);
    expect(numEqStr(120.1200001, "120.13")).toBe(false);

    expect(numEqStr(1000020.13, "1000020.13")).toBe(true);
    expect(numEqStr(1000020.13, "1,000,020.13")).toBe(true);
    expect(numEqStr(1000020.1300000001, "1,000,020.13")).toBe(true);
    expect(numEqStr(1000020.1300000001, "1,000,021.13")).toBe(false);


    expect(numEqStr(1000020.1300000001, "+1,000,020.13")).toBe(true);
    expect(numEqStr(1000020.1300000001, "-1,000,020.13")).toBe(false);
    expect(numEqStr(-1000020.1300000001, "-1,000,020.13")).toBe(true);
    expect(numEqStr(-1000020.1300000001, "+1,000,020.13")).toBe(false);

    expect(numEqStr(0.001999, "0.001")).toBe(true);
    expect(numEqStr(0.0019999, "0.002")).toBe(true);
    expect(numEqStr(0.0004999, "0.00")).toBe(true);
    expect(numEqStr(0.0004999, "0.000")).toBe(true);
    expect(numEqStr(0.0004999, "0.0000")).toBe(false);
    expect(numEqStr(0.0004999, "0.0004")).toBe(true);
    expect(numEqStr(0.0004999, "0.0005")).toBe(false);
    expect(numEqStr(0.00049999, "0.0005")).toBe(true);


    expect(numEqStr(10.1234, "10.12")).toBe(true);

    expect(numEqStr(10.1299, "10.12")).toBe(true);
    expect(numEqStr(10.12999, "10.12")).toBe(true);
    expect(numEqStr(10.129999, "10.13")).toBe(true);
    expect(numEqStr(10.4, "10")).toBe(true);
    expect(numEqStr(10.5, "10")).toBe(true);
    expect(numEqStr(10.99, "10.99")).toBe(true);
    expect(numEqStr(10.999999, "11.00")).toBe(true);

    expect(numEqStr(10.999999, "11.00")).toBe(true);

    expect(numEqStr(123456789.12345679, "123,456,789.12345")).toBe(true);

});

test("parseFormattedNumber", () => {
    expect(parseFormattedNumber("NaN")).toBe(Number.NaN);
    expect(parseFormattedNumber("-Infinity")).toBe(Number.NEGATIVE_INFINITY);
    expect(parseFormattedNumber("Infinity")).toBe(Number.POSITIVE_INFINITY);


    expect(parseFormattedNumber("1")).toBe(1);
    expect(parseFormattedNumber("100.1343")).toBe(100.1343);
    expect(parseFormattedNumber("-100.1343")).toBe(-100.1343);
    expect(parseFormattedNumber("-1,000.1343")).toBe(-1000.1343);
    expect(parseFormattedNumber("-1,000,020.1343")).toBe(-1000020.1343);
    expect(parseFormattedNumber("$-1,000,020.1343")).toBe(-1000020.1343);
});

test("xor test", () => {
    expect(xor([1, 2, 3], [2, 3, 4, 5])).toEqual([1, 4, 5]);
    expect(xor([], [2, 3, 4, 5])).toEqual([2, 3, 4, 5]);
    expect(xor([3, 2, 5], [2])).toEqual([3, 5]);
    expect(xor([3, 2, 5], [])).toEqual([3, 2, 5]);
    expect(xor([3, 2, 5], [5, 2, 3])).toEqual([]);
    expect(xor([3, 2, 5], [5, 2, 1, 3])).toEqual([1]);
    expect(xor([3, 2, 5, 0], [5, 2, 1, 3])).toEqual([0, 1]);
});

test("group by count", () => {
    expect(groupByCount([], 0)).toEqual([]);
    expect(groupByCount([], 3)).toEqual([]);
    expect(groupByCount([1], 3)).toEqual([[1]]);
    expect(groupByCount([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
    expect(groupByCount([1, 2, 3, 4, 5, 6], 3)).toEqual([[1, 2, 3], [4, 5, 6]]);
    expect(groupByCount([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
    expect(groupByCount([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

    expect(groupByCount([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
    expect(() => {
        groupByCount([1, 2, 3], 0);
    }).toThrow();

});

test("group by adjacent", () => {

    expect(groupByAdjacent([], x => x)).toEqual([]);

    expect(groupByAdjacent([1, 1, 1, 2, 1, 1, 3, 3, 2, 2, 1, 1], x => x)).toEqual([
        {
            key: 1,
            items: [1, 1, 1]
        }, {
            key: 2,
            items: [2]
        }, {
            key: 1,
            items: [1, 1]
        }, {
            key: 3,
            items: [3, 3]
        }, {
            key: 2,
            items: [2, 2]
        }, {
            key: 1,
            items: [1, 1]
        }
    ] as Grouping<number, number>[]);

    expect(groupByAdjacent(["ra", "rb", "aa", "ab", "ra", "rc"], x => x.substr(0, 1))).toEqual([
        {
            key: "r",
            items: ["ra", "rb"]
        }, {
            key: "a",
            items: ["aa", "ab"]
        }, {
            key: "r",
            items: ["ra", "rc"]
        }
    ] as Grouping<string, string>[]);
});

test("reorder", () => {
    const items = [
        { key: "b" },
        { key: "c" },
        { key: "a" },
        { key: "d", value: 1 },
        { key: "d", value: 2 },
    ];

    expect(reorder(items, [], x => x.key)).toEqual([]);
    expect(reorder(items, ["x", "y", "z"], x => x.key)).toEqual([]);

    expect(reorder(items, ["a", "a"], x => x.key)).toEqual([
        { key: "a" },
        { key: "a" }
    ]);

    expect(reorder(items, ["a", "b", "c"], x => x.key)).toEqual([
        { key: "a" },
        { key: "b" },
        { key: "c" },
    ]);

    expect(reorder(items, ["c", "b", "a"], x => x.key)).toEqual([
        { key: "c" },
        { key: "b" },
        { key: "a" },
    ]);

    expect(reorder(items, ["c", "b", "b"], x => x.key)).toEqual([
        { key: "c" },
        { key: "b" },
        { key: "b" },
    ]);

    expect(reorder(items, ["d"], x => x.key)).toEqual([
        { key: "d", value: 1 },
        { key: "d", value: 2 },
    ]);

    expect(reorder(items, ["a", "d", "x", "d", "b", "d", "x"], x => x.key)).toEqual([
        { key: "a" },
        { key: "d", value: 1 },
        { key: "d", value: 2 },

        { key: "d", value: 1 },
        { key: "d", value: 2 },

        { key: "b" },


        { key: "d", value: 1 },
        { key: "d", value: 2 },

    ]);
});

test("time interval scale", () => {
    expect(getTimeIntervalScale(0)).toEqual({
        amount: 0,
        type: "zero",
        units: "seconds"
    });

    expect(getTimeIntervalScale(1)).toEqual({
        amount: 1,
        type: "one",
        units: "seconds"
    });

    expect(getTimeIntervalScale(2)).toEqual({
        amount: 2,
        type: "few",
        units: "seconds"
    });

    expect(getTimeIntervalScale(11)).toEqual({
        amount: 11,
        type: "number",
        units: "seconds"
    });

    expect(getTimeIntervalScale(60)).toEqual({
        amount: 1,
        type: "one",
        units: "minutes"
    });

    expect(getTimeIntervalScale(120)).toEqual({
        amount: 2,
        type: "number",
        units: "minutes"
    });

    expect(getTimeIntervalScale(3600 / 2)).toEqual({
        amount: 0,
        type: "half",
        units: "hours"
    });

    expect(getTimeIntervalScale(3600)).toEqual({
        amount: 1,
        type: "one",
        units: "hours"
    });

    expect(getTimeIntervalScale(3600 * 2)).toEqual({
        amount: 2,
        type: "number",
        units: "hours"
    });

    expect(getTimeIntervalScale(3600 * 24)).toEqual({
        amount: 1,
        type: "one",
        units: "days"
    });

    expect(getTimeIntervalScale(3600 * 24 * 3)).toEqual({
        amount: 3,
        type: "number",
        units: "days"
    });

    expect(getTimeIntervalScale(3600 * 24 * 40)).toEqual({
        amount: 1,
        type: "one",
        units: "months"
    });

    expect(getTimeIntervalScale(3600 * 24 * 70)).toEqual({
        amount: 2,
        type: "number",
        units: "months"
    });

    expect(getTimeIntervalScale(3600 * 24 * 400)).toEqual({
        amount: 1,
        type: "one",
        units: "years"
    });

    expect(getTimeIntervalScale(3600 * 24 * 750)).toEqual({
        amount: 2,
        type: "number",
        units: "years"
    });
});

test("dateDiff", () => {

    expect(dateDiff(new Date(2021, 0, 26), new Date(2021, 0, 25), "days")).toEqual(1);
    expect(dateDiff(new Date(2021, 0, 26), new Date(2021, 0, 25), "seconds")).toEqual(3600 * 24);
    expect(dateDiff(new Date(2021, 0, 25, 3), new Date(2021, 0, 25), "hours")).toEqual(3);
});

test("hexToAscii", () => {
    expect(hexToAscii("0x72656e7461310000000000000000000000000000000000000000000000000000")).toEqual("renta1");
    expect(hexToAscii("72656e7461310000000000000000000000000000000000000000000000000000")).toEqual("renta1");
    expect(hexToAscii("72656e746131")).toEqual("renta1");

    expect(hexToAscii("0x0000000000000000000000000000000035323034313634393937373237343937")).toEqual("5204164997727497");
    expect(hexToAscii("0x35323034313634393937373237343937")).toEqual("5204164997727497");
    expect(hexToAscii("35323034313634393937373237343937")).toEqual("5204164997727497");
});

test("asciiToHex", () => {
    expect(asciiToHex("A")).toEqual("41");
    expect(asciiToHex("ABC")).toEqual("414243");
    expect(asciiToHex("\t")).toEqual("09");
    expect(asciiToHex("\r\n")).toEqual("0d0a");
});

test("pad", () => {
    expect(padLeft("1", "0", 3)).toEqual("001");
    expect(padLeft("12", "0", 3)).toEqual("012");
    expect(padLeft("123", "0", 3)).toEqual("123");
    expect(padLeft("1234", "0", 3)).toEqual("1234");

    expect(padRight("1", "0", 3)).toEqual("100");
    expect(padRight("12", "0", 3)).toEqual("120");
    expect(padRight("123", "0", 3)).toEqual("123");
    expect(padRight("1234", "0", 3)).toEqual("1234");

})