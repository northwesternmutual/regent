import evaluateRule from '../private/evaluate-rule'
import { LogicRowObj } from '../interfaces'

export default (logic: LogicRowObj[], data: object): LogicRowObj => logic.find((x) => {
  return evaluateRule(x.rule, data)
})
