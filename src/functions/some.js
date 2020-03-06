import isRule from '../private/is-rule'
import makeWithContext from '../private/make-with-context'

export const someFn = (left, right, context = '__', data) => {
  if (!isRule(right)) {
    throw new Error('Regent: the right property of an every rule must be a regent rule')
  }

  if (!Array.isArray(left)) {
    return false
  }

  return left.some(x => right(Object.assign({}, data, { [context]: x })))
}

export default makeWithContext(someFn)
