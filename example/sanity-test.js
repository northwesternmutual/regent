"use strict";
exports.__esModule = true;
var regent_1 = require("../dist/regent");
var not_1 = require("../src/functions/not");
var FOO_IS_BAR = (0, regent_1.equals)('@foo', 'bar');
var BIZ_GT_13 = (0, regent_1.greaterThan)('@biz', 13);
var BAR_AND_GREATER = (0, regent_1.and)(FOO_IS_BAR, BIZ_GT_13);
var EITHER_OR_RULE = (0, regent_1.or)(FOO_IS_BAR, BIZ_GT_13);
var EITHER_XOR_RULE = (0, regent_1.xor)(FOO_IS_BAR, BIZ_GT_13);
// In this rule the `__` refers to the current iteration of the `thisWeek` array
var IS_SUNNY = (0, regent_1.equals)('@__.weatherType', 'sunny');
var NEXT_THREE_DAYS_ARE_SUNNY = (0, regent_1.every)('@thisWeek', IS_SUNNY, '__');
var MIGHT_RAIN = (0, regent_1.equals)('@~~.rain', true);
var CHANCE_OF_RAIN = (0, regent_1.some)('@thisWeek', MIGHT_RAIN, '~~');
var weatherData = {
    thisWeek: [
        { weatherType: 'sunny', rain: true },
        { weatherType: 'sunny', rain: false },
        { weatherType: 'sunny', rain: false }
    ]
};
var data = {
    foo: 'bar',
    biz: 42
};
var LOGIC = [
    { rule: FOO_IS_BAR, text: 'all' },
    { rule: BIZ_GT_13, text: 'good!' },
    { rule: (0, not_1["default"])(FOO_IS_BAR), text: 'nope' }
];
console.log(FOO_IS_BAR.toJson());
// ========== THUMBS UP TIME ============= //
console.log('FILTER:', (0, regent_1.filter)(LOGIC, data)
    .map(function (x) { return x.text; })
    .join(' ') === 'all good!'
    ? '👍'
    : '👎');
console.log('EQUALS:', FOO_IS_BAR(data) ? '👍' : '👎');
console.log('GREATER_THAN:', BAR_AND_GREATER(data) ? '👍' : '👎');
console.log('OR:', EITHER_OR_RULE(data) ? '👍' : '👎');
console.log('XOR:', EITHER_XOR_RULE(data) ? '👎' : '👍');
console.log('EVERY:', NEXT_THREE_DAYS_ARE_SUNNY(weatherData) ? '👍' : '👎');
console.log('SOME && CUSTOM CONTEXT:', CHANCE_OF_RAIN(weatherData) ? '👍' : '👎');
console.log('TO_JSON', FOO_IS_BAR.toJson() === '{"equals":["@foo","bar"]}' ? '👍' : '👎');
