import isRule from '../private/is-rule'
import evaluateRule from '../private/evaluate-rule'

export default (logic, data) => logic.find((x) => {
  if (isRule(x.rule)) {
    return evaluateRule(x.rule, data)
  }

  return false
})
