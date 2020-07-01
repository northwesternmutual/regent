import isRule from '../private/is-rule'
import evaluateRule from '../private/evaluate-rule'
import attachToJson from '../private/attach-to-json'

export default (rule) => {
  if (!isRule(rule)) {
    throw new Error('Regent: not requires the first argument to be a function')
  }

  return attachToJson(function not (data) {
    return !evaluateRule(rule, data)
  }, [rule], 'not')
}
