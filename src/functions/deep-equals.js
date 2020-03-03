import isEqual from 'lodash.isequal'
import make from '../private/make'

export const deepEqualsFn = (left, right) => isEqual(left, right)

export default make(deepEqualsFn)
