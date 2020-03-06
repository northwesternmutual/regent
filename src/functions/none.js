import or from './or'
import isRule from '../private/is-rule'

export default (...rules) => {
  if (!rules.every(x => isRule(x))) {
    throw new Error('Regent: none requires all arguments to be a function')
  }

  return data => !or(...rules)(data)
}
