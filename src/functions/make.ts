import makeArgs from '../private/make-args'
import { RuleFunction } from '../interfaces'

export default (fn: Function, name?: string): Function => {
  if (typeof fn !== 'function') {
    throw new Error('make must be passed a function as argument 1')
  }

  if (!name) {
    name = 'unknown'
  }

  return (...args: any[]): RuleFunction => {
    const ruleJson: any = { [name]: [] }
    args.forEach((arg) => {
      ruleJson[name].push(arg)
    })

    const ruleFn = (data: object) => fn(...makeArgs(data, ...args), data)

    ruleFn.toJson = () => JSON.stringify(ruleJson)

    return ruleFn
  }
}
