import { FactoryArgs } from '../interfaces'

export default function isOpticOrRule (arg: FactoryArgs): Boolean {
  return typeof arg === 'function'
}
