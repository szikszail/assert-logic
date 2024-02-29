import {Assertion, VariadicAssertion} from "./assertion";
import type {AssertionValue, EvaluationResult} from "../types";

export class XNORAssertion extends VariadicAssertion {
  constructor(...values: (AssertionValue | Assertion)[]) {
    super("XNOR", "Expected all expressions to have the same state (pass or fail), but there are few outliers.", ...values);
  }

  onEvaluation(results: EvaluationResult[]): void | Promise<void> {
    const failed = results.filter((result) => result instanceof Error);
    if (failed.length !== 0 && failed.length !== results.length) {
      this.fail(results);
    }
  }
}