import make from './make'

export const regex = (left: string, right: RegExp) => right.test(left)
export default make(regex, 'regex')
