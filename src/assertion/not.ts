import {Assertion, UnaryAssertion} from "./assertion";
import {AssertionValue, EvaluationResult} from "../types";

export class NOTAssertion extends UnaryAssertion {
  constructor(value: AssertionValue | Assertion) {
    super("NOT", "Expected the expression to fail, but it passed.", value);
  }

  onEvaluation(results: EvaluationResult[]): void | Promise<void> {
    if (results[0] === true) {
      this.fail(results);
    }
  }
}