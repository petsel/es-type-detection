import { describe, it, expect } from 'vitest';

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

import {
  getTypeSignature,
  getTaggedType,
  getDefinedConstructor,
  getDefinedConstructorName,
  resolveType,
  defineStableType,
  hasStableTypeIdentity
} from '../src/utility';

import module from '../src';

describe('The top most exported module ...', () => {
  it('... is expected to be a plain object (that)...', () => {
    expect(isObjectObject(module)).toStrictEqual(true);
  });
  it('... features exactly 3 own property keys.', () => {
    expect(Object.keys(module).length).toStrictEqual(3);
  });
  describe('... should feature the `utility` property ...', () => {
    it('... which itself refers a plain object too ...', () => {
      expect(isObjectObject(module.utility)).toStrictEqual(true);
    });
    it('... that again features exactly 7 own property keys.', () => {
      expect(Object.keys(module.utility).length).toStrictEqual(7);
    });
    describe('The `utility` namespace should feature following utility methods ...', () => {
      it(' - `getTypeSignature`', () => {
        expect(isFunction(module.utility.getTypeSignature)).toStrictEqual(true);
        expect(module.utility.getTypeSignature).toStrictEqual(getTypeSignature);
      });
      it(' - `getTaggedType`', () => {
        expect(isFunction(module.utility.getTaggedType)).toStrictEqual(true);
        expect(module.utility.getTaggedType).toStrictEqual(getTaggedType);
      });

      it(' - `getDefinedConstructor`', () => {
        expect(isFunction(module.utility.getDefinedConstructor)).toStrictEqual(true);
        expect(module.utility.getDefinedConstructor).toStrictEqual(getDefinedConstructor);
      });
      it(' - `getDefinedConstructorName`', () => {
        expect(isFunction(module.utility.getDefinedConstructorName)).toStrictEqual(true);
        expect(module.utility.getDefinedConstructorName).toStrictEqual(getDefinedConstructorName);
      });

      it(' - `resolveType`', () => {
        expect(isFunction(module.utility.resolveType)).toStrictEqual(true);
        expect(module.utility.resolveType).toStrictEqual(resolveType);
      });

      it(' - `defineStableType`', () => {
        expect(isFunction(module.utility.defineStableType)).toStrictEqual(true);
        expect(module.utility.defineStableType).toStrictEqual(defineStableType);
      });

      it(' - `hasStableTypeIdentity`', () => {
        expect(isFunction(module.utility.hasStableTypeIdentity)).toStrictEqual(true);
        expect(module.utility.hasStableTypeIdentity).toStrictEqual(hasStableTypeIdentity);
      });
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
      it(' - `isFunction`', () => {
        expect(isFunction(module.base.isFunction)).toStrictEqual(true);
        expect(module.base.isFunction).toStrictEqual(isFunction);
      });

      it(' - `isObject`', () => {
        expect(isFunction(module.base.isObject)).toStrictEqual(true);
        expect(module.base.isObject).toStrictEqual(isObject);
      });
      it(' - `isObjectObject`', () => {
        expect(isFunction(module.base.isObjectObject)).toStrictEqual(true);
        expect(module.base.isObjectObject).toStrictEqual(isObjectObject);
      });
      it(' - `isDictionaryObject`', () => {
        expect(isFunction(module.base.isDictionaryObject)).toStrictEqual(true);
        expect(module.base.isDictionaryObject).toStrictEqual(isDictionaryObject);
      });

      it(' - `isString`', () => {
        expect(isFunction(module.base.isString)).toStrictEqual(true);
        expect(module.base.isString).toStrictEqual(isString);
      });
      it(' - `isStringValue`', () => {
        expect(isFunction(module.base.isStringValue)).toStrictEqual(true);
        expect(module.base.isStringValue).toStrictEqual(isStringValue);
      });
      it(' - `isStringObject`', () => {
        expect(isFunction(module.base.isStringObject)).toStrictEqual(true);
        expect(module.base.isStringObject).toStrictEqual(isStringObject);
      });

      it(' - `isNumber`', () => {
        expect(isFunction(module.base.isNumber)).toStrictEqual(true);
        expect(module.base.isNumber).toStrictEqual(isNumber);
      });
      it(' - `isNumberValue`', () => {
        expect(isFunction(module.base.isNumberValue)).toStrictEqual(true);
        expect(module.base.isNumberValue).toStrictEqual(isNumberValue);
      });
      it(' - `isNumberObject`', () => {
        expect(isFunction(module.base.isNumberObject)).toStrictEqual(true);
        expect(module.base.isNumberObject).toStrictEqual(isNumberObject);
      });

      it(' - `isBoolean`', () => {
        expect(isFunction(module.base.isBoolean)).toStrictEqual(true);
        expect(module.base.isBoolean).toStrictEqual(isBoolean);
      });
      it(' - `isBooleanValue`', () => {
        expect(isFunction(module.base.isBooleanValue)).toStrictEqual(true);
        expect(module.base.isBooleanValue).toStrictEqual(isBooleanValue);
      });
      it(' - `isBooleanObject`', () => {
        expect(isFunction(module.base.isBooleanObject)).toStrictEqual(true);
        expect(module.base.isBooleanObject).toStrictEqual(isBooleanObject);
      });

      it(' - `isSymbol`', () => {
        expect(isFunction(module.base.isSymbol)).toStrictEqual(true);
        expect(module.base.isSymbol).toStrictEqual(isSymbol);
      });
      it(' - `isSymbolValue`', () => {
        expect(isFunction(module.base.isSymbolValue)).toStrictEqual(true);
        expect(module.base.isSymbolValue).toStrictEqual(isSymbolValue);
      });
      it(' - `isSymbolObject`', () => {
        expect(isFunction(module.base.isSymbolObject)).toStrictEqual(true);
        expect(module.base.isSymbolObject).toStrictEqual(isSymbolObject);
      });

      it(' - `isBigInt`', () => {
        expect(isFunction(module.base.isBigInt)).toStrictEqual(true);
        expect(module.base.isBigInt).toStrictEqual(isBigInt);
      });
      it(' - `isBigIntValue`', () => {
        expect(isFunction(module.base.isBigIntValue)).toStrictEqual(true);
        expect(module.base.isBigIntValue).toStrictEqual(isBigIntValue);
      });
      it(' - `isBigIntObject`', () => {
        expect(isFunction(module.base.isBigIntObject)).toStrictEqual(true);
        expect(module.base.isBigIntObject).toStrictEqual(isBigIntObject);
      });
    });
  });
});
