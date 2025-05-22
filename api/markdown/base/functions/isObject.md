[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [base](../README.md) / isObject

# Function: isObject()

> **isObject**(`value?`): `value is any`

Defined in: [src/base/index.js:47](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/base/index.js#L47)

Matches generic object types hence real objects and boxed objects alike
excluding function types (though they are technically objects too) and
the `null` value which is a primitive value and just a placeholder for
a yet missing/unassigned object type.

## Parameters

### value?

`any`

An optionally passed value of any type.

## Returns

`value is any`

Whether the passed value matches the generic object type.
