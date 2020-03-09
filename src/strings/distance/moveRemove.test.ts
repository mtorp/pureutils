import { applyStringMove } from "./moveRemove";

test("moveRemove", () => {
    const source = "012345678";

    const a = applyStringMove(source, {
        type: "move",
        oldIndex: 6,
        newIndex: 3
    });

    expect(a).toBe("012634578");

    const b = applyStringMove(source, {
        type: "move",
        oldIndex: 3,
        newIndex: 6
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
});