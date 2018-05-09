import test from 'tape';
import evaluateRule from './evaluate-rule';
import { or, not, and } from '../index';

test('evaluateRule should be a function', (assert) => {
  assert.equal(typeof evaluateRule, 'function');
  assert.end();
});

test('evaluateRule should correctly evaluate a single rule', (assert) => {
  const set = [
    {
      obj: {
        name: 'John',
      },
      singleRule: { left: '@name', fn: 'equals', right: 'John' },
      expected: true,
      msg: 'Should return true because obj.name is John',
    },
    {
      obj: {
        name: 'Mary',
      },
      singleRule: { left: '@name', fn: 'equals', right: 'John' },
      expected: false,
      msg: 'Should return false because obj.name is not John',
    },
    {
      obj: {
        name: 'Mary',
      },
      singleRule: { left: '@name', fn: '!equals', right: 'John' },
      expected: true,
      msg: 'Should return true because obj.name !equal to John',
    },
  ];
  set.forEach((row) => {
    const {
      obj, singleRule, expected, msg,
    } = row;
    const actual = evaluateRule(singleRule, obj); /* ? */
    assert.equal(actual, expected, msg);
  });
  assert.end();
});

test('evaluateRule should correctly evaluate a composed rule', (assert) => {
  const obj = {
    greetings: {
      first: 'hello',
      second: 'goodbye',
    },
  };

  const secondGreetingIsSayonara = { left: '@greetings.second', fn: 'equals', right: 'sayonara' };
  const secondGreetingIsGoodbye = { left: '@greetings.second', fn: 'equals', right: 'goodbye' };

  const goodByeOrSayonara = or(
    secondGreetingIsGoodbye,
    secondGreetingIsSayonara,
  );

  const actual = evaluateRule(goodByeOrSayonara, obj);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('evaluateRule should throw when using a composed XOR object made without helper with more than 2 rules', (assert) => {
  const secondGreetingIsSayonara = { left: '@greetings.second', fn: 'equals', right: 'sayonara' };
  const secondGreetingIsGoodbye = { left: '@greetings.second', fn: 'equals', right: 'goodbye' };
  const secondGreetingIsHello = { left: '@greetings.second', fn: 'equals', right: 'hello' };

  const obj = {
    greetings: {
      first: 'hello',
      second: 'goodbye',
    },
  };

  const oneGreeting = {
    compose: 'xor',
    rules: [
      secondGreetingIsSayonara,
      secondGreetingIsGoodbye,
      secondGreetingIsHello,
    ],
  };

  assert.throws(() => evaluateRule(oneGreeting, obj));
  assert.end();
});

test('evaluateRule should return true for a regex rule', (assert) => {
  const pirate = { left: '@saying', fn: 'regex', right: /yar/ };
  const data = {
    name: 'blackbeard',
    saying: 'I say yarrrrr!!!',
  };
  const actual = evaluateRule(pirate, data);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('evaluateRule should correctly evaluate a NOT rule', (assert) => {
  const pirate = { left: '@saying', fn: 'regex', right: /yar/ };
  const notPirate = not(pirate);
  const data = {
    name: 'acountant',
    saying: 'I say taxes',
  };
  assert.true(evaluateRule(notPirate, data), 'should not be a pirate');
  assert.false(evaluateRule(pirate, data), 'should be a pirate');
  assert.end();
});


test('evaluateRule should handle deeply nested rules', (assert) => {
  const foo = { left: '@foo', fn: 'equals', right: 'foo' };
  const bar = { left: '@bar', fn: 'equals', right: 'bar' };
  const baz = { left: '@baz', fn: 'equals', right: 'baz' };
  const fooOrBar = or(foo, bar);
  const fooOrBarOrBaz = or(fooOrBar, baz);
  const fooAndBaz = and(foo, baz);

  const data = {
    foo: 'foo',
    bar: 'asdf',
    baz: 'asdf',
  };

  let actual = evaluateRule(fooOrBarOrBaz, data);
  let expected = true;
  assert.equal(actual, expected);

  actual = evaluateRule(or(fooAndBaz, bar));
  expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('evaluateRule should work with a composed not rule', (assert) => {
  const foo = { left: '@foo', fn: 'equals', right: 'foo' };
  const bar = { left: '@bar', fn: 'equals', right: 'bar' };
  const fooOrBar = or(foo, bar);
  const notFooOrBar = not(fooOrBar);
  const data = {
    foo: 'not foo',
    bar: 'not bar',
  };
  const actual = evaluateRule(notFooOrBar, data);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});
