import test from 'tape';
import greaterThanOrEquals from './greater-than-equals';

test('greaterThanOrEquals should be a function', (assert) => {
  assert.equal(typeof greaterThanOrEquals, 'function');
  assert.end();
});

test('greaterThan should return true if the value given is greater than the param', (assert) => {
  let actual = greaterThanOrEquals(1, 0);
  let expected = true;
  assert.equal(actual, expected);

  actual = greaterThanOrEquals(4, 3);
  expected = true;
  assert.equal(actual, expected);

  actual = greaterThanOrEquals(4.2, 4.1);
  expected = true;
  assert.equal(actual, expected);

  actual = greaterThanOrEquals(4, 4);
  expected = true;
  assert.equal(actual, expected);

  actual = greaterThanOrEquals(4.2, 4.2);
  expected = true;
  assert.equal(actual, expected);

  assert.end();
});

test('greaterThan should return true if the value given is equal to the param', (assert) => {
  let actual = greaterThanOrEquals(1, 1);
  let expected = true;
  assert.equal(actual, expected);

  actual = greaterThanOrEquals(4, 4);
  expected = true;
  assert.equal(actual, expected);

  actual = greaterThanOrEquals(4.2, 4.2);
  expected = true;
  assert.equal(actual, expected);

  assert.end();
});

test('greaterThanOrEquals should return false if the value given is less than the param', (assert) => {
  let actual = greaterThanOrEquals(1, 2);
  let expected = false;
  assert.equal(actual, expected);

  actual = greaterThanOrEquals(0, 10);
  expected = false;
  assert.equal(actual, expected);

  actual = greaterThanOrEquals(null, 4);
  expected = false;
  assert.equal(actual, expected);

  assert.end();
});

test('greaterThanOrEquals should return false if the key is undefined', (assert) => {
  const actual = greaterThanOrEquals(undefined, 0);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('greaterThanOrEquals should return false if the key is a string that parses to NaN', (assert) => {
  const redProps = [
    'cool',
    'some string',
    'undefined',
    'null',
    'false',
    'true',
  ];
  redProps.forEach((val) => {
    const actual = greaterThanOrEquals(val, 0);
    const expected = false;
    assert.equal(actual, expected, `should return false when passed ${val}`);
  });
  assert.end();
});

test('greaterThanOrEquals should compare strings based on standard lexicographical ordering, using Unicode values', (assert) => {
  assert.equal(greaterThanOrEquals('a', 'b'), false, 'case 1');
  assert.equal(greaterThanOrEquals('aaaa', 'abaa'), false, 'case 2');
  assert.equal(greaterThanOrEquals('bb', 'a'), true, 'case 3');
  assert.equal(greaterThanOrEquals('baa', 'abb'), true, 'case 4');
  assert.equal(greaterThanOrEquals('1', 2), false, 'case 5');
  assert.equal(greaterThanOrEquals('2', 1), true, 'case 6');
  assert.equal(greaterThanOrEquals('2', '4'), false, 'case 7');
  assert.equal(greaterThanOrEquals('2', '2'), true, 'case 8');
  assert.equal(greaterThanOrEquals(4, 4), true, 'case 9');
  assert.end();
});
