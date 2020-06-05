import find from './find'
import equals from './equals'
import and from './and'
import not from './not'

describe('find', () => {
  it('should be a function', () => {
    const actual = typeof find
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('find should return the first array item with all true rules', () => {
    const obj = {
      greeting: 'hello',
      place: 'world'
    }

    const greetingIsHello = equals('@greeting', 'hello')
    const placeIsWorld = equals('@place', 'world')
    const placeIsNotWorld = not(equals('@place', 'world'))

    const logic = [
      { result: 'This is somewhere else!', rule: placeIsNotWorld },
      { result: 'This is the world!', rule: and(greetingIsHello, placeIsWorld) }
    ]

    const actual = find(logic, obj).result
    const expected = 'This is the world!'
    expect(actual).toEqual(expected)
  })

  it('find should not die on or return a row with no rules', () => {
    const obj = {
      greeting: 'hello',
      place: 'world'
    }

    const greetingIsHello = equals('@greeting', 'hello')
    const placeIsWorld = equals('@place', 'world')

    const logic = [
      { result: 'This is somewhere else!' },
      { result: 'This is the world!', rule: and(greetingIsHello, placeIsWorld) }
    ]

    const actual = find(logic, obj).result
    const expected = 'This is the world!'
    expect(actual).toEqual(expected)
  })

  it('find should return the first array item with all true rules and not return a following rule even if it is true', () => {
    const obj = {
      greeting: 'hello',
      place: 'world'
    }

    const placeIsWorld = equals('@place', 'world')

    const logic = [
      { result: 'This is somewhere else!', rule: placeIsWorld },
      { result: 'This is the world!', rule: placeIsWorld }
    ]

    const actual = find(logic, obj).result
    const expected = 'This is somewhere else!'
    expect(actual).toEqual(expected)
  })

  it('should work with boolean literal values', () => {
    const logic = [
      { result: 'not me', rule: false },
      { result: 'me!', rule: true }
    ]

    const actual = find(logic, {}).result
    const expected = 'me!'
    expect(actual).toEqual(expected)
  })

  it('should return undefined when called with no data', () => {
    const logic = [{ foo: 'hello', rule: equals('@foo', 'foo') }]
    const actual = find(logic)
    const expected = undefined

    expect(actual).toEqual(expected)
  })

  it('should return undefined when called with null', () => {
    const logic = [{ foo: 'hello', rule: equals('@foo', 'foo') }]
    const actual = find(logic, null)
    const expected = undefined

    expect(actual).toEqual(expected)
  })
})
