import makeArgs from '../private/make-args'
import serialize from '../private/serialize'
import { FactoryArg, Optics, Optic } from '../interfaces'

export default function optic (fn: (...factoryArgs: FactoryArg[]) => unknown, name?: string): Optics {
  if (typeof fn !== 'function') {
    throw new Error('optic must be passed a function as argument 1')
  }

  // we want to handle other types even though we define a type
  if (!name || typeof name !== 'string') {
    name = 'unknown'
  }

  return (...args: FactoryArg[]): Optic => {
    function _optic (data: unknown): unknown {
      return fn(...makeArgs(data, ...args) as FactoryArg[], data as FactoryArg)
    }

    _optic.type = 'Optic' as const
    _optic.toJson = (data?: unknown): string => serialize(data, args, name)

    return _optic
  }
}
