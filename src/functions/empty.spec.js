import empty, { emptyFn } from './empty'

describe('3.x.x - empty functional style', () => {
  it('should be a function', () => {
    const actual = typeof empty
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should return true for empty items', () => {
    const data = {
      foo: '',
      bar: null,
      biz: 'undefined'
    }

    const RULE = empty('@foo')(data)
    const RULE2 = empty('@bar')(data)
    const RULE3 = empty('@biz')(data)
    const RULE4 = empty('@baz')(data)

    expect(RULE).toEqual(true)
    expect(RULE2).toEqual(true)
    expect(RULE3).toEqual(true)
    expect(RULE4).toEqual(true)
  })
})

describe('emptyFn', () => {
  it('emptyFn should be a function', () => {
    expect(typeof emptyFn).toEqual('function')
  })

  it('emptyFn should return true if input is undefined, null, "undefined", or "" (emptyFn string)', () => {
    const greenArr = [
      undefined,
      null,
      'undefined',
      ''
    ]
    greenArr.forEach((input) => {
      const actual = emptyFn(input)
      const expected = true
      expect(actual).toEqual(expected)
    })
  })

  it('validate documentation cases', () => {
    let result = emptyFn() // true
    expect(result).toEqual(true)
    result = emptyFn('') // true
    expect(result).toEqual(true)
    result = emptyFn(null) // true
    expect(result).toEqual(true)
    result = emptyFn(undefined) // true
    expect(result).toEqual(true)
    result = emptyFn('some value') // false
    expect(result).toEqual(false)
    result = emptyFn({}) // false
    expect(result).toEqual(false)
    result = emptyFn([]) // false
    expect(result).toEqual(false)
    result = emptyFn(['']) // false
    expect(result).toEqual(false)
  })
})
