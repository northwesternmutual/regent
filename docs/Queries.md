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

[Source](https://github.com/northwesternmutual/regent/blob/master/examples/querying-with-evaluate.js)

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

[Source](https://github.com/northwesternmutual/regent/blob/master/examples/querying-with-explain.js)

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

[Source](https://github.com/northwesternmutual/regent/blob/master/examples/querying-with-filter.js)

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

[Source](https://github.com/northwesternmutual/regent/blob/master/examples/querying-with-find.js)

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
