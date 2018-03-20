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

A rule is an object with three properties: `key`, `fn`, and `params`. The `key` property points at a field in the data to evaluate, `fn` tells the rule which predicate to use for evaluation, and `params` provides a list of values to compare to. Our `isRaining` rule would look like this:

```javascript
const isRaining = { key: 'isRaining', fn: constants.equals, params: [true] };
```

This rule tells Regent to compare the key `isRaining`, using the `equals` predicate, to the value `true`. You can read more about [how rules work](#how-rules-work), or [the available predicates](#predicates).

### Evaluating the rule

We can now use the `evaluate` function on our `regent` instance to verify the rule against some weather data. To read about more ways to query rules, see the [Queries](#queries) section.

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

You can learn more about rule composition in the [Composition](#composition) section of the docs.

### Evaluating the better rule

We can use our `regent` instance again to verify our improved rule for determining if we need an umbrella.

```javascript
const weatherData = {
  isRaining: true,
  windSpeedInMph: 20,
};

const doINeedAnUmbrella = regent.evaluate(weatherData, isRainingAndCalm); // false
```

## How rules work

### The structure of a rule

Regent is based on defining rules. A rule is an object with three properties on it: `key`, `fn`, and `params`. Here's an example of a rule:

```javascript
TODO
```

#### key

The `key` property represents the path to a piece of data in your data object. In the previous example, you would expect to find the needed data on a top level property named `TODO`.

Regent uses `lodash.get` to evaluate strings representing fully qualified object paths. This means you can navigate deep into the data structure for your rule, like this:

```javascript
const tomorrowsRecordHighIsRecent = { key: 'forecast[0].records.high.year', fn: 'greaterThan', params: [2010]};

const data = {
  forecast: [
    {
      day: 'Monday',
      high: 65,
      low: 32,
      records: {
        low: {
          temperature: 10,
          year: 1905
        },
        high: {
          temperature: 89,
          year: 2017
        }
      }
    }
  ]
};
```

Please visit [the Lodash docs](https://lodash.com/docs/4.17.4#get) for more information on how the `key` property of a rule is evaluated. 

#### fn

#### params

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


