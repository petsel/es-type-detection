[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [base](../README.md) / AnyObject

# Type Alias: AnyObject

> **AnyObject**\<\> = `Object` & `object`

Defined in: [src/typedef.js:11](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/typedef.js#L11)

Any non-null object value - including:
- Plain objects (e.g. `{}`, `new Object()`)
- Instances of built-in types (e.g. `Array`, `RegExp`, `Date`, `Map`, etc.)
- Instances of custom classes or constructor functions

The `null` value is explicitly excluded, even though `typeof null === 'object'`.
The `constructor` refers to the actual constructor function that created the object.

## Type declaration

### \_\_brand

> **\_\_brand**: `"AnyObject"`

### constructor

> **constructor**: `Function`

## Type Parameters
