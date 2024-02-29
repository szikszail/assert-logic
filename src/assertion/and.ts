import {Assertion, VariadicAssertion} from "./assertion";
import type {AssertionValue, EvaluationResult} from "../types";

export class ANDAssertion extends VariadicAssertion {
  constructor(...values: (AssertionValue | Assertion)[]) {
    super("AND", "Expected all expression to pass, but not all did.", ...values);
  }

  onEvaluation(results: EvaluationResult[]): void | Promise<void> {
    const failed = results.filter((result) => result instanceof Error);
    if (failed.length > 0) {
      this.fail(results);
    }
  }
}