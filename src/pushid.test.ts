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

    const min = "000000000000000000000000";
    const max = "000000000000000000000002";
    const val = "0Rzmnxz800000X00WcF97pyY";

    const exp = "000000000000000000000001";
    const act = reoderPushId(val, min, max);
    expect(act).toBe(exp);
});

test("reorder 2", () => {

    const min = "000000000000000000000000";
    const max = "000000000000000000000001";
    const val = "0Rzmnxz800000X00WcF97pyY";

    //No hay espacio para reordenar:
    expect(() => reoderPushId(val, min, max)).toThrow();
});

test("reorder 3", () => {

    const min = '-M8-9OMI-----0--J1Gc2ixd';
    const max = '-M8-9OMI-----1--On67Zs8E';
    const val = '-M8-9OMI-----7--yNOv6rNO';

    const exp = '-M8-9OMI-----1--LNOv6rNO';

    const act = reoderPushId(val, min, max);
    expect(act).toBe(exp);
});

test("reorder 4", () => {

    const min = '0201';
    const max = '1001';
    const val = '2010';
    const exp = '1110';
    const act = reoderPushId(val, min, max);
    expect(act).toBe(exp);
});

test("reorder 5", () => {

    const min = '0201';
    const max = '1110';
    /*
    0573 =  
    1254 =
    
    0914

    mid = 0914
    8745
    
    
    0
    1
    */
    const act = reoderPushId(val, min, max);
    //expect(act).toBe(exp);
    console.log(act);
});