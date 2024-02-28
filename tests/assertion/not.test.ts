import {not} from "../../src";
import {NotAssertion} from "../../src/assertion/not";

describe("not", () => {
  test("should return NotAssertion", () => {
    const value = not(5);
    expect(value).toBeInstanceOf(NotAssertion);
  });

  test.each([
    [true],
    [1],
    ["string"],
    [Symbol()],
  ])("should throw for %p", (value) => {
    const assertion = not(value);
    expect(() => assertion.evaluate()).toThrow();
  });

  test.each([
    [false],
    [0],
    [""],
    [null],
  ])("should not throw for %p", (value) => {
    const assertion = not(value);
    expect(() => assertion.evaluate()).not.toThrow();
    expect(assertion.evaluate()).toBeUndefined();
  });

  test.each([
    [true],
    [1],
    ["string"],
    [Symbol()],
  ])("should throw for resolved promise to %p", async (value) => {
    const assertion = not(Promise.resolve(value));
    await expect(assertion.evaluate()).rejects.toThrow();
  });

  test.each([
    [false],
    [0],
    [""],
    [null],
  ])("should not throw for resolved promise to %p", async (value) => {
    const assertion = not(Promise.resolve(value));
    await expect(assertion.evaluate()).resolves.toBeUndefined();
  });

  test("should not throw for rejected promise", async () => {
    const assertion = not(Promise.reject());
    await expect(assertion.evaluate()).resolves.toBeUndefined();
  });

  test.each([
    [true],
    [1],
    ["string"],
    [Symbol()],
  ])("should not throw for not(not(%p))", (value) => {
    const assertion = not(not(value));
    expect(() => assertion.evaluate()).not.toThrow();
    expect(assertion.evaluate()).toBeUndefined();
  });

  test.each([
    [false],
    [0],
    [""],
    [null],
  ])("should throw for not(not(%p))", (value) => {
    const assertion = not(not(value));
    expect(() => assertion.evaluate()).toThrow();
  });
});