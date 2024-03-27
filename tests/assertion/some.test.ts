import {some} from '../../src';
import {SOMEAssertion} from "../../src/assertion/some";
import {ORAssertion} from "../../src/assertion/or";

describe("some", () => {
  test("should throw for missing value", () => {
    // @ts-ignore
    expect(() => some()).toThrow();
  });

  test("should return EveryAssertion", () => {
    const value = some([true, false]);
    expect(value).toBeInstanceOf(SOMEAssertion);
    expect(value).toBeInstanceOf(ORAssertion);
  });

  test("should use Boolean as default function", () => {
    const value = some([false, false]);
    expect(() => value.evaluate()).toThrow();

    const value2 = some([true, true]);
    expect(() => value2.evaluate()).not.toThrow();
  });

  test("should use custom function", () => {
    const values = [{a: true, b: false}, {a: false, b: false}];
    expect(() => some(values, (value) => value.a).evaluate()).not.toThrow();
    expect(() => some(values, (value) => value.b).evaluate()).toThrow();
  });
});