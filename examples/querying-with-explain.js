import { or, explain } from 'regent';

// Rule(s)
const isRaining = { left: '@precipitation', fn: 'includes', right: 'rain' };
const isSnowing = { left: '@precipitation', fn: 'includes', right: 'snow' };
const hasPrecipitation = or(isRaining, isSnowing);

// Data
const data = { precipitation: ['sleet', 'hail'] };

/**
 * Explanation
 *
 * Visualization with single argument...
 *
 * @type {String}
 */
const isUmbrellaNeeded1 = explain(hasPrecipitation);

console.log(isUmbrellaNeeded1); // ((@precipitation includes "rain") or (@precipitation includes "snow"))

/**
 * Explanation
 *
 * Visualization with both arguments...
 *
 * @type {String}
 */
const isUmbrellaNeeded2 = explain(hasPrecipitation, data);

console.log(isUmbrellaNeeded2); // ((@precipitation->["sleet","hail"] includes "rain") or (@precipitation->["sleet","hail"] includes "snow"))
