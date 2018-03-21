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

A rule is an object with three properties: `left`, `fn`, and `right`. The `left` property points at a field in the data to evaluate, `fn` tells the rule which predicate to use for evaluation, and `right` provides a list of values to compare to. Our `isRaining` rule would look like this:

```javascript
const isRaining = { left: '@isRaining', fn: constants.equals, right: true };
```

This rule tells Regent to compare the left `isRaining`, using the `equals` predicate, to the value `true`. You can read more about [how rules work](#how-rules-work), or [the available predicates](#predicates).

__note: The `@` preceding `isRaining` tells regent that this value is a path to the property in your data object. You can use the `@` symbol in the left or right properties. If you need a literal `@`, you can escape the character with another:  `right: '@@twitterHandle'`__

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
const isCalm = { left: '@windSpeedInMph', fn: constants.lessThan, 15 };
```

This rule tells Regent to compare the property `windSpeedInMph`, using the `lessThan` predicate, to the value `15`.

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

Regent is based on defining rules. A rule is an object with three properties on it: `left`, `fn`, and `right`. Here's an example of a rule:

```javascript
const isRaining = { left: '@isRaining', fn: constants.equals, right: true };
```

#### left

The `left` property represents the left side of our predicate. In the above example the `@` character means this value will be looked up in our data object. The `left` property usually contains an `@`, but there is no reason it couldn't also be a constant.

Regent uses `lodash.get` to evaluate strings representing fully qualified object paths. This means you can navigate deep into the data structure for your rule, like this:

```javascript
const tomorrowsRecordHighIsRecent = { left: '@forecast[0].records.high.year', fn: 'greaterThan', right: 2010};

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

Please visit [the Lodash docs](https://lodash.com/docs/4.17.4#get) for more information on how lookup properties are evaluated.

#### fn

`fn` represents our predicate. Regent ships with 10 built-in predicates, and supports custom predicates. In our above example we are using `equals`, which checks strict equality between the `left` and `right` value.

Regent's built in predicates are:

`dateAfterInclusive`, `dateBeforeInclusive`, `deepEquals`, `empty`, `equals`, `greaterThan`, `includes`, `lessThan`, `regex`, `typeOf`

You can learn more about predicates in the [Predicates](#predicates) section of the docs.

#### right

The `right` property represents the right side of our predicate. The right property is usually a constant, but it can also use the `@` symbol to reference a value in the data object.

### What predicates do

Predicates define how we are comparing the left and right values. Here are a few quick examples.

##### equals
`left === right`

##### lessThan
`left < right`

##### typeOf
`typeof left === right`

For full documentation of all our built in predicates please visit the [Predicates](#predicates) section of the docs.

### Composing rules

With Regent, it is best to define your rules as granular as possible, and use our composition helpers to build them up into more complex pieces. Regent provides three helpers to help you with this pattern.

#### and

A rule composed with `and` will return true if every rule inside the composed rule returns true.

```javascript
const isRaining = { left: '@isRaining', fn: constants.equals, right: true };
const isWindy = { left: '@windSpeedInMph', fn: constants.greaterThan, 15 };
const isCold = { left: '@temperature', fn: constants.lessThan, 40 };

const awfulDayToGoOutside = and(isRaining, isWindy, isCold);
```

In this example, `awfulDayToGoOutside` will return true if `data.isRaining` is true, `data.windSpeedInMph` is greater than 15, and `data.temperature` is less than 40.

#### or

A rule composed with `or` will return true if any of the rules returns true.

```javascript
const isRaining = { left: '@isRaining', fn: constants.equals, right: true };
const isCold = { left: '@temperature', fn: constants.lessThan, 40 };

const iNeedAJacket = or(isRaining, isCold);
```

In this example, `iNeedAJacket` will return true if `data.isRaining` is true, or `data.temperature` is less than 40.

#### not

`not` isn't really a composed rule, but rather an inverted one. A rule created with the `not` helper will return true if the passed in rule returns false, and vice versa.

```javascript
const isCold = { left: '@temperature', fn: constants.lessThan, 40 };
const isWarm = not(isCold);
```

In this example, `isWarm` will return true if `isCold` returns false.

#### Manual composition

A composed rule can be written without the use of the `and`, `or`, and `not` helper methods. Let's look at that `not` rule from the last example.

```javascript
const isRaining = { left: '@isRaining', fn: constants.equals, right: true };
const isWindy = { left: '@windSpeedInMph', fn: constants.greaterThan, 15 };
const isCold = { left: '@temperature', fn: constants.lessThan, 40 };

const awfulDayToGoOutside = {
  compose: 'and',
  rules: [
    isRaining,
    isWindy,
    isCold
  ]
};
```

When you use `and`, `or`, or `not` they are just helping you prepare this composed object.

### Querying rules



## A more thorough example

```javascript
import { evaluate, and, or, explain, not, filter } from '../lib/regent.min';

// An example of using Regent without custom predicates

const data = {
  precipitation: ['rain'],
  temperature: 78,
};

const IS_RAINING = { left: '@precipitation', fn: 'includes', right: 'rain' };
const NOT_RAINING = not(IS_RAINING);
const IS_SNOWING = { left: '@precipitation', fn: 'includes', right: 'snow' };
const NOT_SNOWING = not(IS_SNOWING);
const IS_COLD = { left: '@temperature', fn: 'lessThan', right: 75 };
const IS_WARM = not(IS_COLD);
const NO_PRECIPITATION = and(NOT_RAINING, NOT_SNOWING);

const SHOULD_WEAR_COAT = or(IS_RAINING, IS_SNOWING, IS_COLD);

evaluate(data, SHOULD_WEAR_COAT); // true
explain(SHOULD_WEAR_COAT, data); // =>
// ​​​​​((@precipitation->["rain"] includes "rain") or (@precipitation->["rain"] includes "snow") or (@temperature->78 lessThan 75))​​​​​

const clothingLogic = [
  { value: ['hat', 'scarf', 'boots'], rules: [IS_COLD] },
  { value: ['sandals', 't-shirt'], rules: [IS_WARM] },
  { value: ['sunglasses'], rules: [NO_PRECIPITATION] },
  { value: ['umbrella'], rules: [IS_RAINING] },
];

const myClothing = filter(data, clothingLogic);
const clothing = myClothing.reduce((acc, row) => (
  acc.concat(row.value)
), []);

console.log(clothing); // ['sandals', 't-shirt', 'umbrella']
```

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


