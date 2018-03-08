import isString from 'lodash.isstring';

export default function isEscaped(arg) {
  // If it's not a string it can't be a lookup
  if (isString(arg)) {
    return false;
  }
  // If it made it here, and it matches the expression below then it is an escaped string.
  return /(^@{2}.*)/g.test(arg);
}
