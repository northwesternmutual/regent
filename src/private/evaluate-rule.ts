import { Rule } from '../interfaces'

export default (rule: Rule, data: object): boolean => {
  if (typeof rule === 'function') {
    return rule(data)
  }

  if (typeof rule === 'boolean') {
    return rule
  }

  throw new Error('Regent: One of [and, every, filter, find, not, or, some, xor] was called with an invalid rule')
}
