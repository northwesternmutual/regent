# Predicates

Predicates define how to compare the left and right values. For example:

| Predicate  | Code Comparison         |
| ---------- | ----------------------- |
| `equals`   | `left === right`        |
| `lessThan` | `left < right`          |
| `typeOf`   | `typeof left === right` |

There are 2 types of Regent predicates:

1. [Built-in Predicates](#built-in-predicates)
2. [Custom Predicates](#custom-predicates)

## Built-in predicates

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

### `constants`

Regent exports an object named `constants` that contains the names of all built-in predicates. This object can be used to help avoid misspelled predicates in rules.

```javascript
import { constants } from 'regent';

const isRaining = { left: '@isRaining', fn: constants.equals, right: true };
```

### `dateAfterInclusive`

Uses [Date.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) to parse and compare date values in `left` and `right`. This predicate will return `true` if `left` is greater than or equal too `right` (inclusive).

```javascript
const data = {
  currentDate: '01/01/2005',
  hurricaneDate: '08/23/2005'
}

{ left: '@hurricaneDate', fn: 'dateAfterInclusive', right: '@currentDate' } // true
```

### `dateBeforeInclusive`

Uses [Date.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) to parse and compare date values in `left` and `right`. This predicate will return `true` if `left` is less than or equal too `right` (inclusive).

```javascript
const data = {
  currentDate: '01/01/2005',
  hurricaneDate: '08/23/2005'
}

{ left: '@currentDate', fn: 'dateBeforeInclusive', right: '@hurricaneDate' } // true
```

### `deepEquals`

Uses [lodash.isEqual](https://lodash.com/docs/#isEqual) to perform a deep comparison between two values to determine if they are equivalent.

```javascript
const data = {
  weatherPreferences: { temp: 72 }
}

{ left: '@weatherPreferences', fn: 'deepEquals', right: { temp: 72 } } // true
{ left: '@weatherPreferences.temp', fn: 'deepEquals', right: 72 } // true
```

### `empty`

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

### `equals`

Uses the [strict equals operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) and returns `true` if `left` is equal to `right`.

```javascript
const data = {
  currentTemp: 72,
  highTemp: 72,
};

{ left: '@currentTemp', fn: 'equals', right: '@highTemp' } // true
```

### `greaterThan`

Uses the [greater than operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) and returns `true` if `left` is greater than `right`.

```javascript
const data = {
  currentTemp: 72,
  highTemp: 68,
};

{ left: '@currentTemp', fn: 'greaterThan', right: '@highTemp' } // true
```

### `greaterThanOrEquals`

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

### `includes`

Uses [lodash.includes](https://lodash.com/docs/#includes) to check if `right` is within `left`.

```javascript
{ left: [1, 2, 3], fn: 'includes', right: 1 } // true
{ left: { 'a': 1, 'b': 2 }, fn: 'includes', right: 1 } // true
{ left: 'abcd', fn: 'includes', right: 'bc' } // true
```

### `lessThan`

Uses the [less than operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) and returns `true` if `left` is less than `right`.

```javascript
const data = {
  currentTemp: 72,
  highTemp: 74
}

{ left: '@currentTemp', fn: 'lessThan', right: '@highTemp' } // true
```

### `lessThanOrEquals`

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

### `regex`

Uses [RegExp.prototype.test()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) to test `left` against the regex in `right`.

```javascript
const data = {
  firstName: 'Bernard',
  phone: '(123) 456-7890'
}

{ left: '@firstName', fn: 'regex', right: /[a-zA-Z]+/} // true
{ left: '@phone', fn: 'regex', right: /[a-zA-Z]+/ } // false
```

### `typeOf`

Uses the [typeof operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) to check the `typeof` `left` against the value of `right`.

```javascript
const data = {
  firstName: 'Bernard',
  favoriteMovies: [ 'Happy Gilmore', 'Cold Mountain' ]
}

{ left: '@firstName', fn: 'typeof', right: 'string' } // true
{ left: '@favoriteMoves', fn: 'typeof', right: 'string' } // false
```

## Custom Predicates

Regent can be used with custom predicates for handling complex logical expressions not provided by the built-in predicates. A custom predicate is a function that accepts up to two arguments, `left` and `right`, and returns a boolean value. In order to use custom predicates we need to tell Regent that they exist. There are two ways to do that.

### 1. Registering Globally

The first way is to use `regent.init` (or `regent.crown`). The advantage to using `init` when register your predicates with Regent is that you can evaluate multiple rules with the returned object. This is helpful when you have a large amount of rules to query. Custom predicates registered for global consumption enables sharing when leveraging module importing and exporting.

### `crown`

An alias of `init` (sticking with the Regent theme).

**API:** `crown([customPredicates])`

### `init`

The `init` method will return the full Regent API, with knowledge of custom predicates applied. The custom predicate property keys will become the reference strings to each custom predicate. The value of each property should be a function that accepts up to two arguments, and returns a boolean value.

**API:** `init([customPredicates])`

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

### 2. As a Query Argument

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

### Use Cases

Notable use cases of custom predicates could include custom date formatting, or data parsing and manipulation that needs to be done before a logical expression can be expressed.

- [Data Parsing](../examples/custom-predicate-data-parsing.js)
- [Using Lodash](../examples/custom-predicate-with-lodash.js)
