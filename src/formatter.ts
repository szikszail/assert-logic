import type {AssertionValue} from "./types";

export function toString(value: AssertionValue): string {
  if (value instanceof Function) {
    let name = value?.name;
    if (!name) {
      return 'function';
    }
    if (name.length > 20) {
      name = name.slice(0, 17) + "...";
    }
    return `function(${name})`;
  }
  if (value instanceof Promise) {
    return 'promise';
  }
  return String(value);
}