import {AssertionError} from "../src/error";
import {PASSAssertion} from "../src/assertion/pass";
import {and, xor} from "../src";

describe.only("AssertionError", () => {
  test("should be instance of Error", () => {
    const error = new AssertionError("OP", "EXP", new PASSAssertion("VALUE"));
    expect(error).toBeInstanceOf(Error);
  });

  // check message
  test("should have message without error", () => {
    const error = new AssertionError("OP", "EXP", new PASSAssertion("VALUE"));
    expect(error.message).toEqual(`AssertionError (OP): EXP\nExpression: (string VALUE)\n`);
  });

  // check message with error
  test("should have message with error", () => {
    const error = new AssertionError(
      "OP",
      "EXP",
      new PASSAssertion("VALUE"),
      [new Error("ERROR")]
    );
    expect(error.message).toEqual(`AssertionError (OP): EXP\nResults:\n  - Message: ERROR\nExpression: (string VALUE)\n`);
  });

  // check message with assertion error
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

  // make nested OR and AND assertions, expect to fail and check error message
  test("should have message with nested assertions", () => {
    try {
      and(
        xor(true, false, true),
        true,
      ).evaluate();
      fail("Expected to throw");
    }catch (e) {
      expect(e.message).toEqual(`AssertionError (AND): Expected all expression to pass, but not all did.\nResults:\n  - AssertionError (XOR): Expected odd number of expressions to pass, but even number did.\n    Results:\n      - Pass\n      - AssertionError (PASS): Expected expression to pass.\n        Results:\n          - Message: "Failed expression: (boolean false)"\n        Expression: (boolean false)\n      - Pass\n    Expression: |-\n      XOR(\n        (boolean true)\n        (boolean false)\n        (boolean true)\n      )\n  - Pass\nExpression: |-\n  AND(\n    XOR(\n      (boolean true)\n      (boolean false)\n      (boolean true)\n    )\n    (boolean true)\n  )\n`);
    }
  });
});