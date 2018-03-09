import test from 'tape';
import isComposedRule from './isComposedRule';

test('isComposedRule should be a function', (assert) => {
  const actual = typeof isComposedRule;
  const expected = 'function';
  assert.equal(actual, expected);
  assert.end();
});

test('isComposedRule should return true when called with a well-formed rule', (assert) => {
  const data = {
    compose: 'foo',
    rules: [],
  };
  assert.true(isComposedRule(data));
  assert.end();
});

test('isComposedRule should return false when called without a well-formed rule', (assert) => {
  const data = { foo: 'bar' };
  assert.false(isComposedRule(data));
  assert.end();
});
