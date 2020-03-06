import typeOf, { typeOfFn } from './type-of'

describe('3.x.x - typeOf should work in functional style', () => {
  it('should be a function', () => {
    const actual = typeof typeOf
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should perform typeOf', () => {
    const data = {
      foo: () => {}
    }

    const RULE = typeOf('@foo', 'function')
    const actual = RULE(data)
    const expected = true

    expect(actual).toEqual(expected)
  })
})

describe('typeOfFn', () => {
  it('typeOfFn should be a function', () => {
    expect(typeof typeOfFn).toEqual('function')
  })

  it('typeOfFn should return true if typeOfFn left is equal to right', () => {
    const left = 'hello'
    const right = 'string'
    const actual = typeOfFn(left, right)
    const expected = true
    expect(actual).toEqual(expected)
  })

  it('typeOfFn should return false if typeOfFn left is not equal to right', () => {
    const left = { a: 'b' }
    const right = 'string'
    const actual = typeOfFn(left, right)
    const expected = false
    expect(actual).toEqual(expected)
  })

  it('typeOfFn should handle undefined', () => {
    const left = undefined
    const right = undefined
    const actual = typeOfFn(left, right)
    const expected = false
    expect(actual).toEqual(expected)
  })
})
