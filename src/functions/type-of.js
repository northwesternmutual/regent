import make from './make'

export const typeOf = (left, right) => typeof left === right; // eslint-disable-line
export default make(typeOf, 'typeOf')
