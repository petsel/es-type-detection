// @ts-check

import { getTypeSignature, getDefinedConstructorName } from '../utility';
import { hasMatchingErrorPrototype } from './utility';

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('./typedef.js').AnyError} AnyError */

/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is AnyError}
 *  whether the passed value matches any error type, hence it is
 *  an instance, either of the basic `Error` type, or of one of the
 *  built-in error-type subclasses (`SyntaxError`, `ReferenceError`, etc.),
 *  or of a custom error-type that extends the basic `Error` type.
 * @category Error Type Detection
 */
export function isError(value) {
  const signature = getTypeSignature(value);

  return (
    signature === '[object Error]' ||
    (signature === '[object Object]' && hasMatchingErrorPrototype(value))
  );
  // return getTypeSignature(value) === '[object Error]';
  // //
  // // - the above commented approach does not cover
  // //   the error test-suite edge cases of ...
  // //    - `Object.create(Error.prototype)`
  // //    - and an ES3 style `LegacyError` like ...
  // //      ```
  // //      (() => {
  // //        function LegacyError() {}
  // //        LegacyError.prototype = Object.create(Error.prototype);
  // //        LegacyError.prototype.name = 'LegacyError';
  // //        return new LegacyError();
  // //      })(),
  // //      ```
}

/** @typedef {import('./typedef.js').PlainError} PlainError */

/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is PlainError}
 *  whether the passed value matches exactly the built-in basic `Error` type.
 * @category Error Type Detection
 */
export function isErrorError(value) {
  return isError(value) && getDefinedConstructorName(value) === 'Error';
}

/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is EvalError}
 *  whether the passed value matches exactly the built-in `EvalError` subtype.
 * @category Error Type Detection
 */
export function isEvalError(value) {
  return isError(value) && getDefinedConstructorName(value) === 'EvalError';
}

/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is RangeError}
 *  whether the passed value matches exactly the built-in `RangeError` subtype.
 * @category Error Type Detection
 */
export function isRangeError(value) {
  return isError(value) && getDefinedConstructorName(value) === 'RangeError';
}

/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is ReferenceError}
 *  whether the passed value matches exactly the built-in `ReferenceError` subtype.
 * @category Error Type Detection
 */
export function isReferenceError(value) {
  return isError(value) && getDefinedConstructorName(value) === 'ReferenceError';
}

/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is SyntaxError}
 *  whether the passed value matches exactly the built-in `SyntaxError` subtype.
 * @category Error Type Detection
 */
export function isSyntaxError(value) {
  return isError(value) && getDefinedConstructorName(value) === 'SyntaxError';
}

/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is TypeError}
 *  whether the passed value matches exactly the built-in `TypeError` subtype.
 * @category Error Type Detection
 */
export function isTypeError(value) {
  return isError(value) && getDefinedConstructorName(value) === 'TypeError';
}

/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is URIError}
 *  whether the passed value matches exactly the built-in `URIError` subtype.
 * @category Error Type Detection
 */
export function isURIError(value) {
  return isError(value) && getDefinedConstructorName(value) === 'URIError';
}

/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is AggregateError}
 *  whether the passed value matches exactly the built-in `AggregateError` subtype.
 * @category Error Type Detection
 */
export function isAggregateError(value) {
  return isError(value) && getDefinedConstructorName(value) === 'AggregateError';
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
