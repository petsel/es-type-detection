[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [type-identity](../README.md) / defineStableTypeIdentity

# Function: defineStableTypeIdentity()

> **defineStableTypeIdentity**(`constructor`, `constructorName`, `taggedType?`): `boolean`

Defined in: [src/type-identity/index.js:261](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/type-identity/index.js#L261)

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
