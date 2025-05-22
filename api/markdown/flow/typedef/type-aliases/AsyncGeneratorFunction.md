[**@petsel/es-type-detection v1.0.0**](../../../README.md)

***

[@petsel/es-type-detection](../../../modules.md) / [flow/typedef](../README.md) / AsyncGeneratorFunction

# Type Alias: AsyncGeneratorFunction

> **AsyncGeneratorFunction**\<\> = `Function` & `object`

Defined in: [src/function/typedef.js:30](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/function/typedef.js#L30)

The constructor function for `AsyncGenerator` instances, i.e.:
```js
/** @type {AsyncGeneratorFunction} */
const AsyncGeneratorCtor = (async function* () {}).constructor;
```

## Type declaration

### \_\_brand

> **\_\_brand**: `"AsyncGeneratorFunction"`

### prototype

> **prototype**: [`AsyncGenerator`](../../../function/typedef/README.md#asyncgenerator)

## Type Parameters
