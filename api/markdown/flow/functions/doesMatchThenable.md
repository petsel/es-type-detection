[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [flow](../README.md) / doesMatchThenable

# Function: doesMatchThenable()

> **doesMatchThenable**(`value?`): `value is any`

Defined in: [src/flow/index.js:75](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/flow/index.js#L75)

Verifies whether the passed `value` is either object or function which
features a `then` method; hence it executes a shallow check of whether
the test candidate features the most basic `Thenable` behavior/trait.

## Parameters

### value?

`any`

An optionally passed value of any type.

## Returns

`value is any`

A boolean value which indicates whether the tested value does qualify
 as a _`Thenable`_ by having
