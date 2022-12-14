import greaterThanFn, { greaterThan } from './greater-than'

describe('3.x.x - greaterThanFn should work in functional style', () => {
  it('should be a function', () => {
    const actual = typeof greaterThanFn
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should evaluate greaterThanFn', () => {
    const data = {
      foo: 3
    }

    const RULE = greaterThanFn('@foo', 1)
    const actual = RULE(data)
    const expected = true

    expect(actual).toEqual(expected)
  })
})

describe('greaterThan', () => {
  it('greaterThan should be a function', () => {
    expect(typeof greaterThan).toEqual('function')
  })

  it('greaterThan should return true if the value given is greater than the param', () => {
    let actual = greaterThan(1, 0)
    let expected = true
    expect(actual).toEqual(expected)

    actual = greaterThan(4, 3)
    expected = true
    expect(actual).toEqual(expected)

    actual = greaterThan(4.2, 4.1)
    expected = true
    expect(actual).toEqual(expected)
  })

  it('greaterThan should return false if the value given is less than or equal than the param', () => {
    let actual = greaterThan(1, 2)
    let expected = false
    expect(actual).toEqual(expected)

    actual = greaterThan(0, 10)
    expected = false
    expect(actual).toEqual(expected)

    actual = greaterThan(null, 4)
    expected = false
    expect(actual).toEqual(expected)

    actual = greaterThan(4, 4)
    expected = false
    expect(actual).toEqual(expected)
  })

  it('greaterThan should return false if the key is undefined', () => {
    const actual = greaterThan(undefined, 0)
    const expected = false
    expect(actual).toEqual(expected)
  })

  it('greaterThan should return true for documentation cases', () => {
    let result = greaterThan(4, 1) // true
    expect(result).toEqual(true)

    result = greaterThan(4, 5) // false
    expect(result).toEqual(false)
  })

  it('greaterThan should return false if the key is a string that parses to NaN', () => {
    const redProps = [
      'cool',
      'some string',
      'undefined',
      'null',
      'false',
      'true'
    ]
    redProps.forEach((val) => {
      const actual = greaterThan(val, 0)
      const expected = false
      expect(actual).toEqual(expected)
    })
  })

  it('greaterThan should compare strings based on standard lexicographical ordering, using Unicode values', () => {
    expect(greaterThan('a', 'b')).toEqual(false)
    expect(greaterThan('aaaa', 'abaa')).toEqual(false)
    expect(greaterThan('bb', 'a')).toEqual(true)
    expect(greaterThan('baa', 'abb')).toEqual(true)
    expect(greaterThan('1', 2)).toEqual(false)
    expect(greaterThan('2', 1)).toEqual(true)
    expect(greaterThan('2', '4')).toEqual(false)
  })

  it('when the toJson method is called it should return a json representation of the rule.', () => {
    const MY_RULE = greaterThanFn('@foo', 5)
    const actual = MY_RULE.toJson()
    const expected = JSON.stringify({ greaterThan: ['@foo', 5] })

    expect(actual).toEqual(expected)
  })
})
