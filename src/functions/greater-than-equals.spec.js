import greaterThanOrEquals, { greaterThanOrEqualsFn } from './greater-than-equals'

describe('greaterThanOrEquals', () => {
  it('greaterThanOrEquals should be a function', () => {
    expect(typeof greaterThanOrEqualsFn).toEqual('function')
  })

  it('greaterThan should return true if the value given is greater than the param', () => {
    let actual = greaterThanOrEqualsFn(1, 0)
    let expected = true
    expect(actual).toEqual(expected)

    actual = greaterThanOrEqualsFn(4, 3)
    expected = true
    expect(actual).toEqual(expected)

    actual = greaterThanOrEqualsFn(4.2, 4.1)
    expected = true
    expect(actual).toEqual(expected)

    actual = greaterThanOrEqualsFn(4, 4)
    expected = true
    expect(actual).toEqual(expected)

    actual = greaterThanOrEqualsFn(4.2, 4.2)
    expected = true
    expect(actual).toEqual(expected)
  })

  it('greaterThan should return true if the value given is equal to the param', () => {
    let actual = greaterThanOrEqualsFn(1, 1)
    let expected = true
    expect(actual).toEqual(expected)

    actual = greaterThanOrEqualsFn(4, 4)
    expected = true
    expect(actual).toEqual(expected)

    actual = greaterThanOrEqualsFn(4.2, 4.2)
    expected = true
    expect(actual).toEqual(expected)
  })

  it('greaterThanOrEqualsFn should return false if the value given is less than the param', () => {
    let actual = greaterThanOrEqualsFn(1, 2)
    let expected = false
    expect(actual).toEqual(expected)

    actual = greaterThanOrEqualsFn(0, 10)
    expected = false
    expect(actual).toEqual(expected)

    actual = greaterThanOrEqualsFn(null, 4)
    expected = false
    expect(actual).toEqual(expected)
  })

  it('greaterThanOrEqualsFn should return false if the key is undefined', () => {
    const actual = greaterThanOrEqualsFn(undefined, 0)
    const expected = false
    expect(actual).toEqual(expected)
  })

  it('greaterThanOrEqualsFn should return false if the key is a string that parses to NaN', () => {
    const redProps = [
      'cool',
      'some string',
      'undefined',
      'null',
      'false',
      'true'
    ]
    redProps.forEach((val) => {
      const actual = greaterThanOrEqualsFn(val, 0)
      const expected = false
      expect(actual).toEqual(expected)
    })
  })

  it('greaterThanOrEqualsFn should compare strings based on standard lexicographical ordering, using Unicode values', () => {
    expect(greaterThanOrEqualsFn('a', 'b')).toEqual(false)
    expect(greaterThanOrEqualsFn('aaaa', 'abaa')).toEqual(false)
    expect(greaterThanOrEqualsFn('bb', 'a')).toEqual(true)
    expect(greaterThanOrEqualsFn('baa', 'abb')).toEqual(true)
    expect(greaterThanOrEqualsFn('1', 2)).toEqual(false)
    expect(greaterThanOrEqualsFn('2', 1)).toEqual(true)
    expect(greaterThanOrEqualsFn('2', '4')).toEqual(false)
    expect(greaterThanOrEqualsFn('2', '2')).toEqual(true)
    expect(greaterThanOrEqualsFn(4, 4)).toEqual(true)
  })

  describe('greaterThanOrEquals', () => {
    it('should be a function', () => {
      const actual = typeof greaterThanOrEquals
      const expected = 'function'

      expect(actual).toEqual(expected)
    })

    it('should work in a functional style (true)', () => {
      const data = {
        foo: 5
      }
      const actual = greaterThanOrEquals('@foo', 3)(data)
      const expected = true

      expect(actual).toEqual(expected)
    })

    it('should work in a functional style (false)', () => {
      const data = {
        foo: 2
      }
      const actual = greaterThanOrEquals('@foo', 3)(data)
      const expected = false

      expect(actual).toEqual(expected)
    })
  })
})
