import {nand} from "../../src";
import {NANDAssertion} from "../../src/assertion/nand";

// NAND
const positiveNAND = [
  [false, false, false],
  [false, false, true],
  [false, true, false],
  [false, true, true],
  [true, false, false],
  [true, false, true],
  [true, true, false]
];
const negativeNAND = [[true, true, true]];

describe("nand", () => {
  test("should throw for missing value", () => {
    expect(() => nand()).toThrow();
  });

  test("should return NANDAssertion", () => {
    const value = nand(true, false);
    expect(value).toBeInstanceOf(NANDAssertion);
  });

  test.each(positiveNAND)("should not throw for %p, %p, %p", (a, b, c) => {
    const assertion = nand(a, b, c);
    expect(() => assertion.evaluate()).not.toThrow();
    expect(assertion.evaluate()).toBeUndefined();
  });

  test.each(negativeNAND)("should throw for %p, %p, %p", (a, b, c) => {
    const assertion = nand(a, b, c);
    expect(() => assertion.evaluate()).toThrow();
  });
});