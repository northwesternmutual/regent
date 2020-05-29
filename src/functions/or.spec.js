import or from './or'
import equals from './equals'

describe('or', () => {
  it('should be a function', () => {
    const actual = typeof or
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should return true if at least one rule is true', () => {
    const A = equals('@foo', 'a')
    const B = equals('@foo', 'b')

    const data = {
      foo: 'a'
    }

    const actual = or(A, B)(data)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('should return false if no rules true', () => {
    const A = equals('@foo', 'a')
    const B = equals('@foo', 'b')

    const data = {
      foo: 'c'
    }

    const actual = or(A, B)(data)
    const expected = false

    expect(actual).toEqual(expected)
  })

  it('should handle boolean literals', () => {
    const A = true
    const B = false

    const data = {
      foo: 'a'
    }

    const actual = or(A, B)(data)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('should throw and error if one of the arguments is not a function', () => {
    const A = equals('@foo', 'a')
    const B = 'string'

    const data = {
      foo: 'c'
    }

    expect(() => or(A, B)(data)).toThrow('Regent: or requires all arguments to be a function')
  })
})
