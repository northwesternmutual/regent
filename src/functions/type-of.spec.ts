import typeOfFn, { typeOf } from './type-of'

describe('3.x.x - typeOfFn should work in functional style', () => {
  it('should be a function', () => {
    const actual = typeof typeOfFn
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should perform typeOfFn', () => {
    const data = {
      foo: () => {}
    }

    const RULE = typeOfFn('@foo', 'function')
    const actual = RULE(data)
    const expected = true

    expect(actual).toEqual(expected)
  })
})

describe('typeOf', () => {
  it('typeOf should be a function', () => {
    expect(typeof typeOf).toEqual('function')
  })

  it('typeOf should return true if typeOf left is equal to right', () => {
    const left = 'hello'
    const right = 'string'
    const actual = typeOf(left, right)
    const expected = true
    expect(actual).toEqual(expected)
  })

  it('typeOf should return false if typeOf left is not equal to right', () => {
    const left = { a: 'b' }
    const right = 'string'
    const actual = typeOf(left, right)
    const expected = false
    expect(actual).toEqual(expected)
  })

  it('typeOf should handle undefined', () => {
    const left = undefined
    const right = undefined
    const actual = typeOf(left, right)
    const expected = false
    expect(actual).toEqual(expected)
  })

  it('when the toJson method is called it should return a json representation of the rule.', () => {
    const MY_RULE = typeOfFn('@foo', 5)
    const actual = MY_RULE.toJson()
    const expected = JSON.stringify({ typeOf: ['@foo', 5] })

    expect(actual).toEqual(expected)
  })
})
