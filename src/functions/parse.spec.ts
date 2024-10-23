import isRule from '../private/is-rule'
import parseFn from './parse'

describe('parse', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
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
      // @ts-expect-error type check
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
    expect(isRule(isWindy) && isWindy({ windSpeed: 100 })).toEqual(true)
    expect(isRule(isWindy) && isWindy({ windSpeed: 1 })).toEqual(false)
    expect(isRule(isCold) && isCold({ temp: 100 })).toEqual(false)
    expect(isRule(isCold) && isCold({ temp: 10 })).toEqual(true)
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
    expect(isRule(windyAndCold) && windyAndCold({ windSpeed: 100, temp: 100 })).toEqual(true)
    expect(isRule(windyAndCold) && windyAndCold({ windSpeed: 1, temp: 10 })).toEqual(true)
    expect(isRule(windyAndCold) && windyAndCold({ windSpeed: 1, temp: 100 })).toEqual(false)
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
    expect(isRule(windyAndCold) && windyAndCold({ windSpeed: 100, temp: -10 })).toEqual(true) // both cold and windy
    expect(isRule(windyAndCold) && windyAndCold({ windSpeed: 1, temp: 10 })).toEqual(false) // cold but not windy
    expect(isRule(windyAndCold) && windyAndCold({ windSpeed: 100, temp: 100 })).toEqual(false) // windy but not cold
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
    expect(isRule(deepComposition) && deepComposition({ foo: 'foo' })).toEqual(true)
    expect(isRule(deepComposition) && deepComposition({ foo: 'bar' })).toEqual(false)
    expect(isRule(deepComposition) && deepComposition({ foo: 'bar', bar: 'bar', biz: 'biz' })).toEqual(true)
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
    expect(isRule(fooAndBar) && fooAndBar({ foo: 'foo', bar: 'bar' })).toEqual(true)
    expect(isRule(fooAndBar) && fooAndBar({ foo: 'bar', bar: 'bar' })).toEqual(false)

    expect(typeof emptyFoo).toEqual('function')
    expect(isRule(emptyFoo) && emptyFoo({ foo: '' })).toEqual(true)
    expect(isRule(emptyFoo) && emptyFoo({ foo: 'foo' })).toEqual(false)

    expect(typeof fooEqualsFoo).toEqual('function')
    expect(isRule(fooEqualsFoo) && fooEqualsFoo({ foo: 'foo' })).toEqual(true)
    expect(isRule(fooEqualsFoo) && fooEqualsFoo({ foo: '' })).toEqual(false)

    expect(typeof everyRule).toEqual('function')
    expect(isRule(everyRule) && everyRule({ arr: ['foo', 'foo'] })).toEqual(true)
    expect(isRule(everyRule) && everyRule({ arr: ['foo', 'bar'] })).toEqual(false)

    expect(typeof greaterThanOrEqualsRule).toEqual('function')
    expect(isRule(greaterThanOrEqualsRule) && greaterThanOrEqualsRule({ foo: 10 })).toEqual(true)
    expect(isRule(greaterThanOrEqualsRule) && greaterThanOrEqualsRule({ foo: 11 })).toEqual(true)
    expect(isRule(greaterThanOrEqualsRule) && greaterThanOrEqualsRule({ foo: 9 })).toEqual(false)

    expect(typeof greaterThanRule).toEqual('function')
    expect(isRule(greaterThanRule) && greaterThanRule({ foo: 10 })).toEqual(false)
    expect(isRule(greaterThanRule) && greaterThanRule({ foo: 11 })).toEqual(true)
    expect(isRule(greaterThanRule) && greaterThanRule({ foo: 9 })).toEqual(false)

    expect(typeof lessThanOrEqualsRule).toEqual('function')
    expect(isRule(lessThanOrEqualsRule) && lessThanOrEqualsRule({ foo: 10 })).toEqual(true)
    expect(isRule(lessThanOrEqualsRule) && lessThanOrEqualsRule({ foo: 11 })).toEqual(false)
    expect(isRule(lessThanOrEqualsRule) && lessThanOrEqualsRule({ foo: 9 })).toEqual(true)

    expect(typeof lessThanRule).toEqual('function')
    expect(isRule(lessThanRule) && lessThanRule({ foo: 10 })).toEqual(false)
    expect(isRule(lessThanRule) && lessThanRule({ foo: 11 })).toEqual(false)
    expect(isRule(lessThanRule) && lessThanRule({ foo: 9 })).toEqual(true)

    expect(typeof noneRule).toEqual('function')
    expect(isRule(noneRule) && noneRule({ foo: 'bar', bar: 'foo' })).toEqual(true)
    expect(isRule(noneRule) && noneRule({ foo: 'bar', bar: 'bar' })).toEqual(false)

    expect(typeof notRule).toEqual('function')
    expect(isRule(notRule) && notRule({ foo: 'bar' })).toEqual(true)
    expect(isRule(notRule) && notRule({ foo: 'foo' })).toEqual(false)

    expect(typeof orRule).toEqual('function')
    expect(isRule(orRule) && orRule({ foo: 'bar' })).toEqual(true)
    expect(isRule(orRule) && orRule({ foo: 'foo' })).toEqual(true)
    expect(isRule(orRule) && orRule({ foo: 'baz' })).toEqual(false)

    expect(typeof regexRule).toEqual('function')
    expect(isRule(regexRule) && regexRule({ foo: 'hello' })).toEqual(true)
    expect(isRule(regexRule) && regexRule({ foo: 'hello world' })).toEqual(true)
    expect(isRule(regexRule) && regexRule({ foo: 'world hello' })).toEqual(false) // match not at start of string

    expect(typeof someRule).toEqual('function')
    expect(isRule(someRule) && someRule({ arr: ['foo', 'bar'] })).toEqual(true)
    expect(isRule(someRule) && someRule({ arr: ['bar', 'bar'] })).toEqual(false)

    expect(typeof typeOfRule).toEqual('function')
    expect(isRule(typeOfRule) && typeOfRule({ foo: 'hello' })).toEqual(true)
    expect(isRule(typeOfRule) && typeOfRule({ foo: 12 })).toEqual(false)

    expect(typeof xorRule).toEqual('function')
    expect(isRule(xorRule) && xorRule({ foo: 'foo', bar: 'foo' })).toEqual(true)
    expect(isRule(xorRule) && xorRule({ foo: 'bar', bar: 'bar' })).toEqual(true)
    expect(isRule(xorRule) && xorRule({ foo: 'bar', bar: 'foo' })).toEqual(false)
    expect(isRule(xorRule) && xorRule({ foo: 'foo', bar: 'bar' })).toEqual(false)
  })
})
