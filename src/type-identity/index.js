// @ts-check

import {
  getDefinedConstructor,
  getOwnPropertyDescriptor,
  getPrototypeOf,
  getTaggedType,
  resolveType
} from '../utility';

import { isFunction, isString } from '../base';
import { isClass, isES3Function } from '../function';

import { isConstructable } from '../function/utility';
import { doesMatchStableFunctionNameDescriptor } from './utility';

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('../function/typedef.js').ES3Function} ES3Function */
/** @typedef {import('../function/typedef.js').ClassConstructor<typeof Function>} ClassConstructor */

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

const defineProperty = Object.defineProperty;

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * Does approve whether the passed value features the type-identity of any built-in type
 * which is ...the passed value is an instance of one of the language core's built-in
 * types and either does not have any `Symbol.toStringTag` related slots or features
 * just the type's standard-conform default `Symbol.toStringTag` property-descriptor.
 * @param {...any} args
 *  A variadic argument list. The first argument (`args[0]`) is the optional
 *  `value` parameter. Its **presence** is detected via `args.length`, allowing
 *  the function to distinguish between an explicitly passed `undefined` value
 *  and a completely omitted argument.
 * @returns {boolean}
 *  Whether the passed value features the built-in type-identity.
 */
export function hasBuiltinTypeIdentity(...args) {
  let isConfirmed = args.length >= 1;

  if (isConfirmed) {
    /** @type {any} */
    const value = args[0] ?? null;

    // - `null` and `undefined` both have a stable type-identity.
    //   Thus, further checks are not necessary, stability already
    //   is confirmed.
    if (value !== null && (isConfirmed = !isClass(value.constructor))) {
      const toStringTagSymbol = Symbol.toStringTag;

      /** @type {Object | undefined} */
      const prototype = getPrototypeOf(value);

      // eslint-disable-next-line jsdoc/no-undefined-types
      /** @type {PropertyDescriptor | undefined} */
      const typeTagDescriptor = getOwnPropertyDescriptor(value, toStringTagSymbol);

      // eslint-disable-next-line jsdoc/no-undefined-types
      /** @type {PropertyDescriptor | undefined} */
      const prototypeTagDescriptor = getOwnPropertyDescriptor(prototype ?? {}, toStringTagSymbol);

      const descriptor = typeTagDescriptor || prototypeTagDescriptor;

      // - valid only in case ...
      const isValidDefaultDescriptor =
        // ... a descriptor does exist at all ... and/but ...
        !!descriptor &&
        // ... it does exist exclusively ...
        !(typeTagDescriptor && prototypeTagDescriptor) &&
        // ... and does match the built-in default as well.
        descriptor.configurable === true &&
        descriptor.writable === false &&
        descriptor.enumerable === false;

      isConfirmed =
        !descriptor ||
        (isValidDefaultDescriptor &&
          (prototypeTagDescriptor
            ? builtInToStringTagPrototypes.has(resolveType(value))
            : builtInToStringTagTypes.has(getTaggedType(value))));
    }
  }
  return isConfirmed;
}
const builtInToStringTagPrototypes = new Set([
  'BigInt',
  'Symbol',
  'Map',
  'Set',
  'WeakMap',
  'WeakSet',
  'ArrayBuffer',
  'Promise',
  'Generator',
  'AsyncGenerator',
  'AsyncFunction',
  'GeneratorFunction',
  'AsyncGeneratorFunction'
]);
const builtInToStringTagTypes = new Set(['Math', 'JSON', 'Reflect', 'Atomics']);

/**
 * Does approve whether the passed value features a custom applied type-identity,
 * which is ... there are `Symbol.toStringTag` related slots available, directly
 * owned either by the passed value itself or by its prototype, and none of it
 * can be matched against a built-in type-identity.
 * @param {...any} args
 *  A variadic argument list. The first argument (`args[0]`) is the optional
 *  `value` parameter. Its **presence** is detected via `args.length`, allowing
 *  the function to distinguish between an explicitly passed `undefined` value
 *  and a completely omitted argument.
 * @returns {boolean}
 *  Whether the passed value features a custom applied type-identity.
 */
