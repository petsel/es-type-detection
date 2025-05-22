## 🧰 TypeDoc Setup for JavaScript with JSDoc

This setup ensures TypeDoc works with `.js` files and JSDoc annotations, without triggering errors from `undici-types` or strict type checking.

### ✅ Key Points:

- `tsconfig.typedoc.json` disables ambient types (`@types/node`) to avoid type conflicts.
- TypeScript module resolution is set to `node` to avoid `nodenext` complexity.
- Source code remains in `.js` with `// @ts-check` supported.

### 🚀 Commands:

```bash
npm run docs:html    # HTML docs in docs/api-html/
npm run docs:md      # Markdown docs in docs/api-md/
npm run docs         # Both
```

Make sure you've installed:

```bash
npm install --save-dev typedoc typedoc-plugin-markdown
```
