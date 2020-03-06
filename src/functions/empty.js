import make from './make'

export const emptyFn = input => (
  input === undefined ||
  input === null ||
  input === 'undefined' ||
  input === ''
)

export default make(emptyFn)
