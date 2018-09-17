# Rules

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
