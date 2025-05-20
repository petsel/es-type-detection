// @ts-check

export {};

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * @typedef {Object & {
 *   constructor: Function,
 *   __brand: 'AnyObject',
 * }} AnyObject
 *
 * Any non-null object value - including:
 * - Plain objects (e.g. `{}`, `new Object()`)
 * - Instances of built-in types (e.g. `Array`, `RegExp`, `Date`, `Map`, etc.)
 * - Instances of custom classes or constructor functions
 *
 * The `null` value is explicitly excluded, even though `typeof null === 'object'`.
 * The `constructor` refers to the actual constructor function that created the object.
 */

/**
 * @typedef {Object & {
 *   constructor: Object,
 *   __brand: 'PlainObject',
 * }} PlainObject
 *
 * A plain, prototype-bearing object - created via:
 * - Object literals: `{}`
 * - `new Object()`
 * - `Object.create(Object.prototype)` or equivalent
 *
 * Excludes prototype-less objects created via `Object.create(null)`,
 * which are covered by the `DictionaryObject` type.
 */

/**
 * @typedef {{
 *   [key: string | symbol]: unknown
 * } & {
 *   constructor: undefined,
 *   prototype: null,
 *   __brand: 'DictionaryObject',
 * }} DictionaryObject
 *
 * A prototype-less object - created via `Object.create(null)`.
 *
 * This kind of object has:
 * - No prototype chain (`Object.getPrototypeOf(obj) === null`)
 * - No inherited members or default `Object.prototype` behavior
 *
 * Ideal for use as a pure dictionary/hashmap, avoiding key collisions with inherited properties.
 */

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * @typedef {string & { __brand: 'StringValue' }} StringValue
 *  A primitive string value.
 */

/**
 * @typedef {String & { __brand: 'BoxedString' }} BoxedString
 *  A boxed `String` object type, e.g., `new String('string')` or `Object('string')` .
 */

/**
 * @typedef {StringValue | BoxedString} StringType
 *  Either a primitive string value or a boxed `String` object type.
 */

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * @typedef {number & { __brand: 'NumberValue' }} NumberValue
 *  A primitive number value.
 */

/**
 * @typedef {Number & { __brand: 'BoxedNumber' }} BoxedNumber
 *  A boxed `Number` object type, e.g., `new Number(9_876)` or `Object(9_876)`.
 */

/**
 * @typedef {NumberValue | BoxedNumber} NumberType
 *  Either a primitive number value or a boxed `Number` object type.
 */

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * @typedef {boolean & { __brand: 'BooleanValue' }} BooleanValue
 *  A primitive boolean value (either `true` or `false`).
 */

/**
 * @typedef {Boolean & { __brand: 'BoxedBoolean' }} BoxedBoolean
 *  A boxed `Boolean` object type, e.g., `new Boolean(true)` or `Object(false)`.
 */

/**
 * @typedef {BooleanValue | BoxedBoolean} BooleanType
 *  Either a primitive boolean value or a boxed `Boolean` object type.
 */

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * @typedef {symbol & { __brand: 'SymbolValue' }} SymbolValue
 *  A primitive symbol value.
 */

