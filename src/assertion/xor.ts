import {Assertion} from "./assertion";
import type {AssertionValue, EvaluationResult} from "../types";
import {VariadicAssertion} from "./variadic";

export class XORAssertion extends VariadicAssertion {
  constructor(...values: (AssertionValue | Assertion)[]) {
    super("XOR", "Expected odd number of expressions to pass, but even number did.", ...values);
  }

  onEvaluation(results: EvaluationResult[]): void | Promise<void> {
    const failed = results.filter((result) => result instanceof Error);
    const nPassed = results.length - failed.length;
    if (nPassed % 2 === 0) {
      this.fail(results);
    }
  }
}