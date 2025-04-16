import { describe, it, expect } from 'vitest';

import { getTypeSignature } from '../../src/utility';

function runTestCases(label, cases) {
  describe(label, () => {
    for (const [input, display, expected] of cases) {
      it(`returns "${expected}" for \`${display}\``, () => {
        expect(getTypeSignature(input)).toStrictEqual(expected);
      });
    }
  });
}

describe('`getTypeSignature` - gets the internal type signature of any passed value.', () => {
  it('returns `undefined` when no argument is passed', () => {
    expect(getTypeSignature()).toBeUndefined();
  });

  it('returns "[object Undefined]" when undefined is passed explicitly', () => {
    expect(getTypeSignature(undefined)).toStrictEqual('[object Undefined]');
    expect(getTypeSignature(void 0)).toStrictEqual('[object Undefined]');
  });

  runTestCases('🧱 Primitives & Boxed Primitives', [
    [null, 'null', '[object Null]'],
    [true, 'true', '[object Boolean]'],
    [100, '100', '[object Number]'],
    ['', '', '[object String]'],
    [Object(true), 'Object(true)', '[object Boolean]'],
    [Object(100), 'Object(100)', '[object Number]'],
    [Object(''), "Object('')", '[object String]'],
    [Symbol(), 'Symbol()', '[object Symbol]'],
    [BigInt(42), 'BigInt(42)', '[object BigInt]'],
    [Object(Symbol()), 'Object(Symbol())', '[object Symbol]'],
    [Object(BigInt(42)), 'Object(BigInt(42))', '[object BigInt]']
  ]);

  runTestCases('⚙️ Built-ins and Objects', [
    [Function, 'Function', '[object Function]'],

    [Object, 'Object', '[object Function]'],
    [Array, 'Function', '[object Function]'],

    [{}, '{}', '[object Object]'],
    [[], '[]', '[object Array]'],
    [/regex/, '/regex/', '[object RegExp]'],
    [new Date(), 'new Date', '[object Date]'],

    [new Error(), 'new Error', '[object Error]'],
    [new SyntaxError(), 'new SyntaxError', '[object Error]'],
    [new TypeError(), 'new TypeError', '[object Error]'],
    [new ReferenceError(), 'new ReferenceError', '[object Error]'],
    [new URIError(), 'new URIError', '[object Error]'],
    [new EvalError(), 'new EvalError', '[object Error]'],
    [new RangeError(), 'new RangeError', '[object Error]'],
    [new AggregateError([]), 'new AggregateError([])', '[object Error]'],

    [Promise.resolve(), 'Promise.resolve()', '[object Promise]'],
    [(async (_) => _)(), '(async _ => _)()', '[object Promise]'],
    [(async function () {})(), '(async function () {})()', '[object Promise]'],

    [
      (async function* () {
        yield 1;
      })(),
      '(async function* () { yield 1; })()',
      '[object AsyncGenerator]'
    ],
    [
      (function* () {
        yield 1;
      })(),
      '(function* () { yield 1; })()',
      '[object Generator]'
    ],

    [new Map(), 'new Map', '[object Map]'],
    [new Set(), 'new Set', '[object Set]'],
    [new WeakMap(), 'new WeakMap', '[object WeakMap]'],
    [new WeakSet(), 'new WeakSet', '[object WeakSet]'],

    [new Int8Array(0), 'new Int8Array(0)', '[object Int8Array]'],
    [new Uint8Array(0), 'new Uint8Array(0)', '[object Uint8Array]'],
    [new Float32Array(0), 'new Float32Array(0)', '[object Float32Array]'],
    [new ArrayBuffer(0), 'new ArrayBuffer(0)', '[object ArrayBuffer]'],

    [Math, 'Math', '[object Math]'],
    [JSON, 'JSON', '[object JSON]'],
    [Reflect, 'Reflect', '[object Reflect]'],
    [Atomics, 'Atomics', '[object Atomics]']
  ]);

  runTestCases('🔧 Functions', [
    [Function.prototype, 'Function.prototype', '[object Function]'],

    [function () {}.constructor, '(function () {}).constructor', '[object Function]'],
    [((_) => _).constructor, '(_ => _).constructor', '[object Function]'],

    [(async (_) => _).constructor, '(async _ => _).constructor', '[object Function]'],
    [async function () {}.constructor, '(async function () {}).constructor', '[object Function]'],

    [
      async function* () {
        yield 1;
      }.constructor,
      '(async function* () {}).constructor',
      '[object Function]'
    ],
    [
      function* () {
        yield 1;
      }.constructor,
      '(function* () {}).constructor',
      '[object Function]'
    ],

    [function () {}, 'function () {}', '[object Function]'],
    [(_) => _, '(_ => _)', '[object Function]'],

    [async (_) => _, '(async _ => _)', '[object AsyncFunction]'],
    [async function () {}, 'async function () {}', '[object AsyncFunction]'],

    [
      async function* () {
        yield 1;
      },
      'async function* () {}',
      '[object AsyncGeneratorFunction]'
    ],
    [
      function* () {
        yield 1;
      },
      'function* () {}',
      '[object GeneratorFunction]'
    ]
  ]);

  runTestCases('🏛️ Classes & Subclasses and theirs instances', [
    [class MyClass {}, 'class MyClass {}', '[object Function]'],
    [new (class MyClass {})(), 'new class MyClass {}', '[object Object]'],

    [class MySubclass extends class MyClass {} {}, 'class MyClass {}', '[object Function]'],
    [
      new (class MySubclass extends class MyClass {} {})(),
      'new class MySubclass extends (class MyClass {}) {}',
      '[object Object]'
    ]
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
  runTestCases('🧪 Special & Symbol.toStringTag spoofed/tagged objects', [
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
