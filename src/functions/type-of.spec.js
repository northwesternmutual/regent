import { typeOf, typeOfFN } from './type-of';

describe('3.x.x - typeOfFN should work in functional style', () => {
  it('should be a function', () => {
    const actual = typeof typeOfFN;
    const expected = 'function';

    expect(actual).toEqual(expected);
  });

  it('should perform typeof', () => {
    const data = {
      foo: () => {},
    };

    const RULE = typeOfFN('@foo', 'function');
    const actual = RULE(data);
    const expected = true;

    expect(actual).toEqual(expected);
  });
});

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
