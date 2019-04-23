import typeOf from './type-of';

describe('typeOf', () => {
  it('typeOf should be a function', () => {
    expect(typeof typeOf).toEqual('function');
  });

  it('typeOf should return true if typeof left is equal to right', () => {
    const left = 'hello';
    const right = 'string';
    const actual = typeOf(left, right);
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('typeOf should return false if typeof left is not equal to right', () => {
    const left = { a: 'b' };
    const right = 'string';
    const actual = typeOf(left, right);
    const expected = false;
    expect(actual).toEqual(expected);
  });

  it('typeOf should handle undefined', () => {
    const left = undefined;
    const right = undefined;
    const actual = typeOf(left, right);
    const expected = false;
    expect(actual).toEqual(expected);
  });
});
