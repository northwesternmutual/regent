import make from '../private/make';

export const regex = (left, right) => right.test(left);
export const regexFN = make(regex);
