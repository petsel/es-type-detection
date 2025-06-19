[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [function](../README.md) / isAsyncNonArrow

# Function: isAsyncNonArrow()

> **isAsyncNonArrow**(`value?`): `value is AsyncFunction`

Defined in: [src/function/index.js:163](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/function/index.js#L163)

Detects whether the passed `value` is exclusively one of following two
async function variants, either an async non-arrow function expression
or an async function statement.

## Parameters

### value?

`any`

An optionally passed value of any type.

## Returns

`value is AsyncFunction`

A boolean value which indicates whether the tested value does match
 exclusively a non-arrow async function.
