import test from 'tape';
import some from './some';
import { init } from '../index';

test('some should be a function', (assert) => {
  const actual = typeof some;
  const expected = 'function';
  assert.equal(actual, expected);
  assert.end();
});

test('some should evaluate a regent rule for each item in the looked up array. Should return true if some are true', (assert) => {
  const left = [
    { value: false },
    { value: false },
    { value: true },
  ];
  const right = { left: '@__.value', fn: 'equals', right: true };
  const actual = some(left, right);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('some should evaluate a regent rule for each item in the looked up array. Should return false if none are true', (assert) => {
  const left = [
    { value: false },
    { value: false },
    { value: false },
  ];
  const right = { left: '@__.value', fn: 'equals', right: true };
  const actual = some(left, right);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('some should have access to the custom predicates of the calling instance', (assert) => {
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
  assert.equal(actual, expected);
  assert.end();
});

test('some should throw an error if right is not a regent rule', (assert) => {
  const left = [
    { value: true },
    { value: true },
    { value: true },
  ];
  const right = { not: 'a rule' };
  assert.throws(() => some(left, right));
  assert.end();
});

test('some should return false if left is not an array', (assert) => {
  let left = {
    not: 'an array',
  };
  let right = { left: '@__.value', fn: 'equals', right: true };
  let actual = some(left, right);
  assert.equal(actual, false);

  left = 42;
  right = { left: '@__.value', fn: 'equals', right: true };
  actual = some(left, right);
  assert.equal(actual, false);

  left = 'I am clearly a string';
  right = { left: '@__.value', fn: 'equals', right: true };
  actual = some(left, right);
  assert.equal(actual, false);
  assert.end();
});

test('some should return false if left is undefined', (assert) => {
  const right = { left: '@__.value', fn: 'equals', right: true };
  const actual = some(undefined, right);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});
