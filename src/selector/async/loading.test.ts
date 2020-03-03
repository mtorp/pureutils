import { toSelector, SelectorOutType } from "../selector";
import * as rx from "rxjs";
import { createSelectorRx } from "./async";

test("loading type", async () => {
    interface Props {
        a: number;
        b: number;
    }
    const a = toSelector((x: Props) => rx.from([x.a]));
    const b = toSelector((x: Props) => rx.from([x.b]));


    const ab = createSelectorRx({ a, b }, x => x.a * x.b);
    const typeTest: rx.Observable<number> = ab.call({
        a: 2,
        b: 3
    });
});
