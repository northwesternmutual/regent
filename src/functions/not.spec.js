import not from './not'
import equals from './equals'

describe('not', () => {
  it('should be a function', () => {
    const actual = typeof not
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should invert the value of any rule', () => {
    const RULE = equals('@foo', 'a')
    const data = {
      foo: 'a'
    }
    const actual = not(RULE)(data)
    const expected = false

    expect(actual).toEqual(expected)
  })

  it('should invert the value of any rule', () => {
    const RULE = equals('@foo', 'a')
    const data = {
      foo: 'b'
    }
    const actual = not(RULE)(data)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('should throw if not passed a rule', () => {
    expect(() => not('string')).toThrow('Regent: not requires the first argument to be a function')
  })
})
