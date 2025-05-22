import {
  getTypeSignature,
  getTaggedType,
  getDefinedConstructor,
  getDefinedConstructorName,
  resolveType
} from './utility';

import {
  defineStableTypeIdentity,
  hasStableTypeIdentity,
  hasCustomTypeIdentity,
  hasBuiltinTypeIdentity
} from './type-identity';

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
} from './base';

import {
  hasOwnWritablePrototype,
  hasOwnPrototype,
  hasConstructSlot,
  isConstructable
} from './function/utility';

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
} from './function';

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
} from './error';

import {
  isGenerator,
  isAsyncGenerator,
  isAnyGenerator,
  doesMatchThenable,
  doesMatchSafeThenable,
  isPromise
} from './flow';

/* eslint-disable sort-keys */
export default {
  utility: {
    getTypeSignature,
    getTaggedType,
    getDefinedConstructor,
    getDefinedConstructorName,
    resolveType,
    defineStableTypeIdentity,
    hasStableTypeIdentity,
    hasCustomTypeIdentity,
    hasBuiltinTypeIdentity,
    hasConstructSlot,
    hasOwnPrototype,
    hasOwnWritablePrototype
  },
  base: {
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
  },
  function: {
    isConstructable,
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
  },
  error: {
    isError,
    isErrorError,
    isEvalError,
    isRangeError,
    isReferenceError,
    isSyntaxError,
    isTypeError,
    isURIError,
    isAggregateError
  },
  flow: {
    isGenerator,
    isAsyncGenerator,
    isAnyGenerator,
    doesMatchThenable,
    doesMatchSafeThenable,
    isPromise
  }
};
/* eslint-enable sort-keys */
