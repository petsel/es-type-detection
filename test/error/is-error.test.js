import { describe, it, expect } from 'vitest';

import {
  isError,
  isErrorError,
  isEvalError,
  isRangeError,
  isReferenceError,
  isSyntaxError,
  isTypeError,
  isURIError,
  isAggregateError
} from '../../src/error';

function runTestCases(label, testFct, expected, cases) {
  describe(label, () => {
    for (const [input, display] of cases) {
      it(`returns \`${String(expected)}\` for \`${display}\``, () => {
        expect(testFct(input)).toBe(expected);
      });
    }
  });
}

describe('`isError` - detects any `Error` instance (built-in or custom).', () => {
  runTestCases('✅ Matches any built-in or custom error instance.', isError, true, [
    [new Error(), 'new Error()'],
    [new EvalError(), 'new EvalError()'],
    [new RangeError(), 'new RangeError()'],
    [new ReferenceError(), 'new ReferenceError()'],
    [new SyntaxError(), 'new SyntaxError()'],
    [new TypeError(), 'new TypeError()'],
    [new URIError(), 'new URIError()'],
    [new AggregateError([]), 'new AggregateError([])'],
    [new (class CustomError extends Error {})(), 'CustomError extends Error']
  ]);

  runTestCases('❌ Rejects non-error values', isError, false, [
    [undefined, 'undefined'],
    [null, 'null'],
    [123, '123'],
    ['error', "'error'"],
    [{}, '{}'],
    [[], '[]'],
    [() => {}, '() => {}'],
    [new Date(), 'new Date()']
  ]);
});

describe('`isErrorError` - matches exclusively direct instances of `Error`.', () => {
  runTestCases('✅ Matches only `new Error()`', isErrorError, true, [[new Error(), 'new Error()']]);

  runTestCases(
    '❌ Rejects instances of any error subclasses and other non-error types.',
    isErrorError,
    false,
    [
      // [new Error(), 'new Error()'],
      [new EvalError(), 'new EvalError()'],
      [new RangeError(), 'new RangeError()'],
      [new ReferenceError(), 'new ReferenceError()'],
      [new SyntaxError(), 'new SyntaxError()'],
      [new TypeError(), 'new TypeError()'],
      [new URIError(), 'new URIError()'],
      [new AggregateError([]), 'new AggregateError([])'],
      [new (class CustomError extends Error {})(), 'CustomError extends Error'],

      [undefined, 'undefined'],
      [null, 'null'],
      [123, '123'],
      ['error', "'error'"],
      [{}, '{}'],
      [[], '[]'],
      [() => {}, '() => {}'],
      [new Date(), 'new Date()']
    ]
  );
});

