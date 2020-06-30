import equalsFn, { equals } from './equals'

describe('equals', () => {
  it('equals should be a function', () => {
    expect(typeof equals).toEqual('function')
  })

  it('equals should return true if the left is in all of the arguments', () => {
    const left = 'hello'
    const right = 'hello'
    const acutal = equals(left, right)
    const expected = true
    expect(acutal).toEqual(expected)
  })

  it('equals should return false if left does not match all of the arguments', () => {
    const left = 'hello'
    const right = 'world'
    const acutal = equals(left, right)
    const expected = false
    expect(acutal).toEqual(expected)
  })
})

describe('equalsFn', () => {
  it('should be a function', () => {
    const actual = typeof equalsFn
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should work in a functional style (true)', () => {
    const data = {
      foo: 'bar'
    }
    const actual = equalsFn('@foo', 'bar')(data)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('should work in a functional style (false)', () => {
    const data = {
      foo: 'baz'
    }
    const actual = equalsFn('@foo', 'bar')(data)
    const expected = false

    expect(actual).toEqual(expected)
  })

  it('should work with array syntax', () => {
    const data = {
      foo: [
        { bar: 'bar' }
      ]
    }
    const actual = equalsFn('@foo[0].bar', 'bar')(data)
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
      actual = equalsFn('@foo[0].bar', 'bar')(x)
      expect(actual).toEqual(expected)
    })
  })

  it('when the toJson method is called it should return a json representation of the rule.', () => {
    const MY_RULE = equalsFn('@foo', 'a')
    const actual = MY_RULE.toJson()
    const expected = JSON.stringify({ equals: ['@foo', 'a'] })

    expect(actual).toEqual(expected)
  })
})
