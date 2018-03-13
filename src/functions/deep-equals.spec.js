import test from 'tape';
import deepEqual from './deep-equals';

test('deepEqual should be a function', (assert) => {
  assert.equal(typeof deepEqual, 'function');
  assert.end();
});

test('deepEqual should return true for strings', (assert) => {
  const actual = deepEqual('aaa', 'aaa');
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('deepEqual should return true for objects', (assert) => {
  const object = { a: 1 };
  const other = { a: 1 };
  const actual = deepEqual(object, other);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('deepEqual should return true for nested objects', (assert) => {
  const object = { a: 1, b: { c: 2 } };
  const other = { a: 1, b: { c: 2 } };
  const actual = deepEqual(object, other);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('deepEqual should return false if objects have different values', (assert) => {
  const object = { a: 1, b: { c: 2 } };
  const other = { a: 1, b: { c: 3 } };
  const actual = deepEqual(object, other);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('deepEqual should return false if objects have different keys', (assert) => {
  const object = { a: 1, b: { c: 2 } };
  const other = { a: 1, b: { d: 2 } };
  const actual = deepEqual(object, other);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});
