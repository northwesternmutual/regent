import isRule from './is-rule'

export default (rule, data) => {
  if (isRule(rule)) {
    return typeof rule === 'function' ? rule(data) : rule
  }

  // If this isn't a rule, throw
  throw new Error(`Regent: "${rule}" is not a valid rule`)
}
