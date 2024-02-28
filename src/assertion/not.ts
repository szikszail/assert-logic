import {Assertion, UnaryAssertion} from "./assertion";
import {AssertionValue, EvaluationResult} from "../types";

export class NOTAssertion extends UnaryAssertion {
  constructor(value: AssertionValue | Assertion) {
    super('not', value);
  }

  onEvaluation(result: EvaluationResult): void | Promise<void> {
    if (result === true) {
      this.fail();
    }
  }
}