import { RegentFn } from '../interfaces'
import custom from './custom'

// Make the custom predicates and optics function backward compatible.
export default (fn: Function, name?: string): Function => {
  return custom(fn, RegentFn.Rule, name)
}
