[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [error](../README.md) / AnyError

# Type Alias: AnyError

> **AnyError**\<\> = `Error` & `object`

Defined in: [src/error/typedef.js:13](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/error/typedef.js#L13)

Any error instance - including:
- The base `Error` type (`new Error()`)
- Built-in subclasses (e.g. `SyntaxError`, `TypeError`, `RangeError`, etc.)
- Custom error types that extend the `Error` class

The `__constructor` refers to the actual constructor function (e.g. `Error`, `SyntaxError`, or a custom class).

## Type declaration

### \_\_brand

> **\_\_brand**: `"AnyError"`

### constructor

> **constructor**: `Function`

## Type Parameters
