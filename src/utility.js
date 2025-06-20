// @ts-check

import { isFunction, isString } from './base';

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('./function/typedef.js').ES3Function} ES3Function */
/** @typedef {import('./function/typedef.js').ClassConstructor<typeof Function>} ClassConstructor */

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @internal */
export const getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;

/** @internal */
export const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

/** @internal */
export const getPrototypeOf = Object.getPrototypeOf;

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * Returns the internal type signature of the first argument, if provided.
 *
 * This function exposes a value’s internal `[[Class]]` tag (aka type signature),
 * such as `'[object Function]'` for a function or `'[object String]'` for a string -
 * whether it's a primitive string value or a `String` object type.
 *
 * Internally, it delegates to the standard prototype `toString` method:
 *
 * ```js
 * Object.prototype.toString.call(value);
 * ```
 * @param {...any} args
 *  A variadic argument list. The first argument (`args[0]`) is the optional
 *  `value` parameter. Its **presence** is detected via `args.length`, allowing
 *  the function to distinguish between an explicitly passed `undefined` value
 *  and a completely omitted argument.
 * @returns {string | undefined}
 *  The value’s internal type signature (e.g., `'[object Array]'` for an
 *  `Array` instance), or the `undefined` value if no argument was passed.
 * @category Basic Type Detection Helper
 */
export function getTypeSignature(...args) {
  /** @type {any} */
  const value = args[0];

  return (args.length >= 1 && Object.prototype.toString.call(value)) || value;
}

/**
 * Returns the tag name extracted from a value's internal type signature.
 *
 * This function wraps `getTypeSignature` and extracts the value’s internal
 * `[[Class]]` tag name - e.g., `'Array'` for arrays, `'Date'` for dates, or
 * even `'FooBar'` for objects _"spoofed"_ via `Symbol.toStringTag` ...
 *
 * ```js
 * const myObj = { foo: 'bar' }
 * myObj[Symbol.toStringTag] = 'FooBar';
 * ```
 *
 * If no argument is passed, the function returns `undefined`.
 *
 * ### Note
 * The tag name is the portion inside the brackets of the full type signature:
 *
 * ```js
 * Object.prototype.toString.call([]); // => '[object Array]'
 * ```
 *
 * Custom tag names can be defined via the `Symbol.toStringTag` property.
 *
 * Full example code for a successful _"spoofing"_ attempt:
 *
 * ```js
 * const myObj = { foo: 'bar' }
 * myObj[Symbol.toStringTag] = 'FooBar';
 *
 * console.log(myObj+'');                               // '[object FooBar]'
 * console.log(String(myObj));                          // '[object FooBar]'
 * console.log(myObj.toString());                       // '[object FooBar]'
 * console.log(Object.prototype.toString.call(myObj));  // '[object FooBar]'
 * ```
 *
 * This works for both custom types and overrides of built-in types.
 * @param {...any} args
 *  A variadic argument list. The first argument (`args[0]`) is optional.
 *  Its **presence** is detected via the result of the forwarding call to
 *  `getTypeSignature`.
 * @returns {string | undefined}
 *  The extracted tag name (e.g. `'Array'`, `'Date'`) or `undefined` if no
 *  value was provided.
 * @category Basic Type Detection Helper
 */
