// @ts-check

import { getTaggedType, getTypeSignature, resolveType } from '../utility';

import { isObject, isFunction } from '../base';
import { isGenericFunction } from '../function';

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('./typedef.js').Generator} Generator */

/**
 * Detects whether the passed `value` is exclusively a `Generator` type.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is Generator}
 *  A boolean value which indicates whether the tested value is exclusively a
 *  `Generator` type.
 * @category Flow Type Detection
 */
export function isGenerator(value) {
  return getTypeSignature(value) === '[object Generator]' && resolveType(value) === 'Generator';
}

/** @typedef {import('./typedef.js').AsyncGenerator} AsyncGenerator */

/**
 * Detects whether the passed `value` is exclusively an `AsyncGenerator` type.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is AsyncGenerator}
 *  A boolean value which indicates whether the tested value is exclusively an
 *  `AsyncGenerator` type.
 * @category Flow Type Detection
 */
export function isAsyncGenerator(value) {
  return (
    getTypeSignature(value) === '[object AsyncGenerator]' && resolveType(value) === 'AsyncGenerator'
  );
}

/** @typedef {import('./typedef.js').AnyGenerator} AnyGenerator */

/**
 * Detects whether the passed `value` is either kind of generator type,
 * async or non-async.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is AnyGenerator}
 *  A boolean value which indicates whether the tested value is either
 *  an async or a non-async generator type.
 * @category Flow Type Detection
 */
export function isAnyGenerator(value) {
  if (value) {
    const typeName = resolveType(value);
    const taggedType = getTaggedType(value);

    return typeName === taggedType && (typeName === 'Generator' || typeName === 'AsyncGenerator');
  }
  return false;
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('./typedef.js').Thenable} Thenable */

/**
 * Verifies whether the passed `value` is either an object or a function
 * which features a `then` method; hence it executes a shallow check of
 * whether the test candidate features the most basic `Thenable` behavior/trait.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is Thenable}
 *  A boolean value which indicates whether the tested value does qualify
 *  as a _`Thenable`_ by having
 * @category Flow Type Detection
 */
export function doesMatchThenable(value) {
  return (isObject(value) || isFunction(value)) && isFunction(value.then);
}

/**
 * Verifies whether the passed `value` is either object or function that
 * features a `then` method, where the latter explicitly is either of both
 * function variants - arrow expression or function expression/statement -
 * thus, a `then` method is neither an async nor a generator function.
 * Like `doesMatchThenable` this function runs a shallow check of whether
 * the test candidate features the most basic `Thenable` behavior/trait,
 * just being stricter about the nature of a `then` method.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is Thenable}
 *  A boolean value which indicates whether the tested value does qualify
 *  as to be safely applied/used _`Thenable`_.
 * @category Flow Type Detection
 */
export function doesMatchSafeThenable(value) {
  return (isObject(value) || isFunction(value)) && isGenericFunction(value.then);
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * Detects whether the passed `value` is exclusively a `Promise` type.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is Promise}
 *  A boolean value which indicates whether the tested value is exclusively a `Promise` type.
 * @category Flow Type Detection
 */
export function isPromise(value) {
  return getTypeSignature(value) === '[object Promise]' && resolveType(value) === 'Promise';
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
