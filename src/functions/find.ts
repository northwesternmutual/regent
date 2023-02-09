import evaluateRule from '../private/evaluate-rule'
import { LogicRow, LogicRowObj, LogicRowFn } from '../interfaces'

export default function find (logic: LogicRow[], data: object): LogicRowObj {
  let result: LogicRowObj
  let i = 0
  let cur: LogicRow

  while (result === undefined && i < logic.length) {
    cur = logic[i]

    if (typeof logic[i] === 'function') {
      cur = (logic[i] as LogicRowFn)(data)
    }

    if (Array.isArray(cur)) {
      result = find(cur, data)
    }

    if (evaluateRule((cur as LogicRowObj).rule, data)) {
      result = cur as LogicRowObj
    }

    i += 1
  }

  return result
}
