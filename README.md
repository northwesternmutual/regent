# Regent: Business Rules in JavaScript

![regent logo (the letter R wearing a crown)](https://northwesternmutual.github.io/regent/regent-logo-holographic.png)

Regent lets you query a data structure by asking true or false questions. Regent logic is written as single responsibility rules that are self-documenting, composable, and human readable. Let's look at an example.

```javascript
import { equals } from 'regent';

// return a function that evaluates to true
// if prop `isRaining` is equal to true
const isRaining = equals('@isRaining', true);

// Define your data structure
const data = { isRaining: true };

// Evaluate the rule
const isUmbrellaNeeded = isRaining(data); // true

```

[`equals` predicate documentation](https://northwesternmutual.github.io/regent/#/?id=equals)

Taking the previous example a bit further, we can refine the scenario to be more precise. We can create and combine multiple rules to test this condition

> _If it is raining **and** the wind isn't so strong the umbrella will turn inside-out and blow out of our hands, we need an umbrella._

```javascript
import { and, equals, lessThan } from 'regent';

// Define a rule for `isRaining` and a rule for `isCalm`.
// Use regent and to compose them together
const isRaining = equals('@isRaining', true);
const isCalm = lessThan('@windSpeedInMph', 25);
const isRainingAndCalm = and(isRaining, isCalm);

// Define your data structure
const data = { isRaining: true, windSpeedInMph: 20 };

// Evaluate the rule
isRainingAndCalm(data); // true
```

[`composition` documentation](https://northwesternmutual.github.io/regent/#/?id=composition)

Regent also provides a simple way to find or filter array items based on a regent rule.

```javascript
{ equals, lessThan, find, filter } from 'regent';

const isRaining = equals('@isRaining', true);
const isSunny = lessThan('@cloudCover', 10);
const isCold = lessThan('@temperature', 60);

const data = {
  isRaining: false,
  cloudCover: 0,
  temperature: 42
};

const items = [
  { item: 'Winter hat', rule: isCold },
  { item: 'Sunglasses', rule: isSunny },
  { item: 'Umbrella', rule: isRaining },
]

// filter will return an array with the Winter Hat and Sunglasses objects
// because it is cold and sunny
// [{ item: 'Winter hat', rule: isCold }, { item: 'Sunglasses', rule: isSunny }]
filter(items, data)
```

## Installation

```javascript
npm install --save regent
```

## [Documentation](https://northwesternmutual.github.io/regent/#/?id=documentation)

## License

MIT
