import and from './and'
import equals from './equals'

describe('and', () => {
  it('should be a function', () => {
    const actual = typeof and
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should return true if all rules are true', () => {
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

  it('should return false if any rule is false', () => {
    const A = equals('@foo', 'a')
    const B = equals('@bar', 'b')
    const C = equals(false, true)

    const data = {
      foo: 'not_a',
      bar: 'b'
    }

    let actual = and(A, B)(data)
    let expected = false

    expect(actual).toEqual(expected)

    data.foo = 'a'
    data.bar = 'not_b'

    actual = and(A, B)(data)
    expected = false

    expect(actual).toEqual(expected)

    data.foo = 'a'
    data.bar = 'b'

    actual = and(A, B, C)(data)
    expected = false

    expect(actual).toEqual(expected)
  })

  it('should return false if no rules are true', () => {
    const A = equals('@foo', 'a')
    const B = equals('@bar', 'b')

    const data = {
      foo: 'not_a',
      bar: 'not_b'
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
