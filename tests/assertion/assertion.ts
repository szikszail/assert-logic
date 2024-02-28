import {Assertion} from "../../src/assertion/assertion";

describe("Assertion", () => {
  test("evaluate", () => {
    const assertion = new Assertion();
    expect(() => assertion.evaluate()).not.toThrow();
  });

  test("toString", () => {
    const assertion = new Assertion();
    expect(assertion.toString()).toBe("true");
  });

  test("fail", () => {
    const assertion = new Assertion();
    const error = new Error("custom error");
    // @ts-expect-error
    expect(() => assertion.fail(error)).toThrowError("Assertion failed: true\n" + error.message);
  });
});