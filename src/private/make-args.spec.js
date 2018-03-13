import test from 'tape';
import makeArgs from './make-args';

test('makeArgs Function: Should exist.', (assert) => {
  const actual = typeof makeArgs;
  const expected = 'function';
  assert.equal(actual, expected);
  assert.end();
});

test('makeArgs Function: Should exist.', (assert) => {
  const data = {
    foo: 'foo',
    bar: 'bar',
    nest: {
      foo: 1,
      bar: 2,
    },
  };

  let left = '@foo';
  let right = 'foo';
  let actual = makeArgs(data, left, right);
  let expected = { left: 'foo', right: 'foo' };
  assert.deepEqual(actual, expected);

  left = '@foo';
  right = '@bar';
  actual = makeArgs(data, left, right);
  expected = { left: 'foo', right: 'bar' };
  assert.deepEqual(actual, expected);

  left = 'foo';
  right = '@foo';
  actual = makeArgs(data, left, right);
  expected = { left: 'foo', right: 'foo' };
  assert.deepEqual(actual, expected);

  left = '@nest.foo';
  right = 1;
  actual = makeArgs(data, left, right);
  expected = { left: 1, right: 1 };
  assert.deepEqual(actual, expected);

  left = '@nest.bar';
  right = '@nest.foo';
  actual = makeArgs(data, left, right);
  expected = { left: 2, right: 1 };
  assert.deepEqual(actual, expected);

  left = '@@nest.bar'; // Escaped
  right = '@nest.foo';
  actual = makeArgs(data, left, right);
  expected = { left: '@nest.bar', right: 1 };
  assert.deepEqual(actual, expected);

  assert.end();
});

