[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [error](../README.md) / PlainError

# Type Alias: PlainError

> **PlainError**\<\> = `Error` & `object`

Defined in: [src/error/typedef.js:27](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/error/typedef.js#L27)

A plain `Error` instance - created exclusively via the base `Error` constructor:
- `new Error()`

Excludes subclass instances like `TypeError`, `SyntaxError`, or custom errors.
The `__constructor` is strictly the built-in `Error` function.

## Type declaration

### \_\_brand

> **\_\_brand**: `"PlainError"`

### constructor

> **constructor**: `Error`

## Type Parameters
