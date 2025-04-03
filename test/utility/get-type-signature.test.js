import { describe, it, expect } from 'vitest';

import { getTypeSignature } from '../../src/utility';

function runTestCases(label, cases) {
  describe(label, () => {
    for (const [input, display, expected] of cases) {
      it(`returns "${expected}" for \`${display}\``, () => {
        expect(getTypeSignature(input)).toBe(expected);
      });
    }
  });
}

describe('`getTypeSignature` - gets the internal type signature of any passed value.', () => {
  it('returns `undefined` when no argument is passed', () => {
    expect(getTypeSignature()).toBeUndefined();
  });

  it('returns "[object Undefined]" when undefined is passed explicitly', () => {
    expect(getTypeSignature(undefined)).toBe('[object Undefined]');
    expect(getTypeSignature(void 0)).toBe('[object Undefined]');
  });

  runTestCases('🧱 Primitives & Boxed Primitives', [
    [null, 'null', '[object Null]'],
    [true, 'true', '[object Boolean]'],
    [100, '100', '[object Number]'],
    ['', '', '[object String]'],
    [Object(true), 'Object(true)', '[object Boolean]'],
    [Object(100), 'Object(100)', '[object Number]'],
    [Object(''), "Object('')", '[object String]'],
    [Symbol(), 'Symbol()', '[object Symbol]'],
    [BigInt(42), 'BigInt(42)', '[object BigInt]'],
    [Object(Symbol()), 'Object(Symbol())', '[object Symbol]'],
    [Object(BigInt(42)), 'Object(BigInt(42))', '[object BigInt]']
  ]);

  runTestCases('⚙️ Built-ins and Objects', [
    [Object, 'Object', '[object Function]'],
    [{}, '{}', '[object Object]'],
    [[], '[]', '[object Array]'],
    [/regex/, '/regex/', '[object RegExp]'],
    [new Date(), 'new Date()', '[object Date]'],
    [new Error(), 'new Error()', '[object Error]'],
    [new SyntaxError(), 'new SyntaxError()', '[object Error]'],
    [new TypeError(), 'new TypeError()', '[object Error]'],
    [new ReferenceError(), 'new ReferenceError()', '[object Error]'],
    [new URIError(), 'new URIError()', '[object Error]'],
    [new EvalError(), 'new EvalError()', '[object Error]'],
    [new RangeError(), 'new RangeError()', '[object Error]'],
    [new AggregateError([]), 'new AggregateError([])', '[object Error]'],
    [Promise.resolve(), 'Promise.resolve()', '[object Promise]'],
    [new Map(), 'new Map()', '[object Map]'],
    [new Set(), 'new Set()', '[object Set]'],
    [new WeakMap(), 'new WeakMap()', '[object WeakMap]'],
    [new WeakSet(), 'new WeakSet()', '[object WeakSet]'],
    [new Int8Array(), 'new Int8Array()', '[object Int8Array]'],
    [new Uint8Array(), 'new Uint8Array()', '[object Uint8Array]'],
    [new Float32Array(), 'new Float32Array()', '[object Float32Array]'],
    [new ArrayBuffer(), 'new ArrayBuffer()', '[object ArrayBuffer]'],
    [Math, 'Math', '[object Math]'],
    [JSON, 'JSON', '[object JSON]'],
    [Reflect, 'Reflect', '[object Reflect]'],
    [Atomics, 'Atomics', '[object Atomics]']
  ]);

  runTestCases('🧪 Special & Symbol.toStringTag spoofed objects', [
    [Function.prototype, 'Function.prototype', '[object Function]'],
    [
      (function () {
        return arguments;
      })(),
      '(function () { return arguments; })()',
      '[object Arguments]'
    ],
    [{ [Symbol.toStringTag]: 'Array' }, "{ [Symbol.toStringTag]: 'Array' }", '[object Array]'],
    [
      { [Symbol.toStringTag]: 'CustomTag' },
      "{ [Symbol.toStringTag]: 'CustomTag' }",
      '[object CustomTag]'
    ]
  ]);
});
