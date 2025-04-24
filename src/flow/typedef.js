// @ts-check

export {};

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * @template T
 * @typedef {object & {
 *   value: T,
 *   done: boolean,
 *   __brand: 'IteratorResult',
 * }} IteratorResult
 *
 * A value yielded by a `Generator` or `AsyncGenerator`.
 * Represents the result of a generator step.
 * - `value`: The current iteration value, yielded/resolved as value of type `T`.
 * - `done`: Whether the iterator/iteration is complete.
 */

/** @typedef {import('../function/typedef.js').GeneratorFunction} GeneratorFunction */

/**
 * @typedef {object & {
 *   constructor: GeneratorFunction,
 *   next: (value?: any) => IteratorResult<any>,
 *   return?: (value?: any) => IteratorResult<any>,
 *   throw?: (error?: any) => IteratorResult<any>,
 *   [Symbol.toStringTag]: 'Generator',
 *   __brand: 'Generator',
 * }} Generator
 *
 * A generator type created e.g. as:
 * ```js
 * /** @type {Generator} *\/
 * const generatorType = (function* () { yield 1; })();
 * ```
 */

/** @typedef {import('../function/typedef.js').AsyncGeneratorFunction} AsyncGeneratorFunction */

/**
 * @typedef {object & {
 *   constructor: AsyncGeneratorFunction,
 *   next: (value?: any) => Promise<IteratorResult<any>>,
 *   return?: (value?: any) => Promise<IteratorResult<any>>,
 *   throw?: (error?: any) => Promise<IteratorResult<any>>,
 *   [Symbol.toStringTag]: 'AsyncGenerator',
 *   __brand: 'AsyncGenerator',
 * }} AsyncGenerator
 *
 * An async generator type created e.g. as:
 * ```js
 * /** @type {AsyncGenerator} *\/
 * const asyncGeneratorType = (async function* () {
 *   yield await Promise.resolve(1);
 * })();
 * ```
 */

/**
 * @typedef {Generator | AsyncGenerator & {
 *   constructor: Generator | AsyncGenerator,
 *   __brand: 'AnyGenerator',
 * }} AnyGenerator
 */

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * @typedef {object | Function & {
 *   then: (onFulfilled?: Function, onRejected?: Function) => any,
 *   __brand: 'Thenable',
 * }} Thenable
 */

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
