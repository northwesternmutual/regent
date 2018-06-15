import test from 'tape';
import lessThanEquals from './less-than-equals';

test('lessThanEquals should be a function', (assert) => {
  assert.equal(typeof lessThanEquals, 'function');
  assert.end();
});

test('lessThanEquals should return true if "left" is less than "right"', (assert) => {
  const actual = lessThanEquals(4, 5);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('lessThanEquals should return true if "left" equals "right"', (assert) => {
  const actual = lessThanEquals(5, 5);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('lessThanEquals should return false if "left" is greater than "right', (assert) => {
  const actual = lessThanEquals(255, 254);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('lessThanEquals should return false if the key is a string that parses to NaN', (assert) => {
  const redProps = [
    'cool',
    'some string',
    'undefined',
    'null',
    'false',
    'true',
  ];
  redProps.forEach((val) => {
    const actual = lessThanEquals(val, 0);
    const expected = false;
    assert.equal(actual, expected, `should return false when passed ${val}`);
  });
  assert.end();
});

test('lessThanEquals should compare strings based on standard lexicographical ordering, using Unicode values', (assert) => {
  assert.equal(lessThanEquals('a', 'b'), true, 'case 1');
  assert.equal(lessThanEquals('aaaa', 'abaa'), true, 'case 2');
  assert.equal(lessThanEquals('bb', 'a'), false, 'case 3');
  assert.equal(lessThanEquals('baa', 'abb'), false, 'case 4');
  assert.equal(lessThanEquals('1', 2), true, 'case 5');
  assert.equal(lessThanEquals('2', 1), false, 'case 6');
  assert.equal(lessThanEquals('2', '4'), true, 'case 7');
  assert.equal(lessThanEquals('4', '4'), true, 'case 8');
  assert.equal(lessThanEquals(4, '4'), true, 'case 9');
  assert.end();
});
