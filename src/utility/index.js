// @ts-check

/**
 * Returns the type signature of the first argument, if it was passed.
 *
 * @param {...any} args - Variadic rest arguments array. The first argument (`args[0]`)
 *   is the optional `value` parameter. Its **presence** is determined via `args.length`
 *   in order to distinguish between an intentionally passed `undefined` value and a
 *   completely omitted argument.
 * @returns {string | undefined} - Returns the value’s internal type signature (e.g.,
 *   `'[object Array]'` for an `Array` instance), or `undefined` if the parameter was omitted.
 */
export function exposeTypeSignature(...args) {
  /** @type {any} */
  const value = args.at(0);

  return (args.length >= 1 && Object.prototype.toString.call(value)) || value;
}

/**
 * @param {*} [value]
 *  An optionally passed value of any type.
 * @returns {string}
 *  The passed value's built-in or custom tag-name which for custom types might have and
 *  for spoofed objects like e.g. ...
 *
 *      const myObj = { foo: 'bar' }
 *      myObj[Symbol.toStringTag] = 'FooBar';
 *
 *      console.log(myObj+'');                              // '[object FooBar]'
 *      console.log(String(myObj));                         // '[object FooBar]'
 *      console.log(myObj.toString());                      // '[object FooBar]'
 *      console.log(Object.prototype.toString.call(myObj)); // '[object FooBar]'
 *
 *  ... definitely has been provided via the `Symbol.toStringTag` static data property.
 *
 *  The tag-name of the built-in `Array` type for instance is `'Array'`.
 */
export function getSignatureTag(value) {
  return exposeTypeSignature(value).slice(8, -1);
  // return /\[object\s+([^\]]+)\]/.exec(exposeTypeSignature(value))?.at(1);
}

/**
 * @param {*} [value]
 *  An optionally passed value of any type.
 * @returns {FunctionConstructor}
 *  The passed value's constructor-function, either an
 *  ES3-function or an ES6-class constructor-function.
 */
export function getConstructor(value) {
  return Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(value),
    'constructor'
  ).value;
}

/**
 * @param {*} [value]
 *  An optionally passed value of any type.
 * @returns {string}
 *  The passed value's constructor-function name,
 *  retrieved from all linked property-descriptors.
 */
export function getConstructorName(value) {
  return Object.getOwnPropertyDescriptor(getConstructor(value), 'name').value;
  // return getConstructor(value).name;
}
