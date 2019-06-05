# Regent: A JavaScript Rule Engine

![regent logo](https://northwesternmutual.github.io/regent/regent-logo-small.png)

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
  - [Built-in Predicates](https://northwesternmutual.github.io/regent/#/?id=built-in-predicates)
    - [`constants`](https://northwesternmutual.github.io/regent/#/?id=constants)
    - [`dateAfterInclusive`](https://northwesternmutual.github.io/regent/#/?id=dateafterinclusive)
    - [`dateBeforeInclusive`](https://northwesternmutual.github.io/regent/#/?id=datebeforeinclusive)
    - [`deepEquals`](https://northwesternmutual.github.io/regent/#/?id=deepequals)
    - [`empty`](https://northwesternmutual.github.io/regent/#/?id=empty)
    - [`equals`](https://northwesternmutual.github.io/regent/#/?id=equals)
    - [`every`](https://northwesternmutual.github.io/regent/#/?id=every)
    - [`greaterThan`](https://northwesternmutual.github.io/regent/#/?id=greaterthan)
    - [`greaterThanOrEquals`](https://northwesternmutual.github.io/regent/#/?id=greaterthanorequals)
    - [`includes`](https://northwesternmutual.github.io/regent/#/?id=includes)
    - [`lessThan`](https://northwesternmutual.github.io/regent/#/?id=lessthan)
    - [`lessThanOrEquals`](https://northwesternmutual.github.io/regent/#/?id=lessthanorequals)
    - [`regex`](https://northwesternmutual.github.io/regent/#/?id=regex)
    - [`typeOf`](https://northwesternmutual.github.io/regent/#/?id=typeof)
  - [Custom Predicates](https://northwesternmutual.github.io/regent/#/?id=custom-predicates)
    - [`crown`](https://northwesternmutual.github.io/regent/#/?id=crown)
    - [`init`](https://northwesternmutual.github.io/regent/#/?id=init)
- [Composition](https://northwesternmutual.github.io/regent/#/?id=composition)
  - [`and`](https://northwesternmutual.github.io/regent/#/?id=and)
  - [`not`](https://northwesternmutual.github.io/regent/#/?id=not)
  - [`or`](https://northwesternmutual.github.io/regent/#/?id=or)
  - [`xor`](https://northwesternmutual.github.io/regent/#/?id=xor)
- [Queries](https://northwesternmutual.github.io/regent/#/?id=queries)
  - [`evaluate`](https://northwesternmutual.github.io/regent/#/?id=evaluate)
  - [`explain`](https://northwesternmutual.github.io/regent/#/?id=explain)
  - [`filter`](https://northwesternmutual.github.io/regent/#/?id=filter)
  - [`find`](https://northwesternmutual.github.io/regent/#/?id=find)

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
