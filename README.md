# Regent: A JavaScript Rule Engine

Regent provides a lightweight framework aimed at helping you organize your application's business logic.

## Installation

`npm install --save regent`

## Documentation

### Queries

**findFirst**

Returns the first logic row who's rules all evaluate to true. findFirst returns the entire logic row, including the rules array.


```javascript
// findFirst(data, logic, [customEvaluators])

import regent from 'regent';
const { findFirst } = regent.init();

const data = {
  species: 'human',
};

const logic = [
  { type: 'reptile', rules: [{ key: 'species', fn: 'inArray', params: ['snake', 'lizard'] }] },
  { type: 'mammal', rules: [{ key: 'species', fn: 'equals', params: ['human'] }] }
]

findFirst(data, logic) // { type: 'mammal', rules: [{ key: 'species', fn: 'equals', params: ['human'] }] }
```



**findAll**

Returns an array of all logic rows that evaluate to true.

```javascript
// findAll(data, logic, [customEvaluators])

import regent from 'regent';
const { findAll } = regent.init();

const data = {
  species: 'snake',
};

const logic = [
  { type: 'reptile', rules: [{ key: 'species', fn: 'inArray', params: ['snake', 'lizard'] }] },
  { type: 'mammal', rules: [{ key: 'species', fn: 'equals', params: ['human'] }] },
]

findAll(data, logic) // [ { type: 'reptile', rules: [{ key: 'species', fn: 'inArray', params: ['snake', 'lizard'] }] } ]
```



**rule**

Returns a boolean value based on the truthiness of the provided rule and data set.

```javascript
// rule(data, rule, [customEvaluators])

import regent from 'regent';
const { rule } = regent.init();

const data = {
  species: 'snake',
};

const isReptile = { type: 'reptile', rules: [{ key: 'species', fn: 'inArray', params: ['snake', 'lizard'] }] };

rule(data, isReptile) // returns true
```

### Helpers

**and**

The `and` helper function creates a composed rule from any number of rules. The combined rule will return true if ALL of the sub-rules evaluate to true.

`and(<array>)`

```javascript
const tall = { key: 'height', fn: 'greaterThan', params: [6] };
const handsome = { key: 'looks', fn: 'greaterThan', params: [90] };

const tallAndHandsome = and([tall, handsome]);
```

**or**

The `or` helper function creates a composed rule from any number of rules. The combined rule will return true if ANY of the sub-rules are true.

`or(<array>)`

```javascript
const chocolate = { key: 'food', fn: 'equals', params: ['chocolate'] };
const peanutButter = { key: 'food', fn: 'equals', params: ['peanut butter'] };

const isDelicious = or([chocolate, peanutButter]);
```

**not**

The `not` helper function creates a composed rule that returns the inverse of the rule passed into it.

`not(<object>)`

```javascript
const olsenTwin = { key: 'name', fn: 'inArray', params: ['Mary Kate', 'Ashley'] };
const notOlsenTwin = not(olsenTwin);
```


### Evaluators

**arrayLengthGreaterThan**

Checks that the key value is an array, and its length is greater than the supplied numeric param.

`arrayLengthGreaterThan(<array>input, <array[string, int]>params)`

```javascript
arrayLengthGreaterThan(['foo', 'bar', 'baz'], [2]) // true
arrayLengthGreaterThan(['foo', 'bar', 'baz'], [3]) // false
arrayLengthGreaterThan(['foo', 'bar', 'baz'], ['2']) // true
arrayLengthGreaterThan(['foo', 'bar', 'baz'], ['5']) // false
```

**arraysMatch**

Checks that key value array matches the contents of the params array, irrespective of item order.

`arraysMatch(<array>input, <array>params)`

```javascript
arraysMatch(['foo', 'bar', 'baz'], ['foo', 'bar', 'baz']) // true
arraysMatch(['foo', 'bar', 'baz'], ['bar', 'baz', 'foo']) // true
arraysMatch([], []) // true
arraysMatch(['foo', 'bar'], ['foo', 'bar', 'baz']) // false
```

**dateAfterInclusive**

Checks that the key value date string is on or after the date string param.
Uses [Date.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) interally to compare the params.

`dateAfterInclusive(<array[string, int]>input, <array[string, int]>params)`

```javascript
dateAfterInclusive('2018-01-01', ['2017-12-31']) // true
dateAfterInclusive('2018-01-01', [1514678400000]) // true
dateAfterInclusive('2018-01-01T23:59:59', ['2018-01-01T00:00:00']) // true
dateAfterInclusive('2018-01-01', ['2018-01-01']) // true
dateAfterInclusive('2018-01-01', ['2018-02-28']) // false
```

**dateBeforeInclusive**

Checks that the key value date string is on or before the date string param.
Uses [Date.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) interally to compare the params.

`dateBeforeInclusive(<array[string, int]>input, <array[string, int]>params)`

```javascript
dateBeforeInclusive('2017-12-31', ['2018-01-01']) // true
dateBeforeInclusive('2017-12-31', [1514764800000]) // true
dateBeforeInclusive('2018-01-01T00:00:00', ['2018-01-01T23:59:59']) // true
dateBeforeInclusive('2018-01-01', ['2018-01-01']) // true
dateBeforeInclusive('2018-02-28', ['2018-01-01']) // false
```

