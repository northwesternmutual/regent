import evaluateRule from '../private/evaluate-rule'
import { LogicRow } from '../interfaces'

export default (logic: LogicRow[], data: object): LogicRow[] => logic.filter((x) => {
  return evaluateRule(x.rule, data)
})
