import { describe, it, expect } from 'vitest';

import { getDefinedConstructor } from '../../src/utility';

function runTestCases(label, cases) {
  describe(label, () => {
    for (const [input, display /*, expectedInWord*/, expected] of cases) {
      // console.log({ input, expected, display, label });
      it(`returns "${expected}" for \`${display}\``, () => {
        expect(
          getDefinedConstructor(input),
          `failed at input \`${input?.toString?.()}\` :: did expect \`${expected}\` :: with display \`${display}\``
        ).toStrictEqual(expected);
      });
    }
  });
}

describe("`getDefinedConstructor` - retrieves, if available, the passed value's constructor-function", () => {
  it('returns `undefined` when no argument is passed.', () => {
    expect(getDefinedConstructor()).toBeUndefined();
  });

  it('returns "Undefined" when no constructor-function can be resolved.', () => {
    expect(getDefinedConstructor(undefined)).toBeUndefined();
    expect(getDefinedConstructor(void 0)).toBeUndefined();
    expect(getDefinedConstructor(null)).toBeUndefined();
  });

  runTestCases('🧱 Primitives & Boxed Primitives', [
    [true, 'true', Boolean],
    [100, '100', Number],
    ['', '', String],
    [Object(true), 'Object(true)', Boolean],
    [Object(100), 'Object(100)', Number],
    [Object(''), "Object('')", String],
    [Symbol(), 'Symbol()', Symbol],
    [BigInt(42), 'BigInt(42)', BigInt],
    [Object(Symbol()), 'Object(Symbol())', Symbol],
    [Object(BigInt(42)), 'Object(BigInt(42))', BigInt]
  ]);

  const asyncGeneratorFunctionExpression = async function* () {
    yield 1;
  };
  const AsyncGeneratorFunction = asyncGeneratorFunctionExpression.constructor;
  // const AsyncGenerator = Object.getPrototypeOf(asyncGeneratorFunctionExpression());

  const generatorFunctionExpression = function* () {
    yield 1;
  };
  const GeneratorFunction = generatorFunctionExpression.constructor;
  // const Generator = Object.getPrototypeOf(generatorFunctionExpression());

  const asyncArrowFunctionExpression = async (_) => _;
  const asyncNonArrowFunctionExpression = async function () {};
  const AsyncFunction = asyncNonArrowFunctionExpression.constructor;

  runTestCases('⚙️ Built-ins and Objects', [
    [Function, 'Function', Function],

    [Object, 'Object', Function],
    [Array, 'Function', Function],

    [{}, '{}', Object],
    [[], '[]', Array],
    [/regex/, '/regex/', RegExp],
    [new Date(), 'new Date', Date],

    [new Error(), 'new Error', Error],
    [new SyntaxError(), 'new SyntaxError', SyntaxError],
    [new TypeError(), 'new TypeError', TypeError],
    [new ReferenceError(), 'new ReferenceError', ReferenceError],
    [new URIError(), 'new URIError', URIError],
    [new EvalError(), 'new EvalError', EvalError],
    [new RangeError(), 'new RangeError', RangeError],
    [new AggregateError([]), 'new AggregateError([])', AggregateError],

    [Promise.resolve(), 'Promise.resolve()', Promise],
    [asyncArrowFunctionExpression(0), '(async _ => _)()', Promise],
    [asyncNonArrowFunctionExpression(), '(async function () {})()', Promise],

    // - `AsyncGeneratorFunction` instead of `AsyncGenerator` since the latter
    //   - despite being the intuitively expected correct result - is an object
    //   (and a prototype) but not a constructor function like the former.
    [
      asyncGeneratorFunctionExpression(),
      '(async function* () { yield 1; })()',
      AsyncGeneratorFunction
    ],

    // - `GeneratorFunction` instead of `Generator` since the latter - despite
    //   being the intuitively expected correct result - is an object (and a
    //   prototype) but not a constructor function like the former.
    [generatorFunctionExpression(), '(function* () { yield 1; })()', GeneratorFunction],

    [new Map(), 'new Map', Map],
    [new Set(), 'new Set', Set],
    [new WeakMap(), 'new WeakMap', WeakMap],
    [new WeakSet(), 'new WeakSet', WeakSet],

    [new Int8Array(0), 'new Int8Array(0)', Int8Array],
    [new Uint8Array(0), 'new Uint8Array(0)', Uint8Array],
    [new Float32Array(0), 'new Float32Array(0)', Float32Array],
    [new ArrayBuffer(0), 'new ArrayBuffer(0)', ArrayBuffer],

    // - Since all for test candidates are just tagged namespaces, hence objects, each object's
    //   constructor of cause is `Object` and not some function which by its name related to each
    //   object's/namespace's name like `Math`, `JSON`, `Reflect`, `Atomics`.
    [Math, 'Math', Object],
    [JSON, 'JSON', Object],
    [Reflect, 'Reflect', Object],
    [Atomics, 'Atomics', Object]
  ]);

  runTestCases('🔧 Functions', [
    [Function.prototype, 'Function.prototype', Function],

    [function () {}.constructor, '(function () {}).constructor', Function],
    [((_) => _).constructor, '(_ => _).constructor', Function],

    [asyncArrowFunctionExpression.constructor, '(async _ => _).constructor', Function],
    [asyncNonArrowFunctionExpression.constructor, '(async function () {}).constructor', Function],

    [
      asyncGeneratorFunctionExpression.constructor,
      '(async function* () { yield 1; }).constructor',
      Function
    ],
    [generatorFunctionExpression.constructor, '(function* () { yield 1; }).constructor', Function],

    [function () {}, 'function () {}', Function],
    [(_) => _, '(_ => _)', Function],

    [asyncArrowFunctionExpression, '(async _ => _)', AsyncFunction],
    [asyncNonArrowFunctionExpression, 'async function () {}', AsyncFunction],

    [asyncGeneratorFunctionExpression, 'async function* () { yield 1; }', AsyncGeneratorFunction],
    [generatorFunctionExpression, 'function* () { yield 1; }', GeneratorFunction]
  ]);

  class MyClass {}
  class MySubclass extends MyClass {}

  runTestCases('🏛️ Classes & Subclasses and theirs instances', [
    [MyClass, 'class MyClass {}', Function],
    [new MyClass(), 'new MyClass', MyClass],

    [MySubclass, 'class MySubclass extends MyClass {}', Function],
    [new MySubclass(), 'new MySubclass', MySubclass]
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
      Object
    ],
    [{ [Symbol.toStringTag]: 'Array' }, "{ [Symbol.toStringTag]: 'Array' }", Object],
    [{ [Symbol.toStringTag]: 'CustomTag' }, "{ [Symbol.toStringTag]: '' }", Object],
    [new TaggedClass(), 'new TaggedClass', TaggedClass],
    [new ImplicitlyTaggedSubclass(), 'new ImplicitlyTaggedSubclass', ImplicitlyTaggedSubclass],
    [new ExplicitlyTaggedSubclass(), 'new ExplicitlyTaggedSubclass', ExplicitlyTaggedSubclass]
  ]);
});
