// @ts-check

export {};

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * @typedef {Function & {
 *   __brand: 'AnyGenerator',
 *   __constructor: GeneratorFunction | AsyncGeneratorFunction,
 * }} AnyGenerator
 *
 * Any generator function - created as:
 *  - either `GeneratorFunction`
 *  - or `AsyncGeneratorFunction`
 */

/**
 * @typedef {Function & {
 *   __brand: 'AsyncFunctionType',
 *   __constructorName: 'AsyncFunction',
 *   __prototype: undefined,
 * }} AsyncFunctionType
 *
 * An `AsyncFunction` type that misses its own `prototype` slot - created
 * either by an async arrow function expression or by either of both async,
 * non-arrow function variants, an async function expression or an async
 * function statement.
 */

/**
 * @typedef {Function & {
 *   __brand: 'NonAsyncArrow',
 *   __constructor: Function,
 *   __prototype: undefined,
 * }} NonAsyncArrow
 *
 * A `Function` type that misses its own `prototype` slot - created
 * exclusively by an arrow function expression.
 */

/**
 * @typedef {Function & {
 *   __brand: 'AnyArrow',
 *   __constructorName: 'Function' | 'AsyncFunction',
 *   __prototype: undefined,
 * }} AnyArrow
 *
 * Any variant of an arrow function expression - created as:
 *  - either `Function`
 *  - or `AsyncFunction`
 */

/**
 * @typedef {Function & {
 *   __brand: 'ES3Function',
 *   __constructor: Function,
 *   __prototype: { writable: true },
 * }} ES3Function
 *
 * The only available/known function type back at ES3.
 */

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * A runtime class which extends `Function`.
 * @class
 * @extends {Function}
 */
class ExtendedFunction extends Function {
  /**
   * @param {...any} args
   *  A variadic argument list.
   */
  constructor(...args) {
    super(...args);
  }
}

/**
 * @typedef {Function & {
 *   __brand: 'FunctionSubtype',
 *   __constructor: ExtendedFunction
 * }} FunctionSubtype
 *
 * A branded structural type for instances of a function
 * created via a custom `Function` subclass.
 */

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * @typedef {Function & {
 *   __brand: 'UnnamedFunction',
 *   __name: ''
 * }} UnnamedFunction
 *
 * A branded type representing any function whose `name` value
 * is explicitly the empty string (`''`). Often anonymous or
 * dynamically created.
 */

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
