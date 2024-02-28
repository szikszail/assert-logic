import {nor} from "../../src";
import {NORAssertion} from "../../src/assertion/nor";

// NOR
const positiveNOR = [[false, false, false]];
const negativeNOR = [
  [false, false, true],
  [false, true, false],
  [false, true, true],
  [true, false, false],
  [true, false, true],
  [true, true, false],
  [true, true, true]
];

describe("nor", () => {
  // missing value
  test("should throw for missing value", () => {
    expect(() => nor()).toThrow();
  });

  // return norAssertion
  test("should return norAssertion", () => {
    const value = nor(true, false);
    expect(value).toBeInstanceOf(NORAssertion);
  });

  // check for 3 input value pairs, where nor is true
  test.each(positiveNOR)("should not throw for %p, %p, %p", (a, b, c) => {
    const assertion = nor(a, b, c);
    expect(() => assertion.evaluate()).not.toThrow();
    expect(assertion.evaluate()).toBeUndefined();
  });

  // check for 3 input value pairs, where nor is false
  test.each(negativeNOR)("should throw for %p, %p, %p", (a, b, c) => {
    const assertion = nor(a, b, c);
    expect(() => assertion.evaluate()).toThrow();
  });
});