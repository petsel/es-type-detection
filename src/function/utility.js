// @ts-check

import { getOwnPropertyDescriptor } from '../utility';

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * Detects whether a passed value features an own `prototype` property.
 * @param {Function} value
 *  Assumes a function type, but does not check for it.
 * @returns {boolean}
 *  Whether the passed type features an own `prototype` property.
 */
export function hasOwnPrototype(value) {
  return !!getOwnPropertyDescriptor(value, 'prototype');
}

/**
 * Detects whether a passed value features an own, truly `writable`
 * `prototype` property.
 * @param {Function} value
 *  Assumes a function type, but does not check for it.
 * @returns {boolean}
 *  Whether the passed type features an own, truly `writable`
 *  `prototype` property.
 */
export function hasOwnWritablePrototype(value) {
  return getOwnPropertyDescriptor(value, 'prototype')?.writable === true;
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