**dateBetweenInclusive**

Checks that the key value date string is on or between the two date string params.
Uses [Date.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) interally to compare the params.

`dateBetweenInclusive(<array[string, int]>input, <array[string, int]>params)`

```javascript
dateBetweenInclusive('2017-12-31', ['2018-01-01', '2017-12-25']) // true
dateBetweenInclusive('2018-01-01', ['2018-01-01', '2017-12-25']) // true
dateBetweenInclusive('2017-12-25', ['2018-01-01', '2017-12-25']) // true
dateBetweenInclusive('2018-02-28', ['2018-01-01', '2017-12-25']) // false
dateBetweenInclusive('1945-12-07', ['2018-01-01', '2017-12-25']) // false
```

**empty**

Returns true if the value is not `undefined`, `null`, `'undefined'`, or `''`;

```javascript
empty() // true
empty('') // true
empty(null) // true
empty(undefined) // true
empty('some value') // false
empty({}) // false
empty([]) // false
empty(['']) // false
```

**equals**

Checks that key value strictly equals every param array item.

`equals(<string, int>input, <array[string, int]>params)`

```javascript
equals('hello', ['hello']) // true
equals('hello', ['world']) // false
equals('foo', ['foo', 'foo']) // true
equals('foo', ['foo', 'bar']) // false
```

**greaterThan**

Returns true if the input value is greater than every number provided in the args array

```javascript
greaterThan(4, [1]) // true
greaterThan(4, [1, 2, 3]) // true
greaterThan(4, [5]) // false
greaterThan(4, [1, 2, 3, 4, 5]) // false
```

**inArray**

Returns true if the input item is in the array of params.

```javascript
inArray('bar', ['foo', 'bar', 'baz']) // true
inArray('bar', ['bar']) // true
```

**match**

Returns true if all the items in the input array are present in the params array. `match` does not care about order.

Note: match will not match arrays of arrays, or arrays of objects.

```javascript
match(['foo', 'bar'], ['foo', 'bar']) // true
match(['foo', 'bar'], ['bar', 'foo']) // true
match([1, true, 2], [1, true]) // true
match(['foo', 'bar'], ['foo', 'bar', 'baz']) // false
```


**numericRange**

Returns true if the value is between param item 1 and 2.

```javascript
numericRange(10, [1, 100]) // true
numericRange(10, [20, 100]) // false
```

**regex**

Returns true if the regex provided as a param matches the input

```javascript
regex('hello world', /world/) // true
regex('baz123', /[a-z]+[0-9]+/) // true
regex('123baz', /[a-z]+[0-9]+/) // false
```

**subString**

Returns true if the value exists in any of the provided params

```javascript
subString('hello', ['I did not say hello, I said good day']) // true
subString('az', ['foo', 'bar', 'baz']) // true
```

### Custom Evaluators

You can provide your own custom evaluator functions. An object of evaluator functions can be passed in when you call init.

```javascript
const customEvaluators = {
  skyColorIsvalid: (input) => {
    let result = false;
    const validColors = [
      'blue',
      'orange',
      'black',
      'red',
    ];
    validColors.forEach(arg => {
      if (input === arg) {
        result = true;
      }
    });

    return result;
  }
}
```

You can now use this evaluator in your rules.

```javascript
// init jaRule with customEvaluators
const jaRule = regent.init(customEvaluators);

const skyIsValidColor = { key: 'skyColor', fn: 'skyColorIsValid' };
jaRule.rule({ skyColor: 'blue' }, skyIsValidColor) // true
```

## Usage

**rules.js**

The rules.js file will hold your application logic. The rules file should export an object. The properties of this object will be how you reference this specific rule in your application.

```javascript
  import { or, and, not } from 'regent';

  export const isHuman = { key: 'species', fn: 'equals', params: ['human'] };
  export const isDog = { key: 'species', fn: 'equals', params: ['canine'] };
  export const olderThan30 = { key: 'vitals.age', fn: 'greaterThan', params: [30] };

  // an example of an or relationship
  export const humanOrDog = or([isHuman, isDog]);

  // an example of an and relationship
  export const humanOver30 = and([isHuman, olderThan30]);

  // an example of a negative rule
  export const notHuman = not(isHuman);
```

**greeting-logic.js**

Your logic files will be where you compose your rules from `rules.js` and the data that you want to make available. Using `ja.findFirst()` will return the first logic array item who's array of rules all return `true`.

```javascript
import * as R from './rules';

export default [
  { greeting: 'Welcome human!', rules: [R.isHuman] },
  { greeting: 'Aarf!', rules: [R.isDog] },
  { greeting: 'Hello sir.', rules: [R.humanOver30] },
];
```

**greet-user.js**

You can invoke these rules by calling one of the `ja` helper

```javascript
import regent from 'regent';
import logic from './greeting-logic'

// Running init allows you to inject custom evaluators,
// we will get to that later
const { findFirst } = regent.init();

const data = {
  species: 'human',
  vitals: {
    age: 34,
  },
};

const appropriateGreeting = findFirst(data, logic).greeting; // "Hello sir."

const dogData = {
  species: 'dog',
};

const dogGreeting = findFirst(dogData, logic).greeting; // "Aarf!"
```
