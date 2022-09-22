import isRule from './is-rule'
import equals from '../functions/equals'

describe('3.x.x - isRule', () => {
  it('isRule should be a function', () => {
    const actual = typeof isRule
    const expected = 'function'
    expect(actual).toEqual(expected)
  })

  it('should work with functional rules', () => {
    const RULE = equals('@foo', 'bar')
    const actual = isRule(RULE)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('should work with boolean literals (true)', () => {
    const RULE = true
    const actual = isRule(RULE)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('should work with boolean literals (false)', () => {
    const RULE = false
    const actual = isRule(RULE)
    const expected = true

    expect(actual).toEqual(expected)
  })
})
