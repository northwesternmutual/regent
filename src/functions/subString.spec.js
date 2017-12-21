import test from 'tape';
import subString from './subString';

test('subString should be a function', (assert) => {
  assert.equal(typeof subString, 'function');
  assert.end();
});

test('subString Function: Should return true when the first string in the args array is in the input string.', (assert) => {
  const actual = subString('hello_world', ['hello']);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('subString Function: Should return false when the first string in the args array is NOT in the input string.', (assert) => {
  const actual = subString('hello_world', ['bye']);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('subString Function: Should return true if the input is in any of the param array items', (assert) => {
  const actual = subString('hello_world', ['bye', 'world']);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('should return false if input is undefined', (assert) => {
  const actual = subString(undefined, ['bye']);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});
