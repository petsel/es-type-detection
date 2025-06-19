[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [function](../README.md) / isClass

# Function: isClass()

> **isClass**(`value?`): `value is ClassConstructor<FunctionConstructor>`

Defined in: [src/function/index.js:29](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/function/index.js#L29)

Detects whether the passed `value` is a
constructor function implemented as `class`.

## Parameters

### value?

`any`

An optionally passed value of any type.

## Returns

`value is ClassConstructor<FunctionConstructor>`

A boolean value which indicates whether the
 tested value is a class-constructor function.
