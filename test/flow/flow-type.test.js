import { describe, it, expect } from 'vitest';

import {
  isGenerator,
  isAsyncGenerator,
  isAnyGenerator,
  doesMatchThenable,
  doesMatchSafeThenable,
  isPromise
} from '../../src/flow';

import { testIndex } from '../function/__config';

const {
  generatorStatement,
  namedGeneratorExpression,
  asyncGeneratorStatement,
  namedAsyncGeneratorExpression
} = testIndex.candidate;

const nonAsyncGenerator_1 = generatorStatement();
const nonAsyncGenerator_2 = namedGeneratorExpression();
const asyncGenerator_1 = asyncGeneratorStatement();
const asyncGenerator_2 = namedAsyncGeneratorExpression();

/** @typedef {import('../../src/flow/typedef.js').Thenable} Thenable */

/** @type {Thenable} */
const idealThenable = {
  then(onFulfilled, onRejected) {
    try {
      const result = 'fulfilled from thenable';
      if (typeof onFulfilled === 'function') {
        onFulfilled(result);
      }
    } catch (err) {
      if (typeof onRejected === 'function') {
        onRejected(err);
      }
    }
  }
};
/** @type {Thenable} */
const minimumValidThenable = () => {};
minimumValidThenable.then = function (resolve) {
  resolve('✔️');
};
// Promise.resolve(minimumValidThenable).then(console.log); // ✔️

/** @type {Thenable} */
const validButUnsafeThenable = {
  async then(resolve) {
    resolve('this will confuse resolution');
  }
};
const awaitedType = Promise.resolve();

function runTestCases(label, testFct, expected, cases) {
  describe(label, () => {
    for (const [input, display] of cases) {
      it(`returns \`${String(expected)}\` for \`${display}\``, () => {
        expect(
          testFct(input),
          `failed at input \`${input?.toString?.()}\` :: did expect \`${expected}\` :: with display \`${display}\``
        ).toBe(expected);
      });
    }
  });
}

describe('From the "generator" kind of flow/control types ...', () => {
  describe('`isGenerator` - detects whether the passed `value` is exclusively a `Generator` type.', () => {
    runTestCases('✅ Matches any `Generator` instance.', isGenerator, true, [
      [nonAsyncGenerator_1, '(function* generatorStatement() {})()'],
      [nonAsyncGenerator_2, '(function* namedGeneratorExpression() {})()']
    ]);

    runTestCases('❌ Rejects any non `Generator` instance.', isGenerator, false, [
      [asyncGenerator_1, '(async function* asyncGeneratorStatement() {})()'],
      [asyncGenerator_2, '(async function* namedAsyncGeneratorExpression() {})()'],

      [generatorStatement, 'function* generatorStatement() {}'],
      [namedGeneratorExpression, 'function* namedGeneratorExpression() {}'],

      [asyncGeneratorStatement, 'async function* asyncGeneratorStatement() {}'],
      [namedAsyncGeneratorExpression, 'async function* namedAsyncGeneratorExpression() {}'],

      [
        idealThenable,
        "{ then(onFulfilled, onRejected) { try { onFulfilled('result'); } catch(err) { onRejected(err); } }"
      ],
      [minimumValidThenable, "{ then(resolve) { resolve('✔️'); } }"],
      [
        validButUnsafeThenable,
        "{ async then(resolve) { resolve('this will confuse resolution'); } }"
      ],

      [awaitedType, 'Promise.resolve()']
    ]);
  });

  describe('`isAsyncGenerator` - detects whether the passed `value` is exclusively an `AsyncGenerator` type.', () => {
    runTestCases('✅ Matches any `AsyncGenerator` instance.', isAsyncGenerator, true, [
      [asyncGenerator_1, '(async function* asyncGeneratorStatement() {})()'],
      [asyncGenerator_2, '(async function* namedAsyncGeneratorExpression() {})()']
    ]);

    runTestCases('❌ Rejects any non `AsyncGenerator` instance.', isAsyncGenerator, false, [
      [nonAsyncGenerator_1, '(function* generatorStatement() {})()'],
      [nonAsyncGenerator_2, '(function* namedGeneratorExpression() {})()'],

      [generatorStatement, 'function* generatorStatement() {}'],
      [namedGeneratorExpression, 'function* namedGeneratorExpression() {}'],

      [asyncGeneratorStatement, 'async function* asyncGeneratorStatement() {}'],
      [namedAsyncGeneratorExpression, 'async function* namedAsyncGeneratorExpression() {}'],

      [
        idealThenable,
        "{ then(onFulfilled, onRejected) { try { onFulfilled('result'); } catch(err) { onRejected(err); } }"
      ],
      [minimumValidThenable, "{ then(resolve) { resolve('✔️'); } }"],
      [
        validButUnsafeThenable,
        "{ async then(resolve) { resolve('this will confuse resolution'); } }"
      ],

      [awaitedType, 'Promise.resolve()']
    ]);
  });

  describe('`isAnyGenerator` - detects whether the passed `value` is either kind of generator type, async or non-async.', () => {
    runTestCases(
      '✅ Matches either kind of generator type, async or non-async.',
      isAnyGenerator,
      true,
      [
        [nonAsyncGenerator_1, '(function* generatorStatement() {})()'],
        [nonAsyncGenerator_2, '(function* namedGeneratorExpression() {})()'],

        [asyncGenerator_1, '(async function* asyncGeneratorStatement() {})()'],
        [asyncGenerator_2, '(async function* namedAsyncGeneratorExpression() {})()']
      ]
    );

    runTestCases(
      '❌ Rejects any object that is neither a non-async nor an async generator instance.',
      isAnyGenerator,
      false,
      [
        [generatorStatement, 'function* generatorStatement() {}'],
        [namedGeneratorExpression, 'function* namedGeneratorExpression() {}'],

        [asyncGeneratorStatement, 'async function* asyncGeneratorStatement() {}'],
        [namedAsyncGeneratorExpression, 'async function* namedAsyncGeneratorExpression() {}'],

        [
          idealThenable,
          "{ then(onFulfilled, onRejected) { try { onFulfilled('result'); } catch(err) { onRejected(err); } }"
        ],
        [minimumValidThenable, "{ then(resolve) { resolve('✔️'); } }"],
        [
          validButUnsafeThenable,
          "{ async then(resolve) { resolve('this will confuse resolution'); } }"
        ],

        [awaitedType, 'Promise.resolve()']
      ]
    );
  });
});

