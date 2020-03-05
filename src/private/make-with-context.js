import makeArgs from './make-args'

export default (fn) => {
  if (typeof fn !== 'function') {
    throw new Error('makeWithContext must be passed a function as argument 1')
  }

  return (left, right, context = '__') =>
    data =>
      fn(...makeArgs(data, left, right), context, data)
}
