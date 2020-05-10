import {  toSyncPromise, isSyncPromise, isSyncPromiseType } from "./logic";
import { delay } from "../logic";
import { SyncPromise } from "./split";

test("asyncToSyncPromise ", async () => {
    const prom = (async () => {
        await delay(10);
        return 20;
    })();

    const syncProm = toSyncPromise(prom);
    
    expect(isSyncPromise(prom)).toBe(false);
    expect(isSyncPromise(syncProm)).toBe(false);


    const value = await prom;
    //Incluso después del await la promesa sigue sin ser síncrona
    expect(isSyncPromise(prom)).toBe(false);
    expect(isSyncPromise(syncProm)).toBe(true);
});

test("type test", async () => {
    expect(isSyncPromiseType(Promise)).toBe(false);
    expect(isSyncPromiseType(SyncPromise)).toBe(true);
})

test("asyncToSyncPromise 2", async () => {
    const prom = (async () => {
        await delay(10);
        return 20;
    })();

    const syncProm = toSyncPromise(prom);
    expect(isSyncPromise(syncProm)).toBe(false);

    const value = await syncProm;
    expect(value).toBe(20);
});



test("asyncToSyncPromise error", async () => {
    const func = (async () => {
        await delay(10);
        throw "hola";
    });
    const prom = func();

    const value = await prom.then(undefined, err => err + " rafa");
    expect(value).toBe("hola rafa");

    const syncProm = toSyncPromise(func());
    const value2 = await syncProm.then(undefined, err => err + " ale");
    expect(value2).toBe("hola ale");

    debugger;
    expect(isSyncPromise(syncProm)).toBe(true);
});
