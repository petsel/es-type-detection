[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [function](../README.md) / isArrow

# Function: isArrow()

> **isArrow**(`value?`): `value is AnyArrow`

Defined in: [src/function/index.js:215](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/function/index.js#L215)

Detects whether the passed `value` is either kind of an arrow
function expression - async or non-async.

## Parameters

### value?

`any`

An optionally passed value of any type.

## Returns

`value is AnyArrow`

A boolean value which indicates whether the tested value is
 either an async or a non-async arrow function expression.
