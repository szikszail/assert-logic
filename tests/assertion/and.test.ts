import {and} from '../../src';
import {ANDAssertion} from '../../src/assertion/and';

describe("and", () => {
  test("should throw for missing value", () => {
    expect(() => and()).toThrow();
  });

  test("should return AndAssertion", () => {
    const value = and(true, false);
    expect(value).toBeInstanceOf(ANDAssertion);
  });

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

  test.each([
    [false],
    [0],
    [""],
    [null],
  ])("should throw for %p", (value) => {
    const assertion = and(value, true);
    expect(() => assertion.evaluate()).toThrow();
  });

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

  test.each([
    [false],
    [0],
    [""],
    [null],
  ])("should throw for resolved promise to %p", async (value) => {
    const assertion = and(Promise.resolve(value), true);
    await expect(assertion.evaluate()).rejects.toThrow();
  });

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

  test.each([
    [false],
    [0],
    [""],
    [null],
  ])("should throw for arrow function returning %p", (value) => {
    const assertion = and(() => value, true);
    expect(() => assertion.evaluate()).toThrow();
  });

  test("should not throw for nested and", () => {
    const assertion = and(true, and(true, and(true, true)));
    expect(() => assertion.evaluate()).not.toThrow();
    expect(assertion.evaluate()).toBeUndefined();
  });

  test("should return string for nested and", () => {
    const assertion = and(true, and(true, and(true, true)));
    expect(assertion.toString()).toEqual("AND(\n  (boolean true)\n  AND(\n    (boolean true)\n    AND(\n      (boolean true)\n      (boolean true)\n    )\n  )\n)");
  });

  test("should throw for append", () => {
    const assertion = and(false);
    assertion.append(true);
    expect(() => assertion.evaluate()).toThrow();
  });
});