import makeArgs from '../private/make-args'

export default (fn, name) => {
  if (typeof fn !== 'function') {
    throw new Error('make must be passed a function as argument 1')
  }

  if (!name || typeof name !== 'string') {
    name = 'unknown'
  }

  return (...args) => {
    const ruleJson = { [name]: [] }

    args.forEach((arg) => {
      ruleJson[name].push(arg)
    })

    const ruleFn = data => fn(...makeArgs(data, ...args), data)

    ruleFn.toJson = () => JSON.stringify(ruleJson)

    return ruleFn
  }
}
