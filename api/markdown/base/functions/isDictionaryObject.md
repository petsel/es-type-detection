[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [base](../README.md) / isDictionaryObject

# Function: isDictionaryObject()

> **isDictionaryObject**(`value?`): `value is DictionaryObject`

Defined in: [src/base/index.js:81](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/base/index.js#L81)

Matches object structures which do not have a prototype object.
Such objects remain unaffected to changes of `Object.prototype`.

## Parameters

### value?

`any`

An optionally passed value of any type.

## Returns

`value is DictionaryObject`

Whether the passed value can be described as _"Null-prototype object"_
 or _"Prototype-less object"_.
