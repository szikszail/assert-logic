import {or} from '../../src';
import {OrAssertion} from '../../src/assertion/or';

describe("or", () => {
  test.each([
    [[]],
    [[true]],
  ])("should throw for %p", (values) => {
    expect(() => or(...values)).toThrow();
  });

  test("should return OrAssertion", () => {
    const value = or(true, false);
    expect(value).toBeInstanceOf(OrAssertion);
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
    expect(assertion.toString()).toBe("or(\n  true,\n  or(\n    false,\n    or(\n      true,\n      false\n    )\n  )\n)");
  });

  test("should throw for nested or", () => {
    const assertion = or(false, or(false, or(false, false)));
    expect(() => assertion.evaluate()).toThrow();
  });

  // or with false values, then append, then evaluate
  test("should not throw for append", () => {
    const assertion = or(false, false);
    assertion.append(true)
    expect(() => assertion.evaluate()).not.toThrow();
    expect(assertion.toString()).toBe("or(\n  false,\n  false,\n  true\n)");
  });
});