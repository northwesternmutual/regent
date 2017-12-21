import test from 'tape';
import arraysMatch from './arraysMatch';

test('arraysMatch should be a function', (assert) => {
  assert.equal(typeof arraysMatch, 'function');
  assert.end();
});

test('arraysMatch Function: Should return true if the input array exactly matches the args array.', (assert) => {
  let input = ['a'];
  let args = ['a'];
  let actual = arraysMatch(input, args);
  let expected = true;
  assert.equal(actual, expected, 'Input does not match Args. CASE 1');

  input = ['a', 'b'];
  args = ['a', 'b'];
  actual = arraysMatch(input, args);
  expected = true;
  assert.equal(actual, expected, 'Input does not match Args. CASE 2');

  input = ['a', 'c'];
  args = ['a'];
  actual = arraysMatch(input, args);
  expected = false;
  assert.equal(actual, expected, 'Input does not match Args. CASE 3');

  input = ['a', 'b', 'c'];
  args = ['a', 'b'];
  actual = arraysMatch(input, args);
  expected = false;
  assert.equal(actual, expected, 'Input does not match Args. CASE 4');

  input = ['a', 'b', 'c'];
  args = ['a', 'b', 'c'];
  actual = arraysMatch(input, args);
  expected = true;
  assert.equal(actual, expected, 'Input does not match Args. CASE 5');

  input = ['a', 'c', 'b'];
  args = ['a', 'b', 'c'];
  actual = arraysMatch(input, args);
  expected = true;
  assert.equal(actual, expected, 'Input does not match Args. CASE 6');
  assert.end();
});

test('arraysMatch should return false if input is undefined', (assert) => {
  const input = undefined;
  const args = ['a'];
  const actual = arraysMatch(input, args);
  const expected = false;
  assert.equal(actual, expected, 'should return false if input is undefined');
  assert.end();
});
