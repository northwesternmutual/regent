import make from '../private/make';

export const typeOf = (left, right) => typeof left === right; // eslint-disable-line
export const typeOfFN = make(typeOf);
