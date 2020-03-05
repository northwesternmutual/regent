import isRule from '../private/is-rule'
import makeWithContext from '../private/make-with-context'

export const everyFn = (left, right, context, data) => {
  if (!isRule(right)) {
    throw new Error('Regent: the right property of an every rule must be a regent rule')
  }

  if (!Array.isArray(left)) {
    return false
  }

  return left.every(x => right({ ...data, [context]: x }))
}

export default makeWithContext(everyFn)
