import { deepEquals, deepEqualsFN } from './deep-equals';

describe('deepEqual', () => {
  it('deepEqual should be a function', () => {
    expect(typeof deepEquals).toEqual('function');
  });

  it('deepEqual should return true for strings', () => {
    const actual = deepEquals('aaa', 'aaa');
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('deepEquals should return true for objects', () => {
    const object = { a: 1 };
    const other = { a: 1 };
    const actual = deepEquals(object, other);
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('deepEquals should return true for nested objects', () => {
    const object = { a: 1, b: { c: 2 } };
    const other = { a: 1, b: { c: 2 } };
    const actual = deepEquals(object, other);
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('deepEquals should return false if objects have different values', () => {
    const object = { a: 1, b: { c: 2 } };
    const other = { a: 1, b: { c: 3 } };
    const actual = deepEquals(object, other);
    const expected = false;
    expect(actual).toEqual(expected);
  });

  it('deepEquals should return false if objects have different keys', () => {
    const object = { a: 1, b: { c: 2 } };
    const other = { a: 1, b: { d: 2 } };
    const actual = deepEquals(object, other);
    const expected = false;
    expect(actual).toEqual(expected);
  });
});

describe('deepEqualsFN', () => {
  it('should be a function', () => {
    const actual = typeof deepEqualsFN;
    const expected = 'function';

    expect(actual).toEqual(expected);
  });

  it('should work in a functional style (true)', () => {
    const data = {
      foo: [1, 2, { a: 'b' }],
    };
    const actual = deepEqualsFN('@foo', [1, 2, { a: 'b' }])(data);
    const expected = true;

    expect(actual).toEqual(expected);
  });

  it('should work in a functional style (false)', () => {
    const data = {
      foo: [1, 2, { a: 'b' }],
    };
    const actual = deepEqualsFN('@foo', [1, 2, { a: 'c' }])(data);
    const expected = false;

    expect(actual).toEqual(expected);
  });
});

