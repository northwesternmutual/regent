import make from '../private/make'

export const typeOfFn = (left, right) => typeof left === right; // eslint-disable-line
export default make(typeOfFn)
