import isComposedRule from './is-composed-rule';

describe('isComposedRule', () => {
  it('isComposedRule should be a function', () => {
    const actual = typeof isComposedRule;
    const expected = 'function';
    expect(actual).toEqual(expected);
  });

  it('isComposedRule should return true when called with a well-formed rule', () => {
    const data = {
      compose: 'foo',
      rules: [],
    };
    expect(isComposedRule(data)).toEqual(true);
  });

  it('isComposedRule should return false when called without a well-formed rule', () => {
    const data = { foo: 'bar' };
    expect(isComposedRule(data)).toEqual(false);
  });

  it('isComposedRule should recognize a NOT rules', () => {
    const rule = {
      not: { left: 'something', fn: 'equals', right: 'something' },
    };

    expect(isComposedRule(rule)).toEqual(true);
  });

  it('isComposedRule should return true even if the "not" property is not a regent rule', () => {
    const rule = {
      not: 'string value',
    };

    expect(isComposedRule(rule)).toEqual(true);
  });
});
