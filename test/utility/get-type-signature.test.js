import { describe, it, expect } from 'vitest';

import { getTypeSignature } from '../../src/utility';

function runTestCases(label, cases) {
  describe(label, () => {
    for (const [input, display, expected] of cases) {
      // console.log({ input, expected, display, label });
      it(`returns "${expected}" for \`${display}\``, () => {
        expect(
          getTypeSignature(input),
          `failed at input \`${input?.toString?.()}\` :: did expect \`${expected}\` :: with display \`${display}\``
        ).toStrictEqual(expected);
      });
    }
  });
}

describe('`getTypeSignature` - gets the internal type signature of any passed value.', () => {
  it('returns `undefined` when no argument is passed', () => {
    expect(getTypeSignature()).toBeUndefined();
  });

  it('returns "[object Undefined]" when the `undefined` value is passed explicitly', () => {
    expect(getTypeSignature(undefined)).toStrictEqual('[object Undefined]');
    expect(getTypeSignature(void 0)).toStrictEqual('[object Undefined]');
  });

  it('returns "[object Null]" when the `null` value is passed explicitly', () => {
    expect(getTypeSignature(null)).toStrictEqual('[object Null]');
  });

  runTestCases('🧱 Primitives & Boxed Primitives', [
    [true, 'true', '[object Boolean]'],
    [1_234_567, '1_234_567', '[object Number]'],
    ['string', "'string'", '[object String]'],

    [BigInt(0), 'BigInt(0)', '[object BigInt]'],
    [Symbol('sym'), "Symbol('sym')", '[object Symbol]'],

    [new Boolean(true), 'new Boolean(true)', '[object Boolean]'],
    [new Number(1_234_567), 'new Number(1_234_567)', '[object Number]'],
    [new String('string'), "new String('string')", '[object String]'],

    [Object(new Boolean(true)), 'Object(new Boolean(true))', '[object Boolean]'],
    [Object(new Number(1_234_567)), 'Object(new Number(1_234_567))', '[object Number]'],
    [Object(new String('string')), "Object(new String('string'))", '[object String]'],

    [Object(BigInt(0)), 'Object(BigInt(0))', '[object BigInt]'],
    [Object(Symbol('sym')), "Object(Symbol('sym'))", '[object Symbol]']
  ]);

  const asyncGeneratorFunctionExpression = async function* () {
    yield 1;
  };
  // const AsyncGeneratorFunction = asyncGeneratorFunctionExpression.constructor;
  const asyncGeneratorInstance = asyncGeneratorFunctionExpression();
  const asyncGeneratorPrototype = Object.getPrototypeOf(asyncGeneratorInstance);

  const generatorFunctionExpression = function* () {
    yield 1;
  };
  // const GeneratorFunction = generatorFunctionExpression.constructor;
  const generatorInstance = generatorFunctionExpression();
  const generatorPrototype = Object.getPrototypeOf(generatorInstance);

  const asyncArrowFunctionExpression = async (_) => _;
  const asyncNonArrowFunctionExpression = async function () {};
  // const AsyncFunction = asyncNonArrowFunctionExpression.constructor;

  runTestCases('⚙️ Built-ins - objects/instances and their constructors', [
    // all objects - instances of built-in constructor functions

    [new Date(), 'new Date', '[object Date]'],
    [/regex/, '/regex/', '[object RegExp]'],

    [[], '[]', '[object Array]'],
    [{}, '{}', '[object Object]'],

    [new Map(), 'new Map', '[object Map]'],
    [new Set(), 'new Set', '[object Set]'],
    [new WeakMap(), 'new WeakMap', '[object WeakMap]'],
    [new WeakSet(), 'new WeakSet', '[object WeakSet]'],

    [new Int8Array(0), 'new Int8Array(0)', '[object Int8Array]'],
    [new Uint8Array(0), 'new Uint8Array(0)', '[object Uint8Array]'],
    [new Float32Array(0), 'new Float32Array(0)', '[object Float32Array]'],
    [new ArrayBuffer(0), 'new ArrayBuffer(0)', '[object ArrayBuffer]'],

    [new Error(), 'new Error', '[object Error]'],
    [new SyntaxError(), 'new SyntaxError', '[object Error]'], // not '[object SyntaxError]'
    [new TypeError(), 'new TypeError', '[object Error]'], // not '[object TypeError]'
    [new ReferenceError(), 'new ReferenceError', '[object Error]'], // not '[object ReferenceError]'
    [new URIError(), 'new URIError', '[object Error]'], // not '[object URIError]'
    [new EvalError(), 'new EvalError', '[object Error]'], // not '[object EvalError]'
    [new RangeError(), 'new RangeError', '[object Error]'], // not '[object RangeError]'
    [new AggregateError([]), 'new AggregateError([])', '[object Error]'], // not '[object AggregateError]'

    // tagged utility/api namespaces

    [Math, 'Math', '[object Math]'],
    [JSON, 'JSON', '[object JSON]'],
    [Reflect, 'Reflect', '[object Reflect]'],
    [Atomics, 'Atomics', '[object Atomics]'],

    // promise.

    [Promise.resolve(), 'Promise.resolve()', '[object Promise]'],
    [asyncArrowFunctionExpression(), '(async (_) => _)()', '[object Promise]'],
    [asyncNonArrowFunctionExpression(), '(async function () {})()', '[object Promise]'],

    // built-in constructor-functions

    [Boolean, 'Boolean', '[object Function]'],
    [Number, 'Number', '[object Function]'],
    [String, 'String', '[object Function]'],
    [BigInt, 'BigInt', '[object Function]'],
    [Symbol, 'Symbol', '[object Function]'],

    [Date, 'Date', '[object Function]'],
    [RegExp, 'RegExp', '[object Function]'],

    [Array, 'Array', '[object Function]'],
    [Object, 'Object', '[object Function]'],

    [Map, 'Map', '[object Function]'],
    [Set, 'Set', '[object Function]'],
    [WeakMap, 'WeakMap', '[object Function]'],
    [WeakSet, 'WeakSet', '[object Function]'],

    [Int8Array, 'Int8Array', '[object Function]'],
    [Uint8Array, 'Uint8Array', '[object Function]'],
    [Float32Array, 'Float32Array', '[object Function]'],
    [ArrayBuffer, 'ArrayBuffer', '[object Function]'],

    [Error, 'Error', '[object Function]'],
    [SyntaxError, 'SyntaxError', '[object Function]'],
    [TypeError, 'TypeError', '[object Function]'],
    [ReferenceError, 'ReferenceError', '[object Function]'],
    [URIError, 'URIError', '[object Function]'],
    [EvalError, 'EvalError', '[object Function]'],
    [RangeError, 'RangeError', '[object Function]'],
    [AggregateError, 'AggregateError', '[object Function]'],

    [Promise, 'Promise', '[object Function]'],

    // generators

    [
      asyncGeneratorInstance, // an async generator.
      '(async function* () { yield 1; })()',
      '[object AsyncGenerator]'
    ],
    [
      asyncGeneratorPrototype, // an async generator.
      'Object.getPrototypeOf((async function* () { yield 1; })())',
      '[object AsyncGenerator]'
    ],

    [generatorInstance, '(function* () { yield 1; })()', '[object Generator]'],
    [
      generatorPrototype,
      'Object.getPrototypeOf((function* () { yield 1; })())',
      '[object Generator]'
    ]
  ]);

  runTestCases('🔧 Functions - other than Built-in and Class constructors', [
    [function () {}, 'function () {}', '[object Function]'],
    [(_) => _, '(_) => _', '[object Function]'],
    [asyncArrowFunctionExpression, 'async (_) => _', '[object AsyncFunction]'],
    [asyncNonArrowFunctionExpression, '(async function () {})', '[object AsyncFunction]'],
    [
      asyncGeneratorFunctionExpression,
      '(async function* () { yield 1; })',
      '[object AsyncGeneratorFunction]'
    ],
    [generatorFunctionExpression, '(function* () { yield 1; })', '[object GeneratorFunction]'],

    [function () {}.constructor, '(function () {}).constructor', '[object Function]'],
    [((_) => _).constructor, '((_) => _).constructor', '[object Function]'],
    [asyncArrowFunctionExpression.constructor, '(async (_) => _).constructor', '[object Function]'],
    [
      asyncNonArrowFunctionExpression.constructor,
      '(async function () {}).constructor',
      '[object Function]'
    ],
    [
      asyncGeneratorFunctionExpression.constructor,
      '(async function* () { yield 1; }).constructor',
      '[object Function]'
    ],
    [
      generatorFunctionExpression.constructor,
      '(function* () { yield 1; }).constructor',
      '[object Function]'
    ],

    [Function.prototype, 'Function.prototype', '[object Function]']
  ]);

  class MyClass {}
  class MySubclass extends MyClass {}

  runTestCases('🏛️ Classes & Subclasses and their instances', [
    [MyClass, 'class MyClass {}', '[object Function]'],
    [new MyClass(), 'new MyClass', '[object Object]'],

    [MySubclass, 'class MySubclass extends MyClass {}', '[object Function]'],
    [new MySubclass(), 'new MySubclass', '[object Object]']
  ]);

  class TaggedClass {
    get [Symbol.toStringTag]() {
      return 'TaggedClass';
    }
  }
  class ImplicitlyTaggedSubclass extends TaggedClass {}

  class ExplicitlyTaggedSubclass extends TaggedClass {
    get [Symbol.toStringTag]() {
      return 'ExplicitlyTaggedSubclass';
    }
  }
  runTestCases('🧪 Special & `Symbol.toStringTag` spoofed/tagged objects', [
    [
      (function () {
        return arguments;
      })(),
      '(function () { return arguments; })()',
      '[object Arguments]'
    ],
    [{ [Symbol.toStringTag]: 'Array' }, "{ [Symbol.toStringTag]: 'Array' }", '[object Array]'],
    [
      { [Symbol.toStringTag]: 'CustomTag' },
      "{ [Symbol.toStringTag]: 'CustomTag' }",
      '[object CustomTag]'
    ],
    [new TaggedClass(), 'new TaggedClass', '[object TaggedClass]'],
    [new ImplicitlyTaggedSubclass(), 'new ImplicitlyTaggedSubclass', '[object TaggedClass]'],
    [
      new ExplicitlyTaggedSubclass(),
      'new ExplicitlyTaggedSubclass',
      '[object ExplicitlyTaggedSubclass]'
    ]
  ]);
});
