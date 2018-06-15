import test from 'tape';
import lessThanOrEquals from './less-than-equals';

test('lessThanOrEquals should be a function', (assert) => {
  assert.equal(typeof lessThanOrEquals, 'function');
  assert.end();
});

test('lessThanOrEquals should return true if "left" is less than "right"', (assert) => {
  const actual = lessThanOrEquals(4, 5);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('lessThanOrEquals should return true if "left" equals "right"', (assert) => {
  const actual = lessThanOrEquals(5, 5);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('lessThanOrEquals should return false if "left" is greater than "right', (assert) => {
  const actual = lessThanOrEquals(255, 254);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('lessThanOrEquals should return false if the key is a string that parses to NaN', (assert) => {
  const redProps = [
    'cool',
    'some string',
    'undefined',
    'null',
    'false',
    'true',
  ];
  redProps.forEach((val) => {
    const actual = lessThanOrEquals(val, 0);
    const expected = false;
    assert.equal(actual, expected, `should return false when passed ${val}`);
  });
  assert.end();
});

test('lessThanOrEquals should compare strings based on standard lexicographical ordering, using Unicode values', (assert) => {
  assert.equal(lessThanOrEquals('a', 'b'), true, 'case 1');
  assert.equal(lessThanOrEquals('aaaa', 'abaa'), true, 'case 2');
  assert.equal(lessThanOrEquals('bb', 'a'), false, 'case 3');
  assert.equal(lessThanOrEquals('baa', 'abb'), false, 'case 4');
  assert.equal(lessThanOrEquals('1', 2), true, 'case 5');
  assert.equal(lessThanOrEquals('2', 1), false, 'case 6');
  assert.equal(lessThanOrEquals('2', '4'), true, 'case 7');
  assert.equal(lessThanOrEquals('4', '4'), true, 'case 8');
  assert.equal(lessThanOrEquals(4, '4'), true, 'case 9');
  assert.end();
});
