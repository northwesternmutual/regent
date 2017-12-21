import test from 'tape';
import empty from './empty';

test('empty should be a function', (assert) => {
  assert.equal(typeof empty, 'function');
  assert.end();
});

test('empty should return true if input is undefined, null, "undefined", or "" (empty string)', (assert) => {
  const greenArr = [
    undefined,
    null,
    'undefined',
    '',
  ];
  greenArr.forEach((input) => {
    const actual = empty(input);
    const expected = true;
    assert.equal(actual, expected, `should return true for input value ${input}`);
  });
  assert.end();
});

test('validate documentation cases', (assert) => {
  let result = empty(); // true
  assert.equal(result, true);
  result = empty(''); // true
  assert.equal(result, true);
  result = empty(null); // true
  assert.equal(result, true);
  result = empty(undefined); // true
  assert.equal(result, true);
  result = empty('some value'); // false
  assert.equal(result, false);
  result = empty({}); // false
  assert.equal(result, false);
  result = empty([]); // false
  assert.equal(result, false);
  result = empty(['']); // false
  assert.equal(result, false);

  assert.end();
});
