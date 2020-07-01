import makeWithContext from './make-with-context'

describe('makeWithContext', () => {
  it('should be a function', () => {
    const actual = typeof makeWithContext
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should return a factory function with makeArgs bound so regent syntax lookups work', () => {
    const FN = (arg1, arg2) => `${arg1}: ${arg2}`
    const data = {
      foo: {
        bar: 'works'
      },
      biz: 'hello world'
    }
    const actual = makeWithContext(FN)('@foo.bar', '@biz')(data)
    const expected = 'works: hello world'

    expect(actual).toEqual(expected)
  })

  it('it should throw an error if what is passed in is not a function', () => {
    expect(() => makeWithContext('hello')).toThrow('makeWithContext must be passed a function as argument 1')
  })

  it('should pass through context', () => {
    const FN = (arg1, arg2, context) => `${arg1}: ${arg2} (${context})`
    const data = {
      foo: {
        bar: 'works'
      },
      biz: 'hello world'
    }
    const actual = makeWithContext(FN)('@foo.bar', '@biz', 'huzzah')(data)
    const expected = 'works: hello world (huzzah)'

    expect(actual).toEqual(expected)
  })

  it('context should default to "__"', () => {
    const FN = (arg1, arg2, context) => `${arg1}: ${arg2} (${context})`
    const data = {
      foo: {
        bar: 'works'
      },
      biz: 'hello world'
    }
    const actual = makeWithContext(FN)('@foo.bar', '@biz')(data)
    const expected = 'works: hello world (__)'

    expect(actual).toEqual(expected)
  })

  it('should correctly render booleans to JSON', () => {
    const FN = (arg1, arg2) => `${arg1}: ${arg2}`
    const returnFn = makeWithContext(FN, 'FN')('@foo.bar', true)
    const actual = returnFn.toJson()
    const expected = '{"FN":["@foo.bar",true]}'

    expect(actual).toEqual(expected)
  })
})
