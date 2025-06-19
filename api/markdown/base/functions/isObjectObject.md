[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [base](../README.md) / isObjectObject

# Function: isObjectObject()

> **isObjectObject**(`value?`): `value is PlainObject`

Defined in: [src/base/index.js:69](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/base/index.js#L69)

Matches object structures where the constructor exclusively is the built-in
`Object` type, which does exclude instances of custom ES6-class and ES3
constructor functions.

## Parameters

### value?

`any`

An optionally passed value of any type.

## Returns

`value is PlainObject`

Whether the passed value is a direct instance of the built-in `Object` type.
