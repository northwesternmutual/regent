import someFn, { some } from './some'
import equals from '../functions/equals'
import or from '../functions/or'

describe('3.x.x - someFn', () => {
  it('should work with function style rules (passing)', () => {
    const data = {
      nodes: [
        { foo: 'bar' },
        { foo: 'foo' }
      ]
    }

    const RULE = equals('@__.foo', 'bar')
    const E_RULE = someFn('@nodes', RULE)
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
    const E_RULE = someFn('@nodes', RULE, 'this')
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
    const E_RULE = someFn('@nodes', RULE)
    const actual = E_RULE(data)
    const expected = false

    expect(actual).toEqual(expected)
  })

  it('should work with boolean literals (passing)', () => {
    const data = {
      nodes: [
        { foo: 'bar' },
        { foo: 'bar' }
      ]
    }

    const RULE = true
    const E_RULE = someFn('@nodes', RULE)
    const actual = E_RULE(data)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('should work with boolean literals (failing)', () => {
    const data = {
      nodes: [
        { foo: 'bar' },
        { foo: 'bar' }
      ]
    }

    const RULE = false
    const E_RULE = someFn('@nodes', RULE)
    const actual = E_RULE(data)
    const expected = false

    expect(actual).toEqual(expected)
  })

  it('should not die if lookup evaluates to undefined', () => {
    const data = {}

    const RULE = false
    const E_RULE = someFn('@nodes', RULE)
    const actual = E_RULE(data)
    const expected = false

    expect(actual).toEqual(expected)
  })
})

describe('some', () => {
  it('some should be a function', () => {
    const actual = typeof some
    const expected = 'function'
    expect(actual).toEqual(expected)
  })

  it('some should evaluate a regent rule for each item in the looked up array. Should return true if some are true', () => {
    const left = [
      { value: false },
      { value: false },
      { value: true }
    ]
    const right = equals('@__.value', true)
    const actual = some(left, right)
    const expected = true
    expect(actual).toEqual(expected)
  })

  it('some should evaluate a regent rule for each item in the looked up array. Should return false if none are true', () => {
    const left = [
      { value: false },
      { value: false },
      { value: false }
    ]
    const right = equals('@__.value', true)
    const actual = some(left, right)
    const expected = false
    expect(actual).toEqual(expected)
  })

  it('some should return false if left is undefined', () => {
    const right = equals('@__.value', true)
    const actual = some(undefined, right)
    const expected = false
    expect(actual).toEqual(expected)
  })

  it('some should work with helper composed rules', () => {
    const left = [
      { value: true },
      { value: 'yes' },
      { value: false }
    ]
    const right = or(
      equals('@__.value', true),
      equals('@__.value', 'yes')
    )
    const actual = some(left, right)
    expect(actual).toEqual(true)
  })

  it('when it\'s toJson method is called it should return a json representation of the rule', () => {
    const RULE = equals('@__.foo', 'bar')
    const E_RULE = someFn('@nodes', RULE)
    const actual = E_RULE.toJson()
    const expected = JSON.stringify({
      some: ['@nodes',
        { equals: ['@__.foo', 'bar'] }
      ]
    })

    expect(actual).toEqual(expected)
  })
})
