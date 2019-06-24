/* eslint-disable */
const Benchmark = require('benchmark');
const regent = require('../lib/regent.js');

const regentFilter = new Benchmark.Suite();

const GREATER_THAN_10 = { left: '@number', fn: 'greaterThan', right: 10 };
const LESS_THAN_100 = { left: '@number', fn: 'lessThan', right: 100 };
const BETWEEN_10_AND_100 = regent.and(GREATER_THAN_10, LESS_THAN_100);

const GREATER_THAN_10_FUNCTION = data => data.number > 10;
const LESS_THAN_100_FUNCTION = data => data.number < 100;
const BETWEEN_10_AND_100_FUNCTION = data => GREATER_THAN_10_FUNCTION(data) && LESS_THAN_100_FUNCTION(data);

const logic = [
  { value: 'loser', rule: regent.not(LESS_THAN_100) },
  { value: 'loser', rule: regent.not(GREATER_THAN_10) },
  { value: 'loser', rule: regent.not(BETWEEN_10_AND_100) },
  { value: 'winner', rule: BETWEEN_10_AND_100 },
];

const data = {
  number: 42,
};

// add tests
regentFilter
  .add('Regent.find', () => {
    regent.find(logic, data);
  })
  .add('Switch Statement using Regent.evaluate', () => {
    switch (true) {
      case regent.evaluate(regent.not(LESS_THAN_100), data):
        return 'loser';

      case regent.evaluate(regent.not(GREATER_THAN_10), data):
        return 'loser';

      case regent.evaluate(regent.not(BETWEEN_10_AND_100), data):
        return 'loser';

      case regent.evaluate(BETWEEN_10_AND_100, data):
        return 'winner';

      default:
        return null;
    }
  })
  .add('Switch Statement using pure functions', () => {
    switch (true) {
      case !LESS_THAN_100_FUNCTION(data):
        return 'loser';

      case !GREATER_THAN_10_FUNCTION(data):
        return 'loser';

      case !BETWEEN_10_AND_100_FUNCTION(data):
        return 'loser';

      case (BETWEEN_10_AND_100_FUNCTION(data)):
        return 'winner';

      default:
        return null;
    }
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .run({ async: true });
