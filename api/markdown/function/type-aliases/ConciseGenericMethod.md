[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [function](../README.md) / ConciseGenericMethod

# Type Alias: ConciseGenericMethod

> **ConciseGenericMethod**\<\> = `Function` & `object`

Defined in: [src/function/typedef.js:105](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/function/typedef.js#L105)

A `Function` type that misses its own `prototype` slot. Thus, it does share
some characteristics of a `NonAsyncArrow` function type - but it gets created
exclusively by a non-async and non-generator shorthand method definition.
(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions#description).

## Type declaration

### \_\_brand

> **\_\_brand**: `"ConciseGenericMethod"`

### \_\_constructorName

> **\_\_constructorName**: `"Function"`

### prototype

> **prototype**: `undefined`

## Type Parameters
