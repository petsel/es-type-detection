import { describe, it, expect } from 'vitest';

import { isBoolean, isBooleanValue, isBooleanObject } from '../../src/base';

function runTestCases(label, testFct, expected, cases) {
  describe(label, () => {
    for (const [input, display] of cases) {
      it(`returns \`${String(expected)}\` for \`${display}\``, () => {
        expect(testFct(input)).toBe(expected);
      });
    }
  });
}

describe('`isBoolean` - detects any boolean type (primitive or boxed).', () => {
  runTestCases(
    '✅ Matches both boolean values and boxed `Boolean` object types.',
    isBoolean,
    true,
    [
      [new Boolean(false), 'new Boolean(false)'],
      [Object(true), 'Object(true)'],
      [false, 'false'],
      [true, 'true']
    ]
  );

  runTestCases('❌ Rejects non-boolean types.', isBoolean, false, [
    // [new Boolean(false), 'new Boolean(false)'],
    // [Object(true), 'Object(true)'],
    // [false, 'false'],
    // [true, 'true'],

    [new String('string'), "new String('string')"],
    [Object(''), "Object('')"],
    ['string', 'string'],
    ['', "''"],

    [new Number(10), 'new Number(10)'],
    [Object(10), 'Object(10)'],
    [Object(Infinity), 'Object(Infinity)'],
    [Object(Number.NaN), 'Object(Number.NaN)'],
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

describe('`isBooleanValue` - detects primitive boolean values only.', () => {
  runTestCases('✅ Matches exclusively boolean values (boolean primitive).', isBooleanValue, true, [
    [false, 'false'],
    [true, 'true']
  ]);

  runTestCases(
    '❌ Rejects boxed `Boolean` object types and non-boolean types.',
    isBooleanValue,
    false,
    [
      [new Boolean(false), 'new Boolean(false)'],
      [Object(true), 'Object(true)'],
      // [false, 'false'],
      // [true, 'true'],

      [new String('string'), "new String('string')"],
      [Object(''), "Object('')"],
      ['string', 'string'],
      ['', "''"],

      [new Number(10), 'new Number(10)'],
      [Object(10), 'Object(10)'],
      [Object(Infinity), 'Object(Infinity)'],
      [Object(Number.NaN), 'Object(Number.NaN)'],
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
    ]
  );
});

describe('`isBooleanObject` - detects boxed `Boolean` object types only.', () => {
  runTestCases(
    '✅ Matches exclusively boxed `Boolean` object types, both through `new Boolean(false)` and `Object(false)` alike.',
    isBooleanObject,
    true,
    [
      [new Boolean(false), 'new Boolean(false)'],
      [Object(true), 'Object(true)']
    ]
  );

  runTestCases('❌ Rejects boolean values and non-boolean types.', isBooleanObject, false, [
    // [new Boolean(false), 'new Boolean(false)'],
    // [Object(true), 'Object(true)'],
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
