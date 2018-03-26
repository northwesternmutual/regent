import test from 'tape';
import dateBeforeInclusive from './date-before-inclusive';

test('dateBeforeInclusive should return true if left is less than the constraint.', (assert) => {
  const examine = '01/01/1975';
  const constraint = '01/02/1975';
  const expected = true;
  const actual = dateBeforeInclusive(examine, constraint);
  assert.equal(actual, expected);
  assert.end();
});
test('dateBeforeInclusive should return true for equal dates', (assert) => {
  const examine = '01/02/1975';
  const constraint = '01/02/1975';
  const expected = true;
  const actual = dateBeforeInclusive(examine, constraint);
  assert.equal(actual, expected);
  assert.end();
});
test('dateBeforeInclusive should return false for a date greater than the left date.', (assert) => {
  const examine = '01/02/1975';
  const constraint = '01/01/1975';
  const expected = false;
  const actual = dateBeforeInclusive(examine, constraint);
  assert.equal(actual, expected);
  assert.end();
});
test('dateBeforeInclusive should throw an error for invalid arguments.', (assert) => {
  const nonDateString = 'not a date';
  const number = 3513513155;
  const bool = true;
  const valid = '01/01/1975';
  assert.throws(() => dateBeforeInclusive(nonDateString, valid), `${nonDateString} should throw an error. Case 1`);
  assert.throws(() => dateBeforeInclusive(number, valid), `${number} should throw an error. Case 2`);
  assert.throws(() => dateBeforeInclusive(bool, valid), `${bool} should throw an error. Case 3`);
  assert.throws(() => dateBeforeInclusive(undefined, valid), 'Should throw an error. Case 4');
  assert.throws(() => dateBeforeInclusive(valid, undefined), 'Should throw an error. Case 5');
  assert.end();
});
