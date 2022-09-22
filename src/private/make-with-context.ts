import { PredicateArgs, RuleFunction } from '../interfaces'
import makeArgs from './make-args'

export default (fn: Function, name?: string) => {
  return (left: any, right: any, context = '__') => {
    const ruleFn = (data: object) =>
      fn(...makeArgs(data, left, right), context, data)

    ruleFn.toJson = () => {
      let ruleJson

      if (typeof right === 'boolean' || typeof right === 'number') {
        ruleJson = { [name]: [left, right] }
      } else {
        ruleJson = { [name]: [left, JSON.parse(right.toJson())] }
      }

      return JSON.stringify(ruleJson)
    }

    return ruleFn
  }
}
