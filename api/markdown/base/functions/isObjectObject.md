[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [base](../README.md) / isObjectObject

# Function: isObjectObject()

> **isObjectObject**(`value?`): `value is any`

Defined in: [src/base/index.js:66](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/base/index.js#L66)

Matches object structures where the constructor exclusively is the built-in
`Object` type, which does exclude instances of custom ES6-class and ES3
constructor functions.

## Parameters

### value?

`any`

An optionally passed value of any type.

## Returns

`value is any`

Whether the passed value is a direct instance of the built-in `Object` type.
