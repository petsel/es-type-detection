// @ts-check

import {
  getDefinedConstructor,
  getOwnPropertyDescriptor,
  getPrototypeOf,
  getTaggedType,
  resolveType
} from '../utility';

import { isFunction, isString } from '../base';
import { isClass } from '../function';

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

      /** @type {Object|undefined} */
      const prototype = getPrototypeOf(value);

      /** @type {PropertyDescriptor|undefined} */
      const valueDescriptor = getOwnPropertyDescriptor(value, toStringTagSymbol);
      /** @type {PropertyDescriptor|undefined} */
      const protoDescriptor = getOwnPropertyDescriptor(prototype ?? {}, toStringTagSymbol);

      const descriptor = valueDescriptor || protoDescriptor;

      // - valid only in case ...
      const isValidDefaultDescriptor =
        // ... a descriptor does exist at all ... and/but ...
        !!descriptor &&
        // ... it does exist exclusively ...
        !(valueDescriptor && protoDescriptor) &&
        // ... and does match the built-in default as well.
        descriptor.configurable === true &&
        descriptor.writable === false &&
        descriptor.enumerable === false;

      isConfirmed =
        !descriptor ||
        (isValidDefaultDescriptor &&
          (protoDescriptor
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

    /** @type {Object|undefined} */
    let prototype = getPrototypeOf(value);

    /** @type {PropertyDescriptor|undefined} */
    const valueDescriptor = getOwnPropertyDescriptor(value, toStringTagSymbol);
    /** @type {PropertyDescriptor|undefined} */
    let protoDescriptor = getOwnPropertyDescriptor(prototype ?? {}, toStringTagSymbol);

    isConfirmed = !!valueDescriptor || !!protoDescriptor;

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

    /** @type {Object|undefined} */
    const prototype = getPrototypeOf(value);

    /** @type {PropertyDescriptor} */
    const valueDescriptor = getOwnPropertyDescriptor(value, toStringTagSymbol);
    /** @type {PropertyDescriptor} */
    const protoDescriptor = getOwnPropertyDescriptor(prototype ?? {}, toStringTagSymbol);

    const descriptor = valueDescriptor || protoDescriptor;

    const isStableTagDescriptor =
      !!descriptor &&
      descriptor.configurable === false &&
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
      descriptor.writable !== true &&
      descriptor.enumerable === false;

    /** @type {Function | undefined} */
    const constructor = getDefinedConstructor(value);

    const isStableTaggedType =
      isStableTagDescriptor &&
      isFunction(constructor) &&
      (isClass(constructor)
        ? !!protoDescriptor && !valueDescriptor
        : !!valueDescriptor && !protoDescriptor);

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
 * @param {string} type
 * @returns {string}
 */
function getTrustedType(type) {
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
 * @param {ClassConstructor | ES3Function} constructor
 * @param {string} constructorName
 * @param {string} [taggedType]
 * @returns {ClassConstructor | ES3Function}
 * // @ returns {boolean}
 */
export function defineStableTypeIdentity(constructor, constructorName, taggedType) {
  // guard.
  if (!isConstructable(constructor)) {
    throw new TypeError(
      'The provided "constructor" parameter has to be a constructable function type.'
    );
  }
  // guard.
  if (!isString(constructorName)) {
    throw new TypeError('The provided "constructorName" parameter needs to be a string.');
  }
  constructorName = constructorName.trim();

  // guard.
  if (constructorName === '') {
    throw new RangeError('Invalid string value passed to "constructorName".');
  }
  if (!isString(taggedType)) {
    taggedType = constructorName;
  } else {
    taggedType = taggedType.trim();
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

  defineProperty(constructor, 'name', {
    // enumerable: false,
    // writable: false,
    configurable: false,
    get: getTrustedType.bind(constructor, constructorName)
  });
  defineProperty(constructor.prototype, Symbol.toStringTag, {
    // enumerable: false,
    // writable: false,
    configurable: false,
    get: getTrustedType.bind(constructor.prototype, taggedType)
  });
  return constructor;
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
