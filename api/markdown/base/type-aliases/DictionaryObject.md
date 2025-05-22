[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [base](../README.md) / DictionaryObject

# Type Alias: DictionaryObject

> **DictionaryObject**\<\> = `object` & `object`

Defined in: [src/typedef.js:44](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/typedef.js#L44)

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
