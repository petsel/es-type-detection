[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [error](../README.md) / PlainError

# Type Alias: PlainError

> **PlainError**\<\> = `Error` & `object`

Defined in: [src/error/typedef.js:25](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/error/typedef.js#L25)

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
