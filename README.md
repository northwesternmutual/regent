# Regent: A JavaScript Rule Engine

Regent provides a lightweight framework aimed at helping you organize your application's business logic.

# Quick Start

## Installing

`npm install --save regent`

## Implementing Your First Rule

Our first rule will tell us if we need an umbrella. This is easy to identify in real life - if it is raining, we need an umbrella. 

### Importing Regent

To write our rule, we'll want to import a couple things from regent. 

```javascript
import regent, { constants } from 'regent';
```

The default import (`regent`) gives us the ability to compose and query rules. The `constants` named import gives us access to a handful of rule predicate names.

### Writing a rule

With our imports in hand, we can now create a rule to determine if it is raining.

```javascript
const isRaining = { key: 'isRaining', fn: constants.equals, params: [true] };
```

This rule tells Regent to compare the key `isRaining`, using the `equals` predicate, to the value `true`. 

### Evaluating the rule

We can now use our `regent` instance to verify the rule against some weather data. 

```javascript
const weatherData = {
  isRaining: true,
};

const doINeedAnUmbrella = regent.evaluate(weatherData, isRaining); // true
```

### Composing a better rule

Umbrellas don't work well when it is windy. Let's make our rule better - we only need an umbrella if it is raining, and there is not much wind.

We'll start by adding a second rule - `isCalm`. We'll define "calm" as having speeds under 15mph.

```javascript
const isCalm = { key: 'windSpeedInMph', fn: constants.lessThan, 15 };
```

This rule tells Regent to compare the key `windSpeedInMph`, using the `lessThan` predicate, to the value `15`.

We can now compose our two rules into one. We'll be using the `and` composition function.

```javascript
const isRainingAndCalm = regent.and(isRaining, isCalm);
```

### Evaluating the better rule

We can use our `regent` instance again to verify our improved rule for determining if we need an umbrella.

```javascript
const weatherData = {
  isRaining: true,
  windSpeedInMph: 20,
};

const doINeedAnUmbrella = regent.evaluate(weatherData, isRainingAndCalm); // false
```


....


## How rules work
### The structure of a rule
### What predicates do
### Composing rules
### Querying rules

## A more thorough example
(similar to https://github.nml.com/nm/regent-private/blob/release/2.0/examples/index.js)

# Advanced

## Custom Predicates
### Crowning the regent
### Writing a predicate

## Troubleshooting
### explain
### any other tips?

# API Reference
## Initialization
### init/crown

## Rules
### key
### fn
### params

## Predicates
### dateAfterInclusive
### dateBeforeInclusive
### deepEquals
### empty
### equals
### greaterThan
### includes
### lessThan
### match
### regex
### typeOf

## Composition
### and
### not
### or

## Queries
### evaluate
### explain
### find
### filter

# Examples
## Node-cli-game

# Why?


