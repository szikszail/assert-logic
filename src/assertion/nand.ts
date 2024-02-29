import {Assertion, VariadicAssertion} from "./assertion";
import type {AssertionValue, EvaluationResult} from "../types";

export class NANDAssertion extends VariadicAssertion {
  constructor(...values: (AssertionValue | Assertion)[]) {
    super("NAND", "Expected any expressions to fail, but non did.", ...values);
  }

  onEvaluation(results: EvaluationResult[]): void | Promise<void> {
    const failed = results.filter((result) => result instanceof Error);
    if (failed.length === 0) {
      this.fail(results);
    }
  }
}