[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [base](../README.md) / BoxedSymbol

# Type Alias: BoxedSymbol

> **BoxedSymbol**\<\> = `Symbol` & `object`

Defined in: [src/typedef.js:116](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/typedef.js#L116)

A purposely boxed `Symbol` object type, e.g., created via `Object(Symbol('key'))`.
 This works perfectly fine when used as an object's symbol-key.

 Consider the following example:

 ```
 const mySymbolKey = Symbol('key');
 const symbolObject = Object(mySymbolKey);

 console.log('(mySymbolKey === symbolObject) ...', (mySymbolKey === symbolObject));  // false
 console.log('(mySymbolKey == symbolObject) ...', (mySymbolKey == symbolObject));    // true

 const myObject = { foo: 'Foo' };
 myObject[mySymbolKey] = 'value set by `mySymbolKey`.';
 //       ^^^^^^^^^^^

 console.log({ myObject }); // { "myObject": { "foo": "Foo", Symbol(key): "value set by `mySymbolKey`." } }
 console.log('myObject[symbolObject] ...', myObject[symbolObject]); // 'value set by `mySymbolKey`.'
 //           ---------^^^^^^^^^^^^        ---------^^^^^^^^^^^^

 myObject[symbolObject] = 'value overwritten by `symbolObject`.';
 //       ^^^^^^^^^^^^

 console.log({ myObject }); // { "myObject": { "foo": "Foo", Symbol(key): "value overwritten by `symbolObject`." } }
 console.log('myObject[mySymbolKey] ...', myObject[mySymbolKey]); // 'value overwritten by `symbolObject`.'
 //           ---------^^^^^^^^^^^        ---------^^^^^^^^^^^
 ```

 This demonstrates that, although the primitive symbol and its boxed object
 are not strictly equal (`===`), their loose equality (`==`) is enough for
 them to act as interchangeable property keys.

## Type declaration

### \_\_brand

> **\_\_brand**: `"BoxedSymbol"`

## Type Parameters
