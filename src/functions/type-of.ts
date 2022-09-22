import make from './make'

export const typeOf = (left: any, right: any): boolean => typeof left === right; // eslint-disable-line
export default make(typeOf, 'typeOf')
