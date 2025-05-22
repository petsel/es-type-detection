[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [type-identity](../README.md) / hasStableTypeIdentity

# Function: hasStableTypeIdentity()

> **hasStableTypeIdentity**(...`args`): `boolean`

Defined in: [src/type-identity/index.js:161](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/type-identity/index.js#L161)

Does approve whether the passed value features a stable type-identity, which is ...
either the value comes with the built-in type-identity of one of the core language's
types, or the value has been processed via `defineStableTypeIdentity`, or it features
property-descriptors which are in line with the result of the latter process.

## Parameters

### args

...`any`[]

A variadic argument list. The first argument (`args[0]`) is the optional
 `value` parameter. Its **presence** is detected via `args.length`, allowing
 the function to distinguish between an explicitly passed `undefined` value
 and a completely omitted argument.

## Returns

`boolean`

Whether the passed value features a stable type-identity.
