import {xnor} from "../../src";
import {XNORAssertion} from "../../src/assertion/xnor";

// XNOR
const positiveXNOR = [
  [false, false, false],
  [true, true, true]
];
const negativeXNOR = [
  [false, false, true],
  [false, true, false],
  [true, false, false],
  [true, true, false],
  [false, true, true],
  [true, false, true],
];

describe("xnor", () => {
  test("should throw for missing value", () => {
    expect(() => xnor()).toThrow();
  });

  test("should return xnorAssertion", () => {
    const value = xnor(true, false);
    expect(value).toBeInstanceOf(XNORAssertion);
  });

  test.each(positiveXNOR)("should not throw for %p, %p, %p", (a, b, c) => {
    const assertion = xnor(a, b, c);
    expect(() => assertion.evaluate()).not.toThrow();
    expect(assertion.evaluate()).toBeUndefined();
  });

  test.each(negativeXNOR)("should throw for %p, %p, %p", (a, b, c) => {
    const assertion = xnor(a, b, c);
    expect(() => assertion.evaluate()).toThrow();
  });
});