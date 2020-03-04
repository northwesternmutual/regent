import isRule from '../private/is-rule'
import make from './make'

export const someFn = (left, right, data, custom) => {
  if (!isRule(right)) {
    throw new Error('Regent: the right property of an every rule must be a regent rule')
  }

  if (!Array.isArray(left)) {
    return false
  }

  return left.some(x => right(Object.assign({}, data, { __: x })))
}

export default make(someFn)
