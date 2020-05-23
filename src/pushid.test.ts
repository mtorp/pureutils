import { generatePushId, reoderPushId } from "./pushid";
import { union } from "./logic";

test("pushId test", async () => {
    let p: string[] = [];
    for (let i = 0; i < 100; i++) {
        p.push(generatePushId());
    }

    const sorted = [...p];
    sorted.sort();

    expect(sorted).toEqual(p);
});

const zeros = "00000000";

test("reorder 1", () => {

    const min = '0000';
    const max = 'zzzz';

    const act = reoderPushId(min, max);
    expect(act > min).toBe(true);
    expect(act < max).toBe(true);

});


test("reorder 5", () => {

    const min = '0201';
    const max = '1110';
    const mid = '0XWW';

    const act = reoderPushId(min, max);
    expect(act > min).toBe(true);
    expect(act < max).toBe(true);
});

test("reorder 6", () => {

    const min = '0000';
    const max = '0002';

    const act = reoderPushId(min, max);
    expect(act > min).toBe(true);
    expect(act < max).toBe(true);
});

test("reorder 7", () => {

    const min = '0001';
    const max = '0003';

    const act = reoderPushId(min, max);
    expect(act > min).toBe(true);
    expect(act < max).toBe(true);
});


test("reorder 4", () => {

    const min = '0001';
    const max = '0002';
    const act = reoderPushId(min, max);
    expect(act > min).toBe(true);
    expect(act < max).toBe(true);
});

test("reorder len", () => {
    const min = '----';
    const max = '----Oq96J8we';
 
    const act = reoderPushId(min, max);
    expect(act > min).toBe(true);
    expect(act < max).toBe(true);
});


test("reorder rec", () => {
    const min = '----';
    let act = 'zzzz';

    for (var i = 0; i < 1000; i++) {
        const max = act;
        act = reoderPushId(min, max);

        if (!(act > min) || !(act < max)) {
            console.log(`min: ${min}, max: ${max}, act: ${act}`);
        }

        expect(act > min).toBe(true);
        expect(act < max).toBe(true);
    }
});

