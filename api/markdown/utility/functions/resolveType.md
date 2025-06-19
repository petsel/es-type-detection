[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [utility](../README.md) / resolveType

# Function: resolveType()

> **resolveType**(...`args`): `string`

Defined in: [src/utility.js:256](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/utility.js#L256)

Resolves the passed value's type-name through a combined, balanced approach of
retrieving either the value's constructor-function name or its `toString` tag.

This works for every built-in type.

In order to assure stable type-identity of custom type systems, based
on both class- and ES3-constructor functions, that remain unaffected
by code minification processes, one has to apply a utility function
which does permanently brand such types by writing and freezing both
of a constructor-function's property-descriptors - the function's `name`
property and its `Symbol.toStringTag` slot.

## Parameters

### args

...`any`[]

A variadic argument list. The first argument (`args[0]`) is the optional
 `value` parameter. Its **presence** is detected via `args.length`, allowing
 the function to distinguish between an explicitly passed `undefined` value
 and a completely omitted argument.

## Returns

`string`

A `'string'` value which either corresponds with the passed value's
 constructor-function's name or its tagged type; or the `undefined`
 value if no argument was passed.
