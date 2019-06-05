import empty from './empty';

describe('empty', () => {
  it('empty should be a function', () => {
    expect(typeof empty).toEqual('function');
  });

  it('empty should return true if input is undefined, null, "undefined", or "" (empty string)', () => {
    const greenArr = [
      undefined,
      null,
      'undefined',
      '',
    ];
    greenArr.forEach((input) => {
      const actual = empty(input);
      const expected = true;
      expect(actual).toEqual(expected);
    });
  });

  it('validate documentation cases', () => {
    let result = empty(); // true
    expect(result).toEqual(true);
    result = empty(''); // true
    expect(result).toEqual(true);
    result = empty(null); // true
    expect(result).toEqual(true);
    result = empty(undefined); // true
    expect(result).toEqual(true);
    result = empty('some value'); // false
    expect(result).toEqual(false);
    result = empty({}); // false
    expect(result).toEqual(false);
    result = empty([]); // false
    expect(result).toEqual(false);
    result = empty(['']); // false
    expect(result).toEqual(false);
  });
});
