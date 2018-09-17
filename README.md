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

[Source](../examples/basic-example.js)

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

When conditional logic becomes too complex (and it will), use Regent’s [explain](docs/Queries.md#explain) method to simplify the abstraction.

## Documentation

- [Rules](docs/Rules.md)
- [Predicates](docs/Predicates.md)
  - [Built-in Predicates](docs/Predicates.md#built-in-predicates)
    - [constants](docs/Predicates.md#constants)
    - [dateAfterInclusive](docs/Predicates.md#dateAfterInclusive)
    - [dateBeforeInclusive](docs/Predicates.md#dateBeforeInclusive)
    - [deepEquals](docs/Predicates.md#deepEquals)
    - [empty](docs/Predicates.md#empty)
    - [equals](docs/Predicates.md#equals)
    - [greaterThan](docs/Predicates.md#greaterThan)
    - [greaterThanOrEquals](docs/Predicates.md#greaterThanOrEquals)
    - [includes](docs/Predicates.md#includes)
    - [lessThan](docs/Predicates.md#lessThan)
    - [lessThanOrEquals](docs/Predicates.md#lessThanOrEquals)
    - [regex](docs/Predicates.md#regex)
    - [typeOf](docs/Predicates.md#typeOf)
  - [Custom Predicates](docs/Predicates.md#custom-predicates)
    - [crown](docs/Predicates.md#crown)
    - [init](docs/Predicates.md#init)
- [Composition](docs/Composition.md)
  - [and](docs/Composition.md#and)
  - [not](docs/Composition.md#not)
  - [or](docs/Composition.md#or)
  - [xor](docs/Composition.md#xor)
- [Queries](docs/Queries.md)
  - [evaluate](docs/Queries.md#evaluate)
  - [explain](docs/Queries.md#explain)
  - [filter](docs/Queries.md#filter)
  - [find](docs/Queries.md#find)

## Examples

- [Weather](examples/weather.js)
- [Batman Flow Chart](examples/batman-flow-chart.js)
- TODO: List more examples

## License

MIT
