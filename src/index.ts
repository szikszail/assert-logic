// import debug = require("debug");

// const log = debug("assert-logic");

import type {AssertionValue} from "./types";
import {PassAssertion} from "./assertion/pass";
import {NotAssertion} from "./assertion/not";
import {OrAssertion} from "./assertion/or";
import {AndAssertion} from "./assertion/and";

export const pass = (value: AssertionValue) => new PassAssertion(value);
export const not = (value: AssertionValue) => new NotAssertion(value);
export const or = (...values: AssertionValue[]) => new OrAssertion(...values);
export const and = (...values: AssertionValue[]) => new AndAssertion(...values);