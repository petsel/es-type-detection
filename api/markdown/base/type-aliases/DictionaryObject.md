[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [base](../README.md) / DictionaryObject

# Type Alias: DictionaryObject

> **DictionaryObject**\<\> = `object` & `object`

Defined in: [src/typedef.js:46](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/typedef.js#L46)

A prototype-less object - created via `Object.create(null)`.

This kind of object has:
- No prototype chain (`Object.getPrototypeOf(obj) === null`)
- No inherited members or default `Object.prototype` behavior

Ideal for use as a pure dictionary/hashmap, avoiding key collisions with inherited properties.

## Type declaration

### \_\_brand

> **\_\_brand**: `"DictionaryObject"`

### constructor

> **constructor**: `undefined`

### prototype

> **prototype**: `null`

## Type Parameters
