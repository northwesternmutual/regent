import get from 'lodash.get';
import isLookup from './is-lookup';
import stripAt from './strip-at';

// makeArgs will sort out if the leftArg and rightArg are lookups or
// static and return the the data that your predicates needs.
export default function makeArgs(data, ...args) {
  const left = isLookup(args[0]) ? get(data, stripAt(args[0])) : stripAt(args[0]);
  const right = isLookup(args[1]) ? get(data, stripAt(args[1])) : stripAt(args[1]);
  return {
    left,
    right,
  };
}
