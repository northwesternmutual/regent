import makeArgs from './make-args'

describe('makeArgs', () => {
  it('makeArgs Function: Should exist.', () => {
    const actual = typeof makeArgs
    const expected = 'function'
    expect(actual).toEqual(expected)
  })

  it('makeArgs Function: Should exist.', () => {
    const data = {
      foo: 'foo',
      bar: 'bar',
      nest: {
        foo: 1,
        bar: 2
      }
    }

    let left = '@foo'
    let right = 'foo'
    let actual = makeArgs(data, left, right)
    let expected = ['foo', 'foo']
    expect(actual).toEqual(expected)

    left = '@foo'
    right = '@bar'
    actual = makeArgs(data, left, right)
    expected = ['foo', 'bar']
    expect(actual).toEqual(expected)

    left = 'foo'
    right = '@foo'
    actual = makeArgs(data, left, right)
    expected = ['foo', 'foo']
    expect(actual).toEqual(expected)

    left = '@nest.foo'
    right = 1
    actual = makeArgs(data, left, right)
    expected = [1, 1]
    expect(actual).toEqual(expected)

    left = '@nest.bar'
    right = '@nest.foo'
    actual = makeArgs(data, left, right)
    expected = [2, 1]
    expect(actual).toEqual(expected)

    left = '@@nest.bar' // Escaped
    right = '@nest.foo'
    actual = makeArgs(data, left, right)
    expected = ['@nest.bar', 1]
    expect(actual).toEqual(expected)
  })
})
