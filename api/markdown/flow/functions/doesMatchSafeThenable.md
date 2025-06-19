[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [flow](../README.md) / doesMatchSafeThenable

# Function: doesMatchSafeThenable()

> **doesMatchSafeThenable**(`value?`): `value is Thenable`

Defined in: [src/flow/index.js:98](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/flow/index.js#L98)

Verifies whether the passed `value` is either object or function that
features a `then` method, where the latter explicitly is either of both
function variants - arrow expression or function expression/statement -
thus, a `then` method is neither an async nor a generator function.
Like `doesMatchThenable` this function runs a shallow check of whether
the test candidate features the most basic `Thenable` behavior/trait,
just being stricter about the nature of a `then` method.

## Parameters

### value?

`any`

An optionally passed value of any type.

## Returns

`value is Thenable`

A boolean value which indicates whether the tested value does qualify
 as to be safely applied/used _`Thenable`_.
