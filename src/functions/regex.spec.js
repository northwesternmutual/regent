import regex, { regexFn } from './regex'

describe('3.x.x - regex should work in functional style', () => {
  it('should be a function', () => {
    const actual = typeof regex
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should perform regex', () => {
    const data = {
      foo: 'hello'
    }

    const RULE = regex('@foo', /^hello/)
    const actual = RULE(data)
    const expected = true

    expect(actual).toEqual(expected)
  })
})

describe('regexFn', () => {
  it('regexFn should be a function', () => {
    expect(typeof regexFn).toEqual('function')
  })

  it('regexFn should return true if the left matches the regexFn provided in the right', () => {
    const left = 'hello'
    const right = /^hello/
    const actual = regexFn(left, right)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('regexFn should return true if the left matches the regexFn provided in the right', () => {
    const left = '12hello45'
    const right = /[a-z]+/
    const actual = regexFn(left, right)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('regexFn should return false if there is no match', () => {
    const left = '12hello45'
    const right = /[A-Z]+/
    const actual = regexFn(left, right)
    const expected = false

    expect(actual).toEqual(expected)
  })

  it('regexFn should pass documentation examples', () => {
    expect(regexFn('hello world', /world/)).toEqual(true)
    expect(regexFn('baz123', /[a-z]+[0-9]+/)).toEqual(true)
    expect(regexFn('123baz', /[a-z]+[0-9]+/)).toEqual(false)
  })
})
