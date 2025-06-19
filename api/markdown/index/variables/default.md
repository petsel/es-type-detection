[**@petsel/es-type-detection v1.0.0**](../../README.md)

***

[@petsel/es-type-detection](../../modules.md) / [index](../README.md) / default

# Variable: default

> **default**: `object`

Defined in: [src/index.js:83](https://github.com/petsel/es-type-detection/blob/ee065d8dbfab0995c95e9bb864d87647f5391dda/src/index.js#L83)

## Type declaration

### base

> **base**: `object`

#### base.isBigInt()

> **isBigInt**: (`value?`) => `value is BigIntType`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is BigIntType`

Whether the passed value is a bigint, either a primitive bigint value or a purposely boxed `BigInt` object type.

#### base.isBigIntValue()

> **isBigIntValue**: (`value?`) => `value is BigIntValue`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is BigIntValue`

Whether the passed value is a primitive bigint value.

#### base.isBoolean()

> **isBoolean**: (`value?`) => `value is BooleanType`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is BooleanType`

Whether the passed value is boolean, either a primitive boolean value or a boxed `Boolean` object type.

#### base.isBooleanValue()

> **isBooleanValue**: (`value?`) => `value is BooleanValue`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is BooleanValue`

Whether the passed value is a primitive boolean value.

#### base.isBoxedBigInt()

> **isBoxedBigInt**: (`value?`) => `value is BoxedBigInt`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is BoxedBigInt`

Whether the passed value is a purposely boxed `BigInt` object type.

#### base.isBoxedBoolean()

> **isBoxedBoolean**: (`value?`) => `value is BoxedBoolean`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is BoxedBoolean`

Whether the passed value is a boxed `Boolean` object type.

#### base.isBoxedNumber()

> **isBoxedNumber**: (`value?`) => `value is BoxedNumber`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is BoxedNumber`

Whether the passed value is a boxed `Number` object type.

#### base.isBoxedString()

> **isBoxedString**: (`value?`) => `value is BoxedString`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is BoxedString`

Whether the passed value is a boxed `String` object type.

#### base.isBoxedSymbol()

> **isBoxedSymbol**: (`value?`) => `value is BoxedSymbol`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is BoxedSymbol`

Whether the passed value is a purposely boxed `Symbol` object type.

#### base.isDictionaryObject()

> **isDictionaryObject**: (`value?`) => `value is DictionaryObject`

Matches object structures which do not have a prototype object.
Such objects remain unaffected by changes of `Object.prototype`.

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is DictionaryObject`

Whether the passed value can be described as _"Null-prototype object"_
 or _"Prototype-less object"_.

#### base.isFunction()

> **isFunction**: (`value?`) => `value is Function`

Detects any function type, which is ... not only the `typeof` operator
returns the `'function'` string for the operated `value`, but the latter
also features both of a function's call methods `call` and `apply`.

This method is essential and **safe**.

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is Function`

A boolean value which indicates whether
 the tested type is any kind of function.

#### base.isNumber()

> **isNumber**: (`value?`) => `value is NumberType`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is NumberType`

Whether the passed value is a number, either a primitive number value or a boxed `Number` object type.

#### base.isNumberValue()

> **isNumberValue**: (`value?`) => `value is NumberValue`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is NumberValue`

Whether the passed value is a primitive number value.

#### base.isObject()

> **isObject**: (`value?`) => `value is AnyObject`

Matches generic object types hence real objects and boxed objects alike
excluding function types (though they are technically objects too) and
the `null` value, which is a primitive value and just a placeholder for
a yet missing/unassigned object type.

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is AnyObject`

Whether the passed value matches the generic object type.

#### base.isObjectObject()

> **isObjectObject**: (`value?`) => `value is PlainObject`

Matches object structures where the constructor exclusively is the built-in
`Object` type, which does exclude instances of custom ES6-class and ES3
constructor functions.

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is PlainObject`

Whether the passed value is a direct instance of the built-in `Object` type.

#### base.isString()

> **isString**: (`value?`) => `value is StringType`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is StringType`

Whether the passed value is a string, either a primitive string value or a boxed `String` object type.

#### base.isStringValue()

> **isStringValue**: (`value?`) => `value is StringValue`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is StringValue`

Whether the passed value is a primitive string value.

#### base.isSymbol()

> **isSymbol**: (`value?`) => `value is SymbolType`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is SymbolType`

Whether the passed value is a symbol, either a primitive symbol value or a purposely boxed `Symbol` object type.

#### base.isSymbolValue()

> **isSymbolValue**: (`value?`) => `value is SymbolValue`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is SymbolValue`

Whether the passed value is a primitive symbol value.

### error

> **error**: `object`

#### error.isAggregateError()

> **isAggregateError**: (`value?`) => `value is AggregateError`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is AggregateError`

whether the passed value matches exactly the built-in `AggregateError` subtype.

#### error.isError()

> **isError**: (`value?`) => `value is AnyError`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is AnyError`

whether the passed value matches any error type, hence it is
 an instance, either of the basic `Error` type, or of one of the
 built-in error-type subclasses (`SyntaxError`, `ReferenceError`, etc.),
 or of a custom error-type that extends the basic `Error` type.

#### error.isErrorError()

> **isErrorError**: (`value?`) => `value is PlainError`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is PlainError`

whether the passed value matches exactly the built-in basic `Error` type.

#### error.isEvalError()

> **isEvalError**: (`value?`) => `value is EvalError`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is EvalError`

whether the passed value matches exactly the built-in `EvalError` subtype.

#### error.isRangeError()

> **isRangeError**: (`value?`) => `value is RangeError`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is RangeError`

whether the passed value matches exactly the built-in `RangeError` subtype.

#### error.isReferenceError()

> **isReferenceError**: (`value?`) => `value is ReferenceError`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is ReferenceError`

whether the passed value matches exactly the built-in `ReferenceError` subtype.

#### error.isSyntaxError()

> **isSyntaxError**: (`value?`) => `value is SyntaxError`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is SyntaxError`

whether the passed value matches exactly the built-in `SyntaxError` subtype.

#### error.isTypeError()

> **isTypeError**: (`value?`) => `value is TypeError`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is TypeError`

whether the passed value matches exactly the built-in `TypeError` subtype.

#### error.isURIError()

> **isURIError**: (`value?`) => `value is URIError`

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is URIError`

whether the passed value matches exactly the built-in `URIError` subtype.

### flow

> **flow**: `object`

#### flow.doesMatchSafeThenable()

> **doesMatchSafeThenable**: (`value?`) => `value is Thenable`

Verifies whether the passed `value` is either object or function that
features a `then` method, where the latter explicitly is either of both
function variants - arrow expression or function expression/statement -
thus, a `then` method is neither an async nor a generator function.
Like `doesMatchThenable` this function runs a shallow check of whether
the test candidate features the most basic `Thenable` behavior/trait,
just being stricter about the nature of a `then` method.

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is Thenable`

A boolean value which indicates whether the tested value does qualify
 as to be safely applied/used _`Thenable`_.

#### flow.doesMatchThenable()

> **doesMatchThenable**: (`value?`) => `value is Thenable`

Verifies whether the passed `value` is either an object or a function
which features a `then` method; hence it executes a shallow check of
whether the test candidate features the most basic `Thenable` behavior/trait.

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is Thenable`

A boolean value which indicates whether the tested value does qualify
 as a _`Thenable`_ by having

#### flow.isAnyGenerator()

> **isAnyGenerator**: (`value?`) => `value is AnyGenerator`

Detects whether the passed `value` is either kind of generator type,
async or non-async.

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is AnyGenerator`

A boolean value which indicates whether the tested value is either
 an async or a non-async generator type.

#### flow.isAsyncGenerator()

> **isAsyncGenerator**: (`value?`) => `value is AsyncGenerator`

Detects whether the passed `value` is exclusively an `AsyncGenerator` type.

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is AsyncGenerator`

A boolean value which indicates whether the tested value is exclusively an
 `AsyncGenerator` type.

#### flow.isGenerator()

> **isGenerator**: (`value?`) => `value is Generator`

Detects whether the passed `value` is exclusively a `Generator` type.

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is Generator`

A boolean value which indicates whether the tested value is exclusively a
 `Generator` type.

#### flow.isPromise()

> **isPromise**: (`value?`) => `value is Promise<any>`

Detects whether the passed `value` is exclusively a `Promise` type.

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is Promise<any>`

A boolean value which indicates whether the tested value is exclusively a `Promise` type.

### fn

> **fn**: `object`

#### fn.isAnyGeneratorFunction()

> **isAnyGeneratorFunction**: (`value?`) => `value is AnyGeneratorFunction`

Detects whether the passed `value` is either kind of generator function,
async or non-async.

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is AnyGeneratorFunction`

A boolean value which indicates whether the tested value is either
 an async or a non-async generator function.

#### fn.isArrow()

> **isArrow**: (`value?`) => `value is AnyArrow`

Detects whether the passed `value` is either kind of an arrow
function expression - async or non-async.

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is AnyArrow`

A boolean value which indicates whether the tested value is
 either an async or a non-async arrow function expression.

#### fn.isAsyncArrow()

> **isAsyncArrow**: (`value?`) => `value is AsyncFunction`

Detects whether the passed `value` is exclusively an async arrow function.

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is AsyncFunction`

A boolean value which indicates whether the tested value is exclusively
 an async arrow function.

#### fn.isAsyncFunction()

> **isAsyncFunction**: (`value?`) => `value is AsyncFunction`

Detects whether the passed `value` is an async function type, either an
async arrow function expression or an async non-arrow function expression
or an async function statement.
It does not detect an async generator function since the latter is not
an async function itself but the factory function of an async generator.
Async functions do return promises but do not return async generators.

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is AsyncFunction`

A boolean value which indicates whether
 the tested value is an async function.

#### fn.isAsyncGeneratorFunction()

> **isAsyncGeneratorFunction**: (`value?`) => `value is AsyncGeneratorFunction`

Detects whether the passed `value` is exclusively an `AsyncGeneratorFunction` type.

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is AsyncGeneratorFunction`

A boolean value which indicates whether the tested value is exclusively an
 `AsyncGeneratorFunction` type.

#### fn.isAsyncNonArrow()

> **isAsyncNonArrow**: (`value?`) => `value is AsyncFunction`

Detects whether the passed `value` is exclusively one of following two
async function variants, either an async non-arrow function expression
or an async function statement.

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is AsyncFunction`

A boolean value which indicates whether the tested value does match
 exclusively a non-arrow async function.

#### fn.isClass()

> **isClass**: (`value?`) => `value is ClassConstructor<FunctionConstructor>`

Detects whether the passed `value` is a
constructor function implemented as `class`.

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is ClassConstructor<FunctionConstructor>`

A boolean value which indicates whether the
 tested value is a class-constructor function.

#### fn.isConciseGenericMethod()

> **isConciseGenericMethod**: (`value?`) => `value is ConciseGenericMethod`

Detects whether the passed `value` is a concise generic method, a function
which has been created exclusively by a non-async and non-generator shorthand
method definition.

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is ConciseGenericMethod`

A boolean value which indicates whether the tested value is exclusively a
 concise generic method, a function created by a non-async and non-generator
 shorthand method definition.

#### fn.isConstructable()

> **isConstructable**: (`value`) => `boolean`

Detects whether the passed `value` is a constructable function type.

It does so by verifying whether a function has an own `prototype`, and in
case it does, by additionally just probing the `[[construct]]` slot of the
passed possibly constructable type; it does never invoke the passed type.

The `construct` proxy handler is allowed to overwrite the
`[[construct]]` slot of a proxied value, but it cannot turn
something non constructable into a constructable type.

- see ... [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/construct]
> "The `handler.construct` method is a trap for the `[[Construct]]`
> object internal method, which is used by operations such as the
> `new` operator. In order for the `new` operation to be valid on
> the resulting `Proxy` object, the `target` used to initialize
> the proxy must itself be a valid constructor."

##### Parameters

###### value

`any`

##### Returns

`boolean`

A boolean value which indicates whether the
 tested type can serve as constructor function.

#### fn.isES3Function()

> **isES3Function**: (`value?`) => `value is ES3Function`

Detects whether the passed `value` is exclusively the only available
function type of ES3 (in addition to all the built-in constructors).

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is ES3Function`

A boolean value which indicates whether the tested value is exclusively
 the only available/known function type back at ES3 (in addition to all
 the built-in constructor functions).

#### fn.isGeneratorFunction()

> **isGeneratorFunction**: (`value?`) => `value is GeneratorFunction`

Detects whether the passed `value` is exclusively a `GeneratorFunction` type.

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is GeneratorFunction`

A boolean value which indicates whether the tested value is exclusively a
 `GeneratorFunction` type.

#### fn.isGenericFunction()

> **isGenericFunction**: (`value?`) => value is NonAsyncArrow \| ES3Function

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

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

value is NonAsyncArrow \| ES3Function

A boolean value which indicates whether the tested value is either
 a good old ES3 function or a non-async arrow function expression.

#### fn.isNonAsyncArrow()

> **isNonAsyncArrow**: (`value?`) => `value is NonAsyncArrow`

Detects whether the passed `value` is exclusively a non-async arrow function.

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is NonAsyncArrow`

A boolean value which indicates whether the tested value is exclusively
 a non-async arrow function.

#### fn.isUnnamedFunction()

> **isUnnamedFunction**: (`value?`) => `value is UnnamedFunction`

Detects whether the passed `value` is any kind of function type
but without a given name.

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`value is UnnamedFunction`

A boolean value which indicates whether
 the tested type is an unnamed function.

### identity

> **identity**: `object`

#### identity.defineStableTypeIdentity()

> **defineStableTypeIdentity**: (`constructor`, `constructorName`, `taggedType?`) => `boolean`

Takes a constructor function, changes some of the function's related property
descriptors according to additionally passed name and tagged type parameters,
and returns a boolean value which indicates whether the "Stable Type Identity"
could be established successfully.

##### Parameters

###### constructor

[`ES3Function`](../../function/type-aliases/ES3Function.md) | [`ClassConstructor`](../../type-identity/type-aliases/ClassConstructor.md)

###### constructorName

`string`

###### taggedType?

`string`

##### Returns

`boolean`

Whether the "Stable Type Identity" could be
 successfully applied upon the passed constructor.

#### identity.hasBuiltinTypeIdentity()

> **hasBuiltinTypeIdentity**: (...`args`) => `boolean`

Does approve whether the passed value features the type-identity of any built-in type
that is ...the passed value is an instance of one of the language core's built-in
types and either does not have any `Symbol.toStringTag` related slots or features
just the type's standard-conform default `Symbol.toStringTag` property-descriptor.

##### Parameters

###### args

...`any`[]

A variadic argument list. The first argument (`args[0]`) is the optional
 `value` parameter. Its **presence** is detected via `args.length`, allowing
 the function to distinguish between an explicitly passed `undefined` value
 and a completely omitted argument.

##### Returns

`boolean`

Whether the passed value features the built-in type-identity.

#### identity.hasCustomTypeIdentity()

> **hasCustomTypeIdentity**: (...`args`) => `boolean`

Does approve whether the passed value features a custom applied type-identity,
which is ... there are `Symbol.toStringTag` related slots available, directly
owned either by the passed value itself or by its prototype, and none of them
can be matched against a built-in type-identity.

##### Parameters

###### args

...`any`[]

A variadic argument list. The first argument (`args[0]`) is the optional
 `value` parameter. Its **presence** is detected via `args.length`, allowing
 the function to distinguish between an explicitly passed `undefined` value
 and a completely omitted argument.

##### Returns

`boolean`

Whether the passed value features a custom applied type-identity.

#### identity.hasStableTypeIdentity()

> **hasStableTypeIdentity**: (...`args`) => `boolean`

Does approve whether the passed value features a stable type-identity, which is ...
either the value comes with the built-in type-identity of one of the core language's
types, or the value has been processed via `defineStableTypeIdentity`, or it features
property-descriptors which are in line with the result of the latter process.

##### Parameters

###### args

...`any`[]

A variadic argument list. The first argument (`args[0]`) is the optional
 `value` parameter. Its **presence** is detected via `args.length`, allowing
 the function to distinguish between an explicitly passed `undefined` value
 and a completely omitted argument.

##### Returns

`boolean`

Whether the passed value features a stable type-identity.

### utility

> **utility**: `object`

#### utility.getDefinedConstructor()

> **getDefinedConstructor**: (`value?`) => `NewableFunction` \| [`ES3Function`](../../function/type-aliases/ES3Function.md) \| [`ClassConstructor`](../../utility/type-aliases/ClassConstructor.md)

##### Parameters

###### value?

`any` = `null`

An optionally passed value of any type.

##### Returns

`NewableFunction` \| [`ES3Function`](../../function/type-aliases/ES3Function.md) \| [`ClassConstructor`](../../utility/type-aliases/ClassConstructor.md)

if available, the passed value's constructor-function - either a built-in
 type's constructor-function or an ES6-class constructor-function or an
 ES3-function - otherwise `undefined`.

#### utility.getDefinedConstructorName()

> **getDefinedConstructorName**: (`value?`) => `string`

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

##### Parameters

###### value?

`any`

An optionally passed value of any type.

##### Returns

`string`

if available, the passed value's constructor-function name - retrieved
 exclusively from linked property-descriptors - otherwise `undefined`.
 Any unnamed function refers to the empty string value/`''` as its name.

#### utility.getTaggedType()

> **getTaggedType**: (...`args`) => `string`

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

##### Parameters

###### args

...`any`[]

A variadic argument list. The first argument (`args[0]`) is optional.
 Its **presence** is detected via the result of the forwarding call to
 `getTypeSignature`.

##### Returns

`string`

The extracted tag name (e.g. `'Array'`, `'Date'`) or `undefined` if no
 value was provided.

#### utility.getTypeSignature()

> **getTypeSignature**: (...`args`) => `string`

Returns the internal type signature of the first argument, if provided.

This function exposes a value’s internal `[[Class]]` tag (aka type signature),
such as `'[object Function]'` for a function or `'[object String]'` for a string -
whether it's a primitive string value or a `String` object type.

Internally, it delegates to the standard prototype `toString` method:

```js
Object.prototype.toString.call(value);
```

##### Parameters

###### args

...`any`[]

A variadic argument list. The first argument (`args[0]`) is the optional
 `value` parameter. Its **presence** is detected via `args.length`, allowing
 the function to distinguish between an explicitly passed `undefined` value
 and a completely omitted argument.

##### Returns

`string`

The value’s internal type signature (e.g., `'[object Array]'` for an
 `Array` instance), or the `undefined` value if no argument was passed.

#### utility.hasConstructSlot()

> **hasConstructSlot**: (`value`) => `boolean`

Checks whether a passed `value` is possibly constructable.

It does so by just probing the passed value's `[[construct]]`
slot; it does never invoke the passed value itself.

The `construct` proxy handler is allowed to overwrite the
`[[construct]]` slot of a proxied value, but it cannot turn
something non constructable into a constructable type.

- see ... [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/construct]
> "The `handler.construct` method is a trap for the `[[Construct]]`
> object internal method, which is used by operations such as the
> `new` operator. In order for the `new` operation to be valid on
> the resulting `Proxy` object, the `target` used to initialize
> the proxy must itself be a valid constructor."

##### Parameters

###### value

`any`

##### Returns

`boolean`

A boolean value which indicates whether the tested
 type could possibly serve as constructor function.

#### utility.hasOwnPrototype()

> **hasOwnPrototype**: (`value`) => `boolean`

Detects whether a passed value features an own `prototype` property.

##### Parameters

###### value

`Function`

Assumes a function type but does not check for it.

##### Returns

`boolean`

Whether the passed type features an own `prototype` property.

#### utility.hasOwnWritablePrototype()

> **hasOwnWritablePrototype**: (`value`) => `boolean`

Detects whether a passed value features an own, truly `writable`
`prototype` property.

##### Parameters

###### value

`Function`

Assumes a function type but does not check for it.

##### Returns

`boolean`

Whether the passed type features an own, truly `writable`
 `prototype` property.

#### utility.resolveType()

> **resolveType**: (...`args`) => `string`

Resolves the passed value's type-name through a combined, balanced approach of
retrieving either the value's constructor-function name or its `toString` tag.

This works for every built-in type.

In order to assure stable type-identity of custom type systems, based
on both class- and ES3-constructor functions, that remain unaffected
by code minification processes, one has to apply a utility function
which does permanently brand such types by writing and freezing both
of a constructor-function's property-descriptors - the function's `name`
property and its `Symbol.toStringTag` slot.

##### Parameters

###### args

...`any`[]

A variadic argument list. The first argument (`args[0]`) is the optional
 `value` parameter. Its **presence** is detected via `args.length`, allowing
 the function to distinguish between an explicitly passed `undefined` value
 and a completely omitted argument.

##### Returns

`string`

A `'string'` value which either corresponds with the passed value's
 constructor-function's name or its tagged type; or the `undefined`
 value if no argument was passed.
