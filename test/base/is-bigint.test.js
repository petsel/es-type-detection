import { describe, it, expect } from 'vitest';

import { isBigInt, isBigIntValue, isBoxedBigInt } from '../../src/base';

function runTestCases(label, testFct, expected, cases) {
  describe(label, () => {
    for (const [input, display] of cases) {
      it(`returns \`${String(expected)}\` for \`${display}\``, () => {
        expect(testFct(input)).toBe(expected);
      });
    }
  });
}

describe('`isBigInt` - detects any bigint type (primitive or boxed).', () => {
  runTestCases('✅ Matches both bigint values and boxed `BigInt` object types.', isBigInt, true, [
    [Object(BigInt(10)), 'Object(BigInt(10))'],
    [BigInt(10), 'BigInt(10)']
  ]);

  runTestCases('❌ Rejects non-bigint types.', isBigInt, false, [
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
    [10, '10'],
    [Infinity, 'Infinity'],
    [Number.NaN, 'Number.NaN'],

    // [Object(BigInt(10)), 'Object(BigInt(10))'],
    // [BigInt(10), 'BigInt(10)'],

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

describe('`isBigIntValue` - detects primitive bigint values only.', () => {
  runTestCases('✅ Matches exclusively bigint values (bigint primitive).', isBigIntValue, true, [
    [BigInt(10), 'BigInt(10)']
  ]);

  runTestCases(
    '❌ Rejects boxed `Bigint` object types and non-bigint types.',
    isBigIntValue,
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
      [10, '10'],
      [Infinity, 'Infinity'],
      [Number.NaN, 'Number.NaN'],

      [Object(BigInt(10)), 'Object(BigInt(10))'],
      // [BigInt(10), 'BigInt(10)'],

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

describe('`isBoxedBigInt` - detects boxed `Bigint` object types only.', () => {
  runTestCases(
    '✅ Matches exclusively boxed `Bigint` object types, e.g. achieved through `Object(BigInt(10))`.',
    isBoxedBigInt,
    true,
    [[Object(BigInt(10)), 'Object(BigInt(10))']]
  );

  runTestCases('❌ Rejects bigint values and non-bigint types.', isBoxedBigInt, false, [
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
    [10, '10'],
    [Infinity, 'Infinity'],
    [Number.NaN, 'Number.NaN'],

    // [Object(BigInt(10)), 'Object(BigInt(10))'],
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
