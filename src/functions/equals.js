import make from '../private/make';

export const equals = (left, right) => left === right;

export const equalsFN = make(equals);
