[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [base](../README.md) / isDictionaryObject

# Function: isDictionaryObject()

> **isDictionaryObject**(`value?`): `value is DictionaryObject`

Defined in: [src/base/index.js:85](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/base/index.js#L85)

Matches object structures which do not have a prototype object.
Such objects remain unaffected by changes of `Object.prototype`.

## Parameters

### value?

`any`

An optionally passed value of any type.

## Returns

`value is DictionaryObject`

Whether the passed value can be described as _"Null-prototype object"_
 or _"Prototype-less object"_.
