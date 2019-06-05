import isRule from './is-rule';

describe('isRule', () => {
  it('isRule should be a function', () => {
    const actual = typeof isRule;
    const expected = 'function';
    expect(actual).toEqual(expected);
  });

  it('isRule should return true when called with a well-formed rule', () => {
    const data = { left: '@foo', fn: 'bar', right: ['baz'] };
    expect(isRule(data)).toEqual(true);
  });

  it('isRule should return false when called with a poorly-formed rule', () => {
    const data = { foo: 'bar' };
    expect(isRule(data)).toEqual(false);
  });

  it('isRule should return true for rules that have only a left and fn property.', () => {
    const data = { left: '@foo', fn: 'bar' };
    expect(isRule(data)).toEqual(true);
  });

  it('isRule should return true for rules that have only a right and fn property.', () => {
    const data = { fn: 'bar', right: '@foo' };
    expect(isRule(data)).toEqual(true);
  });
});

