import { describe, it, expect } from 'vitest';

import { hasStableTypeIdentity } from '../../src/type-identity';

import {
  asyncGeneratorFunctionExpression,
  // AsyncGeneratorFunction,
  asyncGeneratorInstance,
  asyncGeneratorPrototype,
  generatorFunctionExpression,
  // GeneratorFunction,
  generatorInstance,
  generatorPrototype,
  asyncArrowFunctionExpression,
  asyncNonArrowFunctionExpression,
  // AsyncFunction,
  conciseGenericMethod,
  spoofedArrowFunction
  // MyClass,
  // MySubclass,
  // TaggedClass,
  // ImplicitlyTaggedSubclass,
  // ExplicitlyTaggedSubclass
} from '../utility/__config';

export class MyClass {}
export class MySubclass extends MyClass {}

export class TaggedClass {
  get [Symbol.toStringTag]() {
    return 'TaggedClass';
  }
}
export class ImplicitlyTaggedSubclass extends TaggedClass {}

export class ExplicitlyTaggedSubclass extends TaggedClass {
  get [Symbol.toStringTag]() {
    return 'ExplicitlyTaggedSubclass';
  }
}

function runTestCases(label, cases) {
  describe(label, () => {
    for (const [input, display, expected] of cases) {
      // console.log({ input, expected, display, label });
      it(`returns ${(expected === true && '✅') || '❌'} \`${expected}\` for \`${display}\``, () => {
        expect(
          hasStableTypeIdentity(input),
          `failed at input \`${input?.toString?.()}\` :: did expect \`${expected}\` :: with display \`${display}\``
        ).toStrictEqual(expected);
      });
    }
  });
}

