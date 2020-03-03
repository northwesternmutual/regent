import isEqual from 'lodash.isequal'
import make from './make'

export const deepEqualsFn = (left, right) => isEqual(left, right)

export default make(deepEqualsFn)
