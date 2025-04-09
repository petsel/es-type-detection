import { describe, it, expect } from 'vitest';

import {
  isFunction,
  isClass,
  isArrow,
  isNonAsyncArrow,
  isAsyncArrow,
  isAsync,
  isAsyncFunction,
  isGenerator,
  isNonAsyncGenerator,
  isAsyncGenerator,
  isES3Function,
  isGenericFunction
} from '../../src/function';

function runTestCases(label, testFn, expected, cases) {
  describe.skip(label, () => {
    for (const [input, description] of cases) {
      it.skip(`returns \`${expected}\` for: ${description}`, () => {
        expect(testFn(input)).toBe(expected);
      });
    }
  });
}

const asyncArrow = async () => {};
const nonAsyncArrow = (x) => x;
const syncFn = function (x) {
  return x;
};
const asyncFn = async function (x) {
  return x;
};
const genFn = function* () {
  yield 1;
};
const asyncGenFn = async function* () {
  yield 1;
};
const legacyFn = function legacy(x) {
  return x * 2;
};
const classDef = class MyClass {};
const es3Style = function () {};
function declaredFn() {
  return true;
}

const fakeArrow = Object.assign(() => {}, { prototype: {} });
const nativeCtor = Function;

describe.skip('Function Type Detection', () => {
  runTestCases('`isFunction`', isFunction, true, [
    [syncFn, 'function expression'],
    [declaredFn, 'function declaration'],
    [nonAsyncArrow, 'arrow function'],
    [asyncArrow, 'async arrow function'],
    [asyncFn, 'async function'],
    [genFn, 'generator function'],
    [asyncGenFn, 'async generator function'],
    [classDef, 'class definition']
  ]);

  runTestCases('`isFunction` ❌', isFunction, false, [
    [undefined, 'undefined'],
    [null, 'null'],
    [123, 'number'],
    [{}, 'object'],
    [[], 'array'],
    ['string', 'string']
  ]);

  runTestCases('`isArrow`', isArrow, true, [
    [nonAsyncArrow, 'non-async arrow'],
    [asyncArrow, 'async arrow'],
    [(_) => _, 'compressed arrow _=>_'],
    [(x) => x, 'inline arrow']
  ]);

  runTestCases('`isNonAsyncArrow`', isNonAsyncArrow, true, [[nonAsyncArrow, 'non-async arrow']]);

  runTestCases('`isNonAsyncArrow` ❌', isNonAsyncArrow, false, [
    [asyncArrow, 'async arrow'],
    [syncFn, 'function expression'],
    [asyncFn, 'async function']
  ]);

  runTestCases('`isAsyncArrow`', isAsyncArrow, true, [[asyncArrow, 'async arrow']]);

  runTestCases('`isClass`', isClass, true, [[classDef, 'class declaration']]);

  runTestCases('`isClass` ❌', isClass, false, [
    [declaredFn, 'function declaration'],
    [syncFn, 'function expression']
  ]);

  runTestCases('`isAsync`', isAsync, true, [
    [asyncArrow, 'async arrow'],
    [asyncFn, 'async function'],
    [asyncGenFn, 'async generator']
  ]);

  runTestCases('`isAsyncFunction`', isAsyncFunction, true, [
    [asyncArrow, 'async arrow'],
    [asyncFn, 'async function']
  ]);

  runTestCases('`isGenerator`', isGenerator, true, [
    [genFn, 'generator'],
    [asyncGenFn, 'async generator']
  ]);

  runTestCases('`isNonAsyncGenerator`', isNonAsyncGenerator, true, [
    [genFn, 'non-async generator']
  ]);

  runTestCases('`isAsyncGenerator`', isAsyncGenerator, true, [[asyncGenFn, 'async generator']]);

  runTestCases('`isES3Function`', isES3Function, true, [
    [es3Style, 'classic ES3 style function'],
    [legacyFn, 'legacy named function'],
    [declaredFn, 'declared function']
  ]);

  runTestCases('`isGenericFunction`', isGenericFunction, true, [
    [nonAsyncArrow, 'non-async arrow'],
    [declaredFn, 'declared function'],
    [es3Style, 'ES3 function']
  ]);

  runTestCases('`isGenericFunction` ❌', isGenericFunction, false, [
    [asyncArrow, 'async arrow'],
    [asyncFn, 'async function'],
    [genFn, 'generator'],
    [asyncGenFn, 'async generator'],
    [classDef, 'class'],
    [nativeCtor, 'Function constructor'],
    [fakeArrow, 'arrow with prototype']
  ]);
});
