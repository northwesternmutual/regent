import test from 'tape';
import equals from './equals';

test('equals should be a function', (assert) => {
  assert.equal(typeof equals, 'function');
  assert.end();
});

test('equals should return true if the left is in all of the arguments', (assert) => {
  const left = 'hello';
  const right = 'hello';
  const acutal = equals(left, right);
  const expected = true;
  assert.equal(acutal, expected, 'should return true because "hello" matches "hello"');
  assert.end();
});

test('equals should return false if left does not match all of the arguments', (assert) => {
  const left = 'hello';
  const right = 'world';
  const acutal = equals(left, right);
  const expected = false;
  assert.equal(acutal, expected, 'should return false because hello does not equal world');
  assert.end();
});
