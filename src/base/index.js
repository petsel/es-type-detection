// @ts-check

import { getPrototypeOf, getTypeSignature, getDefinedConstructorName } from '../utility';

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/* eslint-disable yoda */

/**
 * Detects any function type, which is ... not only the `typeof` operator
 * returns the `'function'` string for the operated `value`, but the latter
 * also features both of a function's call methods `call` and `apply`.
 *
 * This method is essential and **safe**.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is Function}
 *  A boolean value which indicates whether
 *  the tested type is any kind of function.
 */
export function isFunction(value) {
  return (
    'function' === typeof value &&
    'function' === typeof value.call &&
    'function' === typeof value.apply
  );
}
/* eslint-enable yoda */

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('../typedef.js').AnyObject} AnyObject */
/** @typedef {import('../typedef.js').PlainObject} PlainObject */
/** @typedef {import('../typedef.js').DictionaryObject} DictionaryObject */

/**
 * Matches generic object types hence real objects and boxed objects alike
 * excluding function types (though they are technically objects too) and
 * the `null` value which is a primitive value and just a placeholder for
 * a yet missing/unassigned object type.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is AnyObject}
 *  Whether the passed value matches the generic object type.
 */
export function isObject(value) {
  // - more explicit. exits early with `false` in case
  //   of any passed non-object and non-null value.
  return typeof value === 'object' && value !== null;

  // // - exits early with `false` in case of any passed falsy
  // //   value like `undefined`, `null`, `''`, `0`, ``false.
  // return !!value && typeof value === 'object';
}

/**
 * Matches object structures where the constructor exclusively is the built-in
 * `Object` type, which does exclude instances of custom ES6-class and ES3
 * constructor functions.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is PlainObject}
 *  Whether the passed value is a direct instance of the built-in `Object` type.
 */
export function isObjectObject(value) {
  return (
    getTypeSignature(value) === '[object Object]' && getDefinedConstructorName(value) === 'Object'
  );
}

/**
 * Matches object structures which do not have a prototype object.
 * Such objects remain unaffected to changes of `Object.prototype`.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is DictionaryObject}
 *  Whether the passed value can be described as _"Null-prototype object"_
 *  or _"Prototype-less object"_.
 */
export function isDictionaryObject(value) {
  return getTypeSignature(value) === '[object Object]' && (getPrototypeOf(value) ?? null) === null;
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('../typedef.js').StringValue} StringValue */
/** @typedef {import('../typedef.js').BoxedString} BoxedString */
/** @typedef {import('../typedef.js').StringType} StringType */

/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is StringValue}
 *  Whether the passed value is a primitive string value.
 */
export function isStringValue(value) {
  return typeof value === 'string';
}
/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is BoxedString}
 *  Whether the passed value is a boxed `String` object type.
 */
export function isBoxedString(value) {
  return (
    getTypeSignature(value) === '[object String]' &&
    getDefinedConstructorName(value) === 'String' &&
    typeof value === 'object'
  );
}
/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is StringType}
 *  Whether the passed value is a string, either a primitive string value or a boxed `String` object type.
 */
export function isString(value) {
  return isStringValue(value) || isBoxedString(value);
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('../typedef.js').NumberValue} NumberValue */
/** @typedef {import('../typedef.js').BoxedNumber} BoxedNumber */
/** @typedef {import('../typedef.js').NumberType} NumberType */

/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is NumberValue}
 *  Whether the passed value is a primitive number value.
 */
export function isNumberValue(value) {
  return typeof value === 'number';
}
/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is BoxedNumber}
 *  Whether the passed value is a boxed `Number` object type.
 */
export function isBoxedNumber(value) {
  return (
    getTypeSignature(value) === '[object Number]' &&
    getDefinedConstructorName(value) === 'Number' &&
    typeof value === 'object'
  );
}
/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is NumberType}
 *  Whether the passed value is a number, either a primitive number value or a boxed `Number` object type.
 */
export function isNumber(value) {
  return isNumberValue(value) || isBoxedNumber(value);
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('../typedef.js').BooleanValue} BooleanValue */
/** @typedef {import('../typedef.js').BoxedBoolean} BoxedBoolean */
/** @typedef {import('../typedef.js').BooleanType} BooleanType */

/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is BooleanValue}
 *  Whether the passed value is a primitive boolean value.
 */
export function isBooleanValue(value) {
  return typeof value === 'boolean';
}
/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is BoxedBoolean}
 *  Whether the passed value is a boxed `Boolean` object type.
 */
export function isBoxedBoolean(value) {
  return (
    getTypeSignature(value) === '[object Boolean]' &&
    getDefinedConstructorName(value) === 'Boolean' &&
    typeof value === 'object'
  );
}
/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is BooleanType}
 *  Whether the passed value is boolean, either a primitive boolean value or a boxed `Boolean` object type.
 */
export function isBoolean(value) {
  return isBooleanValue(value) || isBoxedBoolean(value);
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('../typedef.js').SymbolValue} SymbolValue */
/** @typedef {import('../typedef.js').BoxedSymbol} BoxedSymbol */
/** @typedef {import('../typedef.js').SymbolType} SymbolType */

/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is SymbolValue}
 *  Whether the passed value is a primitive symbol value.
 */
export function isSymbolValue(value) {
  return typeof value === 'symbol';
}
/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is BoxedSymbol}
 *  Whether the passed value is a purposely boxed `Symbol` object type.
 */
export function isBoxedSymbol(value) {
  return (
    getTypeSignature(value) === '[object Symbol]' &&
    getDefinedConstructorName(value) === 'Symbol' &&
    typeof value === 'object'
  );
}
/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is SymbolType}
 *  Whether the passed value is a symbol, either a primitive symbol value or a purposely boxed `Symbol` object type.
 */
export function isSymbol(value) {
  return isSymbolValue(value) || isBoxedSymbol(value);
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('../typedef.js').BigIntValue} BigIntValue */
/** @typedef {import('../typedef.js').BoxedBigInt} BoxedBigInt */
/** @typedef {import('../typedef.js').BigIntType} BigIntType */

/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is BigIntValue}
 *  Whether the passed value is a primitive bigint value.
 */
export function isBigIntValue(value) {
  return typeof value === 'bigint';
}
/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is BoxedBigInt}
 *  Whether the passed value is a purposely boxed `BigInt` object type.
 */
export function isBoxedBigInt(value) {
  return (
    getTypeSignature(value) === '[object BigInt]' &&
    getDefinedConstructorName(value) === 'BigInt' &&
    typeof value === 'object'
  );
}
/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is BigIntType}
 *  Whether the passed value is a bigint, either a primitive bigint value or a purposely boxed `BigInt` object type.
 */
export function isBigInt(value) {
  return isBigIntValue(value) || isBoxedBigInt(value);
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
