import make from '../private/make';

export const greaterThan = (left, right) => left > right;

export const greaterThanFN = make(greaterThan);
