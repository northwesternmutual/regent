import isRule from '../private/is-rule'
import evaluateRule from '../private/evaluate-rule'
import attachToJson from '../private/attach-to-json'

export default (...rules) => {
  // throw if one or more of the rules are
  // not rules
  if (!rules.every(x => isRule(x))) {
    throw new Error('Regent: and requires all arguments to be a function')
  }

  return attachToJson(function and (data) {
    return rules.every(x => evaluateRule(x, data))
  }, rules, 'and')
}
