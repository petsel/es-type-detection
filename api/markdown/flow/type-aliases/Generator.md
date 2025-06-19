[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [flow](../README.md) / Generator

# Type Alias: Generator

> **Generator**\<\> = `object`

Defined in: [src/flow/typedef.js:32](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/flow/typedef.js#L32)

A generator type created e.g. as:
```js
/** @type {Generator} */
const generatorType = (function* () { yield 1; })();
```
`@property {'Generator'} [Symbol.toStringTag]`
 Defines the `Symbol.toStringTag` property as `"Generator"`.

## Type Parameters

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
