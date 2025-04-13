import { describe, it, expect } from 'vitest';

import {
  getTypeSignature,
  getTaggedType,
  getDefinedConstructor,
  getDefinedConstructorName,
  resolveType,
  defineStableType,
  hasStableTypeIdentity
} from '../src/utility';

import {
  isFunction,
  isObject,
  isObjectObject,
  isDictionaryObject,
  isString,
  isStringValue,
  isStringObject,
  isNumber,
  isNumberValue,
  isNumberObject,
  isBoolean,
  isBooleanValue,
  isBooleanObject,
  isSymbol,
  isSymbolValue,
  isSymbolObject,
  isBigInt,
  isBigIntValue,
  isBigIntObject
} from '../src/base';

import { hasOwnPrototype, hasOwnWritablePrototype } from '../src/function/utility';
import {
  isClass,
  isNonAsyncGenerator,
  isAsyncGenerator,
  isGenerator,
  isAsyncFunction,
  isAsyncNonArrow,
  isAsyncArrow,
  isNonAsyncArrow,
  isArrow,
  isES3Function,
  isGenericFunction,
  isUnnamedFunction
} from '../src/function';

import {
  isError,
  isErrorError,
  isEvalError,
  isRangeError,
  isReferenceError,
  isSyntaxError,
  isTypeError,
  isURIError,
  isAggregateError
} from '../src/error';

import module from '../src';

function runTestCases(namespace, cases) {
  for (const [fctName, testFct] of cases) {
    it(` - \`${fctName}\``, () => {
      expect(isFunction(namespace[fctName])).toStrictEqual(true);
      expect(namespace[fctName]).toStrictEqual(testFct);
    });
  }
}

describe('The top most exported module ...', () => {
  it('... is expected to be a plain object (that)...', () => {
    expect(isObjectObject(module)).toStrictEqual(true);
  });
  it('... features exactly 4 own property keys.', () => {
    expect(Object.keys(module).length).toStrictEqual(4);
  });
  describe('... should feature the `utility` property ...', () => {
    it('... which itself refers a plain object too ...', () => {
      expect(isObjectObject(module.utility)).toStrictEqual(true);
    });
    it('... that again features exactly 9 own property keys.', () => {
      expect(Object.keys(module.utility).length).toStrictEqual(9);
    });
    describe('The `utility` namespace should feature following utility methods ...', () => {
      runTestCases(module.utility, [
        ['getTypeSignature', getTypeSignature],
        ['getTaggedType', getTaggedType],

        ['getDefinedConstructor', getDefinedConstructor],
        ['getDefinedConstructorName', getDefinedConstructorName],

        ['resolveType', resolveType],

        ['defineStableType', defineStableType],

        ['hasStableTypeIdentity', hasStableTypeIdentity],

        ['hasOwnPrototype', hasOwnPrototype],
        ['hasOwnWritablePrototype', hasOwnWritablePrototype]
      ]);
    });
  });
  describe('... should feature the `base` property ...', () => {
    it('... which itself refers a plain object too ...', () => {
      expect(isObjectObject(module.base)).toStrictEqual(true);
    });
    it('... that again features exactly 19 own property keys.', () => {
      expect(Object.keys(module.base).length).toStrictEqual(19);
    });
    describe('The `base` namespace should feature following type detection methods ...', () => {
      runTestCases(module.base, [
        ['isFunction', isFunction],

        ['isObject', isObject],
        ['isObjectObject', isObjectObject],
        ['isDictionaryObject', isDictionaryObject],

        ['isString', isString],
        ['isStringValue', isStringValue],
        ['isStringObject', isStringObject],

        ['isNumber', isNumber],
        ['isNumberValue', isNumberValue],
        ['isNumberObject', isNumberObject],

        ['isBoolean', isBoolean],
        ['isBooleanValue', isBooleanValue],
        ['isBooleanObject', isBooleanObject],

        ['isSymbol', isSymbol],
        ['isSymbolValue', isSymbolValue],
        ['isSymbolObject', isSymbolObject],

        ['isBigInt', isBigInt],
        ['isBigIntValue', isBigIntValue],
        ['isBigIntObject', isBigIntObject]
      ]);
    });
  });
  describe('... should feature the `function` property ...', () => {
    it('... which itself refers a plain object too ...', () => {
      expect(isObjectObject(module.function)).toStrictEqual(true);
    });
    it('... that again features exactly 12 own property keys.', () => {
      expect(Object.keys(module.function).length).toStrictEqual(12);
    });
    describe('The `function` namespace should feature following function-type detection methods ...', () => {
      runTestCases(module.function, [
        ['isClass', isClass],

        ['isNonAsyncGenerator', isNonAsyncGenerator],
        ['isAsyncGenerator', isAsyncGenerator],
        ['isGenerator', isGenerator],

        ['isAsyncFunction', isAsyncFunction],
        ['isAsyncNonArrow', isAsyncNonArrow],
        ['isAsyncArrow', isAsyncArrow],

        ['isNonAsyncArrow', isNonAsyncArrow],
        ['isArrow', isArrow],

        ['isES3Function', isES3Function],
        ['isGenericFunction', isGenericFunction],

        ['isUnnamedFunction', isUnnamedFunction]
      ]);
    });
  });
  describe('... should feature the `error` property ...', () => {
    it('... which itself refers a plain object too ...', () => {
      expect(isObjectObject(module.error)).toStrictEqual(true);
    });
    it('... that again features exactly 9 own property keys.', () => {
      expect(Object.keys(module.error).length).toStrictEqual(9);
    });
    describe('The `error` namespace should feature following error-type detection methods ...', () => {
      runTestCases(module.error, [
        ['isError', isError],
        ['isErrorError', isErrorError],

        ['isEvalError', isEvalError],
        ['isRangeError', isRangeError],
        ['isReferenceError', isReferenceError],
        ['isSyntaxError', isSyntaxError],
        ['isTypeError', isTypeError],
        ['isURIError', isURIError],
        ['isAggregateError', isAggregateError]
      ]);
    });
  });
});
