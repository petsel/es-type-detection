const asyncGeneratorFunctionExpression = async function* () {
  yield 1;
};
// const AsyncGeneratorFunction = asyncGeneratorFunctionExpression.constructor;
const AsyncGenerator = Object.getPrototypeOf(asyncGeneratorFunctionExpression());

const generatorFunctionExpression = function* () {
  yield 1;
};
// const GeneratorFunction = generatorFunctionExpression.constructor;
const Generator = Object.getPrototypeOf(generatorFunctionExpression());

const asyncArrowFunctionExpression = async (_) => _;
const asyncNonArrowFunctionExpression = async function () {};
// const AsyncFunction = asyncNonArrowFunctionExpression.constructor;

class MyClass {}
class MySubclass extends MyClass {}

class TaggedClass {
  get [Symbol.toStringTag]() {
    return 'TaggedClass';
  }
}
class ImplicitlyTaggedSubclass extends TaggedClass {}

class ExplicitlyTaggedSubclass extends TaggedClass {
  get [Symbol.toStringTag]() {
    return 'ExplicitlyTaggedSubclass';
  }
}
class SubclassedFunction extends Function {
  constructor(...args) {
    super(...args);
  }
}
const functionSubtype = new SubclassedFunction('width = 1', 'height = 1', 'return width * height');

