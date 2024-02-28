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
  // missing value
  test("should throw for missing value", () => {
    expect(() => xor()).toThrow();
  });

  // return xorAssertion
  test("should return xorAssertion", () => {
    const value = xor(true, false);
    expect(value).toBeInstanceOf(XORAssertion);
  });

  // check for 3 input value pairs, where xor is true
  test.each(positiveXOR)("should not throw for %p, %p, %p", (a, b, c) => {
    const assertion = xor(a, b, c);
    expect(() => assertion.evaluate()).not.toThrow();
    expect(assertion.evaluate()).toBeUndefined();
  });

  // check for 3 input value pairs, where xor is false
  test.each(negativeXOR)("should throw for %p, %p, %p", (a, b, c) => {
    const assertion = xor(a, b, c);
    expect(() => assertion.evaluate()).toThrow();
  });
});