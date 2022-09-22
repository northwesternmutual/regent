import evaluateRule from '../private/evaluate-rule'
import attachToJson from '../private/attach-to-json'
import { Rule, RuleFunction } from '../interfaces'

export default (...rules: Rule[]): RuleFunction => {
  return attachToJson(function and (data: object): boolean {
    return rules.every(x => evaluateRule(x, data))
  }, rules, 'and')
}
