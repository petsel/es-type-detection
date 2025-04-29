import { describe, it, expect } from 'vitest';

import { hasCustomTypeIdentity } from '../../src/utility';

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
  spoofedArrowFunction,
  MyClass,
  MySubclass,
  TaggedClass,
  ImplicitlyTaggedSubclass,
  ExplicitlyTaggedSubclass
} from './__config';

function runTestCases(label, cases) {
  describe(label, () => {
    for (const [input, display, expected] of cases) {
      // console.log({ input, expected, display, label });
      it(`returns ${(expected === true && '✅') || '❌'} \`${expected}\` for \`${display}\``, () => {
        expect(
          hasCustomTypeIdentity(input),
          `failed at input \`${input?.toString?.()}\` :: did expect \`${expected}\` :: with display \`${display}\``
        ).toStrictEqual(expected);
      });
    }
  });
}

describe('`hasCustomTypeIdentity` - returns a string value similar to `getTaggedTyped` and `getConstructorName` by balancing the approaches of both methods.', () => {
  it('returns ❌ `false` when no argument is passed.', () => {
    expect(hasCustomTypeIdentity()).toStrictEqual(false);
  });

  it('returns ❌ `false` when the `undefined` value is passed explicitly.', () => {
    expect(hasCustomTypeIdentity(undefined)).toStrictEqual(false);
    expect(hasCustomTypeIdentity(void 0)).toStrictEqual(false);
  });

  it('returns ❌ `false` when the `null` value is passed explicitly.', () => {
    expect(hasCustomTypeIdentity(null)).toStrictEqual(false);
  });

  it('returns ❌ `false` for an object that was created via `Object.create(null)`.', () => {
    expect(hasCustomTypeIdentity(Object.create(null))).toStrictEqual(false);
  });

  runTestCases('🧱 Primitives & Boxed Primitives', [
    [true, 'true', false],
    [1_234_567, '1_234_567', false],
    ['string', "'string'", false],

    [BigInt(0), 'BigInt(0)', false],
    [Symbol('sym'), "Symbol('sym')", false],

    [new Boolean(true), 'new Boolean(true)', false],
    [new Number(1_234_567), 'new Number(1_234_567)', false],
    [new String('string'), "new String('string')", false],

    [Object(new Boolean(true)), 'Object(new Boolean(true))', false],
    [Object(new Number(1_234_567)), 'Object(new Number(1_234_567))', false],
    [Object(new String('string')), "Object(new String('string'))", false],

    [Object(BigInt(0)), 'Object(BigInt(0))', false],
    [Object(Symbol('sym')), "Object(Symbol('sym'))", false]
  ]);

  runTestCases('⚙️ Built-ins - objects/instances and their constructors', [
    // all objects - instances of built-in constructor functions.

    [new Date(), 'new Date', false],
    [/regex/, '/regex/', false],

    [[], '[]', false],
    [{}, '{}', false],

    [new Map(), 'new Map', false],
    [new Set(), 'new Set', false],
    [new WeakMap(), 'new WeakMap', false],
    [new WeakSet(), 'new WeakSet', false],

    [new Int8Array(0), 'new Int8Array(0)', false],
    [new Uint8Array(0), 'new Uint8Array(0)', false],
    [new Float32Array(0), 'new Float32Array(0)', false],
    [new ArrayBuffer(0), 'new ArrayBuffer(0)', false],

    [new Error(), 'new Error', false],
    [new SyntaxError(), 'new SyntaxError', false],
    [new TypeError(), 'new TypeError', false],
    [new ReferenceError(), 'new ReferenceError', false],
    [new URIError(), 'new URIError', false],
    [new EvalError(), 'new EvalError', false],
    [new RangeError(), 'new RangeError', false],
    [new AggregateError([]), 'new AggregateError([])', false],

    // all objects - utility/api namespaces.

    // - Since all four test candidates are just tagged namespaces, hence objects, each object's
    //   constructor of cause is `Object` and not some function which by its name related to each
    //   object's/namespace's name like `Math`, `JSON`, `Reflect`, `Atomics`.
    [Math, 'Math', false],
    [JSON, 'JSON', false],
    [Reflect, 'Reflect', false],
    [Atomics, 'Atomics', false],

    // promise.

    [Promise.resolve(), 'Promise.resolve()', false],
    [asyncArrowFunctionExpression(), '(async (_) => _)()', false],
    [asyncNonArrowFunctionExpression(), '(async function () {})()', false],

    // built-in constructor-functions.

    [Boolean, 'Boolean', false],
    [Number, 'Number', false],
    [String, 'String', false],
    [BigInt, 'BigInt', false],
    [Symbol, 'Symbol', false],

    [Date, 'Date', false],
    [RegExp, 'RegExp', false],

    [Array, 'Array', false],
    [Object, 'Object', false],

    [Map, 'Map', false],
    [Set, 'Set', false],
    [WeakMap, 'WeakMap', false],
    [WeakSet, 'WeakSet', false],

    [Int8Array, 'Int8Array', false],
    [Uint8Array, 'Uint8Array', false],
    [Float32Array, 'Float32Array', false],
    [ArrayBuffer, 'ArrayBuffer', false],

    [Error, 'Error', false],
    [SyntaxError, 'SyntaxError', false],
    [TypeError, 'TypeError', false],
    [ReferenceError, 'ReferenceError', false],
    [URIError, 'URIError', false],
    [EvalError, 'EvalError', false],
    [RangeError, 'RangeError', false],
    [AggregateError, 'AggregateError', false],

    [Promise, 'Promise', false],

    // generators / generator-functions - special constructor-function handling.

    // - `AsyncGeneratorFunction` instead of `AsyncGenerator` since the latter
    //   - despite being the intuitively expected correct result - is an object
    //   (and a prototype) but not a constructor function like the former.
    [
      asyncGeneratorInstance, // an async generator.
      '(async function* () { yield 1; })()',
      false
    ],
    [
      asyncGeneratorPrototype, // an async generator.
      'Object.getPrototypeOf((async function* () { yield 1; })())',
      false
    ],

    // - `GeneratorFunction` instead of `Generator` since the latter - despite
    //   being the intuitively expected correct result - is an object (and a
    //   prototype) but not a constructor function like the former.
    [generatorInstance, '(function* () { yield 1; })()', false],
    [generatorPrototype, 'Object.getPrototypeOf((function* () { yield 1; })())', false]
  ]);

  runTestCases('🔧 Functions - other than Built-in and Class constructors', [
    [function () {}, 'function () {}', false],
    [(_) => _, '(_) => _', false],
    [conciseGenericMethod, '({ concise(...args) { return args; }}).concise', false],
    [spoofedArrowFunction, 'Object.assign(() => {}, { prototype: {} })', false],
    [asyncArrowFunctionExpression, 'async (_) => _', false],
    [asyncNonArrowFunctionExpression, '(async function () {})', false],
    [asyncGeneratorFunctionExpression, '(async function* () { yield 1; })', false],
    [generatorFunctionExpression, '(function* () { yield 1; })', false],

    [function () {}.constructor, '(function () {}).constructor', false],
    [((_) => _).constructor, '((_) => _).constructor', false],
    [conciseGenericMethod.constructor, '({ concise(...args) { return args; }}).concise', false],
    [
      spoofedArrowFunction.constructor,
      'Object.assign(() => {}, { prototype: {} }).constructor',
      false
    ],
    [asyncArrowFunctionExpression.constructor, '(async (_) => _).constructor', false],
    [asyncNonArrowFunctionExpression.constructor, '(async function () {}).constructor', false],
    [
      asyncGeneratorFunctionExpression.constructor,
      '(async function* () { yield 1; }).constructor',
      false
    ],
    [generatorFunctionExpression.constructor, '(function* () { yield 1; }).constructor', false],

    [Function.prototype, 'Function.prototype', false]
  ]);

  runTestCases('🏛️ Classes & Subclasses and their instances', [
    [MyClass, 'class MyClass {}', false],

    // - neither "built-in" nor "custom" type-identity.
    [new MyClass(), 'new MyClass', false],

    [MySubclass, 'class MySubclass extends MyClass {}', false],

    // - neither "built-in" nor "custom" type-identity.
    [new MySubclass(), 'new MySubclass', false]
  ]);

  runTestCases('🧪 Special & `Symbol.toStringTag` spoofed/tagged objects', [
    [
      (function () {
        return arguments;
      })(),
      '(function () { return arguments; })()',
      false
    ],
    [{ [Symbol.toStringTag]: 'Array' }, "{ [Symbol.toStringTag]: 'Array' }", true],
    [{ [Symbol.toStringTag]: 'CustomTag' }, "{ [Symbol.toStringTag]: '' }", true],
    [new TaggedClass(), 'new TaggedClass', true],
    [new ImplicitlyTaggedSubclass(), 'new ImplicitlyTaggedSubclass', true],
    [new ExplicitlyTaggedSubclass(), 'new ExplicitlyTaggedSubclass', true]
  ]);
});
