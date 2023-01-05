import makeArgs from '../private/make-args'
import serialize from '../private/serialize'
import { FactoryArgs, Optics, Optic, RegentFn } from '../interfaces'

export default function optic (fn: Function, name?: string): Optics {
  if (typeof fn !== 'function') {
    throw new Error('optic must be passed a function as argument 1')
  }

  // we want to handle other types even though we define a type
  if (!name || typeof name !== 'string') {
    name = 'unknown'
  }

  return (...args: FactoryArgs[]): Optic => {
    function _optic (data: object): boolean {
      return fn(...makeArgs(data, ...args), data)
    }

    _optic.type = RegentFn.Optic
    _optic.toJson = (data: any) => serialize(data, args, name)

    return _optic
  }
}
