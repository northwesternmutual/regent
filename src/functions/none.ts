import or from './or'
import predicate from './predicate'

function none (...bools: boolean[]): boolean {
  return !or(
    // The last argument is data. Don't use that.
    ...bools.slice(0, bools.length - 1)
  )(bools[bools.length - 1])
}

export default predicate(none, 'none')
