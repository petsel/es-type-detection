[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [base](../README.md) / isFunction

# Function: isFunction()

> **isFunction**(`value?`): `value is Function`

Defined in: [src/base/index.js:22](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/base/index.js#L22)

Detects any function type, which is ... not only the `typeof` operator
returns the `'function'` string for the operated `value`, but the latter
also features both of a function's call methods `call` and `apply`.

This method is essential and **safe**.

## Parameters

### value?

`any`

An optionally passed value of any type.

## Returns

`value is Function`

A boolean value which indicates whether
 the tested type is any kind of function.
