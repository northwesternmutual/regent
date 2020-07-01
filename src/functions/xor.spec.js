import xor from './xor'
import equals from './equals'

describe('xor', () => {
  it('should be a function', () => {
    const actual = typeof xor
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should return true if first rule but not second is true', () => {
    const RULE_A = equals('@foo', 'a')
    const RULE_B = equals('@foo', 'b')

    const data = {
      foo: 'a'
    }

    const actual = xor(RULE_A, RULE_B)(data)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('should return true if second rule but not first is true', () => {
    const RULE_A = equals('@foo', 'a')
    const RULE_B = equals('@foo', 'b')

    const data = {
      foo: 'b'
    }

    const actual = xor(RULE_A, RULE_B)(data)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('should return false if both rules are false', () => {
    const RULE_A = equals('@foo', 'a')
    const RULE_B = equals('@foo', 'b')

    const data = {
      foo: 'c'
    }

    const actual = xor(RULE_A, RULE_B)(data)
    const expected = false

    expect(actual).toEqual(expected)
  })

  it('should return false if both rules are true', () => {
    const RULE_A = equals('@foo', 'a')
    const RULE_B = equals('@bar', 'b')

    const data = {
      foo: 'a',
      bar: 'b'
    }

    const actual = xor(RULE_A, RULE_B)(data)
    const expected = false

    expect(actual).toEqual(expected)
  })

  it('should handle boolean literals (passing)', () => {
    const RULE_A = true
    const RULE_B = false

    const data = null

    const actual = xor(RULE_A, RULE_B)(data)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('should handle boolean literals (failing)', () => {
    const RULE_A = true
    const RULE_B = true

    const data = null

    const actual = xor(RULE_A, RULE_B)(data)
    const expected = false

    expect(actual).toEqual(expected)
  })

  it('should throw if not exactly two arguments', () => {
    const RULE_A = equals('@foo', 'a')

    const data = {
      foo: 'a'
    }

    expect(() => xor(RULE_A)(data)).toThrow('Regent: xor must take exactly 2 rules')
  })

  it('should throw provided a non rule', () => {
    const RULE_A = equals('@foo', 'a')
    const NOT_RULE = 'not a rule'

    const data = {
      foo: 'a'
    }

    expect(() => xor(RULE_A, NOT_RULE)(data)).toThrow('Regent: xor requires all arguments to be a function')
  })

  it('when the toJson method is called it should return a json representation of the rule.', () => {
    const A = equals('@foo', 'a')
    const B = equals('@bar', 'b')

    const MY_RULE = xor(A, B)

    const actual = MY_RULE.toJson()
    const expected = JSON.stringify({
      xor: [
        { equals: ['@foo', 'a'] },
        { equals: ['@bar', 'b'] }
      ]
    })

    expect(actual).toEqual(expected)
  })
})
