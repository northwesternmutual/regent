import isRule from '../private/is-rule'
import evaluateRule from '../private/evaluate-rule'
import attachToJson from '../private/attach-to-json'

export default (...rules) => {
  // throw if one or more of the rules are
  // not rules
  if (!rules.every(x => isRule(x))) {
    throw new Error('Regent: xor requires all arguments to be a function')
  }

  if (rules.length !== 2) {
    throw Error('Regent: xor must take exactly 2 rules')
  }
  return attachToJson(function xor (data) {
    return (evaluateRule(rules[0], data) || evaluateRule(rules[1], data)) && !(evaluateRule(rules[0], data) && evaluateRule(rules[1], data))
  }, rules, 'xor')
}
