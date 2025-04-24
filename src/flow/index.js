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
 * Verifies whether the passed `value` is either object or function which
 * features a `then` method; hence it executes a shallow check of whether
 * the test candidate features the most basic `Thenable` behavior/trait.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is Thenable}
 *  A boolean value which indicates whether the tested value does qualify
 *  as a _`Thenable`_ by having
 */
export function doesMatchThenable(value) {
  return (isObject(value) || isFunction(value)) && isFunction(value.then);
}

/**
 * Verifies whether the passed `value` is either object or function which
 * features a `then` method, where the latter explicitly is either of both
 * function variants - arrow expression or function expression/statement -
 * thus, a `then` method is neither an async nor a generator function.
 * Like `doesMatchThenable` this function runs a shallow check of whether
 * the test candidate features the most basic `Thenable` behavior/trait,
 * just being more strict about the nature of a `then` method.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is Thenable}
 *  A boolean value which indicates whether the tested value does qualify
 *  as safely to be applied/used _`Thenable`_.
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
 */
export function isPromise(value) {
  return getTypeSignature(value) === '[object Promise]' && resolveType(value) === 'Promise';
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
