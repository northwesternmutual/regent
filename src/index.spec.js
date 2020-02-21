import defaultExport, {
  find,
  filter,
  init,
  crown,
  evaluate,
  or,
  xor,
  and,
  not,
  none,
  explain,
  constants,
  makeRegentFactory,
  make,
  explainLogic,
  deepEquals,
  empty,
  equals,
  greaterThanOrEquals,
  greaterThan,
  includes,
  lessThanOrEquals,
  lessThan,
  regex,
  typeOf,
} from './index';

describe('3.x.x - functional rules public export', () => {
  it('equals should be a function', () => {
    expect(typeof equals).toEqual('function');
  });

  it('greaterThanOrEquals should be a function', () => {
    expect(typeof greaterThanOrEquals).toEqual('function');
  });

  it('deepEquals should be a function', () => {
    expect(typeof deepEquals).toEqual('function');
  });

  it('empty should be a function', () => {
    expect(typeof empty).toEqual('function');
  });

  it('greaterThan should be a function', () => {
    expect(typeof greaterThan).toEqual('function');
  });

  it('includes should be a function', () => {
    expect(typeof includes).toEqual('function');
  });

  it('lessThanOrEquals should be a function', () => {
    expect(typeof lessThanOrEquals).toEqual('function');
  });

  it('lessThan should be a function', () => {
    expect(typeof lessThan).toEqual('function');
  });

  it('regex should be a function', () => {
    expect(typeof regex).toEqual('function');
  });

  it('typeOf should be a function', () => {
    expect(typeof typeOf).toEqual('function');
  });

  it('make should be a function', () => {
    expect(typeof make).toEqual('function');
  });
});

describe('explainLogic', () => {
  it('should return a table of explanations', () => {
    const RAINING = { left: '@raining', fn: 'equals', right: true };
    const SWIMMING = { left: '@place', fn: 'equals', right: 'pool' };
    const INSIDE = { left: '@place', fn: 'equals', right: 'inside' };
    const I_AM_WET = and(or(RAINING, SWIMMING), not(INSIDE));

    const logic = [
      { text: 'I\'m all wet.', rule: I_AM_WET },
      { text: 'I\'m pretty dry.', rule: not(I_AM_WET) },
      { text: 'Man. I hate rain.', rule: RAINING },
    ];

    const data = {
      raining: true,
      place: 'inside',
    };

    const actual = explainLogic(logic, data);
    const expected = [
      { result: false, because: '(((@raining->true equals true) or (@place->"inside" equals "pool")) and NOT (@place->"inside" equals "inside"))' },
      { result: true, because: 'NOT (((@raining->true equals true) or (@place->"inside" equals "pool")) and NOT (@place->"inside" equals "inside"))' },
      { result: true, because: '(@raining->true equals true)' },
    ];

    expect(expected).toEqual(actual);
  });
});

