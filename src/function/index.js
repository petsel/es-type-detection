// @ts-check

import { hasOwnPrototype, hasOwnWritablePrototype } from './utility';
import {
  getOwnPropertyDescriptor,
  getTypeSignature,
  // getTaggedType,
  getDefinedConstructor,
  getFunctionSource,
  resolveType
} from '../utility';

import { isFunction } from '../base';

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * Detects whether the passed `value` is a
 * constructor function implemented as `class`.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is NewableFunction}
 *  A boolean value which indicates whether the
 *  tested value is a class-constructor function.
 */
export function isClass(value) {
  return (
    isFunction(value) && getFunctionSource(value).startsWith('class')
    // (/^class(\s+[^{]+)?\s*{/).test(getFunctionSource(value))
  );
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * Detects whether the passed `value` is explicitly a `GeneratorFunction` type.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is GeneratorFunction}
 *  A boolean value which indicates whether the tested value is explicitly a
 *  `GeneratorFunction` type.
 */
export function isNonAsyncGenerator(value) {
  return isFunction(value) && getTypeSignature(value) === '[object GeneratorFunction]';
  // return isFunction(value) && getTaggedType(value) === 'GeneratorFunction';
}

/**
 * Detects whether the passed `value` is explicitly an `AsyncGeneratorFunction` type.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is AsyncGeneratorFunction}
 *  A boolean value which indicates whether the tested value is explicitly a
 *  `AsyncGeneratorFunction` type.
 */
export function isAsyncGenerator(value) {
  return isFunction(value) && getTypeSignature(value) === '[object AsyncGeneratorFunction]';
  // return isFunction(value) && getTaggedType(value) === 'AsyncGeneratorFunction';
}

/** @typedef {import('./typedef.js').AnyGenerator} AnyGenerator */

/**
 * Detects whether the passed `value` is either kind of generator function,
 * async or non-async.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is AnyGenerator}
 *  A boolean value which indicates whether the tested value is either
 *  an async or a non-async generator function.
 */
export function isGenerator(value) {
  if (isFunction(value)) {
    const typeName = resolveType(value);

    return (
      !!typeName && (typeName === 'GeneratorFunction' || typeName === 'AsyncGeneratorFunction')
    );
  }
  return false;
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('./typedef.js').AsyncFunctionType} AsyncFunctionType */

/**
 * Detects whether the passed `value` is an async function type, either an
 * async arrow function expression or an async non-arrow function expression
 * or an async function statement.
 * It does not detect an async generator function since the latter is not
 * an async function itself but the factory function of an async generator.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is AsyncFunctionType}
 *  A boolean value which indicates whether the
 *  tested value is a(n) (non-generator) async function.
 */
export function isAsyncFunction(value) {
  return isFunction(value) && getTypeSignature(value) === '[object AsyncFunction]';
  // return isFunction(value) && getTaggedType(value) === 'AsyncFunction';
}

/**
 * Detects whether the passed `value` is exclusively one of following two
 * async function variants, either an async non-arrow function expression
 * or an async function statement.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is AsyncFunctionType}
 *  A boolean value which indicates whether the tested value does match
 *  exclusively a non-arrow async function.
 */
export function isAsyncNonArrow(value) {
  return (
    isAsyncFunction(value) &&
    // see ... [https://regex101.com/r/9SamJe/2]
    !/^async\s+(?:\(.*?\)|[^(),=]+)\s*=>/.test(getFunctionSource(value))
  );
}

/**
 * Detects whether the passed `value` is exclusively an async arrow function.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is AsyncFunctionType}
 *  A boolean value which indicates whether the tested value is exclusively
 *  an async arrow function.
 */
export function isAsyncArrow(value) {
  return (
    isAsyncFunction(value) &&
    // see ... [https://regex101.com/r/9SamJe/2]
    /^async\s+(?:\(.*?\)|[^(),=]+)\s*=>/.test(getFunctionSource(value))
  );
}

