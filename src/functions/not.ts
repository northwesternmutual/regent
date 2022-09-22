import evaluateRule from '../private/evaluate-rule'
import attachToJson from '../private/attach-to-json'
import { Rule, RuleFunction } from '../interfaces'

export default (rule: Rule): RuleFunction => {
  return attachToJson(function not(data: object): boolean {
    return !evaluateRule(rule, data)
  }, [rule], 'not')
}
