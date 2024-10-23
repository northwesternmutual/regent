import { type EscapedString } from '../interfaces'

export default function isEscaped (arg: unknown): arg is EscapedString {
  if (typeof arg !== 'string') {
    return false
  }
  return arg.startsWith('@@')
}
