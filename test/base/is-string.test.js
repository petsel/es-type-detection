import { describe, it, expect } from 'vitest';

import { isString, isStringValue, isBoxedString } from '../../src/base';

function runTestCases(label, testFct, expected, cases) {
  describe(label, () => {
    for (const [input, display] of cases) {
      it(`returns \`${String(expected)}\` for \`${display}\``, () => {
        expect(testFct(input)).toBe(expected);
      });
    }
  });
}

describe('`isString` - detects any string type (primitive or boxed).', () => {
  runTestCases('✅ Matches both string values and boxed `String` object types.', isString, true, [
    [new String('string'), "new String('string')"],
    [Object(''), "Object('')"],
    ['string', 'string'],
    ['', "''"]
  ]);

  runTestCases('❌ Rejects non-string types.', isString, false, [
    [new Boolean(false), 'new Boolean(false)'],
    [Object(true), 'Object(true)'],
    [false, 'false'],
    [true, 'true'],

    // [new String('string'), "new String('string')"],
    // [Object(''), "Object('')"],
    // ['string', 'string'],
    // ['', "''"],

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

describe('`isStringValue` - detects primitive string values only.', () => {
  runTestCases('✅ Matches exclusively string values (string primitives).', isStringValue, true, [
    ['string', 'string'],
    ['', "''"]
  ]);

  runTestCases(
    '❌ Rejects boxed `String` object types and non-string types.',
    isStringValue,
    false,
    [
      [new Boolean(false), 'new Boolean(false)'],
      [Object(true), 'Object(true)'],
      [false, 'false'],
      [true, 'true'],

      [new String('string'), "new String('string')"],
      [Object(''), "Object('')"],
      // ['string', 'string'],
      // ['', "''"],

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

describe('`isBoxedString` - detects boxed `String` object types only.', () => {
  runTestCases(
    "✅ Matches exclusively boxed `String` object types, both through `new String('')` and `Object('')` alike.",
    isBoxedString,
    true,
    [
      [new String('string'), "new String('string')"],
      [Object(''), "Object('')"]
    ]
  );

  runTestCases('❌ Rejects string values and non-string types.', isBoxedString, false, [
    [new Boolean(false), 'new Boolean(false)'],
    [Object(true), 'Object(true)'],
    [false, 'false'],
    [true, 'true'],

    // [new String('string'), "new String('string')"],
    // [Object(''), "Object('')"],
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
