import everyFn from './every'
import equals from '../functions/equals'

describe('3.x.x - every', () => {
  it('should work with function style rules (passing)', () => {
    const data = {
      nodes: [
        { foo: 'bar' },
        { foo: 'bar' }
      ]
    }

    const RULE = equals('@__.foo', 'bar')
    const E_RULE = everyFn('@nodes', RULE)
    const actual = E_RULE(data)
    const expected = true

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
    const E_RULE = everyFn('@nodes', RULE)
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
    const E_RULE = everyFn('@nodes', RULE)
    const actual = E_RULE(data)
    const expected = false

    expect(actual).toEqual(expected)
  })

  it('should work with custom context param (passing)', () => {
    const data = {
      nodes: [
        { foo: 'bar' },
        { foo: 'bar' }
      ]
    }

    const RULE = equals('@context.foo', 'bar')
    const E_RULE = everyFn('@nodes', RULE, 'context')
    const actual = E_RULE(data)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('should work with function style rules (failing)', () => {
    const data = {
      nodes: [
        { foo: 'bar' },
        { foo: 'foo' }
      ]
    }

    const RULE = equals('@__.foo', 'bar')
    const E_RULE = everyFn('@nodes', RULE)
    const actual = E_RULE(data)
    const expected = false

    expect(actual).toEqual(expected)
  })

  it('everyFn should throw an error if right is not a regent rule', () => {
    const right = { something: 'not a rule' }
    expect(() => everyFn('@nodes', right)({})).toThrow('Regent: the right property of an every rule must be a regent rule')
  })

  it('everyFn should throw an error if right is not a regent rule', () => {
    const right = { something: 'not a rule' }
    expect(() => everyFn('@nodes', right)({})).toThrow('Regent: the right property of an every rule must be a regent rule')
  })

  it('should return false if the first argument is not an array', () => {
    const data = {
      nodes: 'string'
    }

    const RULE = equals('@__.foo', 'bar')
    const E_RULE = everyFn('@nodes', RULE)
    const actual = E_RULE(data)
    const expected = false

    expect(actual).toEqual(expected)
  })

  it('when it\'s toJson method is called it should return a json representation of the rule', () => {
    const RULE = equals('@__.foo', 'bar')
    const E_RULE = everyFn('@nodes', RULE)
    const actual = E_RULE.toJson()
    const expected = JSON.stringify({
      every: ['@nodes',
        { equals: ['@__.foo', 'bar'] }
      ]
    })

    expect(actual).toEqual(expected)
  })
})
