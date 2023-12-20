# Regent: Business Rules in JavaScript

![regent logo (the letter R wearing a crown)](https://northwesternmutual.github.io/regent/regent-small.png)

Regent lets you query a data structure by asking true or false questions. Regent logic is written as single responsibility rules that are self-documenting, composable, and human readable. Let's look at an example.

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

### some

`some(path, rule, [context = '__'])`

`path` must resolve to, or be an `array`. `some` iterates over this array and evaluates the rule against each item until one of them evaluates to true. The rule prop will have access to the current array item's data through the optional context argument.

_*Arguments*_

* `path (Array|String):` The path of the property to lookup, or an array literal
* `rule (Regent Rule):` A regent rule to evaluate each item of the array against
* `[context='__'] (String):` An optional path to place the iteration context on. Defaults to `__`

_*Returns*_

`function`: a [regent rule](#regent-rule)

_*Example*_

```javascript
import { some, equals } from regent

// In this rule the `__` refers to the current iteration of the `thisWeek` array
const IS_CLOUDY = equals('@__.weatherType', 'cloudy')
const WEEK_HAS_CLOUDY_DAY = some('@thisWeek', IS_CLOUDY, '__')

WEEK_HAS_CLOUDY_DAY({
    thisWeek: [
      { weatherType: 'sunny' },
      { weatherType: 'cloudy' },
      { weatherType: 'sunny' }
    ]
  }
)
// => true
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

## Optics

All optics are factory functions that take arguments and return a function that takes an object to query. Calling that function with an object will do some operation on that object and return the result.

An Optic is used to perform operations on the input object to prepare the data in a way that is suitable for a particular rule. The simplest example are basic mathematical operations. Regent ships with these four built-in optics.

```javascript
optics(...args)(data)
// => boolean
```

### Regent Optic

`function(object)`

Each regent optic takes an object to operate on.

_*Arguments*_

* `object (Object)`: The object to operate on.

_*Returns*_

`any`

_*Example*_

```javascript
import { plus } from 'regent`

// returns a function that takes an object to operate on
const OPTIC = plus('@a', '@b)

// invoke the function with an object to operate on
OPTIC({ a: 10, b: 5 })
// => 15
```

### plus

`plus(path1, path2)`

Sums the resolved value to `path1` with the resolved value of `path2`

_*Arguments*_

* `path1 (Any):` The path of the property to lookup, or a primitive value
* `path2 (Any):` The path of the property to lookup, or a primitive value

_*Returns*_

`function`: a [regent optic](#regent-optic)

_*Example*_

```javascript
import { plus, greaterThanOrEquals } from regent

const TEMP = plus('@temperature', '@temperatureIncrease')
const UNSAFE = greaterThanOrEquals(TEMP, 90)

UNSAFE({ temperature: 70, temperatureIncrease: 30 })
// => true
```

### minus

`minus(path1, path2)`

Subtracts the resolved value to `path1` with the resolved value of `path2`

_*Arguments*_

* `path1 (Any):` The path of the property to lookup, or a primitive value
* `path2 (Any):` The path of the property to lookup, or a primitive value

_*Returns*_

`function`: a [regent optic](#regent-optic)

_*Example*_

```javascript
import { minus, lessThanOrEqual } from regent

const TEMP = minus('@temperature', '@temperatureDrop')
const FREEZING = lessThanOrEqual(TEMP, 32)

FREEZING({ temperature: 40, temperatureDrop: 8 })
// => true
```

### multiply

`multiply(path1, path2)`

Multiplies the resolved value to `path1` with the resolved value of `path2`

_*Arguments*_

* `path1 (Any):` The path of the property to lookup, or a primitive value
* `path2 (Any):` The path of the property to lookup, or a primitive value

_*Returns*_

`function`: a [regent optic](#regent-optic)

_*Example*_

```javascript
import { multiply, plus, lessThanOrEquals } from regent

const C_RATIO = 5/9
const F_CONST = 32
const C_TO_F = plus(multiply('@temperature', C_RATIO), F_CONST)
const FREEZING = lessThanOrEquals(C_TO_F, 32)

FREEZING({ temperature: 0 }) // true
FREEZING({ temperature: 1 }) // false  
```

### divide

`divide(path1, path2)`

Divides the resolved value to `path1` with the resolved value of `path2`

_*Arguments*_

* `path1 (Any):` The path of the property to lookup, or a primitive value
* `path2 (Any):` The path of the property to lookup, or a primitive value

_*Returns*_

`function`: a [regent optic](#regent-optic)

_*Example*_

```javascript
import { divide, lessThan, greaterThan, none } from regent
 
const HUMIDITY = divide('@waterVapor', '@waterContent')
const LOW = lessThan(HUMIDITY, 0.3)
const HIGH = greaterThan(HUMIDITY, 0.5)
const COMFORTABLE = none(LOW, HIGH))

COMFORTABLE({ waterVapor: 1000, waterContent: 2600 })
// => true
```

## Composition

All regent rules can be composed using built in composition functions. Each composition function takes regent rules, or boolean literals, and returns a regent rule.

### and

`and(...rules)`

`and` takes any number of regent rules checks that they are all true

_*Arguments*_

* `rule (Regent rule)` one or more regent rules

_*Returns*_

`function`: a [regent rule](#regent-rule)

_*Example*_

```javascript
import { greaterThan, equals, and } from 'regent'

const IS_RAINING = equals('@isRaining', true)
const IS_WARM = greaterThan('@temperature', 68)
const IS_RAINING_AND_WARM = and(IS_RAINING, IS_WARM)

IS_RAINING_AND_WARM({ isRaining: true, temperature: 70 })
// => true
```

### none

`none(...rules)`

`none` takes any number of regent rules checks that none of them are true. It is equivalent to `not(or(...rules))`

_*Arguments*_

* `rule (Regent rule)` one or more regent rules

_*Returns*_

`function`: a [regent rule](#regent-rule)

_*Example*_

```javascript
import { greaterThan, equals, none } from 'regent'

const IS_RAINING = equals('@isRaining', true)
const IS_WARM = greaterThan('@temperature', 68)
const NOT_RAINING_AND_COLD = none(IS_RAINING, IS_WARM)

NOT_RAINING_AND_COLD({ isRaining: false, temperature: 42 })
// => true
```

### not

`not(rule)`

`not` takes a single regent rule checks that it is false

_*Arguments*_

* `rule (Regent rule)` A single regent rule

_*Returns*_

`function`: a [regent rule](#regent-rule)

_*Example*_

```javascript
import { greaterThan, not } from 'regent'

const IS_WARM = greaterThan('@temperature', 68)
const IS_COLD = not(IS_WARM)

IS_COLD({ temperature: 42 })
// => true
```

### or

`or(...rules)`

`or` takes one ore more regent rules and checks that at least one is true

_*Arguments*_

* `rule (Regent rule)` One or more regent rules

_*Returns*_

`function`: a [regent rule](#regent-rule)

_*Example*_

```javascript
import { lessThan, equals, or } from 'regent'

const IS_RAINING = equals('@isRaining', true)
const IS_COLD = lessThan('@temperature', 58)
const WEAR_A_JACKET = or(IS_RAINING, IS_COLD)

WEAR_A_JACKET({ isRaining: false, temperature: 42 })
// => true

WEAR_A_JACKET({ isRaining: true, temperature: 78 })
// => true
```

### xor

`xor(rule1, rule2)`

`xor` takes two regent rules and checks that at least one but not both are true

_*Arguments*_

* `rule1 (Regent rule)` Regent rule
* `rule2 (Regent rule)` Regent rule

_*Returns*_

`function`: a [regent rule](#regent-rule)

_*Example*_

```javascript
import { equals, xor } from 'regent'

const HAS_UMBRELLA = equals('@umbrella', true)
const IS_INSIDE = equals('@inside', true)
const ADEQUATELY_PREPARED_FOR_RAIN = xor(HAS_UMBRELLA, IS_INSIDE)

// Outside with an umbrella
ADEQUATELY_PREPARED_FOR_RAIN({ umbrella: true, inside: false })
// => true

// Inside with no umbrella
ADEQUATELY_PREPARED_FOR_RAIN({ umbrella: false, inside: true })
// => true

// Outside with no umbrella
ADEQUATELY_PREPARED_FOR_RAIN({ umbrella: false, inside: false })
// => false

// Inside with an umbrella
ADEQUATELY_PREPARED_FOR_RAIN({ umbrella: true, inside: true })
// => false
```

## Custom Predicates and Optics

Regent exports two functions for creating your own predicates and optics. These functions will allow your function to be used like any other predicate or optic.

### predicate

`predicate(fn, name)`

The `predicate` function takes any function that returns a boolean and returns a regent Predicate function with the name given as the second argument. 

_*Arguments*_

* `fn (Function)` any function that returns a `boolean`
* `name (String)` a string that will provide a name for the `Predicate`. It's used in the toJson() output. Defaults to `unknown`

_*Returns*_

`function`: a [regent predicate](#predicates)

_*Example*_

```javascript
import _includes from 'lodash.includes` // https://lodash.com/docs/3.10.1#includes
import { predicate } from 'regent'

const includes = predicate(_includes, 'includes')

const IS_RAINING = includes('@precipitationTypes', 'rain')

IS_RAINING({
  precipitationTypes: [
    'rain',
    'snow'
  ]
})
// => true
```

### optic

`optic(fn, name)`

The `optic` function takes any function that returns any value and returns a regent `Optics` function with the name given as the second argument. 

_*Arguments*_

* `fn (Function)` any function that returns a `any`
* `name (String)` a string that will provide a name for the `Optics`. It's used in the toJson() output. Defaults to `unknown`

_*Returns*_

`function`: a [regent optics](#optics)

_*Example*_

```javascript
import _every from 'lodash.every` // https://lodash.com/docs/3.10.1#every
import { optic } from 'regent'

const every = optic(_every, 'every')

const IS_SUNNY = equals('@weatherType', 'sunny')
const NEXT_THREE_DAYS_ARE_SUNNY = every('@thisWeek', IS_SUNNY)

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

### make

`make(fn, name)`

The `make` function is an alias to the `predicate` function. Exists for backward compatibility with earlier version of Regent.

_*Arguments*_

* `fn (Function)` any function that returns a `boolean`
* `name (String)` a string that will provide a name for the `Predicate`. It's used in the toJson() output. Defaults to `unknown`

_*Returns*_

`function`: a [regent predicate](#predicates)

_*Example*_

```javascript
import _includes from 'lodash.includes` // https://lodash.com/docs/3.10.1#includes
import { make } from 'regent'

const includes = make(_includes, 'includes')

const IS_RAINING = includes('@precipitationTypes', 'rain')

IS_RAINING({
  precipitationTypes: [
    'rain',
    'snow'
  ]
})
// => true
```

## Queries

### `find`

`find(logicArray, data)`

The `find` query will iterate over the logic array and return the entire object of first item whose rule returns `true`. It will **not** continue looking through the following rows. You can think of it like `Array.find()`. In the example below, the second array item will be returned, because `isWarm` returns `true`.

_*Arguments*_

* `logicArray (Array)` an array of objects, with each object containing at least a `rule` property set to a regent rule
* `data (Object)` the data object to query

_*Returns*_

`Object`: the first object with a `rule` property that evaluates to true

_*Example*_

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
find(clothingLogic, data);
// => { value: ['sandals', 't-shirt'], rule: isWarm }
```

`find` is equivalent to this example

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

// This example is simplified. In production we would
// probably want to make sure `x.rule` exists and is
// a function before attempting to call it
clothingLogic.find(x => x.rule(data))
// => { value: ['sandals', 't-shirt'], rule: isWarm }
```

### `filter`

`filter(logicArray, data)`

The `filter` query has the same signature as `find`, but returns an array of all the rows whose rules all return `true`. If there are no matches, it will return an empty array. You can think of it like `Array.filter()`. In the example below, `filter` will return an array of all rows that have a rule that evaluates to `true`.

_*Arguments*_

* `logicArray (Array)` an array of objects, with each object containing at least a `rule` property set to a regent rule
* `data (Object)` the data object to query

_*Returns*_

`Array`: array of objects with a `rule` property that evaluates to true

_*Example*_

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
filter(clothingLogic, data);
// => [{ value: ['sandals', 't-shirt'], rule: isWarm }, { value: ['umbrella'], rule: isRaining }]
```

`filter` is equivalent to this example

```javascript
import { filter, greaterThan, not } from 'regent';

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

// This example is simplified. In production we would
// probably want to make sure `x.rule` exists and is
// a function before attempting to call it
clothingLogic.filter(x => x.rule(data))
// => [{ value: ['sandals', 't-shirt'], rule: isWarm }, { value: ['umbrella'], rule: isRaining }]
```

### Query Advanced Usage (find/filter)

The "Logic Array" passed to the find/filter queries can be comprised of more complex rows. In the simple usage example above, each row in the array is an object with a `rule` property (`LogicRowObj`), but there are two more types that are allowed. The first is another "Logic Array" (`LogicRow[]`). Logic arrays can be nested to any arbitrary complexity. The second is a function that returns a Logic Row, or Logic Array (`LogicRowFn`).

To summarize, the following is an example of a logic array containing all the allowed types:

```javascript
const data = { foo: 'foo' }
const RULE = equals('@foo', 'foo')

const logicArray = [
  // LogicRowObj
  { rule: RULE, any: 'Hello World' },

  // LogicRow[]
  [{ rule: RULE, any: 'Hello World' }, { rule: RULE, 'Goodbye World' }],

  // LogicRowFn
  (data) => { rule: RULE, any: 'Hello World' }

  // LogicRowFn
  (data) => [{ rule: RULE, any: 'Hello World' }]
]
```

`LogicRow[]`s are deeply searched.

`LogicRowFn` are executed with `data` and then deeply searched.

In the case of `find` the first `LogicRowObj` with a `rule` that evaluates to true will be returned.

In the case of `filter` an array containing all `LogicRowObj`s with a `rule` that evaluates to true will be returned.

The advanced functionality is meant to be used for dynamically creating Logic Arrays. Here are some example use cases:

#### Data driven result

```javascript
const data = { place: 'Mars' }
const isMars = equals('@place', 'Mars')
const isEarth = equals('@place', 'Earth')

const logicArray = [
  (data) => { result: `Hello ${data.place}`, rule: isMars },
  
  { result: 'Hello World', rule: isEarth }
]

find(logicArray, data) // { result: 'Hello Mars' }
```

#### Dynamically created rows

```javascript
const data = { days: [{ temp: 90 }, { temp: 79 }, { temp: 81 }] }

const logicArray = [
  // Create a logic row for each planet in data
  (data) => data.days.map((day, i) => ({
    result: `Day ${i + 1} was hot! A stunning ${day.temp} degrees!`,
    rule: greaterThan(`@data.days[${i}].temp`, 80)
  }))
]

filter(logicArray, data)

// [
//   { result: 'Day 1 was hot! A stunning 90 degrees!' },
//   { result: 'Day 3 was hot! A stunning 81 degrees!' },
// ]
```


## Parse

`parse(JSONRulesObject)`

The `parse` function parses JSON defined regent rules into functional regent rules. Defining rules as JSON makes it easier to share rule definitions across multiple applications

_*Arguments*_

* `JSONRulesObject (JSON Object)` a JSON object of regent rule definitions

Each top level property name becomes a rule name. Each predicate can be defined with the pattern `<predicateName>: [...args]`.

Composed rules can be defined with the pattern `<compositionPredicateName>: [<predicateName>: [...args], <predicateName>: [...args]]`

_*Returns*_

`Object`: object of functional regent rules

_*Example*_

```javascript
const json = {
  "fooAndBar": {
    "and": [{
      "equals": ["@foo", "foo"]
    }, {
      "equals": ["@bar", "bar"]
    }]
  },

  "emptyFoo": {
    "empty": ["@foo"]
  },

  "fooEqualsFoo": {
    "equals": ["@foo", "foo"]
  },

  "everyRule": {
    "every": ["@arr", {
      "equals": ["@__", "foo"]
    }]
  },

  "greaterThanOrEqualsRule": {
    "greaterThanOrEquals": ["@foo", 10]
  },

  "greaterThanRule": {
    "greaterThan": ["@foo", 10]
  },

  "lessThanOrEqualsRule": {
    "lessThanOrEquals": ["@foo", 10]
  },

  "lessThanRule": {
    "lessThan": ["@foo", 10]
  },

  "noneRule": {
    "none": [{
      "equals": ["@foo", "foo"]
    }, {
      "equals": ["@bar", "bar"]
    }]
  },

  "notRule": {
    "not": [{
      "equals": ["@foo", "foo"]
    }]
  },

  "orRule": {
    "or": [{
      "equals": ["@foo", "foo"]
    }, {
      "equals": ["@foo", "bar"]
    }]
  },

  "regexRule": {
    "regex": ["@foo", "^he[l]lo"]
  },

  "someRule": {
    "some": ["@arr", {
      "equals": ["@__", "foo"]
    }]
  },

  "typeOfRule": {
    "typeOf": ["@foo", "string"]
  },

  "xorRule": {
    "xor": [{
      "equals": ["@foo", "foo"]
    }, {
      "equals": ["@bar", "bar"]
    }]
  }
}

const {
  fooAndBar,
  emptyFoo,
  fooEqualsFoo,
  everyRule,
  greaterThanOrEqualsRule,
  greaterThanRule,
  lessThanOrEqualsRule,
  lessThanRule,
  noneRule,
  notRule,
  orRule,
  regexRule,
  someRule,
  typeOfRule,
  xorRule
} = parseFn(json)
```

## lookups

`lookups(RegentRule)`

The `lookups` function accepts a RegentRule and returns an array of the lookups referenced by that rule. The RegentRule provided can be arbitrarily complex.

_*Arguments*_

* `RegentRule (Plain Object)`

_*Returns*_

`Array`: an array containing all the lookups present in the provided rule.

_*Example*_

```javascript
import { equals, lessThan, lookups } from 'regent';

const isRaining = equals('@weather.precipitation', true);
const isCalm = lessThan('@weather.wind.speed', 25);
const isRainingAndCalm = and(isRaining, isCalm);

const paths = lookups(isRainingAndCalm);

// [
//   '@weather.precipitation',
//   '@weather.wind.speed',
// ]
```

## Utilities

### toJson

`Rule.toJson()`

The `toJson` utility can be used to export rule definitions to JSON. This utility is handy if your rules are all defined as functions and you want to transport the rules into another system, application, or store in a database.

_*Arguments*_

* `data? (Object)`: When provided, the resulting JSON will include the lookup and the value that the lookup will resolve to. 

_*Returns*_

* `JSONRulesObject (JSON Object)` a JSON object of regent rule definitions

_*Example*_

```javascript
const isRaining = equals('@isRaining', true)
const isCalm = lessThan('@windSpeedInMph', 25)
const isRainingAndCalm = and(isRaining, isCalm)

const isRainingJson = isRaining.toJson()
// { "equals": ["isRaining", true] }

const isRainingAndCalmJson = isRainingAndCalm.toJson()
// {
//   "and": [
//     { "equals": ["@isRaining", true] },
//     { "lessThan": ["@windSpeedInMph", 25] }
//   ]
// }
```

```javascript
const isRaining = equals('@isRaining', true)
const isCalm = lessThan('@windSpeedInMph', 25)
const isRainingAndCalm = and(isRaining, isCalm)

const data = { isRaining: false, windSpeedInMph: 21 }

const isRainingJson = isRaining.toJson(data)
// { "equals": ["isRaining -> false", true] }

const isRainingAndCalmJson = isRainingAndCalm.toJson(data)
// {
//   "and": [
//     { "equals": ["@isRaining -> false", true] },
//     { "lessThan": ["@windSpeedInMph -> 21", 25] }
//   ]
// }
```

## License

MIT
