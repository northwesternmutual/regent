import isRule from '../private/is-rule'
import evaluateRule from '../private/evaluate-rule'
import makeWithContext from '../private/make-with-context'

export const some = (left: any[], right: (Function|Boolean), context?: string, data?: object) => {
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
 