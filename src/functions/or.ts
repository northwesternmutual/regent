import isRule from '../private/is-rule'
import evaluateRule from '../private/evaluate-rule'
import attachToJson from '../private/attach-to-json'
import { Rule, RuleFunction } from '../interfaces'

export default (...rules: Rule[]): RuleFunction => {
  return attachToJson(function or (data: object): boolean {
    return rules.some(x => evaluateRule(x, data))
  }, rules, 'or')
}
