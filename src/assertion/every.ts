import {ANDAssertion} from "./and";
import type {AssertionGeneratorFunction} from "../types";

export class EVERYAssertion<T> extends ANDAssertion {
    constructor(items: T[], fn: AssertionGeneratorFunction<T>) {
        super(...items?.map((item) => (fn ?? Boolean)(item)));
    }
}