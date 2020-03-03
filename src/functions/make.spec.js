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

  it('it should throw an error if what is passed in is not a function', () => {
    expect(() => make('hello')).toThrow('make must be passed a function as argument 1')
  })
})
