import regent, { constants } from 'regent';

const isWearingFullBatSuit = items => items.every(item => item === true);

const customPredicates = { isWearingFullBatSuit };

const { and, or, not, evaluate, explain, filter, find } = regent.crown(customPredicates);

// Rule(s)
const isBatArmorOn = { left: '@gear.batArmor', fn: constants.equals, right: false };
const isBatBeltOn = { left: '@gear.batBelt', fn: constants.equals, right: false };
const isBatMaskOn = { left: '@gear.batMask', fn: constants.equals, right: false };
const isBatSuitOn = { left: ['@gear.batArmor', '@gear.batBelt', '@gear.batMask'], fn: 'isWearingFullBatSuit' };
const isNotBatman = or(isBatArmorOn, isBatBeltOn, isBatMaskOn);

const isNearBatCave = { left: ['Near the Bat Cave', 'In the Bat Cave'], fn: constants.includes, right: '@location' };
const isNotNearBatCave = not(isNearBatCave);

const isBatSignalOn = { left: '@indicators.batSignal', fn: constants.equals, right: true };
const isBatSignalOff = not(isBatSignalOn);
const isBatSignalOnAndBatSuitOn = and(isBatSignalOn, isBatSuitOn);
const isBatSignalOnAndNotNearBatCave = and(isBatSignalOn, isNotNearBatCave);

// Logic table(s)
const batmanLogicTable = [
  { rule: isNotBatman, action: 'Put on Bat Suit.' },
  { rule: isBatSignalOff, action: 'No worries, Bruce.' },
  { rule: isBatSignalOnAndBatSuitOn, action: 'Time to go! NaNaNaNa Batman!' },
  { rule: isBatSignalOnAndNotNearBatCave, action: 'Quick, to the Bat Cave!' },
];

const batSuitLogicTable = [
  { rule: isBatArmorOn, action: 'Put on Bat Armor' },
  { rule: isBatBeltOn, action: 'Put on Bat Belt' },
  { rule: isBatMaskOn, action: 'Put on Bat Mask' },
];

// Data
const data = {
  gear: {
    batArmor: true,
    batBelt: true,
    batMask: true,
  },
  indicators: {
    batSignal: true,
  },
  location: 'Downtown Gotham',
};

// Querying
const { action: batmanActions } = find(batmanLogicTable, data);
data.gear.batArmor = false;
data.gear.batMask = false;
const batSuitActions = filter(batSuitLogicTable, data)
  .map(el => el.action)
  .join(', ');

console.log(batmanActions); // 'Quick, to the Bat Cave!'
console.log(evaluate(isNotBatman, data)); // true
console.log(explain(isNotBatman, data)); // (("@gear.batArmor" equals false) or (@gear.batBelt->true equals false) or ("@gear.batMask" equals false))
console.log(batSuitActions); // 'Put on Bat Armor, Put on Bat Mask'
