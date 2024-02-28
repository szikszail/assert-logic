import {valueToString} from "../src/formatter";

describe("formatter", () => {
  describe("toString", () => {
    // check named function with name less than 20 characters
    test("should return function name", () => {
      const value = function test() {};
      expect(valueToString(value)).toBe("function(test)");
    });

    // check named function with name more than 20 characters
    test("should return function name", () => {
      const value = function testLongNameABCDEFGHIJKLMNO() {};
      expect(valueToString(value)).toBe("function(testLongNameABCDE...)");
    });

    // check unnamed function with code length less than 20 characters
    test("should return function code", () => {
      expect(valueToString(function () {})).toBe("function");
    });

    // check unnamed function with code length more than 20 characters
    test("should return function code", () => {
      expect(valueToString(function () {
        return "this is a long function";
      })).toBe("function");
    });

    // check arrow function with code length less than 20 characters
    test("should return function code", () => {
      expect(valueToString(() => {})).toBe("function");
    });

    // check arrow function with code length more than 20 characters
    test("should return function code", () => {
      expect(valueToString(() => "this is a long function")).toBe("function");
    });

    // check promise
    test("should return promise code", () => {
      expect(valueToString(Promise.resolve())).toBe("promise");
    });

    // check value
    test("should return value", () => {
      expect(valueToString(5)).toBe("5");
    });
  });
});