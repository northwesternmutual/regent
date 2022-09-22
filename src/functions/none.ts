import or from './or'
import isRule from '../private/is-rule'
import attachToJson from '../private/attach-to-json'
import { Rule, RuleFunction } from '../interfaces'

export default (...rules: Rule[]): RuleFunction => {
  return attachToJson(function none (data: object): boolean {
    return !or(...rules)(data)
  }, rules, 'none')
}
