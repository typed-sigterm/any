# Any

Mock anything with a Magic Object, no more `TypeError: Cannot read properties of undefined`s.

## Usage

```ts
import { assert } from '@std/assert';
import { any, isAny } from 'mock-anything';

// Create a Any.
const thing = any();

// Check if anything is a Any.
assert(isAny(thing) === true);
assert(isAny(0) === false);

// You can access any property, returns a new Any.
assert(isAny(thing.foo));
assert(!Object.is(thing.foo, thing));

// You can set any property, nothing will happen.
thing.foo = 'bar';
assert(isAny(thing.foo));

// You can delete any property, nothing will happen.
delete thing.foo;
assert(isAny(thing.foo));

// ... more examples can be found in the test file:
// https://github.com/typed-sigterm/any/blob/latest/__tests__/mod.spec.ts
```
