import test from 'tape';
import dateBetweenInclusive from './dateBetweenInclusive';

test('dateBetweenInclusive should return true for a date between given range.', (assert) => {
  const examine = '01/02/1975';
  const constraintBefore = '01/01/1975';
  const constraintAfter = '01/03/1975';
  const expected = true;
  const actual = dateBetweenInclusive(examine, [constraintBefore, constraintAfter]);
  assert.equal(actual, expected, `${examine} should be considered between ${constraintBefore} and ${constraintAfter}`);
  assert.end();
});
test('dateBetweenInclusive should return true for a date between given inclusive range.', (assert) => {
  const examine = '01/02/1975';
  const constraintBefore = '01/02/1975';
  const constraintAfter = '01/02/1975';
  const expected = true;
  const actual = dateBetweenInclusive(examine, [constraintBefore, constraintAfter]);
  assert.equal(actual, expected, `${examine} should be considered between ${constraintBefore} and ${constraintAfter}`);
  assert.end();
});
test('dateBetweenInclusive should return false for a date outside a given range.', (assert) => {
  const examine = '01/02/1975';
  const constraintBefore = '01/03/1975';
  const constraintAfter = '01/04/1975';
  const expected = false;
  const actual = dateBetweenInclusive(examine, [constraintBefore, constraintAfter]);
  assert.equal(actual, expected, `${examine} should not be considered between ${constraintBefore} and ${constraintAfter}`);
  assert.end();
});
test('dateBetweenInclusive should throw an error for invalid arguments.', (assert) => {
  const nonDateString = 'not a date';
  const number = 3513513155;
  const bool = true;
  const valid = '01/01/1975';
  assert.throws(() => dateBetweenInclusive(nonDateString, [valid, valid]), `${nonDateString} should throw an error.`);
  assert.throws(() => dateBetweenInclusive(number, [valid, valid]), `${number} should throw an error.`);
  assert.throws(() => dateBetweenInclusive(bool, [valid, valid]), `${bool} should throw an error.`);
  assert.throws(() => dateBetweenInclusive(bool, [undefined, valid]), 'should throw and error if first param is undefind');
  assert.throws(() => dateBetweenInclusive(bool, [valid, undefined]), 'should throw and error if second param is undefind');
  assert.throws(() => dateBetweenInclusive(undefined, [valid, valid]), 'should throw and error if input is undefind');
  assert.end();
});
