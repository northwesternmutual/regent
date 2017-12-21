import test from 'tape';
import isIn from './isIn';

test('isIn should be a function', (assert) => {
  assert.equal(typeof isIn, 'function');
  assert.end();
});

test('isIn Function: Should return true when first argument is in the args array', (assert) => {
  const args = [2, 3, 4];
  const actual = isIn(3, args);
  const expected = true;
  assert.equal(actual, expected, '');
  assert.end();
});
test('isIn Function: Should return false when the first argument is not in args array.', (assert) => {
  const args = [2, 3, 4];
  const actual = isIn(5, args);
  const expected = false;
  assert.equal(actual, expected, '');
  assert.end();
});
