export const asyncGeneratorFunctionExpression = async function* () {
  yield 1;
};
export const AsyncGeneratorFunction = asyncGeneratorFunctionExpression.constructor;
export const asyncGeneratorInstance = asyncGeneratorFunctionExpression();
export const asyncGeneratorPrototype = Object.getPrototypeOf(asyncGeneratorInstance);

export const generatorFunctionExpression = function* () {
  yield 1;
};
export const GeneratorFunction = generatorFunctionExpression.constructor;
export const generatorInstance = generatorFunctionExpression();
export const generatorPrototype = Object.getPrototypeOf(generatorInstance);

export const asyncArrowFunctionExpression = async (_) => _;
export const asyncNonArrowFunctionExpression = async function () {};
export const AsyncFunction = asyncNonArrowFunctionExpression.constructor;

export const conciseMethod = {
  concise(...args) {
    return args;
  }
}.concise;
export const spoofedArrowFunction = Object.assign(() => {}, { prototype: {} });

export class MyClass {}
export class MySubclass extends MyClass {}

export class TaggedClass {
  get [Symbol.toStringTag]() {
    return 'TaggedClass';
  }
}
export class ImplicitlyTaggedSubclass extends TaggedClass {}

export class ExplicitlyTaggedSubclass extends TaggedClass {
  get [Symbol.toStringTag]() {
    return 'ExplicitlyTaggedSubclass';
  }
}
