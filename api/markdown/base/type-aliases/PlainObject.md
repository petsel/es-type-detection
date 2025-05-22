[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [base](../README.md) / PlainObject

# Type Alias: PlainObject

> **PlainObject**\<\> = `Object` & `object`

Defined in: [src/typedef.js:26](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/typedef.js#L26)

A plain, prototype-bearing object - created via:
- Object literals: `{}`
- `new Object()`
- `Object.create(Object.prototype)` or equivalent

Excludes prototype-less objects created via `Object.create(null)`,
which are covered by the `DictionaryObject` type.

## Type declaration

### \_\_brand

> **\_\_brand**: `"PlainObject"`

### constructor

> **constructor**: `Object`

## Type Parameters
