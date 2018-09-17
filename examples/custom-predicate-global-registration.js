/**
 * Registering custom predicates globally enables sharing
 * when leveraging module importing and exporting.
 */
import regent from 'regent';
import isPerson from './isPerson'; // Example custom predicate
import isPlace from './isPlace'; // Example custom predicate

// Define/combine customization(s)
const customPredicates = { isPerson, isPlace };

/**
 * From here we can use `init` 2 different ways:
 */
// 1: Initialize and immediately destructure
const { evaluate } = regent.init(customPredicates); // eslint-disable-line no-unused-vars
// (evaluations go here...)

// 2: Initialize and export module
export default regent.init(customPredicates);
