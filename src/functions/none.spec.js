import none from './none'
import equals from './equals'

describe('none', () => {
  it('should be a function', () => {
    const actual = typeof none
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should return true if all rules are false', () => {
    const RULE_A = equals('@foo', 'a')
    const RULE_B = equals('@bar', 'b')
    const RULE_C = equals('@biz', 'c')

    const data = {
      foo: 'z'
    }

    const actual = none(RULE_A, RULE_B, RULE_C)(data)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('should return false if any rules are true', () => {
    const RULE_A = equals('@foo', 'a')
    const RULE_B = equals('@bar', 'b')
    const RULE_C = equals('@biz', 'c')

    const data = {
      foo: 'a'
    }

    const actual = none(RULE_A, RULE_B, RULE_C)(data)
    const expected = false

    expect(actual).toEqual(expected)
  })

  it('should throw provided a non rule', () => {
    const RULE_A = equals('@foo', 'a')
    const NOT_RULE = 'not a rule'

    const data = {
      foo: 'a'
    }

    expect(() => none(RULE_A, NOT_RULE)(data)).toThrow('Regent: none requires all arguments to be a function')
  })
})
