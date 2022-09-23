import make from './make'

export const regex = (left: string, right: RegExp): boolean => right.test(left)
export default make(regex, 'regex')
