import minus from './minus'

describe('minus', () => {
  it('minus should be a function', () => {
    expect(typeof minus).toEqual('function')
  })

  it('minus should return the sum of left and right when each are values.', () => {
    const left = 6
    const right = 5
    const actual = minus(left, right)({})
    const expected = 1
    expect(actual).toEqual(expected)
  })

  it('minus should return the sum of left and right when each are lenses.', () => {
    const left = '@a'
    const right = '@b'
    const actual = minus(left, right)({ a: 5, b: 6 })
    const expected = -1
    expect(actual).toEqual(expected)
  })

  it('minus should accept other optics as input.', () => {
    const left = '@a'
    const right = '@b'
    const actual = minus(minus(left, right), '@b')({ a: 10, b: 4 })
    const expected = 2
    expect(actual).toEqual(expected)
  })

  it('should produce valid JSON when the .toJson method is invoked', () => {
    const left = '@a'
    const right = '@b'
    const actual = minus(minus(left, right), '@b').toJson({ a: 10, b: 4 })

    const expected = JSON.stringify({
      minus: [{ minus: ['@a -> 10', '@b -> 4'] }, '@b -> 4']
    })

    expect(actual).toEqual(expected)
  })
})
