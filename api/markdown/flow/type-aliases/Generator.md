[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [flow](../README.md) / Generator

# Type Alias: Generator

> **Generator**\<\> = `object` & `object`

Defined in: [src/flow/typedef.js:30](https://github.com/petsel/es-type-detection/blob/92dfb41aaf7622d4972dbde1d89cebef8471f4d7/src/flow/typedef.js#L30)

A generator type created e.g. as:
```js
/** @type {Generator} */
const generatorType = (function* () { yield 1; })();
```

## Type declaration

### \_\_brand

> **\_\_brand**: `"Generator"`

### constructor

> **constructor**: [`GeneratorFunction`](../typedef/type-aliases/GeneratorFunction.md)

### next()

> **next**: (`value?`) => [`IteratorResult`](../typedef/type-aliases/IteratorResult.md)\<`any`\>

#### Parameters

##### value?

`any`

#### Returns

[`IteratorResult`](../typedef/type-aliases/IteratorResult.md)\<`any`\>

### return()?

> `optional` **return**: (`value?`) => [`IteratorResult`](../typedef/type-aliases/IteratorResult.md)\<`any`\>

#### Parameters

##### value?

`any`

#### Returns

[`IteratorResult`](../typedef/type-aliases/IteratorResult.md)\<`any`\>

### throw()?

> `optional` **throw**: (`error?`) => [`IteratorResult`](../typedef/type-aliases/IteratorResult.md)\<`any`\>

#### Parameters

##### error?

`any`

#### Returns

[`IteratorResult`](../typedef/type-aliases/IteratorResult.md)\<`any`\>

## Type Parameters
