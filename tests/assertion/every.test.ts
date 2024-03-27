import {every} from '../../src';
import {EVERYAssertion} from "../../src/assertion/every";
import {ANDAssertion} from "../../src/assertion/and";

describe("every", () => {
  test("should throw for missing value", () => {
    // @ts-ignore
    expect(() => every()).toThrow();
  });

  test("should return EveryAssertion", () => {
    const value = every([true, false]);
    expect(value).toBeInstanceOf(EVERYAssertion);
    expect(value).toBeInstanceOf(ANDAssertion);
  });

  test("should use Boolean as default function", () => {
    const value = every([true, false]);
    expect(() => value.evaluate()).toThrow();

    const value2 = every([true, true]);
    expect(() => value2.evaluate()).not.toThrow();
  });

  test("should use custom function", () => {
    const values = [{a: true, b: true}, {a: true, b: false}];
    expect(() => every(values, (value) => value.a).evaluate()).not.toThrow();
    expect(() => every(values, (value) => value.b).evaluate()).toThrow();
  });
});