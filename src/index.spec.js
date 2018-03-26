import test from 'tape';
import { find, filter, init, crown, evaluate, or, and, not, explain, constants, makeRegentFactory } from './index';

// Mock up a set of rules to use. These rules will be
// provided by the consuming application in the wild

test('find should be a function', (assert) => {
  assert.equal(typeof find, 'function');
  assert.end();
});

test('find should return the first array item with all true rules', (assert) => {
  const obj = {
    greeting: 'hello',
    place: 'world',
  };

  const greetingIsHello = { left: '@greeting', fn: 'equals', right: 'hello' };
  const placeIsWorld = { left: '@place', fn: 'equals', right: 'world' };
  const placeIsNotWorld = { left: '@place', fn: '!equals', right: 'world' };

  const rules = [
    { result: 'This is somewhere else!', rules: [placeIsNotWorld] },
    { result: 'This is the world!', rules: [greetingIsHello, placeIsWorld] },
  ];

  const actual = find(rules, obj).result;
  const expected = 'This is the world!';
  assert.equal(actual, expected);
  assert.end();
});

test('find should return the first array item with all true rules, even if there are other true rows after it.', (assert) => {
  const obj = {
    greeting: 'hello',
    place: 'world',
  };

  const greetingIsHello = { left: '@greeting', fn: 'equals', right: 'hello' };
  const placeIsWorld = { left: '@place', fn: 'equals', right: 'world' };
  const placeIsNotWorld = { left: '@place', fn: '!equals', right: 'world' };

  const rules = [
    { result: 'This is somewhere else!', rules: [placeIsNotWorld] },
    { result: 'This is the world!', rules: [greetingIsHello, placeIsWorld] },
    { result: 'This is also the world, but I should not be returned', rules: [greetingIsHello, placeIsWorld] },
  ];

  const actual = find(rules, obj).result;
  const expected = 'This is the world!';
  assert.equal(actual, expected);
  assert.end();
});

test('find should return undefined if no rows match', (assert) => {
  const obj = {
    greeting: 'hello',
    place: 'world',
  };

  const greetingIsHello = { left: '@greeting', fn: 'equals', right: 'hello' };
  const placeIsNotWorld = { left: '@place', fn: '!equals', right: 'world' };

  const rules = [
    { result: 'This is somewhere else!', rules: [placeIsNotWorld] },
    { result: 'This is the world!', rules: [greetingIsHello, placeIsNotWorld] },
  ];

  const actual = find(rules, obj);
  const expected = undefined;
  assert.equal(actual, expected);
  assert.end();
});

test('find should throw if no rules are provided', (assert) => {
  const obj = {
    greeting: 'hello',
    place: 'world',
  };

  assert.throws(() => find(obj));
  assert.end();
});

test('find should return undefined if the rule left does not exist in the object', (assert) => {
  const obj = {
    foo: 'bar',
  };

  const greetingIsHello = { left: '@greeting', fn: 'equals', right: 'hello' };
  const placeIsNotWorld = { left: '@place', fn: '!equals', right: 'world' };

  const rules = [
    { result: 'This is the world!', rules: [greetingIsHello, placeIsNotWorld] },
  ];

  const actual = find(rules, obj);
  const expected = undefined;
  assert.equal(actual, expected);
  assert.end();
});

test('find a !equals rule will return true, even if that object property does not exist', (assert) => {
  const obj = {
    foo: 'bar',
  };

  const greetingIsHello = { left: '@greeting', fn: 'equals', right: 'hello' };
  const placeIsNotWorld = { left: '@place', fn: '!equals', right: 'world' };

  const rules = [
    { result: 'This is somewhere else!', rules: [placeIsNotWorld] },
    { result: 'This is the world!', rules: [greetingIsHello, placeIsNotWorld] },
  ];

  const actual = find(rules, obj).result;
  const expected = 'This is somewhere else!';
  assert.equal(actual, expected);
  assert.end();
});

test('find should accept a custom predicate', (assert) => {
  const custom = {
    isAThree: a => a === 3,
  };
  const data = {
    myParam: 3,
  };

  const MY_RULE = { left: '@myParam', fn: 'isAThree' };
  const logic = [
    { value: 'success', rules: [MY_RULE] },
  ];
  const actual = find(logic, data, custom);
  assert.equal(actual.value, 'success');
  assert.end();
});

