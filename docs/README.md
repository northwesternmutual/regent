# Regent: Business Rules engine in JavaScript

![regent logo (the letter R wearing a crown)](https://northwesternmutual.github.io/regent/regent-logo-small.png)

Regent logic is written as single responsibility rules that are self-documenting, composable, and human readable.

## Rules

A regent rule is a function that takes an object, and returns a boolean. Regent rules are created by using a built in predicate factory function. Regent contains multiple [predicates](#Predicates) and supports [custom predicates](#custom_predicates). The following example uses `equals`.

```javascript
const isRaining = equals('@isRaining', true);
```

In the above example we are passing two arguments to the equals predicate. The first is the path to the data we want to look up. the `@` symbol instructs regent to find a property on the data object named `isRaining`. The second argument is the value we want to test equality. In the above example we are passing a boolean literal, but we can use a lookup for the second argument as well.

```javascript
const stableTemperature = equals('@temperature_today', '@temperature_tomorrow');
```

Regent uses lodash.get to evaluate lookup strings. Here is a more complicated example.

```javascript
const data = {
  foo: {
    bar: [
      { fizz: true }
    ]
  }
};

const isRaining = equals('@foo.bar[0].fizz', true);

isRaining(data) // true
```

## Predicates

### Built-in predicates

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

#### deepEquals

Uses [lodash.isEqual](https://lodash.com/docs/#isEqual) to perform a deep comparison between `argument1` and `argument2` to determine if they are equivalent.

```javascript
deepEquals(arg1, arg2)
```

#### `empty`

Returns `true` if `argument1` is one of `undefined`, `null`, `'undefined'`, or `''`.

```javascript
empty(arg1)
```

#### `equals`

Uses the [strict equals operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) and returns `true` if `argument1` is equal to `argument2`.

```javascript
equal(arg1, arg2)
```

#### `every`

Accepts an array as `argument1`, and a regent rule as `argument2`. `every` will iterate over the array, and assign the current value to the `__` property on the data object. Every will return true if every iteration returns true. See also [some](#some)

```javascript
const data = {
  historicTemperatures: [
    { high: 78, low: 51 },
    { high: 81, low: 49 },
    { high: 89, low: 53 },
  ]
}

const highTemperatureGreaterThan75 = greaterThan('@__.high', 75);
const allTempsGreaterThan75 = every('@historicTemperatures', highTemperatureGreaterThan75) // true
```

#### `greaterThan`

Uses the [greater than operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) and returns `true` if `argument1` is greater than `argument2`.

```javascript
greaterThan(arg1, arg2)
```

#### `greaterThanOrEquals`

Uses the [greater than or equal operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) and returns `true` if `argument1` is greater than or equal to `argument2`.

```javascript
greaterThanOrEquals(arg1, arg2)
```

#### `includes`

```javascript
includes(arg1, arg2)
```

Uses [lodash.includes](https://lodash.com/docs/#includes) to check if `argument2` exists in `argument1`.

#### `lessThan`

Uses the [less than operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) and returns `true` if `argument1` is less than `argument2`.

```javascript
lessThan(arg1, arg2)
```

#### `lessThanOrEquals`

Uses the [less than or equal operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) and returns `true` if `argument1` is less than or equal to `argument2`.

```javascript
lessThanOrEquals(arg1, arg2)
```

#### `regex`

Uses [RegExp.prototype.test()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) to test `argument1` against the regex in `argument2`. `argument2` must be of type `regex`

```javascript
regex(arg1, arg2)
```

#### `some`

Accepts an array as `argument1`, and a regent rule as `argument2`. Some will iterate over the array, and assign the current value to the `__` property on the data object. Some will return true if any rule passes. See also [every](#every)

```javascript
const data = {
  historicTemperatures: [
    { high: 78, low: 51 },
    { high: 81, low: 49 },
    { high: 89, low: 53 },
  ]
}

const highTemperatureLessThan80 = lessThan('@__.high', 80);
const temperaturesNotAllAbove80 = some('@historicTemperatures', highTemperatureLessThan80) // true
```

#### `typeOf`

Uses the [typeof operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) to check the `typeof` `argument1` against the value of `argument2`.

```javascript
typeOf(arg1, arg2)
```

### Custom predicates

Regent can be used with custom predicates for handling complex logical expressions not provided by the built-in predicates. A custom predicate is a function that accepts any number of arguments, and returns a boolean value. Regent provides a utility function `make` that allows your custom predicate to use regent's lookup syntax. Custom predicates can be composed just like any other regent rule.

```javascript
import { make } from 'regent';

const temperatureIncreaseInConsecutiveDays = make(weatherData => weatherData.every((x, i) => {
  // if this isn't the first array item
  if (i > 0) {
    // return true if the current temp is greater than
    // the previous array item's temp
    return x.temp > weatherData[i - 1].temp;
  }

  // if this is the first array item return true
  return true;
}));

const temperatureIncreaseRule = temperatureIncreaseInConsecutiveDays('@weather.days');

const data = {
  weather: {
    days: [
      { temp: 60 },
      { temp: 70 },
      { temp: 80 }
    ]
  }
}

temperatureIncreaseRule(data); // true

```

## Composition

With Regent it is always best to define your rules as granular as possible. To help you with this pattern, either compose rules manually or Regent’s composition helpers to build them up into more complex pieces.

### Composing Rules Using Helpers

Regent’s built-in composition helpers are:

- [and](#and)
- [or](#or)
- [xor](#xor)
- [not](#not)
- [none](#none)

#### `and`

A rule composed with `and` will return `true` if **all** subrules return `true`.

**API:** `and(rule1, rule2, [...moreRules])`

```javascript
import { and, equals, greaterThan, lessThan } from 'regent';

// Rule(s)
const isRaining = equals('@isRaining', true);
const isWindy = greaterThan('@windSpeedInMph', 15);
const isCold = lessThan('@temperature', 55);
const isBadWeather = and(isRaining, isWindy, isCold); // Example of a composed rule

// Data
const data = {
  isRaining: true,
  temperature: 45,
  windSpeedInMph: 20
};

isBadWeather(data); // true
```

#### `or`

A rule composed with `or` will return `true` if **any** subrules return `true`.

**API:** `or(rule1, rule2, [...moreRules])`

```javascript
import { or, equals, lessThan } from 'regent';

// Rule(s)
const isRaining = equals('@isRaining', true);
const isCold = lessThan('@temperature', 55);
const isRainingOrCold = or(isRaining, isCold); // Example of a composed rule

// Data
const data = {
  isRaining: true,
  temperature: 45
};

isRainingOrCold(data); // true
```

#### `xor`

A rule composed with `xor` will return `true` if **1** subrule returns `true` and **1** subrule returns `false`.

**API:** `xor(rule1, rule2)`

#### `not`

A rule composed with `not` will return `true` if the subrule returns `false`.

**API:** `not(rule)`

```javascript
import { not, equals } from 'regent';

// Rule(s)
const isCold = equals('@temperature', 55);
const isWarm = not(isCold); // Example of a composed rule

// Data
const data = { temperature: 45 };

isCold(data); // true
isWarm(data); // false
```

#### `none`

A rule composed with `none` will return `true` if **none** of the subrules return `true`.

**API:** `none(rule1, rule2, [...moreRules])`

```javascript
import { none, equals, lessThan } from 'regent';

// Rule(s)
const isRaining = equals('@isRaining', true);
const isCold = lessThan('@temperature', 55);
const isWarmAndSunny = none(isRaining, isCold); // Example of a composed rule

// Data
const data = { isRaining: false, temperature: 75 };

isWarmAndSunny(data); // true
```

## Queries

### `find`

The `find` query will iterate over the logic array and return the entire object of first item whose rule returns `true`. It will **not** continue looking through the following rows. You can think of it like `Array.find()`. In the example below, the second array item will be returned, because `isWarm` returns `true`.

**API:** `find(logicArray, data, [customPredicates])`

```javascript
import { find, greaterThan, not } from 'regent';

// Rule(s)
const isWarm = greaterThan('@temperature', 68);
const isCold = not(isWarm);

// Data
const data {
  temperature: 82
};

// Logic table
const clothingLogic = [
  { value: ['hat', 'scarf', 'boots'], rule: isCold },
  { value: ['sandals', 't-shirt'], rule: isWarm },
];

// Query
const clothingItems = find(clothingLogic, data);
// => { value: ['sandals', 't-shirt'], rule: isWarm }
```

### `filter`

The `filter` query has the same signature as `find`, but returns an array of all the rows whose rules all return `true`. If there are no matches, it will return an empty array. You can think of it like `Array.filter()`. In the example below, `filter` will return an array of all rows that have a rule that evaluates to `true`.

**API:** `filter(logicArray, data, [customPredicates])`

```javascript
import { filter, includes, greaterThan, not } from 'regent';

// Rule(s)
const isRaining = includes('@precipitation','rain');
const isWarm = greaterThan('@temperature', 68);
const isCold = not(isWarm);

// Data
const data {
  precipitation: ['rain'],
  temperature: 82,
};

// Logic table
const clothingLogic = [
  { rule: isWarm, value: ['sandals', 't-shirt'] },
  { rule: isCold, value: ['hat', 'scarf', 'boots'] },
  { rule: isRaining, value: ['umbrella'] },
];

// Query
const clothingLogicFiltered = filter(clothingLogic, data);
// => [{ value: ['sandals', 't-shirt'], rule: isWarm }, { value: ['umbrella'], rule: isRaining }]
```


## License

MIT
