import { describe, it, expect } from 'vitest';

import { hasStableTypeIdentity, defineStableType } from '../../src/utility';

import {
  asyncGeneratorFunctionExpression,
  // AsyncGeneratorFunction,
  asyncGeneratorInstance,
  asyncGeneratorPrototype,
  generatorFunctionExpression,
  // GeneratorFunction,
  generatorInstance,
  generatorPrototype,
  asyncArrowFunctionExpression,
  asyncNonArrowFunctionExpression,
  // AsyncFunction,
  conciseGenericMethod,
  spoofedArrowFunction
  // MyClass,
  // MySubclass,
  // TaggedClass,
  // ImplicitlyTaggedSubclass,
  // ExplicitlyTaggedSubclass
} from './__config';

export class MyClass {}
export class MySubclass extends MyClass {}

export class TaggedClass {
  get [Symbol.toStringTag]() {
    return 'TaggedClass';
  }
}
export class ImplicitlyTaggedSubclass extends TaggedClass {}

export class ExplicitlyTaggedSubclass extends TaggedClass {
  get [Symbol.toStringTag]() {
    return 'ExplicitlyTaggedSubclass';
  }
}

function runTestCases(label, cases) {
  describe(label, () => {
    for (const [input, display, expected] of cases) {
      // console.log({ input, expected, display, label });
      it(`returns ${(expected === true && '✅') || '❌'} \`${expected}\` for \`${display}\``, () => {
        expect(
          hasStableTypeIdentity(input),
          `failed at input \`${input?.toString?.()}\` :: did expect \`${expected}\` :: with display \`${display}\``
        ).toStrictEqual(expected);
      });
    }
  });
}

describe(
  '`defineStableType` - takes a constructor function, changes some of the' +
    " function's related property descriptors according to additionally passed name" +
    ' and type string-parameters and returns the very same passed constructor function.',
  () => {
    it('throws an error in case its first `constructor` parameter is not a function type.', () => {
      expect(() => defineStableType(true, 'Foo', 'Foo')).toThrowError(
        new TypeError(
          'The provided "constructor" parameter has to be a constructable function type.'
        )
      );
      expect(() => defineStableType('', 'Foo', 'Foo')).toThrowError(
        new TypeError(
          'The provided "constructor" parameter has to be a constructable function type.'
        )
      );
      expect(() => defineStableType(() => {}, 'Foo', 'Foo')).toThrowError(
        new TypeError(
          'The provided "constructor" parameter has to be a constructable function type.'
        )
      );
      expect(() => defineStableType(MyClass, 'Foo', 'Foo')).not.toThrow();
      expect(() => defineStableType(MySubclass, 'Foo', 'Foo')).not.toThrow();
    });
  }
);
