import type {AssertionValue} from "./types";

export function toString(value: AssertionValue): string {
  if (value instanceof Function) {
    let name = value?.name;
    if (!name) {
      name = value.toString();
    }
    if (name.length > 20) {
      name = name.slice(0, 17) + "...";
    }
    return `function(${name})`;
  }
  if (value instanceof Promise) {
    return value.toString();
  }
  return `value(${value})`;
}