// @ts-check

import { isFunction, isStringValue } from '../base';
// import { isClass, isES3Function } from '../function';

// import { isConstructable } from '../function/utility';
// import { getOwnPropertyDescriptor } from '../utility';

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('../function/typedef.js').ES3Function} ES3Function */
/** @typedef {import('../function/typedef.js').ClassConstructor<typeof Function>} ClassConstructor */

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * Does approve whether the passed value matches the default data-structure of a non-enumerable
 * property-descriptor which is ...
 * `{ value: 'string-value', enumerable: false, writable: false, configurable: true }`
 * @internal
 * @param {any} value
 * @returns {boolean}
 *  Whether the passed value matches the default data-structure of a non-enumerable property-descriptor.
 */
export function doesMatchNonEnumerableDescriptorDefault(value) {
  const { value: key, enumerable, writable, configurable } = value || {};

  return isStringValue(key) && enumerable === false && writable === false && configurable === true;
}

/**
 * Does approve whether the passed value matches the stable
 * (redefined) form of a non-enumerable property-descriptor.
 * @internal
 * @param {any} value
 * @returns {boolean}
 *  Whether the passed value matches the stable (redefined)
 *  form of a non-enumerable property-descriptor.
 */
export function doesMatchStableNonEnumerableDescriptor(value) {
  const { get: getKey, value: key, enumerable, writable, configurable } = value || {};

  return (
    ((isFunction(getKey) && isStringValue(getKey())) || isStringValue(key)) &&
    enumerable === false &&
    writable !== true &&
    configurable === false
  );
}

// // ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
//
// /**
//  * @param {ClassConstructor | ES3Function} constructor
//  * @returns {boolean}
//  */
// export function isStableTypeIdentityCustomConstructor(constructor) {
//   // guard.
//   if (!isClass(constructor) && !isES3Function(constructor)) {
//     return false;
//   }
//   // const { enumerable, writable, configurable } = getOwnPropertyDescriptor(constructor, 'name');
//   // const isStableNameDescriptor =
//   //   enumerable === false && writable !== true && configurable === false;
//
//   const isStableNameDescriptor = doesMatchStableNonEnumerableDescriptor(
//     getOwnPropertyDescriptor(constructor, 'name')
//   );
//   // proceed clause.
//   if (isStableNameDescriptor) {
//     const { enumerable, writable, configurable } = getOwnPropertyDescriptor(
//       constructor.prototype,
//       Symbol.toStringTag
//     );
//     // ... does feature both ...
//     //  - a stable constructor-name descriptor ... and ...
//     //  - a stable [Symbol.toStringTag] (custom tag-name) descriptor.
//     return enumerable === false && writable !== true && configurable === false;
//   }
//   // early exit.
//   return false;
// }
//
// // ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
//
// /**
//  * @param {ClassConstructor | ES3Function} constructor
//  * @param {string } taggedType
//  * @returns {boolean}
//  */
// export function isStableTaggedCustomConstructor(constructor, taggedType) {
//   // let isConfirmed = isConstructable(constructor) && (isClass(constructor) || isES3Function(constructor) )
//
//   // guard.
//   if (!isConstructable(constructor)) {
//     throw new TypeError(
//       'The provided "constructor" parameter must be a constructable function type.'
//     );
//   }
//   // guard.
//   if (!(isClass(constructor) || isES3Function(constructor))) {
//     throw new TypeError('A built-in constructor function is not a custom constructor.');
//   }
//   // guard.
//   if (!isString(taggedType)) {
//     throw new TypeError('The provided "taggedType" parameter must be a string type.');
//   }
//   const {
//     get: getTaggedType,
//     enumerable,
//     writable,
//     configurable
//   } = getOwnPropertyDescriptor(constructor.prototype, Symbol.toStringTag) ?? {};
//
//   return (
//     isFunction(getTaggedType) &&
//     getTaggedType() === String(taggedType) &&
//     enumerable === false &&
//     writable !== true &&
//     configurable === true
//   );
// }
//
// // ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
