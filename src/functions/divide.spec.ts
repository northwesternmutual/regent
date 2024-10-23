import divide from './divide'
import plus from './plus'

describe('divide', () => {
  it('should be a function', () => {
    expect(typeof divide).toEqual('function')
  })

  it('should return NaN when dividend or divisor is NaN', () => {
    const left = NaN
    const right = 2
    const expected = NaN
    expect(divide(left, right)({})).toEqual(expected)
    expect(divide(right, left)({})).toEqual(expected)
  })

  it('should return infinity when dividing by 0', () => {
    const left = 1
    const right = 0
    const actual = divide(left, right)({})
    const expected = Infinity
    expect(actual).toEqual(expected)
  })

  it('should return the quotient of left and right when each are strigified values.', () => {
    const left = '1'
    const right = '2'
    const actual = divide(left, right)({})
    const expected = 0.5
    expect(actual).toEqual(expected)
  })

  it('should return the quotient of left and right when each are values.', () => {
    const left = 1
    const right = 2
    const actual = divide(left, right)({})
    const expected = 0.5
    expect(actual).toEqual(expected)
  })

  it('should return the quotient of left and right when each are lenses.', () => {
    const left = '@a'
    const right = '@b'
    const actual = divide(left, right)({ a: 1, b: 2 })
    const expected = 0.5
    expect(actual).toEqual(expected)
  })

  it('should accept other optics as input.', () => {
    const actual = divide(plus(1, 1), 2)({})
    expect(actual).toBe(1)
  })

  it('should produce valid JSON when the .toJson method is invoked', () => {
    const data = { a: 1, b: 2 }
    const actual = divide(plus('@a', '@b'), 2).toJson(data)

    const expected = JSON.stringify({
      divide: [{ plus: ['@a -> 1', '@b -> 2'] }, 2]
    })

    expect(actual).toEqual(expected)
  })
})
