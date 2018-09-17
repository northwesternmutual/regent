import { or, evaluate, explain } from 'regent';

// Rule(s)
const isRaining = { left: '@isRaining', fn: 'equals', right: true };
const isCold = { left: '@temperature', fn: 'lessThan', right: 55 };
const isRainingOrCold = or(isRaining, isCold); // Example of a composed rule

// Data
const data = { isRaining: true, temperature: 45 };

/**
 * Evaluation
 *
 * @type {Boolean}
 */
const shouldIDressWarm1 = evaluate(isRainingOrCold, data);

console.log(shouldIDressWarm1); // true

/**
 * Explanation
 *
 * @type {String}
 */
const shouldIDressWarm2 = explain(isRainingOrCold, data);

console.log(shouldIDressWarm2); // ((@isRaining->true equals true) or (@temperature->45 lessThan 55))
