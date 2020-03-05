import every from './every'
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
    const E_RULE = every('@nodes', RULE)
    const actual = E_RULE(data)
    const expected = true

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
    const E_RULE = every('@nodes', RULE, 'context')
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
    const E_RULE = every('@nodes', RULE)
    const actual = E_RULE(data)
    const expected = false

    expect(actual).toEqual(expected)
  })

  it('every should throw an error if right is not a regent rule', () => {
    const right = { something: 'not a rule' }
    expect(() => every('@nodes', right)({})).toThrow('Regent: the right property of an every rule must be a regent rule')
  })

  it('should return false if the first argument is not an array', () => {
    const data = {
      nodes: 'string'
    }

    const RULE = equals('@__.foo', 'bar')
    const E_RULE = every('@nodes', RULE)
    const actual = E_RULE(data)
    const expected = false

    expect(actual).toEqual(expected)
  })
})
