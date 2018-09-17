import { xor, evaluate, explain } from 'regent';

// Rule(s)
const isRaining = { left: '@isRaining', fn: 'equals', right: true };
const hasUmbrella = { left: '@hasUmbrella', fn: 'equals', right: true };
const isWaterproof = xor(isRaining, hasUmbrella);

// Data
const data = { isRaining: false, hasUmbrella: false };

/**
 * Evaluation
 *
 * @type {Boolean}
 */
const isSmart1 = evaluate(isWaterproof, data);

console.log(isSmart1); // true

/**
 * Explanation
 *
 * @type {String}
 */
const isSmart2 = explain(isWaterproof, data);

console.log(isSmart2); // (("@isRaining" equals true) xor ("@hasUmbrella" equals true))