// Mock up a set of rules to use. These rules will be
// provided by the consuming application in the wild
describe('find', () => {
  it('find should be a function', () => {
    expect(typeof find).toEqual('function');
  });

  it('find should return the first array item with all true rules', () => {
    const obj = {
      greeting: 'hello',
      place: 'world',
    };

    const greetingIsHello = { left: '@greeting', fn: 'equals', right: 'hello' };
    const placeIsWorld = { left: '@place', fn: 'equals', right: 'world' };
    const placeIsNotWorld = { left: '@place', fn: '!equals', right: 'world' };

    const rules = [
      { result: 'This is somewhere else!', rule: placeIsNotWorld },
      { result: 'This is the world!', rule: and(greetingIsHello, placeIsWorld) },
    ];

    const actual = find(rules, obj).result;
    const expected = 'This is the world!';
    expect(actual).toEqual(expected);
  });

  it('find should return the first array item with all true rules, even if there are other true rows after it.', () => {
    const obj = {
      greeting: 'hello',
      place: 'world',
    };

    const greetingIsHello = { left: '@greeting', fn: 'equals', right: 'hello' };
    const placeIsWorld = { left: '@place', fn: 'equals', right: 'world' };
    const placeIsNotWorld = { left: '@place', fn: '!equals', right: 'world' };

    const rules = [
      { result: 'This is somewhere else!', rule: placeIsNotWorld },
      { result: 'This is the world!', rule: and(greetingIsHello, placeIsWorld) },
      { result: 'This is also the world, but I should not be returned', rule: and(greetingIsHello, placeIsWorld) },
    ];

    const actual = find(rules, obj).result;
    const expected = 'This is the world!';
    expect(actual).toEqual(expected);
  });

  it('find should return undefined if no rows match', () => {
    const obj = {
      greeting: 'hello',
      place: 'world',
    };

    const greetingIsHello = { left: '@greeting', fn: 'equals', right: 'hello' };
    const placeIsNotWorld = { left: '@place', fn: '!equals', right: 'world' };

    const rules = [
      { result: 'This is somewhere else!', rule: placeIsNotWorld },
      { result: 'This is the world!', rule: and(greetingIsHello, placeIsNotWorld) },
    ];

    const actual = find(rules, obj);
    const expected = undefined;
    expect(actual).toEqual(expected);
  });

  it('find should throw if no rules are provided', () => {
    const obj = {
      greeting: 'hello',
      place: 'world',
    };

    expect(() => find(obj)).toThrow();
  });

  it('find should return undefined if the rule left does not exist in the object', () => {
    const obj = {
      foo: 'bar',
    };

    const greetingIsHello = { left: '@greeting', fn: 'equals', right: 'hello' };
    const placeIsNotWorld = { left: '@place', fn: '!equals', right: 'world' };

    const rules = [
      { result: 'This is the world!', rule: and(greetingIsHello, placeIsNotWorld) },
    ];

    const actual = find(rules, obj);
    const expected = undefined;
    expect(actual).toEqual(expected);
  });

  it('find a !equals rule will return true, even if that object property does not exist', () => {
    const obj = {
      foo: 'bar',
    };

    const greetingIsHello = { left: '@greeting', fn: 'equals', right: 'hello' };
    const placeIsNotWorld = { left: '@place', fn: '!equals', right: 'world' };

    const rules = [
      { result: 'This is somewhere else!', rule: placeIsNotWorld },
      { result: 'This is the world!', rule: and(greetingIsHello, placeIsNotWorld) },
    ];

    const actual = find(rules, obj).result;
    const expected = 'This is somewhere else!';
    expect(actual).toEqual(expected);
  });

  it('find should accept a custom predicate', () => {
    const custom = {
      isAThree: a => a === 3,
    };
    const data = {
      myParam: 3,
    };

    const MY_RULE = { left: '@myParam', fn: 'isAThree' };
    const logic = [
      { value: 'success', rule: MY_RULE },
    ];
    const actual = find(logic, data, custom);
    expect(actual.value).toEqual('success');
  });
});

