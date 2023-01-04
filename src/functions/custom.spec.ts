import { RegentFn } from '../interfaces'
import custom from './custom'

describe('custom', () => {
  it('should be a function', () => {
    expect(typeof custom).toEqual('function')
  })

  it('should return a predicate, which when called should return a rule when type "Rule" is specified.', () => {
    const actual = custom(() => 1, RegentFn.Rule, 'test')().type
    expect(actual).toBe(RegentFn.Rule)
  })

  it('should return an optics, which when called should return and optic when type "Optic" is specified.', () => {
    const actual = custom(() => 1, RegentFn.Optic, 'test')().type
    expect(actual).toBe(RegentFn.Optic)
  })

  it('should throw if the first argument is not a function', () => {
    // @ts-expect-error
    expect(() => custom('not a function', RegentFn.Rule, 'fail')).toThrow()
  })

  it('should return a factory function with makeArgs bound so regent syntax lookups work', () => {
    const FN = (lookup: any): any => lookup
    const data = {
      foo: {
        bar: 'works'
      }
    }
    const actual = custom(FN, RegentFn.Rule)('@foo.bar')(data)
    const expected = 'works'

    expect(actual).toEqual(expected)
  })

  it('should attach a toJson method that can be used to get the JSON version of the rule definition.', () => {
    const threeEqual = custom(function threeEqual (a, b, c) {
      return a === b && b === c
    }, RegentFn.Rule, 'threeEqual')

    const data = {
      foo: 'same',
      bar: 'same',
      baz: 'same'
    }

    const MY_RULE = threeEqual('@foo', '@bar', '@baz')

    expect(MY_RULE(data)).toEqual(true)

    const actual = MY_RULE.toJson()
    const expected = JSON.stringify({ threeEqual: ['@foo', '@bar', '@baz'] })

    expect(actual).toEqual(expected)
  })

  it('toJson method should return an "unknown" key when no name argument is passed', () => {
    const threeEqual = custom(function threeEqual (a, b, c) {
      return a === b && b === c
    }, RegentFn.Rule)

    const data = {
      foo: 'same',
      bar: 'same',
      baz: 'same'
    }

    const MY_RULE = threeEqual('@foo', '@bar', '@baz')

    expect(MY_RULE(data)).toEqual(true)

    const actual = MY_RULE.toJson()
    const expected = JSON.stringify({ unknown: ['@foo', '@bar', '@baz'] })

    expect(actual).toEqual(expected)
  })

  it('toJson method should return an "unknown" key when name argument is falsy', () => {
    const threeEqual = custom(function threeEqual (a, b, c) {
      return a === b && b === c
    }, RegentFn.Rule, '')

    const data = {
      foo: 'same',
      bar: 'same',
      baz: 'same'
    }

    const MY_RULE = threeEqual('@foo', '@bar', '@baz')

    expect(MY_RULE(data)).toEqual(true)

    const actual = MY_RULE.toJson()
    const expected = JSON.stringify({ unknown: ['@foo', '@bar', '@baz'] })
    expect(actual).toEqual(expected)

    const threeEqual2 = custom(function threeEqual (a, b, c) {
      return a === b && b === c
    }, RegentFn.Rule, null)

    const MY_RULE2 = threeEqual2('@foo', '@bar', '@baz')

    const actual2 = MY_RULE2.toJson()
    const expected2 = JSON.stringify({ unknown: ['@foo', '@bar', '@baz'] })
    expect(actual2).toEqual(expected2)
  })

  it('toJson method should return an "unknown" key when name argument is not a string', () => {
    const threeEqual = custom(function threeEqual (a, b, c) {
      return a === b && b === c
    // @ts-expect-error
    }, RegentFn.Rule, {})

    const data = {
      foo: 'same',
      bar: 'same',
      baz: 'same'
    }

    const MY_RULE = threeEqual('@foo', '@bar', '@baz')

    expect(MY_RULE(data)).toEqual(true)

    const actual = MY_RULE.toJson()
    const expected = JSON.stringify({ unknown: ['@foo', '@bar', '@baz'] })
    expect(actual).toEqual(expected)
  })

  it('the toJson method should include the lookup and the resolved lookup if data is provided as an argument.', () => {
    const threeEqual = custom(function threeEqual (a, b, c) {
      return a === b && b === c
    }, RegentFn.Rule, 'threeEqual')

    const data = {
      foo: 'foo',
      bar: 5,
      baz: ['foo']
    }

    const MY_RULE = threeEqual('@foo', '@bar', '@baz')

    expect(MY_RULE(data)).toEqual(false)

    const actual = MY_RULE.toJson(data)
    const expected = JSON.stringify({ threeEqual: ['@foo -> "foo"', '@bar -> 5', '@baz -> ["foo"]'] })

    expect(actual).toEqual(expected)
  })
})
