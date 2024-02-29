import {AssertionValue} from "../types";
import {PASSAssertion} from "./pass";
import {lines} from "lines-builder";
import {Assertion} from "./assertion";

export class VariadicAssertion extends Assertion {
  protected readonly values: Assertion[] = [];

  constructor(operator: string, expectation: string, ...values: (AssertionValue | Assertion)[]) {
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
      this.operator + "(",
      lines(
        ...this.values.map((value) => value.toString())
      ),
      ")"
    ).toString();
  }
}
