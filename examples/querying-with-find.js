import { and, find } from 'regent';

// Rule(s)
const isRaining = { left: '@precipitation', fn: 'includes', right: 'rain' };
const isSnowing = { left: '@precipitation', fn: 'includes', right: 'snow' };
const isClear = { left: '@cloudCoverPercent', fn: 'lessThan', right: 35 };
const isAfterSunrise = { left: '@time', fn: 'greaterThan', right: '@localSunrise' };
const isBeforeSunset = { left: '@time', fn: 'lessThan', right: '@localSunset' };
const daytime = and(isAfterSunrise, isBeforeSunset);
const always = { left: 1, fn: 'equals', right: 1 };

// Data
const data = {
  precipitation: [],
  time: 1200,
  localSunrise: 600,
  localSunset: 2000,
  cloudCoverPercent: 20,
};

// Logic table
const eyewearLogicTable = [
  { item: 'Ski goggles', rule: isSnowing },
  { item: 'Swim goggles', rule: isRaining },
  { item: 'Sunglasses', rule: and(isClear, daytime) },
  { item: 'Nothing', rule: always }
]

/**
 * This query will return the sunglasses row, because the isClear and daytime
 * rules both return true.
 * 
 * Note that find only returns the first valid row. In this table we have a "nothing"
 * condition that will always be true, but is not returned because the sunglasses row
 * matches.
 *
 */
const correctEyewareChoice = find(eyewearLogicTable, data); // { item: 'Sunglasses', rule: [...] },
