import test from 'tape';
import match from './match';

test('match should be a function', (assert) => {
  assert.equal(typeof match, 'function');
  assert.end();
});

test('match Function: Should return true if all the values in the input array are also in the args array', (assert) => {
  let input = ['a', 'b', 'c'];
  let args = ['a'];
  let actual = match(input, args);
  let expected = true;
  assert.equal(actual, expected, `Match should return ${expected}`);

  input = ['a', 'b', 'c'];
  args = ['a', 'b'];
  actual = match(input, args);
  expected = true;
  assert.equal(actual, expected, `Match should return ${expected}`);

  input = ['a', 'b'];
  args = ['b', 'a'];
  actual = match(input, args);
  expected = true;
  assert.equal(actual, expected, `Match should return ${expected}`);

  input = ['a'];
  args = ['a'];
  actual = match(input, args);
  expected = true;
  assert.equal(actual, expected, `Match should return ${expected}`);

  input = ['a'];
  args = ['a', 'b'];
  actual = match(input, args);
  expected = false;
  assert.equal(actual, expected, `Match should return ${expected}`);

  input = undefined;
  args = ['a', 'b'];
  actual = match(input, args);
  expected = false;
  assert.equal(actual, expected, 'Match should return false if input is undefined');
  assert.end();
});

