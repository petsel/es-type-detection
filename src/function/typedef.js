// @ts-check

export {};

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

// - Though the below definition of a generic `SubclassOf` is correct,
//   it does not fit into this project's setup with its combination
//   of Vanilla JS + typedoc + ts-check.
//
// /**
//  * \@template T, B
//  * \@typedef {ClassConstructor<T> & { prototype: B }} SubclassOf
//  *
//  * Represents a subclass of `B`, instantiating a type `T`.
//  */

/**
 * @template {new (...args: any[]) => any} TBase
 * @typedef {new (...args: any[]) => InstanceType<TBase>} SubclassedConstructor
 *
 * A class constructor that produces an instance compatible with
 * a given base constructor. Used to approximate a subclass.
 *
 * Valid use cases, for example are ...
 *
 * /** \@type {SubclassedConstructor<typeof Error>} *\/
 * class MyCustomError extends Error {}
 *
 * /**
 *  \@param {SubclassedConstructor<typeof Error>} instance
 *  \/
 * function handleErrorInstance(instance) {
 *   console.log(instance.message);
 * }
 */

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

/**
 * @template T
 * @typedef { ClassConstructor<Function> & {
 *   __brand: 'SubclassedFunctionConstructor',
 *   __constructor: SubclassedConstructor<typeof Function>,
 *   __produces: T
 * }} SubclassedFunctionConstructor
 *
 * A branded subclass constructor that extends the built-in `Function` class.
 * Used to represent classes like `class SubclassedFunction extends Function {}`.
 *
 * One could consider following use case ...
 *
 * class CustomFunction extends Function {
 *   /**
 *    \@param {...any} args
 *    A variadic argument list.
 *    \/
 *   constructor(...args) {
 *     super(...args);
 *     this.custom = true;
 *   }
 * }
 *
 * // constructor function branding
 *
 * /** \@type {SubclassedFunctionConstructor<CustomFunction>} *\/
 * const CustomFunctionConstructor = CustomFunction;
 */

/**
 * @template T
 * @typedef {Function & {
 *   __brand: 'FunctionSubtype',
 *   __constructor: SubclassedFunctionConstructor<T>
 * }} FunctionSubtype
 *
 * A branded structural type for subclass instances where
 * the subclass explicitly extends `Function`.
 *
 * A valid use case for example is ...
 *
 * class CustomFunction extends Function {
 *   /**
 *    \@param {...any} args
 *    A variadic argument list.
 *    \/
 *   constructor(...args) {
 *     super(...args);
 *     this.custom = true;
 *   }
 * }
 *
 * // constructor function branding
 *
 * /** \@type {SubclassedFunctionConstructor<CustomFunction>} *\/
 * const CustomFunctionConstructor = CustomFunction;
 *
 * /** \@type {FunctionSubtype<CustomFunction>} *\/
 * const customFctType = new CustomFunctionConstructor('a=1', 'b=1', 'return a + b');
 */

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
