import {xor} from "../../src";
import {XORAssertion} from "../../src/assertion/xor";

// XOR
const positiveXOR = [
  [false, false, true],
  [false, true, false],
  [true, false, false],
  [true, true, true]
];
const negativeXOR = [
  [false, false, false],
  [false, true, true],
  [true, false, true],
  [true, true, false]
];

describe("xor", () => {
  test("should throw for missing value", () => {
    expect(() => xor()).toThrow();
  });

  test("should return xorAssertion", () => {
    const value = xor(true, false);
    expect(value).toBeInstanceOf(XORAssertion);
  });

  test.each(positiveXOR)("should not throw for %p, %p, %p", (a, b, c) => {
    const assertion = xor(a, b, c);
    expect(() => assertion.evaluate()).not.toThrow();
    expect(assertion.evaluate()).toBeUndefined();
  });

  test.each(negativeXOR)("should throw for %p, %p, %p", (a, b, c) => {
    const assertion = xor(a, b, c);
    expect(() => assertion.evaluate()).toThrow();
  });
});