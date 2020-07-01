import makeArgs from './make-args'

export default (fn, name) => {
  if (typeof fn !== 'function') {
    throw new Error('makeWithContext must be passed a function as argument 1')
  }

  return (left, right, context = '__') => {
    const ruleFn = data =>
      fn(...makeArgs(data, left, right), context, data)

    ruleFn.toJson = () => {
      let ruleJson

      if (typeof right === 'boolean') {
        ruleJson = { [name]: [left, right] }
      } else {
        ruleJson = { [name]: [left, JSON.parse(right.toJson())] }
      }

      return JSON.stringify(ruleJson)
    }

    return ruleFn
  }
}
