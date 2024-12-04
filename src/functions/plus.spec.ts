import plus from './plus'

describe('plus', () => {
  it('should be a function', () => {
    expect(typeof plus).toEqual('function')
  })

  it('should return the sum of left and right when each are values.', () => {
    const left = 5
    const right = 6
    const actual = plus(left, right)({})
    const expected = 11
    expect(actual).toEqual(expected)
  })

  it('should return the sum of left and right when each are lenses.', () => {
    const left = '@a'
    const right = '@b'
    const actual = plus(left, right)({ a: 5, b: 6 })
    const expected = 11
    expect(actual).toEqual(expected)
  })

  it('should accept other optics as input.', () => {
    const left = '@a'
    const right = '@b'
    const actual = plus(plus(left, right), '@a')({ a: 5, b: 6 })
    const expected = 16
    expect(actual).toEqual(expected)
  })

  it('should produce valid JSON when the .toJson method is invoked', () => {
    const left = '@a'
    const right = '@b'
    const actual = plus(plus(left, right), '@a').toJson({ a: 5, b: 6 })

    const expected = JSON.stringify({
      plus: [{ plus: ['@a -> 5', '@b -> 6'] }, '@a -> 5']
    })

    expect(actual).toEqual(expected)
  })
})
