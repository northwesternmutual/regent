import { FactoryArgs, Rule, RegentFn } from '../interfaces'
import makeArrayArgs from './make-array-args'

export default (fn: Function, name?: string) => {
  return (left: FactoryArgs, right: FactoryArgs, context = '__'): Rule => {
    const ruleFn = (data: object): boolean =>
      fn(...makeArrayArgs(data, left, right), context, data)

    ruleFn.type = RegentFn.Rule

    ruleFn.toJson = () => {
      let ruleJson: any

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
