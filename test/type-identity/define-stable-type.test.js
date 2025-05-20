import { describe, it, expect } from 'vitest';

import {
  getOwnPropertyDescriptor,
  getTypeSignature,
  getTaggedType,
  getDefinedConstructorName
} from '../../src/utility';

import {
  doesMatchNonEnumerableDescriptorDefault,
  doesMatchStableNonEnumerableDescriptor
} from '../../src/type-identity/utility';

import { defineStableTypeIdentity, getTrustedType } from '../../src/type-identity';

import {
  asyncGeneratorFunctionExpression,
  generatorFunctionExpression,
  asyncArrowFunctionExpression,
  asyncNonArrowFunctionExpression,
  conciseGenericMethod,
  spoofedArrowFunction
} from '../utility/__config';

class MyClass {}
class MySubclass extends MyClass {}

class TaggedClass {
  get [Symbol.toStringTag]() {
    return 'TaggedClass';
  }
}
class ImplicitlyTaggedSubclass extends TaggedClass {}

class ExplicitlyTaggedSubclass extends TaggedClass {
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

    describe(
      'does successfully apply "Stable Type Identity" to a passed constructor function' +
        ' which still features both configurable property descriptors, once for its' +
        ' function-name property and once for its prototypal `Symbol.toStringTag` slot.',
      () => {
        it('✅ returns the boolean value `true` when invoked with a still configurable constructor function.', () => {
          // - pre-run checks before executing "Stable Type Identity" re-definition.

          expect(
            doesMatchNonEnumerableDescriptorDefault(getOwnPropertyDescriptor(MyClass, 'name'))
          ).toStrictEqual(true);
          expect(
            doesMatchNonEnumerableDescriptorDefault(getOwnPropertyDescriptor(MySubclass, 'name'))
          ).toStrictEqual(true);

          expect(
            doesMatchNonEnumerableDescriptorDefault(
              getOwnPropertyDescriptor(ImplicitlyTaggedSubclass, 'name')
            )
          ).toStrictEqual(true);
          expect(
            doesMatchNonEnumerableDescriptorDefault(
              getOwnPropertyDescriptor(ExplicitlyTaggedSubclass, 'name')
            )
          ).toStrictEqual(true);

          expect(
            doesMatchStableNonEnumerableDescriptor(getOwnPropertyDescriptor(MyClass, 'name'))
          ).toStrictEqual(false);
          expect(
            doesMatchStableNonEnumerableDescriptor(getOwnPropertyDescriptor(MySubclass, 'name'))
          ).toStrictEqual(false);

          expect(
            doesMatchStableNonEnumerableDescriptor(
              getOwnPropertyDescriptor(ImplicitlyTaggedSubclass, 'name')
            )
          ).toStrictEqual(false);
          expect(
            doesMatchStableNonEnumerableDescriptor(
              getOwnPropertyDescriptor(ExplicitlyTaggedSubclass, 'name')
            )
          ).toStrictEqual(false);

          expect(MyClass.name).toStrictEqual('MyClass');
          expect(MySubclass.name).toStrictEqual('MySubclass');

          expect(ImplicitlyTaggedSubclass.name).toStrictEqual('ImplicitlyTaggedSubclass');
          expect(ExplicitlyTaggedSubclass.name).toStrictEqual('ExplicitlyTaggedSubclass');

          expect(getDefinedConstructorName(new MyClass())).toStrictEqual('MyClass');
          expect(getDefinedConstructorName(new MySubclass())).toStrictEqual('MySubclass');

          expect(getDefinedConstructorName(new ImplicitlyTaggedSubclass())).toStrictEqual(
            'ImplicitlyTaggedSubclass'
          );
          expect(getDefinedConstructorName(new ExplicitlyTaggedSubclass())).toStrictEqual(
            'ExplicitlyTaggedSubclass'
          );

          expect(getTaggedType(new MyClass())).toStrictEqual('Object');
          expect(getTaggedType(new MySubclass())).toStrictEqual('Object');

          expect(getTaggedType(new ImplicitlyTaggedSubclass())).toStrictEqual('TaggedClass');
          expect(getTaggedType(new ExplicitlyTaggedSubclass())).toStrictEqual(
            'ExplicitlyTaggedSubclass'
          );

          // - execute "Stable Type Identity" re-definition.

          expect(defineStableTypeIdentity(MyClass, 'MyRedefinedType', 'Redefined')).toStrictEqual(
            true
          );
          expect(defineStableTypeIdentity(MySubclass, 'Subtype')).toStrictEqual(true);

          expect(defineStableTypeIdentity(ImplicitlyTaggedSubclass, 'Foo')).toStrictEqual(true);
          expect(defineStableTypeIdentity(ExplicitlyTaggedSubclass, 'Baz', 'Biz')).toStrictEqual(
            true
          );
        });
        it("✅ The constructor-function's name has been correctly redefined.", () => {
          expect(MyClass.name).toStrictEqual('MyRedefinedType');
          expect(MySubclass.name).toStrictEqual('Subtype');

          expect(ImplicitlyTaggedSubclass.name).toStrictEqual('Foo');
          expect(ExplicitlyTaggedSubclass.name).toStrictEqual('Baz');

          expect(getDefinedConstructorName(new MyClass())).toStrictEqual('MyRedefinedType');
          expect(getDefinedConstructorName(new MySubclass())).toStrictEqual('Subtype');

          expect(getDefinedConstructorName(new ImplicitlyTaggedSubclass())).toStrictEqual('Foo');
          expect(getDefinedConstructorName(new ExplicitlyTaggedSubclass())).toStrictEqual('Baz');
        });
        it(
          '✅ Any instance of a correctly treated constructor-function unveils its' +
            ' stable type-identity accordingly via e.g. `Object.prototype.toString.call()`.',
          () => {
            expect(Object.prototype.toString.call(new MyClass())).toStrictEqual(
              '[object Redefined]'
            );
            expect(Object.prototype.toString.call(new MySubclass())).toStrictEqual(
              '[object Subtype]'
            );
            expect(String(new MyClass())).toStrictEqual('[object Redefined]');
            expect(String(new MySubclass())).toStrictEqual('[object Subtype]');

            expect(new MyClass() + '').toStrictEqual('[object Redefined]');
            expect(new MySubclass() + '').toStrictEqual('[object Subtype]');

            expect(getTaggedType(new MyClass())).toStrictEqual('Redefined');
            expect(getTaggedType(new MySubclass())).toStrictEqual('Subtype');

            expect(Object.prototype.toString.call(new ImplicitlyTaggedSubclass())).toStrictEqual(
              '[object Foo]'
            );
            expect(Object.prototype.toString.call(new ExplicitlyTaggedSubclass())).toStrictEqual(
              '[object Biz]'
            );
            expect(String(new ImplicitlyTaggedSubclass())).toStrictEqual('[object Foo]');
            expect(String(new ExplicitlyTaggedSubclass())).toStrictEqual('[object Biz]');

            expect(new ImplicitlyTaggedSubclass() + '').toStrictEqual('[object Foo]');
            expect(new ExplicitlyTaggedSubclass() + '').toStrictEqual('[object Biz]');

            expect(getTaggedType(new ImplicitlyTaggedSubclass())).toStrictEqual('Foo');
            expect(getTaggedType(new ExplicitlyTaggedSubclass())).toStrictEqual('Biz');
          }
        );
      }
    );

