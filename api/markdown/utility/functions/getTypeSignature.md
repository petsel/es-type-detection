[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [utility](../README.md) / getTypeSignature

# Function: getTypeSignature()

> **getTypeSignature**(...`args`): `string`

Defined in: [src/utility.js:45](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/utility.js#L45)

Returns the internal type signature of the first argument, if provided.

This function exposes a value’s internal `[[Class]]` tag (aka type signature),
such as `'[object Function]'` for a function or `'[object String]'` for a string -
whether it's a primitive string value or a `String` object type.

Internally, it delegates to the standard prototype `toString` method:

```js
Object.prototype.toString.call(value);
```

## Parameters

### args

...`any`[]

A variadic argument list. The first argument (`args[0]`) is the optional
 `value` parameter. Its **presence** is detected via `args.length`, allowing
 the function to distinguish between an explicitly passed `undefined` value
 and a completely omitted argument.

## Returns

`string`

The value’s internal type signature (e.g., `'[object Array]'` for an
 `Array` instance), or the `undefined` value if no argument was passed.
