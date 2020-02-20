import makeArgs from '../private/make-args';

export const greaterThanOrEquals = (left, right) => left >= right;

export const greaterThanOrEqualsFN = (...args) =>
  data =>
    greaterThanOrEquals(...Object.values(makeArgs(data, ...args)));