describe('filter', () => {
  it('filter should be a function', () => {
    expect(typeof filter).toEqual('function');
  });

  it('filter should return an array of matching logic rows', () => {
    const obj = {
      greeting: 'hello',
      place: 'world',
    };

    const greetingIsHello = { left: '@greeting', fn: 'equals', right: 'hello' };
    // const greeting_is_goodbye = { left: '@greeting', fn: 'equals', right: 'goodbye' };
    const placeIsWorld = { left: '@place', fn: 'equals', right: 'world' };
    const placeIsNotWorld = { left: '@place', fn: '!equals', right: 'world' };

    const rules = [
      { result: 'This is somewhere else!', rule: placeIsNotWorld },
      { result: 'This is the world!', rule: and(greetingIsHello, placeIsWorld) },
      { result: 'This is also the world, but I should not be returned', rule: and(greetingIsHello, placeIsWorld) },
    ];

    const actual = filter(rules, obj); /* ? */
    const expected = [
      rules[1],
      rules[2],
    ];
    expect(typeof actual).toEqual('object');
    expect(actual.length).toEqual(2);
    expect(actual).toEqual(expected);
  });

  it('filter should return an empty array if no rules match', () => {
    const obj = {
      greeting: 'hello',
      place: 'world',
    };

    const greetingIsHello = { left: '@greeting', fn: 'equals', right: 'hello' };
    const placeIsNotWorld = { left: '@place', fn: '!equals', right: 'world' };

    const rules = [
      { result: 'This is somewhere else!', rule: placeIsNotWorld },
      { result: 'This is the world!', rule: and(greetingIsHello, placeIsNotWorld) },
      { result: 'This is also the world, but I should not be returned', rule: and(greetingIsHello, placeIsNotWorld) },
    ];

    const actual = filter(rules, obj); /* ? */
    const expected = [];
    expect(actual).toEqual(expected);
  });

  it('filter should accept a custom predicate', () => {
    const custom = {
      isAThree: a => a === 3,
    };
    const data = {
      myParam: 3,
    };

    const MY_RULE = { left: '@myParam', fn: 'isAThree' };
    const logic = [
      { value: 'success', rule: MY_RULE },
    ];
    const actual = filter(logic, data, custom);
    expect(actual[0].value).toEqual('success');
  });
});

describe('init', () => {
  it('init should be a function', () => {
    expect(typeof init).toEqual('function');
    expect(typeof defaultExport.init).toEqual('function'); // eslint-disable-line
  });

  it('init should return an object with and, not, or, xor, find, filter, evaluate, and rule methods', () => {
    const regent = init();
    expect(typeof regent.and).toEqual('function');
    expect(typeof regent.not).toEqual('function');
    expect(typeof regent.or).toEqual('function');
    expect(typeof regent.xor).toEqual('function');
    expect(typeof regent.find).toEqual('function');
    expect(typeof regent.filter).toEqual('function');
    expect(typeof regent.explain).toEqual('function');
    expect(typeof regent.evaluate).toEqual('function');
    expect(typeof regent.none).toEqual('function');
  });

  it('init should accept an object of custom functions', () => {
    const customFn = input => input === true;
    const regent = init({ customFn });
    let data = {
      customField: true,
    };

    let actual = regent.evaluate({ left: '@customField', fn: 'customFn' }, data);
    let expected = true;

    expect(actual).toEqual(expected);

    data = {
      customField: false,
    };

    actual = regent.evaluate({ left: '@customField', fn: 'customFn' }, data);
    expected = false;

    expect(actual).toEqual(expected);
  });
});


it('crown should be a function', () => {
  expect(typeof crown).toEqual('function');
  expect(typeof defaultExport.crown).toEqual('function'); // eslint-disable-line
});

it('constants should be an object', () => {
  expect(typeof constants).toEqual('object');
  expect(typeof defaultExport.constants).toEqual('object'); // eslint-disable-line
  expect(constants).toEqual({
    dateAfterInclusive: 'dateAfterInclusive',
    dateBeforeInclusive: 'dateBeforeInclusive',
    deepEquals: 'deepEquals',
    empty: 'empty',
    equals: 'equals',
    greaterThan: 'greaterThan',
    greaterThanOrEquals: 'greaterThanOrEquals',
    includes: 'includes',
    lessThan: 'lessThan',
    lessThanOrEquals: 'lessThanOrEquals',
    regex: 'regex',
    typeOf: 'typeOf',
  });
});


it('evaluate should be a function', () => {
  expect(typeof evaluate).toEqual('function');
});

it('rule should evaluate the rule provided with the data provided', () => {
  const data = {
    greeting: 'hello',
    place: 'not this world',
  };

  const placeIsWorld = { left: '@place', fn: 'equals', right: 'world' };
  const placeIsNotWorld = { left: '@place', fn: '!equals', right: 'world' };

  let actual = evaluate(placeIsNotWorld, data);
  let expected = true;
  expect(actual).toEqual(expected);

  actual = evaluate(placeIsWorld, data);
  expected = false;
  expect(actual).toEqual(expected);
});

