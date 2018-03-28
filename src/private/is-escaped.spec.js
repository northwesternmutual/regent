import test from 'tape';
import isEscaped from './is-escaped';

test('isEscaped Function: Should exist.', (assert) => {
  const actual = typeof isEscaped;
  const expected = 'function';
  assert.equal(actual, expected);
  assert.end();
});

test('isEscaped Function: Should return false when the argument does not start with @@', (assert) => {
  let str = '@hello';
  let actual = isEscaped(str);
  const expected = false;
  assert.equal(actual, expected);

  str = 'hello';
  actual = isEscaped(str);
  assert.equal(actual, expected);

  str = 'hello@@';
  actual = isEscaped(str);
  assert.equal(actual, expected);

  str = 'he@llo';
  actual = isEscaped(str);
  assert.equal(actual, expected);

  assert.end();
});

test('isEscaped Function: Should return false when the argument is not a string.', (assert) => {
  let str = {};
  let actual = isEscaped(str);
  const expected = false;
  assert.equal(actual, expected);

  str = [];
  actual = isEscaped(str);
  assert.equal(actual, expected);

  str = 5;
  actual = isEscaped(str);
  assert.equal(actual, expected);

  str = true;
  actual = isEscaped(str);
  assert.equal(actual, expected);

  str = undefined;
  actual = isEscaped(str);
  assert.equal(actual, expected);

  assert.end();
});

test('isEscaped Function: Should return false when the argument does not start with @@', (assert) => {
  const str = '@hello';
  const actual = isEscaped(str);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('isEscaped Function: Should return true when the argument provided does begin with @@', (assert) => {
  const str = '@@hello';
  const actual = isEscaped(str);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});
