[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [base](../README.md) / isObject

# Function: isObject()

> **isObject**(`value?`): `value is AnyObject`

Defined in: [src/base/index.js:49](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/base/index.js#L49)

Matches generic object types hence real objects and boxed objects alike
excluding function types (though they are technically objects too) and
the `null` value, which is a primitive value and just a placeholder for
a yet missing/unassigned object type.

## Parameters

### value?

`any`

An optionally passed value of any type.

## Returns

`value is AnyObject`

Whether the passed value matches the generic object type.
