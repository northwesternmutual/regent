# Regent: A JavaScript Rule Engine

Regent provides a lightweight framework aimed at helping you organize your application's business logic.

## Table of Contents

* [Quick Start](#quick-start)
* [How Rules Work](#how-rules-work)
* [Querying Rules](#querying-rules)
* [Custom Predicates](#custom-predicates)
* [Troubleshooting](#troubleshooting)
* [Initialization](#initialization)
* [Predicates](#predicates)
* [Composition](#composition)
* [Queries](#queries)
* [Examples](#examples)

# Quick Start

## Installing

`npm install --save regent`

## Implementing Your First Rule

Our first rule will tell us if we need an umbrella. This is easy to identify in real life - if it is raining, we need an umbrella.

### Importing Regent

To write our rule, we'll want to import regent.

```javascript
import regent from 'regent';
```

The default import (`regent`) gives us the ability to compose and query rules.

### Writing a rule

Let's create a rule to determine if it is raining.

A rule is an object with three properties: `left`, `fn`, and `right`. Think of `left` and `right` as two sides of an equation, with `fn` being the operator. The `fn` property tells regent which predicate to use for evaluation. Our `isRaining` rule will look like this:

```javascript
const isRaining = { left: '@isRaining', fn: 'equals', right: true };
```

This rule tells Regent to compare the left `isRaining`, using the `equals` predicate, to the value `true`. You can read more about [how rules work](#how-rules-work), or [the available predicates](#predicates).

_NOTE: The `@` preceding `isRaining` tells regent that this value is a path to the property in your data object. You can use the `@` symbol in the left or right properties. If you need a literal `@`, you can escape the character with another:  `right: '@@twitterHandle'`_

### Evaluating the rule

We can now use Regent's `evaluate` function to verify the rule against some weather data. To read about more ways to query rules, see the [Queries](#queries) section.

```javascript
const weatherData = {
  isRaining: true,
};

const doINeedAnUmbrella = regent.evaluate(isRaining, weatherData); // true
```

### Composing a better rule

Umbrellas don't work well when it is windy. Let's make our rule better - we only need an umbrella if it is raining, and there is not much wind.

We'll start by adding a second rule - `isCalm`. We'll define "calm" as having wind speeds under 15mph.

```javascript
const isCalm = { left: '@windSpeedInMph', fn: 'lessThan', 15 };
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
const isRaining = { left: '@isRaining', fn: 'equals', right: true };
```

#### left

The `left` property represents the left side of our predicate. In the above example the `@` character means this value will be looked up in our data object.

When you specify a lookup value with an `@` Regent uses `lodash.get` to evaluate strings representing fully qualified object paths. This means you can navigate deep into the data structure for your rule, like this:

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

Both `left` and `right` support lookup values. Please visit [the Lodash docs](https://lodash.com/docs/4.17.4#get) for more information on how lookup properties are evaluated.

#### fn

`fn` represents our predicate. Regent ships with 10 built-in predicates, and also supports custom predicates. In our above example we are using `equals`, which checks strict equality between the `left` and `right` value.

Regent's built in predicates are:

`dateAfterInclusive`, `dateBeforeInclusive`, `deepEquals`, `empty`, `equals`, `greaterThan`, `includes`, `lessThan`, `regex`, `typeOf`

You can learn more about predicates in the [Predicates](#predicates) section of the docs.

#### right

The `right` property represents the right side of our predicate.

### What do predicates do?

Predicates define how we are comparing the left and right values. Here are a few quick examples.

##### equals
`left === right`

##### lessThan
`left < right`

##### typeOf
`typeof left === right`

For full documentation of all our built in predicates please visit the [Predicates](#predicates) section of the docs.

### Composing rules

With Regent, it is best to define your rules as granular as possible, and use our composition helpers to build them up into more complex pieces. Regent provides three helper functions to help you with this pattern.

#### and

A rule composed with `and` will return true if every rule inside the composed rule returns true.

```javascript
const isRaining = { left: '@isRaining', fn: 'equals', right: true };
const isWindy = { left: '@windSpeedInMph', fn: 'greaterThan', 15 };
const isCold = { left: '@temperature', fn: 'lessThan', 40 };

const awfulDayToGoOutside = and(isRaining, isWindy, isCold);
```

In this example, `awfulDayToGoOutside` will return true if `data.isRaining` is true, `data.windSpeedInMph` is greater than 15, and `data.temperature` is less than 40.

#### or

A rule composed with `or` will return true if any of the rules returns true.

```javascript
const isRaining = { left: '@isRaining', fn: 'equals', right: true };
const isCold = { left: '@temperature', fn: 'lessThan', 55 };

const iNeedAJacket = or(isRaining, isCold);
```

In this example, `iNeedAJacket` will return true if `data.isRaining` is true, `data.temperature` is less than 40, or both.

#### not

`not` isn't really a composed rule, but rather an inverted one. A rule created with the `not` helper will return true if the passed in rule returns false, and vice versa.

```javascript
const isCold = { left: '@temperature', fn: 'lessThan', 40 };
const isWarm = not(isCold);
```

In this example, `isWarm` will return true if `isCold` returns false.

#### Manual composition

A composed rule can be written without the use of the `and`, `or`, and `not` helper methods. Let's look at our `awfulDayToGoOutside` rule from an earlier example.

```javascript
const isRaining = { left: '@isRaining', fn: 'equals', right: true };
const isWindy = { left: '@windSpeedInMph', fn: 'greaterThan', 15 };
const isCold = { left: '@temperature', fn: 'lessThan', 40 };

const awfulDayToGoOutside = {
  compose: 'and',
  rules: [
    isRaining,
    isWindy,
    isCold
  ]
};
```

The functions `and`, `or`, or `not` exist only to help you clean up your code by abstracting away this composed rule syntax. They all return an object literal.

## Querying Rules

Regent provides tools that allow you to parse your rules into boolean values

#### Querying with `evaluate`

`evaluate` takes a rule and a data object and returns a boolean value.

`evaluate(regentRule, data, [customPredicates])`

```javascript
const data = {
  temperature: 78,
}

const beachTemperature = { left: '@temperature', fn: 'greaterThan', right: 75 };
evaluate(beachTemperature, data) // true
```

In the above example we are evaluating the rule `beachTemperature` against a data object.

### Querying logic tables

Regent provides two ways to query logic tables. Logic tables are simply an array of objects. Each object in the array must have a property named `rules` which is an array of rules.

```javascript
const clothingLogic = [
  { value: ['hat', 'scarf', 'boots'], rule: IS_COLD },
  { value: ['sandals', 't-shirt'], rule: IS_WARM },
  { value: ['sunglasses'], rule: NO_PRECIPITATION },
  { value: ['umbrella'], rule: IS_RAINING },
];
```

#### Querying with `find`

`find` will iterate over the logic array and return the first item whose rules all return true. `find` will return the entire object. You can think of it like `Array.find()`.

`find(logicArray, data, [customPredicates])`

```javascript
const IS_WARM = { left: '@temperature', fn: 'greaterThan', right: 68 };

const data {
  temperature: 82
};

const clothingLogic = [
  { value: ['hat', 'scarf', 'boots'], rule: IS_COLD },
  { value: ['sandals', 't-shirt'], rule: IS_WARM },
  { value: ['sunglasses'], rule: NO_PRECIPITATION },
  { value: ['umbrella'], rule: IS_RAINING },
];

const clothingItems = find(clothingLogic, data);
// => { value: ['sandals', 't-shirt'], rule: IS_WARM }
```

In the above example the second array item will be returned, because `IS_WARM` returns true. `find` will not continue looking through the following rows.

#### Querying with `filter`

`filter` has the same signature as `find`, but returns an array of all the rows whose rules all return true. You can think of it like `Array.filter()`.

```javascript
const IS_WARM = { left: '@temperature', fn: 'greaterThan', right: 68 };
const IS_RAINING = { left: '@precipitation', fn: 'includes', right: 'rain' };

const data {
  temperature: 82,
  precipitation: ['rain']
};

const clothingLogic = [
  { value: ['hat', 'scarf', 'boots'], rule: IS_COLD },
  { value: ['sandals', 't-shirt'], rule: IS_WARM },
  { value: ['sunglasses'], rule: NO_PRECIPITATION },
  { value: ['umbrella'], rule: IS_RAINING },
];

const clothingItems = filter(clothingLogic, data);
// => [{ value: ['sandals', 't-shirt'], rule: IS_WARM }, { value: ['umbrella'], rule: IS_RAINING }]
```

In the above example `filter` will return an array of all rows whose rules are all true. If there are no matches, `filter` will return an empty array.

## A more thorough example

```javascript
import { evaluate, and, or, not, filter } from '../src/index';

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

evaluate(SHOULD_WEAR_COAT, data); // true

const clothingLogic = [
  { value: ['hat', 'scarf', 'boots'], rule: IS_COLD },
  { value: ['sandals', 't-shirt'], rule: IS_WARM },
  { value: ['sunglasses'], rule: NO_PRECIPITATION },
  { value: ['umbrella'], rule: IS_RAINING },
];

const myClothing = filter(clothingLogic, data);
const clothing = myClothing.reduce((acc, row) => ([
  ...acc,
  ...row.value,
]), []);

console.log(clothing); // ['sandals', 't-shirt', 'umbrella']
```

# Advanced

## Custom Predicates

Regent can be used with custom predicates to handle specific logical expressions that built-in predicates can not. A custom predicate is simply a function that accepts up to two arguments, `left` and `right`, and returns a boolean value.

### A simple custom predicate

```javascript
const nameIsMike = left => left === 'Mike';
```

The arguments are populated by the `left` and `right` properties of the rule definition.

```javascript
const data = {
  firstName: 'Mike'
};

const NAME_IS_MIKE = { left: '@firstName', fn: 'nameIsMike' };
```

In the above example, `@firstname` will be looked up in `data` and passed into our custom predicate. This rule would return true with the provided data.

### Uses for custom predicates

Our first example was a bit simple. Let's take a look at a more practical custom predicate.

```javascript
const temperatureIsRising = (dailyTemperatureArray) => (
  // return true if the first temperature in the array is less
  dailyTemperatureArray[0] < dailyTemperatureArray[dailyTemperatureArray.length - 1]
)
```

This predicate will expect an array in `left` (nothing in `right`) and check that the first value is less than the last.

Other notable use cases of a custom predicate could include custom date formatting, or data manipulation that needs to be done before a logical expression can be expressed.

### Making Regent aware of custom predicates

In order to use custom predicates we need to tell regent that they exist. There are two ways to do that.

#### Registering custom predicates with `regent.init`

The first is to use `regent.init` (aliased to `regent.crown`). `init` takes an optional object of custom predicates and returns the entire api of regent with the custom predicates applied. See the [`init` docs](#init) for more details.

To make the above example work we need to `init` regent with the custom predicate `nameIsMike`.

```javascript
const nameIsMike = left => left === 'Mike';

const customPredicates = {
  nameIsMike
};

const NAME_IS_MIKE = { left: '@firstName', fn: 'nameIsMike' };

const data = {
  firstName: 'Mike'
};

const { evaluate } = regent.init(customPredicates);

evaluate(nameIsMike, data); // true
```

The advantage to using `init` to register your predicates with Regent is that you can evaluate multiple rules with the returned object. This is helpful when you have a large amount of rules to query.

#### Passing custom predicates into queries

The second way to make Regent aware of your custom predicates is to simply pass them into `evaluate`, `find`, or `filter` as an optional third parameter.

```javascript
const nameIsMike = left => left === 'Mike';

const customPredicates = {
  nameIsMike
};

const NAME_IS_MIKE = { left: '@firstName', fn: 'nameIsMike' };

const data = {
  firstName: 'Mike'
};

evaluate(nameIsMike, data, customPredicates); // true
```

The advantage to passing predicates into `evaluate`, `find`, or `filter` is that you don't need to keep the initialized object around. This is handy for querying isolated rules.

You can read the [`evaluate` docs](#evaluate), [`find` docs](#find), or [`filter` docs](#filter) for more information.

## Troubleshooting
### explain

`explain` was built to help a developer visualize their logic. Because we are defining small rules and composing them together, a rule abstracts away the actual logic check. Running the rule through explain returns the logic in a human readable form. Check out this example.

```javascript
const IS_RAINING = { left: '@precipitation', fn: 'includes', right: 'snow' };
const IS_SNOWING = { left: '@precipitation', fn: 'includes', right: 'snow' };
const PRECIPITATION = and(IS_RAINING, IS_SNOWING);

explain(PRECIPITATION)
// => ​​​​​((@precipitation includes "snow") and (@precipitation includes "snow"))​​​​​
```

`explain` also accepts an optional data object as a second argument. When provided explain will show the actual values of the lookup keys in the explanation.

```javascript
const IS_RAINING = { left: '@precipitation', fn: 'includes', right: 'snow' };
const IS_SNOWING = { left: '@precipitation', fn: 'includes', right: 'snow' };
const PRECIPITATION = and(IS_RAINING, IS_SNOWING);

const data = {
  precipitation: ['sleet', 'hail']
};

explain(PRECIPITATION, data)
// => ​​​​​((@precipitation->["sleet","hail"] includes "snow") and (@precipitation->["sleet","hail"] includes "snow"))
```

# API Reference
## Initialization

### init
`init` accepts an optional object of custom predicates, and returns the full regent api, with the knowledge of the custom predicates. The custom predicate property keys will become the reference strings to each custom predicate. The value of each property should be a function that accepts up to two arguments, and returns a boolean value.

`init([customPredicates])`

```javascript
const customPredicates = {
  isANumber: val => typeof val === 'number'
};

const Regent = regent.init(customPredicates);

// We now can write a rule using `isANumber` as the fn value
const ageIsANumber = { left: '@age', fn: 'isANumber' };
```

### crown
An alias of init, sticking with the regent theme.

## Predicates

### constants

Regent exports an object named `constants` that contains the names of all built-in predicates. This object can be used to help avoid misspelled predicates in rules.

```javascript
import regent, { constants } from 'regent';

const isRaining = { left: '@isRaining', fn: constants.equals, right: true };

// ...
```

### dateAfterInclusive

Uses (Date.parse)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse] to parse and compare date values in `left` and `right`. This predicate will return true if `left` is greater than or equal too `right` (inclusive).

```javascript
const data = {
  currentDate: '01/02/1999',
  hurricaneDate: '02/02/1999'
}

{ left: '@hurricaneDate', fn: 'dateAfterInclusive', right: '@currentDate' } // true
```

### dateBeforeInclusive

Uses (Date.parse)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse] to parse and compare date values in `left` and `right`. This predicate will return true if `left` is less than or equal too `right` (inclusive).

```javascript
const data = {
  currentDate: '01/02/1999',
  hurricaneDate: '02/02/1999'
}

{ left: '@currentDate', fn: 'dateBeforeInclusive', right: '@hurricaneDate' } // true
```

### deepEquals

Uses [lodash.isEqual](https://lodash.com/docs/4.17.5#isEqual) to perform a deep comparison between two values to determine if they are equivalent.

```javascript
const data = {
  weatherPreferences: { temp: 72 }
}

{ left: '@weatherPreferences', fn: 'deepEquals', right: { temp: 72 } } // true
{ left: '@weatherPreferences.temp', fn: 'deepEquals', right: 72 } // true

```

### empty

Returns true if `left` is one of `undefined`, `null`, `'undefined'`, or `''`. Empty only needs a `left` value.

```javascript
const data = {
  sunshine: null,
  spring: '',
  endOfWinter: 'undefined',
}

{ left: '@sunshine', fn: 'empty' } // true
{ left: '@spring', fn: 'empty' } // true
{ left: '@endOfWinter', fn: 'empty' } // true
{ left: '@beachWeather', fn: 'empty' } // true

```

### equals

Uses the [equals operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) and returns true if `left` is equal to `right`.

```javascript
const data = {
  currentTemp: 68,
  highTemp: 68
}

{ left: '@currentTemp', fn: 'equals', right: '@highTemp' } // true
```

### greaterThan

Uses the [greater than operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) and returns true if `left` is greater than `right`.

```javascript
const data = {
  currentTemp: 68,
  highTemp: 72
}

{ left: '@highTemp', fn: 'greaterThan', right: '@currentTemp' } // true
```

### includes

Uses [lodash.includes](https://lodash.com/docs/4.17.5#includes) to check if `right` is in `left`.

```javascript
{ left: [1, 2, 3], fn: 'includes', right: 1 } // true
{ left: { 'a': 1, 'b': 2 }, fn: 'includes', right: 1 } // true
{ left: 'abcd', fn: 'includes', right: 'bc' } // true
```

### lessThan

Uses the [less than operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) and returns true if `left` is less than `right`.

```javascript
const data = {
  currentTemp: 68,
  highTemp: 72
}

{ left: '@currentTemp', fn: 'lessThan', right: '@highTemp' } // true
```

### regex

Tests `left` against the regex in `right`. Uses [RegExp.prototype.test()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test).

```javascript
const data = {
  firstName: 'Bernard',
  phone: '(123) 456-7890'
}

{ left: '@firstName', fn: 'regex', right: /[a-zA-Z]+/} // true
{ left: '@phone', fn: 'regex', right: /[a-zA-Z]+/ } // false
```

### typeOf

Checks the `typeof` `left` against the value of `right`. Uses the [typeof operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof).

```javascript
const data = {
  firstName: 'Bernard',
  favoriteMovies: [ 'Happy Gilmore', 'Cold Mountain' ]
}

{ left: '@firstName', fn: 'typeof', right: 'string' } // true
{ left: '@favoriteMoves', fn: 'typeof', right: 'string' } // false
```

## Composition
### and

`and` accepts any number of rules as arguments and returns a composed rule that returns true if all the subrules are true.

`and(rule1, rule2, [rule3], [rule4...])`

### not

`not` accepts a single rule as an argument and returns a rule that returns the inverse value.

### or

`or` accepts any number of rules as arguments and returns a composed rule that returns true if any of the subrules are true.

`or(rule1, rule2, [rule3], [rule4...])`

## Queries

### evaluate

`evaluate` accepts a data object and a rule and returns a boolean value. It also optionally accepts an object of customPredicates.

`evaluate(rule, data, [customPredicates])`

### explain

`explain` accepts a regent rule and returns a human readable description of the logic (and composed logic) that makes up the rule. It optionally accepts an object (data) which it will use to show the actual values of lookup properties in the description.

`explain(rule, [data])`

### find

`find` accepts an object of data and an array of objects that contain a `rules` property. It also optionally accepts an object of customPredicates. It evaluates each rule in the rules array and returns the first array item that has all its rules return true.

`find(logicArray, data, [customPredicates])`

```javascript
const IS_RAINING = { left: '@precipitation', fn: 'includes', right: 'rain' };
const IS_SNOWING = { left: '@precipitation', fn: 'includes', right: 'snow' };

const clothingLogic = [
  { value: ['hat', 'scarf', 'boots'], rules: [IS_SNOWING] },
  { value: ['umbrella'], rules: [IS_RAINING] },
];

const data = {
  precipitation: ['rain']
};

const myClothing = find(clothingLogic, data); // => { value: ['umbrella'], rules: [IS_RAINING] }
```

### filter

`filter` has the same api as [find](#find), but it returns an array of all logic array items with all their rules passing.

`filter(logicArray, data, [customPredicates])`

```javascript
const IS_RAINING = { left: '@precipitation', fn: 'includes', right: 'rain' };
const IS_SNOWING = { left: '@precipitation', fn: 'includes', right: 'snow' };
const IS_COLD = { left: '@temperature', fn: 'lessThan', right: 60 };
const IS_WARM = { left: '@temperature', fn: 'greaterThan', right: 78 };
const PRECIPITATION = and(IS_RAINING, IS_SNOWING);
const NO_PRECIPITATION = not(PRECIPITATION);

const clothingLogic = [
  { value: ['hat', 'scarf', 'boots'], rules: [IS_COLD] },
  { value: ['sandals', 't-shirt'], rules: [IS_WARM] },
  { value: ['sunglasses'], rules: [NO_PRECIPITATION] },
  { value: ['umbrella'], rules: [IS_RAINING] },
];

const data = {
  temperature: 65,
  precipitation: ['rain']
};

const myClothing = filter(clothingLogic, data); // =>
/*
​​​​​[
  { value: [ 'sunglasses' ], rules: [ [Object] ] },​​​​​
​​​​​  { value: [ 'umbrella' ], rules: [ [Object] ] }
]​​​​​
*/
```

# Examples

For more examples please see our [examples folder](https://github.com/northwesternmutual/regent/tree/master/examples).

