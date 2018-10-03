/* eslint-disable */
const Benchmark = require('benchmark');
const regent = require('../lib/regent.js');

const regentFilter = new Benchmark.Suite();

const GREATER_THAN = { left: '@number', fn: 'greaterThan', right: 10 };
const LESS_THAN = { left: '@number', fn: 'lessThan', right: 100 };
const BETWEEN = regent.and(GREATER_THAN, LESS_THAN);

const GREATER_THAN_FUNCTION = data => data.number > 10;
const LESS_THAN_FUNCTION = data => data.number < 100;
const BETWEEN_FUNCTION = data => GREATER_THAN_FUNCTION(data) && LESS_THAN_FUNCTION(data);

const logic = [
  { value: 'loser', rule: regent.not(LESS_THAN) },
  { value: 'loser', rule: regent.not(GREATER_THAN) },
  { value: 'loser', rule: regent.not(BETWEEN) },
  { value: 'winner', rule: BETWEEN },
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
      case regent.evaluate(regent.not(LESS_THAN), data):
        return 'loser';

      case regent.evaluate(regent.not(GREATER_THAN), data):
        return 'loser';

      case regent.evaluate(regent.not(BETWEEN), data):
        return 'loser';

      case regent.evaluate(BETWEEN, data):
        return 'winner';

      default:
        return null;
    }
  })
  .add('Switch Statement using pure functions', () => {
    switch (true) {
      case !LESS_THAN_FUNCTION(data):
        return 'loser';

      case !GREATER_THAN_FUNCTION(data):
        return 'loser';

      case !BETWEEN_FUNCTION(data):
        return 'loser';

      case (BETWEEN_FUNCTION(data)):
        return 'winner';

      default:
        return null;
    }
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .run({ async: true });
