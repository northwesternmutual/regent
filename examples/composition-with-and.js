import { and, evaluate, explain } from 'regent';

// Rule(s)
const isRaining = { left: '@isRaining', fn: 'equals', right: true };
const isWindy = { left: '@windSpeedInMph', fn: 'greaterThan', right: 15 };
const isCold = { left: '@temperature', fn: 'lessThan', right: 55 };
const isBadWeather = and(isRaining, isWindy, isCold); // Example of a composed rule

// Data
const data = { isRaining: true, temperature: 45, windSpeedInMph: 20 };

/**
 * Evaluation
 *
 * @type {Boolean}
 */
const shouldIStayInside1 = evaluate(isBadWeather, data);

console.log(shouldIStayInside1); // true

/**
 * Explanation
 *
 * @type {String}
 */
const shouldIStayInside2 = explain(isBadWeather, data);

console.log(shouldIStayInside2); // ((@isRaining->true equals true) and (@windSpeedInMph->20 greaterThan 15) and (@temperature->45 lessThan 55))
