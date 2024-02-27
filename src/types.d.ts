
export type AnyValue = void | boolean | string | object | number | null;
export type AsyncAnyValue = Promise<AnyValue>;
export type AssertionFunction = () => AnyValue | AsyncAnyValue;
export type AssertionValue = AssertionFunction | AnyValue | AsyncAnyValue;
