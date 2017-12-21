import test from 'tape';
import { findFirst, findAll, init, rule, or, and, not, parseComposed, evaluateRule } from './index';

// Mock up a set of rules to use. These rules will be
// provided by the consuming application in the wild

test('findFirst should be a function', (assert) => {
  assert.equal(typeof findFirst, 'function');
  assert.end();
});

test('findFirst should return the first array item with all true rules', (assert) => {
  const obj = {
    greeting: 'hello',
    place: 'world',
  };

  const greetingIsHello = { key: 'greeting', fn: 'equals', params: ['hello'] };
  const placeIsWorld = { key: 'place', fn: 'equals', params: ['world'] };
  const placeIsNotWorld = { key: 'place', fn: '!equals', params: ['world'] };

  const rules = [
    { result: 'This is somewhere else!', rules: [placeIsNotWorld] },
    { result: 'This is the world!', rules: [greetingIsHello, placeIsWorld] },
  ];

  const actual = findFirst()(obj, rules).result;
  const expected = 'This is the world!';
  assert.equal(actual, expected);
  assert.end();
});

test('findFirst should return the first array item with all true rules, even if there are other true rows after it.', (assert) => {
  const obj = {
    greeting: 'hello',
    place: 'world',
  };

  const greetingIsHello = { key: 'greeting', fn: 'equals', params: ['hello'] };
  const placeIsWorld = { key: 'place', fn: 'equals', params: ['world'] };
  const placeIsNotWorld = { key: 'place', fn: '!equals', params: ['world'] };

  const rules = [
    { result: 'This is somewhere else!', rules: [placeIsNotWorld] },
    { result: 'This is the world!', rules: [greetingIsHello, placeIsWorld] },
    { result: 'This is also the world, but I should not be returned', rules: [greetingIsHello, placeIsWorld] },
  ];

  const actual = findFirst()(obj, rules).result;
  const expected = 'This is the world!';
  assert.equal(actual, expected);
  assert.end();
});

test('findFirst should return undefined if no rows match', (assert) => {
  const obj = {
    greeting: 'hello',
    place: 'world',
  };

  const greetingIsHello = { key: 'greeting', fn: 'equals', params: ['hello'] };
  const placeIsNotWorld = { key: 'place', fn: '!equals', params: ['world'] };

  const rules = [
    { result: 'This is somewhere else!', rules: [placeIsNotWorld] },
    { result: 'This is the world!', rules: [greetingIsHello, placeIsNotWorld] },
  ];

  const actual = findFirst()(obj, rules);
  const expected = undefined;
  assert.equal(actual, expected);
  assert.end();
});

test('findFirst should throw if no rules are provided', (assert) => {
  const obj = {
    greeting: 'hello',
    place: 'world',
  };

  assert.throws(() => findFirst()(obj));
  assert.end();
});

test('findFirst should return undefined if the rule key does not exist in the object', (assert) => {
  const obj = {
    foo: 'bar',
  };

  const greetingIsHello = { key: 'greeting', fn: 'equals', params: ['hello'] };
  const placeIsNotWorld = { key: 'place', fn: '!equals', params: ['world'] };

  const rules = [
    { result: 'This is the world!', rules: [greetingIsHello, placeIsNotWorld] },
  ];

  const actual = findFirst()(obj, rules);
  const expected = undefined;
  assert.equal(actual, expected);
  assert.end();
});

test('findFirst a !equals rule will return true, even if that object property does not exist', (assert) => {
  const obj = {
    foo: 'bar',
  };

  const greetingIsHello = { key: 'greeting', fn: 'equals', params: ['hello'] };
  const placeIsNotWorld = { key: 'place', fn: '!equals', params: ['world'] };

  const rules = [
    { result: 'This is somewhere else!', rules: [placeIsNotWorld] },
    { result: 'This is the world!', rules: [greetingIsHello, placeIsNotWorld] },
  ];

  const actual = findFirst()(obj, rules).result;
  const expected = 'This is somewhere else!';
  assert.equal(actual, expected);
  assert.end();
});

