import { toSelector, SelectorOutType } from "../selector";
import * as rx from "rxjs";
import { createSelectorRx, LoadingSym } from "./async";

test("loading type", async () => {
    interface Props {
        a: number;
        b: number;
    }
    const a = toSelector((x: Props) => rx.from([x.a]));
    const b = toSelector((x: Props) => rx.from([x.b]));


    const ab = createSelectorRx({ a, b }, x => x.a * x.b);
    //Un selector que sus observables no tienen el LoadingSymbol no tiene el LoadingSymbol en su salida:
    const typeTest: rx.Observable<number> = ab.call({
        a: 2,
        b: 3
    });
});

test("loading output", async () => {
    interface Props {
        a: number;
        b: number;
    }

    const aObs = new rx.BehaviorSubject<number | typeof LoadingSym>(2);
    const bObs = new rx.BehaviorSubject<number | typeof LoadingSym>(3);
    const a = toSelector((x: Props) => aObs);
    const b = toSelector((x: Props) => bObs);

    let calls = 0;
    const ab = createSelectorRx({ a, b }, x => {
        calls++;
        return x.a * x.b;
    });
    let result: (number | typeof LoadingSym)[] = [];
    const rObs = ab.call({ a: 1, b: 2 });
    rObs.subscribe(x => result.push(x));

    bObs.next(LoadingSym);
    aObs.next(3);
    aObs.next(4);

    aObs.next(LoadingSym);
    bObs.next(LoadingSym);

    bObs.next(1);
    aObs.next(2);


    const expected = [
        6,
        LoadingSym,
        LoadingSym,
        LoadingSym,
        LoadingSym,
        LoadingSym,
        LoadingSym,
        2
    ];
    expect(calls).toBe(2);
    expect(result).toEqual(expected);

});