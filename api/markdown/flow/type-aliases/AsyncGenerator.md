[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [flow](../README.md) / AsyncGenerator

# Type Alias: AsyncGenerator

> **AsyncGenerator**\<\> = `object` & `object`

Defined in: [src/flow/typedef.js:50](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/flow/typedef.js#L50)

An async generator type created e.g. as:
```js
/** @type {AsyncGenerator} */
const asyncGeneratorType = (async function* () {
  yield await Promise.resolve(1);
})();
```

## Type declaration

### \_\_brand

> **\_\_brand**: `"AsyncGenerator"`

### constructor

> **constructor**: [`AsyncGeneratorFunction`](../typedef/type-aliases/AsyncGeneratorFunction.md)

### next()

> **next**: (`value?`) => `Promise`\<[`IteratorResult`](../typedef/type-aliases/IteratorResult.md)\<`any`\>\>

#### Parameters

##### value?

`any`

#### Returns

`Promise`\<[`IteratorResult`](../typedef/type-aliases/IteratorResult.md)\<`any`\>\>

### return()?

> `optional` **return**: (`value?`) => `Promise`\<[`IteratorResult`](../typedef/type-aliases/IteratorResult.md)\<`any`\>\>

#### Parameters

##### value?

`any`

#### Returns

`Promise`\<[`IteratorResult`](../typedef/type-aliases/IteratorResult.md)\<`any`\>\>

### throw()?

> `optional` **throw**: (`error?`) => `Promise`\<[`IteratorResult`](../typedef/type-aliases/IteratorResult.md)\<`any`\>\>

#### Parameters

##### error?

`any`

#### Returns

`Promise`\<[`IteratorResult`](../typedef/type-aliases/IteratorResult.md)\<`any`\>\>

## Type Parameters
