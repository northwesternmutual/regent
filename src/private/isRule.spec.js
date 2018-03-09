import test from 'tape';
import isRule from './isRule';

test('isRule should be a function', (assert) => {
  const actual = typeof isRule;
  const expected = 'function';
  assert.equal(actual, expected);
  assert.end();
});

test('isRule should return true when called with a well-formed rule', (assert) => {
  const data = { left: '@foo', fn: 'bar', right: ['baz'] };
  assert.true(isRule(data));
  assert.end();
});

test('isRule should return false when called with a poorly-formed rule', (assert) => {
  const data = { foo: 'bar' };
  assert.false(isRule(data));
  assert.end();
});
