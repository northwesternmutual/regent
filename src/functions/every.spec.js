import every from './every';
import { init } from '../index';

describe('every', () => {
  it('every should be a function', () => {
    const actual = typeof every;
    const expected = 'function';
    expect(actual).toEqual(expected);
  });

  it('every should evaluate a regent rule for every item in the looked up array. Should return true if all are true', () => {
    const left = [
      { value: true },
      { value: true },
      { value: true },
    ];
    const right = { left: '@__.value', fn: 'equals', right: true };
    const actual = every(left, right);
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('every should evaluate a regent rule for every item in the looked up array. Should return false if not all are true', () => {
    const left = [
      { value: true },
      { value: false },
      { value: true },
    ];
    const right = { left: '@__.value', fn: 'equals', right: true };
    const actual = every(left, right);
    const expected = false;
    expect(actual).toEqual(expected);
  });

  it('every should have access to the custom predicates of the calling instance', () => {
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
    const everyRule = { left: '@arr', fn: 'every', right: RULE };
    const actual = king.evaluate(everyRule, data);
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('every should throw an error if right is not a regent rule', () => {
    const left = [
      { value: true },
      { value: true },
      { value: true },
    ];
    const right = { something: 'not a rule' };
    expect(() => every(left, right).toThrow());
  });

  it('every should work if right is a composed rule', () => {
    let left = [
      { value: true },
      { value: 'yes' },
      { value: true },
    ];
    let right = {
      compose: 'or',
      rules: [
        { left: '@__.value', fn: 'equals', right: true },
        { left: '@__.value', fn: 'equals', right: 'yes' },
      ],
    };
    let actual = every(left, right);
    expect(actual).toEqual(true);

    left = [
      { value: true },
      { value: 'blah' },
      { value: true },
    ];
    right = {
      compose: 'or',
      rules: [
        { left: '@__.value', fn: 'equals', right: true },
        { left: '@__.value', fn: 'equals', right: 'yes' },
      ],
    };
    actual = every(left, right);
    expect(actual).toEqual(false);
  });

  it('every should return false if left is not an array', () => {
    let left = {
      not: 'an array',
    };
    let right = { left: '@__.value', fn: 'equals', right: true };
    let actual = every(left, right);
    expect(actual).toEqual(false);

    left = 42;
    right = { left: '@__.value', fn: 'equals', right: true };
    actual = every(left, right);
    expect(actual).toEqual(false);

    left = 'I am clearly a string';
    right = { left: '@__.value', fn: 'equals', right: true };
    actual = every(left, right);
    expect(actual).toEqual(false);
  });

  it('every should return false if left is undefined', () => {
    const right = { left: '@__.value', fn: 'equals', right: true };
    const actual = every(undefined, right);
    const expected = false;
    expect(actual).toEqual(expected);
  });
});