describe('Built-in subclass error type detection', () => {
  describe('`isEvalError` - matches exclusively direct instances of `EvalError`.', () => {
    runTestCases('✅ Matches only `new EvalError()`', isEvalError, true, [
      [new EvalError(), 'new EvalError()']
    ]);

    runTestCases(
      '❌ Rejects instances of any error class other than `EvalError` and other non-error types.',
      isEvalError,
      false,
      [
        [new Error(), 'new Error()'],
        // [new EvalError(), 'new EvalError()'],
        [new RangeError(), 'new RangeError()'],
        [new ReferenceError(), 'new ReferenceError()'],
        [new SyntaxError(), 'new SyntaxError()'],
        [new TypeError(), 'new TypeError()'],
        [new URIError(), 'new URIError()'],
        [new AggregateError([]), 'new AggregateError([])'],
        [new (class CustomError extends Error {})(), 'CustomError extends Error'],

        [undefined, 'undefined'],
        [null, 'null'],
        [123, '123'],
        ['error', "'error'"],
        [{}, '{}'],
        [[], '[]'],
        [() => {}, '() => {}'],
        [new Date(), 'new Date()']
      ]
    );
  });
  describe('`isRangeError` - matches exclusively direct instances of `RangeError`.', () => {
    runTestCases('✅ Matches only `new RangeError()`', isRangeError, true, [
      [new RangeError(), 'new RangeError()']
    ]);

    runTestCases(
      '❌ Rejects instances of any error class other than `RangeError` and other non-error types.',
      isRangeError,
      false,
      [
        [new Error(), 'new Error()'],
        [new EvalError(), 'new EvalError()'],
        // [new RangeError(), 'new RangeError()'],
        [new ReferenceError(), 'new ReferenceError()'],
        [new SyntaxError(), 'new SyntaxError()'],
        [new TypeError(), 'new TypeError()'],
        [new URIError(), 'new URIError()'],
        [new AggregateError([]), 'new AggregateError([])'],
        [new (class CustomError extends Error {})(), 'CustomError extends Error'],

        [undefined, 'undefined'],
        [null, 'null'],
        [123, '123'],
        ['error', "'error'"],
        [{}, '{}'],
        [[], '[]'],
        [() => {}, '() => {}'],
        [new Date(), 'new Date()']
      ]
    );
  });
  describe('`isReferenceError` - matches exclusively direct instances of `ReferenceError`.', () => {
    runTestCases('✅ Matches only `new ReferenceError()`', isReferenceError, true, [
      [new ReferenceError(), 'new ReferenceError()']
    ]);

    runTestCases(
      '❌ Rejects instances of any error class other than `ReferenceError` and other non-error types.',
      isReferenceError,
      false,
      [
        [new Error(), 'new Error()'],
        [new EvalError(), 'new EvalError()'],
        [new RangeError(), 'new RangeError()'],
        // [new ReferenceError(), 'new ReferenceError()'],
        [new SyntaxError(), 'new SyntaxError()'],
        [new TypeError(), 'new TypeError()'],
        [new URIError(), 'new URIError()'],
        [new AggregateError([]), 'new AggregateError([])'],
        [new (class CustomError extends Error {})(), 'CustomError extends Error'],

        [undefined, 'undefined'],
        [null, 'null'],
        [123, '123'],
        ['error', "'error'"],
        [{}, '{}'],
        [[], '[]'],
        [() => {}, '() => {}'],
        [new Date(), 'new Date()']
      ]
    );
  });
  describe('`isSyntaxError` - matches exclusively direct instances of `SyntaxError`.', () => {
    runTestCases('✅ Matches only `new SyntaxError()`', isSyntaxError, true, [
      [new SyntaxError(), 'new SyntaxError()']
    ]);

    runTestCases(
      '❌ Rejects instances of any error class other than `SyntaxError` and other non-error types.',
      isSyntaxError,
      false,
      [
        [new Error(), 'new Error()'],
        [new EvalError(), 'new EvalError()'],
        [new RangeError(), 'new RangeError()'],
        [new ReferenceError(), 'new ReferenceError()'],
        // [new SyntaxError(), 'new SyntaxError()'],
        [new TypeError(), 'new TypeError()'],
        [new URIError(), 'new URIError()'],
        [new AggregateError([]), 'new AggregateError([])'],
        [new (class CustomError extends Error {})(), 'CustomError extends Error'],

        [undefined, 'undefined'],
        [null, 'null'],
        [123, '123'],
        ['error', "'error'"],
        [{}, '{}'],
        [[], '[]'],
        [() => {}, '() => {}'],
        [new Date(), 'new Date()']
      ]
    );
  });
  describe('`isTypeError` - matches exclusively direct instances of `TypeError`.', () => {
    runTestCases('✅ Matches only `new TypeError()`', isTypeError, true, [
      [new TypeError(), 'new TypeError()']
    ]);

    runTestCases(
      '❌ Rejects instances of any error class other than `TypeError` and other non-error types.',
      isTypeError,
      false,
      [
        [new Error(), 'new Error()'],
        [new EvalError(), 'new EvalError()'],
        [new RangeError(), 'new RangeError()'],
        [new ReferenceError(), 'new ReferenceError()'],
        [new SyntaxError(), 'new SyntaxError()'],
        // [new TypeError(), 'new TypeError()'],
        [new URIError(), 'new URIError()'],
        [new AggregateError([]), 'new AggregateError([])'],
        [new (class CustomError extends Error {})(), 'CustomError extends Error'],

        [undefined, 'undefined'],
        [null, 'null'],
        [123, '123'],
        ['error', "'error'"],
        [{}, '{}'],
        [[], '[]'],
        [() => {}, '() => {}'],
        [new Date(), 'new Date()']
      ]
    );
  });
  describe('`isURIError` - matches exclusively direct instances of `URIError`.', () => {
    runTestCases('✅ Matches only `new URIError()`', isURIError, true, [
      [new URIError(), 'new URIError()']
    ]);

    runTestCases(
      '❌ Rejects instances of any error class other than `URIError` and other non-error types.',
      isURIError,
      false,
      [
        [new Error(), 'new Error()'],
        [new EvalError(), 'new EvalError()'],
        [new RangeError(), 'new RangeError()'],
        [new ReferenceError(), 'new ReferenceError()'],
        [new SyntaxError(), 'new SyntaxError()'],
        [new TypeError(), 'new TypeError()'],
        // [new URIError(), 'new URIError()'],
        [new AggregateError([]), 'new AggregateError([])'],
        [new (class CustomError extends Error {})(), 'CustomError extends Error'],

        [undefined, 'undefined'],
        [null, 'null'],
        [123, '123'],
        ['error', "'error'"],
        [{}, '{}'],
        [[], '[]'],
        [() => {}, '() => {}'],
        [new Date(), 'new Date()']
      ]
    );
  });
  describe('`isAggregateError` - matches exclusively direct instances of `AggregateError`.', () => {
    runTestCases('✅ Matches only `new AggregateError([])`', isAggregateError, true, [
      [new AggregateError([]), 'new AggregateError([])']
    ]);

    runTestCases(
      '❌ Rejects instances of any error class other than `AggregateError` and other non-error types.',
      isAggregateError,
      false,
      [
        [new Error(), 'new Error()'],
        [new EvalError(), 'new EvalError()'],
        [new RangeError(), 'new RangeError()'],
        [new ReferenceError(), 'new ReferenceError()'],
        [new SyntaxError(), 'new SyntaxError()'],
        [new TypeError(), 'new TypeError()'],
        [new URIError(), 'new URIError()'],
        // [new AggregateError([]), 'new AggregateError([])'],
        [new (class CustomError extends Error {})(), 'CustomError extends Error'],

        [undefined, 'undefined'],
        [null, 'null'],
        [123, '123'],
        ['error', "'error'"],
        [{}, '{}'],
        [[], '[]'],
        [() => {}, '() => {}'],
        [new Date(), 'new Date()']
      ]
    );
  });
});

