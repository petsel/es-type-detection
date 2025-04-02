import { describe, it, expect } from 'vitest';

import { isFunction } from '../../src/base';

describe('isFunction', () => {
  describe('✅ True Positives: valid function types', () => {
    it('detects regular functions', () => {
      expect(isFunction(function () {})).toBe(true);
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(async function () {})).toBe(true);
      expect(isFunction(function* () {})).toBe(true);
    });

    it('detects built-in/native functions', () => {
      expect(isFunction(Array.isArray)).toBe(true);
      expect(isFunction(Math.max)).toBe(true);
      expect(isFunction(setTimeout)).toBe(true);
    });

    it('detects class constructors as functions', () => {
      class MyClass {}
      expect(isFunction(MyClass)).toBe(true);
    });

    it('detects bound functions', () => {
      const bound = function (x) {
        return x;
      }.bind(null, 42);
      expect(isFunction(bound)).toBe(true);
    });

    it('detects function proxies with full function trap', () => {
      const proxy = new Proxy(() => {}, {
        apply: (target, thisArg, args) => target.apply(thisArg, args)
      });
      expect(isFunction(proxy)).toBe(true);
    });
  });

  describe('❌ True Negatives: definitely not functions', () => {
    it('rejects primitives and non-functions', () => {
      expect(isFunction(undefined)).toBe(false);
      expect(isFunction(null)).toBe(false);
      expect(isFunction(0)).toBe(false);
      expect(isFunction(NaN)).toBe(false);
      expect(isFunction('string')).toBe(false);
      expect(isFunction(false)).toBe(false);
      expect(isFunction(Symbol('x'))).toBe(false);
    });

    it('rejects structured objects and arrays', () => {
      expect(isFunction({})).toBe(false);
      expect(isFunction([])).toBe(false);
      expect(isFunction(/regex/)).toBe(false);
      expect(isFunction(new Date())).toBe(false);
    });
  });

  describe('⚠️ False Positives: objects that mimic functions', () => {
    it('rejects object with call/apply/toString methods', () => {
      const fakeFn = {
        call: () => {},
        apply: () => {},
        toString: () => 'function () {}'
      };
      expect(isFunction(fakeFn)).toBe(false);
    });

    it('rejects class instances with call/apply properties', () => {
      class FakeCallable {
        call() {}
        apply() {}
      }
      expect(isFunction(new FakeCallable())).toBe(false);
    });

    it('rejects proxies that lack proper function internals', () => {
      const proxy = new Proxy(
        {},
        {
          get: (target, prop) => {
            if (prop === 'call' || prop === 'apply') return () => {};
          }
        }
      );
      expect(isFunction(proxy)).toBe(false);
    });
  });

  describe('🧪 Realm and host environment edge cases', () => {
    it('detects Function.prototype (still a function)', () => {
      expect(isFunction(Function.prototype)).toBe(true);
    });

    // // This is a placeholder, actual cross-realm iframe/vm function test should be done
    // it.skip('would detect cross-realm functions (if setup)', () => {
    //   expect(isFunction(Function)).toBe(true); // substitute for real test
    // });

    it('rejects overridden typeof return values', () => {
      const tricky = {
        call: () => {},
        apply: () => {},
        toString: () => '[object Function]',
        [Symbol.toStringTag]: 'Function'
      };
      expect(isFunction(tricky)).toBe(false);
    });
  });
});
