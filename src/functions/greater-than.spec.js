import greaterThan, { greaterThanFn } from './greater-than'

describe('3.x.x - greaterThan should work in functional style', () => {
  it('should be a function', () => {
    const actual = typeof greaterThan
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should evaluate greaterThan', () => {
    const data = {
      foo: 3
    }

    const RULE = greaterThan('@foo', 1)
    const actual = RULE(data)
    const expected = true

    expect(actual).toEqual(expected)
  })
})

describe('greaterThanFn', () => {
  it('greaterThanFn should be a function', () => {
    expect(typeof greaterThanFn).toEqual('function')
  })

  it('greaterThanFn should return true if the value given is greater than the param', () => {
    let actual = greaterThanFn(1, 0)
    let expected = true
    expect(actual).toEqual(expected)

    actual = greaterThanFn(4, 3)
    expected = true
    expect(actual).toEqual(expected)

    actual = greaterThanFn(4.2, 4.1)
    expected = true
    expect(actual).toEqual(expected)
  })

  it('greaterThanFn should return false if the value given is less than or equal than the param', () => {
    let actual = greaterThanFn(1, 2)
    let expected = false
    expect(actual).toEqual(expected)

    actual = greaterThanFn(0, 10)
    expected = false
    expect(actual).toEqual(expected)

    actual = greaterThanFn(null, 4)
    expected = false
    expect(actual).toEqual(expected)

    actual = greaterThanFn(4, 4)
    expected = false
    expect(actual).toEqual(expected)
  })

  it('greaterThanFn should return false if the key is undefined', () => {
    const actual = greaterThanFn(undefined, 0)
    const expected = false
    expect(actual).toEqual(expected)
  })

  it('greaterThanFn should return true for documentation cases', () => {
    let result = greaterThanFn(4, 1) // true
    expect(result).toEqual(true)

    result = greaterThanFn(4, 5) // false
    expect(result).toEqual(false)
  })

  it('greaterThanFn should return false if the key is a string that parses to NaN', () => {
    const redProps = [
      'cool',
      'some string',
      'undefined',
      'null',
      'false',
      'true'
    ]
    redProps.forEach((val) => {
      const actual = greaterThanFn(val, 0)
      const expected = false
      expect(actual).toEqual(expected)
    })
  })

  it('greaterThanFn should compare strings based on standard lexicographical ordering, using Unicode values', () => {
    expect(greaterThanFn('a', 'b')).toEqual(false)
    expect(greaterThanFn('aaaa', 'abaa')).toEqual(false)
    expect(greaterThanFn('bb', 'a')).toEqual(true)
    expect(greaterThanFn('baa', 'abb')).toEqual(true)
    expect(greaterThanFn('1', 2)).toEqual(false)
    expect(greaterThanFn('2', 1)).toEqual(true)
    expect(greaterThanFn('2', '4')).toEqual(false)
  })
})