describe(
  '`hasStableTypeIdentity` - does approve whether the passed value features a stable type-identity,' +
    " which is ... either the value comes with the built-in type-identity of one of the core language's" +
    ' types, or the value has been processed via `defineStableTypeIdentity`, or it features' +
    ' property-descriptors which are in line with the result of the latter process.',
  () => {
    it('returns ❌ `false` when no argument is passed.', () => {
      expect(hasStableTypeIdentity()).toStrictEqual(false);
    });

    it('returns ✅ `true` when the `undefined` value is passed explicitly.', () => {
      expect(hasStableTypeIdentity(undefined)).toStrictEqual(true);
      expect(hasStableTypeIdentity(void 0)).toStrictEqual(true);
    });

    it('returns ✅ `true` when the `null` value is passed explicitly.', () => {
      expect(hasStableTypeIdentity(null)).toStrictEqual(true);
    });

    it('returns ✅ `true` for an object that was created via `Object.create(null)`.', () => {
      expect(hasStableTypeIdentity(Object.create(null))).toStrictEqual(true);
    });

    runTestCases('🧱 Primitives & Boxed Primitives', [
      [true, 'true', true],
      [1_234_567, '1_234_567', true],
      ['string', "'string'", true],

      [BigInt(0), 'BigInt(0)', true],
      [Symbol('sym'), "Symbol('sym')", true],

      [new Boolean(true), 'new Boolean(true)', true],
      [new Number(1_234_567), 'new Number(1_234_567)', true],
      [new String('string'), "new String('string')", true],

      [Object(new Boolean(true)), 'Object(new Boolean(true))', true],
      [Object(new Number(1_234_567)), 'Object(new Number(1_234_567))', true],
      [Object(new String('string')), "Object(new String('string'))", true],

      [Object(BigInt(0)), 'Object(BigInt(0))', true],
      [Object(Symbol('sym')), "Object(Symbol('sym'))", true]
    ]);

    runTestCases('⚙️ Built-ins - objects/instances and their constructors', [
      // all objects - instances of built-in constructor functions.

      [new Date(), 'new Date', true],
      [/regex/, '/regex/', true],

      [[], '[]', true],
      [{}, '{}', true],

      [new Map(), 'new Map', true],
      [new Set(), 'new Set', true],
      [new WeakMap(), 'new WeakMap', true],
      [new WeakSet(), 'new WeakSet', true],

      [new Int8Array(0), 'new Int8Array(0)', true],
      [new Uint8Array(0), 'new Uint8Array(0)', true],
      [new Float32Array(0), 'new Float32Array(0)', true],
      [new ArrayBuffer(0), 'new ArrayBuffer(0)', true],

      [new Error(), 'new Error', true],
      [new SyntaxError(), 'new SyntaxError', true],
      [new TypeError(), 'new TypeError', true],
      [new ReferenceError(), 'new ReferenceError', true],
      [new URIError(), 'new URIError', true],
      [new EvalError(), 'new EvalError', true],
      [new RangeError(), 'new RangeError', true],
      [new AggregateError([]), 'new AggregateError([])', true],

      // all objects - utility/api namespaces.

      // - Since all four test candidates are just tagged namespaces, hence objects, each object's
      //   constructor of cause is `Object` and not some function which by its name related to each
      //   object's/namespace's name like `Math`, `JSON`, `Reflect`, `Atomics`.
      [Math, 'Math', true],
      [JSON, 'JSON', true],
      [Reflect, 'Reflect', true],
      [Atomics, 'Atomics', true],

      // promise.

      [Promise.resolve(), 'Promise.resolve()', true],
      [asyncArrowFunctionExpression(), '(async (_) => _)()', true],
      [asyncNonArrowFunctionExpression(), '(async function () {})()', true],

      // built-in constructor-functions.

      [Boolean, 'Boolean', true],
      [Number, 'Number', true],
      [String, 'String', true],
      [BigInt, 'BigInt', true],
      [Symbol, 'Symbol', true],

      [Date, 'Date', true],
      [RegExp, 'RegExp', true],

      [Array, 'Array', true],
      [Object, 'Object', true],

      [Map, 'Map', true],
      [Set, 'Set', true],
      [WeakMap, 'WeakMap', true],
      [WeakSet, 'WeakSet', true],

      [Int8Array, 'Int8Array', true],
      [Uint8Array, 'Uint8Array', true],
      [Float32Array, 'Float32Array', true],
      [ArrayBuffer, 'ArrayBuffer', true],

      [Error, 'Error', true],
      [SyntaxError, 'SyntaxError', true],
      [TypeError, 'TypeError', true],
      [ReferenceError, 'ReferenceError', true],
      [URIError, 'URIError', true],
      [EvalError, 'EvalError', true],
      [RangeError, 'RangeError', true],
      [AggregateError, 'AggregateError', true],

      [Promise, 'Promise', true],

      // generators / generator-functions - special constructor-function handling.

      // - `AsyncGeneratorFunction` instead of `AsyncGenerator` since the latter
      //   - despite being the intuitively expected correct result - is an object
      //   (and a prototype) but not a constructor function like the former.
      [
        asyncGeneratorInstance, // an async generator.
        '(async function* () { yield 1; })()',
        true
      ],
      [
        asyncGeneratorPrototype, // an async generator.
        'Object.getPrototypeOf((async function* () { yield 1; })())',
        true
      ],

      // - `GeneratorFunction` instead of `Generator` since the latter - despite
      //   being the intuitively expected correct result - is an object (and a
      //   prototype) but not a constructor function like the former.
      [generatorInstance, '(function* () { yield 1; })()', true],
      [generatorPrototype, 'Object.getPrototypeOf((function* () { yield 1; })())', true]
    ]);

    runTestCases('🔧 Functions - other than Built-in and Class constructors', [
      [function () {}, 'function () {}', true],
      [(_) => _, '(_) => _', true],
      [conciseGenericMethod, '({ concise(...args) { return args; }}).concise', true],
      [spoofedArrowFunction, 'Object.assign(() => {}, { prototype: {} })', true],
      [asyncArrowFunctionExpression, 'async (_) => _', true],
      [asyncNonArrowFunctionExpression, '(async function () {})', true],
      [asyncGeneratorFunctionExpression, '(async function* () { yield 1; })', true],
      [generatorFunctionExpression, '(function* () { yield 1; })', true],

      [function () {}.constructor, '(function () {}).constructor', true],
      [((_) => _).constructor, '((_) => _).constructor', true],
      [conciseGenericMethod.constructor, '({ concise(...args) { return args; }}).concise', true],
      [
        spoofedArrowFunction.constructor,
        'Object.assign(() => {}, { prototype: {} }).constructor',
        true
      ],
      [asyncArrowFunctionExpression.constructor, '(async (_) => _).constructor', true],
      [asyncNonArrowFunctionExpression.constructor, '(async function () {}).constructor', true],
      [
        asyncGeneratorFunctionExpression.constructor,
        '(async function* () { yield 1; }).constructor',
        true
      ],
      [generatorFunctionExpression.constructor, '(function* () { yield 1; }).constructor', true],

      [Function.prototype, 'Function.prototype', true]
    ]);

    runTestCases('🏛️ Classes & Subclasses and their instances', [
      [MyClass, 'class MyClass {}', true],
      [new MyClass(), 'new MyClass', false],

      [MySubclass, 'class MySubclass extends MyClass {}', true],
      [new MySubclass(), 'new MySubclass', false]
    ]);

    runTestCases('🧪 Special & `Symbol.toStringTag` spoofed/tagged objects', [
      [
        (function () {
          return arguments;
        })(),
        '(function () { return arguments; })()',
        true
      ],
      [{ [Symbol.toStringTag]: 'Array' }, "{ [Symbol.toStringTag]: 'Array' }", false],
      [{ [Symbol.toStringTag]: 'CustomTag' }, "{ [Symbol.toStringTag]: '' }", false],
      [new TaggedClass(), 'new TaggedClass', false],
      [new ImplicitlyTaggedSubclass(), 'new ImplicitlyTaggedSubclass', false],
      [new ExplicitlyTaggedSubclass(), 'new ExplicitlyTaggedSubclass', false]
    ]);
  }
);
