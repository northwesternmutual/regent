/* eslint-disable */

import regent from 'regent';

const { findFirst, or, and, not } = regent.init();

// define your project rules
export const isHuman = { key: 'species', fn: 'equals', params: ['human'] };
export const isDog = { key: 'species', fn: 'equals', params: ['canine'] };
export const olderThan30 = { key: 'vitals.age', fn: 'greaterThan', params: [30] };

// an example of an or relationship
export const humanOrDog = or([isHuman, isDog]);

// an example of an and relationship
export const humanOver30 = and([isHuman, olderThan30]);

// an example of a negative rule
export const notHuman = not(isHuman);

// define a logic table, basically an array of objects
// each object needs a rules key, with an array of valid rules
const logic = [
  { greeting: 'Welcome human!', rules: [isHuman] },
  { greeting: 'Aarf!', rules: [isDog] },
  { greeting: 'Hello sir.', rules: [humanOver30] },
];

// you can now use jaRule to get the proper
// greeting given a data object.
const data = {
  species: 'human',
  vitals: {
    age: 34,
  },
};

const appropriateGreeting = findFirst(data, logic).greeting; // "Hello sir."

const dogData = {
  species: 'dog',
};

const dogGreeting = findFirst(data, logic).greeting; // "Aarf!"
