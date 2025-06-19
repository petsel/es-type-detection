[**@petsel/es-type-detection v1.0.0**](../../../README.md)

***

[@petsel/es-type-detection](../../../modules.md) / [flow/typedef](../README.md) / IteratorResult

# Type Alias: IteratorResult\<T\>

> **IteratorResult**\<`T`\> = `object`

Defined in: [src/flow/typedef.js:15](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/flow/typedef.js#L15)

A value yielded by a `Generator` or `AsyncGenerator`.
Represents the result of a generator step.
- `value`: The current iteration value, yielded/resolved as value of type `T`.
- `done`: Whether the iterator/iteration is complete.

## Type Parameters

### T

`T`

## Type declaration

### \_\_brand

> **\_\_brand**: `"IteratorResult"`

### done

> **done**: `boolean`

### value

> **value**: `T`
