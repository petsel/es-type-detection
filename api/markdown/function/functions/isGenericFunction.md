[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [function](../README.md) / isGenericFunction

# Function: isGenericFunction()

> **isGenericFunction**(`value?`): value is NonAsyncArrow \| ES3Function

Defined in: [src/function/index.js:304](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/function/index.js#L304)

Detects whether the passed `value` is a generic (unspecific/non-specific)
function ...

- either a good old ES3 function,
- or a non-async arrow function expression.
- or either a non-async and non-generator concise method (shorthand function definition).

Thus, the following specific (non-generic) function types are excluded ...

- class constructor functions,
- any generator function,
- any async function variant,
- extended `Function` types,
- built-in constructor functions,
- Web Api constructor functions.

## Parameters

### value?

`any`

An optionally passed value of any type.

## Returns

value is NonAsyncArrow \| ES3Function

A boolean value which indicates whether the tested value is either
 a good old ES3 function or a non-async arrow function expression.
