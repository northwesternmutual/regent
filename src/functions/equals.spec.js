import equals, { equalsFn } from './equals'

describe('equalsFn', () => {
  it('equalsFn should be a function', () => {
    expect(typeof equalsFn).toEqual('function')
  })

  it('equalsFn should return true if the left is in all of the arguments', () => {
    const left = 'hello'
    const right = 'hello'
    const acutal = equalsFn(left, right)
    const expected = true
    expect(acutal).toEqual(expected)
  })

  it('equalsFn should return false if left does not match all of the arguments', () => {
    const left = 'hello'
    const right = 'world'
    const acutal = equalsFn(left, right)
    const expected = false
    expect(acutal).toEqual(expected)
  })
})

describe('equals', () => {
  it('should be a function', () => {
    const actual = typeof equals
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should work in a functional style (true)', () => {
    const data = {
      foo: 'bar'
    }
    const actual = equals('@foo', 'bar')(data)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('should work in a functional style (false)', () => {
    const data = {
      foo: 'baz'
    }
    const actual = equals('@foo', 'bar')(data)
    const expected = false

    expect(actual).toEqual(expected)
  })

  it('should work with array syntax', () => {
    const data = {
      foo: [
        { bar: 'bar' }
      ]
    }
    const actual = equals('@foo[0].bar', 'bar')(data)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('should return false if called with bad data', () => {
    const redArr = [
      undefined,
      null,
      () => {},
      true,
      false,
      1337
    ]

    let actual

    const expected = false
    redArr.forEach((x) => {
      actual = equals('@foo[0].bar', 'bar')(x)
      expect(actual).toEqual(expected)
    })
  })
})
