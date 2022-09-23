import evaluateRule from '../private/evaluate-rule'
import attachToJson from '../private/attach-to-json'
import { Rule, RuleFunction } from '../interfaces'

export default (...rules: Rule[]): RuleFunction => {
  if (rules.length !== 2) {
    throw Error('Regent: xor must take exactly 2 rules')
  }

  return attachToJson(function xor (data: Object) {
    return (evaluateRule(rules[0], data) || evaluateRule(rules[1], data)) && !(evaluateRule(rules[0], data) && evaluateRule(rules[1], data))
  }, rules, 'xor')
}