export function getTaggedType(...args) {
  const result = getTypeSignature(...args);

  return (isString(result) && result.slice(8, -1)) || result;
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {ClassConstructor | ES3Function | NewableFunction | undefined}
 *  if available, the passed value's constructor-function - either a built-in
 *  type's constructor-function or an ES6-class constructor-function or an
 *  ES3-function - otherwise `undefined`.
 * @category Basic Type Detection Helper
 */
export function getDefinedConstructor(value = null) {
  // guard.
  if (value === null) {
    return;
  }
  /** @type {Function | Object} */
  const constructor = getOwnPropertyDescriptor(value, 'constructor')?.value ?? value.constructor;

  // various guards.
  if (isFunction(constructor)) {
    // exit early with a valid result.
    return constructor;
  } else {
    /** @type {Function | undefined} */
    const creator = constructor?.constructor;

    if (isFunction(creator)) {
      // exit early with a valid result.
      return creator;
    }
  }
  // - in case function execution reaches beyond this comment,
  //   the `constructor` slot most probably has been manipulated, ...
  //
  //   ... or the passed `value` was created via `Object.create(null)`.

  /** @type {Object | null} */
  const prototype = getPrototypeOf(value) ?? null;

  // guard.
  if (prototype === null) {
    return;
  }
  // - in case function execution reaches beyond this comment,
  //   the `constructor` slot definitely has been maliciously
  //   manipulated.

  /** @type {Function | Object} */
  const protoConstructor =
    getOwnPropertyDescriptor(prototype, 'constructor')?.value ?? prototype.constructor;

  // various guards.
  if (isFunction(protoConstructor)) {
    // exit with a probably still valid result.
    return protoConstructor;
  } else {
    /** @type {Function | undefined} */
    const protoCreator = protoConstructor?.constructor;

    if (isFunction(protoCreator)) {
      // exit with a probably still valid result.
      return protoCreator;
    }
  }
  // implicitly return the `undefined` value.
}

/**
 * Implements a getter for the passed value's constructor-function name.
 * In case of being able to retrieve a constructor, the remaining constraint
 * is due to any function's `name` related property descriptor, which by default,
 * hence without any intentional further change, is ...
 *
 * ```
 * { ... writable: false, enumerable: false, configurable: true }
 * ```
 *
 * ...
 * - neither writable
 * - nor enumerable
 * - but configurable.
 *
 * Thus, something like ...
 *
 * ```
 * Object.defineProperty(fct, 'name', { value: 'FOO' })
 * ```
 *
 * ... will change any passed function's `name` value to "FOO". As long
 * as the latter can be safely excluded, the detection approach is safe.
 * One even can or better yet should take advantage of it, branding a
 * function permanently, in order to e.g. let constructor functions
 * harden each their name as a countermeasure to code-minification tasks.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {string | undefined}
 *  if available, the passed value's constructor-function name - retrieved
 *  exclusively from linked property-descriptors - otherwise `undefined`.
 *  Any unnamed function refers to the empty string value/`''` as its name.
 * @category Basic Type Detection Helper
 */
export function getDefinedConstructorName(value) {
  const constructor = getDefinedConstructor(value);

  return constructor && constructor.name;
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * Reaches for a function's stringified version by making
 * use of ...
 *
 * ```
 * Function.prototype.toString.call(value);
 * ```
 *
 * ... which helps in passing by some possibly manipulated
 * `toString` functionality.
 * @param {Function} value
 *  Assumes a function type but does not check for it.
 * @returns {string}
 *  Returns a function's stringified implementation.
 * @category Basic Type Detection Helper
 */
export function getFunctionSource(value) {
  return Function.prototype.toString.call(value).trim();
}

/**
 * Resolves the passed value's type-name through a combined, balanced approach of
 * retrieving either the value's constructor-function name or its `toString` tag.
 *
 * This works for every built-in type.
 *
 * In order to assure stable type-identity of custom type systems, based
 * on both class- and ES3-constructor functions, that remain unaffected
 * by code minification processes, one has to apply a utility function
 * which does permanently brand such types by writing and freezing both
 * of a constructor-function's property-descriptors - the function's `name`
 * property and its `Symbol.toStringTag` slot.
 * @param {...any} args
 *  A variadic argument list. The first argument (`args[0]`) is the optional
 *  `value` parameter. Its **presence** is detected via `args.length`, allowing
 *  the function to distinguish between an explicitly passed `undefined` value
 *  and a completely omitted argument.
 * @returns {string | undefined}
 *  A `'string'` value which either corresponds with the passed value's
 *  constructor-function's name or its tagged type; or the `undefined`
 *  value if no argument was passed.
 * @category Basic Type Detection Helper
 */
export function resolveType(...args) {
  /** @type {any} */
  const value = args[0];

  // guard.
  if (args.length === 0) {
    return;
  }
  const resolvedType = getDefinedConstructorName(value) ?? null;

  // guard.
  if (resolvedType === null) {
    // - covers the `undefined` and the `null` value as well as
    //   objects that were created via `Object.create(null)`.
    return getTaggedType(value);
  }
  // - The following block provides a more generic solution ...

  /** @type {Function | Object} */
  const constructor = getOwnPropertyDescriptor(value, 'constructor')?.value ?? value.constructor;

  // guard.
  if (!isFunction(constructor)) {
    return getTaggedType(value);
  }
  return resolvedType;

  // ... to special cases like the one of ...
  //
  // // - `Generator` and `AsyncGenerator` instances (objects) as well as
  // //   `GeneratorFunction` and `AsyncGeneratorFunction` types (functions)
  // //   need to be handled separately, in order to distinguish them.
  // ((
  //
  //   (resolvedType === 'GeneratorFunction' || resolvedType === 'AsyncGeneratorFunction') &&
  //   getTaggedType(value)
  //
  // ) || resolvedType);
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
