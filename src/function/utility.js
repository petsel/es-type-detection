// @ts-check

import { getOwnPropertyDescriptor } from '../utility';
import { isFunction } from '../base';

// import { isAnyGeneratorFunction } from './index';

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * Detects whether a passed value features an own `prototype` property.
 * @param {Function} value
 *  Assumes a function type but does not check for it.
 * @returns {boolean}
 *  Whether the passed type features an own `prototype` property.
 * @category Function Type Detection Helper
 */
export function hasOwnPrototype(value) {
  return !!getOwnPropertyDescriptor(value, 'prototype');
}

/**
 * Detects whether a passed value features an own, truly `writable`
 * `prototype` property.
 * @param {Function} value
 *  Assumes a function type but does not check for it.
 * @returns {boolean}
 *  Whether the passed type features an own, truly `writable`
 *  `prototype` property.
 * @category Function Type Detection Helper
 */
export function hasOwnWritablePrototype(value) {
  return getOwnPropertyDescriptor(value, 'prototype')?.writable === true;
}

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * Checks whether a passed `value` is possibly constructable.
 *
 * It does so by just probing the passed value's `[[construct]]`
 * slot; it does never invoke the passed value itself.
 *
 * The `construct` proxy handler is allowed to overwrite the
 * `[[construct]]` slot of a proxied value, but it cannot turn
 * something non constructable into a constructable type.
 *
 * - see ... [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/construct]
 * > "The `handler.construct` method is a trap for the `[[Construct]]`
 * > object internal method, which is used by operations such as the
 * > `new` operator. In order for the `new` operation to be valid on
 * > the resulting `Proxy` object, the `target` used to initialize
 * > the proxy must itself be a valid constructor."
 * @param {any} value
 * @returns {boolean}
 *  A boolean value which indicates whether the tested
 *  type could possibly serve as constructor function.
 * @category Function Type Detection Helper
 */
export function hasConstructSlot(value) {
  let canConstruct = false;
  try {
    // eslint-disable-next-line no-new
    new new Proxy(value, { construct: () => ({}) })();
    canConstruct = true;
  } catch (err) {
    /* empty */
  }
  return canConstruct;
}

/**
 * Detects whether the passed `value` is a constructable function type.
 *
 * It does so by verifying whether a function has an own `prototype`, and in
 * case it does, by additionally just probing the `[[construct]]` slot of the
 * passed possibly constructable type; it does never invoke the passed type.
 *
 * The `construct` proxy handler is allowed to overwrite the
 * `[[construct]]` slot of a proxied value, but it cannot turn
 * something non constructable into a constructable type.
 *
 * - see ... [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/construct]
 * > "The `handler.construct` method is a trap for the `[[Construct]]`
 * > object internal method, which is used by operations such as the
 * > `new` operator. In order for the `new` operation to be valid on
 * > the resulting `Proxy` object, the `target` used to initialize
 * > the proxy must itself be a valid constructor."
 * @param {any} value
 * @returns {boolean}
 *  A boolean value which indicates whether the
 *  tested type can serve as constructor function.
 * @category Function Type Detection Helper
 */
export function isConstructable(value) {
  return isFunction(value) && hasOwnPrototype(value) && hasConstructSlot(value);
  // return isFunction(value) && hasConstructSlot(value);
}

// /**
//  * Detects whether the passed `value` is a constructable
//  * function type.
//  *
//  * It does so by testing the `[[construct]]` slot of the
//  * passed possibly constructable type, but it does not
//  * invoke it.
//  *
//  * The `construct` proxy handler is allowed to overwrite
//  * the `[[construct]]` slot of a proxied value, but
//  * it cannot turn something non constructable into
//  * a constructable type.
//  *
//  *  - see ... [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/construct]
//  *     > "The `handler.construct` method is a trap for the `[[Construct]]`
//  *     > object internal method, which is used by operations such as the
//  *     > `new` operator. In order for the `new` operation to be valid on
//  *     > the resulting `Proxy` object, the `target` used to initialize
//  *     > the proxy must itself be a valid constructor."
//  *
//  *  - Thus, it is feasible enough to let the construct trap
//  *    return an object instance.
//  *
//  * **Note:**
//  *
//  * The [[construct]] slot of either generator function type,
//  * async or not, indicates that generator functions are not
//  * constructable, despite each returning a valid instance of
//  * its type when being invoked with just the call/`()` operator.
//  *
//  * Therefore this implementation of an introspective `isConstructable`
//  * functionality recognizes generator functions as _**constructable**_.
//  *
//  * This method is recommended and **safe**.
//  *
//  * @param value{any}
//  * @returns {boolean}
//  *  A boolean value which indicates whether the
//  *  tested type can serve as a constructor function.
//  * @category Function Type Detection Helper
//  */
// export function isConstructable(value) {
//   return (
//     isAnyGeneratorFunction(value) || (isFunction(value) && hasConstructSlot(value))
//   );
// }
