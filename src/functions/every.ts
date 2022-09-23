import evaluateRule from '../private/evaluate-rule'
import makeWithContext from '../private/make-with-context'
import { RuleFunction } from '../interfaces'

export const every = (left: any[], right: RuleFunction, context: string, data: object): boolean => {
  if (!Array.isArray(left)) {
    return false
  }

  return left.every(x => evaluateRule(right, { ...data, [context]: x }))
}

export default makeWithContext(every, 'every')
