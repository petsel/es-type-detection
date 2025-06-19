[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [utility](../README.md) / getDefinedConstructorName

# Function: getDefinedConstructorName()

> **getDefinedConstructorName**(`value?`): `string`

Defined in: [src/utility.js:205](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/utility.js#L205)

Implements a getter for the passed value's constructor-function name.
In case of being able to retrieve a constructor, the remaining constraint
is due to any function's `name` related property descriptor, which by default,
hence without any intentional further change, is ...

```
{ ... writable: false, enumerable: false, configurable: true }
```

...
- neither writable
- nor enumerable
- but configurable.

Thus, something like ...

```
Object.defineProperty(fct, 'name', { value: 'FOO' })
```

... will change any passed function's `name` value to "FOO". As long
as the latter can be safely excluded, the detection approach is safe.
One even can or better yet should take advantage of it, branding a
function permanently, in order to e.g. let constructor functions
harden each their name as a countermeasure to code-minification tasks.

## Parameters

### value?

`any`

An optionally passed value of any type.

## Returns

`string`

if available, the passed value's constructor-function name - retrieved
 exclusively from linked property-descriptors - otherwise `undefined`.
 Any unnamed function refers to the empty string value/`''` as its name.
