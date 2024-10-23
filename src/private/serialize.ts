import makeArgs from '../private/make-args'
import isLookup from '../private/is-lookup'
import { type FactoryArg, type Rule, type Optic } from '../interfaces'
import isRule from './is-rule'
import isOptic from './is-optic'

export default function serialize (data: unknown, args: FactoryArg[], name: string): string {
  const json = { [name]: [] }
  let _args = []

  if (data) {
    _args = makeArgs(data, ...args)
  }

  args.forEach((arg, i) => {
    if (data && isLookup(arg)) {
      json[name].push(`${arg as string} -> ${JSON.stringify(_args[i])}`)
    } else if (isRule(arg) || isOptic(arg)) {
      json[name].push(JSON.parse((arg as Rule | Optic).toJson(data)))
    } else if (name === 'regex' && i === 1) {
      json[name].push(arg.toString())
    } else {
      json[name].push(arg)
    }
  })

  return JSON.stringify(json)
}
