import {Assertion, VariadicAssertion} from "./assertion";
import type {AssertionValue, EvaluationResult} from "../types";

export class XORAssertion extends VariadicAssertion {
  constructor(...values: (AssertionValue | Assertion)[]) {
    super('xor', ...values);
  }

  onEvaluation(...results: EvaluationResult[]): void | Promise<void> {
    const failed = results.filter((result) => result instanceof Error);
    const nPassed = results.length - failed.length;
    if (nPassed % 2 === 0) {
      this.fail(...(failed as Error[]));
    }
  }
}