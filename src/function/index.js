// @ts-check

import { hasOwnPrototype, hasOwnWritablePrototype } from './utility';
import {
  getOwnPropertyDescriptor,
  getFunctionSource,
  getDefinedConstructor,
  getDefinedConstructorName,
  getTypeSignature,
  getTaggedType,
  resolveType
} from '../utility';

import { isFunction } from '../base';

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('./typedef.js').ClassConstructor<typeof Function>} ClassConstructor */

/**
 * Detects whether the passed `value` is a
 * constructor function implemented as `class`.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is ClassConstructor}
 *  A boolean value which indicates whether the
 *  tested value is a class-constructor function.
 */
export function isClass(value) {
  return (
    isFunction(value) && getFunctionSource(value).startsWith('class')
    // (/^class(\s+[^{]+)?\s*{/).test(getFunctionSource(value))
  );
}

// /**
//  * @template {new (...args: any[]) => any} T
//  * @typedef {import('./typedef.js').SubclassedConstructor<T>} SubclassedConstructor
//  */
//
// /**
//  * Detects whether the passed `value` is a
//  * constructor function implemented as `class`
//  * that in addition extends another class.
//  * @param {any} [value]
//  *  An optionally passed value of any type.
//  * @returns {value is SubclassedConstructor}
//  *  A boolean value which indicates whether the
//  *  tested value is a subclassed constructor function.
//  */
// export function isSubclass(value) {
//   return (
//     isClass(value) &&
//     // see ... [https://regex101.com/r/MoEhSd/1]
//     /^class\s+([_$\p{L}][_$\p{L}\p{N}]+\s+)?extends\b/u.test(getFunctionSource(value))
//   );
// }

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('./typedef.js').GeneratorFunction} GeneratorFunction */

/**
 * Detects whether the passed `value` is exclusively a `GeneratorFunction` type.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is GeneratorFunction}
 *  A boolean value which indicates whether the tested value is exclusively a
 *  `GeneratorFunction` type.
 */
export function isGeneratorFunction(value) {
  return (
    isFunction(value) &&
    getTypeSignature(value) === '[object GeneratorFunction]' &&
    resolveType(value) === 'GeneratorFunction'
  );
}

/** @typedef {import('./typedef.js').AsyncGeneratorFunction} AsyncGeneratorFunction */

/**
 * Detects whether the passed `value` is exclusively an `AsyncGeneratorFunction` type.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is AsyncGeneratorFunction}
 *  A boolean value which indicates whether the tested value is exclusively an
 *  `AsyncGeneratorFunction` type.
 */
export function isAsyncGeneratorFunction(value) {
  return (
    isFunction(value) &&
    getTypeSignature(value) === '[object AsyncGeneratorFunction]' &&
    resolveType(value) === 'AsyncGeneratorFunction'
  );
}

/** @typedef {import('./typedef.js').AnyGeneratorFunction} AnyGeneratorFunction */

/**
 * Detects whether the passed `value` is either kind of generator function,
 * async or non-async.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is AnyGeneratorFunction}
 *  A boolean value which indicates whether the tested value is either
 *  an async or a non-async generator function.
 */
export function isAnyGeneratorFunction(value) {
  if (isFunction(value)) {
    const typeName = resolveType(value);
    const taggedType = getTaggedType(value);

    return (
      !!typeName &&
      typeName === taggedType &&
      (typeName === 'GeneratorFunction' || typeName === 'AsyncGeneratorFunction')
    );
  }
  return false;
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('./typedef.js').AsyncFunction} AsyncFunction */

/**
 * Detects whether the passed `value` is an async function type, either an
 * async arrow function expression or an async non-arrow function expression
 * or an async function statement.
 * It does not detect an async generator function since the latter is not
 * an async function itself but the factory function of an async generator.
 * Async functions do return promises, but do not return async generators.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is AsyncFunction}
 *  A boolean value which indicates whether
 *  the tested value is an async function.
 */
export function isAsyncFunction(value) {
  return (
    isFunction(value) &&
    getTypeSignature(value) === '[object AsyncFunction]' &&
    getDefinedConstructorName(value) === 'AsyncFunction'
  );
}

