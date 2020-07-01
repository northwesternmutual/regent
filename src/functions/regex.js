import make from './make'

export const regex = (left, right) => right.test(left)
export default make(regex, 'regex')
