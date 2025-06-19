[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [function](../README.md) / isES3Function

# Function: isES3Function()

> **isES3Function**(`value?`): `value is ES3Function`

Defined in: [src/function/index.js:238](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/function/index.js#L238)

Detects whether the passed `value` is exclusively the only available
function type of ES3 (in addition to all the built-in constructors).

## Parameters

### value?

`any`

An optionally passed value of any type.

## Returns

`value is ES3Function`

A boolean value which indicates whether the tested value is exclusively
 the only available/known function type back at ES3 (in addition to all
 the built-in constructor functions).
