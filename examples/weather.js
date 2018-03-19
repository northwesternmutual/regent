import { evaluate, or, explain, not, filter } from '../lib/regent.min';

// An example of using Regent without custom predicates

const data = {
  precipitation: ['rain'],
  temperature: 78,
};

const IS_RAINING = { left: '@precipitation', fn: 'includes', right: 'rain' };
const IS_SNOWING = { left: '@precipitation', fn: 'includes', right: 'snow' };
const IS_COLD = { left: '@temperature', fn: 'lessThan', right: 75 };
const IS_WARM = not(IS_COLD);
const NO_PARTICIPATION = { left: '@percipitation', fn: 'empty' }

const SHOULD_WEAR_COAT = or([IS_RAINING, IS_SNOWING, IS_COLD]);


evaluate(data, SHOULD_WEAR_COAT); /* ? */
explain(SHOULD_WEAR_COAT, data); /* ? */

const clothingLogic = [
  { value: ['hat', 'scarf', 'boots'], rules: [IS_COLD] },
  { value: ['sandals', 't-shirt'], rules: [IS_WARM] },
  { value: ['sunglasses'], rules: [IS_SUNNY] },
  { value: ['umbrella'], rules: [IS_RAINING] },
];

const myClothing = filter(data, clothingLogic);
const clothing = myClothing.reduce((acc, row) => (
  acc.concat(row.value)
), []);

console.log(clothing); // ['sunglasses', 'sandals', 't-shirt', 'umbrella']
