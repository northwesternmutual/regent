import { Rule } from '../interfaces'

export default (rule: Rule, data: unknown): boolean => {
  if (typeof rule === 'function') {
    return rule(data)
  }

  if (typeof rule === 'boolean') {
    return rule
  }

  return false
}
