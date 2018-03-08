import test from 'tape';
import greaterThan from './greaterThan';

test('greaterThan should be a function', (assert) => {
  assert.equal(typeof greaterThan, 'function');
  assert.end();
});

test('greaterThan should return true if the value given is greater than the param', (assert) => {
  let actual = greaterThan(1, 0);
  let expected = true;
  assert.equal(actual, expected);

  actual = greaterThan(4, 3);
  expected = true;
  assert.equal(actual, expected);

  actual = greaterThan(4.2, 4.1);
  expected = true;
  assert.equal(actual, expected);

  assert.end();
});

test('greaterThan should return false if the value given is less than or equal than the param', (assert) => {
  let actual = greaterThan(1, 2);
  let expected = false;
  assert.equal(actual, expected);

  actual = greaterThan(0, 10);
  expected = false;
  assert.equal(actual, expected);

  actual = greaterThan(null, 4);
  expected = false;
  assert.equal(actual, expected);

  assert.end();
});

test('greaterThan should return false if the key is undefined', (assert) => {
  const actual = greaterThan(undefined, 0);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('greaterThan should return true for documentation cases', (assert) => {
  let result = greaterThan(4, 1); // true
  assert.equal(result, true, 'case 1');

  result = greaterThan(4, 5); // false
  assert.equal(result, false, 'case 3');

  assert.end();
});

test('greaterThan should return false if the key is a string that parses to NaN', (assert) => {
  const redProps = [
    'cool',
    'some string',
    'undefined',
    'null',
    'false',
    'true',
  ];
  redProps.forEach((val) => {
    const actual = greaterThan(val, 0);
    const expected = false;
    assert.equal(actual, expected, `should return false when passed ${val}`);
  });
  assert.end();
});
