import { describe, it, expect } from 'vitest';

import { getOwnPropertyDescriptor } from '../../../src/utility';
import { doesMatchStableNonEnumerableDescriptor } from '../../../src/type-identity/utility';

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
          doesMatchStableNonEnumerableDescriptor(getNameDescriptor(input)),
          `failed at input \`${input?.toString?.()}\` :: did expect \`${expected}\` :: with display \`${display}\``
        ).toStrictEqual(expected);
      });
    }
  });
}

describe(
  '`doesMatchStableNonEnumerableDescriptor` - does approve whether the passed value' +
    ' matches the stable (redefined) form of a non-enumerable property-descriptor.',
  () => {
    it('returns ❌ `false` when no argument is passed.', () => {
      expect(doesMatchStableNonEnumerableDescriptor()).toStrictEqual(false);
    });

    runTestCases('⚙️ Built-in constructor-functions', [
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

      [Promise, 'Promise', false]
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

    runTestCases('🏛️ Classes & Subclasses', [
      [MyClass, 'class MyClass {}', false],
      [MySubclass, 'class MySubclass extends MyClass {}', false]
    ]);

    it('returns ✅ `true` for a basic function type with an correctly altered name-descriptor.', () => {
      function namedFunctionExpression() {}

      expect(
        doesMatchStableNonEnumerableDescriptor(getNameDescriptor(namedFunctionExpression))
      ).toStrictEqual(false);

      Object.defineProperty(namedFunctionExpression, 'name', {
        configurable: false,
        get: ((type) => type).bind(namedFunctionExpression, 'foo')
      });
      expect(
        doesMatchStableNonEnumerableDescriptor(getNameDescriptor(namedFunctionExpression))
      ).toStrictEqual(true);
    });
    it('returns ✅ `true` for a class constructor with an correctly altered name-descriptor.', () => {
      class AnotherClass {}

      expect(doesMatchStableNonEnumerableDescriptor(getNameDescriptor(AnotherClass))).toStrictEqual(
        false
      );

      Object.defineProperty(AnotherClass, 'name', {
        configurable: false,
        get: ((type) => type).bind(AnotherClass, 'Bar')
      });
      expect(doesMatchStableNonEnumerableDescriptor(getNameDescriptor(AnotherClass))).toStrictEqual(
        true
      );
    });
  }
);