/** @typedef {import('./typedef.js').NonAsyncArrow} NonAsyncArrow */

/**
 * Detects whether the passed `value` is exclusively a non-async arrow function.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is NonAsyncArrow}
 *  A boolean value which indicates whether the tested value is exclusively
 *  a non-async arrow function.
 */
export function isNonAsyncArrow(value) {
  return (
    isFunction(value) &&
    !hasOwnPrototype(value) &&
    getTypeSignature(value) !== '[object AsyncFunction]'
    // getTaggedType(value) !== 'AsyncFunction'
  );
  // return isArrow(value) && !isAsyncFunction(value);
}

/** @typedef {import('./typedef.js').AnyArrow} AnyArrow */

/**
 * Detects whether the passed `value` is either kind of an arrow
 * function expression - async or non-async.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is AnyArrow}
 *  A boolean value which indicates whether the tested value is
 *  either an async or a non-async arrow function expression.
 */
export function isArrow(value) {
  return (
    isFunction(value) &&
    // see ... [https://regex101.com/r/9SamJe/1]
    /^(?:async\s+)?(?:\(.*?\)|[^(),=]+)\s*=>/.test(getFunctionSource(value))
  );
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('./typedef.js').ES3Function} ES3Function */

/**
 * Detects whether the passed `value` is exclusively the only available
 * function type of ES3 (in addition to all the built-in constructors).
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is ES3Function}
 *  A boolean value which indicates whether the tested value is exclusively
 *  the only available/known function type back at ES3 (in addition to all
 *  the built-in constructor functions).
 */
export function isES3Function(value) {
  return (
    isFunction(value) &&
    hasOwnWritablePrototype(value) &&
    !isGenerator(value) &&
    !getFunctionSource(getDefinedConstructor(value)).startsWith('class')

    // (/^class(\s+[^{]+)?\s*{/).test(getFunctionSource(getDefinedConstructor(value)))
    // !isExtendedFunction(value)
  );
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * Detects whether the passed `value` is a generic (unspecific/non-specific)
 * function ...
 *
 * - either a good old ES3 function,
 * - or a non-async arrow function expression.
 *
 * Thus following specific (non-generic) function types are excluded ...
 *
 * - class constructor functions,
 * - any generator function,
 * - any async function variant,
 * - extended `Function` types,
 * - built-in constructor functions,
 * - Web Api constructor functions.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is (ES3Function | NonAsyncArrow)}
 *  A boolean value which indicates whether the tested value is either
 *  a good old ES3 function or a non-async arrow function expression.
 */
export function isGenericFunction(value) {
  return isNonAsyncArrow(value) || isES3Function(value);
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('./typedef.js').FunctionSubtype} FunctionSubtype */

/**
 * Detects whether the passed `value` is exclusively an instance
 * of a `Function` subclass, hence a `Function` subtype of e.g.
 * following form ...
 *
 * ```
 * class Applicator extends Function {
 * constructor(...args) {
 * super(...args);
 * }
 * }
 * // - constructable and callable instance of the
 * //   custom `Applicator` function subtype/class.
 * const Area = new Applicator('length = 1, width = 1', 'this.area = length * width');
 *
 * console.log(new Area); // { area: 1 }
 * ```
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is FunctionSubtype}
 *  A boolean value which indicates whether the tested type is a
 *  `Function` subtype (an instance of a class which extends `Function`).
 */
export function isFunctionSubtype(value) {
  return isFunction(value) && getFunctionSource(getDefinedConstructor(value)).startsWith('class');
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('./typedef.js').UnnamedFunction} UnnamedFunction */

/**
 * Detects whether the passed `value` is any kind of function type
 * but without a given name.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is UnnamedFunction}
 *  A boolean value which indicates whether
 *  the tested type is an unnamed function.
 */
export function isUnnamedFunction(value) {
  return isFunction(value) && getOwnPropertyDescriptor(value, 'name').value === '';
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
