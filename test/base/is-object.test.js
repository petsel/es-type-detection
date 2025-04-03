import { describe, it, expect } from 'vitest';

import { isObject, isObjectObject, isDictionaryObject } from '../../src/base';

function runTestCases(label, testFct, expected, cases) {
  describe(label, () => {
    for (const [input, display] of cases) {
      it(`returns \`${String(expected)}\` for \`${display}\``, () => {
        expect(testFct(input)).toBe(expected);
      });
    }
  });
}

describe('`isObject` - detects any object type. Function types are excluded alongside all primitive values.', () => {
  runTestCases(
    '✅ Returns true for object types and boxed object types (function types and the `null` value excluded).',
    isObject,
    true,
    [
      [{}, '{}'],
      [new Object(), 'new Object()'],
      [Object.create(null), 'Object.create(null)'],

      [new Boolean(false), 'new Boolean(false)'],
      [new Number(10), 'new Number(10)'],
      [new String(''), "new String('')"],
      [Object(false), 'Object(false)'],
      [Object(10), 'Object(10)'],
      [Object(''), "Object('')"],
      [Object(BigInt(10)), 'Object(BigInt(10))'],
      [Object(Symbol('key')), "Object(Symbol('key'))"],

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

  runTestCases(
    '❌ Returns false for non-object types (the `null` value included) and function types alike.',
    isObject,
    false,
    [
      [function () {}, 'function () {}'],

      [undefined, 'undefined'],
      [null, 'null'],

      [false, 'false'],
      [true, 'true'],
      [123, '123'],
      [0, '0'],
      ['', "''"],
      ['string', 'string'],
      [BigInt(10), 'BigInt(10)'],
      [Symbol('key'), "Symbol('key')"]
    ]
  );
});

describe('`isObjectObject` - detection of plain or pure objects.', () => {
  runTestCases(
    '✅ Matches object structures which are direct instances of the built-in `Object` type ("Null-prototype objects" excluded).',
    isObjectObject,
    true,
    [
      [{}, '{}'],
      [new Object(), 'new Object()']
    ]
  );

  runTestCases(
    '❌ Rejects all other object types (including "Null-prototype objects") as well as non-object values',
    isObjectObject,
    false,
    [
      [Object.create(null), 'Object.create(null)'],

      [new Boolean(false), 'new Boolean(false)'],
      [new Number(10), 'new Number(10)'],
      [new String(''), "new String('')"],
      [Object(false), 'Object(false)'],
      [Object(10), 'Object(10)'],
      [Object(''), "Object('')"],
      [Object(BigInt(10)), 'Object(BigInt(10))'],
      [Object(Symbol('key')), "Object(Symbol('key'))"],

      [[], '[]'],
      [/regex/, '/regex/'],
      [new Date(), 'new Date()'],
      [new Error(), 'new Error()'],
      [new Map(), 'new Map()'],
      [new Set(), 'new Set()'],
      [new WeakMap(), 'new WeakMap()'],
      [new WeakSet(), 'new WeakSet()'],

      [new (function Type() {})(), 'new (function Type() {})()'],
      [new (class Custom {})(), 'new (class Custom {})()'],

      [function () {}, 'function () {}'],

      [undefined, 'undefined'],
      [null, 'null'],

      [false, 'false'],
      [true, 'true'],
      [123, '123'],
      [0, '0'],
      ['', "''"],
      ['string', 'string'],
      [BigInt(10), 'BigInt(10)'],
      [Symbol('key'), "Symbol('key')"]
    ]
  );
});

describe('`isDictionaryObject` - detection of "Null-prototype"/"Prototype-less" objects.', () => {
  runTestCases(
    '✅ Matches object structures which are pure objects but do not have a prototype, hence "Null-prototype objects".',
    isDictionaryObject,
    true,
    [[Object.create(null), 'Object.create(null)']]
  );

  runTestCases(
    '❌ Rejects all other object types as well as non-object values.',
    isDictionaryObject,
    false,
    [
      [{}, '{}'],
      [new Object(), 'new Object()'],

      [new Boolean(false), 'new Boolean(false)'],
      [new Number(10), 'new Number(10)'],
      [new String(''), "new String('')"],
      [Object(false), 'Object(false)'],
      [Object(10), 'Object(10)'],
      [Object(''), "Object('')"],
      [Object(BigInt(10)), 'Object(BigInt(10))'],
      [Object(Symbol('key')), "Object(Symbol('key'))"],

      [[], '[]'],
      [/regex/, '/regex/'],
      [new Date(), 'new Date()'],
      [new Error(), 'new Error()'],
      [new Map(), 'new Map()'],
      [new Set(), 'new Set()'],
      [new WeakMap(), 'new WeakMap()'],
      [new WeakSet(), 'new WeakSet()'],

      [new (function Type() {})(), 'new (function Type() {})()'],
      [new (class Custom {})(), 'new (class Custom {})()'],

      [function () {}, 'function () {}'],

      [undefined, 'undefined'],
      [null, 'null'],

      [false, 'false'],
      [true, 'true'],
      [123, '123'],
      [0, '0'],
      ['', "''"],
      ['string', 'string'],
      [BigInt(10), 'BigInt(10)'],
      [Symbol('key'), "Symbol('key')"]
    ]
  );
});
