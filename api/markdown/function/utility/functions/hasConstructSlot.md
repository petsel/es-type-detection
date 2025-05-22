[**@petsel/es-type-detection v1.0.0**](../../../README.md)

***

[@petsel/es-type-detection](../../../modules.md) / [function/utility](../README.md) / hasConstructSlot

# Function: hasConstructSlot()

> **hasConstructSlot**(`value`): `boolean`

Defined in: [src/function/utility.js:57](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/function/utility.js#L57)

Checks whether a passed `value` is possibly constructable.

It does so by just probing the passed value's `[[construct]]`
slot; it does never invoke the passed value itself.

The `construct` proxy handler is allowed to overwrite the
`[[construct]]` slot of a proxied value, but it can not turn
something non constructable into a constructable type.

- see ... [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/construct]
> "The `handler.construct` method is a trap for the `[[Construct]]`
> object internal method, which is used by operations such as the
> `new` operator. In order for the `new` operation to be valid on
> the resulting `Proxy` object, the `target` used to initialize
> the proxy must itself be a valid constructor."

## Parameters

### value

`any`

## Returns

`boolean`

A boolean value which indicates whether the tested
 type could possibly serve as constructor function.
