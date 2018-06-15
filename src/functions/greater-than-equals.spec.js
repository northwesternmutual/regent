import test from 'tape';
import greaterThanEquals from './greater-than-equals';

test('greaterThanEquals should be a function', (assert) => {
  assert.equal(typeof greaterThanEquals, 'function');
  assert.end();
});

test('greaterThan should return true if the value given is greater than the param', (assert) => {
  let actual = greaterThanEquals(1, 0);
  let expected = true;
  assert.equal(actual, expected);

  actual = greaterThanEquals(4, 3);
  expected = true;
  assert.equal(actual, expected);

  actual = greaterThanEquals(4.2, 4.1);
  expected = true;
  assert.equal(actual, expected);

  actual = greaterThanEquals(4, 4);
  expected = true;
  assert.equal(actual, expected);

  actual = greaterThanEquals(4.2, 4.2);
  expected = true;
  assert.equal(actual, expected);

  assert.end();
});

test('greaterThan should return true if the value given is equal to the param', (assert) => {
  let actual = greaterThanEquals(1, 1);
  let expected = true;
  assert.equal(actual, expected);

  actual = greaterThanEquals(4, 4);
  expected = true;
  assert.equal(actual, expected);

  actual = greaterThanEquals(4.2, 4.2);
  expected = true;
  assert.equal(actual, expected);

  assert.end();
});

test('greaterThanEquals should return false if the value given is less than the param', (assert) => {
  let actual = greaterThanEquals(1, 2);
  let expected = false;
  assert.equal(actual, expected);

  actual = greaterThanEquals(0, 10);
  expected = false;
  assert.equal(actual, expected);

  actual = greaterThanEquals(null, 4);
  expected = false;
  assert.equal(actual, expected);

  assert.end();
});

test('greaterThanEquals should return false if the key is undefined', (assert) => {
  const actual = greaterThanEquals(undefined, 0);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('greaterThanEquals should return false if the key is a string that parses to NaN', (assert) => {
  const redProps = [
    'cool',
    'some string',
    'undefined',
    'null',
    'false',
    'true',
  ];
  redProps.forEach((val) => {
    const actual = greaterThanEquals(val, 0);
    const expected = false;
    assert.equal(actual, expected, `should return false when passed ${val}`);
  });
  assert.end();
});

test('greaterThanEquals should compare strings based on standard lexicographical ordering, using Unicode values', (assert) => {
  assert.equal(greaterThanEquals('a', 'b'), false, 'case 1');
  assert.equal(greaterThanEquals('aaaa', 'abaa'), false, 'case 2');
  assert.equal(greaterThanEquals('bb', 'a'), true, 'case 3');
  assert.equal(greaterThanEquals('baa', 'abb'), true, 'case 4');
  assert.equal(greaterThanEquals('1', 2), false, 'case 5');
  assert.equal(greaterThanEquals('2', 1), true, 'case 6');
  assert.equal(greaterThanEquals('2', '4'), false, 'case 7');
  assert.equal(greaterThanEquals('2', '2'), true, 'case 8');
  assert.equal(greaterThanEquals(4, 4), true, 'case 9');
  assert.end();
});
