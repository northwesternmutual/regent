import { type FactoryArg, type Rule } from '../interfaces'

export default function isRule (arg: FactoryArg): arg is Rule {
  return typeof arg === 'function' && arg?.type === 'Rule'
}
