import { FactoryArgs, RegentFn } from '../interfaces'

export default function isOpticOrRule (arg: FactoryArgs): Boolean {
  return arg && (arg.type === RegentFn.Rule || arg.type === RegentFn.Optic)
}