    describe(
      'does prevent the "Stable Type Identity" application process for every passed constructor function' +
        ' which does not have both configurable property descriptors, once for its function-name property' +
        ' and once for its prototypal `Symbol.toStringTag` slot.',
      () => {
        it('❌ returns the boolean value `false` when invoked with a non-configurable constructor function.', () => {
          // - pre-run checks before attempting another "Stable Type Identity" re-definition.

          expect(
            doesMatchNonEnumerableDescriptorDefault(getOwnPropertyDescriptor(MyClass, 'name'))
          ).toStrictEqual(false);
          expect(
            doesMatchNonEnumerableDescriptorDefault(getOwnPropertyDescriptor(MySubclass, 'name'))
          ).toStrictEqual(false);

          expect(
            doesMatchNonEnumerableDescriptorDefault(
              getOwnPropertyDescriptor(ImplicitlyTaggedSubclass, 'name')
            )
          ).toStrictEqual(false);
          expect(
            doesMatchNonEnumerableDescriptorDefault(
              getOwnPropertyDescriptor(ExplicitlyTaggedSubclass, 'name')
            )
          ).toStrictEqual(false);

          expect(
            doesMatchStableNonEnumerableDescriptor(getOwnPropertyDescriptor(MyClass, 'name'))
          ).toStrictEqual(true);
          expect(
            doesMatchStableNonEnumerableDescriptor(getOwnPropertyDescriptor(MySubclass, 'name'))
          ).toStrictEqual(true);

          expect(
            doesMatchStableNonEnumerableDescriptor(
              getOwnPropertyDescriptor(ImplicitlyTaggedSubclass, 'name')
            )
          ).toStrictEqual(true);
          expect(
            doesMatchStableNonEnumerableDescriptor(
              getOwnPropertyDescriptor(ExplicitlyTaggedSubclass, 'name')
            )
          ).toStrictEqual(true);

          // - re-definition fails (gets rejected).

          expect(
            defineStableTypeIdentity(MyClass, 'MyTwiceRedefinedType', 'TwiceRedefined')
          ).toStrictEqual(false);
          expect(
            defineStableTypeIdentity(MySubclass, 'RedefinedSubtype', 'TwiceRedefined')
          ).toStrictEqual(false);

          expect(defineStableTypeIdentity(ImplicitlyTaggedSubclass, 'Foo', 'Bar')).toStrictEqual(
            false
          );
          expect(defineStableTypeIdentity(ExplicitlyTaggedSubclass, 'Bizz', 'Buzz')).toStrictEqual(
            false
          );
        });
        it('✅ leaves an already established "Stable Type Identity" untouched.', () => {
          // - the already established "Stable Type Identity" remained
          //   unchanged despite the additional re-definition attempt.

          expect(MyClass.name).toStrictEqual('MyRedefinedType');
          expect(MySubclass.name).toStrictEqual('Subtype');

          expect(ImplicitlyTaggedSubclass.name).toStrictEqual('Foo');
          expect(ExplicitlyTaggedSubclass.name).toStrictEqual('Baz');

          expect(getDefinedConstructorName(new MyClass())).toStrictEqual('MyRedefinedType');
          expect(getDefinedConstructorName(new MySubclass())).toStrictEqual('Subtype');

          expect(getDefinedConstructorName(new ImplicitlyTaggedSubclass())).toStrictEqual('Foo');
          expect(getDefinedConstructorName(new ExplicitlyTaggedSubclass())).toStrictEqual('Baz');

          expect(getTypeSignature(new MyClass())).toStrictEqual('[object Redefined]');
          expect(getTypeSignature(new MySubclass())).toStrictEqual('[object Subtype]');

          expect(String(new MyClass())).toStrictEqual('[object Redefined]');
          expect(String(new MySubclass())).toStrictEqual('[object Subtype]');

          expect(new MyClass() + '').toStrictEqual('[object Redefined]');
          expect(new MySubclass() + '').toStrictEqual('[object Subtype]');

          expect(getTaggedType(new MyClass())).toStrictEqual('Redefined');
          expect(getTaggedType(new MySubclass())).toStrictEqual('Subtype');

          expect(getTypeSignature(new ImplicitlyTaggedSubclass())).toStrictEqual('[object Foo]');
          expect(getTypeSignature(new ExplicitlyTaggedSubclass())).toStrictEqual('[object Biz]');

          expect(String(new ImplicitlyTaggedSubclass())).toStrictEqual('[object Foo]');
          expect(String(new ExplicitlyTaggedSubclass())).toStrictEqual('[object Biz]');

          expect(new ImplicitlyTaggedSubclass() + '').toStrictEqual('[object Foo]');
          expect(new ExplicitlyTaggedSubclass() + '').toStrictEqual('[object Biz]');

          expect(getTaggedType(new ImplicitlyTaggedSubclass())).toStrictEqual('Foo');
          expect(getTaggedType(new ExplicitlyTaggedSubclass())).toStrictEqual('Biz');
        });
      }
    );
  }
);
