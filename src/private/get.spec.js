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

  it('should return undefined if not provided a selector', () => {
    const data = {
      foo: { 'ba-ar': 'bars' }
    }
    const actual = get(data)
    const expected = undefined

    expect(actual).toEqual(expected)
  })

  it('should allow lookups in arrays', () => {
    const greenArr = [
      '[1]',
      '1',
      1
    ]

    const data = ['foo', 'bar']
    const expected = 'bar'

    greenArr.forEach((x) => {
      const actual = get(data, x)
      expect(actual).toEqual(expected)
    })
  })

  it('should return undefined when called with bad data', () => {
    const redArr = [
      undefined,
      null,
      () => {},
      true,
      false,
      1337
    ]

    let actual

    const expected = undefined
    redArr.forEach((x) => {
      actual = get(x, '@foo')
      expect(actual).toEqual(expected)
    })
  })
})