it('rule should evaluate booleans', () => {
  const data = {};

  const placeIsWorld = false;
  const placeIsNotWorld = true;

  let actual = evaluate(placeIsNotWorld, data);
  let expected = true;
  expect(actual).toEqual(expected);

  actual = evaluate(placeIsWorld, data);
  expected = false;
  expect(actual).toEqual(expected);
});

it('find should handle a string representation of an object path', () => {
  const obj = {
    greetings: {
      first: 'hello',
      second: 'goodbye',
    },
  };

  const secondGreetingIsGoodbye = { left: '@greetings.second', fn: 'equals', right: 'goodbye' };

  const rules = [
    { result: 'See you later!', rule: secondGreetingIsGoodbye },
  ];

  const actual = find(rules, obj).result;
  const expected = 'See you later!';
  expect(actual).toEqual(expected);
});

it('filter should handle a string representation of an object path', () => {
  const obj = {
    greetings: {
      first: 'hello',
      second: 'goodbye',
    },
  };

  const secondGreetingIsGoodbye = { left: '@greetings.second', fn: 'equals', right: 'goodbye' };

  const rules = [
    { result: 'See you later!', rule: secondGreetingIsGoodbye },
  ];

  const actual = filter(rules, obj);
  const expected = [{ result: 'See you later!', rule: secondGreetingIsGoodbye }];
  expect(actual).toEqual(expected);
});

it('ja.or should be a function', () => {
  expect(typeof or).toEqual('function');
});

it('ja.or should return a properly formatted or object', () => {
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

  expect(actual).toEqual(expected);
});

it('ja.or should return booleans', () => {
  const secondGreetingIsSayonara = true;
  const secondGreetingIsGoodbye = false;

  const actual = or(secondGreetingIsSayonara, secondGreetingIsGoodbye);
  const expected = {
    compose: 'or',
    rules: [
      true,
      false,
    ],
  };

  expect(actual).toEqual(expected);
});

it('ja.xor should be a function', () => {
  expect(typeof xor).toEqual('function');
});

it('ja.xor should return a properly formatted xor object', () => {
  const secondGreetingIsSayonara = { left: '@greetings.second', fn: 'equals', right: 'sayonara' };
  const secondGreetingIsGoodbye = { left: '@greetings.second', fn: 'equals', right: 'goodbye' };

  const actual = xor(secondGreetingIsSayonara, secondGreetingIsGoodbye);
  const expected = {
    compose: 'xor',
    rules: [
      secondGreetingIsSayonara,
      secondGreetingIsGoodbye,
    ],
  };

  expect(actual).toEqual(expected);
});

it('ja.xor should return booleans', () => {
  const secondGreetingIsSayonara = true;
  const secondGreetingIsGoodbye = false;

  const actual = xor(secondGreetingIsSayonara, secondGreetingIsGoodbye);
  const expected = {
    compose: 'xor',
    rules: [
      true,
      false,
    ],
  };

  expect(actual).toEqual(expected);
});

it('xor should throw error "XOR must take exactly 2 rules" if rules.length is not === 2', () => {
  expect(() => xor({ rules: [] })).toThrow('XOR must take exactly 2 rules');
});

it('ja.and should be a function', () => {
  expect(typeof and).toEqual('function');
});

it('ja.and should return a properly formatted and object', () => {
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
  expect(actual).toEqual(expected);
});

it('ja.and should return booleans', () => {
  const firstGreetingIsHello = true;
  const secondGreetingIsGoodbye = false;

  const actual = and(firstGreetingIsHello, secondGreetingIsGoodbye);
  const expected = {
    compose: 'and',
    rules: [
      true,
      false,
    ],
  };
  expect(actual).toEqual(expected);
});

