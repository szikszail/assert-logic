import {or, and} from '../../src';

describe('jest', () => {
  test("should work with Jest assertions (positive)", () => {
    const number = 12;
    expect(() => and(
      () => expect(number).toEqual(expect.any(Number)),
      () => expect(number % 2).toEqual(0),
      or(
        () => expect(number).toBeLessThan(15),
        () => expect(number).toBeGreaterThan(10),
      ),
    ).evaluate()).not.toThrow();
  });
  test("should work with Jest assertions (negative)", () => {
    const number = 12;
    expect(() => and(
      () => expect(number).toEqual(expect.any(Number)),
      () => expect(number % 2).toEqual(1),
      or(
        () => expect(number).toBeLessThan(7),
        () => expect(number).toBeGreaterThan(10),
      ),
    ).evaluate()).toThrowErrorMatchingSnapshot()
  });
});