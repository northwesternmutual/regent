import assign from 'lodash.assign'
import isarray from 'lodash.isarray'
import isRule from '../private/is-rule'
import make from '../private/make'

export const someFn = (left, right, data, custom) => {
  if (!isRule(right)) {
    throw new Error('Regent: the right property of an every rule must be a regent rule')
  }

  if (!isarray(left)) {
    return false
  }

  return left.some(x => right(assign({}, data, { __: x })))
}

export default make(someFn)
