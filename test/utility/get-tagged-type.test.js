import { describe, it, expect } from 'vitest';

import { getTaggedType } from '../../src/utility';

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
          getTaggedType(input),
          `failed at input \`${input?.toString?.()}\` :: did expect \`${expected}\` :: with display \`${display}\``
        ).toStrictEqual(expected);
      });
    }
  });
}

describe("`getTaggedType` - retrieves the tagged type-name from the passed value's internal type signature.", () => {
  it('returns `undefined` when no argument is passed.', () => {
    expect(getTaggedType()).toBeUndefined();
  });

  it('returns "Undefined" when the `undefined` value is passed explicitly.', () => {
    expect(getTaggedType(undefined)).toStrictEqual('Undefined');
    expect(getTaggedType(void 0)).toStrictEqual('Undefined');
  });

  it('returns "Null" when the `null` value is passed explicitly.', () => {
    expect(getTaggedType(null)).toStrictEqual('Null');
  });

  it('returns "Object" for an object that was created via `Object.create(null)`.', () => {
    expect(getTaggedType(Object.create(null))).toStrictEqual('Object');
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
    [new SyntaxError(), 'new SyntaxError', 'Error'], // not 'SyntaxError'
    [new TypeError(), 'new TypeError', 'Error'], // not 'TypeError'
    [new ReferenceError(), 'new ReferenceError', 'Error'], // not 'ReferenceError'
    [new URIError(), 'new URIError', 'Error'], // not 'URIError'
    [new EvalError(), 'new EvalError', 'Error'], // not 'EvalError'
    [new RangeError(), 'new RangeError', 'Error'], // not 'RangeError'
    [new AggregateError([]), 'new AggregateError([])', 'Error'], // not 'AggregateError'

    // tagged utility/api namespaces.

    [Math, 'Math', 'Math'],
    [JSON, 'JSON', 'JSON'],
    [Reflect, 'Reflect', 'Reflect'],
    [Atomics, 'Atomics', 'Atomics'],

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

    // generators.

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
    [new MyClass(), 'new MyClass', 'Object'],

    [MySubclass, 'class MySubclass extends MyClass {}', 'Function'],
    [new MySubclass(), 'new MySubclass', 'Object']
  ]);

  runTestCases('🧪 Special & `Symbol.toStringTag` spoofed/tagged objects', [
    [
      (function () {
        return arguments;
      })(),
      '(function () { return arguments; })()',
      'Arguments'
    ],
    [{ [Symbol.toStringTag]: 'Array' }, "{ [Symbol.toStringTag]: 'Array' }", 'Array'],
    [{ [Symbol.toStringTag]: 'CustomTag' }, "{ [Symbol.toStringTag]: 'CustomTag' }", 'CustomTag'],
    [new TaggedClass(), 'new TaggedClass', 'TaggedClass'],
    [new ImplicitlyTaggedSubclass(), 'new ImplicitlyTaggedSubclass', 'TaggedClass'],
    [new ExplicitlyTaggedSubclass(), 'new ExplicitlyTaggedSubclass', 'ExplicitlyTaggedSubclass']
  ]);
});
