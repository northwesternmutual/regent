import test from 'tape';
import isLookup from './isLookup';

test('isLookup Function: Should exist.', (assert) => {
  const actual = typeof isLookup;
  const expected = 'function';
  assert.equal(actual, expected);
  assert.end();
});

test('isLookup Function: Should return true if the string is an unescaped string that starts with @', (assert) => {
  const actual = isLookup('@hello');
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('isLookup Function: Should return false if the argument is not a string.', (assert) => {
  let str = {};
  let actual = isLookup(str);
  const expected = false;
  assert.equal(actual, expected);

  str = [];
  actual = isLookup(str);
  assert.equal(actual, expected);

  str = 5;
  actual = isLookup(str);
  assert.equal(actual, expected);

  str = true;
  actual = isLookup(str);
  assert.equal(actual, expected);

  str = undefined;
  actual = isLookup(str);
  assert.equal(actual, expected);

  assert.end();
});


test('isLookup Function: Should return false if the argument is an escaped string', (assert) => {
  let str = '@@hello';
  let actual = isLookup(str);
  const expected = false;
  assert.equal(actual, expected);

  str = '@@@hello';
  actual = isLookup(str);
  assert.equal(actual, expected);

  assert.end();
});

