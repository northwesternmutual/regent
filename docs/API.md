# API Reference

<!-- Initialization -->

## `init`
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

## `crown`
An alias of init, sticking with the regent theme.

<!-- Predicates -->

## `constants`

Regent exports an object named `constants` that contains the names of all built-in predicates. This object can be used to help avoid misspelled predicates in rules.

```javascript
import regent, { constants } from 'regent';

const isRaining = { left: '@isRaining', fn: constants.equals, right: true };

// ...
```

## `dateAfterInclusive`

Uses [Date.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) to parse and compare date values in `left` and `right`. This predicate will return true if `left` is greater than or equal too `right` (inclusive).

```javascript
const data = {
  currentDate: '01/02/1999',
  hurricaneDate: '02/02/1999'
}

{ left: '@hurricaneDate', fn: 'dateAfterInclusive', right: '@currentDate' } // true
```

## `dateBeforeInclusive`

Uses [Date.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) to parse and compare date values in `left` and `right`. This predicate will return true if `left` is less than or equal too `right` (inclusive).

```javascript
const data = {
  currentDate: '01/02/1999',
  hurricaneDate: '02/02/1999'
}

{ left: '@currentDate', fn: 'dateBeforeInclusive', right: '@hurricaneDate' } // true
```

## `deepEquals`

Uses [lodash.isEqual](https://lodash.com/docs/4.17.5#isEqual) to perform a deep comparison between two values to determine if they are equivalent.

```javascript
const data = {
  weatherPreferences: { temp: 72 }
}

{ left: '@weatherPreferences', fn: 'deepEquals', right: { temp: 72 } } // true
{ left: '@weatherPreferences.temp', fn: 'deepEquals', right: 72 } // true

```

## `empty`

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

## `equals`

Uses the [strict equals operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) and returns true if `left` is equal to `right`.

```javascript
const data = {
  currentTemp: 68,
  highTemp: 68
}

{ left: '@currentTemp', fn: 'equals', right: '@highTemp' } // true
```

## `greaterThan`

Uses the [greater than operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) and returns true if `left` is greater than `right`.

```javascript
const data = {
  currentTemp: 68,
  highTemp: 72
}

{ left: '@highTemp', fn: 'greaterThan', right: '@currentTemp' } // true
```

## `greaterThanOrEquals`

Uses the [greater than or equal operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) and returns true if `left` is greater than or equal to `right`.

```javascript
const data = {
  currentTemp: 75,
  highTemp: 72
}

{ left: '@highTemp', fn: 'greaterThanOrEquals', right: '@currentTemp' } // true

const data = {
  currentTemp: 72,
  highTemp: 72
}

{ left: '@highTemp', fn: 'greaterThanOrEquals', right: '@currentTemp' } // true
```

## `includes`

Uses [lodash.includes](https://lodash.com/docs/4.17.5#includes) to check if `right` is in `left`.

```javascript
{ left: [1, 2, 3], fn: 'includes', right: 1 } // true
{ left: { 'a': 1, 'b': 2 }, fn: 'includes', right: 1 } // true
{ left: 'abcd', fn: 'includes', right: 'bc' } // true
```

## `lessThan`

Uses the [less than operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) and returns true if `left` is less than `right`.

```javascript
const data = {
  currentTemp: 68,
  highTemp: 72
}

{ left: '@currentTemp', fn: 'lessThan', right: '@highTemp' } // true
```

## `lessThanOrEquals`

Uses the [less than or equal operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) and returns true if `left` is less than or equal to `right`.

```javascript
const data = {
  currentTemp: 60,
  highTemp: 68
}

{ left: '@currentTemp', fn: 'lessThanOrEquals', right: '@highTemp' } // true

const data = {
  currentTemp: 68,
  highTemp: 68
}

{ left: '@currentTemp', fn: 'lessThanOrEquals', right: '@highTemp' } // true
```

## `regex`

Tests `left` against the regex in `right`. Uses [RegExp.prototype.test()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test).

```javascript
const data = {
  firstName: 'Bernard',
  phone: '(123) 456-7890'
}

{ left: '@firstName', fn: 'regex', right: /[a-zA-Z]+/} // true
{ left: '@phone', fn: 'regex', right: /[a-zA-Z]+/ } // false
```

## `typeOf`

Checks the `typeof` `left` against the value of `right`. Uses the [typeof operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof).

```javascript
const data = {
  firstName: 'Bernard',
  favoriteMovies: [ 'Happy Gilmore', 'Cold Mountain' ]
}

{ left: '@firstName', fn: 'typeof', right: 'string' } // true
{ left: '@favoriteMoves', fn: 'typeof', right: 'string' } // false
```

<!-- Composition -->

## `and`

`and` accepts any number of rules as arguments and returns a composed rule that returns true if all the subrules are true.

`and(rule1, rule2, [rule3], [rule4...])`

## `not`

`not` accepts a single rule as an argument and returns a rule that returns the inverse value.

## `or`

`or` accepts any number of rules as arguments and returns a composed rule that returns true if any of the subrules are true.

`or(rule1, rule2, [rule3], [rule4...])`

## `xor`

`xor` accepts exactly 2 rules as arguments and returns a composed rule that returns true if exactly 1 of the subrules is true and the other is false.

`xor(rule1, rule2)`

<!-- Queries -->

## `evaluate`

`evaluate` accepts a data object and a rule and returns a boolean value. It also optionally accepts an object of customPredicates.

`evaluate(rule, data, [customPredicates])`

## `explain`

`explain` accepts a regent rule and returns a human readable description of the logic (and composed logic) that makes up the rule. It optionally accepts an object (data) which it will use to show the actual values of lookup properties in the description.

`explain(rule, [data])`

## `find`

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

## `filter`

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