it('find should accept composed rule objects', () => {
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
    { result: 'I get it, two languages', rule: goodByeOrSayonara },
  ];

  const actual = find(rules, obj).result;
  const expected = 'I get it, two languages';
  expect(actual).toEqual(expected);
});

it('find should accept deeply composed rule objects', () => {
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
    { result: 'Deeply nested... nice', rule: helloAndGoodByeOrSayonara },
  ];

  const actual = find(rules, obj).result;
  const expected = 'Deeply nested... nice';
  expect(actual).toEqual(expected);
});

it('find should return false if deeply composed rule objects eval to false', () => {
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
    { result: 'Deeply nested... nice', rule: helloAndGoodByeOrSayonara },
  ];

  const actual = find(rules, obj);
  const expected = undefined;
  expect(actual).toEqual(expected);
});

it('filter should accept deeply composed rule objects', () => {
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
    { result: 'Deeply nested... nice', rule: helloAndGoodByeOrSayonara },
  ];

  const actual = filter(rules, obj);
  const expected = [
    { result: 'Deeply nested... nice', rule: helloAndGoodByeOrSayonara },
  ];
  expect(actual).toEqual(expected);
});

it('not should be a function', () => {
  expect(typeof not).toEqual('function');
});

it('not should return a "composed" object with a compose value of not', () => {
  const singleRule = { left: '@person', fn: 'equals', right: true };
  const actual = not(singleRule);
  const expected = {
    not: singleRule,
  };
  expect(actual).toEqual(expected);
});

it('not should return a "composed" boolean with a compose value of not', () => {
  const singleRule = true;
  const actual = not(singleRule);
  const expected = {
    not: true,
  };
  expect(actual).toEqual(expected);
});

it('explain should be a function', () => {
  const actual = typeof explain;
  const expected = 'function';
  expect(actual).toEqual(expected);
});

it('explain should throw if called without an argument', () => {
  expect(() => explain()).toThrow('regent.explain must be called with a regent rule');
});

it('explain should throw if called without a well-formed rule', () => {
  const data = {};
  expect(() => explain(data)).toThrow('regent.explain must be called with a regent rule');
});

it('explain should stringify a single rule', () => {
  const human = { left: '@species', fn: 'equals', right: 'human' };
  const actual = explain(human);
  const expected = '(@species equals "human")';
  expect(actual).toEqual(expected);
});

it('explain should stringify a single rule with multiple right', () => {
  const human = { left: '@species', fn: 'isIn', right: ['human', 'dog'] };
  const actual = explain(human);
  const expected = '(@species isIn ["human","dog"])';
  expect(actual).toEqual(expected);
});

it('explain should stringify a composed OR rule', () => {
  const human = { left: '@species', fn: 'equals', right: 'human' };
  const dog = { left: '@species', fn: 'equals', right: 'dog' };
  const mammal = or(human, dog);
  const actual = explain(mammal);
  const expected = '((@species equals "human") or (@species equals "dog"))';
  expect(actual).toEqual(expected);
});

it('explain should stringify a composed XOR rule', () => {
  const human = { left: '@species', fn: 'equals', right: 'human' };
  const dog = { left: '@species', fn: 'equals', right: 'dog' };
  const mammal = xor(human, dog);
  const actual = explain(mammal);
  const expected = '((@species equals "human") xor (@species equals "dog"))';
  expect(actual).toEqual(expected);
});

it('explain should stringify a composed AND rule', () => {
  const human = { left: '@species', fn: 'equals', right: 'human' };
  const topHat = { left: '@hat', fn: 'equals', right: 'top' };
  const fancy = and(human, topHat);
  const actual = explain(fancy);
  const expected = '((@species equals "human") and (@hat equals "top"))';
  expect(actual).toEqual(expected);
});

