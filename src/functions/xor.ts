import predicate from './predicate'

function xor (left: boolean, right: boolean): boolean {
  if (arguments.length !== 3) {
    throw Error('Regent: xor must take exactly 2 rules')
  }

  return (left || right) && !(left && right)
}

export default predicate(xor, 'xor')
