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
    const actual = evaluateRule(A, data)

    expect(actual).toEqual(true)
  })

  it('should throw if not given a valid rule', async () => {
    const A = 'some string'
    const data = null

    expect(() => evaluateRule(A, data)).toThrow('Regent: "some string" is not a valid rule')
  })
})
