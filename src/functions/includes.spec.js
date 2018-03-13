import test from 'tape';
import includes from './includes';

test('includes should be a function', (assert) => {
  assert.equal(typeof includes, 'function');
  assert.end();
});

test('includes Function: Should return true when first argument is in the args array', (assert) => {
  const args = [2, 3, 4];
  const actual = includes(args, 3);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('includes Function: Should return false when the first argument is not in args array.', (assert) => {
  const args = [2, 3, 4];
  const actual = includes(5, args);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('includes should honor lodash.includes wishes :)', (assert) => {
  assert.equal(includes([1, 2, 3], 1), true, 'case 1');
  assert.equal(includes({ a: 1, b: 2 }, 1), true, 'case 2');
  assert.equal(includes('abcd', 'bc'), true, 'case 3');
  assert.end();
});
