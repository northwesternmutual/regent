import get from './get'
import isLookup from './is-lookup'
import stripAt from './strip-at'

// makeArgs will sort out if the leftArg and rightArg are lookups or
// static and return the the data that your predicates needs.
export default (data, ...args) => args.map(x => isLookup(x) ? get(data, stripAt(x)) : stripAt(x))
