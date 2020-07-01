import isRule from '../private/is-rule'
import evaluateRule from '../private/evaluate-rule'
import makeWithContext from '../private/make-with-context'

export const some = (left, right, context = '__', data) => {
  if (!isRule(right)) {
    throw new Error('Regent: the right property of an every rule must be a regent rule')
  }

  if (!Array.isArray(left)) {
    return false
  }

  return left.some(x => evaluateRule(right, { ...data, [context]: x }))
}

export default makeWithContext(some, 'some')
