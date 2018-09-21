import { evaluate, explain } from 'regent';

/**
 * Example custom predicate
 *
 * The Lodash method `isMatch` will perform a partial deep comparison
 * between the object passed in the `left` property
 * with the object passed in the `right` property
 * to determine if it contains equivalent property values.
 *
 * @link https://lodash.com/docs/#isMatch
 */
import isMatch from 'lodash.ismatch';

// Rule(s)
const isPrecipitationSolid = {
  left: '@precipitationTypes.solid',
  fn: 'isMatch',
  right: '@currentPrecipitation',
};

// Data
const data = {
  currentPrecipitation: {
    snow: 'snow',
  },
  precipitationTypes: {
    liquid: {
      rain: 'rain',
    },
    solid: {
      hail: 'hail',
      sleet: 'sleet',
      snow: 'snow',
    },
  },
};

/**
 * Evaluation
 *
 * We need to tell Regent about `isMatch`,
 * so we provide an object as the third parameter.
 *
 * @type {Boolean}
 */
const isWinterWeather1 = evaluate(isPrecipitationSolid, data, { isMatch });

console.log(isWinterWeather1); // true

/**
 * Explanation
 *
 * No need to tell Regent about `isMatch` when using `explain`.
 *
 * @type {String}
 */
const isWinterWeather2 = explain(isPrecipitationSolid, data);

console.log(isWinterWeather2); // (@precipitationTypes.solid->{"hail":"hail","sleet":"sleet","snow":"snow"} isMatch @currentPrecipitation->{"snow":"snow"})
