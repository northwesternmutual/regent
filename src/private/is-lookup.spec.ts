import isLookup from './is-lookup'

describe('isLookup', () => {
  it('isLookup Function: Should exist.', () => {
    const actual = typeof isLookup
    const expected = 'function'
    expect(actual).toEqual(expected)
  })

  it('isLookup Function: Should return true if the string is an unescaped string that starts with @', () => {
    const actual = isLookup('@hello')
    const expected = true
    expect(actual).toEqual(expected)
  })

  it('isLookup Function: Should return false if the argument is not a string.', () => {
    let str = {}
    let actual = isLookup(str)
    const expected = false
    expect(actual).toEqual(expected)

    str = []
    actual = isLookup(str)
    expect(actual).toEqual(expected)

    str = 5
    actual = isLookup(str)
    expect(actual).toEqual(expected)

    str = true
    actual = isLookup(str)
    expect(actual).toEqual(expected)

    str = undefined
    actual = isLookup(str)
    expect(actual).toEqual(expected)

    str = () => {}
    actual = isLookup(str)
    expect(actual).toEqual(expected)
  })

  it('isLookup Function: Should return false if the argument is an escaped string', () => {
    let str = '@@hello'
    let actual = isLookup(str)
    const expected = false
    expect(actual).toEqual(expected)

    str = '@@@hello'
    actual = isLookup(str)
    expect(actual).toEqual(expected)
  })

  it('isLookup Function: Should return false if the argument is not a lookup string.', () => {
    let str = 'hello'
    let actual = isLookup(str)
    const expected = false
    expect(actual).toEqual(expected)

    str = 'he@llo'
    actual = isLookup(str)
    expect(actual).toEqual(expected)
  })
})
