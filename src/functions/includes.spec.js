import includes, { includesFn } from './includes'

describe('3.x.x - includes should work in functional style', () => {
  it('should be a function', () => {
    const actual = typeof includes
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should perform includes functionality', () => {
    const data = {
      foo: {
        a: 'b'
      }
    }

    const RULE = includes('@foo', 'b')
    const actual = RULE(data)
    const expected = true

    expect(actual).toEqual(expected)
  })
})

describe('includesFn', () => {
  it('includesFn should be a function', () => {
    expect(typeof includesFn).toEqual('function')
  })

  it('includesFn Function: Should return true when first argument is in the args array', () => {
    const args = [2, 3, 4]
    const actual = includesFn(args, 3)
    const expected = true
    expect(actual).toEqual(expected)
  })

  it('includesFn Function: Should return false when the first argument is not in args array.', () => {
    const args = [2, 3, 4]
    const actual = includesFn(5, args)
    const expected = false
    expect(actual).toEqual(expected)
  })

  it('includesFn should honor lodash.includesFn wishes :)', () => {
    expect(includesFn([1, 2, 3], 1)).toEqual(true)
    expect(includesFn({ a: 1, b: 2 }, 1)).toEqual(true)
    expect(includesFn('abcd', 'bc')).toEqual(true)
  })
})
