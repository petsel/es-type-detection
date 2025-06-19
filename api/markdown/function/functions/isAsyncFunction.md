[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [function](../README.md) / isAsyncFunction

# Function: isAsyncFunction()

> **isAsyncFunction**(`value?`): `value is AsyncFunction`

Defined in: [src/function/index.js:144](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/function/index.js#L144)

Detects whether the passed `value` is an async function type, either an
async arrow function expression or an async non-arrow function expression
or an async function statement.
It does not detect an async generator function since the latter is not
an async function itself but the factory function of an async generator.
Async functions do return promises but do not return async generators.

## Parameters

### value?

`any`

An optionally passed value of any type.

## Returns

`value is AsyncFunction`

A boolean value which indicates whether
 the tested value is an async function.
