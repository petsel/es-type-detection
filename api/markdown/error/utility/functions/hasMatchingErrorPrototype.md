[**@petsel/es-type-detection v1.0.0**](../../../README.md)

***

[@petsel/es-type-detection](../../../modules.md) / [error/utility](../README.md) / hasMatchingErrorPrototype

# Function: hasMatchingErrorPrototype()

> **hasMatchingErrorPrototype**(`value?`): `boolean`

Defined in: [src/error/utility.js:18](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/error/utility.js#L18)

## Parameters

### value?

`any`

An optionally passed value of any type.

## Returns

`boolean`

whether the passed value along its (non/existing) prototype chain
 does feature a prototype object which does qualify as the plain
 `Error` type's prototype.
