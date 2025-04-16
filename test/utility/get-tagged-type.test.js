import { describe, it, expect } from 'vitest';

import { getTaggedType } from '../../src/utility';

function runTestCases(label, cases) {
  describe(label, () => {
    for (const [input, display, expected] of cases) {
      it(`returns "${expected}" for \`${display}\``, () => {
        expect(getTaggedType(input)).toStrictEqual(expected);
      });
    }
  });
}

describe("`getTaggedType` - retrieves the tagged type-name from the passed value's internal type signature.", () => {
  it('returns `undefined` when no argument is passed', () => {
    expect(getTaggedType()).toBeUndefined();
  });

  it('returns "Undefined" when undefined is passed explicitly', () => {
    expect(getTaggedType(undefined)).toStrictEqual('Undefined');
    expect(getTaggedType(void 0)).toStrictEqual('Undefined');
  });

  runTestCases('🧱 Primitives & Boxed Primitives', [
    [null, 'null', 'Null'],
    [true, 'true', 'Boolean'],
    [100, '100', 'Number'],
    ['', '', 'String'],
    [Object(true), 'Object(true)', 'Boolean'],
    [Object(100), 'Object(100)', 'Number'],
    [Object(''), "Object('')", 'String'],
    [Symbol(), 'Symbol()', 'Symbol'],
    [BigInt(42), 'BigInt(42)', 'BigInt'],
    [Object(Symbol()), 'Object(Symbol())', 'Symbol'],
    [Object(BigInt(42)), 'Object(BigInt(42))', 'BigInt']
  ]);

  runTestCases('⚙️ Built-ins and Objects', [
    [Function, 'Function', 'Function'],

    [Object, 'Object', 'Function'],
    [Array, 'Function', 'Function'],

    [{}, '{}', 'Object'],
    [[], '[]', 'Array'],
    [/regex/, '/regex/', 'RegExp'],
    [new Date(), 'new Date', 'Date'],

    [new Error(), 'new Error', 'Error'],
    [new SyntaxError(), 'new SyntaxError', 'Error'],
    [new TypeError(), 'new TypeError', 'Error'],
    [new ReferenceError(), 'new ReferenceError', 'Error'],
    [new URIError(), 'new URIError', 'Error'],
    [new EvalError(), 'new EvalError', 'Error'],
    [new RangeError(), 'new RangeError', 'Error'],
    [new AggregateError([]), 'new AggregateError([])', 'Error'],

    [Promise.resolve(), 'Promise.resolve()', 'Promise'],
    [(async (_) => _)(), '(async _ => _)()', 'Promise'],
    [(async function () {})(), '(async function () {})()', 'Promise'],

    [
      (async function* () {
        yield 1;
      })(),
      '(async function* () { yield 1; })()',
      'AsyncGenerator'
    ],
    [
      (function* () {
        yield 1;
      })(),
      '(function* () { yield 1; })()',
      'Generator'
    ],

    [new Map(), 'new Map', 'Map'],
    [new Set(), 'new Set', 'Set'],
    [new WeakMap(), 'new WeakMap', 'WeakMap'],
    [new WeakSet(), 'new WeakSet', 'WeakSet'],

    [new Int8Array(0), 'new Int8Array(0)', 'Int8Array'],
    [new Uint8Array(0), 'new Uint8Array(0)', 'Uint8Array'],
    [new Float32Array(0), 'new Float32Array(0)', 'Float32Array'],
    [new ArrayBuffer(0), 'new ArrayBuffer(0)', 'ArrayBuffer'],

    [Math, 'Math', 'Math'],
    [JSON, 'JSON', 'JSON'],
    [Reflect, 'Reflect', 'Reflect'],
    [Atomics, 'Atomics', 'Atomics']
  ]);

  runTestCases('🔧 Functions', [
    [Function.prototype, 'Function.prototype', 'Function'],

    [function () {}.constructor, '(function () {}).constructor', 'Function'],
    [((_) => _).constructor, '(_ => _).constructor', 'Function'],

    [(async (_) => _).constructor, '(async _ => _).constructor', 'Function'],
    [async function () {}.constructor, '(async function () {}).constructor', 'Function'],

    [
      async function* () {
        yield 1;
      }.constructor,
      '(async function* () {}).constructor',
      'Function'
    ],
    [
      function* () {
        yield 1;
      }.constructor,
      '(function* () {}).constructor',
      'Function'
    ],

    [function () {}, 'function () {}', 'Function'],
    [(_) => _, '(_ => _)', 'Function'],

    [async (_) => _, '(async _ => _)', 'AsyncFunction'],
    [async function () {}, 'async function () {}', 'AsyncFunction'],

    [
      async function* () {
        yield 1;
      },
      'async function* () {}',
      'AsyncGeneratorFunction'
    ],
    [
      function* () {
        yield 1;
      },
      'function* () {}',
      'GeneratorFunction'
    ]
  ]);

  runTestCases('🏛️ Classes & Subclasses and theirs instances', [
    [class MyClass {}, 'class MyClass {}', 'Function'],
    [new (class MyClass {})(), 'new class MyClass {}', 'Object'],

    [class MySubclass extends class MyClass {} {}, 'class MyClass {}', 'Function'],
    [
      new (class MySubclass extends class MyClass {} {})(),
      'new class MySubclass extends (class MyClass {}) {}',
      'Object'
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
      'Arguments'
    ],
    [{ [Symbol.toStringTag]: 'Array' }, "{ [Symbol.toStringTag]: 'Array' }", 'Array'],
    [{ [Symbol.toStringTag]: 'CustomTag' }, "{ [Symbol.toStringTag]: 'CustomTag' }", 'CustomTag'],
    [new TaggedClass(), 'new TaggedClass', 'TaggedClass'],
    [new ImplicitlyTaggedSubclass(), 'new ImplicitlyTaggedSubclass', 'TaggedClass'],
    [new ExplicitlyTaggedSubclass(), 'new ExplicitlyTaggedSubclass', 'ExplicitlyTaggedSubclass']
  ]);
});
