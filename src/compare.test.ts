import { shallowEqualsCustom, ShallowEqualsConfig, referenceFuncIgnoreEquals } from "./compare";
import { referenceEquals, deepEquals } from "./logic";

test("shallow equals custom", () => {
    const instance = { value: 10 };
    const instance2 = { value: 10 };
    const a = {
        x : () => {},
        a: instance,
        b: {
            x: 10,
            y: 20
        },
    };

    const b = {
        x : () => {},
        a: instance,
        b: {
            x: 10,
            y: 20
        },
    };

    const c = {
        x : 2 as any,
        a: instance,
        b: {
            x: 10,
            y: 20
        },
    };
    
    const d = {
        x : () => {},
        a: instance2,
        b: {
            x: 10,
            y: 20
        },
    };

    const e = {
        x : () => {},
        a: instance,
        b: {
            x: 10,
            y: 21
        },
    };


    const config: ShallowEqualsConfig<typeof a> = {
        a: referenceEquals,
        b: deepEquals
    };

    expect(shallowEqualsCustom(a, b, config, referenceFuncIgnoreEquals)).toBe(true);
    expect(shallowEqualsCustom(a, c, config, referenceFuncIgnoreEquals)).toBe(false);
    expect(shallowEqualsCustom(a, d, config, referenceFuncIgnoreEquals)).toBe(false);
    expect(shallowEqualsCustom(a, e, config, referenceFuncIgnoreEquals)).toBe(false);
});