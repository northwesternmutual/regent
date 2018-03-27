import test from 'tape';
import isComposedRule from './is-composed-rule';

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

test('isComposedRule should recognize a NOT rules', (assert) => {
  const rule = {
    not: { left: 'something', fn: 'equals', right: 'something' },
  };

  assert.true(isComposedRule(rule));
  assert.end();
});

test('isComposedRule should return false if the "not" property is not a regent rule', (assert) => {
  const rule = {
    not: 'string value',
  };

  assert.false(isComposedRule(rule));
  assert.end();
});
