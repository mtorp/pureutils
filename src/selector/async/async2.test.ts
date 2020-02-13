import { toSelector } from "../selector";
import { createSelectorAsync } from "./async";
import { isSyncPromise, delay, toSyncPromise, obsToPromise, toObservable } from "../../logic";

test("obsToPrimise", async () => {
    //La función es asíncrona y devuelve 20
    const func = async (id: number) => {
        delay(10);
        return 20;
    };

    const prom = toSyncPromise(func(0));


    const obs = toObservable(prom);
    const fromObs = obsToPromise(obs);

    const value = await prom;
    debugger;
    expect(isSyncPromise(prom)).toBe(true);
    expect(isSyncPromise(fromObs)).toBe(true);
})

test("promise resolved is sync", async () => {
    //La función es asíncrona y devuelve 20
    const func = async (id: number) => {
        delay(10);
        return 20;
    };

    const idSel = toSelector((id: number) => id);
    const funcSel = createSelectorAsync({ idSel }, s => func(s.idSel));

    const prom1 = funcSel.call(0);
    //La primera llamada es asíncrona:
    expect(isSyncPromise(prom1)).toBe(false);

    const value = await prom1;
    expect(value).toBe(20);

    debugger;
    const prom2 = funcSel.call(0);
    //La segunda llamada es síncrona:
    expect(isSyncPromise(prom2)).toBe(true);
});