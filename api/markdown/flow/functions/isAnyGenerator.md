[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [flow](../README.md) / isAnyGenerator

# Function: isAnyGenerator()

> **isAnyGenerator**(`value?`): `value is AnyGenerator`

Defined in: [src/flow/index.js:54](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/flow/index.js#L54)

Detects whether the passed `value` is either kind of generator type,
async or non-async.

## Parameters

### value?

`any`

An optionally passed value of any type.

## Returns

`value is AnyGenerator`

A boolean value which indicates whether the tested value is either
 an async or a non-async generator type.
