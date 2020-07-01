import or from './or'
import isRule from '../private/is-rule'
import attachToJson from '../private/attach-to-json'

export default (...rules) => {
  if (!rules.every(x => isRule(x))) {
    throw new Error('Regent: none requires all arguments to be a function')
  }

  return attachToJson(function none (data) {
    return !or(...rules)(data)
  }, rules, 'none')
}
