import { evaluate, explain } from 'regent';

/**
 * Example custom predicate
 *
 * @param  {Array}   arr  Array of 2 or more Numbers.
 * @return {Boolean}      Returns true if the first number in the array
 *                        is less than the last, otherwise false.
 */
const isRising = arr => arr[0] < arr[arr.length - 1];

// Rules(s)
const isDailyTempRising = { left: '@dailyTemperature', fn: 'isRising' };

// Data
const data = { dailyTemperature: [72, 80] };

/**
 * Evaluation
 *
 * We need to tell Regent about `isRising`,
 * so we provide an object as the third parameter.
 *
 * @type {Boolean}
 */
const isGettingWarmer1 = evaluate(isDailyTempRising, data, { isRising });

console.log(isGettingWarmer1); // true

/**
 * Explanation
 *
 * No need to tell Regent about `isRising` when using `explain`.
 *
 * @type {String}
 */
const isGettingWarmer2 = explain(isDailyTempRising, data);

console.log(isGettingWarmer2); // (@dailyTemperature->[72,80] isRising)
