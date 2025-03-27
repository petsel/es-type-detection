import { describe, it, expect } from 'vitest';
import { exposeTypeSignature } from '../../src/utility';

describe('The utility function ...', () => {
  describe('... `exposeTypeSignature`...', () => {
    it(
      '... should return the `undefined` value in case' +
        ' the sole expected parameter has been omitted.',
      () => {
        expect(exposeTypeSignature()).toStrictEqual(undefined);

        expect(exposeTypeSignature(void 0)).not.toStrictEqual(undefined);
        expect(exposeTypeSignature(undefined)).not.toStrictEqual(undefined);
      }
    );
    it(
      '... should return the passed value’s internal type' +
        "signature (e.g., `'[object Array]'` for an `Array` instance)",
      () => {
        expect(exposeTypeSignature(undefined)).toBe('[object Undefined]');
        expect(exposeTypeSignature(void 0)).toBe('[object Undefined]');
        expect(exposeTypeSignature(null)).toBe('[object Null]');

        expect(exposeTypeSignature(true)).toBe('[object Boolean]');
        expect(exposeTypeSignature(100)).toBe('[object Number]');
        expect(exposeTypeSignature('')).toBe('[object String]');

        expect(exposeTypeSignature(Symbol())).toBe('[object Symbol]');
        expect(exposeTypeSignature(BigInt(100_000_000_000))).toBe(
          '[object BigInt]'
        );

        expect(exposeTypeSignature(String)).toBe('[object Function]');

        expect(exposeTypeSignature({})).toBe('[object Object]');
        expect(exposeTypeSignature([])).toBe('[object Array]');

        expect(exposeTypeSignature(/\s+/)).toBe('[object RegExp]');
        expect(exposeTypeSignature(new Date())).toBe('[object Date]');

        expect(exposeTypeSignature(new Error())).toBe('[object Error]');
      }
    );
    it(
      "... is expected of returning `'[object Error]'` for every passed `Error` instance" +
        ' which includes every sub-typed built-in error-type like `SyntaxError` or `TypeError`.',
      () => {
        expect(exposeTypeSignature(new SyntaxError())).toBe('[object Error]');
        expect(exposeTypeSignature(new TypeError())).toBe('[object Error]');
        expect(exposeTypeSignature(new ReferenceError())).toBe(
          '[object Error]'
        );

        expect(exposeTypeSignature(new URIError())).toBe('[object Error]');
        expect(exposeTypeSignature(new EvalError())).toBe('[object Error]');
        expect(exposeTypeSignature(new RangeError())).toBe('[object Error]');
        expect(exposeTypeSignature(new AggregateError([]))).toBe(
          '[object Error]'
        );
      }
    );
  });
});
