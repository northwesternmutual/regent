import makeArgs from '../private/make-args'
import isLookup from '../private/is-lookup'
import isOpticOrRule from '../private/is-optic-or-rule'
import { FactoryArgs } from '../interfaces'

export default function serialize (data: any, args: any[], name: string): string {
  const json: any = { [name]: [] }
  let _args: FactoryArgs

  if (data) {
    _args = makeArgs(data, ...args)
  }

  args.forEach((arg, i) => {
    if (data && isLookup(arg)) {
      json[name].push(`${arg as string} -> ${JSON.stringify(_args[i])}`)
    } else if (data && isOpticOrRule(arg)) {
      json[name].push(JSON.parse(arg.toJson(data)))
    } else if (isOpticOrRule(arg)) {
      json[name].push(JSON.parse(arg.toJson()))
    } else {
      json[name].push(arg)
    }
  })

  return JSON.stringify(json)
}
