import {AssertionError} from "../error";
import {EvaluationResult} from "../types";

export class Assertion {
  constructor(
    protected readonly operator: string,
    protected readonly expectation: string
  ) {
  }

  evaluate(): void | Promise<void> {
    // pass
  }

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onEvaluation(results: EvaluationResult[]): void | Promise<void> {
    // pass
  }

  protected fail(results: EvaluationResult[]): void {
    throw new AssertionError(this.operator, this.expectation, this, results);
  }
}
