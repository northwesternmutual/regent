import isRule from '../private/is-rule'
import make from './make'

export const everyFn = (left, right, data) => {
  if (!isRule(right)) {
    throw new Error('Regent: the right property of an every rule must be a regent rule')
  }

  if (!Array.isArray(left)) {
    return false
  }

  return left.every(x => right({ ...data, __: x }))
}

export default make(everyFn)
