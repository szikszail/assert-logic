import {Assertion} from "./assertion/assertion";
import {dump} from "js-yaml";
import {AnyValue, EvaluationResult} from "./types";
import {valueToString} from "./assertion/pass";

type ErrorRepr = Record<string, string | (ErrorRepr | string)[]>;

function getErrorRepresentation(operator: string, expectation: string, assertion: Assertion, results?: EvaluationResult[]): ErrorRepr {
  const repr: ErrorRepr = {
    [`AssertionError (${operator})`]: expectation,
  };
  if (results?.length > 0) {
    repr.Results = results.map((result) => {
      if (result instanceof AssertionError) {
        return getErrorRepresentation(result.operator, result.expectation, result.assertion, result.results);
      }
      if (result instanceof Error) {
        return {
          Message: result.message,
          // Stack: error.stack,
        };
      }
      return "Pass";
    });
  }
  repr.Expression = assertion.toString();
  return repr;
}

export class AssertionError extends Error {
  constructor(
    public readonly operator: string,
    public readonly expectation: string,
    public readonly assertion: Assertion,
    public readonly results?: EvaluationResult[],
  ) {
    super(dump(getErrorRepresentation(operator, expectation, assertion, results), {sortKeys: false}));
    this.name = "AssertionError";
  }
}

export class FailedAssertionError extends Error {
  constructor(value: AnyValue) {
    super(`Failed expression: ${valueToString(value)}`);
    this.name = "FailedAssertionError";
  }
}