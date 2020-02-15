import { findAll } from "./strings";

test("findAll", () => {
    const ret = findAll("holala", /la/) ;
    expect(ret).toEqual([
        {
            index: 2,
            len: 2
        }, {
            index: 4,
            len: 2
        }
    ])
});

test("findAll 2", () => {
    const ret = findAll("ho12la3", /\d+/) ;
    expect(ret).toEqual([
        {
            index: 2,
            len: 2
        }, {
            index: 6,
            len: 1
        }
    ])
});

test("findAll 3", () => {
    const ret = findAll("ho12la345nd67", /\d{2}/) ;
    expect(ret).toEqual([
        {
            index: 2,
            len: 2
        }, {
            index: 6,
            len: 2
        }, {
            index: 11,
            len: 2
        }
    ])
});