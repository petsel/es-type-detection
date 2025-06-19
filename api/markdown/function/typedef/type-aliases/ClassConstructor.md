[**@petsel/es-type-detection v1.0.0**](../../../README.md)

***

[@petsel/es-type-detection](../../../modules.md) / [function/typedef](../README.md) / ClassConstructor

# Type Alias: ClassConstructor()\<T\>

> **ClassConstructor**\<`T`\> = (...`args`) => `T`

Defined in: [src/function/typedef.js:127](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/function/typedef.js#L127)

The above generic definition of a class-based constructor function
represents any constructable class; or in other words - it represents
a `T` type-specific class constructor.

To be used later as e.g. follows ...

/** @type {ClassConstructor<User, [string, number]>} */
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

## Type Parameters

### T

`T`

## Parameters

### args

...`any`[]

## Returns

`T`
