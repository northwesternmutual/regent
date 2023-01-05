import { RegentFn } from '../interfaces'
import predicate from './predicate'

describe('predicate', () => {
  it('should be a function', () => {
    expect(typeof predicate).toEqual('function')
  })

  it('should return a predicate, which when called should return a rule when type "Rule" is specified.', () => {
    const actual = predicate(() => 1, 'test')().type
    expect(actual).toBe(RegentFn.Rule)
  })

  it('should throw if the first argument is not a function', () => {
    // @ts-expect-error
    expect(() => predicate('not a function', 'fail')).toThrow()
  })

  it('should return a factory function with makeArgs bound so regent syntax lookups work', () => {
    const FN = (lookup: any): any => lookup
    const data = {
      foo: {
        bar: 'works'
      }
    }
    const actual = predicate(FN, RegentFn.Rule)('@foo.bar')(data)
    const expected = 'works'

    expect(actual).toEqual(expected)
  })

  it('should attach a toJson method that can be used to get the JSON version of the rule definition.', () => {
    const threeEqual = predicate(function threeEqual (a, b, c) {
      return a === b && b === c
    }, 'threeEqual')

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
    const threeEqual = predicate(function threeEqual (a, b, c) {
      return a === b && b === c
    })

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
    const threeEqual = predicate(function threeEqual (a, b, c) {
      return a === b && b === c
    }, '')

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

    const threeEqual2 = predicate(function threeEqual (a, b, c) {
      return a === b && b === c
    }, null)

    const MY_RULE2 = threeEqual2('@foo', '@bar', '@baz')

    const actual2 = MY_RULE2.toJson()
    const expected2 = JSON.stringify({ unknown: ['@foo', '@bar', '@baz'] })
    expect(actual2).toEqual(expected2)
  })

  it('toJson method should return an "unknown" key when name argument is not a string', () => {
    const threeEqual = predicate(function threeEqual (a, b, c) {
      return a === b && b === c
    // @ts-expect-error
    }, {})

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
    const threeEqual = predicate(function threeEqual (a, b, c) {
      return a === b && b === c
    }, 'threeEqual')

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
