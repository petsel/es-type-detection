[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [function](../README.md) / isConciseGenericMethod

# Function: isConciseGenericMethod()

> **isConciseGenericMethod**(`value?`): `value is ConciseGenericMethod`

Defined in: [src/function/index.js:266](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/function/index.js#L266)

Detects whether the passed `value` is a concise generic method, a function
which has been created exclusively by a non-async and non-generator shorthand
method definition.

## Parameters

### value?

`any`

An optionally passed value of any type.

## Returns

`value is ConciseGenericMethod`

A boolean value which indicates whether the tested value is exclusively a
 concise generic method, a function created by a non-async and non-generator
 shorthand method definition.
