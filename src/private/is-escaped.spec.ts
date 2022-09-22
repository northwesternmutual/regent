import isEscaped from './is-escaped'

describe('isEscaped', () => {
  it('isEscaped Function: Should exist.', () => {
    const actual = typeof isEscaped
    const expected = 'function'
    expect(actual).toEqual(expected)
  })

  it('isEscaped Function: Should return false when the argument does not start with @@', () => {
    let str = '@hello'
    let actual = isEscaped(str)
    const expected = false
    expect(actual).toEqual(expected)

    str = 'hello'
    actual = isEscaped(str)
    expect(actual).toEqual(expected)

    str = 'hello@@'
    actual = isEscaped(str)
    expect(actual).toEqual(expected)

    str = 'he@llo'
    actual = isEscaped(str)
    expect(actual).toEqual(expected)
  })

  it('isEscaped Function: Should return false when the argument is not a string.', () => {
    let str = {}
    let actual = isEscaped(str)
    const expected = false
    expect(actual).toEqual(expected)

    str = []
    actual = isEscaped(str)
    expect(actual).toEqual(expected)

    str = 5
    actual = isEscaped(str)
    expect(actual).toEqual(expected)

    str = true
    actual = isEscaped(str)
    expect(actual).toEqual(expected)

    str = undefined
    actual = isEscaped(str)
    expect(actual).toEqual(expected)

    str = []
    actual = isEscaped(str)
    expect(actual).toEqual(expected)

    str = {}
    actual = isEscaped(str)
    expect(actual).toEqual(expected)
  })

  it('isEscaped Function: Should return false when the argument does not start with @@', () => {
    const str = '@hello'
    const actual = isEscaped(str)
    const expected = false
    expect(actual).toEqual(expected)
  })

  it('isEscaped Function: Should return true when the argument provided does begin with @@', () => {
    const str = '@@hello'
    const actual = isEscaped(str)
    const expected = true
    expect(actual).toEqual(expected)
  })
})
