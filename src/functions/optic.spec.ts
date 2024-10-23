import optic from './optic'

describe('optic', () => {
  it('should be a function', () => {
    expect(typeof optic).toEqual('function')
  })

  it('should return an optic, which when called should return and optic when type "Optic" is specified.', () => {
    const actual = optic(() => 1, 'test')().type
    expect(actual).toBe('Optic')
  })

  it('should throw if the first argument is not a function', () => {
    // @ts-expect-error exception check
    expect(() => optic('not a function', 'fail')).toThrow()
  })

  it('should return a factory function with makeArgs bound so regent syntax lookups work', () => {
    const FN = (lookup: unknown): unknown => lookup
    const data = {
      foo: {
        bar: 'works'
      }
    }
    const actual = optic(FN)('@foo.bar')(data)
    const expected = 'works'

    expect(actual).toEqual(expected)
  })

  it('should attach a toJson method that can be used to get the JSON version of the rule definition.', () => {
    function _concat (a: string, b: string): string {
      return `${a}` + `${b}`
    }

    const concat = optic(_concat, 'concat')

    const FULL_NAME = concat('@person.firstName', '@person.lastName')

    const actual = FULL_NAME.toJson()
    const expected = JSON.stringify({ concat: ['@person.firstName', '@person.lastName'] })

    expect(actual).toEqual(expected)
  })

  it('toJson method should return an "unknown" key when no name argument is passed', () => {
    function _concat (a: string, b: string): string {
      return `${a}` + `${b}`
    }

    const concat = optic(_concat)

    const FULL_NAME = concat('@person.firstName', '@person.lastName')

    const actual = FULL_NAME.toJson()
    const expected = JSON.stringify({ unknown: ['@person.firstName', '@person.lastName'] })

    expect(actual).toEqual(expected)
  })

  it('toJson method should return an "unknown" key when name argument is falsy', () => {
    function _concat (a: string, b: string): string {
      return `${a}` + `${b}`
    }

    const concat = optic(_concat, '')

    const FULL_NAME = concat('@person.firstName', '@person.lastName')

    const actual = FULL_NAME.toJson()
    const expected = JSON.stringify({ unknown: ['@person.firstName', '@person.lastName'] })

    expect(actual).toEqual(expected)
  })

  it('toJson method should return an "unknown" key when name argument is not a string', () => {
    function _concat (a: string, b: string): string {
      return `${a}` + `${b}`
    }

    // @ts-expect-error type check
    const concat = optic(_concat, 5)

    const FULL_NAME = concat('@person.firstName', '@person.lastName')

    const actual = FULL_NAME.toJson()
    const expected = JSON.stringify({ unknown: ['@person.firstName', '@person.lastName'] })

    expect(actual).toEqual(expected)
  })

  it('the toJson method should include the lookup and the resolved lookup if data is provided as an argument.', () => {
    function _concat (a: string, b: string): string {
      return `${a}` + `${b}`
    }

    const concat = optic(_concat, 'concat')
    const data = { person: { firstName: 'Bill', lastName: 'Jones' } }

    const FULL_NAME = concat('@person.firstName', '@person.lastName')

    const actual = FULL_NAME.toJson(data)
    const expected = JSON.stringify({ concat: ['@person.firstName -> "Bill"', '@person.lastName -> "Jones"'] })

    expect(actual).toEqual(expected)
  })
})
