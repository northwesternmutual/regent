import makeArgs from '../private/make-args'

export default (fn) => {
  if (typeof fn !== 'function') {
    throw new Error('make must be passed a function as argument 1')
  }

  if (!fn.name) {
    throw new Error('the function passed to "make" must be a named function. It cannot be anonymous.')
  }

  return (...args) => {
    const ruleJson = { [fn.name]: [] }

    args.forEach((arg) => {
      ruleJson[fn.name].push(arg)
    })

    const ruleFn = data => fn(...makeArgs(data, ...args), data)

    ruleFn.toJson = () => JSON.stringify(ruleJson)

    return ruleFn
  }
}
