import test from 'tape';
import FN from './fn';

test('FN should be a function', (assert) => {
  assert.equal(typeof FN, 'function');
  assert.end();
});

test('FN test api: calling equals', (assert) => {
  const left = 'hello';
  const right = 'hello';
  const actual = FN('equals')(left, right);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('FN test api: calling !equals', (assert) => {
  const left = 'hello';
  const right = 'hello';
  const actual = FN('!equals')(left, right);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('FN should accept a custom eval function', (assert) => {
  const custom = {
    equalsSquirm: left => left === 'squirm',
  };
  let left = 'squirm';
  let actual = FN('equalsSquirm', custom)(left);
  let expected = true;
  assert.equal(actual, expected);

  left = 'notsquirm';
  actual = FN('equalsSquirm', custom)(left);
  expected = false;
  assert.equal(actual, expected, 'custom FN should return false if it is false');

  left = 'squirm';
  actual = FN('!equalsSquirm', custom)(left); /* ? */
  expected = false;
  assert.equal(actual, expected, 'custom FN should accept the ! param to invert the response');
  assert.end();
});

test('FN should catch and console.log if there is an error', (assert) => {
  assert.doesNotThrow(() => FN()(), 'Does not throw if called with nothing');
  assert.end();
});
