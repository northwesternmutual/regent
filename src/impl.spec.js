import test from 'tape';
import { evaluate, and, or, xor, explain, not, filter, find } from './index';

// An example of using Regent without custom predicates
test('Implement Regent without init()', (assert) => {
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
  assert.equal(explain(NO_PRECIPITATION), '(NOT (@precipitation includes "rain") and NOT (@precipitation includes "snow"))', 'Explain should work for NOT rules');

  const SHOULD_WEAR_COAT = or(IS_RAINING, IS_SNOWING, IS_COLD);

  assert.true(evaluate(SHOULD_WEAR_COAT, data), 'Should Wear Coat should return true');

  const WET_BUT_NOT_TOO_WET = xor(IS_RAINING, IS_SNOWING);
  assert.true(evaluate(WET_BUT_NOT_TOO_WET, data), 'Should return true');

  assert.throws(() => xor(IS_RAINING, IS_SNOWING, IS_COLD), 'XOR with more than 2 arguments should throw.');

  const explanation = explain(SHOULD_WEAR_COAT, data);
  assert.equal(explanation, '((@precipitation->["rain"] includes "rain") or (@precipitation->["rain"] includes "snow") or (@temperature->78 lessThan 75))', 'Regent explain is not working properly');

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

  assert.deepEqual(clothing, ['sandals', 't-shirt', 'umbrella'], 'Clothing should contain warm weather stuff, and an umbrella for rain');

  const firstResult = find(clothingLogic, data).value;
  assert.deepEqual(firstResult, ['sandals', 't-shirt'], 'Find should return the first matching row');

  assert.end();
});
