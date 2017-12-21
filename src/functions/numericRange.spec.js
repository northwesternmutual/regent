import test from 'tape';
import numericRange from './numericRange';

test('numericRange should be a function', (assert) => {
  assert.equal(typeof numericRange, 'function');
  assert.end();
});

test('numericRange should return true when presented with input that is between the param values', (assert) => {
  const input = 30;
  const args = [29, 31];
  const actual = numericRange(input, args);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('numericRange should return true when presented with input that is equal to one of the param values', (assert) => {
  let input = 29;
  let args = [29, 31];
  let actual = numericRange(input, args, 'should return true if input matches the low param');
  let expected = true;
  assert.equal(actual, expected);

  input = 31;
  args = [29, 31];
  actual = numericRange(input, args, 'should return true if input matches the high param');
  expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('numericRange should return false when presented with input that is outside the param values', (assert) => {
  let input = 28;
  let args = [29, 31];
  let actual = numericRange(input, args, 'should return false if input is too low');
  let expected = false;
  assert.equal(actual, expected);

  input = 32;
  args = [29, 31];
  actual = numericRange(input, args, 'should return false if input is too high');
  expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('numericRange should return true if the input is a valid number string', (assert) => {
  const input = '30';
  const args = [29, 31];
  const actual = numericRange(input, args);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('numericRange should throw if numeric range does not have exactly two arguments', (assert) => {
  let input = '30';
  let args = [];
  assert.throws(() => numericRange(input, args), 'should throw if args is empty');

  input = '30';
  args = ['one'];
  assert.throws(() => numericRange(input, args), 'should throw if args has one value');

  input = '30';
  args = ['one', 'two', 'three'];
  assert.throws(() => numericRange(input, args), 'should throw if args has one three values');
  assert.end();
});
