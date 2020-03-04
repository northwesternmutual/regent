import get from './get'

describe('get', () => {
  it('should be a function', () => {
    const actual = typeof get
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should perform path lookups', () => {
    const data = {
      foo: {
        bar: 'bar'
      }
    }
    const actual = get(data, 'foo.bar')
    const expected = 'bar'

    expect(actual).toEqual(expected)
  })

  it('should handle array syntax', () => {
    const data = {
      foo: [
        { bar: 'bar' }
      ]
    }
    const actual = get(data, 'foo[0].bar')
    const expected = 'bar'

    expect(actual).toEqual(expected)
  })

  it('should handle dashes in keys', () => {
    const data = {
      foo: { 'ba-ar': 'bar' }
    }
    const actual = get(data, 'foo.ba-ar')
    const expected = 'bar'

    expect(actual).toEqual(expected)
  })

  it('should handle path array syntax', () => {
    const data = {
      foo: { 'ba-ar': 'bar' }
    }
    const actual = get(data, ['foo', 'ba-ar'])
    const expected = 'bar'

    expect(actual).toEqual(expected)
  })

  it('should handle square selector syntax', () => {
    const data = {
      foo: { 'ba-ar': 'bars' }
    }
    const actual = get(data, 'foo["ba-ar"]')
    const expected = 'bars'

    expect(actual).toEqual(expected)
  })
})
