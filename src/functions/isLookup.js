import isString from 'lodash.isstring';
import get from 'lodash.get';

export function isEscaped(arg) {
  // If it's not a string it can't be a lookup
  if (!isString(arg)) {
    return false;
  }
  // If it made it here, and it matches the expression below then it is an escaped string.
  return /(^@{2}.*)/g.test(arg);
}

export function isLookup(arg) {
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

export function stripAt(arg) {
  let result = arg;
  // If arg is a string strip the '@' symbol off
  if (isString(arg)) {
    result = arg.replace('@', '');
  }
  return result;
}

// makeArgs will sort out if the leftArg and rightArg are lookups or
// static and return the the data that your predicates needs.
export function makeArgs(data, leftArg, rightArg) {
  const left = isLookup(leftArg) ? get(data, stripAt(leftArg)) : stripAt(leftArg);
  const right = isLookup(rightArg) ? get(data, stripAt(rightArg)) : stripAt(rightArg);

  return {
    left,
    right,
  };
}
