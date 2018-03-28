import test from 'tape';
import typeOf from './type-of';

test('typeOf should be a function', (assert) => {
  assert.equal(typeof typeOf, 'function');
  assert.end();
});

test('typeOf should return true if typeof left is equal to right', (assert) => {
  const left = 'hello';
  const right = 'string';
  const actual = typeOf(left, right);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('typeOf should return false if typeof left is not equal to right', (assert) => {
  const left = { a: 'b' };
  const right = 'string';
  const actual = typeOf(left, right);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('typeOf should handle undefined', (assert) => {
  const left = undefined;
  const right = undefined;
  const actual = typeOf(left, right);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});