const introspectionList = [
  [true, 'true'], // Boolean
  [1_234_567, '1_234_567'], // Number
  ['string', "'string'"], // String

  [BigInt(0), 'BigInt(0)'], // BigInt
  [Symbol('sym'), "Symbol('sym')"], // Symbol

  [new Boolean(true), 'new Boolean(true)'], // Boolean
  [new Number(1_234_567), 'new Number(1_234_567)'], // Number
  [new String('string'), "new String('string')"], // String

  [Object(new Boolean(true)), 'Object(new Boolean(true))'], // Boolean
  [Object(new Number(1_234_567)), 'Object(new Number(1_234_567))'], // Number
  [Object(new String('string')), "new String('string')"], // String

  [Object(BigInt(0)), 'Object(BigInt(0))'], // BigInt
  [Object(Symbol('sym')), "Object(Symbol('sym'))"], // Symbol

  [new Date(), 'new Date'], // Date
  [/regex/, '/regex/'], // RegExp
  [[], '[]'], // Array
  [{}, '{}'], // Object

  [new Map(), 'new Map'], // Map
  [new Set(), 'new Set'], // Set
  [new WeakMap(), 'new WeakMap'], // WeakMap
  [new WeakSet(), 'new WeakSet'], // WeakSet

  [new Int8Array(0), 'new Int8Array(0)'], // Int8Array
  [new Uint8Array(0), 'new Uint8Array(0)'], // Uint8Array
  [new Float32Array(0), 'new Float32Array(0)'], // Float32Array
  [new ArrayBuffer(0), 'new ArrayBuffer(0)'], // ArrayBuffer

  [new Error(), 'new Error'], // Error
  [new SyntaxError(), 'new SyntaxError'], // SyntaxError
  [new TypeError(), 'new TypeError'], // TypeError
  [new ReferenceError(), 'new ReferenceError'], // ReferenceError
  [new URIError(), 'new URIError'], // URIError
  [new EvalError(), 'new EvalError'], // EvalError
  [new RangeError(), 'new RangeError'], // RangeError
  [new AggregateError([]), 'new AggregateError([])'], // AggregateError

  [Math, 'Math'], // Object
  [JSON, 'JSON'], // Object
  [Reflect, 'Reflect'], // Object
  [Atomics, 'Atomics'], // Object

  [Boolean, 'Boolean'], // Function
  [Number, 'Number'], // Function
  [String, 'String'], // Function
  [BigInt, 'BigInt'], // Function
  [Symbol, 'Symbol'], // Function
  [Date, 'Date'], // Function
  [RegExp, 'RegExp'], // Function
  [Array, 'Array'], // Function
  [Object, 'Object'], // Function

  [Map, 'Map'], // Function
  [Set, 'Set'], // Function
  [WeakMap, 'WeakMap'], // Function
  [WeakSet, 'WeakSet'], // Function

  [Int8Array, 'Int8Array'], // Function
  [Uint8Array, 'Uint8Array'], // Function
  [Float32Array, 'Float32Array'], // Function
  [ArrayBuffer, 'ArrayBuffer'], // Function

  [Error, 'Error'], // Function
  [SyntaxError, 'SyntaxError'], // Function
  [TypeError, 'TypeError'], // Function
  [ReferenceError, 'ReferenceError'], // Function
  [URIError, 'URIError'], // Function
  [EvalError, 'EvalError'], // Function
  [RangeError, 'RangeError'], // Function
  [AggregateError, 'AggregateError'], // Function

  [Promise.resolve(), 'Promise.resolve()'], // Promise
  [(async (_) => _)(), '(async _ => _)()'], // Promise
  [(async function () {})(), '(async function () {})()'], // Promise

  [Promise, 'Promise'], // Function

  [asyncGeneratorFunctionExpression(), '(async function* () { yield 1; })()'], // AsyncGeneratorFunction
  [generatorFunctionExpression(), '(function* () { yield 1; })()'], // GeneratorFunction

  [AsyncGenerator, 'AsyncGenerator'], // AsyncGeneratorFunction
  [Generator, 'Generator'], // GeneratorFunction

  [function () {}, '(function () {})'], // Function
  [(_) => _, '(_ => _)'], // Function
  [asyncArrowFunctionExpression, '(async _ => _)'], // AsyncFunction
  [asyncNonArrowFunctionExpression, '(async function () {})'], // AsyncFunction
  [asyncGeneratorFunctionExpression, '(async function* () { yield 1; })'], // AsyncGeneratorFunction
  [generatorFunctionExpression, '(function* () { yield 1; })'], // GeneratorFunction

  [function () {}.constructor, '(function () {}).constructor'], // Function
  [((_) => _).constructor, '(_ => _).constructor'], // Function
  [asyncArrowFunctionExpression.constructor, '(async _ => _).constructor'], // Function
  [asyncNonArrowFunctionExpression.constructor, '(async function () {}).constructor'], // Function
  [asyncGeneratorFunctionExpression.constructor, '(async function* () { yield 1; }).constructor'], // Function
  [generatorFunctionExpression.constructor, '(function* () { yield 1; }).constructor'], // Function

  [Function.prototype, 'Function.prototype'], // Function

  [MyClass, 'class MyClass {}'], // Function
  [MySubclass, 'class MySubclass extends MyClass {}'], // Function

  [new MyClass(), 'new MyClass'], // MyClass
  [new MySubclass(), 'new MySubclass'], // MySubclass

  [TaggedClass, 'TaggedClass'], // Function
  [ImplicitlyTaggedSubclass, 'ImplicitlyTaggedSubclass'], // Function
  [ExplicitlyTaggedSubclass, 'ExplicitlyTaggedSubclass'], // Function

  [SubclassedFunction, 'SubclassedFunction'], // Function

  [new TaggedClass(), 'new TaggedClass'], // TaggedClass
  [new ImplicitlyTaggedSubclass(), 'new ImplicitlyTaggedSubclass'], // ImplicitlyTaggedSubclass
  [new ExplicitlyTaggedSubclass(), 'new ExplicitlyTaggedSubclass'], // ExplicitlyTaggedSubclass

  [functionSubtype, "new SubclassedFunction('width = 1', 'height = 1', 'return width * height')"], // Function

  [{ [Symbol.toStringTag]: 'Array' }, "{ [Symbol.toStringTag]: 'Array' }"], // Object
  [{ [Symbol.toStringTag]: 'CustomTag' }, "{ [Symbol.toStringTag]: 'CustomTag' }"], // Object

  [
    (function () {
      return arguments;
    })(),
    '(function () { return arguments; })()'
  ] // Arguments
];
console.table(
  introspectionList.reduce((dictionary, [value, description]) => {
    const type = typeof value;
    const prototype = Object.getPrototypeOf(value);

    const object_to_string_call = Object.prototype.toString.call(value);
    const error_to_string_call =
      (prototype?.message === '' &&
        prototype.name?.slice?.(-5) === 'Error' &&
        Error.prototype.toString.call(value)) ||
      '. . . . .';
    const function_to_string_call =
      (typeof value === 'function' && Function.prototype.toString.call(value)) || '. . . . .';

    const constructor = value.constructor;
    const defined_constructor =
      prototype == null
        ? prototype
        : Object.getOwnPropertyDescriptor(prototype, 'constructor')?.value;

    dictionary[description] = {
      type,
      prototype:
        (typeof prototype === 'function' && Function.prototype.toString.call(prototype)) ||
        prototype,
      object_to_string_call,
      error_to_string_call,
      function_to_string_call,
      own_property_constr:
        (typeof defined_constructor === 'function' &&
          Function.prototype.toString.call(defined_constructor)) ||
        defined_constructor,
      // own_property_constr_name: !defined_constructor ? defined_constructor : (Object.getOwnPropertyDescriptor(defined_constructor, 'name')?.value ?? (defined_constructor.name ?? void 0)),
      own_property_constr_name: !defined_constructor
        ? defined_constructor
        : Object.getOwnPropertyDescriptor(defined_constructor, 'name')?.value ||
          defined_constructor.name,
      direct_access_constr:
        (typeof constructor === 'function' && Function.prototype.toString.call(constructor)) ||
        constructor,
      // direct_access_constr_name: !constructor ? constructor : Object.getOwnPropertyDescriptor(constructor, 'name')?.value ?? (constructor.name ?? void 0),
      direct_access_constr_name: !constructor
        ? constructor
        : Object.getOwnPropertyDescriptor(constructor, 'name')?.value || constructor.name
    };
    return dictionary;
  }, Object.create(null))
);
