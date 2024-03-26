
export type AnyValue = void | boolean | string | object | number | null | symbol;
export type AsyncAnyValue = Promise<AnyValue>;
export type AssertionFunction = () => AnyValue | AsyncAnyValue;
export type AssertionValue = AssertionFunction | AnyValue | AsyncAnyValue;
export type EvaluationResult = true | Error;
export type AssertionGeneratorFunction = <T>(item: T) => ReturnType<AssertionFunction>;
