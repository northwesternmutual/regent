import parseComposed from './parse-composed';
import { not, and, or } from '../index';

describe('parseComposed', () => {
  it('parseComposed should be a function', () => {
    expect(typeof parseComposed).toEqual('function');
  });

  it('parseComposed should evaluate the rules in the rules array, and return bool given the comp type "or"', () => {
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
    expect(actual).toEqual(expected);

    data = {
      greetings: {
        first: 'hello',
        second: 'sayonara',
      },
    };

    actual = parseComposed(row, data);
    expected = true;
    expect(actual).toEqual(expected);

    data = {
      greetings: {
        first: 'hello',
        second: 'caio',
      },
    };

    actual = parseComposed(row, data);
    expected = false;
    expect(actual).toEqual(expected);
  });

  it('parseComposed should evaluate the rules in the rules array, and return bool given the comp type "xor"', () => {
    let row = {
      compose: 'xor',
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
    expect(actual).toEqual(expected);

    data = {
      greetings: {
        first: 'hello',
        second: 'sayonara',
      },
    };

    actual = parseComposed(row, data);
    expected = true;
    expect(actual).toEqual(expected);

    data = {
      greetings: {
        first: 'hello',
        second: 'caio',
      },
    };

    actual = parseComposed(row, data);
    expected = false;
    expect(actual).toEqual(expected);

    row = {
      compose: 'xor',
      rules: [
        { left: '@greetings.first', fn: 'equals', right: 'sayonara' },
        { left: '@greetings.second', fn: 'equals', right: 'goodbye' },
      ],
    };

    data = {
      greetings: {
        first: 'sayonara',
        second: 'goodbye',
      },
    };

    actual = parseComposed(row, data);
    expected = false;
    expect(actual).toEqual(expected);
  });

  it('parseComposed should throw and exception if xor is given more or less than 2 rules', () => {
    let row = {
      compose: 'xor',
      rules: [
        { left: '@greetings.first', fn: 'equals', right: 'hello' },
      ],
    };

    let data = {
      greetings: {
        first: 'hello',
        second: 'goodbye',
      },
    };

    expect(() => parseComposed(row, data, 'should throw because only one rule')).toThrow('XOR must take exactly 2 rules');

    row = {
      compose: 'xor',
      rules: [
        { left: '@greetings.first', fn: 'equals', right: 'hello' },
        { left: '@greetings.first', fn: 'equals', right: 'hello' },
        { left: '@greetings.first', fn: 'equals', right: 'hello' },
      ],
    };

    data = {
      greetings: {
        first: 'hello',
        second: 'goodbye',
      },
    };

    expect(() => parseComposed(row, data, 'should throw because more than 2 rules')).toThrow('XOR must take exactly 2 rules');
  });

  it('parseComposed should evaluate the rules in the rules array and return bool given the comp type "and"', () => {
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
    expect(actual).toEqual(expected);

    data = {
      greetings: {
        first: 'hello',
        second: 'caio',
      },
    };

    actual = parseComposed(row, data, 'should return false because not every rule is true');
    expected = false;
    expect(actual).toEqual(expected);
  });

  it('parseComposed should return false if the action is not supported', () => {
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
    expect(actual).toEqual(expected);
  });

  it('parseComposed should handle a composed object of type not', () => {
    const obj = {
      person: false,
    };
    const singleRule = { left: '@person', fn: 'equals', right: true };
    const notPerson = not(singleRule);
    const actual = parseComposed(notPerson, obj);
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('parseComposed should handle a false composed object of type not', () => {
    const obj = {
      person: true,
    };
    const singleRule = { left: '@person', fn: 'equals', right: true };
    const notPerson = not(singleRule);
    const actual = parseComposed(notPerson, obj);
    const expected = false;
    expect(actual).toEqual(expected);
  });

  it('parseComposed should handle a not composed object, with a rule that is a composed object', () => {
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
    expect(actual).toEqual(expected);
  });

  it('parseComposed should handle new not rule syntax', () => {
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
    expect(actual).toEqual(expected);
  });

  it('parseComposed should correctly handle new NOT syntax using the helper', () => {
    const data = {
      precipitation: ['rain'],
      temperature: 78,
    };

    const IS_COLD = { left: '@temperature', fn: 'lessThan', right: 75 };
    const IS_WARM = not(IS_COLD);

    expect(parseComposed(IS_WARM, data)).toEqual(true);
  });
});

