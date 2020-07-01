import make from './make'

describe('make', () => {
  it('should be a function', () => {
    const actual = typeof make
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should return a factory function with makeArgs bound so regent syntax lookups work', () => {
    const FN = lookup => lookup
    const data = {
      foo: {
        bar: 'works'
      }
    }
    const actual = make(FN)('@foo.bar')(data)
    const expected = 'works'

    expect(actual).toEqual(expected)
  })

  it('should throw an error if what is passed in is not a function', () => {
    expect(() => make('hello')).toThrow('make must be passed a function as argument 1')
  })

  it('should attach a toJson method that can be used to get the JSON version of the rule definition.', () => {
    const threeEqual = make(function threeEqual (a, b, c) {
      return a === b && b === c
    }, 'threeEqual')

    const data = {
      foo: 'same',
      bar: 'same',
      baz: 'same'
    }

    const MY_RULE = threeEqual('@foo', '@bar', '@baz')

    expect(MY_RULE(data)).toEqual(true)

    const actual = MY_RULE.toJson()
    const expected = JSON.stringify({ threeEqual: ['@foo', '@bar', '@baz'] })

    expect(actual).toEqual(expected)
  })

  it('toJson method should return an "unknown" key when no second argument is passed', () => {
    const threeEqual = make(function threeEqual (a, b, c) {
      return a === b && b === c
    })

    const data = {
      foo: 'same',
      bar: 'same',
      baz: 'same'
    }

    const MY_RULE = threeEqual('@foo', '@bar', '@baz')

    expect(MY_RULE(data)).toEqual(true)

    const actual = MY_RULE.toJson()
    const expected = JSON.stringify({ unknown: ['@foo', '@bar', '@baz'] })

    expect(actual).toEqual(expected)
  })

  it('toJson method should return an "unknown" key when second argument is falsy', () => {
    const threeEqual = make(function threeEqual (a, b, c) {
      return a === b && b === c
    }, '')

    const data = {
      foo: 'same',
      bar: 'same',
      baz: 'same'
    }

    const MY_RULE = threeEqual('@foo', '@bar', '@baz')

    expect(MY_RULE(data)).toEqual(true)

    const actual = MY_RULE.toJson()
    const expected = JSON.stringify({ unknown: ['@foo', '@bar', '@baz'] })
    expect(actual).toEqual(expected)

    const threeEqual2 = make(function threeEqual (a, b, c) {
      return a === b && b === c
    }, null)

    const MY_RULE2 = threeEqual2('@foo', '@bar', '@baz')

    const actual2 = MY_RULE2.toJson()
    const expected2 = JSON.stringify({ unknown: ['@foo', '@bar', '@baz'] })
    expect(actual2).toEqual(expected2)
  })

  it('toJson method should return an "unknown" key when second argument is not a string', () => {
    const threeEqual = make(function threeEqual (a, b, c) {
      return a === b && b === c
    }, {})

    const data = {
      foo: 'same',
      bar: 'same',
      baz: 'same'
    }

    const MY_RULE = threeEqual('@foo', '@bar', '@baz')

    expect(MY_RULE(data)).toEqual(true)

    const actual = MY_RULE.toJson()
    const expected = JSON.stringify({ unknown: ['@foo', '@bar', '@baz'] })
    expect(actual).toEqual(expected)
  })
})
