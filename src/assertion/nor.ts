import {Assertion} from "./assertion";
import type {AssertionValue, EvaluationResult} from "../types";
import {VariadicAssertion} from "./variadic";

export class NORAssertion extends VariadicAssertion {
  constructor(...values: (AssertionValue | Assertion)[]) {
    super("NOR", "Expected all expressions to fail, but some passed.", ...values);
  }

  onEvaluation(results: EvaluationResult[]): void | Promise<void> {
    const failed = results.filter((result) => result instanceof Error);
    if (failed.length !== results.length) {
      this.fail(results);
    }
  }
}