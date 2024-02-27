// import debug = require("debug");

// const log = debug("assert-logic");

import type { AssertionValue } from "./types";
import { toString } from "./formatter";

class Assertion {
  evaluate(): void | Promise<void> {
    // pass
  }

  toString(): string {
    return "true";
  }
}

class AssertionError extends Error {
  constructor(statement: string, assertion: Assertion) {
    super(statement + ": " + assertion.toString());
    this.name = "AssertionError";
  }
}

export class AtomicAssertion extends Assertion {
  constructor(private readonly value: AssertionValue) {
    super();
    if (this.value instanceof Assertion) {
      return this.value as AtomicAssertion;
    }
  }

  evaluate(): void | Promise<void> {
    let result = this.value;
    if (result instanceof Function) {
      result = result();
    }
    if (result instanceof Promise) {
      return result.then((value) => {
        if (!value) {
          throw new AssertionError("Assertion failed", this);
        }
      });
    }
    if (!result) {
      throw new AssertionError("Assertion failed", this);
    }
  }

  toString(): string {
    return `${toString(this.value)} to be true`;
  }
}