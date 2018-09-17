import { filter } from 'regent';

// Rule(s)
const isCold = { left: '@precipitation', fn: 'lessThan', right: 55 };
const isWarm = { left: '@temperature', fn: 'greaterThan', right: 68 };
const isRaining = { left: '@precipitation', fn: 'includes', right: 'rain' };
const isSunny = { left: '@sky', fn: 'includes', right: 'sun' };

// Data
const data = {
  precipitation: ['rain'],
  sky: ['clouds'],
  temperature: 82,
};

// Logic table
const clothingLogicTable = [
  { rule: isCold, value: ['hat', 'scarf', 'boots'] },
  { rule: isWarm, value: ['sandals', 't-shirt'] },
  { rule: isSunny, value: ['sunglasses'] },
  { rule: isRaining, value: ['umbrella'] },
];

// Querying
const clothing = filter(clothingLogicTable, data);

console.log(clothing); // => [{ value: ['sandals', 't-shirt'], rule: isWarm }, { value: ['umbrella'], rule: isRaining }]
