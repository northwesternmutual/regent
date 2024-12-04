import not from './not'
import equals from './equals'

describe('not', () => {
  it('should be a function', () => {
    const actual = typeof not
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should invert the value of any rule', () => {
    const RULE = equals('@foo', 'a')
    const data = {
      foo: 'a'
    }
    const actual = not(RULE)(data)
    const expected = false

    expect(actual).toEqual(expected)
  })

  it('should support boolean literals', () => {
    const RULE = true
    const data = {
      foo: 'a'
    }
    const actual = not(RULE)(data)
    const expected = false

    expect(actual).toEqual(expected)
  })

  it('should invert the value of any rule', () => {
    const RULE = equals('@foo', 'a')
    const data = {
      foo: 'b'
    }
    const actual = not(RULE)(data)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('when the toJson method is called it should return a json representation of the rule.', () => {
    const A = equals('@foo', 'a')

    const MY_RULE = not(A)

    const actual = MY_RULE.toJson()
    const expected = JSON.stringify({
      not: [
        { equals: ['@foo', 'a'] }
      ]
    })

    expect(actual).toEqual(expected)
  })

  it('should allow a boolean value', () => {
    const A = not(false)
    const B = not(true)
    // @ts-expect-error type check
    expect(A()).toEqual(true)
    expect(B({})).toEqual(false)
  })
})
