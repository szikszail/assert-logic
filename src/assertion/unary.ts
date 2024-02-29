import {AssertionValue} from "../types";
import {PASSAssertion} from "./pass";
import {Assertion} from "./assertion";

export class UnaryAssertion extends Assertion {
  protected readonly value: Assertion;

  constructor(operator: string, expectation: string, value: AssertionValue | Assertion) {
    super(operator, expectation);

    if (value instanceof Assertion) {
      this.value = value;
    } else {
      this.value = new PASSAssertion(value);
    }
  }

  toString(): string {
    return `${this.operator}(${this.value.toString()})`;
  }

  evaluate(): void | Promise<void> {
    let result: void | Promise<void>;
    let handled = false;
    try {
      result = this.value.evaluate();
    } catch (e) {
      this.onEvaluation(e);
      handled = true;
    }
    if (!handled) {
      if (result instanceof Promise) {
        return result.then(() => {
          this.onEvaluation([true]);
        }, (e) => {
          this.onEvaluation([e]);
        });
      }
      this.onEvaluation([true]);
    }
  }
}
