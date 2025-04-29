import {
  getTypeSignature,
  getTaggedType,
  getDefinedConstructor,
  getDefinedConstructorName,
  resolveType,
  defineStableType,
  hasStableTypeIdentity,
  hasCustomTypeIdentity,
  hasBuiltinTypeIdentity
} from './utility';

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
} from './base';

import { hasOwnWritablePrototype, hasOwnPrototype } from './function/utility';
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
    defineStableType,
    hasStableTypeIdentity,
    hasCustomTypeIdentity,
    hasBuiltinTypeIdentity,
    hasOwnWritablePrototype,
    hasOwnPrototype
  },
  base: {
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
  },
  function: {
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
