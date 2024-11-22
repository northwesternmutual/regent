import get from './get'
import isLookup from './is-lookup'
import stripAt from './strip-at'

// makeArgs will sort out if the leftArg and rightArg are lookups or
// static and return the the data that your predicates needs.
const makeArrayArgs = (data: Object, ...args: any[]): any[] => {
  return args.map(x => isLookup(x) ? get(data, stripAt(x)) : stripAt(x))
}

export default makeArrayArgs
