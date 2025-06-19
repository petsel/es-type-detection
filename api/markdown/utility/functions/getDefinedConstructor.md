[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [utility](../README.md) / getDefinedConstructor

# Function: getDefinedConstructor()

> **getDefinedConstructor**(`value?`): `NewableFunction` \| [`ES3Function`](../../function/type-aliases/ES3Function.md) \| [`ClassConstructor`](../type-aliases/ClassConstructor.md)

Defined in: [src/utility.js:114](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/utility.js#L114)

## Parameters

### value?

`any` = `null`

An optionally passed value of any type.

## Returns

`NewableFunction` \| [`ES3Function`](../../function/type-aliases/ES3Function.md) \| [`ClassConstructor`](../type-aliases/ClassConstructor.md)

if available, the passed value's constructor-function - either a built-in
 type's constructor-function or an ES6-class constructor-function or an
 ES3-function - otherwise `undefined`.
