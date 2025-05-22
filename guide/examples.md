# Examples

## Basic Usage

```js
typeOf(42); // 'Number'
typeOf('hello'); // 'String'
typeOf(undefined); // 'Undefined'
typeOf(Symbol('x')); // 'Symbol'
typeOf(() => {}); // 'Function'
```

## Complex Types

```js
typeOf(new Set()); // 'Set'
typeOf(Promise.resolve()); // 'Promise'
```
