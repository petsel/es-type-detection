import { describe, it, expect } from 'vitest';

import { defineStableTypeIdentity, getTrustedType } from '../../src/type-identity';

import {
  asyncGeneratorFunctionExpression,
  // AsyncGeneratorFunction,
  generatorFunctionExpression,
  // GeneratorFunction,
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
} from '../utility/__config';

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

/*
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
*/

describe('`getTrustedType`', () => {
  const getTrustedFooType = getTrustedType.bind(null, 'Foo');
  const getTrustedBarType = getTrustedType.bind(null, 'Bar');

  it('is a helper function which returns the first one of its bound arguments.', () => {
    expect(getTrustedFooType()).toStrictEqual('Foo');
    expect(getTrustedBarType()).toStrictEqual('Bar');
  });
});

describe(
  "`defineStableTypeIdentity` - takes a constructor function, changes some of the function's related" +
    ' property descriptors according to additionally passed name and tagged type parameters, and returns' +
    ' a boolean value which indicates whether the "Stable Type Identity" could be established successfully.',
  () => {
    it('throws 💣 a `TypeError` in case its 1st `constructor` parameter is not a constructable function-type.', () => {
      expect(() => defineStableTypeIdentity(true, 'Foo', 'Foo')).toThrowError(
        new TypeError(
          'The provided "constructor" parameter has to be at least a constructable function-type.'
        )
      );
      expect(() => defineStableTypeIdentity('', 'Foo', 'Foo')).toThrowError(
        new TypeError(
          'The provided "constructor" parameter has to be at least a constructable function-type.'
        )
      );

      [
        asyncGeneratorFunctionExpression,
        generatorFunctionExpression,
        asyncArrowFunctionExpression,
        asyncNonArrowFunctionExpression,
        conciseGenericMethod,
        spoofedArrowFunction
      ].forEach((fctType) => {
        expect(() => defineStableTypeIdentity(fctType, 'Foo', 'Foo')).toThrowError(
          new TypeError(
            'The provided "constructor" parameter has to be at least a constructable function-type.'
          )
        );
      });
      expect(() => defineStableTypeIdentity(() => {}, 'Foo', 'Foo')).toThrowError(
        new TypeError(
          'The provided "constructor" parameter has to be at least a constructable function-type.'
        )
      );
      expect(() => defineStableTypeIdentity(class AdhocClass {}, 'Foo', 'Foo')).not.toThrow();
      expect(() => defineStableTypeIdentity(class AdhocClass {}, 'Bar')).not.toThrow();
    });

    it('throws 💣 a `TypeError` in case its 1st `constructor` parameter is constructable but neither an ES5 class nor an ES3 function-type.', () => {
      expect(() => defineStableTypeIdentity(Boolean, 'Foo', 'Foo')).toThrowError(
        new TypeError(
          'Built-in constructors are not supported. The "Stable Type Identity" feature anyhow is useful for just ES5 class-constructors and ES3 constructor functions.'
        )
      );
      expect(() => defineStableTypeIdentity(WeakMap, 'Bar', 'Bar')).toThrowError(
        new TypeError(
          'Built-in constructors are not supported. The "Stable Type Identity" feature anyhow is useful for just ES5 class-constructors and ES3 constructor functions.'
        )
      );

      // - `EventTarget` and `URL` are not universal reliable test candidates because in node.js
      //    each is implemented as class unlike e.g. `Boolean` or `WeakMap` which are true built-ins.
      //    Within a browser-environment the former two and both latter mentioned ones are all
      //    built-in types, thus following logging is true for browsers but not for node.js ...
      //    ```
      //    console.log(Function.prototype.toString.call(EventTarget)); // 'function EventTarget() { [native code] }'
      //    console.log(Function.prototype.toString.call(URL));         // 'function URL() { [native code] }'
      //    console.log(Function.prototype.toString.call(Boolean));     // 'function Boolean() { [native code] }'
      //    console.log(Function.prototype.toString.call(WeakMap));     // 'function WeakMap() { [native code] }'
      //    ```
      //    ... in node.js the logging is as follows ...
      //    ```
      //    console.log(Function.prototype.toString.call(EventTarget)); // 'class EventTarget { ... ... ... }'
      //    console.log(Function.prototype.toString.call(URL));         // 'class URL { ... ... ... }'
      //    console.log(Function.prototype.toString.call(Boolean));     // 'function Boolean() { [native code] }'
      //    console.log(Function.prototype.toString.call(WeakMap));     // 'function WeakMap() { [native code] }'
      //    ```

      expect(() => defineStableTypeIdentity(class AdhocClass {}, 'Foo')).not.toThrow();
      expect(() => defineStableTypeIdentity(class AdhocClass {}, 'Bar', 'Foo')).not.toThrow();
    });

    it('throws 💣 a `TypeError` in case its 2nd `constructorName` parameter is not a string type.', () => {
      expect(() => defineStableTypeIdentity(class AdhocClass {}, false, 'Foo')).toThrowError(
        new TypeError('The provided "constructorName" parameter needs to be a string.')
      );
      expect(() => defineStableTypeIdentity(class AdhocClass {}, 100, 'Foo')).toThrowError(
        new TypeError('The provided "constructorName" parameter needs to be a string.')
      );
      expect(() => defineStableTypeIdentity(class AdhocClass {}, 'Foo', 'Bar')).not.toThrow();
      expect(() => defineStableTypeIdentity(class AdhocClass {}, 'Bar', 'Foo')).not.toThrow();
    });
    it('throws 💣 a `RangeError` in case its 2nd `constructorName` parameter is an invalid string value like an empty string or a white-space only character-sequence.', () => {
      expect(() => defineStableTypeIdentity(class AdhocClass {}, '       ', 'Foo')).toThrowError(
        new RangeError('Invalid string value passed to "constructorName".')
      );
      expect(() => defineStableTypeIdentity(class AdhocClass {}, '', 'Foo')).toThrowError(
        new RangeError('Invalid string value passed to "constructorName".')
      );
      expect(() => defineStableTypeIdentity(class AdhocClass {}, 'F o o', 'B a r')).not.toThrow();
      expect(() =>
        defineStableTypeIdentity(class AdhocClass {}, ' B a r ', ' F o o ')
      ).not.toThrow();
    });

    it('throws 💣 a `RangeError` in case its optionally provided 3rd `taggedType` string parameter is an invalid string value like an empty string or a white-space only character-sequence.', () => {
      expect(() => defineStableTypeIdentity(class AdhocClass {}, 'Foo', '   ')).toThrowError(
        new RangeError('Invalid string value passed to "taggedType".')
      );
      expect(() => defineStableTypeIdentity(class AdhocClass {}, 'Bar', '')).toThrowError(
        new RangeError('Invalid string value passed to "taggedType".')
      );
      expect(() => defineStableTypeIdentity(class AdhocClass {}, 'Foo', ' B a r ')).not.toThrow();
      expect(() => defineStableTypeIdentity(class AdhocClass {}, 'Bar', ' F o o ')).not.toThrow();
    });
    it('ignores any non string value which has been passed as its optionally provided 3rd `taggedType` parameter.', () => {
      expect(() => defineStableTypeIdentity(class AdhocClass {}, 'Foo', true)).not.toThrow();
      expect(() => defineStableTypeIdentity(class AdhocClass {}, 'Bar', 100)).not.toThrow();
    });

    it('ignores any non string value which has been passed as its optionally provided 3rd `taggedType` parameter.', () => {
      expect(() => defineStableTypeIdentity(class AdhocClass {}, 'Foo', true)).not.toThrow();
      expect(() => defineStableTypeIdentity(class AdhocClass {}, 'Bar', 100)).not.toThrow();
    });
  }
);
