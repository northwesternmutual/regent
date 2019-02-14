import test from 'tape';
import every from './every';
import { init } from '../index';

test('every should be a function', (assert) => {
  const actual = typeof every;
  const expected = 'function';
  assert.equal(actual, expected);
  assert.end();
});

test('every should evaluate a regent rule for every item in the looked up array. Should return true if all are true', (assert) => {
  const left = [
    { value: true },
    { value: true },
    { value: true },
  ];
  const right = { left: '@__.value', fn: 'equals', right: true };
  const actual = every(left, right);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('every should evaluate a regent rule for every item in the looked up array. Should return false if not all are true', (assert) => {
  const left = [
    { value: true },
    { value: false },
    { value: true },
  ];
  const right = { left: '@__.value', fn: 'equals', right: true };
  const actual = every(left, right);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('every should have access to the custom predicates of the calling instance', (assert) => {
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
  assert.equal(actual, expected);
  assert.end();
});

test('every should throw an error if right is not a regent rule', (assert) => {
  const left = [
    { value: true },
    { value: true },
    { value: true },
  ];
  const right = { something: 'not a rule' };
  assert.throws(() => every(left, right));
  assert.end();
});

test('every should work if right is a composed rule', (assert) => {
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
  assert.equal(actual, true);

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
  assert.equal(actual, false);
  assert.end();
});

test('every should return false if left is not an array', (assert) => {
  let left = {
    not: 'an array',
  };
  let right = { left: '@__.value', fn: 'equals', right: true };
  let actual = every(left, right);
  assert.equal(actual, false);

  left = 42;
  right = { left: '@__.value', fn: 'equals', right: true };
  actual = every(left, right);
  assert.equal(actual, false);

  left = 'I am clearly a string';
  right = { left: '@__.value', fn: 'equals', right: true };
  actual = every(left, right);
  assert.equal(actual, false);
  assert.end();
});

test('every should return false if left is undefined', (assert) => {
  const right = { left: '@__.value', fn: 'equals', right: true };
  const actual = every(undefined, right);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});
