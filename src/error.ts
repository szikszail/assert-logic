import {Assertion} from "./assertion/assertion";

// TODO: refine this type
export class AssertionError extends Error {
  constructor(statement: string, assertion: Assertion, ...errors: Error[]) {
    let message = statement + ": " + assertion.toString();
    for (const e of errors) {
      message += "\n" + e.message;
    }
    super(message);
    this.name = "AssertionError";
  }
}
