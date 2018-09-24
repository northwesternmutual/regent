# Quick Start Guide

Regent provides a lightweight framework aimed at helping you organize your application’s business logic by separating the “how” from the “why”. At the lowest level, Regent logic is written in tiny, single responsibility rules that are both self-documenting and human readable.

## Installation

```
npm install --save regent
```

## Implementation

For our first example, we’ll use a real life scenario that is easy to identify with. Only a single rule is needed to test this condition:

> _If it is raining, an umbrella is needed._


```javascript
import { evaluate } from 'regent';

// Rule(s)
const isRaining = { left: '@isRaining', fn: 'equals', right: true };

// Data
const data = { isRaining: true };

// Evaluation
const isUmbrellaNeeded = evaluate(isRaining, data); // true
```

[Source](https://github.com/northwesternmutual/regent/blob/master/examples/basic-example-weather.js)

Taking the previous example a bit further, we can refine the scenario to be more precise. We can create and combine multiple rules to test this condition:

> _If it is raining **and** the wind is calm, an umbrella is needed._

```javascript
import { and, evaluate } from 'regent';

// Rule(s)
const isRaining = { left: '@isRaining', fn: 'equals', right: true };
const isCalm = { left: '@windSpeedInMph', fn: 'lessThan', right: 15 };
const isRainingAndCalm = and(isRaining, isCalm);

// Data
const data = { isRaining: true, windSpeedInMph: 20 };

// Evaluation
const isUmbrellaNeeded = evaluate(isRainingAndCalm, data); // false
```

## Troubleshooting

When conditional logic becomes too complex (and it will), use Regent’s [explain](https://github.com/northwesternmutual/regent/blob/master/docs/Queries.md#explain) method to simplify the abstraction.

# Documentation

## Rules

A rule is an object with 3 properties on it:

```javascript
const isRaining = {
  left: '@isRaining', // 1. What you’re testing
  fn: 'equals', // 2. How you’re testing
  right: true, // 3. What you’re testing against
};
```

### `left`

The `left` property represents the left side of a [predicate](./Predicates.md). In the above example, the `@` character means this value will be looked up in your data object. When you specify a lookup value with an `@` Regent uses `lodash.get` to evaluate strings representing fully qualified object paths. This means you can navigate deep into the data structure for your rule, like this:

```javascript
import { evaluate } from 'regent';

// Rule(s)
const isTomorrowsRecordHighRecent = {
  left: '@forecast[0].records.high.year',
  fn: 'greaterThan',
  right: 2010,
};

// Data
const data = {
  forecast: [
    {
      day: 'Monday',
      high: 65,
      low: 32,
      records: {
        low: { temperature: 10, year: 1905 },
        high: { temperature: 89, year: 2017 },
      },
    },
  ],
};

// Evaluation
const test = evaluate(isTomorrowsRecordHighRecent, data); // true
```

### `fn`

The `fn` property represents a predicate. Regent ships with a multitude of built-in [predicates](./Predicates.md), and also supports [custom predicates](./Predicates.md#custom-predicates). Our first example uses `equals`, which checks strict equality between the `left` and `right` values.

### `right`

The `right` property represents the right side of our predicate. Similiar to `left`, it also supports lookup values. Please visit the [lodash.get](https://lodash.com/docs/#get) docs for more information on how lookup properties are evaluated.

## Predicates

Predicates define how to compare the left and right values. For example:

| Predicate  | Code Comparison         |
| ---------- | ----------------------- |
| `equals`   | `left === right`        |
| `lessThan` | `left < right`          |
| `typeOf`   | `typeof left === right` |

There are 2 types of Regent predicates:

1. [Built-in Predicates](#built-in-predicates)
2. [Custom Predicates](#custom-predicates)

### Built-in predicates

- [constants](#constants)
- [dateAfterInclusive](#dateAfterInclusive)
- [dateBeforeInclusive](#dateBeforeInclusive)
- [deepEquals](#deepEquals)
- [empty](#empty)
- [equals](#equals)
- [greaterThan](#greaterThan)
- [greaterThanOrEquals](#greaterThanOrEquals)
- [includes](#includes)
- [lessThan](#lessThan)
- [lessThanOrEquals](#lessThanOrEquals)
- [regex](#regex)
- [typeOf](#typeOf)

#### `constants`

Regent exports an object named `constants` that contains the names of all built-in predicates. This object can be used to help avoid misspelled predicates in rules.

```javascript
import { constants } from 'regent';

const isRaining = { left: '@isRaining', fn: constants.equals, right: true };
```

#### `dateAfterInclusive`

Uses [Date.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) to parse and compare date values in `left` and `right`. This predicate will return `true` if `left` is greater than or equal too `right` (inclusive).

```javascript
const data = {
  currentDate: '01/01/2005',
  hurricaneDate: '08/23/2005'
}

{ left: '@hurricaneDate', fn: 'dateAfterInclusive', right: '@currentDate' } // true
```

#### `dateBeforeInclusive`

Uses [Date.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) to parse and compare date values in `left` and `right`. This predicate will return `true` if `left` is less than or equal too `right` (inclusive).

```javascript
const data = {
  currentDate: '01/01/2005',
  hurricaneDate: '08/23/2005'
}

{ left: '@currentDate', fn: 'dateBeforeInclusive', right: '@hurricaneDate' } // true
```

#### `deepEquals`

Uses [lodash.isEqual](https://lodash.com/docs/#isEqual) to perform a deep comparison between two values to determine if they are equivalent.

```javascript
const data = {
  weatherPreferences: { temp: 72 }
}

{ left: '@weatherPreferences', fn: 'deepEquals', right: { temp: 72 } } // true
{ left: '@weatherPreferences.temp', fn: 'deepEquals', right: 72 } // true
```

#### `empty`

Returns `true` if `left` is one of `undefined`, `null`, `'undefined'`, or `''`. The `empty` predicate only needs a `left` value.

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

#### `equals`

Uses the [strict equals operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) and returns `true` if `left` is equal to `right`.

```javascript
const data = {
  currentTemp: 72,
  highTemp: 72,
};

{ left: '@currentTemp', fn: 'equals', right: '@highTemp' } // true
```

#### `every`

Accepts an array as a left value, and a regent rule as a right value. Every will iterate over the array, and assign the current value to the `__` property on the data object. Every will return true if every rule passes. See also [some](#some)

```javascript
const data = {
  historicTemperatures: [
    { high: 78, low: 51 },
    { high: 81, low: 49 },
    { high: 89, low: 53 },
  ]
}

const highTemperatureGreaterThan75 = { left: '@__.high', fn: 'greaterThan', right: 75 }

const allTempsGreaterThan75 = { left: '@historicTemperatures', fn: 'every', right: highTemperatureGreaterThan75 } // true
```

#### `greaterThan`

Uses the [greater than operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) and returns `true` if `left` is greater than `right`.

```javascript
const data = {
  currentTemp: 72,
  highTemp: 68,
};

{ left: '@currentTemp', fn: 'greaterThan', right: '@highTemp' } // true
```

#### `greaterThanOrEquals`

Uses the [greater than or equal operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) and returns `true` if `left` is greater than or equal to `right`.

```javascript
const data = {
  a: {
    currentTemp: 72,
    highTemp: 68,
  },
  b: {
    currentTemp: 72,
    highTemp: 72,
  },
};

{ left: '@data.a.currentTemp', fn: 'greaterThanOrEquals', right: '@highTemp' } // true
{ left: '@data.b.currentTemp', fn: 'greaterThanOrEquals', right: '@highTemp' } // true
```

#### `includes`

Uses [lodash.includes](https://lodash.com/docs/#includes) to check if `right` is within `left`.

```javascript
{ left: [1, 2, 3], fn: 'includes', right: 1 } // true
{ left: { 'a': 1, 'b': 2 }, fn: 'includes', right: 1 } // true
{ left: 'abcd', fn: 'includes', right: 'bc' } // true
```

#### `lessThan`

Uses the [less than operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) and returns `true` if `left` is less than `right`.

```javascript
const data = {
  currentTemp: 72,
  highTemp: 74
}

{ left: '@currentTemp', fn: 'lessThan', right: '@highTemp' } // true
```

#### `lessThanOrEquals`

Uses the [less than or equal operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) and returns `true` if `left` is less than or equal to `right`.

```javascript
const data = {
  a: {
    currentTemp: 72,
    highTemp: 74,
  },
  b: {
    currentTemp: 72,
    highTemp: 72,
  },
};

{ left: '@data.a.currentTemp', fn: 'lessThanOrEquals', right: '@highTemp' } // true
{ left: '@data.b.currentTemp', fn: 'lessThanOrEquals', right: '@highTemp' } // true
```

#### `regex`

Uses [RegExp.prototype.test()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) to test `left` against the regex in `right`.

```javascript
const data = {
  firstName: 'Bernard',
  phone: '(123) 456-7890'
}

{ left: '@firstName', fn: 'regex', right: /[a-zA-Z]+/} // true
{ left: '@phone', fn: 'regex', right: /[a-zA-Z]+/ } // false
```

#### `some`

Accepts an array as a left value, and a regent rule as a right value. Some will iterate over the array, and assign the current value to the `__` property on the data object. Some will return true if any rule passes. See also [every](#every)

```javascript
const data = {
  historicTemperatures: [
    { high: 78, low: 51 },
    { high: 81, low: 49 },
    { high: 89, low: 53 },
  ]
}

const highTemperatureLessThan80 = { left: '@__.high', fn: 'lessThan', right: 80 }

const temperaturesNotAllAbove80 = { left: '@historicTemperatures', fn: 'every', right: highTemperatureLessThan80 } // true
```

#### `typeOf`

Uses the [typeof operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) to check the `typeof` `left` against the value of `right`.

```javascript
const data = {
  firstName: 'Bernard',
  favoriteMovies: [ 'Happy Gilmore', 'Cold Mountain' ]
}

{ left: '@firstName', fn: 'typeof', right: 'string' } // true
{ left: '@favoriteMoves', fn: 'typeof', right: 'string' } // false
```

### Custom Predicates

Regent can be used with custom predicates for handling complex logical expressions not provided by the built-in predicates. A custom predicate is a function that accepts up to two arguments, `left` and `right`, and returns a boolean value. In order to use custom predicates we need to tell Regent that they exist. There are two ways to do that.

#### Registering Globally

The first way is to use `regent.init` (or `regent.crown`). The advantage to using `init` when register your predicates with Regent is that you can evaluate multiple rules with the returned object. This is helpful when you have a large amount of rules to query. Custom predicates registered for global consumption enables sharing when leveraging module importing and exporting.

##### `crown`

An alias of `init` (sticking with the Regent theme).

**API:** `crown(customPredicates)`

##### `init`

The `init` method will return the full Regent API, with knowledge of custom predicates applied. The custom predicate property keys will become the reference strings to each custom predicate. The value of each property should be a function that accepts up to two arguments, and returns a boolean value.

**API:** `init(customPredicates)`

```javascript
import regent from 'regent';
import isPerson from './isPerson'; // Example custom predicate
import isPlace from './isPlace'; // Example custom predicate

// Define/combine customization(s)
const customPredicates = { isPerson, isPlace };

// Initialize and immediately destructure...
const { evaluate } = regent.init(customPredicates);
// evaluations...

// OR, initialize and export
export default regent.init(customPredicates);
```

[Source](../examples/custom-predicate-global-registration.js)

#### As a Query Argument

The second way to tell Regent that custom predicates exist is to provide them as the optional third parameter to [Queries](./Queries.md). The advantage to passing predicates into [evaluate](./Queries.md#evaluate), [filter](./Queries.md#filter), or [find](./Queries.md#find) is that you don't need to keep the initialized object around, which is handy for querying isolated rules.

```javascript
import { evaluate, explain } from 'regent';

/**
 * Example custom predicate
 *
 * @param  {String}  str  The left argument of a Regent rule.
 * @return {Boolean}      True if left deep equals 'Mike', otherwise false.
 */
const equalsMike = str => str === 'Mike';

// Rules(s)
const isFirstNameMike = { left: '@firstName', fn: 'equalsMike' };

// Data
const data = { firstName: 'Mike' };

/**
 * Evaluation
 *
 * We need to tell Regent about `equalsMike`,
 * so we provide an object as the third parameter.
 * Registering custom predicates as a query argument
 * is handy for querying isolated rules.
 *
 * @type {Boolean}
 */
const isMike1 = evaluate(isFirstNameMike, data, { equalsMike });

console.log(isMike1); // true

/**
 * Explanation
 *
 * No need to tell Regent about `customPredicates` when using `explain`.
 *
 * @type {String}
 */
const isMike2 = explain(isFirstNameMike, data);

console.log(isMike2); // (@firstName->"Mike" equalsMike)
```

[Source](../examples/custom-predicate-query-argument.js)

##### Use Cases

Notable use cases of custom predicates could include custom date formatting, or data parsing and manipulation that needs to be done before a logical expression can be expressed.

- [Data Parsing](../examples/custom-predicate-data-parsing.js)
- [Using Lodash](../examples/custom-predicate-with-lodash.js)

## Composition

With Regent it is always best to define your rules as granular as possible. To help you with this pattern, either compose rules manually or Regent’s composition helpers to build them up into more complex pieces.

### Composing Rules Using Helpers

Regent’s built-in composition helpers are:

- [and](#and)
- [or](#or)
- [xor](#xor)
- [not](#not)

#### `and`

A rule composed with `and` will return `true` if **all** subrules return `true`.

**API:** `and(rule1, rule2, [...moreRules])`

```javascript
import { and, evaluate, explain } from 'regent';

// Rule(s)
const isRaining = { left: '@isRaining', fn: 'equals', right: true };
const isWindy = { left: '@windSpeedInMph', fn: 'greaterThan', right: 15 };
const isCold = { left: '@temperature', fn: 'lessThan', right: 55 };
const isBadWeather = and(isRaining, isWindy, isCold); // Example of a composed rule

// Data
const data = { isRaining: true, temperature: 45, windSpeedInMph: 20 };

/**
 * Evaluation
 *
 * @type {Boolean}
 */
const shouldIStayInside1 = evaluate(isBadWeather, data);

console.log(shouldIStayInside1); // true

/**
 * Explanation
 *
 * @type {String}
 */
const shouldIStayInside2 = explain(isBadWeather, data);

console.log(shouldIStayInside2); // ((@isRaining->true equals true) and (@windSpeedInMph->20 greaterThan 15) and (@temperature->45 lessThan 55))
```

[Source](../examples/composition-with-and.js)

#### `or`

A rule composed with `or` will return `true` if **any** subrules return `true`.

**API:** `or(rule1, rule2, [...moreRules])`

```javascript
import { or, evaluate, explain } from 'regent';

// Rule(s)
const isRaining = { left: '@isRaining', fn: 'equals', right: true };
const isCold = { left: '@temperature', fn: 'lessThan', right: 55 };
const isRainingOrCold = or(isRaining, isCold); // Example of a composed rule

// Data
const data = { isRaining: true, temperature: 45 };

/**
 * Evaluation
 *
 * @type {Boolean}
 */
const shouldIDressWarm1 = evaluate(isRainingOrCold, data);

console.log(shouldIDressWarm1); // true

/**
 * Explanation
 *
 * @type {String}
 */
const shouldIDressWarm2 = explain(isRainingOrCold, data);

console.log(shouldIDressWarm2); // ((@isRaining->true equals true) or (@temperature->45 lessThan 55))
```

[Source](../examples/composition-with-or.js)

#### `xor`

A rule composed with `xor` will return `true` if **1** subrule returns `true` and **1** subrule returns `false`.

**API:** `xor(rule1, rule2)`

```javascript
import { xor, evaluate, explain } from 'regent';

// Rule(s)
const isRaining = { left: '@isRaining', fn: 'equals', right: true };
const hasUmbrella = { left: '@hasUmbrella', fn: 'equals', right: true };
const isWaterproof = xor(isRaining, hasUmbrella);

// Data
const data = { isRaining: false, hasUmbrella: false };

/**
 * Evaluation
 *
 * @type {Boolean}
 */
const isSmart1 = evaluate(isWaterproof, data);

console.log(isSmart1); // true

/**
 * Explanation
 *
 * @type {String}
 */
const isSmart2 = explain(isWaterproof, data);

console.log(isSmart2); // (("@isRaining" equals true) xor ("@hasUmbrella" equals true))
```

[Source](../examples/composition-with-xor.js)

#### `not`

A rule composed with `not` will return `true` if the subrule returns `false`.

**API:** `not(rule)`

```javascript
import { not, evaluate, explain } from 'regent';

// Rule(s)
const isCold = { left: '@temperature', fn: 'lessThan', right: 55 };
const isWarm = not(isCold); // Example of a composed rule

// Data
const data = { temperature: 45 };

/**
 * Evaluation
 *
 * @type {Boolean}
 */
const shouldIWearAJacket1 = evaluate(isCold, data);
const shouldIWearATShirt1 = evaluate(isWarm, data);

console.log(shouldIWearAJacket1); // true
console.log(shouldIWearATShirt1); // false

/**
 * Explanation
 *
 * @type {String}
 */
const shouldIWearAJacket2 = explain(isCold, data);
const shouldIWearATShirt2 = explain(isWarm, data);

console.log(shouldIWearAJacket2); // (@temperature->45 lessThan 55)
console.log(shouldIWearATShirt2); // NOT (@temperature->45 lessThan 55)
```

[Source](../examples/composition-with-not.js)

### Composing Rules Manually

A composed rule can be written without the use of the `and`, `or`, and `not` helper methods.
The helper methods exist only to help you clean up your code by abstracting away this composed rule syntax. They all return an object literal. Here is the `and` example from earlier composed without helpers:

```javascript
import { evaluate, explain } from 'regent';

// Rule(s)
const isRaining = { left: '@isRaining', fn: 'equals', right: true };
const isWindy = { left: '@windSpeedInMph', fn: 'greaterThan', right: 15 };
const isCold = { left: '@temperature', fn: 'lessThan', right: 55 };

// Example of a composed rule
const isBadWeather = {
  compose: 'and',
  rules: [isRaining, isWindy, isCold],
};

// Data
const data = { isRaining: true, temperature: 45, windSpeedInMph: 20 };

/**
 * Evaluation
 *
 * @type {Boolean}
 */
const shouldIStayInside1 = evaluate(isBadWeather, data);

console.log(shouldIStayInside1); // true

/**
 * Explanation
 *
 * @type {String}
 */
const shouldIStayInside2 = explain(isBadWeather, data);

console.log(shouldIStayInside2); // ((@isRaining->true equals true) and (@windSpeedInMph->20 greaterThan 15) and (@temperature->45 lessThan 55))
```

## Queries

Queries are methods that allow you to parse your rules into boolean values, except for `explain`, which returns a string value.

Regent’s built-in queries are:

- [evaluate](#evaluate)
- [explain](#explain)
- [filter](#filter)
- [find](#find)

The methods `evaluate` and `explain` take an object as the parameter.
The methods `filter` and `find` take an array of objects as the parameter, aka "logic tables". With logic tables, each object in the array requires a property named `rule` for regent to test against.

### `evaluate`

The `evaluate` method takes a rule and a data object and returns a boolean value. It also optionally accepts an object of custom predicates. In the example below we are evaluating the rule `isBeachTemperature` against a data object.

**API:** `evaluate(rule, data, [customPredicates])`

_alias: rule_

```javascript
import { evaluate } from 'regent';

// Rule(s)
const isBeachTemperature = {
  left: '@temperature',
  fn: 'greaterThan',
  right: 75,
};

// Data
const data = { temperature: 78 };

// Evaluation
const isBeachDay = evaluate(isBeachTemperature, data); // true
```

[Source](../examples/querying-with-evaluate.js)

### `explain`

Because we are defining small rules and composing them together, a rule abstracts away the actual logic check. To help visualize your rules, run them through the `explain` method and your logic will be sent back in human readable form. If you also provide your data object as the second argument, the result will also include the values of the lookup keys.

**API:** `explain(rule, [data])`

```javascript
import { explain, or } from 'regent';

// Rule(s)
const isRaining = { left: '@precipitation', fn: 'includes', right: 'rain' };
const isSnowing = { left: '@precipitation', fn: 'includes', right: 'snow' };
const hasPrecipitation = or(isRaining, isSnowing);

// Data
const data = { precipitation: ['sleet', 'hail'] };

// Visualization using one argument...
const isUmbrellaNeeded1 = explain(hasPrecipitation);
// ​​​​​((@precipitation includes "rain") or (@precipitation includes "snow"))

// Visualization using both arguments...
const isUmbrellaNeeded2 = explain(hasPrecipitation, data);
// ((@precipitation->["sleet","hail"] includes "rain") or (@precipitation->["sleet","hail"] includes "snow"))
```

[Source](../examples/querying-with-explain.js)

### `filter`

The `filter` query has the same signature as `find`, but returns an array of all the rows whose rules all return `true`. If there are no matches, it will return an empty array. You can think of it like `Array.filter()`. In the example below, `filter` will return an array of all rows that have a rule that evaluates to `true`.

**API:** `filter(logicArray, data, [customPredicates])`

```javascript
import { filter } from 'regent';

// Rule(s)
const isRaining = { left: '@precipitation', fn: 'includes', right: 'rain' };
const isWarm = { left: '@temperature', fn: 'greaterThan', right: 68 };

// Data
const data {
  precipitation: ['rain'],
  temperature: 82,
};

// Logic table
const clothingLogic = [
  { rule: isWarm, value: ['sandals', 't-shirt'] },
  { rule: isCold, value: ['hat', 'scarf', 'boots'] },
  { rule: isSunny, value: ['sunglasses'] },
  { rule: isRaining, value: ['umbrella'] },
];

// Query
const clothingLogicFiltered = filter(clothingLogic, data);
// => [{ value: ['sandals', 't-shirt'], rule: isWarm }, { value: ['umbrella'], rule: isRaining }]
```

[Source](../examples/querying-with-filter.js)

### `find`

The `find` query will iterate over the logic array and return the entire object of first item whose rule returns `true`. It will **not** continue looking through the following rows. You can think of it like `Array.find()`. In the example below, the second array item will be returned, because `isWarm` returns `true`.

**API:** `find(logicArray, data, [customPredicates])`

```javascript
import { find } from 'regent';

// Rule(s)
const isWarm = { left: '@temperature', fn: 'greaterThan', right: 68 };

// Data
const data {
  temperature: 82
};

// Logic table
const clothingLogic = [
  { value: ['hat', 'scarf', 'boots'], rule: isCold },
  { value: ['sandals', 't-shirt'], rule: isWarm },
  { value: ['sunglasses'], rule: isNotPrecipitating },
  { value: ['umbrella'], rule: isRaining },
];

// Query
const clothingItems = find(clothingLogic, data);
// => { value: ['sandals', 't-shirt'], rule: isWarm }
```

[Source](../examples/querying-with-find.js)

# Examples

## A Thorough Example

```javascript
import { and, or, not, filter, evaluate } from 'regent';

// Rule(s)
const isRaining = { left: '@precipitation', fn: 'includes', right: 'rain' };
const isNotRaining = not(isRaining);
const isSnowing = { left: '@precipitation', fn: 'includes', right: 'snow' };
const isNotSnowing = not(isSnowing);
const isCold = { left: '@temperature', fn: 'lessThan', right: 75 };
const isWarm = not(isCold);
const isNotPrecipitating = and(isNotRaining, isNotSnowing);
const shouldIWearAJacket = or(isRaining, isSnowing, isCold);

// Data
const data = {
  precipitation: ['rain'],
  temperature: 78,
};

// Logic table
const clothingLogic = [
  { value: ['hat', 'scarf', 'boots'], rule: isCold },
  { value: ['sandals', 't-shirt'], rule: isWarm },
  { value: ['sunglasses'], rule: isNotPrecipitating },
  { value: ['umbrella'], rule: isRaining },
];

/**
 * Evaluation
 *
 * @type {Boolean}
 */
console.log(evaluate(shouldIWearAJacket, data)); // true

/**
 * Query
 *
 * @type {Array}
 */
const clothingLogicFiltered = filter(clothingLogic, data);
const clothing = clothingLogicFiltered.reduce(
  (acc, row) => [...acc, ...row.value],
  [],
);

console.log(clothing); // ['sandals', 't-shirt', 'umbrella']
```


[Source](../examples/composition-with-and-manually.js)


## More Examples

- [Basic Example](https://github.com/northwesternmutual/regent/blob/master/examples/basic-example-weather.js)
- [Advanced Example: Weather](https://github.com/northwesternmutual/regent/blob/master/examples/advanced-example-weather.js)
- [Advanced Example: Batman](https://github.com/northwesternmutual/regent/blob/master/examples/advanced-example-batman.js)
- [Custom Predicate: Data Parsing](https://github.com/northwesternmutual/regent/blob/master/examples/custom-predicate-data-parsing.js)
- [Custom Predicate: Global Registration](https://github.com/northwesternmutual/regent/blob/master/examples/custom-predicate-global-registration.js)
- [Custom Predicate: Query Argument](https://github.com/northwesternmutual/regent/blob/master/examples/custom-predicate-query-argument.js)
- [Custom Predicate: With Lodash](https://github.com/northwesternmutual/regent/blob/master/examples/custom-predicate-with-lodash.js)
- [Composition with `and`](https://github.com/northwesternmutual/regent/blob/master/examples/composition-with-and.js)
- [Composition with `and` (manual)](https://github.com/northwesternmutual/regent/blob/master/examples/composition-with-and-manually.js)
- [Composition with `not`](https://github.com/northwesternmutual/regent/blob/master/examples/composition-with-not.js)
- [Composition with `or`](https://github.com/northwesternmutual/regent/blob/master/examples/composition-with-or.js)
- [Composition with `xor`](https://github.com/northwesternmutual/regent/blob/master/examples/composition-with-xor.js)
- [Querying with `evaluate`](https://github.com/northwesternmutual/regent/blob/master/examples/querying-with-evaluate.js)
- [Querying with `explain`](https://github.com/northwesternmutual/regent/blob/master/examples/querying-with-explain.js)
- [Querying with `filter`](https://github.com/northwesternmutual/regent/blob/master/examples/querying-with-filter.js)
- [Querying with `find`](https://github.com/northwesternmutual/regent/blob/master/examples/querying-with-find.js)

# License

MIT

