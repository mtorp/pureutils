import { findAll, ReplaceIndex, getReplaceAllIndices } from "./strings";

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

test("infinite", () => {
    expect(() =>  findAll("hola", /\d*/)).toThrow(/infint/);
});

test("replace index 1", () => {

        const indices: ReplaceIndex[] = [
            {
                 index: 0,
                 inputLength: 1,
                 outputLength: 2
            }, {
                index: 3,
                inputLength: 1,
                outputLength: 2
            }
        ];

        const actual = getReplaceAllIndices(indices);
        expect(actual).toEqual([0, 4]);
});

test("replace index 2", () => {

    const indices: ReplaceIndex[] = [
        {
            index: 3,
            inputLength: 1,
            outputLength: 2
        }, 
        {
            index: 0,
            inputLength: 1,
            outputLength: 2
       }
    ];

    const actual = getReplaceAllIndices(indices);
    expect(actual).toEqual([3, 0]);
});

test("replace index 3", () => {

    const indices: ReplaceIndex[] = [
        {
            index: 3,
            inputLength: 1,
            outputLength: 3
        }, 
        {
            index: 0,
            inputLength: 1,
            outputLength: 2
       }, {
           index: 4,
           inputLength: 1,
           outputLength: 3
       }
    ];

    const actual = getReplaceAllIndices(indices);
    expect(actual).toEqual([3, 0, 7]);
});