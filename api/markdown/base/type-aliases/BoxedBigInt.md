[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [base](../README.md) / BoxedBigInt

# Type Alias: BoxedBigInt

> **BoxedBigInt**\<\> = `BigInt` & `object`

Defined in: [src/typedef.js:163](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/typedef.js#L163)

A purposely boxed `BigInt` object type, e.g., created via
 `Object(BigInt(1_000_000_000))` or `Object(1_000_000_000n)`.

 Boxed `BigInt` objects can participate in arithmetic operations
 just like primitive bigint values. Consider the following example:

 ```
 const bigintValue_1 = 1_000_000_000n;
 const bigintValue_2 = 2_000_000_000n;

 const bigintObject_1 = Object(bigintValue_1);
 const bigintObject_2 = Object(bigintValue_2);

 const bigintResult_A = bigintValue_1 + bigintObject_2;
 const bigintResult_B = bigintObject_2 + bigintObject_2;

 console.log('(typeof bigintValue_1) ...', (typeof bigintValue_1)); // 'bigint'
 console.log('(typeof bigintValue_2) ...', (typeof bigintValue_2)); // 'bigint'

 console.log('(typeof bigintObject_1) ...', (typeof bigintObject_1)); // 'object'
 console.log('(typeof bigintObject_2) ...', (typeof bigintObject_2)); // 'object'

 console.log('(bigintValue_1 === bigintObject_1) ...', (bigintValue_1 === bigintObject_1));  // false
 console.log('(bigintValue_1 == bigintObject_1) ...', (bigintValue_1 == bigintObject_1));    // true

 console.log('(Object(bigintValue_1) === Object(bigintValue_1)) ...', (Object(bigintValue_1) === Object(bigintValue_1)));  // false
 console.log('(Object(bigintValue_1) == Object(bigintValue_1)) ...', (Object(bigintValue_1) == Object(bigintValue_1)));    // false

 console.log('(typeof bigintResult_A) ...', (typeof bigintResult_A)); // 'bigint'
 console.log({ bigintResult_A }); // { bigintResult_A: 3000000000n }

 console.log('(typeof bigintResult_B) ...', (typeof bigintResult_B)); // 'bigint'
 console.log({ bigintResult_B }); // { bigintResult_B: 4000000000n }
 ```

 This demonstrates that the internal type of any bigint operand
 (primitive or boxed) does not affect arithmetic operations.
 Both boxed and primitive values can be used interchangeably in math.

## Type declaration

### \_\_brand

> **\_\_brand**: `"BoxedBigInt"`

## Type Parameters