test('filter should be a function', (assert) => {
  assert.equal(typeof filter, 'function');
  assert.end();
});

test('filter should return an array of matching logic rows', (assert) => {
  const obj = {
    greeting: 'hello',
    place: 'world',
  };

  const greetingIsHello = { left: '@greeting', fn: 'equals', right: 'hello' };
  // const greeting_is_goodbye = { left: '@greeting', fn: 'equals', right: 'goodbye' };
  const placeIsWorld = { left: '@place', fn: 'equals', right: 'world' };
  const placeIsNotWorld = { left: '@place', fn: '!equals', right: 'world' };

  const rules = [
    { result: 'This is somewhere else!', rules: [placeIsNotWorld] },
    { result: 'This is the world!', rules: [greetingIsHello, placeIsWorld] },
    { result: 'This is also the world, but I should not be returned', rules: [greetingIsHello, placeIsWorld] },
  ];

  const actual = filter(rules, obj); /* ? */
  const expected = [
    rules[1],
    rules[2],
  ];
  assert.equal(typeof actual, 'object', 'filter should return an object (array)');
  assert.equal(actual.length, 2, 'filter should have returned two items');
  assert.deepEqual(actual, expected);
  assert.end();
});

test('filter should return an empty array if no rules match', (assert) => {
  const obj = {
    greeting: 'hello',
    place: 'world',
  };

  const greetingIsHello = { left: '@greeting', fn: 'equals', right: 'hello' };
  const placeIsNotWorld = { left: '@place', fn: '!equals', right: 'world' };

  const rules = [
    { result: 'This is somewhere else!', rules: [placeIsNotWorld] },
    { result: 'This is the world!', rules: [greetingIsHello, placeIsNotWorld] },
    { result: 'This is also the world, but I should not be returned', rules: [greetingIsHello, placeIsNotWorld] },
  ];

  const actual = filter(rules, obj); /* ? */
  const expected = [];
  assert.deepEqual(actual, expected, 'filter should have returned an empty array');
  assert.end();
});

test('filter should accept a custom predicate', (assert) => {
  const custom = {
    isAThree: a => a === 3,
  };
  const data = {
    myParam: 3,
  };

  const MY_RULE = { left: '@myParam', fn: 'isAThree' };
  const logic = [
    { value: 'success', rules: [MY_RULE] },
  ];
  const actual = filter(logic, data, custom);
  assert.equal(actual[0].value, 'success');
  assert.end();
});

test('init should be a function', (assert) => {
  assert.equal(typeof init, 'function');
  assert.end();
});

test('crown should be a function', (assert) => {
  assert.equal(typeof crown, 'function');
  assert.end();
});

test('constants should be an object', (assert) => {
  assert.equal(typeof constants, 'object');
  assert.end();
});

test('init should return an object with and, not, or, find, filter, evaluate, and rule methods', (assert) => {
  const regent = init();
  assert.equal(typeof regent.and, 'function');
  assert.equal(typeof regent.not, 'function');
  assert.equal(typeof regent.or, 'function');
  assert.equal(typeof regent.find, 'function');
  assert.equal(typeof regent.filter, 'function');
  assert.equal(typeof regent.explain, 'function');
  assert.equal(typeof regent.evaluate, 'function');
  assert.end();
});

test('init should accept an object of custom functions', (assert) => {
  const customFn = input => input === true;
  const regent = init({ customFn });
  let data = {
    customField: true,
  };

  let actual = regent.evaluate({ left: '@customField', fn: 'customFn' }, data);
  let expected = true;

  assert.equal(actual, expected);

  data = {
    customField: false,
  };

  actual = regent.evaluate({ left: '@customField', fn: 'customFn' }, data);
  expected = false;

  assert.equal(actual, expected);
  assert.end();
});

test('evaluate should be a function', (assert) => {
  assert.equal(typeof evaluate, 'function');
  assert.end();
});

