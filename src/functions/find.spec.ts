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

    // @ts-expect-error type check
    const actual = find(logic, {}).result
    const expected = 'me!'
    expect(actual).toEqual(expected)
  })

  it('should return undefined when called with null', () => {
    const logic = [{ foo: 'hello', rule: equals('@foo', 'foo') }]
    const actual = find(logic, null)
    const expected = undefined

    expect(actual).toEqual(expected)
  })

  it('should correctly evaluate rules composed with boolean values', () => {
    const logic = [{ foo: 'hello', rule: not(false) }]
    const actual = find(logic, null).foo
    const expected = 'hello'

    expect(actual).toEqual(expected)
  })

  it('should return the first LogicRowObj with a true rule (when one of the rows is a LogicRowFn)', () => {
    const obj = {
      greeting: 'hello',
      place: 'world'
    }

    const greetingIsHello = equals('@greeting', 'hello')
    const placeIsWorld = equals('@place', 'world')

    const logic = [
      () => ({ result: 'This is the world!', rule: placeIsWorld }),
      { result: 'This is also the world!', rule: and(greetingIsHello, placeIsWorld) }
    ]

    const actual = find(logic, obj)?.result
    const expected = 'This is the world!'
    expect(actual).toEqual(expected)
  })

  it('should return undefined if there are no LogicRows that resolve with a true rule (when one of the rows is a LogicRowFn)', () => {
    const obj = {
      greeting: 'hello',
      place: 'world'
    }

    const greetingIsHello = equals('@greeting', 'hello')
    const placeIsWorld = equals('@place', 'world')
    const placeIsNotWorld = not(equals('@place', 'world'))

    const logic = [
      () => ({ result: 'This is somewhere else!', rule: placeIsNotWorld }),
      { result: 'This is the world!', rule: and(greetingIsHello, placeIsWorld) }
    ]

    const actual = find(logic, obj)?.result
    const expected = 'This is the world!'
    expect(actual).toEqual(expected)
  })

  it('should return the first LogicRowObj with a true rule (when one of the rows is a LogicRow[])', () => {
    const obj = {
      greeting: 'hello',
      place: 'world'
    }

    const greetingIsHello = equals('@greeting', 'hello')
    const placeIsWorld = equals('@place', 'world')

    const logic = [
      [{ result: 'This is the world!', rule: placeIsWorld }],
      { result: 'This is also the world!', rule: and(greetingIsHello, placeIsWorld) }
    ]

    const actual = find(logic, obj)?.result
    const expected = 'This is the world!'
    expect(actual).toEqual(expected)
  })

  it('should return undefined if there are no LogicRows that resolve with a true rule (when one of the rows is a LogicRow[])', () => {
    const obj = {
      greeting: 'hello',
      place: 'world'
    }

    const greetingIsHello = equals('@greeting', 'hello')
    const placeIsWorld = equals('@place', 'world')
    const placeIsNotWorld = not(equals('@place', 'world'))

    const logic = [
      [{ result: 'This is somewhere else!', rule: placeIsNotWorld }],
      { result: 'This is the world!', rule: and(greetingIsHello, placeIsWorld) }
    ]

    const actual = find(logic, obj)?.result
    const expected = 'This is the world!'
    expect(actual).toEqual(expected)
  })

  it('should return the first LogicRowObj with a true rule (when one of the rows is a LogicRowFn that returns a LogicRow[])', () => {
    const obj = {
      greeting: 'hello',
      place: 'world'
    }

    const greetingIsHello = equals('@greeting', 'hello')
    const placeIsWorld = equals('@place', 'world')

    const logic = [
      () => [{ result: 'This is the world!', rule: placeIsWorld }],
      { result: 'This is also the world!', rule: and(greetingIsHello, placeIsWorld) }
    ]

    const actual = find(logic, obj)?.result
    const expected = 'This is the world!'
    expect(actual).toEqual(expected)
  })

  it('should return undefined if there are no LogicRows that resolve with a true rule (when one of the rows is a LogicRowFn that returns a LogicRow[])', () => {
    const obj = {
      greeting: 'hello',
      place: 'world'
    }

    const greetingIsHello = equals('@greeting', 'hello')
    const placeIsWorld = equals('@place', 'world')
    const placeIsNotWorld = not(equals('@place', 'world'))

    const logic = [
      () => [{ result: 'This is somewhere else!', rule: placeIsNotWorld }],
      { result: 'This is the world!', rule: and(greetingIsHello, placeIsWorld) }
    ]

    const actual = find(logic, obj)?.result
    const expected = 'This is the world!'
    expect(actual).toEqual(expected)
  })

  it('should pass data in to any LogicRowFns that are encountered', () => {
    const obj = {
      greeting: 'hello',
      place: 'world'
    }

    const greetingIsHello = equals('@greeting', 'hello')
    const placeIsWorld = equals('@place', 'world')

    const logic = [
      (data) => [{ result: `This is the ${(data.place as string)}!`, rule: placeIsWorld }],
      { result: 'This is also the world!', rule: and(greetingIsHello, placeIsWorld) }
    ]

    const actual = find(logic, obj)?.result
    const expected = 'This is the world!'
    expect(actual).toEqual(expected)
  })

  it('should find recursively with any combination of LogicRowFn, LogicRowObj, and LogicRow[]', () => {
    const obj = {
      greeting: 'hello',
      place: 'world'
    }

    const greetingIsHello = equals('@greeting', 'hello')
    const placeIsWorld = equals('@place', 'world')

    const logic = [
      (data) => [[[[{ result: `This is the ${(data.place as string)}!`, rule: placeIsWorld }]]]],
      [() => [{ result: 'This is also the world!', rule: and(greetingIsHello, placeIsWorld) }]]
    ]

    const actual = find(logic, obj)?.result
    const expected = 'This is the world!'
    expect(actual).toEqual(expected)
  })
})
