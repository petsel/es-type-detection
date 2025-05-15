// @ts-check

import { getPrototypeOf, getOwnPropertyDescriptors } from '../utility';

import { isFunction, isString } from '../base';
import { isError } from './index';

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {boolean}
 *  whether the passed value along its (non/existing) prototype chain
 *  does feature a prototype object which does qualify as the plain
 *  `Error` type's prototype.
 */
export function hasMatchingErrorPrototype(value) {
  const prototype = getPrototypeOf(value) ?? null;

  // guard.
  if (prototype === null) {
    return false;
  }
  /* eslint-disable jsdoc/no-undefined-types */

  /** @type {PropertyDescriptor | Object} */
  const descriptors = getOwnPropertyDescriptors(prototype) ?? {};

  /** @type {PropertyDescriptor | null} */
  const constrDesc = descriptors.constructor ?? null;
  /** @type {PropertyDescriptor | null} */
  const messageDesc = descriptors.message ?? null;
  /** @type {PropertyDescriptor | null} */
  const nameDesc = descriptors.name ?? null;
  /** @type {PropertyDescriptor | null} */
  const toStringDesc = descriptors.toString ?? null;

  /* eslint-enable jsdoc/no-undefined-types */

  return (
    (isFunction(constrDesc?.value) &&
      isString(messageDesc?.value) &&
      isString(nameDesc?.value) &&
      isFunction(toStringDesc?.value) &&
      prototype.toString().split(':')[0].trim().slice(-5) === 'Error') ||
    isError(prototype)
  );
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

// /**
//  * Reaches for an error's stringified version by making
//  * use of ...
//  *
//  * ```
//  * Error.prototype.toString.call(value);
//  * ```
//  *
//  * ... which forces the error-specific `toString` default
//  * being executed upon the value it has been delegated to.
//  * @param {Function} value
//  *  Assumes and works best with an error
//  *  type, but does not check for it.
//  * @returns {string}
//  *  Returns a stringified error signature.
//  */
// export function getErrorString(value) {
//   return Error.prototype.toString.call(value).trim();
// }

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
