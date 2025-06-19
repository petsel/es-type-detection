[**@petsel/es-type-detection v1.0.0**](../../../README.md)

***

[@petsel/es-type-detection](../../../modules.md) / [function/utility](../README.md) / isConstructable

# Function: isConstructable()

> **isConstructable**(`value`): `boolean`

Defined in: [src/function/utility.js:95](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/function/utility.js#L95)

Detects whether the passed `value` is a constructable function type.

It does so by verifying whether a function has an own `prototype`, and in
case it does, by additionally just probing the `[[construct]]` slot of the
passed possibly constructable type; it does never invoke the passed type.

The `construct` proxy handler is allowed to overwrite the
`[[construct]]` slot of a proxied value, but it cannot turn
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
