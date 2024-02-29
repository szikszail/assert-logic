import {or} from '../../src';
import {ORAssertion} from '../../src/assertion/or';

describe("or", () => {
  test("should throw for missing value", () => {
    expect(() => or()).toThrow();
  });

  test("should return OrAssertion", () => {
    const value = or(true, false);
    expect(value).toBeInstanceOf(ORAssertion);
  });

  test.each([
    [false],
    [0],
    [""],
    [null],
  ])("should not throw for %p", (value) => {
    const assertion = or(value, true);
    expect(() => assertion.evaluate()).not.toThrow();
    expect(assertion.evaluate()).toBeUndefined();
  });

  test.each([
    [false],
    [0],
    [""],
    [null],
  ])("should not throw for resolved promise to %p", async (value) => {
    const assertion = or(Promise.resolve(value), true);
    await expect(assertion.evaluate()).resolves.toBeUndefined();
  });

  test.each([
    [false],
    [0],
    [""],
    [null],
  ])("should not throw for arrow function returning %p", (value) => {
    const assertion = or(() => value, true);
    expect(() => assertion.evaluate()).not.toThrow();
    expect(assertion.evaluate()).toBeUndefined();
  });

  test("should not throw for nested or", () => {
    const assertion = or(true, or(false, or(true, false)));
    expect(() => assertion.evaluate()).not.toThrow();
    expect(assertion.evaluate()).toBeUndefined();
  });

  test("should return string for nested or", () => {
    const assertion = or(true, or(false, or(true, false)));
    expect(assertion.toString()).toEqual("OR(\n  (boolean true)\n  OR(\n    (boolean false)\n    OR(\n      (boolean true)\n      (boolean false)\n    )\n  )\n)");
  });

  test("should throw for nested or", () => {
    const assertion = or(false, or(false, or(false, false)));
    expect(() => assertion.evaluate()).toThrow();
  });

  test("should not throw for append", () => {
    const assertion = or(false);
    assertion.append(true)
    expect(() => assertion.evaluate()).not.toThrow();
    expect(assertion.toString()).toEqual("OR(\n  (boolean false)\n  (boolean true)\n)");
  });
});