import { createSelector } from "./selector"
test("selector simple test", () => {
    interface Props {
        a: number;
        b: number;
    }

    const a = (x: Props) => x.a;
    const b = (x: Props) => x.b;

    let a1Calls = 0;
    const a1 = createSelector({
        a: a
    }, (curr) => {
        a1Calls++;
        return curr.a + 5;
    });

    let b1Calls = 0;
    const b1 = createSelector({
        b: b
    }, (curr) => {
        b1Calls++;
        return curr.b + 2;
    });

    let abCalls = 0;
    const ab = createSelector({
        a: a1,
        b: b1
    }, curr => {
        abCalls++;
        return curr.a * curr.b;
    });

    {
        const r1 = ab({
            a: 2,
            b: 3
        });

        expect(r1).toBe(35);
        expect(a1Calls).toBe(1);
        expect(b1Calls).toBe(1);
        expect(abCalls).toBe(1);
    }

    {
        //Llamar de nuevo, con los mismos props:
        ab({
            a: 2,
            b: 3
        });

        expect(a1Calls).toBe(1);
        expect(b1Calls).toBe(1);
        expect(abCalls).toBe(1);
    }

    {
        //Cambiar sólo un prop:
       const r2 = ab({
            a: 1,
            b: 3
        });

        expect(r2).toBe(30);
        expect(a1Calls).toBe(2);
        expect(b1Calls).toBe(1);
        expect(abCalls).toBe(2);
    }
});