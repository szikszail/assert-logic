import {pass} from "../../src";
import {PassAssertion} from "../../src/assertion/pass";

describe("pass", () => {
  test("should return PassAssertion", () => {
    const value = pass(5);
    expect(value).toBeInstanceOf(PassAssertion);
  });

  test("should return the same PassAssertion", () => {
    const value = pass(5);
    expect(pass(value)).toBe(value);
  });

  describe("toString", () => {
    test("should return pass(value)", () => {
      const value = pass(5);
      expect(value.toString()).toBe("pass(5)");
    });
  });

  describe("evaluate", () => {
    test.each([
      [true],
      [1],
      ["string"],
      [Symbol()],
    ])("should not throw for %p", (value) => {
      const assertion = pass(value);
      expect(() => assertion.evaluate()).not.toThrow();
      expect(assertion.evaluate()).toBeUndefined();
    });

    test.each([
      [false],
      [0],
      [""],
      [null],
    ])("should throw for %p", (value) => {
      const assertion = pass(value);
      expect(() => assertion.evaluate()).toThrow();
    });

    test("should not throw for undefined", () => {
      const assertion = pass(undefined);
      expect(() => assertion.evaluate()).not.toThrow();
      expect(assertion.evaluate()).toBeUndefined();
    });

    test("should throw for rejected promise", async () => {
      const assertion = pass(Promise.reject());
      await expect(assertion.evaluate()).rejects.toThrow();
    });

    test.each([
      [true],
      [1],
      ["string"],
      [Symbol()],
    ])("should not throw for resolved promise to %p", async (value) => {
      const assertion = pass(Promise.resolve(value));
      await expect(assertion.evaluate()).resolves.toBeUndefined();
    });

    test.each([
      [false],
      [0],
      [""],
      [null],
    ])("should throw for resolved promise to %p", async (value) => {
      const assertion = pass(Promise.resolve(value));
      await expect(assertion.evaluate()).rejects.toThrow();
    });

    test.each([
      [true],
      [1],
      ["string"],
      [Symbol()],
    ])("should not throw for function returning %p", (value) => {
      const assertion = pass(() => value);
      expect(() => assertion.evaluate()).not.toThrow();
      expect(assertion.evaluate()).toBeUndefined();
    });

    test.each([
      [false],
      [0],
      [""],
      [null],
    ])("should throw for function returning %p", (value) => {
      const assertion = pass(() => value);
      expect(() => assertion.evaluate()).toThrow();
    });

    test("should not throw for function not returning anything", () => {
      const assertion = pass(() => {
      });
      expect(() => assertion.evaluate()).not.toThrow();
      expect(assertion.evaluate()).toBeUndefined();
    });

    test("should throw for function throwing", () => {
      const assertion = pass(() => {
        throw new Error("function error")
      });
      expect(() => assertion.evaluate()).toThrowError("function error");
    });

    test.each([
      [true],
      [1],
      ["string"],
      [Symbol()],
    ])("should not throw for async function returning %p", async (value) => {
      const assertion = pass(async () => value);
      await expect(assertion.evaluate()).resolves.toBeUndefined();
    });

    test.each([
      [false],
      [0],
      [""],
      [null],
    ])("should throw for async function returning %p", async (value) => {
      const assertion = pass(async () => value);
      await expect(assertion.evaluate()).rejects.toThrow();
    });

    test("should not throw for async function not returning anything", async () => {
      const assertion = pass(async () => {
      });
      await expect(assertion.evaluate()).resolves.toBeUndefined();
    });
  });
});