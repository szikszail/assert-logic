import {Assertion} from "./assertion";
import type {AssertionValue} from "../types";
import {FailedAssertionError} from "../error";

export function valueToString(value: AssertionValue): string {
  if (value instanceof Function) {
    let name = value?.name;
    if (!name) {
      return '(function)';
    }
    if (name.length > 20) {
      name = name.slice(0, 17) + "...";
    }
    return `(function ${name})`;
  }
  if (value instanceof Promise) {
    return '(promise)';
  }
  return `(${typeof value} ${String(value)})`
}

export class PASSAssertion extends Assertion {
  constructor(private value: AssertionValue) {
    super("PASS", "Expected expression to pass.");

    if (value instanceof Assertion) {
      return value as PASSAssertion;
    }
  }

  evaluate(): void | Promise<void> {
    let result = this.value;
    if (result instanceof Function) {
      try {
        result = result();
      } catch (e) {
        this.fail([e]);
      }
    }
    if (result instanceof Promise) {
      return result.then((value) => {
        if (value !== undefined && !value) {
          this.fail([new FailedAssertionError(value)]);
        }
      }, (error) => {
        this.fail([error]);
      });
    }
    if (result !== undefined && !result) {
      this.fail([new FailedAssertionError(result)]);
    }
  }

  toString(): string {
    return valueToString(this.value);
  }
}