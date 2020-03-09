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

test("stringMoves 1", () => {
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