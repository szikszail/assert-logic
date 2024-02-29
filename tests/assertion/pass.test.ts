import {pass} from "../../src";
import {PASSAssertion, valueToString} from "../../src/assertion/pass";

describe("pass", () => {
  test("should return PassAssertion", () => {
    const value = pass(5);
    expect(value).toBeInstanceOf(PASSAssertion);
  });

  test("should return the same PassAssertion", () => {
    const value = pass(5);
    expect(pass(value)).toBe(value);
  });

  describe("toString", () => {
    test("should return pass(value)", () => {
      const value = pass(5);
      expect(value.toString()).toBe("(number 5)");
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
      expect(() => assertion.evaluate()).toThrowError("AssertionError (PASS): Expected expression to pass.\nResults:\n  - Error: function error\nExpression: (function)\n");
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

  describe("toString", () => {
    test("should return function name", () => {
      const value = function test() {};
      expect(valueToString(value)).toBe("(function test)");
    });

    test("should return function name", () => {
      const value = function testLongNameABCDEFGHIJKLMNO() {};
      expect(valueToString(value)).toBe("(function testLongNameABCDE...)");
    });

    test("should return function code", () => {
      expect(valueToString(function () {})).toBe("(function)");
    });

    test("should return function code", () => {
      expect(valueToString(function () {
        return "this is a long function";
      })).toBe("(function)");
    });

    test("should return function code", () => {
      expect(valueToString(() => {})).toBe("(function)");
    });

    test("should return function code", () => {
      expect(valueToString(() => "this is a long function")).toBe("(function)");
    });

    test("should return promise code", () => {
      expect(valueToString(Promise.resolve())).toBe("(promise)");
    });

    test("should return value", () => {
      expect(valueToString(5)).toBe("(number 5)");
    });
  });
});