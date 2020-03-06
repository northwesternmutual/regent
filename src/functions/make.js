import makeArgs from '../private/make-args'

export default (fn) => {
  if (typeof fn !== 'function') {
    throw new Error('make must be passed a function as argument 1')
  }

  return (...args) =>
    data =>
      fn(...makeArgs(data, ...args), data)
}
