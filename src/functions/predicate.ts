import makeArgs from '../private/make-args'
import serialize from '../private/serialize'
import { FactoryArgs, Predicate, Rule, RegentFn } from '../interfaces'

export default function predicate (fn: Function, name?: string): Predicate {
  if (typeof fn !== 'function') {
    throw new Error('predicate must be passed a function as argument 1')
  }

  // we want to handle other types even though we define a type
  if (!name || typeof name !== 'string') {
    name = 'unknown'
  }

  return (...args: FactoryArgs[]): Rule => {
    function rule (data: object): boolean {
      return fn(...makeArgs(data, ...args), data)
    }

    rule.type = RegentFn.Rule
    rule.toJson = (data: any) => serialize(data, args, name)

    return rule
  }
}
