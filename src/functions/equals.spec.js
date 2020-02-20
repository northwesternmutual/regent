import { equals, equalsFN } from './equals';

describe('equals', () => {
  it('equals should be a function', () => {
    expect(typeof equals).toEqual('function');
  });

  it('equals should return true if the left is in all of the arguments', () => {
    const left = 'hello';
    const right = 'hello';
    const acutal = equals(left, right);
    const expected = true;
    expect(acutal).toEqual(expected);
  });

  it('equals should return false if left does not match all of the arguments', () => {
    const left = 'hello';
    const right = 'world';
    const acutal = equals(left, right);
    const expected = false;
    expect(acutal).toEqual(expected);
  });
});

describe('equalsFN', () => {
  it('should be a function', () => {
    const actual = typeof equalsFN;
    const expected = 'function';

    expect(actual).toEqual(expected);
  });

  it('should work in a functional style (true)', () => {
    const data = {
      foo: 'bar',
    };
    const actual = equalsFN('@foo', 'bar')(data);
    const expected = true;

    expect(actual).toEqual(expected);
  });

  it('should work in a functional style (false)', () => {
    const data = {
      foo: 'baz',
    };
    const actual = equalsFN('@foo', 'bar')(data);
    const expected = false;

    expect(actual).toEqual(expected);
  });
});
