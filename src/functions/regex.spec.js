import test from 'tape';
import regex from './regex';

test('regex should be a function', (assert) => {
  assert.equal(typeof regex, 'function');
  assert.end();
});

test('regex should return true if the input matches the regex provided in the params', (assert) => {
  const input = 'hello';
  const params = /^hello/;
  const actual = regex(input, params);
  const expected = true;

  assert.equal(actual, expected);
  assert.end();
});

test('regex should return true if the input matches the regex provided in the params', (assert) => {
  const input = '12hello45';
  const params = /[a-z]+/;
  const actual = regex(input, params);
  const expected = true;

  assert.equal(actual, expected);
  assert.end();
});

test('regex should return false if there is no match', (assert) => {
  const input = '12hello45';
  const params = /[A-Z]+/;
  const actual = regex(input, params);
  const expected = false;

  assert.equal(actual, expected);
  assert.end();
});

test('regex should pass documentation examples', (assert) => {
  assert.equal(regex('hello world', /world/), true);
  assert.equal(regex('baz123', /[a-z]+[0-9]+/), true);
  assert.equal(regex('123baz', /[a-z]+[0-9]+/), false);
  assert.end();
});
