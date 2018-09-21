import { evaluate } from 'regent';

// Rule(s)
const isBeachTemperature = { left: '@temperature', fn: 'greaterThan', right: 75 };

// Data
const data = { temperature: 78 };

/**
 * Evaluation
 *
 * @type {Boolean}
 */
const isBeachDay = evaluate(isBeachTemperature, data);

console.log(isBeachDay); // true
