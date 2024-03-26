import {ORAssertion} from "./or";
import type {AssertionGeneratorFunction} from "../types";

export class SOMEAssertion<T> extends ORAssertion {
    constructor(items: T[], fn: AssertionGeneratorFunction<T>) {
        super(...items?.map((item) => (fn ?? Boolean)(item)));
    }
}