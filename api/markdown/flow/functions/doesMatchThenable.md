[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [flow](../README.md) / doesMatchThenable

# Function: doesMatchThenable()

> **doesMatchThenable**(`value?`): `value is Thenable`

Defined in: [src/flow/index.js:79](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/flow/index.js#L79)

Verifies whether the passed `value` is either an object or a function
which features a `then` method; hence it executes a shallow check of
whether the test candidate features the most basic `Thenable` behavior/trait.

## Parameters

### value?

`any`

An optionally passed value of any type.

## Returns

`value is Thenable`

A boolean value which indicates whether the tested value does qualify
 as a _`Thenable`_ by having