export function hasCustomTypeIdentity(...args) {
  let isConfirmed = args.length >= 1 && !hasBuiltinTypeIdentity(...args);

  // - no built-in type-identity and available argument(s).
  if (isConfirmed) {
    /** @type {any} */
    const value = args[0];

    const toStringTagSymbol = Symbol.toStringTag;

    /** @type {Object | undefined} */
    let prototype = getPrototypeOf(value);

    // eslint-disable-next-line jsdoc/no-undefined-types
    /** @type {PropertyDescriptor | undefined} */
    const typeTagDescriptor = getOwnPropertyDescriptor(value, toStringTagSymbol);

    // eslint-disable-next-line jsdoc/no-undefined-types
    /** @type {PropertyDescriptor | undefined} */
    let prototypeTagDescriptor = getOwnPropertyDescriptor(prototype ?? {}, toStringTagSymbol);

    isConfirmed = !!typeTagDescriptor || !!prototypeTagDescriptor;

    while (!isConfirmed && (prototype = getPrototypeOf(prototype))) {
      isConfirmed = !!getOwnPropertyDescriptor(prototype, toStringTagSymbol);
    }
  }
  return isConfirmed;
}

/**
 * Does approve whether the passed value features a stable type-identity, which is ...
 * either the value comes with the built-in type-identity of one of the core language's
 * types, or the value has been processed via `defineStableTypeIdentity`, or it features
 * property-descriptors which are in line with the result of the latter process.
 * @param {...any} args
 *  A variadic argument list. The first argument (`args[0]`) is the optional
 *  `value` parameter. Its **presence** is detected via `args.length`, allowing
 *  the function to distinguish between an explicitly passed `undefined` value
 *  and a completely omitted argument.
 * @returns {boolean}
 *  Whether the passed value features a stable type-identity.
 */
