import { Rule } from '../interfaces'

export default (rule: Rule, data: object): boolean => {
  return typeof rule === 'function' ? rule(data) : rule
}
