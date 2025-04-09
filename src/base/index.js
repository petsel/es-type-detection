import { getTypeSignature, getDefinedConstructorName } from '../utility';

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

// @ts-check

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
 * @returns {value is PlainObject}
 *  Whether the passed value can be described as _"Null-prototype object"_
 *  or _"Prototype-less object"_.
 */
export function isDictionaryObject(value) {
  return (
    getTypeSignature(value) === '[object Object]' && (Object.getPrototypeOf(value) ?? null) === null
  );
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

// /**
//  * @param {any} [value]
//  *  An optionally passed value of any type.
//  * @returns {value is Array}
//  *  Whether the passed value is an `Array` type.
//  */
// export function isArray(value) {
//   return Array.isArray(value);
// }

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('../typedef.js').StringValue} StringValue */
/** @typedef {import('../typedef.js').StringObject} StringObject */
/** @typedef {import('../typedef.js').StringType} StringType */

/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is StringType}
 *  Whether the passed value is a string, either a primitive string value or a boxed `String` object type.
 */
export function isString(value) {
  return getTypeSignature(value) === '[object String]';
}
/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is StringObject}
 *  Whether the passed value is a boxed `String` object type.
 */
export function isStringObject(value) {
  return isString(value) && typeof value === 'object';
}
/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is StringValue}
 *  Whether the passed value is a primitive string value.
 */
export function isStringValue(value) {
  return typeof value === 'string';
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('../typedef.js').NumberValue} NumberValue */
/** @typedef {import('../typedef.js').NumberObject} NumberObject */
/** @typedef {import('../typedef.js').NumberType} NumberType */

/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is NumberType}
 *  Whether the passed value is a number, either a primitive number value or a boxed `Number` object type.
 */
export function isNumber(value) {
  return getTypeSignature(value) === '[object Number]';
}
/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is NumberObject}
 *  Whether the passed value is a boxed `Number` object type.
 */
export function isNumberObject(value) {
  return isNumber(value) && typeof value === 'object';
}
/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is NumberValue}
 *  Whether the passed value is a primitive number value.
 */
export function isNumberValue(value) {
  return typeof value === 'number';
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('../typedef.js').BooleanValue} BooleanValue */
/** @typedef {import('../typedef.js').BooleanObject} BooleanObject */
/** @typedef {import('../typedef.js').BooleanType} BooleanType */

/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is BooleanType}
 *  Whether the passed value is boolean, either a primitive boolean value or a boxed `Boolean` object type.
 */
export function isBoolean(value) {
  return getTypeSignature(value) === '[object Boolean]';
}
/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is BooleanObject}
 *  Whether the passed value is a boxed `Boolean` object type.
 */
export function isBooleanObject(value) {
  return isBoolean(value) && typeof value === 'object';
}
/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is BooleanValue}
 *  Whether the passed value is a primitive boolean value.
 */
export function isBooleanValue(value) {
  return typeof value === 'boolean';
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('../typedef.js').SymbolValue} SymbolValue */
/** @typedef {import('../typedef.js').SymbolObject} SymbolObject */
/** @typedef {import('../typedef.js').SymbolType} SymbolType */

/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is SymbolType}
 *  Whether the passed value is a symbol, either a primitive symbol value or a purposely boxed `Symbol` object type.
 */
export function isSymbol(value) {
  return getTypeSignature(value) === '[object Symbol]';
}
/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is SymbolObject}
 *  Whether the passed value is a purposely boxed `Symbol` object type.
 */
export function isSymbolObject(value) {
  return isSymbol(value) && typeof value === 'object';
}
/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is SymbolValue}
 *  Whether the passed value is a primitive symbol value.
 */
export function isSymbolValue(value) {
  return typeof value === 'symbol';
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('../typedef.js').BigIntValue} BigIntValue */
/** @typedef {import('../typedef.js').BigIntObject} BigIntObject */
/** @typedef {import('../typedef.js').BigIntType} BigIntType */

/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is BigIntType}
 *  Whether the passed value is a bigint, either a primitive bigint value or a purposely boxed `BigInt` object type.
 */
export function isBigInt(value) {
  return getTypeSignature(value) === '[object BigInt]';
}
/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is BigIntObject}
 *  Whether the passed value is a purposely boxed `BigInt` object type.
 */
export function isBigIntObject(value) {
  return isBigInt(value) && typeof value === 'object';
}
/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is BigIntValue}
 *  Whether the passed value is a primitive bigint value.
 */
export function isBigIntValue(value) {
  return typeof value === 'bigint';
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
