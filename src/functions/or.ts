import predicate from './predicate'

function or (...bools: boolean[]): boolean {
  // The last argument is data. Don't use that.
  return bools.some((bool, i) => i < bools.length - 1 ? bool : false)
}

export default predicate(or, 'or')
