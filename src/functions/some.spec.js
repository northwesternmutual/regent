import some, { someFn } from './some'
import equals from '../functions/equals'
import or from '../functions/or'

describe('3.x.x - some', () => {
  it('should work with function style rules (passing)', () => {
    const data = {
      nodes: [
        { foo: 'bar' },
        { foo: 'foo' }
      ]
    }

    const RULE = equals('@__.foo', 'bar')
    const E_RULE = some('@nodes', RULE)
    const actual = E_RULE(data)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('should work with custom context (passing)', () => {
    const data = {
      nodes: [
        { foo: 'bar' },
        { foo: 'foo' }
      ]
    }

    const RULE = equals('@this.foo', 'bar')
    const E_RULE = some('@nodes', RULE, 'this')
    const actual = E_RULE(data)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('should work with function style rules (failing)', () => {
    const data = {
      nodes: [
        { foo: 'foo' },
        { foo: 'foo' }
      ]
    }

    const RULE = equals('@__.foo', 'bar')
    const E_RULE = some('@nodes', RULE)
    const actual = E_RULE(data)
    const expected = false

    expect(actual).toEqual(expected)
  })
})

describe('someFn', () => {
  it('someFn should be a function', () => {
    const actual = typeof someFn
    const expected = 'function'
    expect(actual).toEqual(expected)
  })

  it('someFn should evaluate a regent rule for each item in the looked up array. Should return true if someFn are true', () => {
    const left = [
      { value: false },
      { value: false },
      { value: true }
    ]
    const right = equals('@__.value', true)
    const actual = someFn(left, right)
    const expected = true
    expect(actual).toEqual(expected)
  })

  it('someFn should evaluate a regent rule for each item in the looked up array. Should return false if none are true', () => {
    const left = [
      { value: false },
      { value: false },
      { value: false }
    ]
    const right = equals('@__.value', true)
    const actual = someFn(left, right)
    const expected = false
    expect(actual).toEqual(expected)
  })

  it('someFn should throw an error if right is not a regent rule', () => {
    const left = [
      { value: true },
      { value: true },
      { value: true }
    ]
    const right = { this_is_not: 'a rule' }
    expect(() => someFn(left, right)).toThrow('Regent: the right property of an every rule must be a regent rule')
  })

  it('someFn should return false if left is not an array', () => {
    let left = {
      not: 'an array'
    }
    let right = equals('@__.value', true)
    let actual = someFn(left, right)
    expect(actual).toEqual(false)

    left = 42
    right = equals('@__.value', true)
    actual = someFn(left, right)
    expect(actual).toEqual(false)

    left = 'I am clearly a string'
    right = equals('@__.value', true)
    actual = someFn(left, right)
    expect(actual).toEqual(false)
  })

  it('someFn should return false if left is undefined', () => {
    const right = equals('@__.value', true)
    const actual = someFn(undefined, right)
    const expected = false
    expect(actual).toEqual(expected)
  })

  it('someFn should work with helper composed rules', () => {
    const left = [
      { value: true },
      { value: 'yes' },
      { value: false }
    ]
    const right = or(
      equals('@__.value', true),
      equals('@__.value', 'yes')
    )
    const actual = someFn(left, right)
    expect(actual).toEqual(true)
  })

  it('should return false if the first argument is not an array', () => {
    const RULE = equals('string', 'bar')
    const actual = someFn('@nodes', RULE)
    const expected = false

    expect(actual).toEqual(expected)
  })
})
