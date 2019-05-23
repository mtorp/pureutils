import * as rx from "rxjs";
import { toSelector, createSelector } from "../selector";
import { createSelectorRx, createSelectorAsync } from "./async";
import { toArray } from "rxjs/operators";
import { delay } from "../../logic";

async function expectObs<T>(actual: rx.Observable<T>, expected: T[]) {
    const arr = await actual.pipe(toArray()).toPromise();
    expect(arr).toEqual(expected);
}

test("selector mismo observable", async () => {
    const selId = toSelector((id: number) => id);
    const selValue = toSelector((id: number) => id * 2);

    const obs = rx.from([3]);
    const obsSel = toSelector((id: number) => obs);

    const mul = createSelectorRx({
        selValue,
        obsSel
    }, x => x.selValue * x.obsSel);

    {
        const x = mul.call(4);
        const y = mul.call(4);
        const z = mul.call(3);

        await expectObs(x, [24]);
        expect(x).toBe(y);

        await expectObs(z, [18]);
        expect(z).not.toBe(x);

    }
});


test("selector devolver el mismo observable 2", async () => {
    type In = { props: number, state: number | null };
    const id = toSelector( (x: In) => x.props);

    
    const valueFromState = toSelector((x: In) => x.state);
    let subCount = 0;
    const valueFromResource = createSelectorRx({ id }, x => new rx.Observable<number>(subs => {
        subs.next(x.id * 3);
        subCount++;
    }));

    const value = createSelector({
        state: valueFromState,
        resource: valueFromResource
    }, x => x.state ? rx.from([x.state]) : x.resource);

    const obs0 = value.call({props: 10, state: null});
    obs0.subscribe(x => { });

    const obs1A = value.call({props: 10, state: 2});
    obs1A.subscribe(x => { });

    const obs1B = value.call({props: 10, state: 2});
    obs1B.subscribe(x => { });

    const obs2 = value.call({props: 10, state: 3});
    obs2.subscribe(x => { });

    const obs3 = value.call({props: 10, state: 4});
    obs3.subscribe(x => { });

    expect(subCount).toBe(1);

    expect(obs0).not.toBe(obs1A);

    expect(obs1A).toBe(obs1B);
    expect(obs1A).not.toBe(obs2);
    expect(obs2).not.toBe(obs3);

});

test("async create selector simple test", async () => {
    interface Props {
        value: number;
    }
    const value = toSelector((x: Props) => x.value);

    const incrementAsync = createSelectorRx({value}, x => delay(100).then(() => x.value + 1));

    const dup = createSelectorRx({value}, x => x.value * 2);
    const sum = createSelectorRx({incrementAsync, dup}, x => x.incrementAsync + x.dup);

    const func = (x: number) => (x + 1) + (x * 2);
    //(value + 1) + (value * 2)
    expect(await sum.call({ value: 2 }).toPromise()).toBe(func(2));
    expect(await sum.call({ value: 5 }).toPromise()).toBe(func(5));
});

test("async create selector async memoize", async () => {
    interface Props {
        a: number;
        b: number;
    }
    const a = toSelector((x: Props) => x.a);
    const increment = createSelectorAsync({a}, x => delay(100).then(() => x.a + 1));
    let samePromiseCalls = 0;
    const samePromise = createSelectorAsync({increment}, x => {
        samePromiseCalls++;
        return Promise.resolve(10);
    }); //Este selector cada vez devuelve una promesa diferente, pero con el mismo valor

    let sumCalls = 0;
    const sumObs = createSelectorAsync({samePromise}, x => {
        sumCalls++;
        return x.samePromise + 1;
    });

    const sum = (x: Props) => sumObs.call(x);

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
    const props = toSelector((x: Props) => x);
    let samePromiseCalls = 0;
    const samePromise = createSelectorRx({props}, x => {
        samePromiseCalls++;
        return Promise.resolve({ a: 10, b: 30 });
    }); //Este selector cada vez devuelve una promesa diferente, pero con el mismo valor

    let sumCalls = 0;
    const sum = createSelectorRx({samePromise}, x => {
        sumCalls++;
        return x.samePromise.a + 1;
    }, { deep: true});

    expect(samePromiseCalls).toBe(0);
    expect(sumCalls).toBe(0);

    await sum.call({ a: 10, b: 20 }).toPromise();

    expect(samePromiseCalls).toBe(1);
    expect(sumCalls).toBe(1);

    await sum.call({ a: 10, b: 20 }).toPromise();

    expect(samePromiseCalls).toBe(2);
    expect(sumCalls).toBe(1);
});


test("selector al tener error no debe de memoizar SYNC", async () => {
    const a = toSelector(() => 10);
    let count = 0;
    const sum = createSelector({a}, x => {
        count++;
        if (count >= 3) return x.a;
        else
            throw new Error("Error de prueba");
    });

    let errCount = 0;
    try { sum.call({}); } catch (error) { errCount++; }
    try { sum.call({}); } catch (error) { errCount++; }
    expect(sum.call({})).toBe(10);

    expect(errCount).toBe(2);
    expect(count).toBe(3);

    sum.call({});
    sum.call({});

    expect(errCount).toBe(2);
    expect(count).toBe(3);
});


