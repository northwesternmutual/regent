import isRule from '../private/is-rule'

export default (rule) => {
  if (!isRule(rule)) {
    throw new Error('Regent: not requires the first argument to be a function')
  }

  return data => !rule(data)
}
