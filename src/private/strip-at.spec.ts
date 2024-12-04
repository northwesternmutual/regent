import stripAt from './strip-at'

describe('stripAt', () => {
  it('stripAt Function: Should exist.', () => {
    const actual = typeof stripAt
    const expected = 'function'
    expect(actual).toEqual(expected)
  })

  it('stripAt Function: Should strip the first @ off of a string that begins with an @', () => {
    const str = '@hello'
    const actual = stripAt(str)
    const expected = 'hello'
    expect(actual).toEqual(expected)
  })

  it('stripAt Function: Should strip ONLY the first @ off of a string that begins with an @', () => {
    const str = '@@hello'
    const actual = stripAt(str)
    const expected = '@hello'
    expect(actual).toEqual(expected)
  })

  it('stripAt Function: Should NOT strip the @ off of a string unless that @ is at the beginning.', () => {
    const str = 'he@llo'
    const actual = stripAt(str)
    const expected = 'he@llo'
    expect(actual).toEqual(expected)
  })

  it('should return the arg if it is not a string', () => {
    // @ts-expect-error type check
    const actual = stripAt(12)
    const expected = 12

    expect(actual).toEqual(expected)
  })

  it('should handle null', () => {
    const actual = stripAt(null)
    const expected = null

    expect(actual).toEqual(expected)
  })

  it('should handle undefined', () => {
    const actual = stripAt(undefined)
    const expected = undefined

    expect(actual).toEqual(expected)
  })

  it('should handle empty array', () => {
    // @ts-expect-error type check
    const actual = stripAt([])
    const expected = []

    expect(actual).toEqual(expected)
  })

  it('should handle empty Object', () => {
    // @ts-expect-error type check
    const actual = stripAt({})
    const expected = {}

    expect(actual).toEqual(expected)
  })
})
