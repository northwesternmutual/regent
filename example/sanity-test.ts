import { equals, greaterThan, and, or, xor, filter, find, every, some, regex } from '../dist/regent'
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

const STRING_AS_DATA = equals('@[1]', 'b') // access the first element of an array; strings can be accessed like arrays

const REVERSED_PARAMS = greaterThan(42, '@number')

const TO_JSON_WITH_REGEX = regex('@foo', '/[a-z]+[0-9]+/g')

function resultFormat (bool: boolean): string {
  return bool ? '👍' : '❌'
}

// ========== THUMBS UP TIME ============= //

console.log('FILTER:',
  resultFormat(filter(LOGIC, data)
    .map(x => x.text)
    .join(' ') === 'all good!')
)
console.log('FIND:',
  resultFormat(find(LOGIC, data).text === 'all')
)
console.log('EQUALS:', resultFormat(FOO_IS_BAR(data)))
console.log('GREATER_THAN:', resultFormat(BAR_AND_GREATER(data)))
console.log('OR:', resultFormat(EITHER_OR_RULE(data)))
console.log('XOR:', resultFormat(!EITHER_XOR_RULE(data)))
console.log('EVERY:', resultFormat(NEXT_THREE_DAYS_ARE_SUNNY(weatherData)))
console.log('SOME && CUSTOM CONTEXT:', resultFormat(CHANCE_OF_RAIN(weatherData)))
console.log('STRING AS DATA:', resultFormat(STRING_AS_DATA('abcd')))
console.log('REVERSED PARAMS:', resultFormat(REVERSED_PARAMS({ number: 40 })))
console.log('TO_JSON', resultFormat(FOO_IS_BAR.toJson() === '{"equals":["@foo","bar"]}'))
console.log('TO_JSON with regex', resultFormat(TO_JSON_WITH_REGEX.toJson() === '{"regex":["@foo","/[a-z]+[0-9]+/g"]}'))
