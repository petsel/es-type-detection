[**@petsel/es-type-detection v1.0.0**](../../../README.md)

***

[@petsel/es-type-detection](../../../modules.md) / [flow/typedef](../README.md) / GeneratorFunction

# Type Alias: GeneratorFunction

> **GeneratorFunction**\<\> = `Function` & `object`

Defined in: [src/function/typedef.js:13](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/function/typedef.js#L13)

The constructor/factory function for `Generator` instances, i.e.:
```js
/** @type {GeneratorFunction} */
const generatorFunction = (function* () { yield 1; }).constructor;
```

## Type declaration

### \_\_brand

> **\_\_brand**: `"GeneratorFunction"`

### prototype

> **prototype**: [`Generator`](../../../function/typedef/README.md#generator)

## Type Parameters
