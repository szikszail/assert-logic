import { AtomicAssertion } from "../src";

describe("assert-logic", () => {
  describe("AtomicAssertion", () => {
    describe("constructor", () => {
      it("should return the value if it is an instance of Assertion", () => {
        const original = new AtomicAssertion(() => true);
        const value = new AtomicAssertion(original);
        expect(value).toBeInstanceOf(AtomicAssertion);
        expect(value).toBe(original);
      });

      it("should return a new instance of AtomicAssertion", () => {
        const value = new AtomicAssertion(() => true);
        expect(value).toBeInstanceOf(AtomicAssertion);
      });

      it("should return a new instance of AtomicAssertion", () => {
        const value = new AtomicAssertion(true);
        expect(value).toBeInstanceOf(AtomicAssertion);
      });
    });

    describe("evaluate", () => {
      it("should return undefined if the value is a function that returns true", () => {
        const value = new AtomicAssertion(() => true);
        const result = value.evaluate();
        expect(result).toBeUndefined();
      });

      it("should return undefined if the value is a function that returns a promise that resolves to true", async () => {
        const value = new AtomicAssertion(() => Promise.resolve(true));
        const result = await value.evaluate();
        expect(result).toBeUndefined();
      });

      it("should throw an AssertionError if the value is a function that returns false", () => {
        const value = new AtomicAssertion(() => false);
        expect(() => value.evaluate()).toThrowErrorMatchingSnapshot();
      });

      it("should throw an AssertionError if the value is a function that returns a promise that resolves to false", async () => {
        const value = new AtomicAssertion(() => Promise.resolve(false));
        await expect(value.evaluate()).rejects.toMatchSnapshot();
      });

      it("should return undefined if the value is true", () => {
        const value = new AtomicAssertion(true);
        const result = value.evaluate();
        expect(result).toBeUndefined();
      });

      it("should throw an AssertionError if the value is false", () => {
        const value = new AtomicAssertion(false);
        expect(() => value.evaluate()).toThrowErrorMatchingSnapshot();
      });

      it("should return undefined if the value is a promise that resolves to true", async () => {
        const value = new AtomicAssertion(Promise.resolve(true));
        const result = await value.evaluate();
        expect(result).toBeUndefined();
      });

      it("should throw an AssertionError if the value is a promise that resolves to false", async () => {
        const value = new AtomicAssertion(Promise.resolve(false));
        await expect(value.evaluate()).rejects.toMatchSnapshot();
      });

      it("should throw an AssertionError if the value is a promise that rejects", async () => {
        const value = new AtomicAssertion(Promise.reject("error"));
        await expect(value.evaluate()).rejects.toMatchSnapshot();
      });

      it("should return undefined if the value is a promise that resolves to a promise that resolves to true", async () => {
        const value = new AtomicAssertion(Promise.resolve(Promise.resolve(true)));
        const result = await value.evaluate();
        expect(result).toBeUndefined();
      });

      // for undefined it should fail
      it("should throw an AssertionError if the value is a promise that resolves to a promise that resolves to false", async () => {
        const value = new AtomicAssertion(Promise.resolve(Promise.resolve(false)));
        await expect(value.evaluate()).rejects.toMatchSnapshot();
      });
    });

    describe("toString", () => {
      it("should return the string representation of an arrow function", () => {
        const value = new AtomicAssertion(() => true);
        const result = value.toString();
        expect(result).toBe("function(() => true) to be true");
      });

      it("should return the string representation of the value if is is a named function", () => {
        const value = new AtomicAssertion(function namedFunction() { return true; });
        const result = value.toString();
        expect(result).toBe("function(namedFunction) to be true");
      });

      it("should return the string representation of the value if it is a async function", () => {
        const value = new AtomicAssertion(async () => true);
        const result = value.toString();
        expect(result).toBe("function(() => tslib_1.__a...) to be true");
      });

      it("should return the string representation of the value if it is a function", () => {
        const value = new AtomicAssertion(true);
        const result = value.toString();
        expect(result).toBe("value(true) to be true");
      });

      it("should return the string representation of the value if it is a function", () => {
        const value = new AtomicAssertion(false);
        const result = value.toString();
        expect(result).toBe("value(false) to be true");
      });

      /*
      it("should return the string representation of the value if it is a function", () => {
        const value = new AtomicAssertion(Promise.resolve(true));
        const result = value.toString();
        expect(result).toBe("true to be true");
      });

      it("should return the string representation of the value if it is a function", () => {
        const value = new AtomicAssertion(Promise.resolve(false));
        const result = value.toString();
        expect(result).toBe("false to be true");
      });

      it("should return the string representation of the value if it is a function", () => {
        const value = new AtomicAssertion(Promise.reject("error"));
        const result = value.toString();
        expect(result).toBe("Promise to be true");
      });

      it("should return the string representation of the value if it is a function", () => {
        const value = new AtomicAssertion(Promise.resolve(Promise.resolve(true)));
        const result = value.toString();
        expect(result).toBe("Promise to be true");
      });

      it("should return the string representation of the value if it is a function", () => {
        const value = new AtomicAssertion(Promise.resolve(Promise.resolve(false)));
        const result = value.toString();
        expect(result).toBe("Promise to be true");
      });
      */
    });
  })
});