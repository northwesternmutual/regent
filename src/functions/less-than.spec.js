import test from 'tape';
import lessThan from './less-than';

test('lessThan should be a function', (assert) => {
  assert.equal(typeof lessThan, 'function');
  assert.end();
});

test('lessThan should return true if "left" is less than "right"', (assert) => {
  const actual = lessThan(4, 5);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('lessThan should return false if "left" is greater than "right', (assert) => {
  const actual = lessThan(255, 254);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('lessThan should return false if "left" is equal to "right"', (assert) => {
  const actual = lessThan(123, 123);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('lessThan should return false if the key is undefined', (assert) => {
  const actual = lessThan(undefined, 0);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('lessThan should return false if the key is a string that parses to NaN', (assert) => {
  const redProps = [
    'cool',
    'some string',
    'undefined',
    'null',
    'false',
    'true',
  ];
  redProps.forEach((val) => {
    const actual = lessThan(val, 0);
    const expected = false;
    assert.equal(actual, expected, `should return false when passed ${val}`);
  });
  assert.end();
});

test('lessThan should compare strings based on standard lexicographical ordering, using Unicode values', (assert) => {
  assert.equal(lessThan('a', 'b'), true, 'case 1');
  assert.equal(lessThan('aaaa', 'abaa'), true, 'case 2');
  assert.equal(lessThan('bb', 'a'), false, 'case 3');
  assert.equal(lessThan('baa', 'abb'), false, 'case 4');
  assert.equal(lessThan('1', 2), true, 'case 5');
  assert.equal(lessThan('2', 1), false, 'case 6');
  assert.equal(lessThan('2', '4'), true, 'case 7');
  assert.end();
});
