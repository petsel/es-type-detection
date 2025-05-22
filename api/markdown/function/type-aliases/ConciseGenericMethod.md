[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [function](../README.md) / ConciseGenericMethod

# Type Alias: ConciseGenericMethod

> **ConciseGenericMethod**\<\> = `Function` & `object`

Defined in: [src/function/typedef.js:101](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/function/typedef.js#L101)

A `Function` type that misses its own `prototype` slot. Thus, it does share
some of the characteristics of a `NonAsyncArrow` function type - but it gets
created exclusively by a non-async and non-generator shorthand method definition.
(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions#description).

## Type declaration

### \_\_brand

> **\_\_brand**: `"ConciseGenericMethod"`

### constructor

> **constructor**: `Function`

### prototype

> **prototype**: `undefined`

## Type Parameters
