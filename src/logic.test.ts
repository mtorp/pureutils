import { syncResolve } from "./promise";
import { asyncThunkToObservable } from "./logic";
import { delay } from "rxjs/operators";

test("asyncThunkToObs sync", async () => {

    //sync resolve:
    let count = 0;
    const thunk = () => {
        count++;
        return syncResolve(10);
    };

    const obs = asyncThunkToObservable(thunk);

    //Aún no se llama:
    expect(count).toBe(0);

    let result: number = 0;
    //Se resuelve síncronamente:
    obs.subscribe(x => result = x);
    expect(result).toBe(10);
    expect(count).toBe(1);

    result = 0;
    await delay(10);

    //Subsecuentes subscripciones no llaman al thunk
    obs.subscribe(x => result = x);
    expect(result).toBe(10);
    expect(count).toBe(1);

});

test("asyncThunkToObs async", async () => {
    let count = 0;
    const thunk = async () => {
        count++;
        await delay(100);
        return 10;
    };

    const obs = asyncThunkToObservable(thunk);

    //Aún no se llama:
    expect(count).toBe(0);

    let a = 0, b = 0;
    obs.subscribe(x => a = x);

    //La primera llamada:
    expect(count).toBe(1);
    expect(a).toBe(0);

    await delay(10);

    //Otra subscripción antes de que termine la primera:
    obs.subscribe(x => b = x);

    //Ya no hay más llamadas:
    expect(count).toBe(1);
    expect(a).toBe(0);
    expect(b).toBe(0);

    const c = await  obs.toPromise();
    
    //Ya se resolvieron todos los valores:
    
    expect(a).toBe(10);
    expect(b).toBe(10);
    expect(c).toBe(10);
})