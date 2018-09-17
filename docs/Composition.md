# Composition

With Regent it is always best to define your rules as granular as possible. To help you with this pattern, either compose rules manually or Regent’s composition helpers to build them up into more complex pieces.

## Composing Rules Using Helpers

Regent’s built-in composition helpers are:

- [and](#and)
- [or](#or)
- [xor](#xor)
- [not](#not)

### `and`

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

### `or`

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

### `xor`

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

### `not`

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

## Composing Rules Manually

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

[Source](../examples/composition-with-and-manually.js)
