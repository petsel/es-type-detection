// @ts-check

export {};

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * @typedef {Error & {
 *   __brand: 'AnyError',
 *   __constructor: Function
 * }} AnyError
 *
 * Any error instance - including:
 * - The base `Error` type (`new Error()`)
 * - Built-in subclasses (e.g. `SyntaxError`, `TypeError`, `RangeError`, etc.)
 * - Custom error types that extend the `Error` class
 *
 * The `__constructor` refers to the actual constructor function (e.g. `Error`, `SyntaxError`, or a custom class).
 */

/**
 * @typedef {Error & {
 *   __brand: 'PlainError',
 *   __constructor: Error
 * }} PlainError
 *
 * A plain `Error` instance - created exclusively via the base `Error` constructor:
 * - `new Error()`
 *
 * Excludes subclass instances like `TypeError`, `SyntaxError`, or custom errors.
 * The `__constructor` is strictly the built-in `Error` function.
 */

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
