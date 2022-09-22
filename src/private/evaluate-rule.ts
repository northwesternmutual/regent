import isRule from './is-rule'

export default (rule: (Function|Boolean), data: object): boolean => {
  return typeof rule === 'function' ? rule(data) : rule
}
