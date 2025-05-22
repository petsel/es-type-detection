# ES Type Detection

> A modern utility library for ECMAScript type detection — built to be safe, testable, and extensible — zero dependencies, fully inspectable.

<!--[![codecov](https://codecov.io/gh/petsel/es-type-detection/branch/dev/graph/badge.svg)](https://codecov.io/gh/petsel/es-type-detection) [![CI](https://github.com/petsel/es-type-detection/actions/workflows/deploy.yml/badge.svg)](https://github.com/petsel/es-type-detection/actions/workflows/deploy.yml)-->

[![codecov](https://codecov.io/gh/petsel/es-type-detection/branch/dev/graph/badge.svg)](https://codecov.io/gh/petsel/es-type-detection) [![CI](https://github.com/petsel/es-type-detection/actions/workflows/deploy.yml/badge.svg)](https://github.com/petsel/es-type-detection/actions)

## 🎁 Why Use This Library?

- 📦 Zero dependencies, suitable for any JavaScript runtime.
- 🔢 Detection of basic built-in types and primitive vs boxed types detection.
- 🧠 Distinguishes function-types accurately — class vs. function vs. generator vs. async and much more.
- 🔥 Fine grained error-type detection.
- 🌊 Accurate _"flow-type"_ detection — generators, thenables, promises.
- 🧩 Extensible, and comes with both type-identity detection and stable type-identity tagging/branding.
- 🧪 Fully tested with coverage reporting.
- 📘 Richly documented via TypeDoc.

## 📦 Installation

```bash
npm install @petsel/es-type-detection
```

## 🚀 Quick Usage

```js
import { base, fn, flow, utility } from '@petsel/es-type-detection';

const { isFunction, isObject, isBoxedNumber, isNumberValue, isNumber } = base;
const { isConstructable, isClass, isGeneratorFunction, isAsyncArrow } = fn;
const { isAsyncGenerator, isPromise, doesMatchSafeThenable } = flow;
const { getTaggedType } = utility;

console.log(isAsyncArrow(async () => {})); // true
console.log(isBoxedNumber(new Number(7))); // true
console.log(getTaggedType(Symbol('x'))); // 'Symbol'
```

## 🔗 Resources

- [Usage Guide](./usage.md)
- [API Documentation](./api/html/index.html)
- [Coverage Report](./coverage/index.html)
- [Changelog](./changelog.md)

---

MIT License · Created by [Peter Seliger](https://github.com/petsel)
