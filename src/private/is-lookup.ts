import { type Lookup } from '../interfaces'
import isEscaped from './is-escaped'

export default function isLookup (arg: unknown): arg is Lookup {
  if (typeof arg !== 'string') {
    return false
  }
  // If it's an escaped string then it's not a lookup?
  if (isEscaped(arg)) {
    return false
  }
  return arg.startsWith('@')
}
