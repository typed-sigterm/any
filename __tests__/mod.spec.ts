import { assert, assertEquals } from '@std/assert';
import { any, isAny } from '../src/mod.ts';

const SpecialValues: any[] = [
  // bigint
  0n,
  // boolean
  true,
  false,
  // function
  () => {},
  // number
  0,
  Number.NaN,
  Infinity,
  // object
  {},
  Object.create(null),
  [],
  null,
  // string
  '',
  // symbol
  Symbol(),
  // undefined
  undefined,
];

const Keys = SpecialValues.filter(v => v instanceof Object); // skip values that can't be converted to keys

Deno.test('Any should be recognized by isAny', () => {
  assert(isAny(any()));
  for (const value of SpecialValues)
    assert(!isAny(value));
});

Deno.test('Any should not be equal to any value', () => {
  const thing = any();
  for (const value of SpecialValues)
    assert(thing !== value);
  assert(thing !== any());
});

Deno.test('Accessing property of Any should return a new Any', () => {
  const thing = any();
  for (const key of Keys) {
    const member1 = thing[key];
    assert(isAny(member1));
    assert(thing !== member1);
    const descriptor = Object.getOwnPropertyDescriptor(thing, key);
    const member2 = descriptor?.value;
    delete descriptor?.value; // value is manually tested
    assertEquals(descriptor, {
      configurable: true,
      enumerable: false,
      writable: true,
    });
    assert(isAny(member2));
    assert(thing !== member2);
    assert(member1 !== member2);
  }
});

Deno.test('Setting property of Any should not affect anything', () => {
  const thing = any();
  for (const key of Keys) {
    thing[key] = 0;
    Object.defineProperty(thing, key, {
      value: 0,
    });
    assert(isAny(thing));
    assert(isAny(thing[key]));
  }
});

Deno.test('Deleting properties of should not affect anything', () => {
  const thing = any();
  for (const key of Keys) {
    assert(delete thing[key]);
    assert(isAny(thing));
    assert(isAny(thing[key]));
  }
});

Deno.test('Enumerating Any should return an empty array', () => {
  const thing = any();
  assertEquals(Object.keys(thing), []);
  assertEquals(Object.getOwnPropertyNames(thing), []);
  assertEquals(Object.getOwnPropertySymbols(thing), []);
  assertEquals(Object.entries(thing), []);
  assertEquals(Object.values(thing), []);
  for (const _ in thing)
    assert(false);
});