it('explain should stringify a rule of composed rules', () => {
  const human = { left: '@species', fn: 'equals', right: 'human' };
  const topHat = { left: '@hat', fn: 'equals', right: 'top' };
  const redNose = { left: '@nose', fn: 'equals', right: 'red' };
  const fancy = and(human, topHat);
  const clown = and(human, redNose);
  const fancyOrClown = or(fancy, clown);
  const actual = explain(fancyOrClown);
  const expected = '(((@species equals "human") and (@hat equals "top")) or ((@species equals "human") and (@nose equals "red")))';
  expect(actual).toEqual(expected);
});

it('explain should stringify a rule with multiple lefts', () => {
  const fooBar = { left: ['foo', 'bar'], fn: 'customFunc', right: 'baz' };
  const actual = explain(fooBar);
  const expected = '(["foo","bar"] customFunc "baz")';
  expect(actual).toEqual(expected);
});

it('explain should include the lookup and the data it resolves to if you provide data.', () => {
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
  expect(actual).toEqual(expected);
});

it('explain should include the lookup and the data it resolves to if you provide data.', () => {
  const data = {
    species: 'human',
  };
  let human = { left: '@species', fn: 'equals', right: 'human' };
  let actual = explain(human, data);
  let expected = '(@species->"human" equals "human")';
  expect(actual).toEqual(expected);

  human = { left: '@species', fn: 'equals', right: '@species' };
  actual = explain(human, data);
  expected = '(@species->"human" equals @species->"human")';
  expect(actual).toEqual(expected);
});

it('explain should resolve for left and right arguments', () => {
  const data = {
    species: 'human',
    hat: 'top',
  };
  let human = { left: '@species', fn: 'equals', right: '@hat' };
  let actual = explain(human);
  let expected = '(@species equals @hat)';
  expect(actual).toEqual(expected);

  human = { left: 'species', fn: 'equals', right: 'hat' };
  actual = explain(human);
  expected = '("species" equals "hat")';
  expect(actual).toEqual(expected);

  human = { left: 'species', fn: 'equals', right: 'hat' };
  actual = explain(human, data);
  expected = '("species" equals "hat")';
  expect(actual).toEqual(expected);
});

it('explain should work for NOT composed rules', () => {
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
  expect(actual).toEqual(expected);
});

it('explain should work for rules with only a left and fn prop (empty)', () => {
  const data = {
    precip: ['hail'],
  };
  const NO_PRECIP = { left: '@precip', fn: 'empty' };
  const actual = explain(NO_PRECIP, data);
  const expected = '(@precip->["hail"] empty)';
  expect(actual).toEqual(expected);
});

it('explain should work for rules with only a right and fn prop (empty)', () => {
  const data = {
    precip: ['hail'],
  };
  const NO_PRECIP = { fn: 'empty', right: '@precip' };
  const actual = explain(NO_PRECIP, data);
  const expected = '(empty @precip->["hail"])';
  expect(actual).toEqual(expected);
});

it('makeRegentFactory should be a function', () => {
  expect(typeof makeRegentFactory).toEqual('function');
});

it('makeRegentFactory should take a function and a custom object and return a function with the custom object accessible', () => {
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
  expect(typeof actual).toEqual('function');

  const expected = Object.assign({}, data, rule, custom);
  expect(actual(data, rule)).toEqual(expected);
});

it('makeRegentFactory should not require a custom object', () => {
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
  expect(typeof actual).toEqual('function');

  const expected = Object.assign({}, data, rule);
  expect(actual(data, rule)).toEqual(expected);
});

describe('none', () => {
  test('should be a function', () => {
    expect(typeof none).toBe('function');
  });

  test('should return not(or(...rules))', () => {
    const blue = { left: 'color', fn: 'equals', right: 'blue' };
    const red = { left: 'color', fn: 'equals', right: 'red' };
    const actual = none(blue, red);
    const expected = {
      not: {
        compose: 'or',
        rules: [
          blue,
          red,
        ],
      },
    };
    expect(actual).toEqual(expected);
  });
});
