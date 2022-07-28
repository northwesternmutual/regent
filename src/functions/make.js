import makeArgs from '../private/make-args'
import isLookup from '../private/is-lookup'

export default (fn, name) => {
  if (typeof fn !== 'function') {
    throw new Error('make must be passed a function as argument 1')
  }

  if (!name || typeof name !== 'string') {
    name = 'unknown'
  }

  return (...args) => {
    const ruleFn = data => fn(...makeArgs(data, ...args), data)

    ruleFn.toJson = (data) => {
      const ruleJson = { [name]: [] }
      let _args

      if (data) {
        _args = makeArgs(data, ...args)
      }

      args.forEach((arg, i) => {
        if (data && isLookup(arg)) {
          ruleJson[name].push(`${arg} -> ${JSON.stringify(_args[i])}`)
        } else {
          ruleJson[name].push(arg)
        }
      })

      return JSON.stringify(ruleJson)
    }

    return ruleFn
  }
}
