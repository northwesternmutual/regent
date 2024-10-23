import { type FactoryArg } from '../interfaces'
import evaluateRule from './evaluate-rule'
import get from './get'
import isEscaped from './is-escaped'
import isLookup from './is-lookup'
import isOptic from './is-optic'
import isRule from './is-rule'
import stripAt from './strip-at'

// makeArgs will sort out if the leftArg and rightArg are lenses or
// static and return the the data that your predicates needs.
export default (data: unknown, ...args: FactoryArg[]): unknown[] => args.map(arg => {
  if (isLookup(arg)) {
    return get(data, stripAt(arg))
  }
  if (isRule(arg)) {
    return evaluateRule(arg, data)
  }
  if (isOptic(arg)) {
    return arg(data)
  }
  if (isEscaped(arg)) {
    return stripAt(arg)
  }

  return arg
})
