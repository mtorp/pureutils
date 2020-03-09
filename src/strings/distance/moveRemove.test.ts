import { applyStringMove, getStringMoves } from "./moveRemove";

test("moveRemove", () => {
    const source = "012345678";

    const a = applyStringMove(source, {
        type: "move",
        sourceIndex: 6,
        destIndex: 3
    });

    expect(a).toBe("012634578");

    const b = applyStringMove(source, {
        type: "move",
        sourceIndex: 3,
        destIndex: 6
    });

    expect(b).toBe("012456378");

    const c = applyStringMove(source, {
        type: "remove",
        index: 3
    });

    expect(c).toBe("01245678");

    const d = applyStringMove(source, {
        type: "insert",
        index: 4,
        values: "9"
    });

    expect(d).toBe("0123945678");

    const e = applyStringMove(source, {
        type: "dup",
        sourceIndex: 2,
        destIndex: 5
    })
    expect(e).toBe("0123425678");
});

test("stringMoves moves", () => {
    const source = "ABCD";

    expect(getStringMoves(source, "ABCD")).toEqual([]);

    expect(getStringMoves(source, "ABC")).toEqual([
        {
            type: "remove",
            index: 3
        }
    ]);

    expect(getStringMoves(source, "AB")).toEqual([
        {
            type: "remove",
            index: 2
        }, {
            type: "remove",
            index: 2
        }
    ]);

    expect(getStringMoves(source, "BACD")).toEqual([
        {
            type: "move",
            sourceIndex: 1,
            destIndex: 0
        }
    ]);

});

test("stringMoves results", () => {
    const source = "ABCD";

    function test(dest: string) {
        const moves = getStringMoves(source, dest);
        const actualDest = moves.reduce((a, b) => applyStringMove(a, b), source);
        expect(actualDest).toEqual(dest);
    }

    test("ABABAB");
    test("CCCAAA");
    test("CCCAAACCC");
    test("FABCDF");
    test("ABCDF");
    test("DCBA");
    test("DCCBA");
    test("BCAAA");
    test("ACD");
    test("ABCD");
    test("BACD");
    test("A");
    test("");
    test("ABBCD");
    test("AAAA");
    test("CCCC");

});


test("stringMoves string array", () => {
    const source = ["ab", "cd", "ef"];

    function test(dest: string[]) {
        const moves = getStringMoves(source, dest);
        const actualDest = moves.reduce((a, b) => applyStringMove(a, b), source);
        expect(actualDest).toEqual(dest);
    }

    test(["ab", "cd", "ef"]);
    test(["cd", "ab", "ef"]);

});