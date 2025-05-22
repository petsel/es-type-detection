[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [error](../README.md) / isError

# Function: isError()

> **isError**(`value?`): `value is AnyError`

Defined in: [src/error/index.js:19](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/error/index.js#L19)

## Parameters

### value?

`any`

An optionally passed value of any type.

## Returns

`value is AnyError`

whether the passed value matches any error type, hence it is
 an instance, either of the basic `Error` type, or of one of the
 built-in error-type subclasses (`SyntaxError`, `ReferenceError` etc.),
 or of a custom error-type that extends the basic `Error` type.
