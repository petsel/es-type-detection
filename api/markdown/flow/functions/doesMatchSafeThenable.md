[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [flow](../README.md) / doesMatchSafeThenable

# Function: doesMatchSafeThenable()

> **doesMatchSafeThenable**(`value?`): `value is any`

Defined in: [src/flow/index.js:93](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/flow/index.js#L93)

Verifies whether the passed `value` is either object or function which
features a `then` method, where the latter explicitly is either of both
function variants - arrow expression or function expression/statement -
thus, a `then` method is neither an async nor a generator function.
Like `doesMatchThenable` this function runs a shallow check of whether
the test candidate features the most basic `Thenable` behavior/trait,
just being more strict about the nature of a `then` method.

## Parameters

### value?

`any`

An optionally passed value of any type.

## Returns

`value is any`

A boolean value which indicates whether the tested value does qualify
 as safely to be applied/used _`Thenable`_.