/**
 * @typedef {Symbol & { __brand: 'BoxedSymbol' }} BoxedSymbol
 *  A purposely boxed `Symbol` object type, e.g., created via `Object(Symbol('key'))`.
 *  This works perfectly fine when used as an object's symbol-key.
 *
 *  Consider the following example:
 *
 *  ```
 *  const mySymbolKey = Symbol('key');
 *  const symbolObject = Object(mySymbolKey);
 *
 *  console.log('(mySymbolKey === symbolObject) ...', (mySymbolKey === symbolObject));  // false
 *  console.log('(mySymbolKey == symbolObject) ...', (mySymbolKey == symbolObject));    // true
 *
 *  const myObject = { foo: 'Foo' };
 *  myObject[mySymbolKey] = 'value set by `mySymbolKey`.';
 *  //       ^^^^^^^^^^^
 *
 *  console.log({ myObject }); // { "myObject": { "foo": "Foo", Symbol(key): "value set by `mySymbolKey`." } }
 *  console.log('myObject[symbolObject] ...', myObject[symbolObject]); // 'value set by `mySymbolKey`.'
 *  //           ---------^^^^^^^^^^^^        ---------^^^^^^^^^^^^
 *
 *  myObject[symbolObject] = 'value overwritten by `symbolObject`.';
 *  //       ^^^^^^^^^^^^
 *
 *  console.log({ myObject }); // { "myObject": { "foo": "Foo", Symbol(key): "value overwritten by `symbolObject`." } }
 *  console.log('myObject[mySymbolKey] ...', myObject[mySymbolKey]); // 'value overwritten by `symbolObject`.'
 *  //           ---------^^^^^^^^^^^        ---------^^^^^^^^^^^
 *  ```
 *
 *  This demonstrates that, although the primitive symbol and its boxed object
 *  are not strictly equal (`===`), their loose equality (`==`) is enough for
 *  them to act as interchangeable property keys.
 */

/**
 * @typedef {SymbolValue | BoxedSymbol} SymbolType
 *  Either a primitive symbol value or a purposely boxed `Symbol` object type.
 */

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * @typedef {bigint & { __brand: 'BigIntValue' }} BigIntValue
 *  A primitive bigint value.
 */

/**
 * @typedef {BigInt & { __brand: 'BoxedBigInt' }} BoxedBigInt
 *  A purposely boxed `BigInt` object type, e.g., created via
 *  `Object(BigInt(1_000_000_000))` or `Object(1_000_000_000n)`.
 *
 *  Boxed `BigInt` objects can participate in arithmetic operations
 *  just like primitive bigint values. Consider the following example:
 *
 *  ```
 *  const bigintValue_1 = 1_000_000_000n;
 *  const bigintValue_2 = 2_000_000_000n;
 *
 *  const bigintObject_1 = Object(bigintValue_1);
 *  const bigintObject_2 = Object(bigintValue_2);
 *
 *  const bigintResult_A = bigintValue_1 + bigintObject_2;
 *  const bigintResult_B = bigintObject_2 + bigintObject_2;
 *
 *  console.log('(typeof bigintValue_1) ...', (typeof bigintValue_1)); // 'bigint'
 *  console.log('(typeof bigintValue_2) ...', (typeof bigintValue_2)); // 'bigint'
 *
 *  console.log('(typeof bigintObject_1) ...', (typeof bigintObject_1)); // 'object'
 *  console.log('(typeof bigintObject_2) ...', (typeof bigintObject_2)); // 'object'
 *
 *  console.log('(bigintValue_1 === bigintObject_1) ...', (bigintValue_1 === bigintObject_1));  // false
 *  console.log('(bigintValue_1 == bigintObject_1) ...', (bigintValue_1 == bigintObject_1));    // true
 *
 *  console.log('(Object(bigintValue_1) === Object(bigintValue_1)) ...', (Object(bigintValue_1) === Object(bigintValue_1)));  // false
 *  console.log('(Object(bigintValue_1) == Object(bigintValue_1)) ...', (Object(bigintValue_1) == Object(bigintValue_1)));    // false
 *
 *  console.log('(typeof bigintResult_A) ...', (typeof bigintResult_A)); // 'bigint'
 *  console.log({ bigintResult_A }); // { bigintResult_A: 3000000000n }
 *
 *  console.log('(typeof bigintResult_B) ...', (typeof bigintResult_B)); // 'bigint'
 *  console.log({ bigintResult_B }); // { bigintResult_B: 4000000000n }
 *  ```
 *
 *  This demonstrates that the internal type of any bigint operand
 *  (primitive or boxed) does not affect arithmetic operations.
 *  Both boxed and primitive values can be used interchangeably in math.
 */

/**
 * @typedef {BigIntValue | BoxedBigInt} BigIntType
 *  Either a primitive bigint value or a purposely boxed `BigInt` object type.
 */

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
