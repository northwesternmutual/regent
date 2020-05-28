import isRule from '../private/is-rule'

export default (logic, data) => logic.filter((x) => {
  if (typeof x.rule === 'boolean') {
    return x.rule
  }

  if (isRule(x.rule)) {
    return x.rule(data)
  }

  return false
})
