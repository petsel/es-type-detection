# Getting Started

To get started with `es-type-detection`, install it:

```bash
npm install es-type-detection
```

Use it like this:

```js
import { typeOf } from 'es-type-detection';

console.log(typeOf(new Map())); // Map
console.log(typeOf(null)); // Null
```
