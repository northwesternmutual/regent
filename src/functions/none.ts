import or from './or'
import { RegentFn } from '../interfaces'
import custom from './custom'

function none (...bools: boolean[]): boolean {
  return !or(
    // The last argument is data. Don't use that.
    ...bools.slice(0, bools.length - 1)
  )(bools[bools.length - 1])
}

export default custom(none, RegentFn.Rule, 'none')
