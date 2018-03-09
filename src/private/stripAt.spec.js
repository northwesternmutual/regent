import test from 'tape';
import stripAt from './stripAt';

test('stripAt Function: Should exist.', (assert) => {
  const actual = typeof stripAt;
  const expected = 'function';
  assert.equal(actual, expected);
  assert.end();
});

test('stripAt Function: Should strip the first @ off of a string that begins with an @', (assert) => {
  const str = '@hello';
  const actual = stripAt(str);
  const expected = 'hello';
  assert.equal(actual, expected);
  assert.end();
});

test('stripAt Function: Should strip ONLY the first @ off of a string that begins with an @', (assert) => {
  const str = '@@hello';
  const actual = stripAt(str);
  const expected = '@hello';
  assert.equal(actual, expected);
  assert.end();
});

test('stripAt Function: Should NOT strip the @ off of a string unless that @ is at the beginning.', (assert) => {
  const str = 'he@llo';
  const actual = stripAt(str);
  const expected = 'he@llo';
  assert.equal(actual, expected);
  assert.end();
});
