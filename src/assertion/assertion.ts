import {AssertionError} from "../error";
import {AssertionValue, EvaluationResult} from "../types";
import {PassAssertion} from "./pass";

export class Assertion {
  evaluate(): void | Promise<void> {
    // pass
  }

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onEvaluation(...results: EvaluationResult[]): void | Promise<void> {
    // pass
  }

  protected fail(...errors: Error[]): void {
    throw new AssertionError("Assertion failed", this, ...errors);
  }

  toString(): string {
    return "true";
  }
}

export class UnaryAssertion extends Assertion {
  protected readonly value: Assertion;

  constructor(private readonly name: string, value: AssertionValue | Assertion) {
    super();
    if (value instanceof Assertion) {
      this.value = value;
    } else {
      this.value = new PassAssertion(value);
    }
  }

  toString(): string {
    return `${this.name}(${this.value.toString()})`;
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
          this.onEvaluation(true);
        }, (e) => {
          this.onEvaluation(e);
        });
      }
      this.onEvaluation(true);
    }
  }
}

export class VariadicAssertion extends Assertion {
  protected readonly values: Assertion[];

  constructor(private readonly name: string, ...values: (AssertionValue | Assertion)[]) {
    super();
    this.values = values.map((value) => {
      if (value instanceof Assertion) {
        return value;
      }
      return new PassAssertion(value);
    });
  }

  toString(): string {
    return `${this.name}(\n\t${this.values.map((value) => value.toString()).join(",\n\t")}\n)`;
  }
}