test('findAll should be a function', (assert) => {
  assert.equal(typeof findAll, 'function');
  assert.end();
});

test('findAll should return an array of matching logic rows', (assert) => {
  const obj = {
    greeting: 'hello',
    place: 'world',
  };

  const greetingIsHello = { key: 'greeting', fn: 'equals', params: ['hello'] };
  // const greeting_is_goodbye = { key: 'greeting', fn: 'equals', params: ['goodbye'] };
  const placeIsWorld = { key: 'place', fn: 'equals', params: ['world'] };
  const placeIsNotWorld = { key: 'place', fn: '!equals', params: ['world'] };

  const rules = [
    { result: 'This is somewhere else!', rules: [placeIsNotWorld] },
    { result: 'This is the world!', rules: [greetingIsHello, placeIsWorld] },
    { result: 'This is also the world, but I should not be returned', rules: [greetingIsHello, placeIsWorld] },
  ];

  const actual = findAll()(obj, rules); /* ? */
  const expected = [
    rules[1],
    rules[2],
  ];
  assert.equal(typeof actual, 'object', 'findAll should return an object (array)');
  assert.equal(actual.length, 2, 'findAll should have returned two items');
  assert.deepEqual(actual, expected);
  assert.end();
});

test('findAll should return an empty array if no rules match', (assert) => {
  const obj = {
    greeting: 'hello',
    place: 'world',
  };

  const greetingIsHello = { key: 'greeting', fn: 'equals', params: ['hello'] };
  const placeIsNotWorld = { key: 'place', fn: '!equals', params: ['world'] };

  const rules = [
    { result: 'This is somewhere else!', rules: [placeIsNotWorld] },
    { result: 'This is the world!', rules: [greetingIsHello, placeIsNotWorld] },
    { result: 'This is also the world, but I should not be returned', rules: [greetingIsHello, placeIsNotWorld] },
  ];

  const actual = findAll()(obj, rules); /* ? */
  const expected = [];
  assert.deepEqual(actual, expected, 'findAll should have returned an empty array');
  assert.end();
});

test('init should be a function', (assert) => {
  assert.equal(typeof init, 'function');
  assert.end();
});

test('init should return an object with and, not, or, findFirst, findAll, and rule methods', (assert) => {
  const jaRule = init();
  assert.equal(typeof jaRule.and, 'function');
  assert.equal(typeof jaRule.not, 'function');
  assert.equal(typeof jaRule.or, 'function');
  assert.equal(typeof jaRule.findFirst, 'function');
  assert.equal(typeof jaRule.findAll, 'function');
  assert.equal(typeof jaRule.rule, 'function');
  assert.end();
});

test('init should accept an object of custom functions', (assert) => {
  const customFn = input => input === true;
  const jaRule = init({ customFn });
  let data = {
    customField: true,
  };

  let actual = jaRule.rule(data, { key: 'customField', fn: 'customFn' });
  let expected = true;

  assert.equal(actual, expected);

  data = {
    customField: false,
  };

  actual = jaRule.rule(data, { key: 'customField', fn: 'customFn' });
  expected = false;

  assert.equal(actual, expected);
  assert.end();
});

test('rule should be a function', (assert) => {
  assert.equal(typeof rule, 'function');
  assert.end();
});

test('rule should evaluate the rule provided with the data provided', (assert) => {
  const data = {
    greeting: 'hello',
    place: 'not this world',
  };

  const placeIsWorld = { key: 'place', fn: 'equals', params: ['world'] };
  const placeIsNotWorld = { key: 'place', fn: '!equals', params: ['world'] };

  let actual = rule()(data, placeIsNotWorld);
  let expected = true;
  assert.equal(actual, expected, 'should return true for true');

  actual = rule()(data, placeIsWorld);
  expected = false;
  assert.equal(actual, expected, 'should return false for false');
  assert.end();
});

test('findFirst should handle a string representation of an object path', (assert) => {
  const obj = {
    greetings: {
      first: 'hello',
      second: 'goodbye',
    },
  };

  const secondGreetingIsGoodbye = { key: 'greetings.second', fn: 'equals', params: ['goodbye'] };

  const rules = [
    { result: 'See you later!', rules: [secondGreetingIsGoodbye] },
  ];

  const actual = findFirst()(obj, rules).result;
  const expected = 'See you later!';
  assert.equal(actual, expected);
  assert.end();
});

