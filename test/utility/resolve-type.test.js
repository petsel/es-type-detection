import { describe, it, expect } from 'vitest';

import { resolveType } from '../../src/utility';

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
      it(`returns "${expected}" for \`${display}\``, () => {
        expect(
          resolveType(input),
          `failed at input \`${input?.toString?.()}\` :: did expect \`${expected}\` :: with display \`${display}\``
        ).toStrictEqual(expected);
      });
    }
  });
}

describe('`resolveType` - returns a string value similar to `getTaggedTyped` and `getConstructorName` by balancing the approaches of both methods.', () => {
  it('returns `undefined` when no argument is passed.', () => {
    expect(resolveType()).toBeUndefined();
  });

  it('returns "Undefined" when the `undefined` value is passed explicitly.', () => {
    expect(resolveType(undefined)).toStrictEqual('Undefined');
    expect(resolveType(void 0)).toStrictEqual('Undefined');
  });

  it('returns "Null" when the `null` value is passed explicitly.', () => {
    expect(resolveType(null)).toStrictEqual('Null');
  });

  it('returns "Object" for an object that was created via `Object.create(null)`.', () => {
    expect(resolveType(Object.create(null))).toStrictEqual('Object');
  });

  runTestCases('🧱 Primitives & Boxed Primitives', [
    [true, 'true', 'Boolean'],
    [1_234_567, '1_234_567', 'Number'],
    ['string', "'string'", 'String'],

    [BigInt(0), 'BigInt(0)', 'BigInt'],
    [Symbol('sym'), "Symbol('sym')", 'Symbol'],

    [new Boolean(true), 'new Boolean(true)', 'Boolean'],
    [new Number(1_234_567), 'new Number(1_234_567)', 'Number'],
    [new String('string'), "new String('string')", 'String'],

    [Object(new Boolean(true)), 'Object(new Boolean(true))', 'Boolean'],
    [Object(new Number(1_234_567)), 'Object(new Number(1_234_567))', 'Number'],
    [Object(new String('string')), "Object(new String('string'))", 'String'],

    [Object(BigInt(0)), 'Object(BigInt(0))', 'BigInt'],
    [Object(Symbol('sym')), "Object(Symbol('sym'))", 'Symbol']
  ]);

  runTestCases('⚙️ Built-ins - objects/instances and their constructors', [
    // all objects - instances of built-in constructor functions.

    [new Date(), 'new Date', 'Date'],
    [/regex/, '/regex/', 'RegExp'],

    [[], '[]', 'Array'],
    [{}, '{}', 'Object'],

    [new Map(), 'new Map', 'Map'],
    [new Set(), 'new Set', 'Set'],
    [new WeakMap(), 'new WeakMap', 'WeakMap'],
    [new WeakSet(), 'new WeakSet', 'WeakSet'],

    [new Int8Array(0), 'new Int8Array(0)', 'Int8Array'],
    [new Uint8Array(0), 'new Uint8Array(0)', 'Uint8Array'],
    [new Float32Array(0), 'new Float32Array(0)', 'Float32Array'],
    [new ArrayBuffer(0), 'new ArrayBuffer(0)', 'ArrayBuffer'],

    [new Error(), 'new Error', 'Error'],
    [new SyntaxError(), 'new SyntaxError', 'SyntaxError'],
    [new TypeError(), 'new TypeError', 'TypeError'],
    [new ReferenceError(), 'new ReferenceError', 'ReferenceError'],
    [new URIError(), 'new URIError', 'URIError'],
    [new EvalError(), 'new EvalError', 'EvalError'],
    [new RangeError(), 'new RangeError', 'RangeError'],
    [new AggregateError([]), 'new AggregateError([])', 'AggregateError'],

    // all objects - utility/api namespaces.

    // - Since all four test candidates are just tagged namespaces, hence objects, each object's
    //   constructor of cause is `Object` and not some function which by its name related to each
    //   object's/namespace's name like `Math`, `JSON`, `Reflect`, `Atomics`.
    [Math, 'Math', 'Object'],
    [JSON, 'JSON', 'Object'],
    [Reflect, 'Reflect', 'Object'],
    [Atomics, 'Atomics', 'Object'],

    // promise.

    [Promise.resolve(), 'Promise.resolve()', 'Promise'],
    [asyncArrowFunctionExpression(), '(async (_) => _)()', 'Promise'],
    [asyncNonArrowFunctionExpression(), '(async function () {})()', 'Promise'],

    // built-in constructor-functions.

    [Boolean, 'Boolean', 'Function'],
    [Number, 'Number', 'Function'],
    [String, 'String', 'Function'],
    [BigInt, 'BigInt', 'Function'],
    [Symbol, 'Symbol', 'Function'],

    [Date, 'Date', 'Function'],
    [RegExp, 'RegExp', 'Function'],

    [Array, 'Array', 'Function'],
    [Object, 'Object', 'Function'],

    [Map, 'Map', 'Function'],
    [Set, 'Set', 'Function'],
    [WeakMap, 'WeakMap', 'Function'],
    [WeakSet, 'WeakSet', 'Function'],

    [Int8Array, 'Int8Array', 'Function'],
    [Uint8Array, 'Uint8Array', 'Function'],
    [Float32Array, 'Float32Array', 'Function'],
    [ArrayBuffer, 'ArrayBuffer', 'Function'],

    [Error, 'Error', 'Function'],
    [SyntaxError, 'SyntaxError', 'Function'],
    [TypeError, 'TypeError', 'Function'],
    [ReferenceError, 'ReferenceError', 'Function'],
    [URIError, 'URIError', 'Function'],
    [EvalError, 'EvalError', 'Function'],
    [RangeError, 'RangeError', 'Function'],
    [AggregateError, 'AggregateError', 'Function'],

    [Promise, 'Promise', 'Function'],

    // generators / generator-functions - special constructor-function handling.

    // - `AsyncGeneratorFunction` instead of `AsyncGenerator` since the latter
    //   - despite being the intuitively expected correct result - is an object
    //   (and a prototype) but not a constructor function like the former.
    [
      asyncGeneratorInstance, // an async generator.
      '(async function* () { yield 1; })()',
      'AsyncGenerator'
    ],
    [
      asyncGeneratorPrototype, // an async generator.
      'Object.getPrototypeOf((async function* () { yield 1; })())',
      'AsyncGenerator'
    ],

    // - `GeneratorFunction` instead of `Generator` since the latter - despite
    //   being the intuitively expected correct result - is an object (and a
    //   prototype) but not a constructor function like the former.
    [generatorInstance, '(function* () { yield 1; })()', 'Generator'],
    [generatorPrototype, 'Object.getPrototypeOf((function* () { yield 1; })())', 'Generator']
  ]);

  runTestCases('🔧 Functions - other than Built-in and Class constructors', [
    [function () {}, 'function () {}', 'Function'],
    [(_) => _, '(_) => _', 'Function'],
    [spoofedArrowFunction, 'Object.assign(() => {}, { prototype: {} })', 'Function'],
    [asyncArrowFunctionExpression, 'async (_) => _', 'AsyncFunction'],
    [asyncNonArrowFunctionExpression, '(async function () {})', 'AsyncFunction'],
    [
      asyncGeneratorFunctionExpression,
      '(async function* () { yield 1; })',
      'AsyncGeneratorFunction'
    ],
    [generatorFunctionExpression, '(function* () { yield 1; })', 'GeneratorFunction'],

    [function () {}.constructor, '(function () {}).constructor', 'Function'],
    [((_) => _).constructor, '((_) => _).constructor', 'Function'],
    [
      spoofedArrowFunction.constructor,
      'Object.assign(() => {}, { prototype: {} }).constructor',
      'Function'
    ],
    [asyncArrowFunctionExpression.constructor, '(async (_) => _).constructor', 'Function'],
    [asyncNonArrowFunctionExpression.constructor, '(async function () {}).constructor', 'Function'],
    [
      asyncGeneratorFunctionExpression.constructor,
      '(async function* () { yield 1; }).constructor',
      'Function'
    ],
    [
      generatorFunctionExpression.constructor,
      '(function* () { yield 1; }).constructor',
      'Function'
    ],

    [Function.prototype, 'Function.prototype', 'Function']
  ]);

  runTestCases('🏛️ Classes & Subclasses and their instances', [
    [MyClass, 'class MyClass {}', 'Function'],
    [new MyClass(), 'new MyClass', 'MyClass'],

    [MySubclass, 'class MySubclass extends MyClass {}', 'Function'],
    [new MySubclass(), 'new MySubclass', 'MySubclass']
  ]);

  runTestCases('🧪 Special & `Symbol.toStringTag` spoofed/tagged objects', [
    [
      (function () {
        return arguments;
      })(),
      '(function () { return arguments; })()',
      'Object'
    ],
    [{ [Symbol.toStringTag]: 'Array' }, "{ [Symbol.toStringTag]: 'Array' }", 'Object'],
    [{ [Symbol.toStringTag]: 'CustomTag' }, "{ [Symbol.toStringTag]: '' }", 'Object'],
    [new TaggedClass(), 'new TaggedClass', 'TaggedClass'],
    [new ImplicitlyTaggedSubclass(), 'new ImplicitlyTaggedSubclass', 'ImplicitlyTaggedSubclass'],
    [new ExplicitlyTaggedSubclass(), 'new ExplicitlyTaggedSubclass', 'ExplicitlyTaggedSubclass']
  ]);
});
