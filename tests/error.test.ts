import {AssertionError} from "../src/error";
import {PASSAssertion} from "../src/assertion/pass";
import {and, xor} from "../src";

describe("AssertionError", () => {
  test("should be instance of Error", () => {
    const error = new AssertionError("OP", "EXP", new PASSAssertion("VALUE"));
    expect(error).toBeInstanceOf(Error);
  });

  test("should have message without error", () => {
    const error = new AssertionError("OP", "EXP", new PASSAssertion("VALUE"));
    expect(error.message).toEqual(`AssertionError (OP): EXP\nExpression: (string VALUE)\n`);
  });

  test("should have message with error", () => {
    const error = new AssertionError(
      "OP",
      "EXP",
      new PASSAssertion("VALUE"),
      [new Error("ERROR")]
    );
    expect(error.message).toEqual(`AssertionError (OP): EXP\nResults:\n  - Error: ERROR\nExpression: (string VALUE)\n`);
  });

  test("should have message with assertion error", () => {
    const error = new AssertionError(
      "OP",
      "EXP",
      new PASSAssertion("VALUE"),
      [new AssertionError(
        "OP",
        "EXP",
        new PASSAssertion("VALUE")
      )]
    );
    expect(error.message).toEqual(`AssertionError (OP): EXP\nResults:\n  - AssertionError (OP): EXP\n    Expression: (string VALUE)\nExpression: (string VALUE)\n`);
  });

  test("should have message with nested assertions", () => {
    try {
      and(
        xor(true, false, true),
        true,
      ).evaluate();
      fail("Expected to throw");
    }catch (e) {
      expect(e.message).toEqual(`AssertionError (AND): Expected all expression to pass, but not all did.\nResults:\n  - AssertionError (XOR): Expected odd number of expressions to pass, but even number did.\n    Results:\n      - Pass\n      - AssertionError (PASS): Expected expression to pass.\n        Results:\n          - Error: "Failed expression: (boolean false)"\n        Expression: (boolean false)\n      - Pass\n    Expression: |-\n      XOR(\n        (boolean true)\n        (boolean false)\n        (boolean true)\n      )\n  - Pass\nExpression: |-\n  AND(\n    XOR(\n      (boolean true)\n      (boolean false)\n      (boolean true)\n    )\n    (boolean true)\n  )\n`);
    }
  });
});