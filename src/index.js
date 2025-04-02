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
  isArray,
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

export default {
  utility: {
    getTypeSignature,
    getTaggedType,
    getDefinedConstructor,
    getDefinedConstructorName,
    resolveType,
    defineStableType,
    hasStableTypeIdentity
  },
  base: {
    isFunction,
    isObject,
    isObjectObject,
    isDictionaryObject,
    isArray,
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
    utility: {}
  }
};
