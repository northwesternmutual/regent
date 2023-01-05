import predicate from './predicate'

function not (bool: boolean): boolean {
  return !bool
}

export default predicate(not, 'not')
