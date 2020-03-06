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
})
