import {
  and,
  divide,
  empty,
  equals,
  every,
  filter,
  find,
  greaterThan,
  greaterThanOrEquals,
  lessThan,
  lessThanOrEquals,
  make,
  minus,
  multiply,
  none,
  not,
  optic,
  or,
  parse,
  plus,
  predicate,
  regex,
  some,
  typeOf,
  xor
} from '../dist/regent.modern.mjs'

const customFunction = (x) => x === 12 || x === 20
const IS_12_OR_20_MAKE = make(customFunction)
const IS_12_OR_20_PREDICATE = predicate(customFunction)


const FOO_IS_BAR = equals('@foo', 'bar')
const BIZ_GT_13 = greaterThan('@biz', 13)
const BIZ_GTOE_13 = greaterThanOrEquals('@biz', 42)

const BAR_AND_GREATER = and(FOO_IS_BAR, BIZ_GT_13)
const EITHER_OR_RULE = or(FOO_IS_BAR, BIZ_GT_13)
const EITHER_XOR_RULE = xor(FOO_IS_BAR, BIZ_GT_13)

// In this rule the `__` refers to the current iteration of the `thisWeek` array
const IS_SUNNY = equals('@__.weatherType', 'sunny')
const IS_SNOW = equals('@__.weatherType', 'snow')
const NEXT_THREE_DAYS_ARE_SUNNY = every('@thisWeek', IS_SUNNY, '__')
const MIGHT_RAIN = equals('@~~.rain', true)
const CHANCE_OF_RAIN = some('@thisWeek', MIGHT_RAIN, '~~')

const NONE_RULE = none(FOO_IS_BAR, BIZ_GT_13)

const weatherData = {
  thisWeek: [
    { weatherType: 'sunny', rain: true },
    { weatherType: 'sunny', rain: false },
    { weatherType: 'sunny', rain: false }
  ]
}

const data = {
  foo: 'bar',
  biz: 42,
  items: '',
  value: 15,
  month: 'January',
}

const LOGIC = [
  { rule: FOO_IS_BAR, text: 'all' },
  { rule: BIZ_GT_13, text: 'good!' },
  { rule: not(FOO_IS_BAR), text: 'nope' }
]

const STRING_AS_DATA = equals('@[1]', 'b') // access the first element of an array; strings can be accessed like arrays

const REVERSED_PARAMS = greaterThan(42, '@number')

// Optics

const ADDITION = plus('@temperature', '@temperatureIncrease')
const DIFFERENCE = minus('@temperature', '@temperatureDecrease')
const PRODUCT = multiply('@temperature', '@temperatureIncreaseFactor')
const QUOTIENT = divide('@temperature', '@temperatureDecreaseFactor')

const UNSAFE = greaterThan(ADDITION, 100)
const UNSAFE_DIFFERENCE = greaterThan(DIFFERENCE, 100)
const UNSAFE_PRODUCT = greaterThan(PRODUCT, 100)
const UNSAFE_QUOTIENT = greaterThan(QUOTIENT, 100)

const IS_EMPTY = empty('@items')
const IS_GREATER = greaterThan('@value', 10)
const IS_LESS = lessThan('@value', 10)
const IS_LESS_OR_EQUALS = lessThanOrEquals('@value', 15)

function _minus (left, right) {
  return left - right
}

const customMinus = optic(_minus)
const TEMP = customMinus('@temperature', '@temperatureDrop')
const FREEZING = lessThanOrEquals(TEMP, 32)

const MONTH_ENDS_WITH_ARY = regex('@month', /ary$/)
const IS_VALID_TEMPERATURE = typeOf('@biz', 'number')


// ========== THUMBS UP TIME ============= //

console.log('FILTER:',
  filter(LOGIC, data)
    .map(x => x.text)
    .join(' ') === 'all good!'
    ? '👍'
    : '❌'
)

console.log('FIND:',
  find(LOGIC, data).text === 'all' ? '👍' : '❌'
)

console.log('EQUALS:', FOO_IS_BAR(data) ? '👍' : '❌')
console.log('GREATER_THAN:', BAR_AND_GREATER(data) ? '👍' : '❌')
console.log('GREATER_THAN_OR_EQUALS:', BIZ_GTOE_13(data) ? '👍' : '❌')
console.log('OR:', EITHER_OR_RULE(data) ? '👍' : '❌')
console.log('XOR:', EITHER_XOR_RULE(data) ? '❌' : '👍')
console.log('EVERY:', NEXT_THREE_DAYS_ARE_SUNNY(weatherData) ? '👍' : '❌')
console.log('SOME && CUSTOM CONTEXT:', CHANCE_OF_RAIN(weatherData) ? '👍' : '❌')
console.log('NONE', NONE_RULE({ foo: 'baz', biz: 4 }) ? '👍' : '❌')
console.log('STRING AS DATA:', STRING_AS_DATA('abcd') ? '👍' : '❌')
console.log('REVERSED PARAMS:', REVERSED_PARAMS({ number: 40 }) ? '👍' : '❌')
console.log('TO_JSON', FOO_IS_BAR.toJson() === '{"equals":["@foo","bar"]}' ? '👍' : '❌')
console.log('OPTIC ADDITION:', UNSAFE({ temperature: 95, temperatureIncrease: 30 }) ? '👍' : '❌')
console.log('OPTIC SUBTRACTION:', UNSAFE_DIFFERENCE({ temperature: 121, temperatureDecrease: 20 }) ? '👍' : '❌')
console.log('OPTIC MULTIPLICATION:', UNSAFE_PRODUCT({ temperature: 21, temperatureIncreaseFactor: 5 }) ? '👍' : '❌')
console.log('OPTIC DIVISION:', UNSAFE_QUOTIENT({ temperature: 400, temperatureDecreaseFactor: 3 }) ? '👍' : '❌')
console.log('EMPTY:', IS_EMPTY(data) ? '👍' : '❌')
console.log('GREATER_THAN:', IS_GREATER(data) ? '👍' : '❌')
console.log('LESS_THAN:', IS_LESS({ value: 5 }) ? '👍' : '❌')
console.log('LESS_THAN_OR_EQUALS:', IS_LESS_OR_EQUALS({ value: 15 }) ? '👍' : '❌')
console.log('MAKE', IS_12_OR_20_MAKE(12) ? '👍' : '❌')
console.log('PREDICATE', IS_12_OR_20_PREDICATE(20) ? '👍' : '❌')
console.log('TO JSON', BAR_AND_GREATER.toJson() === '{"and":[{"equals":["@foo","bar"]},{"greaterThan":["@biz",13]}]}' ? '👍' : '❌')
console.log('PARSE', parse('{"fooAndBar": {"and":[{"equals":["@foo","bar"]},{"greaterThan":["@biz",13]}]}}').fooAndBar(data) ? '👍' : '❌')
console.log('OPTIC', FREEZING({ temperature: 40, temperatureDrop: 8 }) ? '👍' : '❌')
console.log('REGEX', MONTH_ENDS_WITH_ARY(data) ? '👍' : '❌')
console.log('TYPEOF', IS_VALID_TEMPERATURE(data) ? '👍' : '❌')
