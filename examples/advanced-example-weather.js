import regent, { constants } from 'regent';
import isMatch from 'lodash.ismatch';

//------------------------------------------------------------------------------
// Custom Predicates
//------------------------------------------------------------------------------

const isDaytime = str => true;

/**
 * Determines if the next number in an array has decreased.
 *
 * @param  {Array}   arr  Array of 2 or more Numbers.
 * @return {Boolean}      Returns true if the first number in the array
 *                        is more than the last, otherwise false.
 */
const isDecreasing = arr => arr[0] > arr[arr.length - 1];

// Define/combine customization(s)
const customPredicates = { isMatch, isDecreasing };

// Initialize and immediately destructure.
const { and, or, xor, not, evaluate, explain, filter, find } = regent.init(customPredicates);

//------------------------------------------------------------------------------
// Rule(s)
//------------------------------------------------------------------------------

// Precipitation rule(s)
const isRaining = { left: '@weather.precipitation', fn: constants.includes, right: 'rain' };
const isSleeting = { left: '@weather.precipitation', fn: constants.includes, right: 'sleet' };
const isSnowing = { left: '@weather.precipitation', fn: constants.includes, right: 'snow' };
const isPrecipitationLiquid = { left: '@weather.precipitationTypes.liquid', fn: 'isMatch', right: '@weather.precipitation' };
const isPrecipitating = or(isRaining, isSleeting, isSnowing);

// Time rules(s)
const isDay = { left: '@datetime.current', fn: 'isDaytime' };
const isNight = not(isDay);
const isBeforeOpeningWeek = { left: '@datetime.openingWeek[0]', fn: constants.dateBeforeInclusive, right: '@datetime.current' };
const isAfterOpeningWeek = { left: '@datetime.openingWeek[1]', fn: constants.dateAfterInclusive, right: '@datetime.current' };
const isDuringOpeningWeek = not(isBeforeOpeningWeek, isAfterOpeningWeek);

// Sky rule(s)
const isSunny = { left: '@weather.sky', fn: 'includes', right: 'sun' };
const isOvercast = not(isSunny);
const isCloudy = { left: '@weather.sky', fn: 'includes', right: 'clouds' };
const isPartlyCloudy = and(isSunny, isCloudy);

// Temperature rule(s)
const isCold = { left: '@weather.temperature.current', fn: constants.lessThan, right: 23 };
const isHot = { left: '@weather.temperature.current', fn: constants.greaterThan, right: 37 };
const isTemperatureDropping = { left: '@weather.temperature.daily', fn: 'isDecreasing' };
const isWarm = and(not(isCold), not(isHot));

// Wind rule(s)
const isWindy = { left: '@weather.wind.mph', fn: constants.greaterThan, right: 15 };

// Other
const isBadDayToRide = { compose: 'or', rules: [isPrecipitationLiquid, isDuringOpeningWeek, isWindy] };

// Data
const data = {
  datetime: {
    current: 'Mon, 25 Dec 1995 13:30:00 +0430',
    openingWeek: ['Mon, 25 Dec 1995 13:30:00 +0430', 'Mon, 25 Dec 1995 13:30:00 +0430'],
  },
  weather: {
    precipitation: {
      snow: 'snow',
    },
    precipitationTypes: {
      liquid: {
        rain: 'rain',
      },
      solid: {
        sleet: 'sleet',
        snow: 'snow',
      },
    },
    sky: {
      clouds: 'clouds',
      sun: 'sun',
    },
    temperature: {
      current: 27,
      daily: [29, 27],
    },
    wind: {
      direction: 'W',
      mph: 5,
    },
  },
};

// Logic table
const underLayerLogicTable = [
  { rule: isCold, value: ['fleece', 'longsleeve', 'leggings', 'fleece-pants', 'thick socks'] },
  { rule: isWarm, value: ['sweatshirt', 'shortsleeve', 'leggings', 'regular socks'] },
  { rule: isHot, value: ['shortsleeve', 'thin socks'] },
];

const outerLayerLogicTable = [
  { rule: isRaining, value: ['goretex gloves', 'goretex jacket', 'goretex snowpants', 'boots'] },
  { rule: isSleeting, value: ['goretex gloves', 'goretex jacket', 'goretex snowpants', 'boots'] },
  { rule: isSnowing, value: ['gloves', 'jacket', 'snowpants', 'boots'] },
];

const layersLogicTable = [...underLayerLogicTable, ...outerLayerLogicTable];

const accessoriesLogicTable = [
  { rule: isPrecipitating, value: ['goggles'] },
  { rule: and(isSunny, not(isPrecipitating)), value: ['sunglasses'] },
  { rule: isNight, value: ['clear lense'] },
  { rule: isSunny, value: ['high uv lense', 'chapstick'] },
  { rule: isOvercast, value: ['medium uv lense'] },
  { rule: isCloudy, value: ['low uv lense'] },
  { rule: isPartlyCloudy, value: ['medium uv lense'] },
  { rule: isCold, value: ['helmet', 'balaclava', 'scarf'] },
  { rule: isWarm, value: ['helmet', 'scarf'] },
  { rule: isHot, value: ['helmet'] },
  { rule: and(isCold, isTemperatureDropping), value: ['mittens', 'hand warmers'] },
];

// Querying
const layers = filter(layersLogicTable, data).reduce((acc, row) => [...acc, ...row.value], []);
const accessories = filter(accessoriesLogicTable, data).reduce((acc, row) => [...acc, ...row.value], []);

console.log(layers);
console.log(accessories);
console.log(evaluate(isBadDayToRide));
console.log(explain(isBadDayToRide));
