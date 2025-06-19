[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [utility](../README.md) / getTaggedType

# Function: getTaggedType()

> **getTaggedType**(...`args`): `string`

Defined in: [src/utility.js:97](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/utility.js#L97)

Returns the tag name extracted from a value's internal type signature.

This function wraps `getTypeSignature` and extracts the value’s internal
`[[Class]]` tag name - e.g., `'Array'` for arrays, `'Date'` for dates, or
even `'FooBar'` for objects _"spoofed"_ via `Symbol.toStringTag` ...

```js
const myObj = { foo: 'bar' }
myObj[Symbol.toStringTag] = 'FooBar';
```

If no argument is passed, the function returns `undefined`.

### Note
The tag name is the portion inside the brackets of the full type signature:

```js
Object.prototype.toString.call([]); // => '[object Array]'
```

Custom tag names can be defined via the `Symbol.toStringTag` property.

Full example code for a successful _"spoofing"_ attempt:

```js
const myObj = { foo: 'bar' }
myObj[Symbol.toStringTag] = 'FooBar';

console.log(myObj+'');                               // '[object FooBar]'
console.log(String(myObj));                          // '[object FooBar]'
console.log(myObj.toString());                       // '[object FooBar]'
console.log(Object.prototype.toString.call(myObj));  // '[object FooBar]'
```

This works for both custom types and overrides of built-in types.

## Parameters

### args

...`any`[]

A variadic argument list. The first argument (`args[0]`) is optional.
 Its **presence** is detected via the result of the forwarding call to
 `getTypeSignature`.

## Returns

`string`

The extracted tag name (e.g. `'Array'`, `'Date'`) or `undefined` if no
 value was provided.
