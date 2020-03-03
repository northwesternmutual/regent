import _includes from 'lodash.includes'
import make from '../private/make'

export const includesFn = (left, right) => _includes(left, right)

export default make(includesFn)
