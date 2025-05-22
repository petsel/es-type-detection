[**@petsel/es-type-detection v1.0.0**](../../../README.md)

***

[@petsel/es-type-detection](../../../modules.md) / [flow/typedef](../README.md) / IteratorResult

# Type Alias: IteratorResult\<T\>

> **IteratorResult**\<`T`\> = `object` & `object`

Defined in: [src/flow/typedef.js:13](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/flow/typedef.js#L13)

A value yielded by a `Generator` or `AsyncGenerator`.
Represents the result of a generator step.
- `value`: The current iteration value, yielded/resolved as value of type `T`.
- `done`: Whether the iterator/iteration is complete.

## Type declaration

### \_\_brand

> **\_\_brand**: `"IteratorResult"`

### done

> **done**: `boolean`

### value

> **value**: `T`

## Type Parameters

### T

`T`
