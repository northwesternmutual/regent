import test from 'tape';
import regex from './regex';

test('regex should be a function', (assert) => {
  assert.equal(typeof regex, 'function');
  assert.end();
});

test('regex should return true if the left matches the regex provided in the right', (assert) => {
  const left = 'hello';
  const right = /^hello/;
  const actual = regex(left, right);
  const expected = true;

  assert.equal(actual, expected);
  assert.end();
});

test('regex should return true if the left matches the regex provided in the right', (assert) => {
  const left = '12hello45';
  const right = /[a-z]+/;
  const actual = regex(left, right);
  const expected = true;

  assert.equal(actual, expected);
  assert.end();
});

test('regex should return false if there is no match', (assert) => {
  const left = '12hello45';
  const right = /[A-Z]+/;
  const actual = regex(left, right);
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
