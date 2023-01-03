import { FactoryArgs, Rule } from '../interfaces'
import makeArgs from './make-args'

export default (fn: Function, name?: string) => {
  return (left: FactoryArgs, right: (FactoryArgs | Rule), context = '__') => {
    const ruleFn = (data: object): Rule =>
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
