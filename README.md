# assert-logic

![Downloads](https://img.shields.io/npm/dw/assert-logic?style=flat-square) ![Version@npm](https://img.shields.io/npm/v/assert-logic?label=version%40npm&style=flat-square) ![Version@git](https://img.shields.io/github/package-json/v/szikszail/assert-logic/main?label=version%40git&style=flat-square) ![CI](https://img.shields.io/github/actions/workflow/status/szikszail/assert-logic/ci.yml?branch=main&label=ci&style=flat-square) ![Docs](https://img.shields.io/github/actions/workflow/status/szikszail/assert-logic/docs.yml?branch=main&label=docs&style=flat-square)

This handy tool can be used to implement additional logic into your assertions, either using Chai, Jest, Assert, or plain JavaScript.

## Usage

Install the package:

```shell
npm install assert-logic --save-dev
```

Use it in your tests:

```javascript
const {and, or} = require('assert-logic');
const {expect} = require('chai');

test("Test if a number is even and greater than 10 or less than 7", () => {
    const number = 12;
    and(
        () => expect(number).to.be.an('number'),
        () => expect(number % 2).to.equal(0),
        or(
            () => expect(number).to.be.lessThan(7),
            () => expect(number).to.be.greaterThan(10),
        ),
    ).evaluate();
});
```

## API

### Pass/Fail

In the context of this package, a value is considered failed if it is:

1. a (sync) function that throws an error
2. a (sync) function that returns a falsy value (except for `undefined`)
3. a (async) function that returns a Promise that rejects
4. a (async) function that returns a Promise that resolves to a falsy value (except for `undefined`)
5. a Promise that rejects
6. a Promise that resolves to a falsy value (except for `undefined`)
7. value that is falsy (except for `undefined`)

In all other cases, the value is considered passed.

### Operations

The API contains the following functions: `and`, `or`, `not`, `xor`, `nand`, `nor`, `xnor`, `every`, `some`, and also the `evaluate`
function. 

The following ones accept any number of sync/async functions, Promises, or values as arguments.

| Operation | Description                                             |
|-----------|---------------------------------------------------------|
| and       | Passes if all of its arguments pass                     |
| or        | Passes if any of its arguments pass                     |
| not       | Negates the result of its argument                      |
| xor       | Passes if odd number of its arguments passes            |
| nand      | Passes if any of its arguments fails                    |
| nor       | Passes if all of its arguments fail                     |
| xnor      | Passes if all of its arguments pass or all of them fail |

The `every` and `some` functions are used to evaluate an array of values. The values must be the first parameter, but both functions accept a second parameter that is a function that will be called with each value. If the function is not passed as the second parameter, the value will be interpreted as boolean values.
 
The `every` function is a shorthand for `and` with the values as arguments, while the `some` function is a shorthand for `or` with the values as arguments.

```javascript
const {every, some} = require('assert-logic');
const {expect} = require('expect');

const items = [{id: 1, name: 'Item 1', price: 10}, {id: 2, name: 'Item 2', price: -20}, /* ... */];
every(items, item => {
    expect(item.id, "Item should have ID as positive number").toBeGreaterThan(0);
}).evaluate(); // will not throw
some(items, item => {
    expect(item.price, "Item should have a positive price").toBeGreaterThan(0);
}).evaluate(); // will throw
```

#### Append

The `append` function can be used to append additional logic to an existing variadic logic (all except `pass`).

```javascript
const {and} = require('assert-logic');

const logic = and(
    () => true,
    () => false,
);
logic.append(() => true).evaluate(); // will throw an error
```

### Evaluation

The `evaluate` function will evaluate the logic and throw an error if it fails.

The `evaluate` function does not need to be called if the logic is used as an argument to an assertion, as the assertion
will call it automatically.

The evaluate function will return a Promise if any of the arguments are async.

### AssertionError

Given the following expression what is expected to fail:
```javascript
and(
    xor(true, false, true),
    true,
).evaluate()
```

The error message will look like this:

```
AssertionError (AND): Expected all expression to pass, but not all did.
Results:
  - AssertionError (XOR): Expected odd number of expressions to pass, but even number did.
    Results:
      - Pass
      - AssertionError (PASS): Expected expression to pass.
        Results:
          - Error: "Failed expression: (boolean false)"
        Expression: (boolean false)
      - Pass
    Expression: |-
      XOR(
        (boolean true)
        (boolean false)
        (boolean true)
      )
  - Pass
Expression: |-
  AND(
    XOR(
      (boolean true)
      (boolean false)
      (boolean true)
    )
    (boolean true)
  )
```

## How NOT to use it

### As a replacement for assertions

This package is not meant to be used as a replacement for assertions, but rather as a tool to implement additional logic
into your assertions.

### With passing the assertions directly

```javascript
const {and} = require('assert-logic');
const {expect} = require('chai');

test("Test if a number is even and greater than 10 or less than 7", () => {
    const number = 12;
    and(
        expect(number).to.be.an('number'),
        expect(number % 2).to.equal(0),
        or(
            expect(number).to.be.lessThan(7),
            expect(number).to.be.greaterThan(10),
        ),
    ).evaluate();
});
```

This will not work as expected, as the assertions will be evaluated before the logic is evaluated.

## Other

For detailed documentation see the [TypeDocs documentation](https://szikszail.github.io/assert-logic/).

This package uses [debug](https://www.npmjs.com/package/debug) for logging, use `assert-logic` to see debug logs:

```shell
DEBUG=assert-logic node my-script.js
```
