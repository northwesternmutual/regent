import { empty, emptyFN } from './empty';

describe('3.x.x - empty functional style', () => {
  it('should be a function', () => {
    const actual = typeof emptyFN;
    const expected = 'function';

    expect(actual).toEqual(expected);
  });

  it('should return true for empty items', () => {
    const data = {
      foo: '',
      bar: null,
      biz: 'undefined',
    };

    const RULE = emptyFN('@foo')(data);
    const RULE2 = emptyFN('@bar')(data);
    const RULE3 = emptyFN('@biz')(data);
    const RULE4 = emptyFN('@baz')(data);

    expect(RULE).toEqual(true);
    expect(RULE2).toEqual(true);
    expect(RULE3).toEqual(true);
    expect(RULE4).toEqual(true);
  });
});

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
