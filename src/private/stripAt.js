import isString from 'lodash.isstring';

export default function stripAt(arg) {
  let result = arg;
  // If arg is a string strip the '@' symbol off
  if (isString(arg)) {
    result = arg.replace('@', '');
  }
  return result;
}
