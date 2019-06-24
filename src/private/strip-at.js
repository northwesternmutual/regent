import isString from 'lodash.isstring';

export default function stripAt(arg) {
  return isString(arg) && arg[0] === '@'
    ? arg.slice(1)
    : arg;
}
