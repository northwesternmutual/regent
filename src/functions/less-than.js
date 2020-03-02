import make from '../private/make';

export const lessThan = (left, right) => left < right;
export const lessThanFN = make(lessThan);
