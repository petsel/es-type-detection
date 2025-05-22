[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [utility](../README.md) / getDefinedConstructor

# Function: getDefinedConstructor()

> **getDefinedConstructor**(`value?`): `CallableFunction` \| `NewableFunction` \| [`ES3Function`](../../function/type-aliases/ES3Function.md) \| [`ClassConstructor`](../type-aliases/ClassConstructor.md)

Defined in: [src/utility.js:111](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/utility.js#L111)

## Parameters

### value?

`any` = `null`

An optionally passed value of any type.

## Returns

`CallableFunction` \| `NewableFunction` \| [`ES3Function`](../../function/type-aliases/ES3Function.md) \| [`ClassConstructor`](../type-aliases/ClassConstructor.md)

if available, the passed value's constructor-function - either a built-in
 type's constructor-function or an ES6-class constructor-function or an
 ES3-function - otherwise `undefined`.
