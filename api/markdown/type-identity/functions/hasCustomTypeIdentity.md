[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [type-identity](../README.md) / hasCustomTypeIdentity

# Function: hasCustomTypeIdentity()

> **hasCustomTypeIdentity**(...`args`): `boolean`

Defined in: [src/type-identity/index.js:120](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/type-identity/index.js#L120)

Does approve whether the passed value features a custom applied type-identity,
which is ... there are `Symbol.toStringTag` related slots available, directly
owned either by the passed value itself or by its prototype, and none of them
can be matched against a built-in type-identity.

## Parameters

### args

...`any`[]

A variadic argument list. The first argument (`args[0]`) is the optional
 `value` parameter. Its **presence** is detected via `args.length`, allowing
 the function to distinguish between an explicitly passed `undefined` value
 and a completely omitted argument.

## Returns

`boolean`

Whether the passed value features a custom applied type-identity.
