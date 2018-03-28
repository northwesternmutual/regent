import test from 'tape';
import parseComposed from './parse-composed';
import { not, and, or } from '../index';

test('parseComposed should be a function', (assert) => {
  assert.equal(typeof parseComposed, 'function');
  assert.end();
});

test('parseComposed should evaluate the rules in the rules array, and return bool given the comp type "or"', (assert) => {
  const row = {
    compose: 'or',
    rules: [
      { left: '@greetings.second', fn: 'equals', right: 'sayonara' },
      { left: '@greetings.second', fn: 'equals', right: 'goodbye' },
    ],
  };

  let data = {
    greetings: {
      first: 'hello',
      second: 'goodbye',
    },
  };

  let actual = parseComposed(row, data);
  let expected = true;
  assert.equal(actual, expected, 'should return true because second rule is true');

  data = {
    greetings: {
      first: 'hello',
      second: 'sayonara',
    },
  };

  actual = parseComposed(row, data);
  expected = true;
  assert.equal(actual, expected, 'should return true because first rule is true');

  data = {
    greetings: {
      first: 'hello',
      second: 'caio',
    },
  };

  actual = parseComposed(row, data);
  expected = false;
  assert.equal(actual, expected, 'should return false because neither rule is true');
  assert.end();
});

test('parseComposed should evaluate the rules in the rules array and return bool given the comp type "and"', (assert) => {
  const row = {
    compose: 'and',
    rules: [
      { left: '@greetings.first', fn: 'equals', right: 'hello' },
      { left: '@greetings.second', fn: 'equals', right: 'goodbye' },
    ],
  };

  let data = {
    greetings: {
      first: 'hello',
      second: 'goodbye',
    },
  };

  let actual = parseComposed(row, data, 'should return true because every rule is true');
  let expected = true;
  assert.equal(actual, expected);

  data = {
    greetings: {
      first: 'hello',
      second: 'caio',
    },
  };

  actual = parseComposed(row, data, 'should return false because not every rule is true');
  expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('parseComposed should return false if the action is not supported', (assert) => {
  const row = {
    compose: 'not a real thing',
    rules: [
      { left: '@greetings.first', fn: 'equals', right: 'hello' },
      { left: '@greetings.second', fn: 'equals', right: 'goodbye' },
    ],
  };

  const data = {
    greetings: {
      first: 'hello',
      second: 'goodbye',
    },
  };

  const actual = parseComposed(row, data, 'should return false because the compose type is not supported');
  const expected = false;
  assert.equal(actual, expected);

  assert.end();
});

test('parseComposed should handle a composed object of type not', (assert) => {
  const obj = {
    person: false,
  };
  const singleRule = { left: '@person', fn: 'equals', right: true };
  const notPerson = not(singleRule);
  const actual = parseComposed(notPerson, obj);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('parseComposed should handle a false composed object of type not', (assert) => {
  const obj = {
    person: true,
  };
  const singleRule = { left: '@person', fn: 'equals', right: true };
  const notPerson = not(singleRule);
  const actual = parseComposed(notPerson, obj);
  const expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('parseComposed should handle a not composed object, with a rule that is a composed object', (assert) => {
  const obj = {
    greetings: {
      first: 'hola',
      second: 'caio',
    },
  };

  const firstGreetingIsHello = { left: '@greetings.first', fn: 'equals', right: 'hello' };
  const secondGreetingIsSayonara = { left: '@greetings.second', fn: 'equals', right: 'sayonara' };
  const secondGreetingIsGoodbye = { left: '@greetings.second', fn: 'equals', right: 'goodbye' };

  const goodByeOrSayonara = or([
    secondGreetingIsGoodbye,
    secondGreetingIsSayonara,
  ]);

  const notHelloAndGoodByeOrSayonara = not(and([firstGreetingIsHello, goodByeOrSayonara]));

  const actual = parseComposed(notHelloAndGoodByeOrSayonara, obj);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('parseComposed should handle new not rule syntax', (assert) => {
  const obj = {
    greetings: {
      first: 'hola',
    },
  };

  const firstGreetingIsHello = { left: '@greetings.first', fn: 'equals', right: 'hello' };
  const firstGreetingIsNotHello = {
    not: firstGreetingIsHello,
  };
  const actual = parseComposed(firstGreetingIsNotHello, obj);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('parseComposed should correctly handle new NOT syntax using the helper', (assert) => {
  const data = {
    precipitation: ['rain'],
    temperature: 78,
  };

  const IS_COLD = { left: '@temperature', fn: 'lessThan', right: 75 };
  const IS_WARM = not(IS_COLD);

  assert.true(parseComposed(IS_WARM, data));
  assert.end();
});
