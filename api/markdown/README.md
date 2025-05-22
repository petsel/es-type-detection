**@petsel/es-type-detection v1.0.0**

***

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
const { isConstructable, isClass, isGeneratorFunction, isNonAsyncArrow } = fn;
const { isAsyncGenerator, isPromise, doesMatchSafeThenable } = flow;
const { resolveType } = utility;

console.log(isClass(class X {})); // true
console.log(isFunction((_) => _)); // true
console.log(resolveType([])); // "Array"
```

## 📘 Documentation

- [Project Website](https://petsel.github.io/es-type-detection/)

- [📘 API Reference (HTML, TypeDoc)](https://petsel.github.io/es-type-detection/api/html/index.html)
- [📊 Test Coverage Report](https://petsel.github.io/es-type-detection/coverage/index.html)
<!--[📄 API Docs (Markdown Export)](https://petsel.github.io/es-type-detection/api/markdown/modules.md)-->

## 🛡 License and Usage Notice

This project is licensed under the MIT License.

MIT © [Peter Seliger](https://github.com/petsel)

See [`LICENSE`](_media/LICENSE) for details.

### Additional Use Guidelines

Please read the [`TRADEMARK.md`](_media/TRADEMARK.md) for rules regarding project name use, compatibility requirements, and monetization restrictions.

### Project setup

- clone (or download)
  ```bash
  git clone git@github.com:petsel/es-type-detection.git
  ```
- install
  ```bash
  npm ci
  ```

### Developer Note(s)

- [Notes about the used **TypeDoc** setup](_media/README_typedoc.md)
- Automated tests, coverage reports, and API docs are deployed on every push to `dev`.