describe('From the "thenable" and "awaited/promised" kind of flow/control types ...', () => {
  describe('`doesMatchThenable` - executes a shallow check of whether the test candidate features the most basic `Thenable` behavior/trait.', () => {
    runTestCases(
      '✅ Matches any object which does not meet/satisfy the minimum `Thenable` behavior/contract.',
      doesMatchThenable,
      true,
      [
        [
          idealThenable,
          "{ then(onFulfilled, onRejected) { try { onFulfilled('result'); } catch(err) { onRejected(err); } }"
        ],
        [minimumValidThenable, "{ then(resolve) { resolve('✔️'); } }"],
        [
          validButUnsafeThenable,
          "{ async then(resolve) { resolve('this will confuse resolution'); } }"
        ],

        [awaitedType, 'Promise.resolve()']
      ]
    );

    runTestCases(
      '❌ Rejects any object which does not meet/satisfy the minimum `Thenable` behavior/contract.',
      doesMatchThenable,
      false,
      [
        [nonAsyncGenerator_1, '(function* generatorStatement() {})()'],
        [nonAsyncGenerator_2, '(function* namedGeneratorExpression() {})()'],

        [asyncGenerator_1, '(async function* asyncGeneratorStatement() {})()'],
        [asyncGenerator_2, '(async function* namedAsyncGeneratorExpression() {})()'],

        [generatorStatement, 'function* generatorStatement() {}'],
        [namedGeneratorExpression, 'function* namedGeneratorExpression() {}'],

        [asyncGeneratorStatement, 'async function* asyncGeneratorStatement() {}'],
        [namedAsyncGeneratorExpression, 'async function* namedAsyncGeneratorExpression() {}']
      ]
    );
  });

  describe('`doesMatchSafeThenable` - executes a slightly more strict check of whether the test candidate features the most basic `Thenable` behavior/trait.', () => {
    runTestCases(
      '✅ Matches any `Thenable` type which does implements a non-generator and non-async `then` method.',
      doesMatchSafeThenable,
      true,
      [
        [
          idealThenable,
          "{ then(onFulfilled, onRejected) { try { onFulfilled('result'); } catch(err) { onRejected(err); } }"
        ],
        [minimumValidThenable, "{ then(resolve) { resolve('✔️'); } }"],

        [awaitedType, 'Promise.resolve()']
      ]
    );

    runTestCases(
      '❌ Rejects any object which does not meet/satisfy the minimum `Thenable` behavior/contract or does implement `then` as generator or async function.',
      doesMatchSafeThenable,
      false,
      [
        [
          validButUnsafeThenable,
          "{ async then(resolve) { resolve('this will confuse resolution'); } }"
        ],

        [nonAsyncGenerator_1, '(function* generatorStatement() {})()'],
        [nonAsyncGenerator_2, '(function* namedGeneratorExpression() {})()'],

        [asyncGenerator_1, '(async function* asyncGeneratorStatement() {})()'],
        [asyncGenerator_2, '(async function* namedAsyncGeneratorExpression() {})()'],

        [generatorStatement, 'function* generatorStatement() {}'],
        [namedGeneratorExpression, 'function* namedGeneratorExpression() {}'],

        [asyncGeneratorStatement, 'async function* asyncGeneratorStatement() {}'],
        [namedAsyncGeneratorExpression, 'async function* namedAsyncGeneratorExpression() {}']
      ]
    );
  });

  describe('`isPromise` - detects whether the passed `value` is exclusively a `Promise` type.', () => {
    runTestCases('✅ Matches any `Promise` instance.', isPromise, true, [
      [awaitedType, 'Promise.resolve()']
    ]);

    runTestCases('❌ Rejects any non `Promise` instance.', isPromise, false, [
      [
        idealThenable,
        "{ then(onFulfilled, onRejected) { try { onFulfilled('result'); } catch(err) { onRejected(err); } }"
      ],
      [minimumValidThenable, "{ then(resolve) { resolve('✔️'); } }"],
      [
        validButUnsafeThenable,
        "{ async then(resolve) { resolve('this will confuse resolution'); } }"
      ],

      [nonAsyncGenerator_1, '(function* generatorStatement() {})()'],
      [nonAsyncGenerator_2, '(function* namedGeneratorExpression() {})()'],

      [asyncGenerator_1, '(async function* asyncGeneratorStatement() {})()'],
      [asyncGenerator_2, '(async function* namedAsyncGeneratorExpression() {})()'],

      [generatorStatement, 'function* generatorStatement() {}'],
      [namedGeneratorExpression, 'function* namedGeneratorExpression() {}'],

      [asyncGeneratorStatement, 'async function* asyncGeneratorStatement() {}'],
      [namedAsyncGeneratorExpression, 'async function* namedAsyncGeneratorExpression() {}']
    ]);
  });
});
