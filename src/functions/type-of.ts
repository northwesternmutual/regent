import make from './make'

export const typeOf = (left: unknown, right: string): boolean => {
  if (typeof right !== 'string') {
    return false
  }
  // eslint-disable-next-line valid-typeof
  return typeof left === right
}
export default make(typeOf, 'typeOf')
