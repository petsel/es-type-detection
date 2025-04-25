// @ts-check

export {};

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/** @typedef {import('../flow/typedef.js').Generator} Generator */

/**
 * @typedef {Function & {
 *   prototype: Generator,
 *   __brand: 'GeneratorFunction',
 * }} GeneratorFunction
 *
 * The constructor/factory function for `Generator` instances, i.e.:
 * ```js
 * /** @type {GeneratorFunction} *\/
 * const generatorFunction = (function* () { yield 1; }).constructor;
 * ```
 * @property {'GeneratorFunction'} [Symbol.toStringTag]
 *  Defines the `Symbol.toStringTag` property as `"GeneratorFunction"`.
 */

/** @typedef {import('../flow/typedef.js').AsyncGenerator} AsyncGenerator */

/**
 * @typedef {Function & {
 *   prototype: AsyncGenerator,
 *   __brand: 'AsyncGeneratorFunction',
 * }} AsyncGeneratorFunction
 *
 * The constructor function for `AsyncGenerator` instances, i.e.:
 * ```js
 * /** @type {AsyncGeneratorFunction} *\/
 * const AsyncGeneratorCtor = (async function* () {}).constructor;
 * ```
 * @property {'AsyncGeneratorFunction'} [Symbol.toStringTag]
 *  Defines the `Symbol.toStringTag` property as `"AsyncGeneratorFunction"`.
 */

/**
 * @typedef {Function & {
 *   constructor: GeneratorFunction | AsyncGeneratorFunction,
 *   __brand: 'AnyGeneratorFunction',
 * }} AnyGeneratorFunction
 *
 * Any generator function - created as:
 *  - either `GeneratorFunction`
 *  - or `AsyncGeneratorFunction`
 */

/**
 * @typedef {Function & {
 *   prototype: undefined,
 *   __constructorName: 'AsyncFunction',
 *   __brand: 'AsyncFunction',
 * }} AsyncFunction
 *
 * An `AsyncFunction` type that misses its own `prototype` slot - created
 * either by an async arrow function expression or by either of both async
 * non-arrow function variants, an async function expression or an async
 * function statement.
 * @property {'AsyncFunction'} [Symbol.toStringTag]
 *  Defines the `Symbol.toStringTag` property as `"AsyncFunction"`.
 *
 * Within an TypeScript environment (hence `.ts` instead of `.js` files)
 * one can annotate `AsyncFunction` like that ...
 *
 * const AsyncFunctionConstructor = (async () => {}).constructor;
 * export type AsyncFunction = typeof AsyncFunctionConstructor;
 */

/**
 * @typedef {Function & {
 *   constructor: Function,
 *   prototype: undefined,
 *   __brand: 'NonAsyncArrow',
 * }} NonAsyncArrow
 *
 * A `Function` type that misses its own `prototype` slot - created
 * exclusively by an arrow function expression.
 */

/**
 * @typedef {Function & {
 *   prototype: undefined,
 *   __brand: 'AnyArrow',
 *   __constructorName: 'Function' | 'AsyncFunction',
 * }} AnyArrow
 *
 * Any variant of an arrow function expression - created as:
 *  - either `Function`
 *  - or `AsyncFunction`
 */

/**
 * @typedef {Function & {
 *   constructor: Function,
 *   prototype: undefined,
 *   __brand: 'ConciseGenericMethod',
 * }} ConciseGenericMethod
 *
 * A `Function` type that misses its own `prototype` slot. Thus, it does share
 * some of the characteristics of a `NonAsyncArrow` function type - but it gets
 * created exclusively by a non-async and non-generator shorthand method definition.
 * (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions#description).
 */

/**
 * @typedef {Function & {
 *   constructor: Function,
 *   prototype: { writable: true },
 *   __brand: 'ES3Function',
 * }} ES3Function
 *
 * The only available/known function type back at ES3.
 */

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * @template T
 * @typedef {new (...args: any[]) => T} ClassConstructor
 *
 * The above generic definition of a class based constructor function
 * represents any constructable class; or in other words - it represents
 * a `T` type specific class constructor.
 *
 * To be used later as e.g. follows ...
 *
 * /** \@type {ClassConstructor<User, [string, number]>} *\/
 * class User {
 *   constructor(name, age) {
 *     this.name = name;
 *     this.age = age;
 *   }
 * }
 */

// // - Though the below definition of a generic `SubclassOf` is correct,
// //   it does not fit into this project's setup with its combination
// //   of Vanilla JS + typedoc + ts-check.
// //
// // /**
// //  * \@template T, B
// //  * \@typedef {ClassConstructor<T> & { prototype: B }} SubclassOf
// //  *
// //  * Represents a subclass of `B`, instantiating a type `T`.
// //  */
//
// /**
//  * @template {new (...args: any[]) => any} TBase
//  * @typedef {new (...args: any[]) => InstanceType<TBase>} SubclassedConstructor
//  *
//  * A class constructor that produces an instance compatible with
//  * a given base constructor. Used to approximate a subclass.
//  *
//  * Valid use cases, for example are ...
//  *
//  * /** \@type {SubclassedConstructor<typeof Error>} *\/
//  * class MyCustomError extends Error {}
//  *
//  * /**
//  *  \@param {SubclassedConstructor<typeof Error>} instance
//  *  \/
//  * function handleErrorInstance(instance) {
//  *   console.log(instance.message);
//  * }
//  */
//
// // ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
//
// /**
//  * @template T
//  * @typedef { ClassConstructor<Function> & {
//  *   constructor: SubclassedConstructor<typeof Function>,
//  *   __produces: T,
//  *   __brand: 'SubclassedFunctionConstructor',
//  * }} SubclassedFunctionConstructor
//  *
//  * A branded subclass constructor that extends the built-in `Function` class.
//  * Used to represent classes like `class SubclassedFunction extends Function {}`.
//  *
//  * One could consider following use case ...
//  *
//  * class CustomFunction extends Function {
//  *   /**
//  *    \@param {...any} args
//  *    A variadic argument list.
//  *    \/
//  *   constructor(...args) {
//  *     super(...args);
//  *     this.custom = true;
//  *   }
//  * }
//  *
//  * // constructor function branding
//  *
//  * /** \@type {SubclassedFunctionConstructor<CustomFunction>} *\/
//  * const CustomFunctionConstructor = CustomFunction;
//  */
//
// /**
//  * @template T
//  * @typedef {Function & {
//  *   constructor: SubclassedFunctionConstructor<T>,
//  *   __brand: 'FunctionSubtype',
//  * }} FunctionSubtype
//  *
//  * A branded structural type for subclass instances where
//  * the subclass explicitly extends `Function`.
//  *
//  * A valid use case for example is ...
//  *
//  * class CustomFunction extends Function {
//  *   /**
//  *    \@param {...any} args
//  *    A variadic argument list.
//  *    \/
//  *   constructor(...args) {
//  *     super(...args);
//  *     this.custom = true;
//  *   }
//  * }
//  *
//  * // constructor function branding
//  *
//  * /** \@type {SubclassedFunctionConstructor<CustomFunction>} *\/
//  * const CustomFunctionConstructor = CustomFunction;
//  *
//  * /** \@type {FunctionSubtype<CustomFunction>} *\/
//  * const customFctType = new CustomFunctionConstructor('a=1', 'b=1', 'return a + b');
//  */
//
// // ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * @typedef {Function & {
 *   name: '',
 *   __brand: 'UnnamedFunction',
 * }} UnnamedFunction
 *
 * A branded type representing any function whose `name` value
 * is explicitly the empty string (`''`). Often anonymous or
 * dynamically created.
 */

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----
