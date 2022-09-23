import { PredicateArgs, RuleFunction } from '../interfaces'
import makeArgs from './make-args'

export default (fn: Function, name?: string) => {
  return (left: PredicateArgs, right: (PredicateArgs | RuleFunction), context = '__') => {
    const ruleFn = (data: object): RuleFunction =>
      fn(...makeArgs(data, left, right), context, data)

    ruleFn.toJson = () => {
      let ruleJson

      if (typeof right === 'boolean' || typeof right === 'number' || typeof right === 'string') {
        ruleJson = { [name]: [left, right] }
      } else {
        ruleJson = { [name]: [left, JSON.parse(right.toJson())] }
      }

      return JSON.stringify(ruleJson)
    }

    return ruleFn
  }
}
