import test from 'tape';
import dateAfterInclusive from './dateAfterInclusive';

test('dateAfterInclusive should return true for a date constraint given range.', (assert) => {
  const examine = '01/02/1975';
  const constraint = '01/01/1975';
  const expected = true;
  const actual = dateAfterInclusive(examine, [constraint]);
  assert.equal(actual, expected, `${examine} should be considered constraint ${constraint}`);
  assert.end();
});
test('dateAfterInclusive should return true for a date constraint given inclusive range.', (assert) => {
  const examine = '01/02/1975';
  const constraint = '01/02/1975';
  const expected = true;
  const actual = dateAfterInclusive(examine, [constraint]);
  assert.equal(actual, expected, `${examine} should be considered constraint ${constraint}.`);
  assert.end();
});
test('dateAfterInclusive should return false for a date outside a given range.', (assert) => {
  const examine = '01/02/1975';
  const constraint = '01/03/1975';
  const expected = false;
  const actual = dateAfterInclusive(examine, [constraint]);
  assert.equal(actual, expected, `${examine} should not be considered constraint ${constraint}.`);
  assert.end();
});
test('dateAfterInclusive should throw an error for invalid arguments.', (assert) => {
  const nonDateString = 'not a date';
  const number = 3513513155;
  const bool = true;
  const valid = '01/01/1975';
  assert.throws(() => dateAfterInclusive(nonDateString, [valid]), `${nonDateString} should throw an error.`);
  assert.throws(() => dateAfterInclusive(number, [valid]), `${number} should throw an error.`);
  assert.throws(() => dateAfterInclusive(bool, [valid]), `${bool} should throw an error.`);
  assert.end();
});

test('dateAfterInclusive should throw if there is no input and/or no params', (assert) => {
  const input = undefined;
  const args = [''];
  assert.throws(() => dateAfterInclusive(input, args));
  assert.end();
});
