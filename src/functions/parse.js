import and from './and'
import empty from './empty'
import equals from './equals'
import every from './every'
import greaterThanOrEquals from './greater-than-equals'
import greaterThan from './greater-than'
import lessThanOrEquals from './less-than-equals'
import lessThan from './less-than'
import none from './none'
import not from './not'
import or from './or'
import regex from './regex'
import some from './some'
import typeOf from './type-of'
import xor from './xor'

export function buildRule (jsonRule) {
  // if typeof jsonRule === boolean
  // return it
  if (typeof jsonRule === 'boolean') {
    return jsonRule
  }

  // If jsonRule is a string, return it for a more helpful error message
  // else return the first key
  const predicate = typeof jsonRule === 'string'
    ? jsonRule
    : Object.keys(jsonRule)[0]

  switch (predicate) {
    case 'empty':
      return empty(...jsonRule[predicate])

    case 'equals':
      return equals(...jsonRule[predicate])

    case 'greaterThanOrEquals':
      return greaterThanOrEquals(...jsonRule[predicate])

    case 'greaterThan':
      return greaterThan(...jsonRule[predicate])

    case 'lessThanOrEquals':
      return lessThanOrEquals(...jsonRule[predicate])

    case 'lessThan':
      return lessThan(...jsonRule[predicate])

    case 'regex':
      // first argument is a key or literal, second is a string
      // representing a regex that needs to be parsed
      return regex(jsonRule[predicate][0], new RegExp(jsonRule[predicate][1]))

    case 'typeOf':
      return typeOf(...jsonRule[predicate])

    // composed rules
    case 'and':
      return and(...jsonRule[predicate].map(x => buildRule(x)))

    case 'every':
      // first argument is the key, the second is a rule to be built
      return every(jsonRule[predicate][0], buildRule(jsonRule[predicate][1]))

    case 'none':
      return none(...jsonRule[predicate].map(x => buildRule(x)))

    case 'not':
      return not(...jsonRule[predicate].map(x => buildRule(x)))

    case 'or':
      return or(...jsonRule[predicate].map(x => buildRule(x)))

    case 'some':
      // first argument is the key, the second is a rule to be built
      return some(jsonRule[predicate][0], buildRule(jsonRule[predicate][1]))

    case 'xor':
      return xor(...jsonRule[predicate].map(x => buildRule(x)))

    default:
      return `${predicate} is not a valid predicate`
  }
}

export default (json = {}) => {
  const result = {}

  try {
    const rules = JSON.parse(json)

    Object.keys(rules).forEach((key) => {
      result[key] = buildRule(rules[key])
    })
  } catch (e) {
    console.error(`regent.parse ${e}`)
  }

  return result
}
