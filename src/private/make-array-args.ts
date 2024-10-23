import { type FactoryArg } from '../interfaces'
import get from './get'
import isEscaped from './is-escaped'
import isLookup from './is-lookup'
import stripAt from './strip-at'

// makeArgs will sort out if the leftArg and rightArg are lookups or
// static and return the the data that your predicates needs.
export default (data: unknown, ...args: FactoryArg[]): unknown[] =>
  args.map(arg => {
    if (isLookup(arg)) {
      return get(data, stripAt(arg))
    }
    if (isEscaped(arg)) {
      return stripAt(arg)
    }

    return arg
  })
