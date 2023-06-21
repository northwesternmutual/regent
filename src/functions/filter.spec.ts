import filter from './filter'
import equals from './equals'
import and from './and'
import not from './not'

describe('filter', () => {
  it('should be a function', () => {
    const actual = typeof filter
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should return an array of objects with true rules (single match)', () => {
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

    const actual = filter(logic, obj)
      .map(x => x.result)
    const expected = ['This is the world!']
    expect(actual).toEqual(expected)
  })

  it('should return an array of objects with true rules', () => {
    const obj = {
      greeting: 'hello',
      place: 'world'
    }

    const greetingIsHello = equals('@greeting', 'hello')
    const placeIsWorld = equals('@place', 'world')

    const logic = [
      { result: 'This is somewhere else!', rule: placeIsWorld },
      { result: 'This is the world!', rule: and(greetingIsHello, placeIsWorld) }
    ]

    const actual = filter(logic, obj)
      .map(x => x.result)
    const expected = ['This is somewhere else!', 'This is the world!']
    expect(actual).toEqual(expected)
  })

  it('should work with boolean literal values', () => {
    const logic = [
      { result: 'me', rule: true },
      { result: 'not me', rule: false },
      { result: 'me!', rule: true }
    ]

    const actual = filter(logic, {}).map(x => x.result)
    const expected = ['me', 'me!']
    expect(actual).toEqual(expected)
  })

  it('should return an an empty array if there are no matches', () => {
    const obj = {
      greeting: 'foo',
      place: 'bar'
    }

    const greetingIsHello = equals('@greeting', 'hello')
    const placeIsWorld = equals('@place', 'world')

    const logic = [
      { result: 'This is somewhere else!', rule: placeIsWorld },
      { result: 'This is the world!', rule: and(greetingIsHello, placeIsWorld) }
    ]

    const actual = filter(logic, obj)
      .map(x => x.result)
    const expected = []
    expect(actual).toEqual(expected)
  })

  it('should handle misconfigured rules by returning false for that row', () => {
    const obj = {
      greeting: 'hello'
    }

    const greetingIsHello = equals('@greeting', 'hello')

    const logic = [
      { result: 'This is somewhere else!', rule: greetingIsHello },
      { result: 'This is the world!', rule: { not: greetingIsHello } }
    ]

    const actual = filter(logic, obj)
      .map(x => x.result)
    const expected = ['This is somewhere else!']
    expect(actual).toEqual(expected)
  })

  it('should return an array of objects with true rules (when one of the rows is a LogicRowFn)', () => {
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

    const actual = filter(logic, obj)
      .map(x => x.result)
    const expected = ['This is the world!', 'This is also the world!']
    expect(actual).toEqual(expected)
  })

  it('should NOT return any objects with false rules (when one of the rows is a LogicRowFn)', () => {
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

    const actual = filter(logic, obj)
      .map(x => x.result)
    const expected = ['This is the world!']
    expect(actual).toEqual(expected)
  })

  it('should return an array of objects with true rules (when one of the rows is a LogicRow[])', () => {
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

    const actual = filter(logic, obj)
      .map(x => x.result)
    const expected = ['This is the world!', 'This is also the world!']
    expect(actual).toEqual(expected)
  })

  it('should NOT return any objects with false rules (when one of the rows is a LogicRow[])', () => {
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

    const actual = filter(logic, obj)
      .map(x => x.result)
    const expected = ['This is the world!']
    expect(actual).toEqual(expected)
  })

  it('should return an array of objects with true rules (when one of the rows is a LogicRowFn that returns a LogicRow[])', () => {
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

    const actual = filter(logic, obj)
      .map(x => x.result)
    const expected = ['This is the world!', 'This is also the world!']
    expect(actual).toEqual(expected)
  })

  it('should NOT return any objects with false rules (when one of the rows is a LogicRowFn that returns a LogicRow[])', () => {
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

    const actual = filter(logic, obj)
      .map(x => x.result)
    const expected = ['This is the world!']
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
      (data: any) => [{ result: `This is the ${(data.place as string)}!`, rule: placeIsWorld }],
      { result: 'This is also the world!', rule: and(greetingIsHello, placeIsWorld) }
    ]

    const actual = filter(logic, obj)
      .map(x => x.result)
    const expected = ['This is the world!', 'This is also the world!']
    expect(actual).toEqual(expected)
  })

  it('should filter recursively with any combination of LogicRowFn, LogicRowObj, and LogicRow[]', () => {
    const obj = {
      greeting: 'hello',
      place: 'world'
    }

    const greetingIsHello = equals('@greeting', 'hello')
    const placeIsWorld = equals('@place', 'world')

    const logic = [
      (data: any) => [[[[{ result: `This is the ${(data.place as string)}!`, rule: placeIsWorld }]]]],
      [() => [{ result: 'This is also the world!', rule: and(greetingIsHello, placeIsWorld) }]]
    ]

    const actual = filter(logic, obj)
      .map(x => x.result)
    const expected = ['This is the world!', 'This is also the world!']
    expect(actual).toEqual(expected)
  })
})
