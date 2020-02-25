import make from '../private/make';

export const empty = input => (
  input === undefined ||
  input === null ||
  input === 'undefined' ||
  input === ''
);

export const emptyFN = make(empty);
