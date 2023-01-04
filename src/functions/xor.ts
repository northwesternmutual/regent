import { RegentFn } from '../interfaces'
import custom from './custom'

function xor (left: boolean, right: boolean): boolean {
  if (arguments.length !== 3) {
    throw Error('Regent: xor must take exactly 2 rules')
  }

  return (left || right) && !(left && right)
}

export default custom(xor, RegentFn.Rule, 'xor')
