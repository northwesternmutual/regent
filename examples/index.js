/* eslint-disable */

import regent from '../lib/regent.js';

// initialize (crown) your regent
const { findFirst, findAll, rule, and, not } = regent.init();

// define your data set
const data = {
  name: 'Batman',
  canFly: false,
  attributes: {
    strength: 84,
    speed: 73,
  },
  wearingSuit: true,
};

// define your rules
const wearingSuit = { key: 'wearingSuit', fn: 'equals', params: [true] };

// check a simple rule
const actLikeBatman = rule(data, wearingSuit) /* ? */ // true
// returns true


// Define another rule
const strongEnoughToFightJoker = { key: 'attributes.strength', fn: 'greaterThan', params: ['80'] };

// Create a composed rule
const shouldFightJoker = and([strongEnoughToFightJoker, wearingSuit]);

// Create a not rules
const notWearingSuit = not(wearingSuit);

// create a logic array
const actionToTake = [
  { action: 'Fight Joker', rules: [shouldFightJoker] },
  { action: 'Go find suit', rules: [notWearingSuit] },
];

const action = findFirst(data, actionToTake)
  .action; /* ? */ // Fight Joker


// findAll
actionToTake.push({ action: 'Deliver witty one-liner', rules: [wearingSuit, strongEnoughToFightJoker] });

const actions = findAll(data, actionToTake)
  .map(item => item.action) /* ? */ // [ 'Fight Joker', 'Deliver witty one-liner ]

