import { not, evaluate, explain } from 'regent';

// Rule(s)
const isCold = { left: '@temperature', fn: 'lessThan', right: 55 };
const isWarm = not(isCold); // Example of a composed rule

// Data
const data = { temperature: 45 };

/**
 * Evaluation
 *
 * @type {Boolean}
 */
const shouldIWearAJacket1 = evaluate(isCold, data);
const shouldIWearATShirt1 = evaluate(isWarm, data);

console.log(shouldIWearAJacket1); // true
console.log(shouldIWearATShirt1); // false

/**
 * Explanation
 *
 * @type {String}
 */
const shouldIWearAJacket2 = explain(isCold, data);
const shouldIWearATShirt2 = explain(isWarm, data);

console.log(shouldIWearAJacket2); // (@temperature->45 lessThan 55)
console.log(shouldIWearATShirt2); // NOT (@temperature->45 lessThan 55)
