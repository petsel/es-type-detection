import {
  getTypeSignature,
  getTaggedType,
  getDefinedConstructor,
  getDefinedConstructorName,
  resolveType,
  defineStableType,
  hasStableTypeIdentity
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

import { hasOwnPrototype, hasOwnWritablePrototype } from './function/utility';
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
  isFunctionSubtype,
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

export default {
  utility: {
    getTypeSignature,
    getTaggedType,
    getDefinedConstructor,
    getDefinedConstructorName,
    resolveType,
    defineStableType,
    hasStableTypeIdentity,
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
    isFunctionSubtype,
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
  }
};
