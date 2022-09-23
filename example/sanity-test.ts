import { equals, greaterThan, and, or, xor, filter, every, some } from '../dist/regent'
import not from '../src/functions/not'

const FOO_IS_BAR = equals('@foo', 'bar')
const BIZ_GT_13 = greaterThan('@biz', 13)

const BAR_AND_GREATER = and(FOO_IS_BAR, BIZ_GT_13)
const EITHER_OR_RULE = or(FOO_IS_BAR, BIZ_GT_13)
const EITHER_XOR_RULE = xor(FOO_IS_BAR, BIZ_GT_13)

// In this rule the `__` refers to the current iteration of the `thisWeek` array
const IS_SUNNY = equals('@__.weatherType', 'sunny')
const NEXT_THREE_DAYS_ARE_SUNNY = every('@thisWeek', IS_SUNNY, '__')
const MIGHT_RAIN = equals('@~~.rain', true)
const CHANCE_OF_RAIN = some('@thisWeek', MIGHT_RAIN, '~~')

const weatherData = {
  thisWeek: [
    { weatherType: 'sunny', rain: true },
    { weatherType: 'sunny', rain: false },
    { weatherType: 'sunny', rain: false }
  ]
}

const data = {
  foo: 'bar',
  biz: 42
}

const LOGIC = [
  { rule: FOO_IS_BAR, text: 'all' },
  { rule: BIZ_GT_13, text: 'good!' },
  { rule: not(FOO_IS_BAR), text: 'nope' }
]

console.log(FOO_IS_BAR.toJson())

// ========== THUMBS UP TIME ============= //

console.log('FILTER:',
  filter(LOGIC, data)
    .map(x => x.text)
    .join(' ') === 'all good!'
    ? '👍'
    : '👎'
)
console.log('EQUALS:', FOO_IS_BAR(data) ? '👍' : '👎')
console.log('GREATER_THAN:', BAR_AND_GREATER(data) ? '👍' : '👎')
console.log('OR:', EITHER_OR_RULE(data) ? '👍' : '👎')
console.log('XOR:', EITHER_XOR_RULE(data) ? '👎' : '👍')
console.log('EVERY:', NEXT_THREE_DAYS_ARE_SUNNY(weatherData) ? '👍' : '👎')
console.log('SOME && CUSTOM CONTEXT:', CHANCE_OF_RAIN(weatherData) ? '👍' : '👎')
console.log('TO_JSON', FOO_IS_BAR.toJson() === '{"equals":["@foo","bar"]}' ? '👍' : '👎')
