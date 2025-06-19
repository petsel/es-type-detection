import { describe, it, expect } from 'vitest';

import {
  resolveType,
  getTaggedType,
  getTypeSignature,
  getDefinedConstructorName,
  getDefinedConstructor
} from '../src/utility';

import {
  defineStableTypeIdentity,
  hasStableTypeIdentity,
  hasCustomTypeIdentity,
  hasBuiltinTypeIdentity
} from '../src/type-identity';

import {
  isFunction,
  isObject,
  isObjectObject,
  isDictionaryObject,
  isString,
  isStringValue,
  isBoxedString,
  isNumber,
  isNumberValue,
  isBoxedNumber,
  isBoolean,
  isBooleanValue,
  isBoxedBoolean,
  isSymbol,
  isSymbolValue,
  isBoxedSymbol,
  isBigInt,
  isBigIntValue,
  isBoxedBigInt
} from '../src/base';

import {
  hasOwnWritablePrototype,
  hasOwnPrototype,
  hasConstructSlot,
  isConstructable
} from '../src/function/utility';

import {
  isClass,
  isGeneratorFunction,
  isAsyncGeneratorFunction,
  isAnyGeneratorFunction,
  isAsyncFunction,
  isAsyncNonArrow,
  isAsyncArrow,
  isNonAsyncArrow,
  isArrow,
  isES3Function,
  isGenericFunction,
  isConciseGenericMethod,
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

import {
  isGenerator,
  isAsyncGenerator,
  isAnyGenerator,
  isPromise,
  doesMatchThenable,
  doesMatchSafeThenable
} from '../src/flow';

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
  it('... features exactly 6 own property keys.', () => {
    expect(Object.keys(module).length).toStrictEqual(6);
  });

  describe('... 🛠️ should feature the `utility` property ...', () => {
    it('... which itself refers a plain object too ...', () => {
      expect(isObjectObject(module.utility)).toStrictEqual(true);
    });
    it('... that again features exactly 8 own property keys.', () => {
      expect(Object.keys(module.utility).length).toStrictEqual(8);
    });
    describe('The `utility` namespace should feature following utility methods ...', () => {
      runTestCases(module.utility, [
        ['resolveType', resolveType],

        ['getTaggedType', getTaggedType],
        ['getTypeSignature', getTypeSignature],

        ['getDefinedConstructorName', getDefinedConstructorName],
        ['getDefinedConstructor', getDefinedConstructor],

        ['hasConstructSlot', hasConstructSlot],

        ['hasOwnPrototype', hasOwnPrototype],
        ['hasOwnWritablePrototype', hasOwnWritablePrototype]
      ]);
    });
  });

  describe('... 🪞 should feature the `identity` property ...', () => {
    it('... which itself refers a plain object too ...', () => {
      expect(isObjectObject(module.identity)).toStrictEqual(true);
    });
    it('... that again features exactly 11 own property keys.', () => {
      expect(Object.keys(module.identity).length).toStrictEqual(4);
    });
    describe('The `identity` namespace should feature following identity methods ...', () => {
      runTestCases(module.identity, [
        ['defineStableTypeIdentity', defineStableTypeIdentity],

        ['hasStableTypeIdentity', hasStableTypeIdentity],
        ['hasCustomTypeIdentity', hasCustomTypeIdentity],
        ['hasBuiltinTypeIdentity', hasBuiltinTypeIdentity]
      ]);
    });
  });

  describe('... 🧬 should feature the `base` property ...', () => {
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
        ['isBoxedString', isBoxedString],

        ['isNumber', isNumber],
        ['isNumberValue', isNumberValue],
        ['isBoxedNumber', isBoxedNumber],

        ['isBoolean', isBoolean],
        ['isBooleanValue', isBooleanValue],
        ['isBoxedBoolean', isBoxedBoolean],

        ['isSymbol', isSymbol],
        ['isSymbolValue', isSymbolValue],
        ['isBoxedSymbol', isBoxedSymbol],

        ['isBigInt', isBigInt],
        ['isBigIntValue', isBigIntValue],
        ['isBoxedBigInt', isBoxedBigInt]
      ]);
    });
  });

  describe('... 🧠 should feature the `fn` property ...', () => {
    it('... which itself refers a plain object too ...', () => {
      expect(isObjectObject(module.fn)).toStrictEqual(true);
    });
    it('... that again features exactly 13 own property keys.', () => {
      expect(Object.keys(module.fn).length).toStrictEqual(14);
    });
    describe('The `fn` namespace should feature following function-type detection methods ...', () => {
      runTestCases(module.fn, [
        ['isConstructable', isConstructable],

        ['isClass', isClass],

        ['isGeneratorFunction', isGeneratorFunction],
        ['isAsyncGeneratorFunction', isAsyncGeneratorFunction],
        ['isAnyGeneratorFunction', isAnyGeneratorFunction],

        ['isAsyncFunction', isAsyncFunction],
        ['isAsyncNonArrow', isAsyncNonArrow],
        ['isAsyncArrow', isAsyncArrow],

        ['isNonAsyncArrow', isNonAsyncArrow],
        ['isArrow', isArrow],

        ['isES3Function', isES3Function],
        ['isGenericFunction', isGenericFunction],
        ['isConciseGenericMethod', isConciseGenericMethod],

        ['isUnnamedFunction', isUnnamedFunction]
      ]);
    });
  });

  describe('... 🔥 should feature the `error` property ...', () => {
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

  describe('... 🌊 should feature the `flow` property ...', () => {
    it('... which itself refers a plain object too ...', () => {
      expect(isObjectObject(module.flow)).toStrictEqual(true);
    });
    it('... that again features exactly 6 own property keys.', () => {
      expect(Object.keys(module.flow).length).toStrictEqual(6);
    });
    describe('The `flow` namespace should feature following error-type detection methods ...', () => {
      runTestCases(module.flow, [
        ['isGenerator', isGenerator],
        ['isAsyncGenerator', isAsyncGenerator],
        ['isAnyGenerator', isAnyGenerator],

        ['isPromise', isPromise],

        ['doesMatchThenable', doesMatchThenable],
        ['doesMatchSafeThenable', doesMatchSafeThenable]
      ]);
    });
  });
});
