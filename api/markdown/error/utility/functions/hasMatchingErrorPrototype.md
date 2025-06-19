[**@petsel/es-type-detection v1.0.0**](../../../README.md)

***

[@petsel/es-type-detection](../../../modules.md) / [error/utility](../README.md) / hasMatchingErrorPrototype

# Function: hasMatchingErrorPrototype()

> **hasMatchingErrorPrototype**(`value?`): `boolean`

Defined in: [src/error/utility.js:19](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/error/utility.js#L19)

## Parameters

### value?

`any`

An optionally passed value of any type.

## Returns

`boolean`

whether the passed value along its (non/existing) prototype chain
 does feature a prototype object which does qualify as the plain
 `Error` type's prototype.
