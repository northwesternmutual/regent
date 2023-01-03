import makeArgs from '../private/make-args'
import isLookup from '../private/is-lookup'
import { FactoryArgs, Rule, Optic } from '../interfaces'

export default (fn: Function, name?: string): Function => {
  if (typeof fn !== 'function') {
    throw new Error('make must be passed a function as argument 1')
  }

  // we want to handle other types even though we define a type
  if (!name || typeof name !== 'string') {
    name = 'unknown'
  }

  return (...args: FactoryArgs[]): Rule | Optic => {
    const result = (data: object): boolean => fn(...makeArgs(data, ...args), data)

    result.toJson = (data: any) => {
      const json: any = { [name]: [] }
      let _args: FactoryArgs

      if (data) {
        _args = makeArgs(data, ...args)
      }

      args.forEach((arg, i) => {
        if (data && isLookup(arg)) {
          json[name].push(`${arg as string} -> ${JSON.stringify(_args[i])}`)
        } else {
          json[name].push(arg)
        }
      })

      return JSON.stringify(json)
    }

    return result
  }
}
