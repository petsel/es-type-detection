[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [base](../README.md) / PlainObject

# Type Alias: PlainObject

> **PlainObject**\<\> = `object`

Defined in: [src/typedef.js:28](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/typedef.js#L28)

A plain, prototype-bearing object - created via:
- Object literals: `{}`
- `new Object()`
- `Object.create(Object.prototype)` or equivalent

Excludes prototype-less objects created via `Object.create(null)`,
which are covered by the `DictionaryObject` type.

## Type Parameters

## Type declaration

### \_\_brand

> **\_\_brand**: `"PlainObject"`

### constructor

> **constructor**: `Object`