test('rule should evaluate the rule provided with the data provided', (assert) => {
  const data = {
    greeting: 'hello',
    place: 'not this world',
  };

  const placeIsWorld = { left: '@place', fn: 'equals', right: 'world' };
  const placeIsNotWorld = { left: '@place', fn: '!equals', right: 'world' };

  let actual = evaluate(placeIsNotWorld, data);
  let expected = true;
  assert.equal(actual, expected, 'should return true for true');

  actual = evaluate(placeIsWorld, data);
  expected = false;
  assert.equal(actual, expected, 'should return false for false');
  assert.end();
});

test('find should handle a string representation of an object path', (assert) => {
  const obj = {
    greetings: {
      first: 'hello',
      second: 'goodbye',
    },
  };

  const secondGreetingIsGoodbye = { left: '@greetings.second', fn: 'equals', right: 'goodbye' };

  const rules = [
    { result: 'See you later!', rules: [secondGreetingIsGoodbye] },
  ];

  const actual = find(rules, obj).result;
  const expected = 'See you later!';
  assert.equal(actual, expected);
  assert.end();
});

test('filter should handle a string representation of an object path', (assert) => {
  const obj = {
    greetings: {
      first: 'hello',
      second: 'goodbye',
    },
  };

  const secondGreetingIsGoodbye = { left: '@greetings.second', fn: 'equals', right: 'goodbye' };

  const rules = [
    { result: 'See you later!', rules: [secondGreetingIsGoodbye] },
  ];

  const actual = filter(rules, obj);
  const expected = [{ result: 'See you later!', rules: [secondGreetingIsGoodbye] }];
  assert.deepEqual(actual, expected);
  assert.end();
});

test('ja.or should be a function', (assert) => {
  assert.equal(typeof or, 'function');
  assert.end();
});

