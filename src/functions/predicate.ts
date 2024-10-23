import makeArgs from '../private/make-args'
import serialize from '../private/serialize'
import { FactoryArg, Predicate, Rule } from '../interfaces'

export default function predicate (fn: (...factoryArgs: FactoryArg[]) => boolean, name?: string): Predicate {
  if (typeof fn !== 'function') {
    throw new Error('predicate must be passed a function as argument 1')
  }

  // we want to handle other types even though we define a type
  if (!name || typeof name !== 'string') {
    name = 'unknown'
  }

  return (...args: FactoryArg[]): Rule => {
    function rule (data: unknown): boolean {
      return fn(...makeArgs(data, ...args) as FactoryArg[], data as FactoryArg)
    }

    rule.type = 'Rule' as const
    rule.toJson = (data: unknown) => serialize(data, args, name)

    return rule as Rule
  }
}
