import { evaluate, explain } from 'regent';

/**
 * Example custom predicate
 *
 * @param  {String}  str  The left argument of a Regent rule.
 * @return {Boolean}      True if left deep equals 'Mike', otherwise false.
 */
const equalsMike = str => str === 'Mike';

// Rules(s)
const isFirstNameMike = { left: '@firstName', fn: 'equalsMike' };

// Data
const data = { firstName: 'Mike' };

/**
 * Evaluation
 *
 * We need to tell Regent about `equalsMike`,
 * so we provide an object as the third parameter.
 * Registering custom predicates as a query argument
 * is handy for querying isolated rules.
 *
 * @type {Boolean}
 */
const isMike1 = evaluate(isFirstNameMike, data, { equalsMike });

console.log(isMike1); // true

/**
 * Explanation
 *
 * No need to tell Regent about `customPredicates` when using `explain`.
 *
 * @type {String}
 */
const isMike2 = explain(isFirstNameMike, data);

console.log(isMike2); // (@firstName->"Mike" equalsMike)
