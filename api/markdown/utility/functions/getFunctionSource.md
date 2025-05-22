[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [utility](../README.md) / getFunctionSource

# Function: getFunctionSource()

> **getFunctionSource**(`value`): `string`

Defined in: [src/utility.js:224](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/utility.js#L224)

Reaches for a function's stringified version by making
use of ...

```
Function.prototype.toString.call(value);
```

... which helps in passing by some possibly manipulated
`toString` functionality.

## Parameters

### value

`Function`

Assumes a function type, but does not check for it.

## Returns

`string`

Returns a function's stringified implementation.
