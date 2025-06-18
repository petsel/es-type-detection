import { isFunction } from '../../src/base';

class ClassExpression {}
class SubclassExpression extends EventTarget {
  constructor() {
    super();
  }
}
// // custom subclassed function
// class SubclassedFunction extends Function {
//   constructor(...args) {
//     super(...args);
//   }
// }
// // - constructable and callable instance of the custom
// //   `Function` subclass, named `SubclassedFunction`.
// const subtypedFunction = new SubclassedFunction('x = 1, y = 1', 'return x * y');

function* generatorStatement() {}
async function* asyncGeneratorStatement() {}

async function asyncFunctionStatement() {}

function functionStatement() {}

export const testIndex = {
  specification: {
    function: {
      named: {
        namedArrowFunctionExpression: {
          description: 'a named arrow function expression',
          // callable: true,
          is_constructable: false,
          // constructableWithNew: false,
          // constructableWithoutNew: false,
          has_no_construct_slot: true,
          is_generic_function: true,
          is_arrow: true,
          is_non_async_arrow: true
        },
        namedAsyncArrowFunctionExpression: {
          description: 'a named async arrow function expression',
          // callable: true,
          is_constructable: false,
          // constructableWithNew: false,
          // constructableWithoutNew: false,
          has_no_construct_slot: true,
          is_arrow: true,
          is_async_arrow: true,
          is_async_function: true
        },
        namedAsyncFunctionExpression: {
          description: 'a named async function expression',
          // callable: true,
          is_constructable: false,
          // constructableWithNew: false,
          // constructableWithoutNew: false,
          has_no_construct_slot: true,
          is_async_function: true,
          is_async_non_arrow: true
        },
        asyncFunctionStatement: {
          description: 'an async function statement',
          // callable: true,
          is_constructable: false,
          // constructableWithNew: false,
          // constructableWithoutNew: false,
          has_no_construct_slot: true,
          is_async_function: true,
          is_async_non_arrow: true
        },

        namedAsyncGeneratorExpression: {
          description: 'a named async generator expression',
          // callable: true,
          // // despite the [[construct]] slot indicating the `false` value
          is_constructable: false,
          // constructableWithNew: false,
          // // despite the [[construct]] slot indicating the `false` value
          // constructableWithoutNew: true,
          has_no_construct_slot: true,
          is_generator: true,
          is_async_generator: true,
          has_writable_prototype: true
        },
        asyncGeneratorStatement: {
          description: 'an async generator statement',
          // callable: true,
          // // despite the [[construct]] slot indicating the `false` value
          is_constructable: false,
          // constructableWithNew: false,
          // // despite the [[construct]] slot indicating the `false` value
          // constructableWithoutNew: true,
          has_no_construct_slot: true,
          is_generator: true,
          is_async_generator: true,
          has_writable_prototype: true
        },
        namedGeneratorExpression: {
          description: 'a named generator expression',
          // callable: true,
          // // despite the [[construct]] slot indicating the `false` value
          is_constructable: false,
          // constructableWithNew: false,
          // // despite the [[construct]] slot indicating the `false` value
          // constructableWithoutNew: true,
          has_no_construct_slot: true,
          is_generator: true,
          is_non_async_generator: true,
          has_writable_prototype: true
        },
        generatorStatement: {
          description: 'a generator statement',
          // callable: true,
          // // despite the [[construct]] slot indicating the `false` value
          is_constructable: false,
          // constructableWithNew: false,
          // // despite the [[construct]] slot indicating the `false` value
          // constructableWithoutNew: true,
          has_no_construct_slot: true,
          is_generator: true,
          is_non_async_generator: true,
          has_writable_prototype: true
        },

        conciseGenericMethod: {
          description:
            'a concise generic method created by a non-async and non-generator shorthand method definition',
          // callable: true,
          is_constructable: false,
          // constructableWithNew: false,
          // constructableWithoutNew: false,
          has_no_construct_slot: true,
          is_generic_function: true,
          is_concise_generic_method: true
        },

        namedFunctionExpression: {
          description: 'a named function expression',
          // callable: true,
          is_constructable: true,
          // constructableWithNew: true,
          // constructableWithoutNew: false,
          is_generic_function: true,
          is_es3_function: true,
          has_writable_prototype: true
        },
        functionStatement: {
          description: 'a function statement',
          // callable: true,
          is_constructable: true,
          // constructableWithNew: true,
          // constructableWithoutNew: false,
          is_generic_function: true,
          is_es3_function: true,
          has_writable_prototype: true
        }

        // subtypedFunction: {
        //   description: 'an instance of a custom `SubclassedFunction` class that extends `Function`',
        //   // // - due to any `SubclassedFunction` instance inheriting from `Function` as well.
        //   // callable: true,
        //   // // - due to any `SubclassedFunction` instance inheriting from `Function` as well.
        //   is_constructable: true,
        //   // // - due to any `SubclassedFunction` instance inheriting from `Function` as well.
        //   // constructableWithNew: true,
        //   // // - due to any `SubclassedFunction` instance inheriting from `Function` as well.
        //   // constructableWithoutNew: false,
        //   is_function_subtype: true,
        //   has_writable_prototype: true,
        //   function_name: 'anonymous'
        // }
      },
      unnamed: {
        unnamedArrowFunctionExpression: {
          description: 'an unnamed arrow function (lambda) expression',
          // callable: true,
          is_constructable: false,
          // constructableWithNew: false,
          // constructableWithoutNew: false,
          has_no_construct_slot: true,
          is_generic_function: true,
          is_arrow: true,
          is_non_async_arrow: true
        },
        unnamedAsyncArrowFunctionExpression: {
          description: 'an unnamed async arrow function (lambda) expression',
          // callable: true,
          is_constructable: false,
          // constructableWithNew: false,
          // constructableWithoutNew: false,
          has_no_construct_slot: true,
          is_arrow: true,
          is_async_arrow: true,
          is_async_function: true
        },
        unnamedAsyncFunctionExpression: {
          description: 'an unnamed async function (lambda) expression',
          // callable: true,
          is_constructable: false,
          // constructableWithNew: false,
          // constructableWithoutNew: false,
          has_no_construct_slot: true,
          is_async_function: true,
          is_async_non_arrow: true
        },

        unnamedAsyncGeneratorExpression: {
          description: 'an unnamed async generator (lambda) expression',
          // callable: true,
          // // despite the [[construct]] slot indicating the `false` value
          is_constructable: false,
          // constructableWithNew: false,
          // // despite the [[construct]] slot indicating the `false` value
          // constructableWithoutNew: true,
          has_no_construct_slot: true,
          is_generator: true,
          is_async_generator: true,
          has_writable_prototype: true
        },
        unnamedGeneratorExpression: {
          description: 'an unnamed generator (lambda) expression',
          // callable: true,
          // // despite the [[construct]] slot indicating the `false` value
          is_constructable: false,
          // constructableWithNew: false,
          // // despite the [[construct]] slot indicating the `false` value
          // constructableWithoutNew: true,
          has_no_construct_slot: true,
          is_generator: true,
          is_non_async_generator: true,
          has_writable_prototype: true
        },

        unnamedFunctionExpression: {
          description: 'an unnamed function (lambda) expression',
          // bound: {
          //   callable: {
          //     throws: RangeError
          //   }
          // },
          // callable: true,
          is_constructable: true,
          // constructableWithNew: true,
          // constructableWithoutNew: false,
          is_generic_function: true,
          is_es3_function: true,
          has_writable_prototype: true
          // can_not_be_distinctively_bound: true
        }
      }
    },
    class: {
      named: {
        ClassExpression: {
          description: 'a named class expression',
          // callable: false,
          is_constructable: true,
          // constructableWithNew: true,
          // constructableWithoutNew: false,
          is_class: true
        },
        SubclassExpression: {
          description: 'a named class expression which extends another class',
          // callable: false,
          is_constructable: true,
          // constructableWithNew: true,
          // constructableWithoutNew: false,
          is_class: true,
          is_subclass: true
        }
        // SubclassedFunction: {
        //   description: 'a custom `SubclassedFunction` class which extends `Function`',
        //   // callable: false,
        //   is_constructable: true,
        //   // constructableWithNew: true,
        //   // constructableWithoutNew: false,
        //   is_class: true,
        //   is_subclass: true
        // }
      },
      unnamed: {
        UnnamedClassExpression: {
          description: 'an unnamed class expression',
          // bound: {
          //   callable: {
          //     throws: RangeError
          //   }
          // },
          // callable: false,
          is_constructable: true,
          // constructableWithNew: true,
          // constructableWithoutNew: false,
          is_class: true
          // can_not_be_distinctively_bound: true
        },
        UnnamedExtendedClassExpression: {
          description: 'an unnamed extended class expression',
          // bound: {
          //   callable: {
          //     throws: RangeError
          //   }
          // },
          // callable: false,
          is_constructable: true,
          // constructableWithNew: true,
          // constructableWithoutNew: false,
          is_class: true
          // can_not_be_distinctively_bound: true
        }
      }
    },
    other: {
      EventTarget: {
        description: 'the Web API `EventTarget` type',
        // callable: false,
        is_constructable: true
        // constructableWithNew: true,
        // constructableWithoutNew: false,
      },
      URL: {
        description: 'the Web API `URL` type',
        args: ['http://xyz.ab'],
        // callable: false,
        is_constructable: true
        // constructableWithNew: true,
        // constructableWithoutNew: false,
      },

      BigInt: {
        description: 'the built-in `BigInt` type',
        // callable: true,
        is_constructable: true
        // constructableWithNew: false,
        // constructableWithoutNew: true,
      },
      Symbol: {
        description: 'the built-in `Symbol` type',
        // callable: true,
        is_constructable: true
        // constructableWithNew: false,
        // constructableWithoutNew: true,
      },

      String: {
        description: 'the built-in `String` type',
        // callable: true,
        is_constructable: true
        // constructableWithNew: true,
        // constructableWithoutNew: false,
      },
      Array: {
        description: 'the built-in `Array` type',
        // callable: true,
        is_constructable: true
        // constructableWithNew: true,
        // constructableWithoutNew: true,
      }
    }
  },
  candidate: {
    // isClass,
    ClassExpression,
    SubclassExpression,
    // SubclassedFunction,

    // isAnyGeneratorFunction,

    // isGeneratorFunction,
    generatorStatement,
    namedGeneratorExpression: function* namedGeneratorExpression() {},

    // isAsyncGeneratorFunction,
    asyncGeneratorStatement,
    namedAsyncGeneratorExpression: async function* namedAsyncGeneratorExpression() {},

    // isAsyncFunction,

    // isAsyncNonArrow,
    asyncFunctionStatement,
    namedAsyncFunctionExpression: async function namedAsyncFunctionExpression() {},

    // isAsyncArrow,
    namedAsyncArrowFunctionExpression: async (_) => _,

    // isNonAsyncArrow,
    namedArrowFunctionExpression: (_) => _,

    // isArrow,
    fakeArrow: Object.assign(() => {}, { prototype: {} }),

    // isES3Function,
    functionStatement,
    namedFunctionExpression: function namedFunctionExpression() {},

    // isGenericFunction,
    conciseGenericMethod: {
      concise(...args) {
        return args;
      }
    }.concise

    // // isFunctionSubtype,
    // subtypedFunction,

    // isUnnamedFunction
  }
};

// eslint-disable-next-line consistent-return
export function getTestCandidateBySpecificationKey(key) {
  const candidate = testIndex.candidate[key];
  if (isFunction(candidate)) {
    return candidate;
  }
  if (key === 'unnamedArrowFunctionExpression') {
    return (_) => _;
  }
  if (key === 'unnamedAsyncArrowFunctionExpression') {
    return async (_) => _;
  }
  if (key === 'unnamedAsyncFunctionExpression') {
    // eslint-disable-next-line func-names, no-empty-function
    return async function () {};
  }
  if (key === 'unnamedAsyncGeneratorExpression') {
    // eslint-disable-next-line func-names, no-empty-function
    return async function* () {};
  }
  if (key === 'unnamedGeneratorExpression') {
    // eslint-disable-next-line func-names, no-empty-function
    return function* () {};
  }
  if (key === 'unnamedFunctionExpression') {
    // eslint-disable-next-line func-names
    return function () {};
  }
  if (key === 'UnnamedClassExpression') {
    return class {};
  }
  if (key === 'UnnamedExtendedClassExpression') {
    return class extends Array {};
  }
  return globalThis[key];
}