// Additional edge cases for thorough coverage

describe('Extended `isError` edge-case coverage', () => {
  runTestCases('✅ Matches unconventional but valid error instances.', isError, true, [
    // - this one gets covered by the additionally introduced
    //   `hasMatchingErrorPrototype` check, already in its non-recursive form.
    [Object.create(Error.prototype), 'Object.create(Error.prototype)'],
    [
      new (class CustomSyntaxError extends SyntaxError {})(),
      'CustomSyntaxError extends SyntaxError'
    ],
    // - this one gets covered only by recursive ping-pong
    //   calls of `hasMatchingErrorPrototype` and `isError`.
    [
      (() => {
        function LegacyError() {}
        LegacyError.prototype = Object.create(Error.prototype);
        LegacyError.prototype.name = 'LegacyError';
        return new LegacyError();
      })(),
      'LegacyError ES3-style'
    ],
    [
      (() => {
        class NullProtoError extends Error {}
        Object.setPrototypeOf(NullProtoError.prototype, null);
        return new NullProtoError('null-proto');
      })(),
      'Error subclass with null prototype'
    ],
    [new AggregateError([], 'fail', { cause: new Error('inner') }), 'AggregateError with metadata']
  ]);

  runTestCases('❌ Still rejects structurally similar but invalid error values.', isError, false, [
    [Object.create(null), 'Object.create(null)'],
    [{ name: 'Error', message: 'fake' }, 'Plain object with name/message'],
    [Error, 'Error constructor'],
    [() => new Error(), 'function that returns Error']
  ]);
});
