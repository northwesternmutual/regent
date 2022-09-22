import emptyFn, { empty } from './empty'

describe('3.x.x - emptyFn functional style', () => {
  it('should be a function', () => {
    const actual = typeof emptyFn
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should return true for emptyFn items', () => {
    const data = {
      foo: '',
      bar: null,
      biz: 'undefined'
    }

    const RULE = emptyFn('@foo')(data)
    const RULE2 = emptyFn('@bar')(data)
    const RULE3 = emptyFn('@biz')(data)
    const RULE4 = emptyFn('@baz')(data)

    expect(RULE).toEqual(true)
    expect(RULE2).toEqual(true)
    expect(RULE3).toEqual(true)
    expect(RULE4).toEqual(true)
  })
})

describe('empty', () => {
  it('empty should be a function', () => {
    expect(typeof empty).toEqual('function')
  })

  it('empty should return true if input is undefined, null, "undefined", or "" (empty string)', () => {
    const greenArr = [
      undefined,
      null,
      'undefined',
      ''
    ]
    greenArr.forEach((input) => {
      const actual = empty(input)
      const expected = true
      expect(actual).toEqual(expected)
    })
  })

  it('validate documentation cases', () => {
    let result = empty() // true
    expect(result).toEqual(true)
    result = empty('') // true
    expect(result).toEqual(true)
    result = empty(null) // true
    expect(result).toEqual(true)
    result = empty(undefined) // true
    expect(result).toEqual(true)
    result = empty('some value') // false
    expect(result).toEqual(false)
    result = empty({}) // false
    expect(result).toEqual(false)
    result = empty([]) // false
    expect(result).toEqual(false)
    result = empty(['']) // false
    expect(result).toEqual(false)
  })

  it('when the toJson method is called it should return a json representation of the rule.', () => {
    const MY_RULE = emptyFn('@foo')
    const actual = MY_RULE.toJson()
    const expected = JSON.stringify({ empty: ['@foo'] })

    expect(actual).toEqual(expected)
  })
})
