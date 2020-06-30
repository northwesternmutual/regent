import and from './and'
import equals from './equals'

describe('and', () => {
  it('should be a function', () => {
    const actual = typeof and
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should return true if at least one rule is true', () => {
    const A = equals('@foo', 'a')
    const B = equals('@bar', 'b')

    const data = {
      foo: 'a',
      bar: 'b'
    }

    const actual = and(A, B)(data)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('should return false if no rules true', () => {
    const A = equals('@foo', 'a')
    const B = equals('@bar', 'b')

    const data = {
      foo: 'a',
      bar: 'c'
    }

    const actual = and(A, B)(data)
    const expected = false

    expect(actual).toEqual(expected)
  })

  it('should support boolean literals', () => {
    const A = equals('@foo', 'a')
    const B = true

    const data = {
      foo: 'a'
    }

    const actual = and(A, B)(data)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('should throw and error if one of the arguments is not a function', () => {
    const A = equals('@foo', 'a')
    const B = 'string'

    const data = {
      foo: 'c'
    }

    expect(() => and(A, B)(data)).toThrow('Regent: and requires all arguments to be a function')
  })

  it('when the toJson method is called it should return a json representation of the rule.', () => {
    const A = equals('@foo', 'a')
    const B = equals('@bar', 'b')

    const MY_RULE = and(A, B)

    const actual = MY_RULE.toJson()
    const expected = JSON.stringify({
      and: [
        { equals: ['@foo', 'a'] },
        { equals: ['@bar', 'b'] }
      ]
    })

    expect(actual).toEqual(expected)
  })
})
