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

## Querying rules

Regent provides tools that allow you to parse your rules into boolean values

#### evaluate

`evaluate` takes a data object and a rule and returns a boolean value.

```javascript
const data = {
  temperature: 78,
}

const beachTemperature = { left: '@temperature', fn: 'greaterThan', right: 75 };
evaluate(data, beachTemperature) // true
```

In the above example we are evaluating the rule `beachTemperature` against a data object.

### Querying logic tables

Regent provides two ways to query logic tables. Logic tables are simply an array of objects. Each object in the array must have a property named `rules` which is an array of rules.

```javascript
const clothingLogic = [
  { value: ['hat', 'scarf', 'boots'], rules: [IS_COLD] },
  { value: ['sandals', 't-shirt'], rules: [IS_WARM] },
  { value: ['sunglasses'], rules: [NO_PRECIPITATION] },
  { value: ['umbrella'], rules: [IS_RAINING] },
];
```

#### find

`find` will iterate over the logic array and return the first item who's rules are return true. `find` will return the entire object. You can think of it like `Array.find()`.

`find(data, logicArray, [customPredicates])`

```javascript
const IS_WARM = { left: '@temperature', fn: 'greaterThan', right: 68 };

const data {
  temperature: 32
};

const clothingLogic = [
  { value: ['hat', 'scarf', 'boots'], rules: [IS_COLD] },
  { value: ['sandals', 't-shirt'], rules: [IS_WARM] },
  { value: ['sunglasses'], rules: [NO_PRECIPITATION] },
  { value: ['umbrella'], rules: [IS_RAINING] },
];

const clothingItems = find(data, clothingLogic);
// => { value: ['sandals', 't-shirt'], rules: [IS_WARM] }
```

#### filter

`filter` has the same signature as `find`, but returns an array of all the rows who's rules all return true. You can think of it like `Array.filter()`.

```javascript
const IS_WARM = { left: '@temperature', fn: 'greaterThan', right: 68 };
const IS_RAINING = { left: '@precipitation', fn: 'includes', right: 'rain' };

const data {
  temperature: 32,
  precipitation: ['rain']
};

const clothingLogic = [
  { value: ['hat', 'scarf', 'boots'], rules: [IS_COLD] },
  { value: ['sandals', 't-shirt'], rules: [IS_WARM] },
  { value: ['sunglasses'], rules: [NO_PRECIPITATION] },
  { value: ['umbrella'], rules: [IS_RAINING] },
];

const clothingItems = find(data, clothingLogic);
// => [{ value: ['sandals', 't-shirt'], rules: [IS_WARM] }, { value: ['umbrella'], rules: [IS_RAINING] }]
```

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

Regent can be used with custom predicates in the event that the built in predicates to handle specific logical expressions that built in predicates can not. A custom predicate is simply a function that accepts up to two arguments, `left` and `right`, and returns a boolean value.

```javascript
const nameIsMike = left => left === 'Mike';
```

The arguments are populated by the `left` and `right` properties of the rule definition.

```javascript
const data = {
  firstName: 'Mike'
};

const nameIsMike = { left: '@firstName', fn: 'nameIsMike' };
```

In the above example, `@firstname` will be looked up in `data` and passed into our custom predicate. This rule would return true with the provided data.

### Crowning the regent

Before we use our custom predicate we need to tell regent that it exists. There are two ways to do that. The first is to use `regent.init` (aliased to `regent.crown`). `init` takes an optional object of custom predicates and returns the entire api of regent with the custom predicates applied. To actually make the above example work we need to init regent with the custom predicate `nameIsMike`.

```javascript
const nameIsMike = left => left === 'Mike';

const customPredicates = {
  nameIsMike
};

const { evaluate } = regent.init(customPredicates);

const nameIsMike = { left: '@firstName', fn: 'nameIsMike' };

const data = {
  firstName: 'Mike'
};

evaluate(data, nameIsMike); // true
```

_NOTE: You can skip the init step and just pass your object of custom predicates into evaluate, find, or filter as an optional third parameter._

### Writing a predicate

Our first example was a bit simple. Let's take a look at a more practical custom predicate.

```javascript
const temperatureIsRising = (dailyTemperatureArray) => (
  // return true if the first temperature in the array is less
  dailyTemperatureArray[0] < dailyTemperatureArray[dailyTemperatureArray.length - 1]
)
```

This predicate will expect an array in `left` (nothing in `right`) and check that the first value is less than the last.

Other notable use cases of a custom predicate could include custom date formatting, or data manipulation that needs to be done before a logical expression can be expressed.

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
`init` accepts an optional object of custom predicates, and returns the full regent api, with the knowledge of the custom predicates.

`init([customPredicates])`

### crown
An alias of init, sticking with the regent theme.

## Predicates

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

{ left: '@currentTemp', fn: 'equals', right: '@highTemp` } // true
```

### greaterThan

Uses the [greater than operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) and returns true if `left` is greater than `right`.

```javascript
const data = {
  currentTemp: 68,
  highTemp: 72
}

{ left: '@highTemp', fn: 'greaterThan', right: '@currentTemp` } // true
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

{ left: '@currentTemp', fn: 'lessThan', right: '@highTemp` } // true
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

`evaluate(data, rule, [customPredicates])`

### explain

`explain` accepts a regent rule and returns a human readable description of the logic (and composed logic) that makes up the rule. It optionally accepts an object (data) which it will use to show the actual values of lookup properties in the description.

`explain(rule, [data])`

### find

`find` accepts an object of data and an array of objects that contain a `rules` property. It evaluates each rule in the rules array and returns the first array item that has all its rules return true.

`find(data, logicArray)`

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

const myClothing = find(data, clothingLogic); // => { value: ['umbrella'], rules: [IS_RAINING] }
```

### filter

`filter` has the same api as [find](#find), but it returns an array of all logic array items with all their rules passing.

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

const myClothing = filter(data, clothingLogic); // =>
/*
​​​​​[
  { value: [ 'sunglasses' ], rules: [ [Object] ] },​​​​​
​​​​​  { value: [ 'umbrella' ], rules: [ [Object] ] }
]​​​​​
*/
```

# Examples

For more examples please see our [examples folder](https://github.com/northwesternmutual/regent/tree/master/examples).

