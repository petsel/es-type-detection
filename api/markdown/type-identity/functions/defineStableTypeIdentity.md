[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [type-identity](../README.md) / defineStableTypeIdentity

# Function: defineStableTypeIdentity()

> **defineStableTypeIdentity**(`constructor`, `constructorName`, `taggedType?`): `boolean`

Defined in: [src/type-identity/index.js:257](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/type-identity/index.js#L257)

Takes a constructor function, changes some of the function's related property
descriptors according to additionally passed name and tagged type parameters,
and returns a boolean value which indicates whether the "Stable Type Identity"
could be established successfully.

## Parameters

### constructor

[`ES3Function`](../../function/type-aliases/ES3Function.md) | [`ClassConstructor`](../type-aliases/ClassConstructor.md)

### constructorName

`string`

### taggedType?

`string`

## Returns

`boolean`

Whether the "Stable Type Identity" could be
 successfully applied upon the passed constructor.
