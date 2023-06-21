import evaluateRule from '../private/evaluate-rule'
import { LogicRow, LogicRowFn, LogicRowObj } from '../interfaces'

export default function filter (logic: LogicRow[], data: object): LogicRowObj[] {
  let result = []
  let cur: LogicRow | LogicRow[]

  for (let i = 0; i < logic.length; i += 1) {
    cur = logic[i]

    if (typeof logic[i] === 'function') {
      cur = (logic[i] as LogicRowFn)(data)
    }

    if (Array.isArray(cur)) {
      result = [...result, ...filter(cur, data)]
    } else {
      if (evaluateRule((cur as LogicRowObj).rule, data)) {
        result.push(cur)
      }
    }
  }

  return result
}
