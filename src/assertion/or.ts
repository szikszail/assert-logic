import {Assertion} from "./assertion";
import type {AssertionValue, EvaluationResult} from "../types";
import {VariadicAssertion} from "./variadic";

export class ORAssertion extends VariadicAssertion {
  constructor(...values: (AssertionValue | Assertion)[]) {
    super("OR", "Expected any expression to pass, but non did.", ...values);
  }

  onEvaluation(results: EvaluationResult[]): void | Promise<void> {
    const failed = results.filter((result) => result instanceof Error);
    if (failed.length === results.length) {
      this.fail(results);
    }
  }
}