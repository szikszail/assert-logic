// import debug = require("debug");

// const log = debug("assert-logic");

import type {AssertionValue} from "./types";
import {PassAssertion} from "./assertion/pass";
import {NotAssertion} from "./assertion/not";

export const pass = (value: AssertionValue) => new PassAssertion(value);
export const not = (value: AssertionValue) => new NotAssertion(value);