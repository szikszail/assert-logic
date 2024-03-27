// import debug = require("debug");

// const log = debug("assert-logic");

import type {AssertionValue, AssertionGeneratorFunction} from "./types";
import {PASSAssertion} from "./assertion/pass";
import {NOTAssertion} from "./assertion/not";
import {ORAssertion} from "./assertion/or";
import {ANDAssertion} from "./assertion/and";
import {XORAssertion} from "./assertion/xor";
import {NORAssertion} from "./assertion/nor";
import {NANDAssertion} from "./assertion/nand";
import {XNORAssertion} from "./assertion/xnor";
import {EVERYAssertion} from "./assertion/every";
import {SOMEAssertion} from "./assertion/some";

import {setDefaultOptions} from "lines-builder";

setDefaultOptions({
  // Need to force EOL to be Unix style, because Windows style is not supported by YAML
  eol: "\n",
  trimLeft: false,
  skipFirstLevelIndent: true,
  indent: 2
});

export const pass = (value: AssertionValue) => new PASSAssertion(value);
export const not = (value: AssertionValue) => new NOTAssertion(value);
export const or = (...values: AssertionValue[]) => new ORAssertion(...values);
export const and = (...values: AssertionValue[]) => new ANDAssertion(...values);
export const nor = (...values: AssertionValue[]) => new NORAssertion(...values);
export const nand = (...values: AssertionValue[]) => new NANDAssertion(...values);
export const xor = (...values: AssertionValue[]) => new XORAssertion(...values);
export const xnor = (...values: AssertionValue[]) => new XNORAssertion(...values);
export const every = <T>(items: T[], fn?: AssertionGeneratorFunction<T>) => new EVERYAssertion(items, fn);
export const some = <T>(items: T[], fn?: AssertionGeneratorFunction<T>) => new SOMEAssertion(items, fn);
