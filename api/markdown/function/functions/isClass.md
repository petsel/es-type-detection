[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [function](../README.md) / isClass

# Function: isClass()

> **isClass**(`value?`): `value is ClassConstructor<FunctionConstructor>`

Defined in: [src/function/index.js:28](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/function/index.js#L28)

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
