import { describe, it, expect } from 'vitest';

import { isFunction } from '../../src/base';
import {
  isClass,
  isGeneratorFunction,
  isAsyncGeneratorFunction,
  isAnyGeneratorFunction,
  isAsyncFunction,
  isAsyncNonArrow,
  isAsyncArrow,
  isNonAsyncArrow,
  isArrow,
  isES3Function,
  isConciseGenericMethod,
  isGenericFunction,
  isUnnamedFunction
} from '../../src/function';

import { testIndex, getTestCandidateBySpecificationKey } from './__config';

const {
  generatorStatement,
  namedGeneratorExpression,
  asyncGeneratorStatement,
  namedAsyncGeneratorExpression
} = testIndex.candidate;

const nonAsyncGenerator_1 = generatorStatement();
const nonAsyncGenerator_2 = namedGeneratorExpression();
const asyncGenerator_1 = asyncGeneratorStatement();
const asyncGenerator_2 = namedAsyncGeneratorExpression();

describe('Testing all `Function` introspection methods related to function types ...', () => {
  const {
    specification: { function: functions, class: classes }
  } = testIndex;

  const allTestEntries = [
    ...Object.entries(functions.unnamed),
    ...Object.entries(functions.named),
    ...Object.entries(classes.unnamed),
    ...Object.entries(classes.named),
    ...Object.entries(testIndex.specification.other)
  ];

  describe('The introspection method `isFunction` ...', () => {
    it('- filters the correct amount of items from a given array of mixed function types.', () => {
      expect(
        allTestEntries.filter(([key /* , spec */]) =>
          isFunction(getTestCandidateBySpecificationKey(key))
        ).length
      ).toBe(allTestEntries.length);
    });

    describe('... verifies whether ...', () => {
      allTestEntries.forEach(([key, spec]) => {
        const candidate = getTestCandidateBySpecificationKey(key);

        it(`- ✅ ${spec.description} is a function type.`, () => {
          expect(isFunction(candidate)).toBe(true);
        });
      });

      it('- ❌ a `Generator` instance is **not** a function type.', () => {
        expect(isFunction(nonAsyncGenerator_1)).toBe(false);
        expect(isFunction(nonAsyncGenerator_2)).toBe(false);
      });
      it('- ❌ an `AsyncGenerator` instance is **not** a function type.', () => {
        expect(isFunction(asyncGenerator_1)).toBe(false);
        expect(isFunction(asyncGenerator_2)).toBe(false);
      });

      it('- ❌ an `Array` instance is **not** a function type.', () => {
        expect(isFunction([])).toBe(false);
      });
      it('- ❌ an `Object` instance is **not** a function type.', () => {
        expect(isFunction({})).toBe(false);
      });
    });
  });

  describe('The introspection method `isClass` ...', () => {
    it('- filters the correct amount of items from a given array of mixed function types.', () => {
      const testEntries = [
        ...Object.entries(functions.unnamed),
        ...Object.entries(functions.named),
        ...Object.entries(classes.unnamed),
        ...Object.entries(classes.named)
        // - due to Web Api constructor functions like `EventTarget`
        //   or `URL` being implemented via class syntax within node
        //   environments (browsers are not effected).
        // // ...Object.entries(testIndex.specification.other),
      ];
      expect(
        testEntries.filter(([key /* , spec */]) => isClass(getTestCandidateBySpecificationKey(key)))
          .length
      ).toBe(
        testEntries
          // eslint-disable-next-line no-unused-vars
          .filter(([_, spec]) => !!spec.is_class).length
      );
    });

    describe('... verifies whether ...', () => {
      [...Object.entries(classes.unnamed), ...Object.entries(classes.named)].forEach(
        ([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);

          it(`- ✅ ${spec.description} is a constructor function type created with the \`class\` syntax.`, () => {
            expect(isClass(candidate)).toBe(true);
            expect(isClass(candidate)).toBe(spec.is_class);
          });
        }
      );

      [...Object.entries(functions.unnamed), ...Object.entries(functions.named)].forEach(
        ([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);

          it(`- ❌ ${spec.description} is **not** a \`class\` constructor function.`, () => {
            expect(isClass(candidate)).toBe(false);
            expect(isClass(candidate)).toBe(!!spec.is_class);
          });
        }
      );

      it('- ❌ a `Generator` instance is **not** a `class` constructor function.', () => {
        expect(isClass(nonAsyncGenerator_1)).toBe(false);
        expect(isClass(nonAsyncGenerator_2)).toBe(false);
      });
      it('- ❌ an `AsyncGenerator` instance is **not** a `class` constructor function.', () => {
        expect(isClass(asyncGenerator_1)).toBe(false);
        expect(isClass(asyncGenerator_2)).toBe(false);
      });

      it('- ❌ an `Array` instance is **not** a `class` constructor function.', () => {
        expect(isClass([])).toBe(false);
      });
      it('- ❌ an `Object` instance is **not** a `class` constructor function.', () => {
        expect(isClass({})).toBe(false);
      });
    });
  });

  describe('The introspection method `isGeneratorFunction` ...', () => {
    it('- filters the correct amount of items from a given array of mixed function types.', () => {
      expect(
        allTestEntries.filter(([key /* , spec */]) =>
          isGeneratorFunction(getTestCandidateBySpecificationKey(key))
        ).length
      ).toBe(
        allTestEntries
          // eslint-disable-next-line no-unused-vars
          .filter(([_, spec]) => !!spec.is_non_async_generator).length
      );
    });

    describe('... verifies whether ...', () => {
      allTestEntries
        // eslint-disable-next-line no-unused-vars
        .filter(([_, spec]) => !!spec.is_non_async_generator)
        .forEach(([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);
          it(`- ✅ ${spec.description} is exclusively a \`GeneratorFunction\` type.`, () => {
            expect(isGeneratorFunction(candidate)).toBe(true);
          });
        });
      allTestEntries
        // eslint-disable-next-line no-unused-vars
        .filter(([_, spec]) => !spec.is_non_async_generator)
        .forEach(([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);
          it(`- ❌ ${spec.description} is **not** exclusively a \`GeneratorFunction\` type.`, () => {
            expect(isGeneratorFunction(candidate)).toBe(false);
          });
        });

      it('- ❌ a `Generator` instance is **not** exclusively a `GeneratorFunction` type.', () => {
        expect(isGeneratorFunction(nonAsyncGenerator_1)).toBe(false);
        expect(isGeneratorFunction(nonAsyncGenerator_2)).toBe(false);
      });
      it('- ❌ an `AsyncGenerator` instance is **not** exclusively a `GeneratorFunction` type.', () => {
        expect(isGeneratorFunction(asyncGenerator_1)).toBe(false);
        expect(isGeneratorFunction(asyncGenerator_2)).toBe(false);
      });

      it('- ❌ an `Array` instance is **not** exclusively a `GeneratorFunction` type.', () => {
        expect(isGeneratorFunction([])).toBe(false);
      });
      it('- ❌ an `Object` instance is **not** exclusively a `GeneratorFunction` type.', () => {
        expect(isGeneratorFunction({})).toBe(false);
      });
    });
  });

  describe('The introspection method `isAsyncGeneratorFunction` ...', () => {
    it('- filters the correct amount of items from a given array of mixed function types.', () => {
      expect(
        allTestEntries.filter(([key /* , spec */]) =>
          isAsyncGeneratorFunction(getTestCandidateBySpecificationKey(key))
        ).length
      ).toBe(
        allTestEntries
          // eslint-disable-next-line no-unused-vars
          .filter(([_, spec]) => !!spec.is_async_generator).length
      );
    });

    describe('... verifies whether ...', () => {
      allTestEntries
        // eslint-disable-next-line no-unused-vars
        .filter(([_, spec]) => !!spec.is_async_generator)
        .forEach(([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);
          it(`- ✅ ${spec.description} is exclusively an \`AsyncGeneratorFunction\` type.`, () => {
            expect(isAsyncGeneratorFunction(candidate)).toBe(true);
          });
        });
      allTestEntries
        // eslint-disable-next-line no-unused-vars
        .filter(([_, spec]) => !spec.is_async_generator)
        .forEach(([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);
          it(`- ❌ ${spec.description} is **not** exclusively an \`AsyncGeneratorFunction\` type.`, () => {
            expect(isAsyncGeneratorFunction(candidate)).toBe(false);
          });
        });

      it('- ❌ a `Generator` instance is **not** exclusively an `AsyncGeneratorFunction` type.', () => {
        expect(isAsyncGeneratorFunction(nonAsyncGenerator_1)).toBe(false);
        expect(isAsyncGeneratorFunction(nonAsyncGenerator_2)).toBe(false);
      });
      it('- ❌ an `AsyncGenerator` instance is **not** exclusively an `AsyncGeneratorFunction` type.', () => {
        expect(isAsyncGeneratorFunction(asyncGenerator_1)).toBe(false);
        expect(isAsyncGeneratorFunction(asyncGenerator_2)).toBe(false);
      });

      it('- ❌ an `Array` instance is **not** exclusively an `AsyncGeneratorFunction` type.', () => {
        expect(isAsyncGeneratorFunction([])).toBe(false);
      });
      it('- ❌ an `Object` instance is **not** exclusively an `AsyncGeneratorFunction` type.', () => {
        expect(isAsyncGeneratorFunction({})).toBe(false);
      });
    });
  });

  describe('The introspection method `isAnyGeneratorFunction` ...', () => {
    it('- filters the correct amount of items from a given array of mixed function types.', () => {
      expect(
        allTestEntries.filter(([key /* , spec */]) =>
          isAnyGeneratorFunction(getTestCandidateBySpecificationKey(key))
        ).length
      ).toBe(
        allTestEntries
          // eslint-disable-next-line no-unused-vars
          .filter(([_, spec]) => !!spec.is_generator).length
      );
    });

    describe('... verifies whether ...', () => {
      allTestEntries
        // eslint-disable-next-line no-unused-vars
        .filter(([_, spec]) => !!spec.is_generator)
        .forEach(([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);
          it(`- ✅ ${spec.description} is either kind of generator function, async or not.`, () => {
            expect(isAnyGeneratorFunction(candidate)).toBe(true);
          });
        });
      allTestEntries
        // eslint-disable-next-line no-unused-vars
        .filter(([_, spec]) => !spec.is_generator)
        .forEach(([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);
          it(`- ❌ ${spec.description} is **not** any kind of generator function.`, () => {
            expect(isAnyGeneratorFunction(candidate)).toBe(false);
          });
        });

      it('- ❌ a `Generator` instance is **not** any kind of generator function.', () => {
        expect(isAnyGeneratorFunction(nonAsyncGenerator_1)).toBe(false);
        expect(isAnyGeneratorFunction(nonAsyncGenerator_2)).toBe(false);
      });
      it('- ❌ an `AsyncGenerator` instance is **not** any kind of generator function.', () => {
        expect(isAnyGeneratorFunction(asyncGenerator_1)).toBe(false);
        expect(isAnyGeneratorFunction(asyncGenerator_2)).toBe(false);
      });

      it('- ❌ an `Array` instance is **not** any kind of generator function.', () => {
        expect(isAnyGeneratorFunction([])).toBe(false);
      });
      it('- ❌ an `Object` instance is **not** any kind of generator function.', () => {
        expect(isAnyGeneratorFunction({})).toBe(false);
      });
    });
  });

  describe('The introspection method `isAsyncFunction` ...', () => {
    it('- filters the correct amount of items from a given array of mixed function types.', () => {
      expect(
        allTestEntries.filter(([key /* , spec */]) =>
          isAsyncFunction(getTestCandidateBySpecificationKey(key))
        ).length
      ).toBe(
        allTestEntries
          // eslint-disable-next-line no-unused-vars
          .filter(([_, spec]) => !!spec.is_async_function).length
      );
    });

    describe('... verifies whether ...', () => {
      allTestEntries
        // eslint-disable-next-line no-unused-vars
        .filter(([_, spec]) => !!spec.is_async_function)
        .forEach(([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);
          it(`- ✅ ${spec.description} is any kind of async function type.`, () => {
            expect(isAsyncFunction(candidate)).toBe(true);
          });
        });
      allTestEntries
        // eslint-disable-next-line no-unused-vars
        .filter(([_, spec]) => !spec.is_async_function)
        .forEach(([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);
          it(`- ❌ ${spec.description} is **not** any kind of async function.`, () => {
            expect(isAsyncFunction(candidate)).toBe(false);
          });
        });

      it('- ❌ a `Generator` instance is **not** any kind of async function.', () => {
        expect(isAsyncFunction(nonAsyncGenerator_1)).toBe(false);
        expect(isAsyncFunction(nonAsyncGenerator_2)).toBe(false);
      });
      it('- ❌ an `AsyncGenerator` instance is **not** any kind of async function.', () => {
        expect(isAsyncFunction(asyncGenerator_1)).toBe(false);
        expect(isAsyncFunction(asyncGenerator_2)).toBe(false);
      });

      it('- ❌ an `Array` instance is **not** any kind of async function.', () => {
        expect(isAsyncFunction([])).toBe(false);
      });
      it('- ❌ an `Object` instance is **not** any kind of async function.', () => {
        expect(isAsyncFunction({})).toBe(false);
      });
    });
  });

  describe('The introspection method `isAsyncNonArrow` ...', () => {
    it('- filters the correct amount of items from a given array of mixed function types.', () => {
      expect(
        allTestEntries.filter(([key /* , spec */]) =>
          isAsyncNonArrow(getTestCandidateBySpecificationKey(key))
        ).length
      ).toBe(
        allTestEntries
          // eslint-disable-next-line no-unused-vars
          .filter(([_, spec]) => !!spec.is_async_non_arrow).length
      );
    });

    describe('... verifies whether ...', () => {
      allTestEntries
        // eslint-disable-next-line no-unused-vars
        .filter(([_, spec]) => !!spec.is_async_non_arrow)
        .forEach(([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);
          it(`- ✅ ${spec.description} is a kind of **non generator** async function.`, () => {
            expect(isAsyncNonArrow(candidate)).toBe(true);
          });
        });
      allTestEntries
        // eslint-disable-next-line no-unused-vars
        .filter(([_, spec]) => !spec.is_async_non_arrow)
        .forEach(([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);
          it(`- ❌ ${spec.description} is **not** a kind of **non generator** async function.`, () => {
            expect(isAsyncNonArrow(candidate)).toBe(false);
          });
        });

      it('- ❌ a `Generator` instance is **not** a kind of **non generator** async function.', () => {
        expect(isAsyncNonArrow(nonAsyncGenerator_1)).toBe(false);
        expect(isAsyncNonArrow(nonAsyncGenerator_2)).toBe(false);
      });
      it('- ❌ an `AsyncGenerator` instance is **not** a kind of **non generator** async function.', () => {
        expect(isAsyncNonArrow(asyncGenerator_1)).toBe(false);
        expect(isAsyncNonArrow(asyncGenerator_2)).toBe(false);
      });

      it('- ❌ an `Array` instance is **not** a kind of **non generator** async function.', () => {
        expect(isAsyncNonArrow([])).toBe(false);
      });
      it('- ❌ an `Object` instance is **not** a kind of **non generator** async function.', () => {
        expect(isAsyncNonArrow({})).toBe(false);
      });
    });
  });

  describe('The introspection method `isAsyncArrow` ...', () => {
    it('- filters the correct amount of items from a given array of mixed function types.', () => {
      expect(
        allTestEntries.filter(([key /* , spec */]) =>
          isAsyncArrow(getTestCandidateBySpecificationKey(key))
        ).length
      ).toBe(
        allTestEntries
          // eslint-disable-next-line no-unused-vars
          .filter(([_, spec]) => !!spec.is_async_arrow).length
      );
    });

    describe('... verifies whether ...', () => {
      allTestEntries
        // eslint-disable-next-line no-unused-vars
        .filter(([_, spec]) => !!spec.is_async_arrow)
        .forEach(([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);
          it(`- ✅ ${spec.description} is exclusively an async arrow function.`, () => {
            expect(isAsyncArrow(candidate)).toBe(true);
          });
        });
      allTestEntries
        // eslint-disable-next-line no-unused-vars
        .filter(([_, spec]) => !spec.is_async_arrow)
        .forEach(([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);
          it(`- ❌ ${spec.description} is **not** exclusively an async arrow function.`, () => {
            expect(isAsyncArrow(candidate)).toBe(false);
          });
        });

      it('- ❌ a `Generator` instance is **not** exclusively an async arrow function.', () => {
        expect(isAsyncArrow(nonAsyncGenerator_1)).toBe(false);
        expect(isAsyncArrow(nonAsyncGenerator_2)).toBe(false);
      });
      it('- ❌ an `AsyncGenerator` instance is **not** exclusively an async arrow function.', () => {
        expect(isAsyncArrow(asyncGenerator_1)).toBe(false);
        expect(isAsyncArrow(asyncGenerator_2)).toBe(false);
      });

      it('- ❌ an `Array` instance is **not** exclusively an async arrow function.', () => {
        expect(isAsyncArrow([])).toBe(false);
      });
      it('- ❌ an `Object` instance is **not** exclusively an async arrow function.', () => {
        expect(isAsyncArrow({})).toBe(false);
      });
    });
  });

  describe('The introspection method `isNonAsyncArrow` ...', () => {
    it('- filters the correct amount of items from a given array of mixed function types.', () => {
      expect(
        allTestEntries.filter(([key /* , spec */]) =>
          isNonAsyncArrow(getTestCandidateBySpecificationKey(key))
        ).length
      ).toBe(
        allTestEntries
          // eslint-disable-next-line no-unused-vars
          .filter(([_, spec]) => !!spec.is_non_async_arrow).length
      );
    });

    describe('... verifies whether ...', () => {
      allTestEntries
        // eslint-disable-next-line no-unused-vars
        .filter(([_, spec]) => !!spec.is_non_async_arrow)
        .forEach(([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);
          it(`- ✅ ${spec.description} is exclusively a non async arrow function.`, () => {
            expect(isNonAsyncArrow(candidate)).toBe(true);
          });
        });
      allTestEntries
        // eslint-disable-next-line no-unused-vars
        .filter(([_, spec]) => !spec.is_non_async_arrow)
        .forEach(([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);
          it(`- ❌ ${spec.description} is **not** exclusively a non async arrow function.`, () => {
            expect(isNonAsyncArrow(candidate)).toBe(false);
          });
        });

      it('- ❌ a `Generator` instance is **not** exclusively a non async arrow function.', () => {
        expect(isNonAsyncArrow(nonAsyncGenerator_1)).toBe(false);
        expect(isNonAsyncArrow(nonAsyncGenerator_2)).toBe(false);
      });
      it('- ❌ an `AsyncGenerator` instance is **not** exclusively a non async arrow function.', () => {
        expect(isNonAsyncArrow(asyncGenerator_1)).toBe(false);
        expect(isNonAsyncArrow(asyncGenerator_2)).toBe(false);
      });

      it('- ❌ an `Array` instance is **not** exclusively a non async arrow function.', () => {
        expect(isNonAsyncArrow([])).toBe(false);
      });
      it('- ❌ an `Object` instance is **not** exclusively a non async arrow function.', () => {
        expect(isNonAsyncArrow({})).toBe(false);
      });
    });
  });

  describe('The introspection method `isArrow` ...', () => {
    it('- filters the correct amount of items from a given array of mixed function types.', () => {
      expect(
        allTestEntries.filter(([key /* , spec */]) =>
          isArrow(getTestCandidateBySpecificationKey(key))
        ).length
      ).toBe(
        allTestEntries
          // eslint-disable-next-line no-unused-vars
          .filter(([_, spec]) => !!spec.is_arrow).length
      );
    });

    describe('... verifies whether ...', () => {
      allTestEntries
        // eslint-disable-next-line no-unused-vars
        .filter(([_, spec]) => !!spec.is_arrow)
        .forEach(([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);
          it(`- ✅ ${spec.description} is either kind of arrow function, async or not.`, () => {
            expect(isArrow(candidate)).toBe(true);
          });
        });
      allTestEntries
        // eslint-disable-next-line no-unused-vars
        .filter(([_, spec]) => !spec.is_arrow)
        .forEach(([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);
          it(`- ❌ ${spec.description} is **not** any kind of arrow function.`, () => {
            expect(isArrow(candidate)).toBe(false);
          });
        });

      it('- ❌ a `Generator` instance is **not** any kind of arrow function.', () => {
        expect(isArrow(nonAsyncGenerator_1)).toBe(false);
        expect(isArrow(nonAsyncGenerator_2)).toBe(false);
      });
      it('- ❌ an `AsyncGenerator` instance is **not** any kind of arrow function.', () => {
        expect(isArrow(asyncGenerator_1)).toBe(false);
        expect(isArrow(asyncGenerator_2)).toBe(false);
      });

      it('- ❌ an `Array` instance is **not** any kind of arrow function.', () => {
        expect(isArrow([])).toBe(false);
      });
      it('- ❌ an `Object` instance is **not** any kind of arrow function.', () => {
        expect(isArrow({})).toBe(false);
      });
    });
  });

  describe('The introspection method `isES3Function` ...', () => {
    it('- filters the correct amount of items from a given array of mixed function types.', () => {
      expect(
        allTestEntries.filter(([key /* , spec */]) =>
          isES3Function(getTestCandidateBySpecificationKey(key))
        ).length
      ).toBe(
        allTestEntries
          // eslint-disable-next-line no-unused-vars
          .filter(([_, spec]) => !!spec.is_es3_function).length
      );
    });

    describe('... verifies whether ...', () => {
      allTestEntries
        // eslint-disable-next-line no-unused-vars
        .filter(([_, spec]) => !!spec.is_es3_function)
        .forEach(([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);
          it(`- ✅ ${spec.description} is exclusively the only known function type back at ES3 (in addition to all the built-in constructor functions).`, () => {
            expect(isES3Function(candidate)).toBe(true);
          });
        });
      allTestEntries
        // eslint-disable-next-line no-unused-vars
        .filter(([_, spec]) => !spec.is_es3_function)
        .forEach(([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);
          it(`- ❌ ${spec.description} is **not** exclusively the only known function type back at ES3 (in addition to all the built-in constructor functions).`, () => {
            expect(isES3Function(candidate)).toBe(false);
          });
        });

      it('- ❌ a `Generator` instance is **not** exclusively the only known function type back at ES3 (in addition to all the built-in constructor functions).', () => {
        expect(isES3Function(nonAsyncGenerator_1)).toBe(false);
        expect(isES3Function(nonAsyncGenerator_2)).toBe(false);
      });
      it('- ❌ an `AsyncGenerator` instance is **not** exclusively the only known function type back at ES3 (in addition to all the built-in constructor functions).', () => {
        expect(isES3Function(asyncGenerator_1)).toBe(false);
        expect(isES3Function(asyncGenerator_2)).toBe(false);
      });

      it('- ❌ an `Array` instance is **not** exclusively the only known function type back at ES3 (in addition to all the built-in constructor functions).', () => {
        expect(isES3Function([])).toBe(false);
      });
      it('- ❌ an `Object` instance is **not** exclusively the only known function type back at ES3 (in addition to all the built-in constructor functions).', () => {
        expect(isES3Function({})).toBe(false);
      });
    });
  });

  describe('The introspection method `isConciseGenericMethod` ...', () => {
    it('- filters the correct amount of items from a given array of mixed function types.', () => {
      expect(
        allTestEntries.filter(([key /* , spec */]) =>
          isConciseGenericMethod(getTestCandidateBySpecificationKey(key))
        ).length
      ).toBe(
        allTestEntries
          // eslint-disable-next-line no-unused-vars
          .filter(([_, spec]) => !!spec.is_concise_generic_method).length
      );
    });

    describe('... verifies whether ...', () => {
      allTestEntries
        // eslint-disable-next-line no-unused-vars
        .filter(([_, spec]) => !!spec.is_concise_generic_method)
        .forEach(([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);
          it(`- ✅ ${spec.description} is exclusively a concise generic method.`, () => {
            expect(isConciseGenericMethod(candidate)).toBe(true);
          });
        });
      allTestEntries
        // eslint-disable-next-line no-unused-vars
        .filter(([_, spec]) => !spec.is_concise_generic_method)
        .forEach(([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);
          it(`- ❌ ${spec.description} is **not** a concise generic method.`, () => {
            expect(isConciseGenericMethod(candidate)).toBe(false);
          });
        });

      it('- ❌ a `Generator` instance is **not** a concise generic method.', () => {
        expect(isConciseGenericMethod(nonAsyncGenerator_1)).toBe(false);
        expect(isConciseGenericMethod(nonAsyncGenerator_2)).toBe(false);
      });
      it('- ❌ an `AsyncGenerator` instance is **not** a concise generic method.', () => {
        expect(isConciseGenericMethod(asyncGenerator_1)).toBe(false);
        expect(isConciseGenericMethod(asyncGenerator_2)).toBe(false);
      });

      it('- ❌ an `Array` instance is **not** a concise generic method.', () => {
        expect(isConciseGenericMethod([])).toBe(false);
      });
      it('- ❌ an `Object` instance is **not** a concise generic method.', () => {
        expect(isConciseGenericMethod({})).toBe(false);
      });
    });
  });

  describe('The introspection method `isGenericFunction` ...', () => {
    it('- filters the correct amount of items from a given array of mixed function types.', () => {
      expect(
        allTestEntries.filter(([key /* , spec */]) =>
          isGenericFunction(getTestCandidateBySpecificationKey(key))
        ).length
      ).toBe(
        allTestEntries
          // eslint-disable-next-line no-unused-vars
          .filter(([_, spec]) => !!spec.is_generic_function).length
      );
    });

    describe('... verifies whether ...', () => {
      allTestEntries
        // eslint-disable-next-line no-unused-vars
        .filter(([_, spec]) => !!spec.is_generic_function)
        .forEach(([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);
          it(`- ✅ ${spec.description} is either a non async arrow function or a good old ES3 function.`, () => {
            expect(isGenericFunction(candidate)).toBe(true);
          });
        });
      allTestEntries
        // eslint-disable-next-line no-unused-vars
        .filter(([_, spec]) => !spec.is_generic_function)
        .forEach(([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);
          it(`- ❌ ${spec.description} is **neither** a non async arrow function **nor** a good old ES3 function.`, () => {
            expect(isGenericFunction(candidate)).toBe(false);
          });
        });

      it('- ❌ a `Generator` instance is **neither** a non async arrow function **nor** a good old ES3 function.', () => {
        expect(isGenericFunction(nonAsyncGenerator_1)).toBe(false);
        expect(isGenericFunction(nonAsyncGenerator_2)).toBe(false);
      });
      it('- ❌ an `AsyncGenerator` instance is **neither** a non async arrow function **nor** a good old ES3 function.', () => {
        expect(isGenericFunction(asyncGenerator_1)).toBe(false);
        expect(isGenericFunction(asyncGenerator_2)).toBe(false);
      });

      it('- ❌ an `Array` instance is **neither** a non async arrow function **nor** a good old ES3 function.', () => {
        expect(isGenericFunction([])).toBe(false);
      });
      it('- ❌ an `Object` instance is **neither** a non async arrow function **nor** a good old ES3 function.', () => {
        expect(isGenericFunction({})).toBe(false);
      });
    });
  });

  // describe('The introspection method `isFunctionSubtype` ...', () => {
  //   it('- filters the correct amount of items from a given array of mixed function types.', () => {
  //     expect(
  //       allTestEntries.filter(([key /* , spec */]) =>
  //         isFunctionSubtype(getTestCandidateBySpecificationKey(key))
  //       ).length
  //     ).toBe(
  //       allTestEntries
  //         // eslint-disable-next-line no-unused-vars
  //         .filter(([_, spec]) => !!spec.is_function_subtype).length
  //     );
  //   });
  //
  //   describe('... verifies whether ...', () => {
  //     allTestEntries
  //       // eslint-disable-next-line no-unused-vars
  //       .filter(([_, spec]) => !!spec.is_function_subtype)
  //       .forEach(([key, spec]) => {
  //         const candidate = getTestCandidateBySpecificationKey(key);
  //         it(`- ✅ ${spec.description} is exclusively a \`Function\` subtype (an instance of a class which extends \`Function\`).`, () => {
  //           expect(isFunctionSubtype(candidate)).toBe(true);
  //         });
  //       });
  //     allTestEntries
  //       // eslint-disable-next-line no-unused-vars
  //       .filter(([_, spec]) => !spec.is_function_subtype)
  //       .forEach(([key, spec]) => {
  //         const candidate = getTestCandidateBySpecificationKey(key);
  //         it(`- ❌ ${spec.description} is **not** exclusively a \`Function\` subtype (an instance of a class which extends \`Function\`).`, () => {
  //           expect(isFunctionSubtype(candidate)).toBe(false);
  //         });
  //       });
  //
  //     it('- ❌ a `Generator` instance is **not** exclusively a `Function` subtype (an instance of a class which extends `Function`).', () => {
  //       expect(isFunction(nonAsyncGenerator_1)).toBe(false);
  //       expect(isFunction(nonAsyncGenerator_2)).toBe(false);
  //     });
  //     it('- ❌ an `AsyncGenerator` instance is **not** exclusively a `Function` subtype (an instance of a class which extends `Function`).', () => {
  //       expect(isFunction(asyncGenerator_1)).toBe(false);
  //       expect(isFunction(asyncGenerator_2)).toBe(false);
  //     });
  //
  //     it('- ❌ an `Array` instance is **not** exclusively a `Function` subtype (an instance of a class which extends `Function`).', () => {
  //       expect(isFunctionSubtype([])).toBe(false);
  //     });
  //     it('- ❌ an `Object` instance is **not** exclusively a `Function` subtype (an instance of a class which extends `Function`).', () => {
  //       expect(isFunctionSubtype({})).toBe(false);
  //     });
  //   });
  // });

  describe('The introspection method `isUnnamedFunction` ...', () => {
    it('- filters the correct amount of items from a given array of mixed function types.', () => {
      expect(
        allTestEntries.filter(([key /* , spec */]) =>
          isUnnamedFunction(getTestCandidateBySpecificationKey(key))
        ).length
      ).toBe([...Object.entries(functions.unnamed), ...Object.entries(classes.unnamed)].length);
    });

    describe('... verifies whether ...', () => {
      [...Object.entries(functions.unnamed), ...Object.entries(classes.unnamed)].forEach(
        ([key, spec]) => {
          const candidate = getTestCandidateBySpecificationKey(key);
          it(`- ✅ ${spec.description} is a unnamed function type.`, () => {
            expect(isUnnamedFunction(candidate)).toBe(true);
          });
        }
      );

      [
        ...Object.entries(functions.named),
        ...Object.entries(classes.named),
        ...Object.entries(testIndex.specification.other)
      ].forEach(([key, spec]) => {
        const candidate = getTestCandidateBySpecificationKey(key);
        it(`- ❌ ${spec.description} is **not** a unnamed function type.`, () => {
          expect(isUnnamedFunction(candidate)).toBe(false);
        });
      });

      it('- ❌ a `Generator` instance is **not** a unnamed function type.', () => {
        expect(isUnnamedFunction(nonAsyncGenerator_1)).toBe(false);
        expect(isUnnamedFunction(nonAsyncGenerator_2)).toBe(false);
      });
      it('- ❌ an `AsyncGenerator` instance is **not** a unnamed function type.', () => {
        expect(isUnnamedFunction(asyncGenerator_1)).toBe(false);
        expect(isUnnamedFunction(asyncGenerator_2)).toBe(false);
      });

      it('- ❌ an `Array` instance is **not** a unnamed function type.', () => {
        expect(isUnnamedFunction([])).toBe(false);
      });
      it('- ❌ an `Object` instance is **not** a unnamed function type.', () => {
        expect(isUnnamedFunction({})).toBe(false);
      });
    });
  });
});
