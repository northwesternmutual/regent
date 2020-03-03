import lessThanOrEquals, { lessThanOrEqualsFn } from './less-than-equals'

describe('3.x.x - lessThanOrEquals should work in functional style', () => {
  it('should be a function', () => {
    const actual = typeof lessThanOrEquals
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should perform lessThanOrEquals', () => {
    const data = {
      foo: 10
    }

    const RULE = lessThanOrEquals('@foo', 10)
    const actual = RULE(data)
    const expected = true

    expect(actual).toEqual(expected)
  })
})

describe('lessThanOrEqualsFn', () => {
  it('lessThanOrEqualsFn should be a function', () => {
    expect(typeof lessThanOrEqualsFn).toEqual('function')
  })

  it('lessThanOrEqualsFn should return true if "left" is less than "right"', () => {
    const actual = lessThanOrEqualsFn(4, 5)
    const expected = true
    expect(actual).toEqual(expected)
  })

  it('lessThanOrEqualsFn should return true if "left" equals "right"', () => {
    const actual = lessThanOrEqualsFn(5, 5)
    const expected = true
    expect(actual).toEqual(expected)
  })

  it('lessThanOrEqualsFn should return false if "left" is greater than "right', () => {
    const actual = lessThanOrEqualsFn(255, 254)
    const expected = false
    expect(actual).toEqual(expected)
  })

  it('lessThanOrEqualsFn should return false if the key is a string that parses to NaN', () => {
    const redProps = [
      'cool',
      'some string',
      'undefined',
      'null',
      'false',
      'true'
    ]
    redProps.forEach((val) => {
      const actual = lessThanOrEqualsFn(val, 0)
      const expected = false
      expect(actual).toEqual(expected)
    })
  })

  it('lessThanOrEqualsFn should compare strings based on standard lexicographical ordering, using Unicode values', () => {
    expect(lessThanOrEqualsFn('a', 'b')).toEqual(true)
    expect(lessThanOrEqualsFn('aaaa', 'abaa')).toEqual(true)
    expect(lessThanOrEqualsFn('bb', 'a')).toEqual(false)
    expect(lessThanOrEqualsFn('baa', 'abb')).toEqual(false)
    expect(lessThanOrEqualsFn('1', 2)).toEqual(true)
    expect(lessThanOrEqualsFn('2', 1)).toEqual(false)
    expect(lessThanOrEqualsFn('2', '4')).toEqual(true)
    expect(lessThanOrEqualsFn('4', '4')).toEqual(true)
    expect(lessThanOrEqualsFn(4, '4')).toEqual(true)
  })
})
