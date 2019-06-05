import deepEqual from './deep-equals';

describe('deepEqual', () => {
  it('deepEqual should be a function', () => {
    expect(typeof deepEqual).toEqual('function');
  });

  it('deepEqual should return true for strings', () => {
    const actual = deepEqual('aaa', 'aaa');
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('deepEqual should return true for objects', () => {
    const object = { a: 1 };
    const other = { a: 1 };
    const actual = deepEqual(object, other);
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('deepEqual should return true for nested objects', () => {
    const object = { a: 1, b: { c: 2 } };
    const other = { a: 1, b: { c: 2 } };
    const actual = deepEqual(object, other);
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('deepEqual should return false if objects have different values', () => {
    const object = { a: 1, b: { c: 2 } };
    const other = { a: 1, b: { c: 3 } };
    const actual = deepEqual(object, other);
    const expected = false;
    expect(actual).toEqual(expected);
  });

  it('deepEqual should return false if objects have different keys', () => {
    const object = { a: 1, b: { c: 2 } };
    const other = { a: 1, b: { d: 2 } };
    const actual = deepEqual(object, other);
    const expected = false;
    expect(actual).toEqual(expected);
  });
});

