import evaluateRule from './evaluate-rule';
import { or, not, and, equals, greaterThanOrEquals } from '../index';

describe('3.x.x function rule syntax evaluate rule', () => {
  it('should work with function style rules', () => {
    const data = {
      foo: 'bar',
    };

    const RULE = equals('@foo', 'bar');
    const actual = evaluateRule(RULE, data);
    const expected = true;

    expect(actual).toEqual(expected);
  });

  it('should work with composed function style rules', () => {
    const data = {
      foo: 'bar',
      biz: 'baz',
      num: 4,
    };

    const RULE = equals('@foo', 'bar');
    const RULE2 = equals('@biz', 'baz');
    const RULE3 = greaterThanOrEquals('@num', 3);
    const COMPOSED = and(RULE, RULE2, RULE3);
    const actual = evaluateRule(COMPOSED, data);
    const expected = true;

    expect(actual).toEqual(expected);
  });

  it('should work with composed function style rules and classic rules', () => {
    const data = {
      foo: 'bar',
      biz: 'baz',
      num: 4,
    };

    const RULE = equals('@foo', 'bar');
    const RULE2 = equals('@biz', 'baz');
    const RULE3 = { left: '@num', fn: 'greaterThanOrEquals', right: 3 };
    const COMPOSED = and(RULE, RULE2, RULE3);
    const actual = evaluateRule(COMPOSED, data);
    const expected = true;

    expect(actual).toEqual(expected);
  });
});

describe('evaluateRule', () => {
  it('evaluateRule should be a function', () => {
    expect(typeof evaluateRule).toEqual('function');
  });

  it('evaluateRule should correctly evaluate a single rule', () => {
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
        obj, singleRule, expected,
      } = row;
      const actual = evaluateRule(singleRule, obj); /* ? */
      expect(actual).toEqual(expected);
    });
  });

  it('evaluateRule should correctly evaluate a composed rule', () => {
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
    expect(actual).toEqual(expected);
  });

  it('evaluateRule should throw when using a composed XOR object made without helper with 0 rules', () => {
    const obj = {
      greetings: {
        first: 'hello',
        second: 'goodbye',
      },
    };

    const oneGreeting = {
      compose: 'xor',
      rules: [],
    };

    expect(() => evaluateRule(oneGreeting, obj)).toThrow();
  });

  it('evaluateRule should throw when using a composed XOR object made without helper with 1 rule', () => {
    const secondGreetingIsSayonara = { left: '@greetings.second', fn: 'equals', right: 'sayonara' };

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
      ],
    };

    expect(() => evaluateRule(oneGreeting, obj)).toThrow();
  });

  it('evaluateRule should throw when using a composed XOR object made without helper with more than 2 rules', () => {
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

    expect(() => evaluateRule(oneGreeting, obj)).toThrow();
  });

  it('evaluateRule should return true for a regex rule', () => {
    const pirate = { left: '@saying', fn: 'regex', right: /yar/ };
    const data = {
      name: 'blackbeard',
      saying: 'I say yarrrrr!!!',
    };
    const actual = evaluateRule(pirate, data);
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('evaluateRule should correctly evaluate a NOT rule', () => {
    const pirate = { left: '@saying', fn: 'regex', right: /yar/ };
    const notPirate = not(pirate);
    const data = {
      name: 'acountant',
      saying: 'I say taxes',
    };
    expect(evaluateRule(notPirate, data)).toEqual(true);
    expect(evaluateRule(pirate, data)).toEqual(false);
  });

  it('evaluateRule should handle deeply nested rules', () => {
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
    expect(actual).toEqual(expected);

    actual = evaluateRule(or(fooAndBaz, bar));
    expected = false;
    expect(actual).toEqual(expected);
  });

  it('evaluateRule should work with a composed not rule', () => {
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
    expect(actual).toEqual(expected);
  });
});
