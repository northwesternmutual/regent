import { RegentFn } from '../interfaces'
import custom from './custom'

function or (...bools: boolean[]): boolean {
  // The last argument is data. Don't use that.
  return bools.some((bool, i) => i < bools.length - 1 ? bool : false)
}

export default custom(or, RegentFn.Rule, 'or')
