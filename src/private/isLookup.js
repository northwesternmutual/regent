import isString from 'lodash.isstring';
import isEscaped from './isEscaped';

export default function isLookup(arg) {
  // If it's not a string it can't be a lookup
  if (!isString(arg)) {
    return false;
  }
  // If it's an escaped string then it's not a lookup?
  if (isEscaped(arg)) {
    return false;
  }
  // If it make it to here and it mathces the folloing regex then it is a lookup.
  return /(^@.*)/g.test(arg);
}
