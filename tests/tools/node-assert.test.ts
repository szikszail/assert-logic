import {or, and} from '../../src';
import assert from 'node:assert';

describe('node:assert', () => {
  test("should work with Node:Assert assertions (positive)", () => {
    const number = 12;
    expect(() => and(
      () => assert(number, "number"),
      () => assert(number % 2 === 0),
      or(
        () => assert(number < 15),
        () => assert(number > 10),
      ),
    ).evaluate()).not.toThrow();
  });
  test("should work with Node:Assert assertions (negative)", () => {
    const number = 12;
    expect(() => and(
      () => assert(number, "number"),
      () => assert(number % 2 === 1),
      or(
        () => assert(number < 7),
        () => assert(number > 10),
      ),
    ).evaluate()).toThrowErrorMatchingSnapshot()
  });
});