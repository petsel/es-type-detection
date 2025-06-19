import {
  resolveType,
  getTaggedType,
  getTypeSignature,
  getDefinedConstructorName,
  getDefinedConstructor
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
  isPromise,
  doesMatchThenable,
  doesMatchSafeThenable
} from './flow';

/* eslint-disable sort-keys */
export default {
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
  fn: {
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
  flow: {
    isGenerator,
    isAsyncGenerator,
    isAnyGenerator,
    isPromise,
    doesMatchThenable,
    doesMatchSafeThenable
  },
  identity: {
    defineStableTypeIdentity,
    hasStableTypeIdentity,
    hasCustomTypeIdentity,
    hasBuiltinTypeIdentity
  },
  utility: {
    resolveType,
    getTaggedType,
    getTypeSignature,
    getDefinedConstructorName,
    getDefinedConstructor,
    hasConstructSlot,
    hasOwnPrototype,
    hasOwnWritablePrototype
  }
};
/* eslint-enable sort-keys */
