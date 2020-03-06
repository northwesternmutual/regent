import lessThan, { lessThanFn } from './less-than'

describe('3.x.x - lessThan should work in functional style', () => {
  it('should be a function', () => {
    const actual = typeof lessThan
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should perform lessThan', () => {
    const data = {
      foo: 1
    }

    const RULE = lessThan('@foo', 2)
    const actual = RULE(data)
    const expected = true

    expect(actual).toEqual(expected)
  })
})

describe('lessThanFn', () => {
  it('lessThanFn should be a function', () => {
    expect(typeof lessThanFn).toEqual('function')
  })

  it('lessThanFn should return true if "left" is less than "right"', () => {
    const actual = lessThanFn(4, 5)
    const expected = true
    expect(actual).toEqual(expected)
  })

  it('lessThanFn should return false if "left" is greater than "right', () => {
    const actual = lessThanFn(255, 254)
    const expected = false
    expect(actual).toEqual(expected)
  })

  it('lessThanFn should return false if "left" is equal to "right"', () => {
    const actual = lessThanFn(123, 123)
    const expected = false
    expect(actual).toEqual(expected)
  })

  it('lessThanFn should return false if the key is undefined', () => {
    const actual = lessThanFn(undefined, 0)
    const expected = false
    expect(actual).toEqual(expected)
  })

  it('lessThanFn should return false if the key is a string that parses to NaN', () => {
    const redProps = [
      'cool',
      'some string',
      'undefined',
      'null',
      'false',
      'true'
    ]
    redProps.forEach((val) => {
      const actual = lessThanFn(val, 0)
      const expected = false
      expect(actual).toEqual(expected, `should return false when passed ${val}`)
    })
  })

  it('lessThanFn should compare strings based on standard lexicographical ordering, using Unicode values', () => {
    expect(lessThanFn('a', 'b')).toEqual(true)
    expect(lessThanFn('aaaa', 'abaa')).toEqual(true)
    expect(lessThanFn('bb', 'a')).toEqual(false)
    expect(lessThanFn('baa', 'abb')).toEqual(false)
    expect(lessThanFn('1', 2)).toEqual(true)
    expect(lessThanFn('2', 1)).toEqual(false)
    expect(lessThanFn('2', '4')).toEqual(true)
  })
})
