import {and} from '../../src';
import {ANDAssertion} from '../../src/assertion/and';

describe("and", () => {
  // throw for missing value
  test("should throw for missing value", () => {
    expect(() => and()).toThrow();
  });

  // return AndAssertion
  test("should return AndAssertion", () => {
    const value = and(true, false);
    expect(value).toBeInstanceOf(ANDAssertion);
  });

  // not throw for true
  test.each([
    [true],
    [1],
    ["string"],
    [Symbol()],
    [undefined],
  ])("should not throw for %p", (value) => {
    const assertion = and(value, true);
    expect(() => assertion.evaluate()).not.toThrow();
    expect(assertion.evaluate()).toBeUndefined();
  });

  // throw for false
  test.each([
    [false],
    [0],
    [""],
    [null],
  ])("should throw for %p", (value) => {
    const assertion = and(value, true);
    expect(() => assertion.evaluate()).toThrow();
  });

  // not throw for resolved promise to true
  test.each([
    [true],
    [1],
    ["string"],
    [Symbol()],
    [undefined],
  ])("should not throw for resolved promise to %p", async (value) => {
    const assertion = and(Promise.resolve(value), true);
    await expect(assertion.evaluate()).resolves.toBeUndefined();
  });

  // throw for resolved promise to false
  test.each([
    [false],
    [0],
    [""],
    [null],
  ])("should throw for resolved promise to %p", async (value) => {
    const assertion = and(Promise.resolve(value), true);
    await expect(assertion.evaluate()).rejects.toThrow();
  });

  // not throw for arrow function returning true
  test.each([
    [true],
    [1],
    ["string"],
    [Symbol()],
    [undefined],
  ])("should not throw for arrow function returning %p", (value) => {
    const assertion = and(() => value, true);
    expect(() => assertion.evaluate()).not.toThrow();
    expect(assertion.evaluate()).toBeUndefined();
  });

  // throw for arrow function returning false
  test.each([
    [false],
    [0],
    [""],
    [null],
  ])("should throw for arrow function returning %p", (value) => {
    const assertion = and(() => value, true);
    expect(() => assertion.evaluate()).toThrow();
  });

  // not throw for nested and
  test("should not throw for nested and", () => {
    const assertion = and(true, and(true, and(true, true)));
    expect(() => assertion.evaluate()).not.toThrow();
    expect(assertion.evaluate()).toBeUndefined();
  });

  // return string for nested and
  test("should return string for nested and", () => {
    const assertion = and(true, and(true, and(true, true)));
    expect(assertion.toString()).toBe("AND(\n  (boolean true)\n  AND(\n    (boolean true)\n    AND(\n      (boolean true)\n      (boolean true)\n    )\n  )\n)");
  });

  // and with false values, then append, then evaluate
  test("should throw for append", () => {
    const assertion = and(false);
    assertion.append(true);
    expect(() => assertion.evaluate()).toThrow();
  });
});