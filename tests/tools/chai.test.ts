import {or, and} from '../../src';
import {expect as chaiExpect, assert as chaiAssert, should } from 'chai';

describe('chai', () => {
  describe('expect', () => {
    test("should work with Chai/expect assertions (positive)", () => {
      const number = 12;
      expect(() => and(
        () => chaiExpect(number).to.be.a('number'),
        () => chaiExpect(number % 2).to.equal(0),
        or(
          () => chaiExpect(number).to.be.lessThan(15),
          () => chaiExpect(number).to.be.greaterThan(10),
        ),
      ).evaluate()).not.toThrow();
    });
    test("should work with Chai/expect assertions (negative)", () => {
      const number = 12;
      expect(() => and(
        () => chaiExpect(number).to.be.a('number'),
        () => chaiExpect(number % 2).to.equal(1),
        or(
          () => chaiExpect(number).to.be.lessThan(7),
          () => chaiExpect(number).to.be.greaterThan(10),
        ),
      ).evaluate()).toThrowErrorMatchingSnapshot()
    });
  });

  describe('assert', () => {
    test("should work with Chai/assert assertions (positive)", () => {
      const number = 12;
      expect(() => and(
        () => chaiAssert.isNumber(number),
        () => chaiAssert.equal(number % 2, 0),
        or(
          () => chaiAssert.isBelow(number, 15),
          () => chaiAssert.isAbove(number, 10),
        ),
      ).evaluate()).not.toThrow();
    });
    test("should work with Chai/assert assertions (negative)", () => {
      const number = 12;
      expect(() => and(
        () => chaiAssert.isNumber(number),
        () => chaiAssert.equal(number % 2, 1),
        or(
          () => chaiAssert.isBelow(number, 7),
          () => chaiAssert.isAbove(number, 10),
        ),
      ).evaluate()).toThrowErrorMatchingSnapshot()
    });
  });

  describe('should', () => {
    beforeAll(() => {
      should();
    });

    test("should work with Chai/should assertions (positive)", () => {
      const number = 12;
      expect(() => and(
        () => number.should.be.a('number'),
        () => (number % 2).should.equal(0),
        or(
          () => number.should.be.lessThan(15),
          () => number.should.be.greaterThan(10),
        ),
      ).evaluate()).not.toThrow();
    });

    test("should work with Chai/should assertions (negative)", () => {
      const number = 12;
      expect(() => and(
        () => number.should.be.a('number'),
        () => (number % 2).should.equal(1),
        or(
          () => number.should.be.lessThan(7),
          () => number.should.be.greaterThan(10),
        ),
      ).evaluate()).toThrowErrorMatchingSnapshot()
    });
  });

});