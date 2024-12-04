import { type FactoryArg, type Optic } from '../interfaces'

export default function isOptic (arg: FactoryArg): arg is Optic {
  return typeof arg === 'function' && arg?.type === 'Optic'
}
