import evaluateRule from '../private/evaluate-rule'
import makeWithContext from '../private/make-with-context'
import { Rule } from '../interfaces'

export const some = (left: any[], right: Rule, context?: string, data?: object): boolean => {
  // TODO: Please explain me in a comment for future me
  // explanation will have something to do with our lookup values sometimes resolving to null or undefined or whatnot
  if (!Array.isArray(left)) {
    return false
  }

  if (!context) {
    context = '__'
  }

  return left.some(x => evaluateRule(right, { ...data, [context]: x }))
}

export default makeWithContext(some, 'some')
