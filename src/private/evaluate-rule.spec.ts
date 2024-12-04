import evaluateRule from './evaluate-rule'
import equals from '../functions/equals'

describe('evaluateRule', () => {
  it('should be a function', async () => {
    expect(typeof evaluateRule).toEqual('function')
  })

  it('should work with standard functional regent rules', async () => {
    const A = equals('@foo', 'a')
    const data = {
      foo: 'a'
    }
    const actual = evaluateRule(A, data)

    expect(actual).toEqual(true)
  })

  it('should work with a boolean literal', async () => {
    const A = true
    const data = null
    // @ts-expect-error type check
    const actual = evaluateRule(A, data)

    expect(actual).toEqual(true)
  })

  it('should return false for a misconfigured rule', () => {
    const A = equals('@foo', 'a')
    const B = { not: A }
    const data = null

    // @ts-expect-error type check
    expect(evaluateRule(B, data)).toEqual(false)
  })
})
