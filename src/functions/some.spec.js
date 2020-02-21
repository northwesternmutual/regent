import { some, someFN } from './some';
import { init, equals } from '../index';

describe('3.x.x - some', () => {
  it('should work with function style rules (passing)', () => {
    const data = {
      nodes: [
        { foo: 'bar' },
        { foo: 'foo' },
      ],
    };

    const RULE = equals('@__.foo', 'bar');
    const E_RULE = someFN('@nodes', RULE);
    const actual = E_RULE(data);
    const expected = true;

    expect(actual).toEqual(expected);
  });

  it('should work with function style rules (failing)', () => {
    const data = {
      nodes: [
        { foo: 'foo' },
        { foo: 'foo' },
      ],
    };

    const RULE = equals('@__.foo', 'bar');
    const E_RULE = someFN('@nodes', RULE);
    const actual = E_RULE(data);
    const expected = false;

    expect(actual).toEqual(expected);
  });
});

describe('some', () => {
  it('some should be a function', () => {
    const actual = typeof some;
    const expected = 'function';
    expect(actual).toEqual(expected);
  });

  it('some should evaluate a regent rule for each item in the looked up array. Should return true if some are true', () => {
    const left = [
      { value: false },
      { value: false },
      { value: true },
    ];
    const right = { left: '@__.value', fn: 'equals', right: true };
    const actual = some(left, right);
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('some should evaluate a regent rule for each item in the looked up array. Should return false if none are true', () => {
    const left = [
      { value: false },
      { value: false },
      { value: false },
    ];
    const right = { left: '@__.value', fn: 'equals', right: true };
    const actual = some(left, right);
    const expected = false;
    expect(actual).toEqual(expected);
  });

  it('some should have access to the custom predicates of the calling instance', () => {
    const customFns = {
      leftEqualsRight: (left, right) => left === right,
    };
    const king = init(customFns);
    const data = {
      arr: [
        { value: true },
        { value: true },
        { value: true },
      ],
    };
    const RULE = { left: '@__.value', fn: 'equals', right: true };
    const someRule = { left: '@arr', fn: 'some', right: RULE };
    const actual = king.evaluate(someRule, data);
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('some should throw an error if right is not a regent rule', () => {
    const left = [
      { value: true },
      { value: true },
      { value: true },
    ];
    const right = { this_is_not: 'a rule' };
    expect(() => some(left, right)).toThrow('Regent: the right property of an every rule must be a regent rule');
  });

  it('some should return false if left is not an array', () => {
    let left = {
      not: 'an array',
    };
    let right = { left: '@__.value', fn: 'equals', right: true };
    let actual = some(left, right);
    expect(actual).toEqual(false);

    left = 42;
    right = { left: '@__.value', fn: 'equals', right: true };
    actual = some(left, right);
    expect(actual).toEqual(false);

    left = 'I am clearly a string';
    right = { left: '@__.value', fn: 'equals', right: true };
    actual = some(left, right);
    expect(actual).toEqual(false);
  });

  it('some should return false if left is undefined', () => {
    const right = { left: '@__.value', fn: 'equals', right: true };
    const actual = some(undefined, right);
    const expected = false;
    expect(actual).toEqual(expected);
  });

  it('some should work with helper composed rules', () => {
    const left = [
      { value: true },
      { value: 'yes' },
      { value: false },
    ];
    const right = {
      compose: 'or',
      rules: [
        { left: '@__.value', fn: 'equals', right: true },
        { left: '@__.value', fn: 'equals', right: 'yes' },
      ],
    };
    const actual = some(left, right);
    expect(actual).toEqual(true);
  });
});

