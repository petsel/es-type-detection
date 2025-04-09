import { isFunction, isString } from '../base';
import { isError } from './index';

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

// @ts-check

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

export function hasMatchingErrorPrototype(value) {
  const prototype = Object.getPrototypeOf(value) ?? null;

  // guard.
  if (prototype === null) {
    return false;
  }
  const {
    constructor: constrDesc = null,
    message: messageDesc = null,
    name: nameDesc = null,
    toString: toStringDesc = null
  } = Object.getOwnPropertyDescriptors(prototype);

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
