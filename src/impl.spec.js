import { init, evaluate, and, or, xor, explain, not, filter, find } from './index';

// An example of using Regent without custom predicates
describe('impl tests', () => {
  it('Implement Regent without init()', () => {
    const data = {
      precipitation: ['rain'],
      temperature: 78,
    };

    const IS_RAINING = { left: '@precipitation', fn: 'includes', right: 'rain' };
    const NOT_RAINING = not(IS_RAINING);
    const IS_SNOWING = { left: '@precipitation', fn: 'includes', right: 'snow' };
    const NOT_SNOWING = not(IS_SNOWING);
    const IS_COLD = { left: '@temperature', fn: 'lessThan', right: 75 };
    const IS_WARM = not(IS_COLD);
    const NO_PRECIPITATION = and(NOT_RAINING, NOT_SNOWING);
    expect(explain(NO_PRECIPITATION)).toEqual('(NOT (@precipitation includes "rain") and NOT (@precipitation includes "snow"))');

    const SHOULD_WEAR_COAT = or(IS_RAINING, IS_SNOWING, IS_COLD);
    expect(evaluate(SHOULD_WEAR_COAT, data)).toEqual(true);

    const WET_BUT_NOT_TOO_WET = xor(IS_RAINING, IS_SNOWING);
    expect(evaluate(WET_BUT_NOT_TOO_WET, data)).toEqual(true);

    expect(() => xor()).toThrow();
    expect(() => xor(IS_RAINING)).toThrow();
    expect(() => xor(IS_RAINING, IS_SNOWING, IS_COLD)).toThrow();

    const explanation = explain(SHOULD_WEAR_COAT, data);
    expect(explanation).toEqual('((@precipitation->["rain"] includes "rain") or (@precipitation->["rain"] includes "snow") or (@temperature->78 lessThan 75))');

    const clothingLogic = [
      { value: ['hat', 'scarf', 'boots'], rule: IS_COLD },
      { value: ['sandals', 't-shirt'], rule: IS_WARM },
      { value: ['sunglasses'], rule: NO_PRECIPITATION },
      { value: ['umbrella'], rule: IS_RAINING },
    ];

    const myClothing = filter(clothingLogic, data);
    const clothing = myClothing.reduce((acc, row) => (
      acc.concat(row.value)
    ), []);

    expect(clothing).toEqual(['sandals', 't-shirt', 'umbrella'], 'Clothing should contain warm weather stuff, and an umbrella for rain');

    const firstResult = find(clothingLogic, data).value;
    expect(firstResult).toEqual(['sandals', 't-shirt'], 'Find should return the first matching row');
  });

  it('regent.explain', () => {
    const king = init();
    const data = {
      hello: 'world',
      foo: ['bar', 'baz', 'biz'],
    };
    const matchesHello = { left: '@__', fn: 'equals', right: '@hello' };
    const iterRule = { left: '@foo', fn: 'some', right: matchesHello };

    const actual = king.explain(iterRule, data);
    const expected = '(@foo->["bar","baz","biz"] some {"left":"@__","fn":"equals","right":"@hello"})';
    expect(actual).toEqual(expected);
  });

  it('greaterThan, lessThan, greaterThanOrEqual, lessThanOrEqual alias', () => {
    const king = init();
    const data = {
      number: 42,
    };

    const bigger = { left: '@number', fn: '>', right: 41 };
    expect(king.rule(bigger, data)).toEqual(true);

    const biggerOrEqual = { left: '@number', fn: '>=', right: 42 };
    expect(king.rule(biggerOrEqual, data)).toEqual(true);

    const smaller = { left: '@number', fn: '<', right: 43 };
    expect(king.rule(smaller, data)).toEqual(true);

    const smallerOrEqual = { left: '@number', fn: '<=', right: 42 };
    expect(king.rule(smallerOrEqual, data)).toEqual(true);
  });
});

