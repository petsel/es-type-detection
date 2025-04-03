import { describe, it, expect } from 'vitest';

import { isNumber, isNumberValue, isNumberObject } from '../../src/base';

function runTestCases(label, testFct, expected, cases) {
  describe(label, () => {
    for (const [input, display] of cases) {
      it(`returns \`${String(expected)}\` for \`${display}\``, () => {
        expect(testFct(input)).toBe(expected);
      });
    }
  });
}

describe('`isNumber` - detects any number type (primitive or boxed).', () => {
  runTestCases('✅ Matches both number values and boxed `Number` object types.', isNumber, true, [
    [new Number(10), 'new Number(10)'],
    [Object(10), 'Object(10)'],
    [Object(Infinity), 'Object(Infinity)'],
    [Object(Number.NaN), 'Object(Number.NaN)'],
    [10, '10'],
    [Infinity, 'Infinity'],
    [Number.NaN, 'Number.NaN']
  ]);

  runTestCases('❌ Rejects non-number types.', isNumber, false, [
    [new Boolean(false), 'new Boolean(false)'],
    [Object(true), 'Object(true)'],
    [false, 'false'],
    [true, 'true'],

    [new String('string'), "new String('string')"],
    [Object(''), "Object('')"],
    ['string', 'string'],
    ['', "''"],

    // [new Number(10), 'new Number(10)'],
    // [Object(10), 'Object(10)'],
    // [Object(Infinity), 'Object(Infinity)'],
    // [Object(Number.NaN), 'Object(Number.NaN)'],
    // [10, '10'],
    // [Infinity, 'Infinity'],
    // [Number.NaN, 'Number.NaN'],

    [Object(BigInt(10)), 'Object(BigInt(10))'],
    [BigInt(10), 'BigInt(10)'],

    [Object(Symbol('key')), "Object(Symbol('key'))"],
    [Symbol('key'), "Symbol('key')"],

    [null, 'null'],
    [undefined, 'undefined'],
    [function () {}, 'function () {}'],

    [Object.create(null), 'Object.create(null)'],
    [new Object(), 'new Object()'],
    [{}, '{}'],

    [[], '[]'],
    [/regex/, '/regex/'],
    [new Date(), 'new Date()'],
    [new Error(), 'new Error()'],
    [new Map(), 'new Map()'],
    [new Set(), 'new Set()'],
    [new WeakMap(), 'new WeakMap()'],
    [new WeakSet(), 'new WeakSet()'],

    [new (function Type() {})(), 'new (function Type() {})()'],
    [new (class Custom {})(), 'new (class Custom {})()']
  ]);
});

describe('`isNumberValue` - detects primitive number values only.', () => {
  runTestCases('✅ Matches exclusively number values (number primitive).', isNumberValue, true, [
    [10, '10'],
    [Infinity, 'Infinity'],
    [Number.NaN, 'Number.NaN']
  ]);

  runTestCases(
    '❌ Rejects boxed `Number` object types and non-number types.',
    isNumberValue,
    false,
    [
      [new Boolean(false), 'new Boolean(false)'],
      [Object(true), 'Object(true)'],
      [false, 'false'],
      [true, 'true'],

      [new String('string'), "new String('string')"],
      [Object(''), "Object('')"],
      ['string', 'string'],
      ['', "''"],

      [new Number(10), 'new Number(10)'],
      [Object(10), 'Object(10)'],
      [Object(Infinity), 'Object(Infinity)'],
      [Object(Number.NaN), 'Object(Number.NaN)'],
      // [10, '10'],
      // [Infinity, 'Infinity'],
      // [Number.NaN, 'Number.NaN'],

      [Object(BigInt(10)), 'Object(BigInt(10))'],
      [BigInt(10), 'BigInt(10)'],

      [Object(Symbol('key')), "Object(Symbol('key'))"],
      [Symbol('key'), "Symbol('key')"],

      [null, 'null'],
      [undefined, 'undefined'],
      [function () {}, 'function () {}'],

      [Object.create(null), 'Object.create(null)'],
      [new Object(), 'new Object()'],
      [{}, '{}'],

      [[], '[]'],
      [/regex/, '/regex/'],
      [new Date(), 'new Date()'],
      [new Error(), 'new Error()'],
      [new Map(), 'new Map()'],
      [new Set(), 'new Set()'],
      [new WeakMap(), 'new WeakMap()'],
      [new WeakSet(), 'new WeakSet()'],

      [new (function Type() {})(), 'new (function Type() {})()'],
      [new (class Custom {})(), 'new (class Custom {})()']
    ]
  );
});

describe('`isNumberObject` - detects boxed `Number` object types only.', () => {
  runTestCases(
    '✅ Matches exclusively boxed `Number` object types, both through `new Number(10)` and `Object(10)` alike.',
    isNumberObject,
    true,
    [
      [new Number(10), 'new Number(10)'],
      [Object(10), 'Object(10)'],
      [Object(Infinity), 'Object(Infinity)'],
      [Object(Number.NaN), 'Object(Number.NaN)']
    ]
  );

  runTestCases('❌ Rejects number values and non-number types.', isNumberObject, false, [
    [new Boolean(false), 'new Boolean(false)'],
    [Object(true), 'Object(true)'],
    [false, 'false'],
    [true, 'true'],

    [new String('string'), "new String('string')"],
    [Object(''), "Object('')"],
    ['string', 'string'],
    ['', "''"],

    // [new Number(10), 'new Number(10)'],
    // [Object(10), 'Object(10)'],
    // [Object(Infinity), 'Object(Infinity)'],
    // [Object(Number.NaN), 'Object(Number.NaN)'],
    [10, '10'],
    [Infinity, 'Infinity'],
    [Number.NaN, 'Number.NaN'],

    [Object(BigInt(10)), 'Object(BigInt(10))'],
    [BigInt(10), 'BigInt(10)'],

    [Object(Symbol('key')), "Object(Symbol('key'))"],
    [Symbol('key'), "Symbol('key')"],

    [null, 'null'],
    [undefined, 'undefined'],
    [function () {}, 'function () {}'],

    [Object.create(null), 'Object.create(null)'],
    [new Object(), 'new Object()'],
    [{}, '{}'],

    [[], '[]'],
    [/regex/, '/regex/'],
    [new Date(), 'new Date()'],
    [new Error(), 'new Error()'],
    [new Map(), 'new Map()'],
    [new Set(), 'new Set()'],
    [new WeakMap(), 'new WeakMap()'],
    [new WeakSet(), 'new WeakSet()'],

    [new (function Type() {})(), 'new (function Type() {})()'],
    [new (class Custom {})(), 'new (class Custom {})()']
  ]);
});
