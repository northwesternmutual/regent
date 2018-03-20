import regent from '../lib/regent.min';

const isWearingBatSuit = items => items.every(item => item === true);

const customPredicates = {
  isWearingBatSuit,
};

const {
  and, or, not, explain, find, filter, evaluate,
} = regent.crown(customPredicates);

const data = {
  batmanGear: {
    mask: true,
    belt: true,
    armor: true,
  },

  indicators: {
    batSignal: true,
  },

  location: 'not near the bat cave',
};

const NOT_WEARING_BELT = { left: '@batmanGear.belt', fn: 'equals', right: false };
const NOT_WEARING_MASK = { left: '@batmanGear.mask', fn: 'equals', right: false };
const NOT_WEARING_ARMOR = { left: '@batmanGear.armor', fn: 'equals', right: false };

const NOT_READY_TO_GO = or(NOT_WEARING_ARMOR, NOT_WEARING_BELT, NOT_WEARING_MASK);

const IS_WEARING_FULL_SUIT = { left: ['@batmanGear.mask', '@batmanGear.belt', '@batmanGear.armor'], fn: 'isWearingBatSuit' };
const BAT_SIGNAL_IS_ON = { left: '@indicators.batSignal', fn: 'equals', right: true };
const BAT_SIGNAL_IS_OFF = not(BAT_SIGNAL_IS_ON);
const WEARING_SUIT_AND_SIGNAL_ON = and(IS_WEARING_FULL_SUIT, BAT_SIGNAL_IS_ON);
const NEAR_BAT_CAVE = { left: ['near the bat cave', 'in the bat cave'], fn: 'includes', right: '@location' };
const NOT_NEAR_BAT_CAVE = not(NEAR_BAT_CAVE);

const batmanDecision = [
  { action: 'Time to go!', rules: [WEARING_SUIT_AND_SIGNAL_ON] },
  { action: 'GET TO THE BAT CAVE!', rules: [NOT_NEAR_BAT_CAVE, BAT_SIGNAL_IS_ON] },
  { action: 'Put on your utility belt', rules: [NOT_WEARING_BELT] },
  { action: 'Keep on keeping on, no worries', rules: [BAT_SIGNAL_IS_OFF] },
];

const { action } = find(data, batmanDecision);
console.log(action); // GET TO THE BAT CAVE!

data.batmanGear.mask = false;

console.log(evaluate(data, NOT_READY_TO_GO));
console.log(explain(NOT_READY_TO_GO, data));
// => ​​​​​((@batmanGear.armor->true equals false) or (@batmanGear.belt->true equals false) or ("@batmanGear.mask" equals false))

const batmanClothingLogic = [
  { action: 'Put on belt', rules: [NOT_WEARING_BELT] },
  { action: 'Put on armor', rules: [NOT_WEARING_ARMOR] },
  { action: 'Put on mask', rules: [NOT_WEARING_MASK] },
];

data.batmanGear.armor = false;

const clothingLogic = filter(data, batmanClothingLogic);
console.log(clothingLogic);
// => ​​​​​[ { action: 'Put on armor', rules: [ [Object] ] },​​​​​
​​​​// => ​​​​​​  { action: 'Put on mask', rules: [ [Object] ] } ]​​​​​
