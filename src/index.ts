// import debug = require("debug");

// const log = debug("assert-logic");

import type {AssertionValue} from "./types";
import {PASSAssertion} from "./assertion/pass";
import {NOTAssertion} from "./assertion/not";
import {ORAssertion} from "./assertion/or";
import {ANDAssertion} from "./assertion/and";
import {XORAssertion} from "./assertion/xor";
import {NORAssertion} from "./assertion/nor";
import {NANDAssertion} from "./assertion/nand";
import {XNORAssertion} from "./assertion/xnor";

export const pass = (value: AssertionValue) => new PASSAssertion(value);
export const not = (value: AssertionValue) => new NOTAssertion(value);
export const or = (...values: AssertionValue[]) => new ORAssertion(...values);
export const and = (...values: AssertionValue[]) => new ANDAssertion(...values);
export const nor = (...values: AssertionValue[]) => new NORAssertion(...values);
export const nand = (...values: AssertionValue[]) => new NANDAssertion(...values);
export const xor = (...values: AssertionValue[]) => new XORAssertion(...values);
export const xnor = (...values: AssertionValue[]) => new XNORAssertion(...values);