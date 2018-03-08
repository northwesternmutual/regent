import get from 'lodash.get';
import isLookup from './isLookup';
import stripAt from './stripAt';

// makeArgs will sort out if the leftArg and rightArg are lookups or
// static and return the the data that your predicates needs.
export default function makeArgs(data, leftArg, rightArg) {
  const left = isLookup(leftArg) ? get(data, stripAt(leftArg)) : stripAt(leftArg);
  const right = isLookup(rightArg) ? get(data, stripAt(rightArg)) : stripAt(rightArg);

  return {
    left,
    right,
  };
}
