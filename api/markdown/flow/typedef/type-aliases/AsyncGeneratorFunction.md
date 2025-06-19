[**@petsel/es-type-detection v1.0.0**](../../../README.md)

***

[@petsel/es-type-detection](../../../modules.md) / [flow/typedef](../README.md) / AsyncGeneratorFunction

# Type Alias: AsyncGeneratorFunction

> **AsyncGeneratorFunction**\<\> = `Function` & `object`

Defined in: [src/function/typedef.js:34](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/function/typedef.js#L34)

The constructor function for `AsyncGenerator` instances, i.e.:
```js
/** @type {AsyncGeneratorFunction} */
const AsyncGeneratorCtor = (async function* () {}).constructor;
```
`@property {'AsyncGeneratorFunction'} [Symbol.toStringTag]`
 Defines the `Symbol.toStringTag` property as `"AsyncGeneratorFunction"`.

## Type declaration

### \_\_brand

> **\_\_brand**: `"AsyncGeneratorFunction"`

### \_\_constructorName

> **\_\_constructorName**: `"AsyncGeneratorFunction"`

### prototype

> **prototype**: [`AsyncGenerator`](../../../function/typedef/README.md#asyncgenerator)

## Type Parameters
