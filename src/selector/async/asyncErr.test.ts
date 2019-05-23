import { toSelector } from "../selector";
import { createSelectorAsync } from "./async";
import { delay } from "../../logic";

test("selector al tener error no debe de memoizar ASYNC", async () => {
    const a = toSelector(() => 10);
    let count = 0;
    const sum = createSelectorAsync({a}, async x => {
        count++;
        await delay(100);
        if (count >= 3) return x.a;
        else
            throw new Error("Error de prueba");
    });

    let errCount = 0;
    try { await sum.call({}); } catch (error) { errCount++; }
    try { await sum.call({}); } catch (error) { errCount++; }

    //Se demuestra que una promesa fallida no se guarda en el cache,
    //si así fuera, el cache devolvería la promesa fallida y esta linea
    //lanzaría excepción
    expect(await sum.call({})).toBe(10);

    expect(errCount).toBe(2);
    expect(count).toBe(3);

    await sum.call({});
    await sum.call({});

    expect(errCount).toBe(2);
    expect(count).toBe(3);
});