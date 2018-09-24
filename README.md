# Regent: A JavaScript Rule Engine

Regent provides a lightweight framework aimed at helping you organize your application’s business logic by separating the “how” from the “why”. At the lowest level, Regent logic is written in tiny, single responsibility rules that are both self-documenting and human readable.

## Installation

```javascript
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

## [Documentation](https://northwesternmutual.github.io/regent/#/?id=documentation)

- [Rules](https://northwesternmutual.github.io/regent/#/?id=rules)
- [Predicates](https://northwesternmutual.github.io/regent/#/?id=predicates)
- [Composition](https://northwesternmutual.github.io/regent/#/?id=composition)
- [Queries](https://northwesternmutual.github.io/regent/#/?id=queries)

## Examples

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

## License

MIT
