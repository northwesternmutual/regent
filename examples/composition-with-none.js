import { none, evaluate, explain } from 'regent';

// Rule(s)
const isRaining = { left: '@isRaining', fn: 'equals', right: true };
const isCold = { left: '@temperature', fn: 'lessThan', right: 55 };
const isWarmAndSunny = none(isRaining, isCold); // Example of a composed rule

// Data
const data = { isRaining: false, temperature: 75 };

/**
 * Evaluation
 *
 * @type {Boolean}
 */
const shouldWearHawaiianShirt1 = evaluate(isWarmAndSunny, data);

console.log(shouldWearHawaiianShirt1); // true

/**
 * Explanation
 *
 * @type {String}
 */
const shouldWearHawaiianShirt2 = explain(isWarmAndSunny, data);

console.log(shouldWearHawaiianShirt2); // NOT ((@isRaining->false equals true) or (@temperature->75 lessThan 55))
