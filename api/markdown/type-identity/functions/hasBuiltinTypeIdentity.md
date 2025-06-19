[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [type-identity](../README.md) / hasBuiltinTypeIdentity

# Function: hasBuiltinTypeIdentity()

> **hasBuiltinTypeIdentity**(...`args`): `boolean`

Defined in: [src/type-identity/index.js:42](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/type-identity/index.js#L42)

Does approve whether the passed value features the type-identity of any built-in type
that is ...the passed value is an instance of one of the language core's built-in
types and either does not have any `Symbol.toStringTag` related slots or features
just the type's standard-conform default `Symbol.toStringTag` property-descriptor.

## Parameters

### args

...`any`[]

A variadic argument list. The first argument (`args[0]`) is the optional
 `value` parameter. Its **presence** is detected via `args.length`, allowing
 the function to distinguish between an explicitly passed `undefined` value
 and a completely omitted argument.

## Returns

`boolean`

Whether the passed value features the built-in type-identity.