test('findAll should handle a string representation of an object path', (assert) => {
  const obj = {
    greetings: {
      first: 'hello',
      second: 'goodbye',
    },
  };

  const secondGreetingIsGoodbye = { key: 'greetings.second', fn: 'equals', params: ['goodbye'] };

  const rules = [
    { result: 'See you later!', rules: [secondGreetingIsGoodbye] },
  ];

  const actual = findAll()(obj, rules);
  const expected = [{ result: 'See you later!', rules: [secondGreetingIsGoodbye] }];
  assert.deepEqual(actual, expected);
  assert.end();
});

test('ja.or should be a function', (assert) => {
  assert.equal(typeof or, 'function');
  assert.end();
});

test('ja.or should return a properly formatted or object', (assert) => {
  const secondGreetingIsSayonara = { key: 'greetings.second', fn: 'equals', params: ['sayonara'] };
  const secondGreetingIsGoodbye = { key: 'greetings.second', fn: 'equals', params: ['goodbye'] };

  const actual = or([secondGreetingIsSayonara, secondGreetingIsGoodbye]);
  const expected = {
    compose: 'or',
    rules: [
      secondGreetingIsSayonara,
      secondGreetingIsGoodbye,
    ],
  };

  assert.deepEqual(actual, expected);
  assert.end();
});

test('ja.or should through an error if it is not called with an array', (assert) => {
  assert.throws(() => or({ something: 'else', not: 'array' }));
  assert.throws(() => or('string', 'another string'));
  assert.end();
});

test('ja.and should be a function', (assert) => {
  assert.equal(typeof and, 'function');
  assert.end();
});

test('ja.and should return a properly formatted and object', (assert) => {
  const firstGreetingIsHello = { key: 'greetings.first', fn: 'equals', params: ['hello'] };
  const secondGreetingIsGoodbye = { key: 'greetings.second', fn: 'equals', params: ['goodbye'] };

  const actual = and([firstGreetingIsHello, secondGreetingIsGoodbye]);
  const expected = {
    compose: 'and',
    rules: [
      firstGreetingIsHello,
      secondGreetingIsGoodbye,
    ],
  };
  assert.deepEqual(actual, expected);
  assert.end();
});

test('ja.and should throw an error if not called with an array', (assert) => {
  assert.throws(() => and({ something: 'else', not: 'array' }));
  assert.throws(() => and('string', 'another string'));
  assert.end();
});

test('parseComposed should be a function', (assert) => {
  assert.equal(typeof parseComposed, 'function');
  assert.end();
});

test('parseComposed should evaluate the rules in the rules array, and return bool given the comp type "or"', (assert) => {
  const row = {
    compose: 'or',
    rules: [
      { key: 'greetings.second', fn: 'equals', params: ['sayonara'] },
      { key: 'greetings.second', fn: 'equals', params: ['goodbye'] },
    ],
  };

  let data = {
    greetings: {
      first: 'hello',
      second: 'goodbye',
    },
  };

  let actual = parseComposed(data, row);
  let expected = true;
  assert.equal(actual, expected, 'should return true because second rule is true');

  data = {
    greetings: {
      first: 'hello',
      second: 'sayonara',
    },
  };

  actual = parseComposed(data, row);
  expected = true;
  assert.equal(actual, expected, 'should return true because first rule is true');

  data = {
    greetings: {
      first: 'hello',
      second: 'caio',
    },
  };

  actual = parseComposed(data, row);
  expected = false;
  assert.equal(actual, expected, 'should return false because neither rule is true');
  assert.end();
});

