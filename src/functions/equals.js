import makeArgs from '../private/make-args';

export const equals = (left, right) => left === right;

export const equalsFN = (...args) =>
  data =>
    equals(...Object.values(makeArgs(data, ...args)));
