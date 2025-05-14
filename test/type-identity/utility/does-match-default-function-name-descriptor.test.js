import { describe, it, expect } from 'vitest';

import { getOwnPropertyDescriptor } from '../../../src/utility';
import { doesMatchDefaultFunctionNameDescriptor } from '../../../src/type-identity/utility';

import {
  asyncGeneratorFunctionExpression,
  generatorFunctionExpression,
  asyncArrowFunctionExpression,
  asyncNonArrowFunctionExpression,
  conciseGenericMethod,
  spoofedArrowFunction,
  MyClass,
  MySubclass
} from '../../utility/__config';

function getNameDescriptor(value) {
  return getOwnPropertyDescriptor(value ?? Object.create(null), 'name');
}
function runTestCases(label, cases) {
  describe(label, () => {
    for (const [input, display, expected] of cases) {
      // console.log({ input, expected, display, label });
      it(`returns ${(expected === true && '✅') || '❌'} \`${expected}\` for \`${display}\``, () => {
        expect(
          doesMatchDefaultFunctionNameDescriptor(getNameDescriptor(input)),
          `failed at input \`${input?.toString?.()}\` :: did expect \`${expected}\` :: with display \`${display}\``
        ).toStrictEqual(expected);
      });
    }
  });
}

describe(
  '`doesMatchDefaultFunctionNameDescriptor` - does approve whether the passed' +
    ' value matches the default form of a function-name property-descriptor.',
  () => {
    it('returns ❌ `false` when no argument is passed.', () => {
      expect(doesMatchDefaultFunctionNameDescriptor()).toStrictEqual(false);
    });

    runTestCases('⚙️ Built-in constructor-functions', [
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

      [Promise, 'Promise', true]
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

    runTestCases('🏛️ Classes & Subclasses', [
      [MyClass, 'class MyClass {}', true],
      [MySubclass, 'class MySubclass extends MyClass {}', true]
    ]);

    it('returns ❌ `false` for a basic function type with an already altered name-descriptor that is distinct from its default.', () => {
      function namedFunctionExpression() {}

      expect(
        doesMatchDefaultFunctionNameDescriptor(getNameDescriptor(namedFunctionExpression))
      ).toStrictEqual(true);

      Object.defineProperty(namedFunctionExpression, 'name', {
        configurable: false,
        get: ((type) => type).bind(namedFunctionExpression, 'foo')
      });
      expect(
        doesMatchDefaultFunctionNameDescriptor(getNameDescriptor(namedFunctionExpression))
      ).toStrictEqual(false);
    });
    it('returns ❌ `false` for a class constructor with an already altered name-descriptor that is distinct from its default.', () => {
      class AnotherClass {}

      expect(doesMatchDefaultFunctionNameDescriptor(getNameDescriptor(AnotherClass))).toStrictEqual(
        true
      );

      Object.defineProperty(AnotherClass, 'name', {
        configurable: false,
        get: ((type) => type).bind(AnotherClass, 'Bar')
      });
      expect(doesMatchDefaultFunctionNameDescriptor(getNameDescriptor(AnotherClass))).toStrictEqual(
        false
      );
    });
  }
);
