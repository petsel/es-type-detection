import { describe, it, expect } from 'vitest';

import { isSymbol, isSymbolValue, isSymbolObject } from '../../src/base';

function runTestCases(label, testFct, expected, cases) {
  describe(label, () => {
    for (const [input, display] of cases) {
      it(`returns \`${String(expected)}\` for \`${display}\``, () => {
        expect(testFct(input)).toBe(expected);
      });
    }
  });
}

describe('`isSymbol` - detects any symbol type (primitive or boxed).', () => {
  runTestCases('✅ Matches both symbol values and boxed `Symbol` object types.', isSymbol, true, [
    [Object(Symbol('key')), "Object(Symbol('key'))"],
    [Symbol('key'), "Symbol('key')"]
  ]);

  runTestCases('❌ Rejects non-symbol types.', isSymbol, false, [
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
    [BigInt(10), 'BigInt(10)'],

    // [Object(Symbol('key')), "Object(Symbol('key'))"],
    // [Symbol('key'), "Symbol('key')"],

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

describe('`isSymbolValue` - detects primitive symbol values only.', () => {
  runTestCases('✅ Matches exclusively symbol values (symbol primitive).', isSymbolValue, true, [
    [Symbol('key'), "Symbol('key')"]
  ]);

  runTestCases(
    '❌ Rejects boxed `Symbol` object types and non-symbol types.',
    isSymbolValue,
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
      [BigInt(10), 'BigInt(10)'],

      [Object(Symbol('key')), "Object(Symbol('key'))"],
      // [Symbol('key'), "Symbol('key')"],

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

describe('`isSymbolObject` - detects boxed `Symbol` object types only.', () => {
  runTestCases(
    "✅ Matches exclusively boxed `Symbol` object types, e.g. achieved through `Object(Symbol('key'))`.",
    isSymbolObject,
    true,
    [[Object(Symbol('key')), "Object(Symbol('key'))"]]
  );

  runTestCases('❌ Rejects symbol values and non-symbol types.', isSymbolObject, false, [
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
    [BigInt(10), 'BigInt(10)'],

    // [Object(Symbol('key')), "Object(Symbol('key'))"],
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
