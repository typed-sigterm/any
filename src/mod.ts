/**
 * Equivalent to `any`.
 * 
 * Tip: Sometimes this can help avoid linting errors.
 */
export type Any = any;

function anyToPrimitive(hint: 'string' | 'number' | 'default') {
  switch (hint) {
    case 'string':
    case 'default':
      return '[object Any]';
    case 'number': return Number.NaN;
  }
}

/**
 * Create a new Any.
 * @returns a new Any.
 */
export function any(): Any {
  return new Proxy({}, {
    apply: () => any(),
    construct: () => any(),
    defineProperty: () => true,
    deleteProperty: () => true,

    get(_, prop) {
      if (prop === Symbol.toPrimitive)
        return anyToPrimitive;
      return any();
    },

    getOwnPropertyDescriptor: () => ({
      configurable: true,
      enumerable: true,
      value: any(),
      writable: true,
    }),

    getPrototypeOf: () => Function,
    has: () => true,
    isExtensible: () => true,
    ownKeys: () => [],
    preventExtensions: () => true,
    set: () => true,
    setPrototypeOf: () => true,
  });
}

/**
 * Check if a value is an Any.
 * @param value The value to check.
 * @returns whether the value is an Any.
 */
export function isAny(value: unknown): value is Any {
  return typeof value === 'object'
    && value !== null
    && Object.getPrototypeOf(value) !== null
    && String(value) === '[object Any]';
}
