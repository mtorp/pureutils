import { isSyncPromise, syncPromiseValue } from "./logic";
import { SyncPromise } from "./split";
import { delay } from "../logic";

test("split promise rejection bubbling", async () => {
    const prom = new SyncPromise<number>((resolve, reject) => {
        setInterval(() => {
            reject("error 1");
        }, 10)
    });

    let value1;
    const prom2 =
        prom
            .then(x => x + 1)
            .then(undefined, err => {
                value1 = err;
            })

    await delay(100);
    expect(value1).toBe("error 1");
});

test("split promise rejection", async () => {
    const prom = new SyncPromise<number>((resolve, reject) => {
        setInterval(() => {
            reject("error 1");
        }, 10)
    });

    let value1;
    const prom2 =
        prom
            .then(undefined, err => {
                value1 = err;
            })

    await delay(100);
    expect(value1).toBe("error 1");
});

test("split promise chainable", async () => {
    const prom = new SyncPromise<number>((resolve) => {
        setInterval(() => {
            resolve(20);
        }, 10)
    });

    let value1;
    const prom2 =
        prom
            .then(x => x + 1)
            .then(x => x * 2)
            .then(x => {
                value1 = x;
                ;
            })

    await delay(100);
    expect(value1).toBe(42);
});

test("split promise chainable", async () => {
    const prom = new SyncPromise<number>((resolve) => {
        setInterval(() => {
            resolve(20);
        }, 10)
    });

    const prom2 =
        prom
            .then(x => x + 1)
            .then(x => x * 2)
        ;

    const value1 = await prom2;
    expect(value1).toBe(42);
});


test("split promise multiple thens", async () => {
    const prom = new SyncPromise<number>((resolve) => {
        setInterval(() => {
            resolve(20);
        }, 10)
    });

    const prom2 = prom.then(x => x + 1)
    const prom3 = prom.then(x => x + 2)
    const prom4 = prom.then(x => x * 2)

    const value1 = await prom2;

    expect(syncPromiseValue(prom2).value).toBe(21);
    expect(syncPromiseValue(prom3).value).toBe(22);
    expect(syncPromiseValue(prom4).value).toBe(40);
});

test("split promise multiple thens 2", async () => {
    const prom = new SyncPromise<number>((resolve) => {
        setInterval(() => {
            resolve(20);
        }, 10)
    });

    const prom2 = prom.then(x => x + 1)
    const prom3 = prom.then(x => x + 2)
    const prom4 = prom.then(x => x * 2)

    await delay(100);

    expect(await prom2).toBe(21);
    expect(await prom3).toBe(22);
    expect(await prom4).toBe(40);
});



test("split promise thenable", async () => {
    const prom = new SyncPromise((resolve) => {
        setInterval(() => {
            resolve(20);
        }, 10)
    });

    expect(isSyncPromise(prom)).toBe(false);

    let value1;

    prom.then(x => value1 = x);
    await delay(100);
    expect(value1).toBe(20);
});

test("split promise is sync", async () => {
    const prom = new SyncPromise((resolve) => resolve(10));
    expect(isSyncPromise(prom)).toBe(true);
    expect(syncPromiseValue(prom).value).toBe(10);
});


test("split promise thenable 2", async () => {
    const prom = new SyncPromise((resolve) => {
        setInterval(() => {
            resolve(20);
        }, 10)
    });

    expect(isSyncPromise(prom)).toBe(false);

    let value1;

    prom.then(x => value1 = x);
    await prom;
    expect(value1).toBe(20);
});

test("split promise pass promise to resolve", async () => {
    const promise = delay(10).then(() => 20);
    const prom = new SyncPromise<number>((resolve) => resolve(promise));
    const prom2 = prom.then(x => x * 3);

    const val = await prom2;
    expect(val).toBe(60);
});