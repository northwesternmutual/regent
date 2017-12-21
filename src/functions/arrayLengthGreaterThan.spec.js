import test from 'tape';
import arrayLengthGreaterThan from './arrayLengthGreaterThan';

test('arrayLengthGreaterThan should be a function', (assert) => {
  assert.equal(typeof arrayLengthGreaterThan, 'function');
  assert.end();
});

test('arrayLengthGreaterThan: Should return true if input array is empty', (assert) => {
  assert.equal(typeof arrayLengthGreaterThan, 'function', 'Should be a function');

  const badVal = undefined;
  assert.equal(arrayLengthGreaterThan(badVal, [1]), false, 'Should return false when array is undefined');

  assert.equal(arrayLengthGreaterThan([1, 2, 3], [2]), true, 'Should return true when array length is greater than args');

  assert.equal(arrayLengthGreaterThan([1, 2, 3], [3]), false, 'Should return false when array length is equal to args');

  assert.equal(arrayLengthGreaterThan([1, 2, 3], [4]), false, 'Should return false when array length is less than args');

  assert.equal(arrayLengthGreaterThan([], [4]), false, 'Should return false when array length is less than args');

  assert.equal(arrayLengthGreaterThan([1], []), false, 'Should return false when args is not supplied');

  const something = 'something';
  assert.equal(arrayLengthGreaterThan(something, 1), false, 'Should return false when input is not an array');
  assert.end();
});
