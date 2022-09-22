import {
  and,
  empty,
  equals,
  every,
  filter,
  find,
  greaterThanOrEquals,
  greaterThan,
  lessThanOrEquals,
  lessThan,
  make,
  none,
  not,
  or,
  parse,
  regex,
  some,
  typeOf,
  xor
} from './regent'

describe('regent', () => {
  it('should export the public API', () => {
    expect(typeof and).toEqual('function')
    expect(typeof empty).toEqual('function')
    expect(typeof equals).toEqual('function')
    expect(typeof every).toEqual('function')
    expect(typeof filter).toEqual('function')
    expect(typeof find).toEqual('function')
    expect(typeof greaterThanOrEquals).toEqual('function')
    expect(typeof greaterThan).toEqual('function')
    expect(typeof lessThanOrEquals).toEqual('function')
    expect(typeof lessThan).toEqual('function')
    expect(typeof make).toEqual('function')
    expect(typeof none).toEqual('function')
    expect(typeof not).toEqual('function')
    expect(typeof or).toEqual('function')
    expect(typeof parse).toEqual('function')
    expect(typeof regex).toEqual('function')
    expect(typeof some).toEqual('function')
    expect(typeof typeOf).toEqual('function')
    expect(typeof xor).toEqual('function')
  })

  it('should support custom predicates', () => {
    const fn = (left, right) => left * 2 === right
    const pred = make(fn)

    const IS_DOUBLE = pred('@low', 4)
    const actual = IS_DOUBLE({ low: 2 })
    const expected = true
    expect(actual).toEqual(expected)
  })

  it('should be able to export a large complicated composition to json.', () => {
    const isRaining = equals('@isRaining', true)
    const isCalm = lessThan('@windSpeedInMph', 25)
    const isRainingAndCalm = and(isRaining, isCalm)
    const isWindy = greaterThanOrEquals('@windSpeedInMph', 25)
    const isWindyOrCalmAndRaining = or(isWindy, isRainingAndCalm)
    const sunny = regex('@__description', /sunny/)
    const weekHasSunshine = some('@days', sunny)
    const imHappy = or(not(isRaining), isRainingAndCalm, and(isWindyOrCalmAndRaining, weekHasSunshine))

    const actual = imHappy.toJson()
    const expected = JSON.stringify({
      or: [
        { not: [{ equals: ['@isRaining', true] }] },
        {
          and: [
            { equals: ['@isRaining', true] },
            { lessThan: ['@windSpeedInMph', 25] }
          ]
        },
        {
          and: [
            {
              or: [
                { greaterThanOrEquals: ['@windSpeedInMph', 25] },
                {
                  and: [
                    { equals: ['@isRaining', true] },
                    { lessThan: ['@windSpeedInMph', 25] }
                  ]
                }
              ]
            },
            {
              some: ['@days',
                { regex: ['@__description', {}] }
              ]
            }
          ]
        }
      ]
    })

    expect(actual).toEqual(expected)
  })
})
