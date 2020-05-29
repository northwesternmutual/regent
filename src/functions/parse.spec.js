import parseFn from './parse'

describe('parse', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterAll(() => {
    console.log.mockRestore()
  })

  it('should be a function', () => {
    const actual = typeof parseFn
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should return an empty object if called with bad data', () => {
    const redArr = [
      null,
      undefined,
      'string',
      123,
      {},
      []
    ]

    const expected = {}
    redArr.forEach((x) => {
      const actual = parseFn(x)
      expect(actual).toEqual(expected)
      expect(console.error).toHaveBeenCalledWith('regent.parse TypeError: Cannot convert undefined or null to object')
    })
  })

  it('should take a json structure and return regent rules', () => {
    const json = JSON.stringify({
      isWindy: { greaterThan: ['@windSpeed', 10] },
      isCold: { lessThan: ['@temp', 65] }
    })

    const { isWindy, isCold } = parseFn(json)
    expect(typeof isWindy).toEqual('function')
    expect(typeof isCold).toEqual('function')
    expect(isWindy({ windSpeed: 100 })).toEqual(true)
    expect(isWindy({ windSpeed: 1 })).toEqual(false)
    expect(isCold({ temp: 100 })).toEqual(false)
    expect(isCold({ temp: 10 })).toEqual(true)
  })

  it('should take a json structure of or composed rules', () => {
    const json = JSON.stringify({
      windyAndCold: {
        or: [
          { greaterThan: ['@windSpeed', 10] },
          { lessThan: ['@temp', 65] }
        ]
      }
    })

    const { windyAndCold } = parseFn(json)
    expect(typeof windyAndCold).toEqual('function')
    expect(windyAndCold({ windSpeed: 100, temp: 100 })).toEqual(true)
    expect(windyAndCold({ windSpeed: 1, temp: 10 })).toEqual(true)
    expect(windyAndCold({ windSpeed: 1, temp: 100 })).toEqual(false)
  })

  it('should take a json structure of and composed rules', () => {
    const json = JSON.stringify({
      windyAndCold: {
        and: [
          { greaterThan: ['@windSpeed', 10] },
          { lessThan: ['@temp', 65] }
        ]
      }
    })

    const { windyAndCold } = parseFn(json)
    expect(typeof windyAndCold).toEqual('function')
    expect(windyAndCold({ windSpeed: 100, temp: -10 })).toEqual(true) // both cold and windy
    expect(windyAndCold({ windSpeed: 1, temp: 10 })).toEqual(false) // cold but not windy
    expect(windyAndCold({ windSpeed: 100, temp: 100 })).toEqual(false) // windy but not cold
  })

  it('should work with deeply nested compositions', () => {
    const json = JSON.stringify({
      deepComposition: {
        or: [
          { equals: ['@foo', 'foo'] },
          {
            and: [
              { equals: ['@bar', 'bar'] },
              { equals: ['@biz', 'biz'] }
            ]
          }
        ]
      }
    })

    const { deepComposition } = parseFn(json)
    expect(typeof deepComposition).toEqual('function')
    expect(deepComposition({ foo: 'foo' })).toEqual(true)
    expect(deepComposition({ foo: 'bar' })).toEqual(false)
    expect(deepComposition({ foo: 'bar', bar: 'bar', biz: 'biz' })).toEqual(true)
  })

  it('should return null for any rules that do not match a built in predicate or are not object literals. Should still parse and return other valid regent rules', () => {
    const json = JSON.stringify({
      customRule: { myCustomPredicate: ['@foo', 17] },
      invalidRule: 'foobar',
      validRule: { equals: ['@foo', 'foo'] }
    })

    const { customRule, invalidRule, validRule } = parseFn(json)
    expect(customRule).toEqual('myCustomPredicate is not a valid predicate')
    expect(invalidRule).toEqual('foobar is not a valid predicate')
    expect(typeof validRule).toEqual('function')
  })

  it('should support boolean literals', async () => {
    const json = JSON.stringify({
      booleanRule: true,
      validRule: { equals: ['@foo', 'foo'] }
    })

    const { booleanRule, validRule } = parseFn(json)
    expect(booleanRule).toEqual(true)
    expect(typeof validRule).toEqual('function')
  })

  it('should support all native predicates', () => {
    const json = JSON.stringify({
      fooAndBar: {
        and: [
          { equals: ['@foo', 'foo'] },
          { equals: ['@bar', 'bar'] }
        ]
      },
      emptyFoo: { empty: ['@foo'] },
      fooEqualsFoo: { equals: ['@foo', 'foo'] },
      everyRule: {
        every: ['@arr', { equals: ['@__', 'foo'] }]
      },
      greaterThanOrEqualsRule: { greaterThanOrEquals: ['@foo', 10] },
      greaterThanRule: { greaterThan: ['@foo', 10] },
      lessThanOrEqualsRule: { lessThanOrEquals: ['@foo', 10] },
      lessThanRule: { lessThan: ['@foo', 10] },
      noneRule: {
        none: [
          { equals: ['@foo', 'foo'] },
          { equals: ['@bar', 'bar'] }
        ]
      },
      notRule: {
        not: [
          { equals: ['@foo', 'foo'] }
        ]
      },
      orRule: {
        or: [
          { equals: ['@foo', 'foo'] },
          { equals: ['@foo', 'bar'] }
        ]
      },
      regexRule: {
        regex: ['@foo', '^he[l]lo']
      },
      someRule: {
        some: ['@arr', { equals: ['@__', 'foo'] }]
      },
      typeOfRule: {
        typeOf: ['@foo', 'string']
      },
      xorRule: {
        xor: [
          { equals: ['@foo', 'foo'] },
          { equals: ['@bar', 'bar'] }
        ]
      }
    })

    const {
      fooAndBar,
      emptyFoo,
      fooEqualsFoo,
      everyRule,
      greaterThanOrEqualsRule,
      greaterThanRule,
      lessThanOrEqualsRule,
      lessThanRule,
      noneRule,
      notRule,
      orRule,
      regexRule,
      someRule,
      typeOfRule,
      xorRule
    } = parseFn(json)

    expect(typeof fooAndBar).toEqual('function')
    expect(fooAndBar({ foo: 'foo', bar: 'bar' })).toEqual(true)
    expect(fooAndBar({ foo: 'bar', bar: 'bar' })).toEqual(false)

    expect(typeof emptyFoo).toEqual('function')
    expect(emptyFoo({ foo: '' })).toEqual(true)
    expect(emptyFoo({ foo: 'foo' })).toEqual(false)

    expect(typeof fooEqualsFoo).toEqual('function')
    expect(fooEqualsFoo({ foo: 'foo' })).toEqual(true)
    expect(fooEqualsFoo({ foo: '' })).toEqual(false)

    expect(typeof everyRule).toEqual('function')
    expect(everyRule({ arr: ['foo', 'foo'] })).toEqual(true)
    expect(everyRule({ arr: ['foo', 'bar'] })).toEqual(false)

    expect(typeof greaterThanOrEqualsRule).toEqual('function')
    expect(greaterThanOrEqualsRule({ foo: 10 })).toEqual(true)
    expect(greaterThanOrEqualsRule({ foo: 11 })).toEqual(true)
    expect(greaterThanOrEqualsRule({ foo: 9 })).toEqual(false)

    expect(typeof greaterThanRule).toEqual('function')
    expect(greaterThanRule({ foo: 10 })).toEqual(false)
    expect(greaterThanRule({ foo: 11 })).toEqual(true)
    expect(greaterThanRule({ foo: 9 })).toEqual(false)

    expect(typeof lessThanOrEqualsRule).toEqual('function')
    expect(lessThanOrEqualsRule({ foo: 10 })).toEqual(true)
    expect(lessThanOrEqualsRule({ foo: 11 })).toEqual(false)
    expect(lessThanOrEqualsRule({ foo: 9 })).toEqual(true)

    expect(typeof lessThanRule).toEqual('function')
    expect(lessThanRule({ foo: 10 })).toEqual(false)
    expect(lessThanRule({ foo: 11 })).toEqual(false)
    expect(lessThanRule({ foo: 9 })).toEqual(true)

    expect(typeof noneRule).toEqual('function')
    expect(noneRule({ foo: 'bar', bar: 'foo' })).toEqual(true)
    expect(noneRule({ foo: 'bar', bar: 'bar' })).toEqual(false)

    expect(typeof notRule).toEqual('function')
    expect(notRule({ foo: 'bar' })).toEqual(true)
    expect(notRule({ foo: 'foo' })).toEqual(false)

    expect(typeof orRule).toEqual('function')
    expect(orRule({ foo: 'bar' })).toEqual(true)
    expect(orRule({ foo: 'foo' })).toEqual(true)
    expect(orRule({ foo: 'baz' })).toEqual(false)

    expect(typeof regexRule).toEqual('function')
    expect(regexRule({ foo: 'hello' })).toEqual(true)
    expect(regexRule({ foo: 'hello world' })).toEqual(true)
    expect(regexRule({ foo: 'world hello' })).toEqual(false) // match not at start of string

    expect(typeof someRule).toEqual('function')
    expect(someRule({ arr: ['foo', 'bar'] })).toEqual(true)
    expect(someRule({ arr: ['bar', 'bar'] })).toEqual(false)

    expect(typeof typeOfRule).toEqual('function')
    expect(typeOfRule({ foo: 'hello' })).toEqual(true)
    expect(typeOfRule({ foo: 12 })).toEqual(false)

    expect(typeof xorRule).toEqual('function')
    expect(xorRule({ foo: 'foo', bar: 'foo' })).toEqual(true)
    expect(xorRule({ foo: 'bar', bar: 'bar' })).toEqual(true)
    expect(xorRule({ foo: 'bar', bar: 'foo' })).toEqual(false)
    expect(xorRule({ foo: 'foo', bar: 'bar' })).toEqual(false)
  })
})
