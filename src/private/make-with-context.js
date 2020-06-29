import makeArgs from './make-args'

export default (fn) => {
  if (typeof fn !== 'function') {
    throw new Error('makeWithContext must be passed a function as argument 1')
  }

  return (left, right, context = '__') => {
    const ruleFn = data =>
      fn(...makeArgs(data, left, right), context, data)

    ruleFn.toJson = () => {
      let ruleJson

      if (typeof right === 'boolean') {
        ruleJson = { [fn.name]: [left, right] }
      } else {
        ruleJson = { [fn.name]: [left, JSON.parse(right.toJson())] }
      }

      return JSON.stringify(ruleJson)
    }

    return ruleFn
  }
}
