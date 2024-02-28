import {Assertion} from "./assertion";
import type {AssertionValue} from "../types";
import {valueToString} from "../formatter";

export class PassAssertion extends Assertion {
  constructor(private value: AssertionValue) {
    super();
    if (value instanceof Assertion) {
      return value as PassAssertion;
    }
  }

  evaluate(): void | Promise<void> {
    let result = this.value;
    if (result instanceof Function) {
      try {
        result = result();
      } catch (e) {
        this.fail(e);
      }
    }
    if (result instanceof Promise) {
      return result.then((value) => {
        if (value !== undefined && !value) {
          this.fail();
        }
      }, (error) => {
        this.fail(error);
      });
    }
    if (result !== undefined && !result) {
      this.fail();
    }
  }

  toString(): string {
    return valueToString(this.value);
  }
}