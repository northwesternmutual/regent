import isRule from '../private/is-rule'
import evaluateRule from '../private/evaluate-rule'
import makeWithContext from '../private/make-with-context'
import { RuleFunction } from '../interfaces'

export const every = (left: any[], right: RuleFunction, context, data) => {
  if (!Array.isArray(left)) {
    return false
  }

  return left.every(x => evaluateRule(right, { ...data, [context]: x }))
}

export default makeWithContext(every, 'every')
