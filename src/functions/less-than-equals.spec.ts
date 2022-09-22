import lessThanOrEqualsFn, { lessThanOrEquals } from './less-than-equals'

describe('3.x.x - lessThanOrEqualsFn should work in functional style', () => {
  it('should be a function', () => {
    const actual = typeof lessThanOrEqualsFn
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should perform lessThanOrEqualsFn', () => {
    const data = {
      foo: 10
    }

    const RULE = lessThanOrEqualsFn('@foo', 10)
    const actual = RULE(data)
    const expected = true

    expect(actual).toEqual(expected)
  })
})

describe('lessThanOrEquals', () => {
  it('lessThanOrEquals should be a function', () => {
    expect(typeof lessThanOrEquals).toEqual('function')
  })

  it('lessThanOrEquals should return true if "left" is less than "right"', () => {
    const actual = lessThanOrEquals(4, 5)
    const expected = true
    expect(actual).toEqual(expected)
  })

  it('lessThanOrEquals should return true if "left" equals "right"', () => {
    const actual = lessThanOrEquals(5, 5)
    const expected = true
    expect(actual).toEqual(expected)
  })

  it('lessThanOrEquals should return false if "left" is greater than "right', () => {
    const actual = lessThanOrEquals(255, 254)
    const expected = false
    expect(actual).toEqual(expected)
  })

  it('lessThanOrEquals should return false if the key is a string that parses to NaN', () => {
    const redProps = [
      'cool',
      'some string',
      'undefined',
      'null',
      'false',
      'true'
    ]
    redProps.forEach((val) => {
      const actual = lessThanOrEquals(val, 0)
      const expected = false
      expect(actual).toEqual(expected)
    })
  })

  it('lessThanOrEquals should compare strings based on standard lexicographical ordering, using Unicode values', () => {
    expect(lessThanOrEquals('a', 'b')).toEqual(true)
    expect(lessThanOrEquals('aaaa', 'abaa')).toEqual(true)
    expect(lessThanOrEquals('bb', 'a')).toEqual(false)
    expect(lessThanOrEquals('baa', 'abb')).toEqual(false)
    expect(lessThanOrEquals('1', 2)).toEqual(true)
    expect(lessThanOrEquals('2', 1)).toEqual(false)
    expect(lessThanOrEquals('2', '4')).toEqual(true)
    expect(lessThanOrEquals('4', '4')).toEqual(true)
    expect(lessThanOrEquals(4, '4')).toEqual(true)
  })

  it('when the toJson method is called it should return a json representation of the rule.', () => {
    const MY_RULE = lessThanOrEqualsFn('@foo', 5)
    const actual = MY_RULE.toJson()
    const expected = JSON.stringify({ lessThanOrEquals: ['@foo', 5] })

    expect(actual).toEqual(expected)
  })
})
