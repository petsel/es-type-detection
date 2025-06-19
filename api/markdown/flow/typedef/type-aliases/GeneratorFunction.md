[**@petsel/es-type-detection v1.0.0**](../../../README.md)

***

[@petsel/es-type-detection](../../../modules.md) / [flow/typedef](../README.md) / GeneratorFunction

# Type Alias: GeneratorFunction

> **GeneratorFunction**\<\> = `Function` & `object`

Defined in: [src/function/typedef.js:16](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/function/typedef.js#L16)

The constructor/factory function for `Generator` instances, i.e.:
```js
/** @type {GeneratorFunction} */
const generatorFunction = (function* () { yield 1; }).constructor;
```
`@property {'GeneratorFunction'} [Symbol.toStringTag]`
 Defines the `Symbol.toStringTag` property as `"GeneratorFunction"`.

## Type declaration

### \_\_brand

> **\_\_brand**: `"GeneratorFunction"`

### \_\_constructorName

> **\_\_constructorName**: `"GeneratorFunction"`

### prototype

> **prototype**: [`Generator`](../../../function/typedef/README.md#generator)

## Type Parameters
