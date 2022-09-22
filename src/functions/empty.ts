import make from './make'

export const empty = (input?: any): boolean => (
  input === undefined ||
  input === null ||
  input === 'undefined' ||
  input === ''
)

export default make(empty, 'empty')
