import {expect} from "@jest/globals";
import {lines} from "lines-builder";

function areStringsMatch(a: unknown, b: unknown): boolean {
  const isAString = typeof a === "string";
  const isBString = typeof b === "string";
  if (isAString && isBString) {
    return lines(a).toString() === lines(b).toString();
  }
  return this.equals(a, b);
}

expect.addEqualityTesters([areStringsMatch]);
