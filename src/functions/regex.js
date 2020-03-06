import make from './make'

export const regexFn = (left, right) => right.test(left)
export default make(regexFn)
