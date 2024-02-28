import {Assertion, VariadicAssertion} from "./assertion";
import {AssertionValue, EvaluationResult} from "../types";

export class OrAssertion extends VariadicAssertion {
  constructor(...values: (AssertionValue | Assertion)[]) {
    super('or', ...values);
  }

  onEvaluation(...results: EvaluationResult[]): void | Promise<void> {
    const failed = results.filter((result) => result instanceof Error);
    if (failed.length === results.length) {
      this.fail(...(failed as Error[]));
    }
  }
}