/**
 * Detects whether the passed `value` is exclusively one of following two
 * async function variants, either an async non-arrow function expression
 * or an async function statement.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is AsyncFunction}
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
 * @returns {value is AsyncFunction}
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
  return isArrow(value) && !isAsyncFunction(value);
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
    !isAnyGeneratorFunction(value) &&
    !getFunctionSource(getDefinedConstructor(value)).startsWith('class')

    // (/^class(\s+[^{]+)?\s*{/).test(getFunctionSource(getDefinedConstructor(value)))
    // !isExtendedFunction(value)
  );
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('./typedef.js').ConciseGenericMethod} ConciseGenericMethod */

/**
 * Detects whether the passed `value` is a concise generic method, a function
 * which has been created exclusively by a non-async and non-generator shorthand
 * method definition.
 * @param {any} [value]
 *  An optionally passed value of any type.
 * @returns {value is ConciseGenericMethod}
 *  A boolean value which indicates whether the tested value is exclusively a
 *  concise generic method, a function created by a non-async and non-generator
 *  shorthand method definition.
 */
export function isConciseGenericMethod(value) {
  return (
    isFunction(value) &&
    !hasOwnPrototype(value) &&
    getTypeSignature(value) === '[object Function]' &&
    getDefinedConstructorName(value) === 'Function' &&
    // - until here all of the above steps do
    //   apply for non-async arrow functions too.

    !isArrow(value)
  );
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * Detects whether the passed `value` is a generic (unspecific/non-specific)
 * function ...
 *
 * - either a good old ES3 function,
 * - or a non-async arrow function expression.
 * - or either a non-async and non-generator concise method (shorthand function definition).
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
  return (
    isFunction(value) &&
    // non-async arrow-functions and shorthand methods (aka concise methods)
    (!hasOwnPrototype(value)
      ? getTypeSignature(value) === '[object Function]' &&
        getDefinedConstructorName(value) === 'Function'
      : // ES3 function
        hasOwnWritablePrototype(value) &&
        !isAnyGeneratorFunction(value) &&
        !getFunctionSource(getDefinedConstructor(value)).startsWith('class'))
  );
  // // ... was ...
  //
  // return isNonAsyncArrow(value) || isES3Function(value);
  //
  // // ... but is too strict due to methods that are written like ...
  // //
  // // const idealThenable = {
  // //   // Concise Method Syntax aka "Shorthand Method Definitions"
  // //   then(onFulfilled, onRejected) {
  // //     try {
  // //       const result = 'fulfilled from thenable';
  // //       if (typeof onFulfilled === 'function') {
  // //         onFulfilled(result);
  // //       }
  // //     } catch (err) {
  // //       if (typeof onRejected === 'function') {
  // //         onRejected(err);
  // //       }
  // //     }
  // //   }
  // // };
  // // ... where `then` is a function which does not have an own `prototype` descriptor slot.
}

// // ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
//
// /** @typedef {import('./typedef.js').FunctionSubtype<Function>} FunctionSubtype */
//
// /**
//  * Detects whether the passed `value` is exclusively an instance
//  * of a `Function` subclass, hence a `Function` subtype of e.g.
//  * following form ...
//  *
//  * ```
//  * class Applicator extends Function {
//  *   constructor(...args) {
//  *     super(...args);
//  *   }
//  * }
//  * // - constructable and callable instance of the
//  * //   custom `Applicator` function subtype/class.
//  * const Area = new Applicator('length = 1, width = 1', 'this.area = length * width');
//  *
//  * console.log(new Area); // { area: 1 }
//  * ```
//  * @param {any} [value]
//  *  An optionally passed value of any type.
//  * @returns {value is FunctionSubtype}
//  *  A boolean value which indicates whether the tested type is a
//  *  `Function` subtype (an instance of a class which extends `Function`).
//  */
// export function isFunctionSubtype(value) {
//   return (
//     isFunction(value) &&
//     getFunctionSource(
//       getOwnPropertyDescriptor(value, 'constructor') ?? value.constructor ?? ((_) => _)
//     ).startsWith('class')
//   );
// }
//
// // ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

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