test('ja.or should return a properly formatted or object', (assert) => {
  const secondGreetingIsSayonara = { left: '@greetings.second', fn: 'equals', right: 'sayonara' };
  const secondGreetingIsGoodbye = { left: '@greetings.second', fn: 'equals', right: 'goodbye' };

  const actual = or(secondGreetingIsSayonara, secondGreetingIsGoodbye);
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

test('ja.and should be a function', (assert) => {
  assert.equal(typeof and, 'function');
  assert.end();
});

test('ja.and should return a properly formatted and object', (assert) => {
  const firstGreetingIsHello = { left: '@greetings.first', fn: 'equals', right: 'hello' };
  const secondGreetingIsGoodbye = { left: '@greetings.second', fn: 'equals', right: 'goodbye' };

  const actual = and(firstGreetingIsHello, secondGreetingIsGoodbye);
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

test('find should accept composed rule objects', (assert) => {
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

  const rules = [
    { result: 'I get it, two languages', rules: [goodByeOrSayonara] },
  ];

  const actual = find(rules, obj).result;
  const expected = 'I get it, two languages';
  assert.equal(actual, expected);
  assert.end();
});

test('find should accept deeply composed rule objects', (assert) => {
  const obj = {
    greetings: {
      first: 'hello',
      second: 'goodbye',
    },
  };

  const firstGreetingIsHello = { left: '@greetings.first', fn: 'equals', right: 'hello' };
  const secondGreetingIsSayonara = { left: '@greetings.second', fn: 'equals', right: 'sayonara' };
  const secondGreetingIsGoodbye = { left: '@greetings.second', fn: 'equals', right: 'goodbye' };

  const goodByeOrSayonara = or(
    secondGreetingIsGoodbye,
    secondGreetingIsSayonara,
  );

  const helloAndGoodByeOrSayonara = and(firstGreetingIsHello, goodByeOrSayonara);

  const rules = [
    { result: 'Deeply nested... nice', rules: [helloAndGoodByeOrSayonara] },
  ];

  const actual = find(rules, obj).result;
  const expected = 'Deeply nested... nice';
  assert.equal(actual, expected);
  assert.end();
});

test('find should return false if deeply composed rule objects eval to false', (assert) => {
  const obj = {
    greetings: {
      first: 'hola',
      second: 'goodbye',
    },
  };

  const firstGreetingIsHello = { left: '@greetings.first', fn: 'equals', right: 'hello' };
  const secondGreetingIsSayonara = { left: '@greetings.second', fn: 'equals', right: 'sayonara' };
  const secondGreetingIsGoodbye = { left: '@greetings.second', fn: 'equals', right: 'goodbye' };

  const goodByeOrSayonara = or(
    secondGreetingIsGoodbye,
    secondGreetingIsSayonara,
  );

  const helloAndGoodByeOrSayonara = and(firstGreetingIsHello, goodByeOrSayonara);

  const rules = [
    { result: 'Deeply nested... nice', rules: [helloAndGoodByeOrSayonara] },
  ];

  const actual = find(rules, obj);
  const expected = undefined;
  assert.equal(actual, expected);
  assert.end();
});

test('filter should accept deeply composed rule objects', (assert) => {
  const obj = {
    greetings: {
      first: 'hello',
      second: 'sayonara',
    },
  };

  const firstGreetingIsHello = { left: '@greetings.first', fn: 'equals', right: 'hello' };
  const secondGreetingIsSayonara = { left: '@greetings.second', fn: 'equals', right: 'sayonara' };
  const secondGreetingIsGoodbye = { left: '@greetings.second', fn: 'equals', right: 'goodbye' };

  const goodByeOrSayonara = or(
    secondGreetingIsGoodbye,
    secondGreetingIsSayonara,
  );

  const helloAndGoodByeOrSayonara = and(firstGreetingIsHello, goodByeOrSayonara);

  const rules = [
    { result: 'Deeply nested... nice', rules: [helloAndGoodByeOrSayonara] },
  ];

  const actual = filter(rules, obj);
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
  const singleRule = { left: '@person', fn: 'equals', right: true };
  const actual = not(singleRule);
  const expected = {
    not: singleRule,
  };
  assert.deepEqual(actual, expected);
  assert.end();
});

test('explain should be a function', (assert) => {
  const actual = typeof explain;
  const expected = 'function';
  assert.equal(actual, expected);
  assert.end();
});

test('explain should throw if called without an argument', (assert) => {
  assert.throws(() => explain(), /regent.explain must be called with a regent rule/, 'Fail!');
  assert.end();
});

test('explain should throw if called without a well-formed rule', (assert) => {
  const data = {};
  assert.throws(() => explain(data), /regent.explain must be called with a regent rule/, 'Fail!');
  assert.end();
});

test('explain should stringify a single rule', (assert) => {
  const human = { left: '@species', fn: 'equals', right: 'human' };
  const actual = explain(human);
  const expected = '(@species equals "human")';
  assert.equal(actual, expected);
  assert.end();
});

test('explain should stringify a single rule with multiple right', (assert) => {
  const human = { left: '@species', fn: 'isIn', right: ['human', 'dog'] };
  const actual = explain(human);
  const expected = '(@species isIn ["human","dog"])';
  assert.equal(actual, expected);
  assert.end();
});

test('explain should stringify a composed OR rule', (assert) => {
  const human = { left: '@species', fn: 'equals', right: 'human' };
  const dog = { left: '@species', fn: 'equals', right: 'dog' };
  const mammal = or(human, dog);
  const actual = explain(mammal);
  const expected = '((@species equals "human") or (@species equals "dog"))';
  assert.equal(actual, expected);
  assert.end();
});

test('explain should stringify a composed AND rule', (assert) => {
  const human = { left: '@species', fn: 'equals', right: 'human' };
  const topHat = { left: '@hat', fn: 'equals', right: 'top' };
  const fancy = and(human, topHat);
  const actual = explain(fancy);
  const expected = '((@species equals "human") and (@hat equals "top"))';
  assert.equal(actual, expected);
  assert.end();
});

test('explain should stringify a rule of composed rules', (assert) => {
  const human = { left: '@species', fn: 'equals', right: 'human' };
  const topHat = { left: '@hat', fn: 'equals', right: 'top' };
  const redNose = { left: '@nose', fn: 'equals', right: 'red' };
  const fancy = and(human, topHat);
  const clown = and(human, redNose);
  const fancyOrClown = or(fancy, clown);
  const actual = explain(fancyOrClown);
  const expected = '(((@species equals "human") and (@hat equals "top")) or ((@species equals "human") and (@nose equals "red")))';
  assert.equal(actual, expected);
  assert.end();
});

test('explain should stringify a rule with multiple lefts', (assert) => {
  const fooBar = { left: ['foo', 'bar'], fn: 'customFunc', right: 'baz' };
  const actual = explain(fooBar);
  const expected = '(["foo","bar"] customFunc "baz")';
  assert.equal(actual, expected);
  assert.end();
});

test('explain should include the lookup and the data it resolves to if you provide data.', (assert) => {
  const data = {
    species: 'human',
    hat: 'top',
    nose: 'red',
  };
  const human = { left: '@species', fn: 'equals', right: 'human' };
  const topHat = { left: '@hat', fn: 'equals', right: 'top' };
  const redNose = { left: '@nose', fn: 'equals', right: 'red' };
  const fancy = and(human, topHat);
  const clown = and(human, redNose);
  const fancyOrClown = or(fancy, clown);
  const actual = explain(fancyOrClown, data);
  const expected = '(((@species->"human" equals "human") and (@hat->"top" equals "top")) or ((@species->"human" equals "human") and (@nose->"red" equals "red")))';
  assert.equal(actual, expected);
  assert.end();
});

test('explain should include the lookup and the data it resolves to if you provide data.', (assert) => {
  const data = {
    species: 'human',
  };
  let human = { left: '@species', fn: 'equals', right: 'human' };
  let actual = explain(human, data);
  let expected = '(@species->"human" equals "human")';
  assert.equal(actual, expected);

  human = { left: '@species', fn: 'equals', right: '@species' };
  actual = explain(human, data);
  expected = '(@species->"human" equals @species->"human")';
  assert.equal(actual, expected);
  assert.end();
});

test('explain should resolve for left and right arguments', (assert) => {
  const data = {
    species: 'human',
    hat: 'top',
  };
  let human = { left: '@species', fn: 'equals', right: '@hat' };
  let actual = explain(human);
  let expected = '(@species equals @hat)';
  assert.equal(actual, expected);

  human = { left: 'species', fn: 'equals', right: 'hat' };
  actual = explain(human);
  expected = '("species" equals "hat")';
  assert.equal(actual, expected);

  human = { left: 'species', fn: 'equals', right: 'hat' };
  actual = explain(human, data);
  expected = '("species" equals "hat")';
  assert.equal(actual, expected);
  assert.end();
});

test('explain should work for NOT composed rules', (assert) => {
  const data = {
    precipitation: ['rain'],
    temperature: 78,
  };

  const IS_RAINING = { left: '@precipitation', fn: 'includes', right: 'rain' };
  const NOT_RAINING = not(IS_RAINING);
  const IS_SNOWING = { left: '@precipitation', fn: 'includes', right: 'snow' };
  const NOT_SNOWING = not(IS_SNOWING);
  const NO_PRECIP = and(NOT_RAINING, NOT_SNOWING);

  const actual = explain(NO_PRECIP, data);
  const expected = '(NOT (@precipitation->["rain"] includes "rain") and NOT (@precipitation->["rain"] includes "snow"))';
  assert.equal(actual, expected);
  assert.end();
});

test('makeRegentFactory should be a function', (assert) => {
  assert.equal(typeof makeRegentFactory, 'function');
  assert.end();
});

test('makeRegentFactory should take a function and a custom object and return a function with the custom object accessible', (assert) => {
  const testFn = (data, rule, custom) => (
    Object.assign({}, data, rule, custom)
  );

  const data = {
    foo: 'bar',
  };

  const rule = {
    baz: 'buzz',
  };

  const custom = {
    hello: 'world',
  };

  const actual = makeRegentFactory(testFn, custom);
  assert.equal(typeof actual, 'function');

  const expected = Object.assign({}, data, rule, custom);
  assert.deepEqual(actual(data, rule), expected);
  assert.end();
});

test('makeRegentFactory should not require a custom object', (assert) => {
  const testFn = (data, rule, custom) => (
    Object.assign({}, data, rule, custom)
  );

  const data = {
    foo: 'bar',
  };

  const rule = {
    baz: 'buzz',
  };

  const actual = makeRegentFactory(testFn);
  assert.equal(typeof actual, 'function');

  const expected = Object.assign({}, data, rule);
  assert.deepEqual(actual(data, rule), expected);
  assert.end();
});
