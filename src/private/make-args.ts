import evaluateRule from './evaluate-rule'
import get from './get'
import isLookup from './is-lookup'
import isOpticOrRule from './is-optic-or-rule'
import stripAt from './strip-at'

// makeArgs will sort out if the leftArg and rightArg are lenses or
// static and return the the data that your predicates needs.
export default (data: Object, ...args: any[]): any[] => args.map(x => {
  if (isLookup(x)) {
    return get(data, stripAt(x))
  } else if (isOpticOrRule(x)) {
    return evaluateRule(x, data)
  }

  return stripAt(x)
})
