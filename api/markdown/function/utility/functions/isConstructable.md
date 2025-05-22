[**@petsel/es-type-detection v1.0.0**](../../../README.md)

***

[@petsel/es-type-detection](../../../modules.md) / [function/utility](../README.md) / isConstructable

# Function: isConstructable()

> **isConstructable**(`value`): `boolean`

Defined in: [src/function/utility.js:90](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/function/utility.js#L90)

Detects whether the passed `value` is a constructable function type.

It does so by just probing the `[[construct]]` slot of the passed
possibly constructable type; it does never invoke the passed type.

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

A boolean value which indicates whether the
 tested type can serve as constructor function.
