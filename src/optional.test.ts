import { optionalize } from "./optional";



test("optionalize", () => {
  const sum = (x: number, y: string) => "" + x + y;

    const nullArg = (x: number | null, y: string) => x == null ? "Es null" : x + y;

    expect(optionalize(nullArg)(null, "hello")).toEqual("Es null");
    expect(optionalize(nullArg)(undefined, "hello")).toEqual(undefined);
    expect(optionalize(nullArg)(20, "hello")).toEqual("20hello");


  expect(optionalize(sum)(10, "hello")).toEqual("10hello");
  expect(optionalize(sum)(undefined, "hello")).toEqual(undefined);
  expect(optionalize(sum)(undefined, undefined)).toEqual(undefined);
  expect(optionalize(sum)(20, undefined)).toEqual(undefined);

  expect(optionalize((x: number, y: number) => x + y)(10, 30)).toEqual(40);
  expect(optionalize((x: number, y: number) => x + y)(undefined, 30)).toEqual(undefined);
  expect(optionalize((x: number, y: number) => x + y)(undefined, undefined)).toEqual(undefined);
  expect(optionalize((x: number, y: number) => x + y)(20, undefined)).toEqual(undefined);
});