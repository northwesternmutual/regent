import makeArgs from '../private/make-args'
import isLookup from '../private/is-lookup'
import { RuleFunction } from '../interfaces'

export default (fn: Function, name?: string): Function => {
  if (typeof fn !== 'function') {
    throw new Error('make must be passed a function as argument 1')
  }

  // we want to handle other types even though we define a type
  if (!name || typeof name !== 'string') {
    name = 'unknown'
  }

  return (...args: any[]): RuleFunction => {
    const ruleFn = (data: object): boolean => fn(...makeArgs(data, ...args), data)

    ruleFn.toJson = (data: any) => {
      const ruleJson: any = { [name]: [] }
      let _args

      if (data) {
        _args = makeArgs(data, ...args)
      }

      args.forEach((arg, i) => {
        if (data && isLookup(arg)) {
          ruleJson[name].push(`${arg} -> ${JSON.stringify(_args[i])}`)
        } else {
          ruleJson[name].push(arg)
        }
      })

      return JSON.stringify(ruleJson)
    }

    return ruleFn;
  }
}
