# Regent: Business Rules in JavaScript

![regent logo (the letter R wearing a crown)](https://github.com/northwesternmutual/regent/blob/master/docs/regent-logo-holographic.png)

Regent lets you ask true and false questions of any data structure. Regent logic is written as single responsibility rules that are self-documenting, composable, and human readable. Let's look at an example.

> _If it is raining the `isUmbrellaNeeded` rule should evaluate to `true`_

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

> _In this next example the rules `isCold` and `isSunny` will evaluate to true, so the "Winter hat" and "Sunglasses" rows will be returned_

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

## Predicates

All predicates are factory functions that take arguments and return a function that takes an object to query. Calling that function with an object will return a `boolean` based on the rules.

```javascript
predicate(...args)(data)
// => boolean
```

### Regent Rule

`function(object)`

Each regent rule takes an object to query.

_*Arguments*_

* `object (Object)`: The object to query.

_*Returns*_

`boolean`

_*Example*_

```javascript
import { equals } from 'regent`

// returns a function that takes an object to query
const RULE = equals('@foo', true)

// invoke the function with an object to query
RULE({ foo: true })
// => true
```

### empty

`empty(path)`

Checks whether the resolved value the path is `undefined`, `null`, `''`, or `'undefined'`.

_*Arguments*_

* `path (String):` The path of the property to get.

_*Returns*_

`function`: a [regent rule](#regent-rule)

_*Example*_

```javascript
import { empty } from regent

const NO_PRECIPITATION = empty('@precipitationTypes')

NO_PRECIPITATION({ precipitationTypes: null })
// => true
```

### equals

`equals(path1, path2)`

Checks whether the resolved value to `path1` is strictly equal (`===`) to the resolved value of `path2`

_*Arguments*_

* `path1 (Any):` The path of the property to lookup, or a primitive value
* `path2 (Any):` The path of the property to lookup, or a primitive value

_*Returns*_

`function`: a [regent rule](#regent-rule)

_*Example*_

```javascript
import { equals } from regent

const IS_SUNNY = equals('@weatherType', 'sunny')
const IS_RAINING = equals('raining', '@weatherType')
const SAME_WEATHER_TOMORROW = equals('@today.weatherType', '@tomorrow.weatherType')

IS_SUNNY({ weatherType: 'sunny' })
// => true

IS_RAINING({ weatherType: 'raining' })
// => true

SAME_WEATHER_TOMORROW({
  today: {
    weatherType: 'sunny'
  },
  tomorrow: {
    weatherType: 'sunny'
  }
})
// => true
```

### every

`every(path, rule, [context = '__'])`

`path` must resolve to, or be an `array`. `every` iterates over this array and evaluates the rule against each item. The rule prop will have access to the current array item's data through the optional context argument.

_*Arguments*_

* `path (Array|String):` The path of the property to lookup, or an array literal
* `rule (Regent Rule):` A regent rule to evaluate each item of the array against
* `[context='__'] (String):` An optional path to place the iteration context on. Defaults to `__`

_*Returns*_

`function`: a [regent rule](#regent-rule)

_*Example*_

```javascript
import { every, equals } from regent

// In this rule the `__` refers to the current iteration of the `thisWeek` array
const IS_SUNNY = equals('@__.weatherType', 'sunny')
const NEXT_THREE_DAYS_ARE_SUNNY = every('@thisWeek', IS_SUNNY, '__')

NEXT_THREE_DAYS_ARE_SUNNY({
    thisWeek: [
      { weatherType: 'sunny' },
      { weatherType: 'sunny' },
      { weatherType: 'sunny' }
    ]
  }
)
// => true
```

### greaterThanOrEquals

`greaterThanOrEquals(path1, path2)`

Checks whether the resolved value to `path1` is greater than or equal to ([>=](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Relational_operators)) to the resolved value of `path2`

_*Arguments*_

* `path1 (Number|String):` The path of the property to lookup, or a primitive value
* `path2 (Number|String):` The path of the property to lookup, or a primitive value

_*Returns*_

`function`: a [regent rule](#regent-rule)

_*Example*_

```javascript
import { greaterThanOrEquals } from regent

const IS_WARM = greaterThanOrEquals('@temperature', 68)

IS_WARM({ temperature: 68 })
// => true

IS_WARM({ temperature: 70 })
// => true

const IS_GREATER_THAN_OR_EQUAL_TO_X = greaterThanOrEquals('@letter', 'x')

IS_GREATER_THAN_OR_EQUAL_TO_X({ letter: 'z' })
// => true
```

### greaterThan

`greaterThan(path1, path2)`

Checks whether the resolved value to `path1` is greater than ([>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Relational_operators)) the resolved value of `path2`

_*Arguments*_

* `path1 (Number|String):` The path of the property to lookup, or a primitive value
* `path2 (Number|String):` The path of the property to lookup, or a primitive value

_*Returns*_

`function`: a [regent rule](#regent-rule)

_*Example*_

```javascript
import { greaterThan } from regent

const IS_WARM = greaterThan('@temperature', 68)

IS_WARM({ temperature: 68 })
// => false

IS_WARM({ temperature: 70 })
// => true

const IS_GREATER_THAN_X = greaterThan('@letter', 'x')

IS_GREATER_THAN_X({ letter: 'x' })
// => false

IS_GREATER_THAN_X({ letter: 'z' })
// => true
```

### lessThanOrEquals

`lessThanOrEquals(path1, path2)`

Checks whether the resolved value to `path1` is less than or equal to ([<=](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Relational_operators)) to the resolved value of `path2`

_*Arguments*_

* `path1 (Number|String):` The path of the property to lookup, or a primitive value
* `path2 (Number|String):` The path of the property to lookup, or a primitive value

_*Returns*_

`function`: a [regent rule](#regent-rule)

_*Example*_

```javascript
import { lessThanOrEquals } from regent

const IS_COLD = lessThanOrEquals('@temperature', 68)

IS_COLD({ temperature: 68 })
// => true

IS_COLD({ temperature: 59 })
// => true

const IS_LESS_THAN_OR_EQUAL_TO_X = lessThanOrEquals('@letter', 'x')

IS_LESS_THAN_OR_EQUAL_TO_X({ letter: 'a' })
// => true
```

### lessThan

`lessThan(path1, path2)`

Checks whether the resolved value to `path1` is less than ([<](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Relational_operators)) the resolved value of `path2`

_*Arguments*_

* `path1 (Number|String):` The path of the property to lookup, or a primitive value
* `path2 (Number|String):` The path of the property to lookup, or a primitive value

_*Returns*_

`function`: a [regent rule](#regent-rule)

_*Example*_

```javascript
import { lessThan } from regent

const IS_WARM = lessThan('@temperature', 68)

IS_WARM({ temperature: 68 })
// => false

IS_WARM({ temperature: 67 })
// => true

const IS_LESS_THAN_X = lessThan('@letter', 'x')

IS_LESS_THAN_X({ letter: 'x' })
// => false

IS_LESS_THAN_X({ letter: 'q' })
// => true
```

### regex

`regex(path, regex)`

Checks whether the resolved value to `path` matches against the provided regex

_*Arguments*_

* `path (String):` The path of the property to lookup, or a string
* `regex (Regex):` A regular expression object

_*Returns*_

`function`: a [regent rule](#regent-rule)

_*Example*_

```javascript
import { regex } from regent

const MONTH_ENDS_WITH_ARY = regex('@month', /ary$/)

MONTH_ENDS_WITH_ARY({ month: 'January' })
// => true

MONTH_ENDS_WITH_ARY({ month: 'March })
// => false
```

### typeOf

`typeOf(path, type)`

Checks whether the type of `path` is equal to the provided type

_*Arguments*_

* `path (String):` The path of the property to lookup, or a string
* `type (String):` The value to check the type against

_*Returns*_

`function`: a [regent rule](#regent-rule)

_*Example*_

```javascript
import { typeOf } from regent

const IS_VALID_TEMPERATURE = typeOf('@temperature', 'number')

IS_VALID_TEMPERATURE({ temperature: 68 })
// => true

IS_VALID_TEMPERATURE({ temperature: 'March' })
// => false
```

## License

MIT