test('parseComposed should evaluate the rules in the rules array and return bool given the comp type "and"', (assert) => {
  const row = {
    compose: 'and',
    rules: [
      { key: 'greetings.first', fn: 'equals', params: ['hello'] },
      { key: 'greetings.second', fn: 'equals', params: ['goodbye'] },
    ],
  };

  let data = {
    greetings: {
      first: 'hello',
      second: 'goodbye',
    },
  };

  let actual = parseComposed(data, row, 'should return true because every rule is true');
  let expected = true;
  assert.equal(actual, expected);

  data = {
    greetings: {
      first: 'hello',
      second: 'caio',
    },
  };

  actual = parseComposed(data, row, 'should return false because not every rule is true');
  expected = false;
  assert.equal(actual, expected);
  assert.end();
});

test('parseComposed should return false if the action is not supported', (assert) => {
  const row = {
    compose: 'not a real thing',
    rules: [
      { key: 'greetings.first', fn: 'equals', params: ['hello'] },
      { key: 'greetings.second', fn: 'equals', params: ['goodbye'] },
    ],
  };

  const data = {
    greetings: {
      first: 'hello',
      second: 'goodbye',
    },
  };

  const actual = parseComposed(data, row, 'should return false because the compose type is not supported');
  const expected = false;
  assert.equal(actual, expected);

  assert.end();
});

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
      singleRule: { key: 'name', fn: 'equals', params: ['John'] },
      expected: true,
      msg: 'Should return true because obj.name is John',
    },
    {
      obj: {
        name: 'Mary',
      },
      singleRule: { key: 'name', fn: 'equals', params: ['John'] },
      expected: false,
      msg: 'Should return false because obj.name is not John',
    },
    {
      obj: {
        name: 'Mary',
      },
      singleRule: { key: 'name', fn: '!equals', params: ['John'] },
      expected: true,
      msg: 'Should return true because obj.name !equal to John',
    },
  ];
  set.forEach((row) => {
    const {
      obj, singleRule, expected, msg,
    } = row;
    const actual = evaluateRule(obj, singleRule); /* ? */
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

  const secondGreetingIsSayonara = { key: 'greetings.second', fn: 'equals', params: ['sayonara'] };
  const secondGreetingIsGoodbye = { key: 'greetings.second', fn: 'equals', params: ['goodbye'] };

  const goodByeOrSayonara = or([
    secondGreetingIsGoodbye,
    secondGreetingIsSayonara,
  ]);

  const actual = evaluateRule(obj, goodByeOrSayonara);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('findFirst should accept composed rule objects', (assert) => {
  const obj = {
    greetings: {
      first: 'hello',
      second: 'goodbye',
    },
  };

  const secondGreetingIsSayonara = { key: 'greetings.second', fn: 'equals', params: ['sayonara'] };
  const secondGreetingIsGoodbye = { key: 'greetings.second', fn: 'equals', params: ['goodbye'] };

  const goodByeOrSayonara = or([
    secondGreetingIsGoodbye,
    secondGreetingIsSayonara,
  ]);

  const rules = [
    { result: 'I get it, two languages', rules: [goodByeOrSayonara] },
  ];

  const actual = findFirst()(obj, rules).result;
  const expected = 'I get it, two languages';
  assert.equal(actual, expected);
  assert.end();
});

test('findFirst should accept deeply composed rule objects', (assert) => {
  const obj = {
    greetings: {
      first: 'hello',
      second: 'goodbye',
    },
  };

  const firstGreetingIsHello = { key: 'greetings.first', fn: 'equals', params: ['hello'] };
  const secondGreetingIsSayonara = { key: 'greetings.second', fn: 'equals', params: ['sayonara'] };
  const secondGreetingIsGoodbye = { key: 'greetings.second', fn: 'equals', params: ['goodbye'] };

  const goodByeOrSayonara = or([
    secondGreetingIsGoodbye,
    secondGreetingIsSayonara,
  ]);

  const helloAndGoodByeOrSayonara = and([firstGreetingIsHello, goodByeOrSayonara]);

  const rules = [
    { result: 'Deeply nested... nice', rules: [helloAndGoodByeOrSayonara] },
  ];

  const actual = findFirst()(obj, rules).result;
  const expected = 'Deeply nested... nice';
  assert.equal(actual, expected);
  assert.end();
});

test('findFirst should return false if deeply composed rule objects eval to false', (assert) => {
  const obj = {
    greetings: {
      first: 'hola',
      second: 'goodbye',
    },
  };

  const firstGreetingIsHello = { key: 'greetings.first', fn: 'equals', params: ['hello'] };
  const secondGreetingIsSayonara = { key: 'greetings.second', fn: 'equals', params: ['sayonara'] };
  const secondGreetingIsGoodbye = { key: 'greetings.second', fn: 'equals', params: ['goodbye'] };

  const goodByeOrSayonara = or([
    secondGreetingIsGoodbye,
    secondGreetingIsSayonara,
  ]);

  const helloAndGoodByeOrSayonara = and([firstGreetingIsHello, goodByeOrSayonara]);

  const rules = [
    { result: 'Deeply nested... nice', rules: [helloAndGoodByeOrSayonara] },
  ];

  const actual = findFirst()(obj, rules);
  const expected = undefined;
  assert.equal(actual, expected);
  assert.end();
});

test('findAll should accept deeply composed rule objects', (assert) => {
  const obj = {
    greetings: {
      first: 'hello',
      second: 'sayonara',
    },
  };

  const firstGreetingIsHello = { key: 'greetings.first', fn: 'equals', params: ['hello'] };
  const secondGreetingIsSayonara = { key: 'greetings.second', fn: 'equals', params: ['sayonara'] };
  const secondGreetingIsGoodbye = { key: 'greetings.second', fn: 'equals', params: ['goodbye'] };

  const goodByeOrSayonara = or([
    secondGreetingIsGoodbye,
    secondGreetingIsSayonara,
  ]);

  const helloAndGoodByeOrSayonara = and([firstGreetingIsHello, goodByeOrSayonara]);

  const rules = [
    { result: 'Deeply nested... nice', rules: [helloAndGoodByeOrSayonara] },
  ];

  const actual = findAll()(obj, rules);
  const expected = [
    { result: 'Deeply nested... nice', rules: [helloAndGoodByeOrSayonara] },
  ];
  assert.deepEqual(actual, expected);
  assert.end();
});

test('not should be a function', (assert) => {
  assert.equal(typeof not, 'function');
  assert.end();
});

test('not should return a "composed" object with a compose value of not', (assert) => {
  const singleRule = { key: 'person', fn: 'equals', params: [true] };
  const actual = not(singleRule);
  const expected = {
    compose: 'not',
    rule: singleRule,
  };
  assert.deepEqual(actual, expected);
  assert.end();
});

test('parseComposed should handle a composed object of type not', (assert) => {
  const obj = {
    person: false,
  };
  const singleRule = { key: 'person', fn: 'equals', params: [true] };
  const notPerson = not(singleRule);
  const actual = parseComposed(obj, notPerson);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('parseComposed should handle a false composed object of type not', (assert) => {
  const obj = {
    person: true,
  };
  const singleRule = { key: 'person', fn: 'equals', params: [true] };
  const notPerson = not(singleRule);
  const actual = parseComposed(obj, notPerson);
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

  const firstGreetingIsHello = { key: 'greetings.first', fn: 'equals', params: ['hello'] };
  const secondGreetingIsSayonara = { key: 'greetings.second', fn: 'equals', params: ['sayonara'] };
  const secondGreetingIsGoodbye = { key: 'greetings.second', fn: 'equals', params: ['goodbye'] };

  const goodByeOrSayonara = or([
    secondGreetingIsGoodbye,
    secondGreetingIsSayonara,
  ]);

  const notHelloAndGoodByeOrSayonara = not(and([firstGreetingIsHello, goodByeOrSayonara]));

  const actual = parseComposed(obj, notHelloAndGoodByeOrSayonara);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});

test('evaluateRule should return true for a regex rule', (assert) => {
  const pirate = { key: 'saying', fn: 'regex', params: /yar/ };
  const data = {
    name: 'blackbeard',
    saying: 'I say yarrrrr!!!',
  };
  const actual = evaluateRule(data, pirate);
  const expected = true;
  assert.equal(actual, expected);
  assert.end();
});
