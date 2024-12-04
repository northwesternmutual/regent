import { FactoryArg, type Rule } from '../interfaces'
import isOptic from './is-optic'
import isRule from './is-rule'
import makeArrayArgs from './make-array-args'

export default (fn: (...factoryArgs: unknown[]) => boolean, name?: string) => {
  return (left: FactoryArg, right: FactoryArg, context = '__'): Rule => {
    const ruleFn = (data: unknown): boolean =>
      fn(...makeArrayArgs(data, left, right), context, data)

    ruleFn.type = 'Rule' as const

    ruleFn.toJson = () => {
      let ruleJson

      if (isRule(right) || isOptic(right)) {
        ruleJson = { [name]: [left, JSON.parse((right).toJson())] }
      } else {
        ruleJson = { [name]: [left, right] }
      }

      return JSON.stringify(ruleJson)
    }

    return ruleFn
  }
}
