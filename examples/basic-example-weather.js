import { evaluate } from 'regent';

// Rule(s)
const isRaining = { left: '@isRaining', fn: 'equals', right: true };

// Data
const data = { isRaining: true };

/**
 * Evaluation
 *
 * @type {Boolean}
 */
const isUmbrellaNeeded = evaluate(isRaining, data);

console.log(isUmbrellaNeeded); // true
