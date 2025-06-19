[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [base](../README.md) / AnyObject

# Type Alias: AnyObject

> **AnyObject**\<\> = `object`

Defined in: [src/typedef.js:13](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/typedef.js#L13)

Any non-null object value - including:
- Plain objects (e.g. `{}`, `new Object()`)
- Instances of built-in types (e.g. `Array`, `RegExp`, `Date`, `Map`, etc.)
- Instances of custom classes or constructor functions

The `null` value is explicitly excluded, even though `typeof null === 'object'`.
The `constructor` refers to the actual constructor function that created the object.

## Type Parameters

## Type declaration

### \_\_brand

> **\_\_brand**: `"AnyObject"`

### constructor

> **constructor**: `Function`
