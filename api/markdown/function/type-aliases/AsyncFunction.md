[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [function](../README.md) / AsyncFunction

# Type Alias: AsyncFunction

> **AsyncFunction**\<\> = `Function` & `object`

Defined in: [src/function/typedef.js:61](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/function/typedef.js#L61)

An `AsyncFunction` type that misses its own `prototype` slot - created
either by an async arrow function expression or by either of both async
non-arrow function variants, an async function expression or an async
function statement.
`@property {'AsyncFunction'} [Symbol.toStringTag]`
 Defines the `Symbol.toStringTag` property as `"AsyncFunction"`.

Within a TypeScript environment (hence `.ts` instead of `.js` files)
one can annotate `AsyncFunction` like that ...

const AsyncFunctionConstructor = (async () => {}).constructor;
export type AsyncFunction = typeof AsyncFunctionConstructor;

## Type declaration

### \_\_brand

> **\_\_brand**: `"AsyncFunction"`

### \_\_constructorName

> **\_\_constructorName**: `"AsyncFunction"`

### prototype

> **prototype**: `undefined`

## Type Parameters