export function hasStableTypeIdentity(...args) {
  let isConfirmed = hasBuiltinTypeIdentity(...args);

  // - A boolean `true` return value of `hasBuiltinTypeIdentity` already does cover
  //   both the `null` and the `undefined` value. Further checks only need to be made
  //   in case two conditions are met; a boolean `false` return value with an actually
  //   passed argument, where the latter represents the further to be checked `value`.

  if (!isConfirmed && args.length >= 1) {
    /** @type {any} */
    const value = args[0];

    const toStringTagSymbol = Symbol.toStringTag;

    /** @type {Object | undefined} */
    const prototype = getPrototypeOf(value);

    // eslint-disable-next-line jsdoc/no-undefined-types
    /** @type {PropertyDescriptor | undefined} */
    const typeTagDescriptor = getOwnPropertyDescriptor(value, toStringTagSymbol);

    // eslint-disable-next-line jsdoc/no-undefined-types
    /** @type {PropertyDescriptor | undefined} */
    const prototypeTagDescriptor = getOwnPropertyDescriptor(prototype ?? {}, toStringTagSymbol);

    const descriptor = typeTagDescriptor || prototypeTagDescriptor;

    // @IMPORTANT ... never change the inverse but explicitly excluding logic
    //                for the  `writable` property. This is due to how the
    //                prototypal `[Symbol.toStringTag]` getter function of
    //                any class based implementation does create its related
    //                property-descriptor.
    //  ```
    //  get [Symbol.toStringTag]() {
    //    return 'ExplicitlyTaggedType';
    //  }
    //  ```
    //                The above code generates following property-descriptor:
    //  ```
    //  { configurable: true, enumerable: false, get: ([Symbol.toStringTag]() { return 'ExplicitlyTaggedType'; }), set: undefined }
    //  ```
    //                The beneath check will be true for both an omitted `writable`
    //                property and one which has been set explicitly to `false`.
    const isStableTagDescriptor =
      !!descriptor &&
      descriptor.configurable === false &&
      descriptor.writable !== true &&
      descriptor.enumerable === false;

    /** @type {Function | undefined} */
    const constructor = getDefinedConstructor(value);

    const isStableTaggedType =
      isStableTagDescriptor &&
      isFunction(constructor) &&
      (isClass(constructor)
        ? !!prototypeTagDescriptor && !typeTagDescriptor
        : !!typeTagDescriptor && !prototypeTagDescriptor);

    isConfirmed =
      isStableTaggedType &&
      doesMatchStableFunctionNameDescriptor(getOwnPropertyDescriptor(constructor, 'name'));

    // if (isStableTaggedType) {
    //   isConfirmed
    //   const nameDescriptor = getOwnPropertyDescriptor(constructor, 'name');
    //
    //   isConfirmed =
    //     !!nameDescriptor &&
    //     nameDescriptor.configurable === false &&
    //     nameDescriptor.writable !== true &&
    //     nameDescriptor.enumerable === false;
    // }
  }
  return isConfirmed;
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * @internal
 * @param {string} type
 * @returns {string}
 */
export function getTrustedType(type) {
  return type;
}

// /**
//  * @template {ClassConstructor | ES3Function} T
//  * @param {T} constructor
//  * @param {string} constructorName
//  * @param {string} [taggedType]
//  * @returns {T}
//  */
/**
 * Takes a constructor function, changes some of the function's related property
 * descriptors according to additionally passed name and tagged type parameters,
 * and returns a boolean value which indicates whether the "Stable Type Identity"
 * could be established successfully.
 * @param {ClassConstructor | ES3Function} constructor
 * @param {string} constructorName
 * @param {string} [taggedType]
 * @returns {boolean}
 *  Whether the "Stable Type Identity" could be
 *  successfully applied upon the passed constructor.
 */
export function defineStableTypeIdentity(constructor, constructorName, taggedType) {
  // guard.
  if (!isConstructable(constructor)) {
    throw new TypeError(
      'The provided "constructor" parameter has to be at least a constructable function-type.'
    );
  }
  // guard.
  if (!(isClass(constructor) || isES3Function(constructor))) {
    throw new TypeError(
      'Built-in constructors are not supported. The "Stable Type Identity" feature anyhow is useful for just ES5 class-constructors and ES3 constructor functions.'
    );
  }

  // guard.
  if (!isString(constructorName)) {
    throw new TypeError('The provided "constructorName" parameter needs to be a string.');
  }
  // - assure a string value primitive because that is what a name-descriptor will be checked
  //   for in order to pass as stable descriptor for a reliably type-identity verification.
  constructorName = String(constructorName).trim();

  // guard.
  if (constructorName === '') {
    throw new RangeError('Invalid string value passed to "constructorName".');
  }
  if (!isString(taggedType)) {
    taggedType = constructorName;
  } else {
    // - assure a string value primitive because that is what a `Symbol.toStringTag`-descriptor will
    //   be checked for in order to pass as stable descriptor for a reliably type-identity verification.
    taggedType = String(taggedType).trim();
  }

  // guard.
  if (taggedType === '') {
    throw new RangeError('Invalid string value passed to "taggedType".');
  }

  // // hint.
  // if (taggedType !== constructorName) {
  //   console.warn(
  //     `Just hinting ... \`defineStableTypeIdentity\` does assign 2 different types, "${constructorName}" as constructor name and "${taggedType}" as tagged type.`
  //   );
  // }

  const nameDescriptor = getOwnPropertyDescriptor(constructor, 'name');
  const canBeDefined = nameDescriptor.configurable !== false;

  if (canBeDefined) {
    defineProperty(constructor, 'name', {
      // get: getTrustedType.bind(constructor, constructorName),
      value: constructorName,
      enumerable: false,
      configurable: false
    });
    defineProperty(constructor.prototype, Symbol.toStringTag, {
      get: getTrustedType.bind(constructor.prototype, taggedType),
      enumerable: false,
      configurable: false
    });
  }
  return canBeDefined;
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
