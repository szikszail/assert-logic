# assert-logic

![Downloads](https://img.shields.io/npm/dw/assert-logic?style=flat-square) ![Version@npm](https://img.shields.io/npm/v/assert-logic?label=version%40npm&style=flat-square) ![Version@git](https://img.shields.io/github/package-json/v/szikszail/assert-logic/main?label=version%40git&style=flat-square) ![CI](https://img.shields.io/github/actions/workflow/status/szikszail/assert-logic/ci.yml?branch=main&label=ci&style=flat-square) ![Docs](https://img.shields.io/github/actions/workflow/status/szikszail/assert-logic/docs.yml?branch=main&label=docs&style=flat-square)

This handy tool can be used to implement additional logic into your assertions, either using Chai, Jest, Assert, or
plain JavaScript.

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

The API contains the following functions: `and`, `or`, `not`, `xor`, `nand`, `nor`, `xnor`, and also the `evaluate`
function. All accept any number of sync/async functions, Promises, or values as arguments.

| Operation | Description                                             |
|-----------|---------------------------------------------------------|
| and       | Passes if all of its arguments pass                     |
| or        | Passes if any of its arguments pass                     |
| not       | Negates the result of its argument                      |
| xor       | Passes if odd number of its arguments passes            |
| nand      | Passes if any of its arguments fails                    |
| nor       | Passes if all of its arguments fail                     |
| xnor      | Passes if all of its arguments pass or all of them fail |

### Evaluation

The `evaluate` function will evaluate the logic and throw an error if it fails.

The `evaluate` function does not need to be called if the logic is used as an argument to an assertion, as the assertion
will call it automatically.

The evaluate function will return a Promise if any of the arguments are async.

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
