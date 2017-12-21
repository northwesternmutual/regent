import test from 'tape';
import equals from './equals';

test('equals should be a function', (assert) => {
  assert.equal(typeof equals, 'function');
  assert.end();
});

test('equals should return true if the input is in all of the arguments', (assert) => {
  let input = 'hello';
  let args = [
    'hello',
  ];
  let acutal = equals(input, args);
  let expected = true;
  assert.equal(acutal, expected, 'should return true because "hello" matches "hello"');

  input = 'hello';
  args = [
    'hello',
    'hello',
  ];
  acutal = equals(input, args);
  expected = true;
  assert.equal(acutal, expected, 'should return true because hello matches all array elements');
  assert.end();
});

test('equals should return false if input does not match all of the arguments', (assert) => {
  let input = 'hello';
  let args = [
    'world',
  ];
  let acutal = equals(input, args);
  let expected = false;
  assert.equal(acutal, expected, 'should return false because hello does not equal world');

  input = 'hello';
  args = [
    'world',
    'hello',
  ];
  acutal = equals(input, args);
  expected = false;
  assert.equal(acutal, expected, 'should return false because hello does not match all the arguments');
  assert.end();
});
