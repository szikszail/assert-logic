import {lines} from "lines-builder";

import {AssertionError} from "../error";
import {AssertionValue, EvaluationResult} from "../types";
import {PASSAssertion} from "./pass";

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

export class VariadicAssertion extends Assertion {
  protected readonly values: Assertion[] = [];

  constructor(operator: string, expectation: string , ...values: (AssertionValue | Assertion)[]) {
    if (values.length < 1) {
      throw new Error(`At least one value is required for ${operator} assertion.`);
    }
    super(operator, expectation);
    this.append(...values);
  }

  append(...values: (AssertionValue | Assertion)[]): void {
    this.values.push(...values.map((value) => {
      if (value instanceof Assertion) {
        return value;
      }
      return new PASSAssertion(value);
    }));
  }

  evaluate(): void | Promise<void> {
    const results = this.values.map((value) => {
      try {
        return value.evaluate();
      } catch (e) {
        return e;
      }
    });
    if (results.some((result) => result instanceof Promise)) {
      return Promise.allSettled(results).then((settledResults) => {
        this.onEvaluation(settledResults.map((settledResult) => {
          if (settledResult.status === "fulfilled") {
            return true;
          }
          return settledResult.reason;
        }));
      });
    }
    this.onEvaluation(results);
  }

  toString(): string {
    return lines(
      {skipFirstLevelIndent: true, indent: 2},
      this.operator + "(",
      lines(
        {trimLeft: false},
        ...this.values.map((value) => value.toString())
      ),
      ")"
    ).toString();
  }
}
